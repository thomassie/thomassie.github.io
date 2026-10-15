---
layout: post
title: Building synthetic data you can trust
image: /img/synthetic-data-flask-light.png
tags:
  - Data and Business
  - business
  - data analytics
  - AI
  - synthetic data
published: true
date: '2026-10-14'
---

When applying for a position with SERV, Switzerland's export risk insurance, I thought I might showcase a couple of reporting solutions that avoid the typical BI tools. The reporting should work in a transitional phase, where one cannot rely on a top-notch analytics environment (I'm mainly speaking about data availability here), and also once data is easily accessible and up to date. I wanted to show what's possible without any overkill solutions (e.g., Tableau). Something that is easy to automate, versionable and does not involve any costs. Yes, this is possible.

However, the base for any reporting is data. And of course, SERV does not publish raw figures. No policy-level file, no download, nothing on an open-data portal. There are only totals, buried in PDF annual reports. So, how to handle this?

A real portfolio report needs single policies, claims, transactions, the granular information the totals are made of. So the data had to be invented. None of what follows uses SERV's own data, and the project is not affiliated with the insurer. It is a mock-up built on synthetic data calibrated to SERV's published figures.

**Inventing the detail, keeping the totals right**

Inventing data is easy, but on its own it has no real value, because made-up numbers can be made to say almost anything. So the idea was to invent only the detail and then hold every public figure fixed. In practice each published total becomes a rule the synthetic data has to satisfy. The method is called raking. Take one rule: every contract still outstanding at the end of 2024 has to add up to the published exposure for that year, so the code multiplies each contract by the target divided by the current sum, and the rule holds. But a single contract usually sits inside many rules at once, for a year, a region, an industry and a country, and fixing one pulls the others off again. So the code cycles through all of them, round after round, until they hold together, or as closely as conflicting rules allow. The rescaling stays proportional, so the texture survives and a large contract stays larger than a small one. The same tool is used wherever detailed data has to agree with known totals, such as weighting survey results to match a population. As a result the totals end up very close to the published figures, while any single contract is completely made up.

```r
# Raking: rescale the amounts until the targets hold (anchor deals stay fixed)
a <- pol$amount / mio
fixed <- pol$anchor
# …
rake <- function(a, constraints, rounds, locked = fixed) {
  for (i in seq_len(rounds)) {
    for (b in constraints) {
      free <- b$measured & b$adjustable & !locked & b$w > 0
      if (!any(free)) next
      movable <- sum(a[free] * b$w[free])
      immovable <- sum(a[b$measured & b$w > 0] * b$w[b$measured & b$w > 0]) - movable
      if (movable > 0) {
        a[free] <- a[free] * max(b$target - immovable, 0.01 * b$target) / movable
      }
    }
  }
  a
}
```
_From the simulation script._

There were 342 such figures to match, each recorded with its source. Year-end exposure, claim payments and earned premiums are all among them, and the generated data lands on every one. Premiums needed more care, because SERV books them not at issue but by its own rule, part earned immediately and the rest in proportion to the outstanding engagement over the term. The generator simply copied that rule.

**A cross-check I never set up**

One result surprised me. The calibration was never told anything about SERV's 2019 management report, and yet it produced a record premium year in 2018 and a sharp fall in 2019, exactly what that report describes. Numbers that were only forced to match a handful of totals had, on their own, reproduced a pattern nobody had put into them. I would not read too much into a single case, but it was reassuring to see.

**A pattern that came from the method, not the business**

The opposite also happened, and this is where working with the AI coding agent was genuinely useful. An early version of the generator scaled only the short-lived contracts. The cohort charts then showed a clean break around the first calibrated year, and at first this looked like a finding. It was really an artefact, because the break came from the way the data had been built and said nothing about SERV. The code even carries a note about it.

```r
# All measured contracts are rescaled here, not only short-lived ones. Restricting the
# adjustment to contracts expiring before 2023 gave the vintages up to 2022 a surplus of short
# contracts: their run-off curve fell more steeply than that of the vintages from 2023, and the
# cohort comparison showed a break that does not exist in the data.
```
_From the simulation script._

The fix was to let the calibration scale all contracts. What caught the problem was checking the chart against how the data was made, rather than trusting a pattern because it looked tidy.

**Checking the totals**

All of this only matters if the totals really do match, so the generator does not take that on trust. At the end of a run the script prints each published figure next to the model's own value and the deviation in per cent, so any drift shows up at once.

```r
cat("\nEarned premiums per year (Mio. CHF), model vs. published:\n")
earned_premiums |>
  summarise(model = sum(earned_chf) / mio, .by = year) |>
  filter(year %in% as.integer(names(earned_published))) |>
  arrange(year) |>
  mutate(published = earned_published[as.character(year)],
         deviation = sprintf("%+.1f %%", (model / published - 1) * 100), model = round(model, 1)) |>
  as.data.frame() |> print(row.names = FALSE)
```
_From the simulation script; the earned-premium check._

The results are close. Year-end exposure lands within about 0.3 % for every year from 2017 to 2024. Claim payments, recoveries and write-offs match exactly. Earned premiums match all eight years to 0.0 %. And because the whole thing runs from a fixed random seed, every run produces byte-identical files, checked by regenerating the data into a clean folder and comparing checksums.

So much for the data. If you build data to match known totals, print the match and the deviation on every run, so you never trust a number you merely hoped was right. What I built on top of it, a report generated entirely from code, is in [the next post](/2026-10-01-an-html-report-without-bi-tools/).
