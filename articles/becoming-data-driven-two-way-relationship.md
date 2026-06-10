---
layout: page
title: "Becoming Data-Driven Is a Relationship, Not a Hand-Off. Especially With AI."
published: true
---

**TL;DR**

- Firms using data-driven decision-making outperform, but only when paired with the right organisational foundations.
- Most organisations name the human side as the wall, then invest less than 2% in fixing it.
- The fix is a working two-way bargain: business commits to decision framing; data commits to timeliness, interpretability, and honesty about limits; leadership organises the structure around them.
- AI raises the stakes without changing the structure. A vague question to a model is still a vague question. The answer just sounds more confident.
- The one habit that fixes the most: state the decision before asking for the number.

---
<br><br>

A message lands in the analyst's chat: *"Can you pull the new FTS numbers?"*

FTS (short for *Finest Trash Stuff*) is a show on the streaming service, with seasons and episodes, the kind of thing a lot of people inside the company talk about all day. The request *feels* like a thirty-second favour. Unfortunately, it isn't. Hidden inside that one sentence are several questions, and not one of them has been asked out loud:

- **What exactly does FTS stand for again?** Workplace shorthand is second nature to its inventors, and a small puzzle to everyone else.
- **Which metric?** Views, watch time, completion rate, new subscriptions? "The FTS numbers" could be any of them.
- **Which season or episode?** The new season as a whole, the premiere, the back half nobody finished?
- **Which period?** Opening weekend, the first 28 days, the full run to date?
- **Compared to what?** Against the last season, against a comparable title, against the forecast in the greenlight deck?
- **For what decision?** This is rarely asked, but of imminent importance.

More could easily be added; the set above is illustrative, not exhaustive.

What makes this moment matter is its scale. **It is the smallest possible version of the entire relationship between a business team and a data team.** Answered well, it produces something someone can act on rather quickly. Answered badly, the result is a number that is technically correct but quietly wrong for the decision at hand. It manufactures false confidence with a deadline attached. The two-way relationship between business and data is built or broken in requests this size, many times a week, with the small failures rarely noticed.

So it is worth taking seriously. As a working problem with a working solution. Every party in this story is under real pressure; this is not a grievance.
<br><br>

## Why bother? Because being data-driven appears to pay

The prior question is whether the prize is real. The available evidence suggests it is. Three independent studies, across geographies and decades, find **positive associations between data-driven practice and firm performance**.

Before the AI wave, one study of 179 large publicly traded US firms found that those rated highly on data-driven decision-making showed output and productivity roughly 5–6% higher than would be expected from their other technology and capital investments. Related effects appeared in asset utilisation, return on equity, and market value¹. It is not a controlled experiment, so the appropriate framing is *causal-leaning*, not proven causation. The design, however, is a serious attempt to rule out the reverse story that successful firms simply happen to adopt these habits.

A second, larger study from the same lead author sharpens the picture and adds a crucial condition. Examining more than 30,000 US manufacturing establishments, plants using predictive analytics had significantly higher sales than otherwise-similar competitors². The pay-off, however, appeared only when the analytics were paired with at least one organisational complement: real IT capital, an educated workforce, or efficient production flow. Plants without those complements saw no benefit at all. **Analytics did not lift performance on its own; it lifted performance when the organisational foundations were already in place.** That finding is, quietly, the whole argument of this article, because the complements *are* the governance and the relationship described below.

A more recent study, in a completely different setting, points in the same direction. Researchers analysed 2,873 Chinese listed firms using a natural-language model to score how data-driven each company's own reporting was, and found data-driven decision-making positively linked to the firms' international (cross-border) performance³. To be precise: these are Chinese firms listed at home, and the outcome is how well they performed in their overseas activities, not a claim about "international firms" in general. Different country, different era, different method, same direction. Caveats apply: the context is China-specific, the framing is built around sustainability, and the venue is a megajournal where quality varies. The convergence across two countries and two very different methods is the kind of corroborating evidence worth noting.

The prize, then, seems real. That is precisely why the way one goes about it deserves rigour.

Even strong empirical findings can be misapplied. A recent *Harvard Business Review* piece catalogues five common pitfalls in data-driven decision-making: conflating correlation with causation, underweighting sample-size effects, measuring what is easy rather than what matters, misjudging generalisability, and overweighting a single result⁴. The remainder of this piece takes the three studies above as directionally credible, not as universal claims.
<br><br>

## The paradox: naming the problem, refusing to fund the fix

When senior data executives were asked what is blocking them from becoming data-driven, about 80% pointed at people, culture, and process — not technology⁵. In the same survey, only 24% characterised their organisation as data-driven, and only 21% said they had built a data culture. The twist: in that same population, fewer than 2% ranked data literacy as an investment priority.

Taken at face value, four in five name the human side as the wall they keep hitting, and fewer than one in fifty invest in the most obvious tool for getting through it.

The split is genuinely two-way, not just the data team grumbling. In a large industry survey, 63% of business leaders described their organisations as "very data-driven", while 63% of technical leaders admitted their companies struggle to drive business priorities with data⁷. (This is vendor research, so the figures are best read as a directional signal rather than a precise measurement.) Same companies, opposite verdicts. One side feels data-driven; the other side, closer to the plumbing, knows it is not. The disagreement itself is the problem, and it lives on both sides of the table. The pattern is not unique to data executives: a Wharton@Work piece, reporting a McKinsey CHRO survey, similarly notes that 90% of CHROs see people analytics as important while only 42% report having the capabilities to act on it⁸. The shape repeats across functions.

It would be easy to read all this as corporate hypocrisy. A more honest reading is the *knowing–doing gap*: knowing what to do and actually doing it are two different problems, and the second is harder than the first. Consider the leadership perspective briefly. Data literacy programmes are *slow*; a workshop on Tuesday does not produce sharper decisions on Wednesday. They are *expensive*, and the cost is visible while the benefit is diffuse. And they are genuinely *hard to measure*, which, in a budget meeting, is close to fatal.

A second reading is worth naming alongside the first. The gap may not be only between knowing and doing; it may also be that decision-makers themselves do not yet know enough about data to see which interventions are necessary in the first place. Without sufficient data literacy at the top, leadership cannot reliably distinguish the worthwhile literacy investment from the next dashboard or LLM pilot competing for the same budget line. On this reading, low literacy at the top compounds the problem twice: once in failing to invest, and again in misjudging what to invest in.

The difficulty is compounded by a deeper problem: there is no agreement on what "data literacy" actually means. A 2026 review of the field puts this in black and white: there is "no unified definition of data literacy", because existing definitions are constrained by role, data type, or domain, and the literature contains only a limited body of research on *transversal* data-literacy skills, the kind that apply to all workers, not just specialists⁹. The same review offers a working definition (data literacy as "a set of competences that allow us to understand what data is needed related to an objective, locate it, work with it, analyse it, draw conclusions and communicate them"), while explicitly framing it as a synthesis rather than a consensus⁹. A separate critical review across twenty-five years of work reaches the same diagnosis from a different angle, identifying three distinct discourses in the literature: competency-based models, critical-theory approaches, and learning-centred perspectives¹⁰. These recent reviews, with independent methodologies, reach the same conclusion: a discipline cannot easily fund, scope, or measure what it has not yet defined.

A plausible chain runs as follows. Because data literacy is hard to define, it is hard to measure; because it is hard to measure, it is hard to attach a number to its return. And in a budget meeting, the line item that cannot show a number tends to lose to those that can. By this reasoning, the under-2% figure looks less like negligence and more like a framing-and-measurement failure: literacy loses the budget fight because it has not yet been made fundable, not because no one cares. This is a reasoned inference rather than a measured pattern, but each step in the chain is itself a defensible argument.

How "success" is defined turns out to be the lever that unsticks the paradox; the argument returns to it below. First, the relationship itself.
<br><br>

## Four pillars of a working relationship

The four pillars below are this article's framing rather than a taxonomy lifted from a single source. They are an attempt to gather the patterns running through the literature above into a shape that maps onto where the work actually breaks down: at the request, at the delivery, at the organisation around them, and at the AI layer now sitting on top.

### 1. What business owes the data team

Return to the FTS message. The fix is not a longer form to fill in. It is a habit: **state the decision.**

"Pull the FTS numbers" is a request for output. "I am deciding whether to renew FTS for another season, and I think completion rate on the new season is how we will judge it" is a request for *help with a decision*, and it silently answers most of the hidden questions. Metric, period, comparison, and purpose all fall out of the decision once it is named.

The underlying literacy gap among business users is larger than most leaders think, and the numbers are uncomfortably specific. A pre-pandemic survey of 9,000 full-time workers across nine countries found that only 21% felt fully confident in their data literacy skills, 74% reported feeling overwhelmed or unhappy when working with data, 36% found an alternative method to avoid data when faced with a data task, and another 14% skipped the task entirely¹¹. The estimated cost: roughly 43 hours per employee per year lost to data avoidance¹¹. This is vendor research with a commercial interest in framing a skills gap, so the figures are best read accordingly. But the survey was fielded by an independent firm (Opinium), and the avoidance behaviour is a finding any honest manager will recognise.

An implication follows: this is an individual gap, not just an organisational one. Roughly half of the workforce is opting out of the data part of the job, often invisibly, by routing around it.

So what does literacy actually mean for a non-technical business user? In a qualitative study of four stakeholder groups (students, educators, business advisors, and researchers), the business advisors' own definition, as captured in the paper's results table, is simply: "Data literacy is converting data to information and then converting information to insights"¹². The other groups offered more academic or technical formulations; the business advisors' definition is taken forward here because they most closely match the non-technical business audience this article is about. The sample is genuinely small (eight participants in total, with only two business advisors, both from public-sector contexts), so the finding is best read as directional. But the direction matches everything else. Business users define literacy as moving from raw inputs to a basis for action, not as statistics or SQL. On the reading argued here, that is exactly the right framing. They will (and should) not be writing SQL. The competence that matters is the one they themselves named: converting data into something a decision can rest on.

The 2026 review⁹ reinforces this from a different angle. It distinguishes workers by the *depth* of data engagement each role needs, with four levels: *communicators*, *readers*, *makers*, and *scientists*. Most non-technical business people sit at the *reader* and *communicator* end of that spectrum: they interpret what data is saying and pass it onward, rather than produce it. The implication is not that everyone needs to become a data scientist. It is that "reader" and "communicator" are real skill levels with their own competencies, and that is where most of the workforce lives.

A separate study of supply-chain professionals defines seven competencies non-technical business users actually need: organising and storing data, understanding data in business contexts, evaluating data sources, interpreting data, data-driven decision-making, communicating with data, and data ethics and security¹³. The interview sample is small (16 professionals in one sector), so the framework is best treated as directional rather than universal. But notice what is on that list, and what isn't. None of the seven is "learn SQL." Most are decision-and-judgement skills. **The list of what business users actually need is *less technical* than the prevailing image of "data literacy" would suggest.**

That reframes the FTS question entirely. The business side does not need to become quasi-analysts. What is needed is enough literacy to ask a well-formed question, the discipline to share the metric definitions and caveats carried around in one's head, and the conceptual grasp to know which kind of question is being asked. Concepts like customer lifetime value (roughly, how much a customer is worth over the whole relationship), churn (the rate at which customers leave), or cohort analysis (comparing groups who started at the same time) are what allow a business person to frame a question worth asking. The exact formula is not required. But the concept must be grasped well enough to recognise that "is FTS keeping people subscribed?" is a churn question. That recognition is what lets the analysis even begin. **Without the concept, the right analysis cannot be initiated.** With it, it can, even before anyone has pinned down the precise definition.

### 2. What the data team owes the business

The mirror image. Here data analytics has to be more self-critical.

A report can be perfectly correct and completely useless. If it answers a question the business was not asking, arrives after the decision was made, or is technically right but impossible to interpret without a one-hour briefing, it has failed, no matter how clean the query. **Correctness is the base, not the goal.** The point is not to stop there: the point is to be correct *and* useful.

What the data team actually owes is fourfold: **understanding the decision behind the request** (which means asking, not guessing); **usability**, so the answer is legible to someone who does not live in the data; **timeliness**, because a great answer to last week's question is a worse outcome than a good-enough answer on time; and **honesty about limits**, saying so when the data cannot cleanly answer the question rather than producing a confident answer to a different one.

The paradox above could be misread. Earlier paragraphs catalogued how little organisations invest in literacy and how often leaders feel they are not data-driven; one could easily extrapolate that the data work itself is mostly wasted. The same MIT Sloan survey points the other way: 92% of data leaders said their companies delivered measurable business value from data investments⁵. Value *is* being produced, and produced reliably. The problem is not output. The problem is uptake: whether that value actually gets adopted, trusted, and used by the people making decisions. An insight that is correct, delivered, and then ignored is functionally indistinguishable from no insight at all. On the combined picture (value reportedly delivered, yet organisations not feeling data-driven), what's missing is adoption, not production. This is an inference rather than a direct survey finding, but it is the simplest reading of two findings that have to be reconciled.

### 3. What leadership must organise

Individual goodwill does not scale. Two people can negotiate the FTS question over coffee; a large enterprise needs structure. This is leadership's pillar, and, unfortunately, it is often skipped.

A few patterns that actually move the needle:

- **Bridging roles.** The well-known idea of the *analytics translator* (someone who turns a business problem into a solvable data problem, then turns the answer back into a decision) exists precisely because correct-but-unusable output is so common¹⁴. In practice, the role can be filled from either side: a data analyst who has built deep business acumen, or a business-side practitioner whose data literacy is strong enough to frame the question and read the answer. In 2018, US demand for such roles was projected to reach the millions by 2026; that target year has now arrived, so the figure is best treated as a historical signal of scale rather than a live forecast. The structural need it pointed at has not disappeared. Practitioners describe the same role independently¹⁵.
- **Ownership and explicit service expectations.** An SLA (a service-level agreement) is simply an explicit promise about who delivers what, to what standard, by when. The *data mesh* idea is one widely discussed organisational mechanism for making those promises real. (Data mesh is an approach where the business units that create and use data own it as a product, instead of throwing raw data over the wall to a central team.) Each "data product" gets a named owner who acts as an ambassador to the people who use it, and governance moves from a single central gatekeeper to a federated model with shared standards and local ownership¹⁶. The same source is blunt about a common mistake: bolting this onto a centralised structure typically fails¹⁶. Concretely, if a single central team keeps owning all the data while its outputs are simply re-labelled as "data products" and everyone is asked to be more accountable, nothing changes; the ownership, the incentives, and the reporting lines are still central. It is a reorganisation of *who is responsible*, not a tool that can be purchased and switched on. The named-owner role itself only works if the person filling it has the data literacy to defend the metric's definition under pressure and to recognise when an upstream change to the data will break a downstream decision. The point is the named ownership and the federation of standards, not the data-mesh label per se: the same intent can be honoured by other arrangements (a centralised data team that gives each data product an accountable owner on the business side, often the analytics translator; or an embedded model in which analysts sit inside the business units they serve while sharing standards). What fails is the shape in which nobody owns the metric on either side.
- **Governed self-serve, not raw access.** More on this below; it is leadership's job to decide *which* one the company ships. Making that call well requires its own kind of literacy: enough understanding of where the foundations are weak to know whether self-serve is currently safe, and enough conviction to refuse the shortcut even when the demand for raw access feels urgent.
- **Hire for data literacy beyond the data team.** Researchers interviewing business advisors heard the same observation twice: data skills are simply not considered when hiring for non-specialist roles (marketing, product, operations, finance, HR — everything outside the data function), which forces companies to overpay by recruiting more data scientists as a workaround instead of building the broader baseline¹². **Hiring criteria signal what an organisation values**; if the criteria for a marketing, product, or operations role never mention data, the organisation has decided literacy is somebody else's problem.

The point is not to adopt all the jargon. It is that "be more collaborative" is not a strategy; specific roles, defined ownership, and explicit service expectations are. Concretely: a *role* is a named translator or data-product owner, a real person with that job in their objectives, not a hope that someone will volunteer. **Ownership is one team accountable for a given metric's definition and quality**, so that when "views" is wrong there is a name attached to fixing it. And *service expectations* are the agreed answers to "what is delivered, how good, and how fast", written down, so neither side is guessing.

### 4. How AI changes the equation

Now add AI to everything above. AI changes the rules less than it raises the stakes.

A practitioner phrase captures the dynamic: **garbage in, gospel out**. When data is fragmented, outdated, or inconsistently defined, an AI system does not stop or warn. It processes the mess and returns a confident, fluent, authoritative-sounding answer. That is the genuinely new risk. A broken SQL query throws a visible error; a model fed an outdated revenue definition or inconsistently labelled regions simply returns an answer that is fluent, plausible, and wrong.

This is not just a vivid phrase, but a measured effect. A large peer-reviewed study tested machine-learning models against systematically degraded data across several quality dimensions and found that performance falls measurably as data quality falls: incomplete, erroneous, or inappropriate training data leads to **unreliable models that produce poor decisions**¹⁷. The mechanism repeatedly described in vendor blogs turns out to be real and quantifiable. One honest limit: that study covers tabular data and controlled contamination, and the behaviour of generative models on bad data is a distinct, arguably more dangerous problem it does not directly settle.

**Every existing data-quality problem is therefore also an AI problem.** An organisation that already distrusts a meaningful slice of its own data (and many do) does not see that distrust resolved by AI; the system presents the same flawed inputs with greater polish and more apparent authority.

There is a quieter, more interesting risk underneath the data-quality one. This is where the literacy gap stops being treated as a training-and-development matter (the kind of thing HR is asked to fix at the margins, somebody else's budget) and starts being a system-reliability concern. The same cognitive failure that produces "pull the FTS numbers" in a Slack message now produces "summarise FTS performance" as a prompt in an LLM. The vague question goes in; a beautifully written, plausibly framed, confidently wrong answer comes out. There is no analyst on the other end to push back. In the Slack version, someone competent and a little annoyed asks one of the questions from the FTS hook ("Which metric? Which season? Compared to what? For what decision?"). In the LLM version, nobody asks.

This is not just observation. Research has begun to map the empirical link. A study of non-expert users with large language models reports that prompt-engineering skill correlates directly with the quality of the model's output in a learning task¹⁸. Directional finding only: the participants are students in an educational setting, not working professionals, and the inside numbers are not load-bearing here. But the direction matters. The conceptual scaffolding has caught up too: a separate framework paper argues that prompt engineering (broadly, the cluster of skills around formulating clear, unambiguous instructions to a language model and critically evaluating its outputs for plausible-but-wrong answers) is a distinct, learnable competency for non-technical users in the LLM era, not a sub-skill of general communication¹⁹. "Good communicators may not inherently possess skills necessary to effectively interact with AI" is the authors' framing, which sounds obvious only because it is true¹⁹.

The deeper failure cuts cleanly through both worlds. A vague question to an analyst produces correct-but-useless work. A vague prompt to an LLM produces fluent-but-wrong work. **Enabling business people to ask the right questions is, in the end, what makes AI answers reliable.**

The honest read is two-sided, and recent empirical work allows the positive case to be sharpened. A natural-experiment study of equity-research analysts after the December 2023 launch of FactSet's Mercury AI platform found that AI-assisted reports were broader and more timely (more distinct information sources, more analytical methods, more figures), but forecast accuracy *degraded* by roughly 59%²⁰. The authors' "synthesis-cost hypothesis" is that AI raises the volume of offsetting positive and negative signals faster than the human user can integrate them into a single accurate judgement. The finding does not refute the upside case; it relocates it. AI shifts the analyst bottleneck from information-gathering to synthesis and interpretation, which makes those skills more important under AI, not less. This relocation of effort changes what the organisation has to give the model. With a *semantic layer* (a governed dictionary where each metric has one blessed, documented definition, so "views" means the same thing to every query and every person), natural-language questions begin drawing on trustworthy inputs instead of guesses. The foundation, not the model, is what an organisation actually controls. **AI acts as an amplifier of whatever the foundation supports, including its weaknesses.**
<br><br>

## The deeper failure: nobody framed the question

What connects all four pillars is a single failure pattern: the recurring problem is not bad math, but a question that was never framed properly before the work began.

A practitioner-academic piece in MIT Sloan argues that the most common reason data science projects fail is that teams skip problem definition: they rush to analyse the data before anyone has agreed on the problem to be solved, and different departments never reach consensus on what is actually being asked²¹. The article puts the failure rate above 80%. That figure is the authors' own assessment rather than a traceable statistic, so it is best read as a framing of the seriousness rather than a hard number. The diagnosis is the FTS hook scaled up: a vague question goes in, technically correct work comes out, and it solves the wrong problem.

That is why enabling business people to ask the *right* questions is not a nicety. It is the thing that produces reliable answers from analytics and from AI. A model, like an analyst, will faithfully answer the question actually asked. "Pull the FTS numbers" returns numbers; "which renewal decision is being made, and what would change our mind" returns something usable. Reliability is a function of how a question is framed, not of how many dashboards have been built around it.
<br><br>

## Democratisation: the same word, two opposite outcomes

"Data democratisation" gets sold as an unalloyed good.

Done badly, it means handing people raw access and calling it empowerment. The predictable result is misinterpretation, three teams computing "views" three different ways, and false confidence at scale: the worst of both worlds.

Done well, it means access *plus* **the things that make access safe: data literacy, a semantic layer with shared definitions, and a small set of trusted standard reports everyone agrees on**. That combination delivers faster insight while managing the risk, a consistent direction across the practitioner and review literature²². **The difference between the two is not ambition but governance.**
<br><br>

## The two-way relationship is an informal SLA

Strip away the frameworks and what remains is a simple bargain, closer to an unwritten service-level agreement than an org chart. Spelled out concretely, each side commits to a short list.

- **The business side commits to context and decision framing.** Which decision is on the table; by when it must be made; which metric will judge it; and what "good" would look like. In practice: name the decision before asking for the number, share the metric definition already in mind, and flag the deadline up front rather than after the report lands.
- **The data side commits to timeliness and interpretability, not just correctness.** An answer that arrives in time to matter; a clear statement of what the number does and does not mean; and the caveats stated plainly rather than buried. In practice: ask what decision the request feeds before pulling anything, deliver something legible to a non-specialist, and say so when the data cannot answer the question cleanly.

Both halves are obligations. When only one side holds up its end, the relationship does not become half as good; it tends to collapse, because each side starts protecting itself from the other.

This is where the paradox closes. The literacy budget fight keeps being lost because "works" is defined as ROI, and literacy is slow, diffuse, and hard to price. But the relationship has *other* signals of health worth watching. Several have been measured in the research; one (trust and adoption between teams) is plausibly derived from adjacent findings here, and that distinction is flagged where it matters.

- **Decision quality and efficiency.** Decision quality and decision efficiency have been measured as outcomes of analytics competency and usage in two separate studies: one of 151 IT managers and analysts at firms²³, and one of 240 Chinese agricultural firms²⁴. The contexts and perspectives differ; the direction is consistent. One caveat worth stating about the first: it measures decision quality from the perspective of IT managers and analysts, which is not the same as asking whether business users *trust* the numbers.
- **Rework.** How often does a report get re-run because the question was underspecified? Every avoided FTS round-trip is a small, real win.
- **Metric consistency.** One definition of "views", or three?
- **Trust and adoption.** Do business teams use and believe numbers they did not personally commission? Do insights get acted on, or die in a dashboard nobody opens? This is the relational dimension, and it is plausibly derived from adjacent findings here rather than directly measured. The specific framing of trust-between-teams as a measured health signal is under-researched compared with the financial outcomes; it is best treated as a way of thinking, not a finding.

One honest gap. The Qlik and Accenture survey reports that data-literate employees are at least 50% more likely to feel empowered and trusted to make better decisions¹¹, but that is a self-reported attitudinal lift, not a measured decision outcome, and it sits inside vendor research. No controlled, large-scale study was found in the research for this article showing that data-literacy training for non-technical business users improves measured business performance. The absence is not a proof; deeper or differently-framed searches may surface one. What the evidence supports is that training improves *confidence* and *self-reported empowerment*. That is genuinely worth funding. It should not, however, be dressed up as a proven ROI lever it has not yet earned.

Where success is defined narrowly as ROI, literacy loses every budget fight it enters: the financial returns of literacy investment, if they emerge at all, emerge over years rather than over the quarterly cycles on which budgets are reviewed. With decision quality, adoption, and rework counted alongside, the case for investing in the human side acquires its own measurable basis. **A too-narrow definition of success may be the quiet reason the most-cited barrier never gets funded.**
<br><br>

## Now, what to change?

A reorganisation is not the prerequisite. One new habit is. And it can be run from either side of the table.

**For those making the requests:** never send "pull the FTS numbers" again. Send the decision. *"I am deciding whether to renew FTS; I think completion rate on the new season, against the last one, is what tells us."* Most of the hidden questions are answered before anyone has to ask, and what comes back is something usable. While at it, specify which metric is meant: "views" is not one thing, and assuming it is one thing is how three teams end up with three answers. The same rule applies whenever one starts working with an LLM, whether in a chat window, an agentic harness like Claude Code, an app, or an API call. A vague prompt is a vague request, and an LLM will write the wrong answer back with more confidence than any analyst would dare.

**For those fielding the requests:** when the next vague ask arrives, do not pull a number. Ask one question first: *"What decision is this feeding?"* Watch how much rework, and how much false confidence, that single question prevents. And when a metric has no shared definition, do not quietly pick one. Write the definition down, get it agreed, and put it where the next person will find it.

**For those leading the people doing both:** stop asking only what the data work *returned*, and start asking whether it was *trusted, used, and consistent.* Fund a named bridging role instead of hoping for volunteers. Decide whether the organisation is shipping governed self-serve or raw access, because AI will amplify whichever one was chosen, for better or for worse. That foundation is the part actually under leadership's control.

The FTS request will arrive again, tomorrow and the day after. **Whether it remains a thirty-second favour or opens a substantive conversation depends on whether the foundations described above have been built.**
<br><br>
---

## References

Tier 1 = peer-reviewed academic. Tier 2 = named industry research / recognised consultancy. Tier 3 = practitioner/vendor colour — used for illustration only, never as the sole support for a factual claim.

1. Brynjolfsson, E., Hitt, L. M., & Kim, H. H. (2011). "Strength in Numbers: How Does Data-Driven Decisionmaking Affect Firm Performance?" *ICIS 2011 Proceedings*, AIS Electronic Library. https://aisel.aisnet.org/icis2011/proceedings/economicvalueIS/13/

2. Brynjolfsson, E., Jin, W., & McElheran, K. (2021). "The power of prediction: predictive analytics, workplace complements, and business performance." *Business Economics*, Palgrave Macmillan, 56(4), 217–239, October 2021. DOI: 10.1057/s11369-021-00224-5. https://ideas.repec.org/a/pal/buseco/v56y2021i4d10.1057_s11369-021-00224-5.html

3. Xu, M., & Lu, B. (2026). "The data-driven decision-making, sustainable value creation, and international firm performance: Micro-level evidence based on AI language models." *PLoS One*, February 11, 2026. https://pmc.ncbi.nlm.nih.gov/articles/PMC12893598/

4. Luca, M., & Edmondson, A. C. (2024). "Where Data-Driven Decision-Making Can Go Wrong." *Harvard Business Review*, September–October 2024. https://hbr.org/2024/09/where-data-driven-decision-making-can-go-wrong

5. Davenport, T. H., & Bean, R. (2023). "Action and Inaction on Data, Analytics, and AI." *MIT Sloan Management Review*, January 19, 2023. (Based on NewVantage Partners' 11th annual survey.) https://sloanreview.mit.edu/article/action-and-inaction-on-data-analytics-and-ai/

6. NewVantage Partners / Wavestone (2023). "NewVantage Partners Releases 2023 Data and Analytics Leadership Executive Survey." PR Newswire, January 2023. (116 Fortune 1000 organizations.) https://www.prnewswire.com/news-releases/newvantage-partners-a-wavestone-company-releases-2023-data-and-analytics-leadership-executive-survey-301711081.html *(Press-release companion to source 5 — same underlying survey.)*

7. Salesforce (2024). "State of Data and Analytics, 2nd Edition." 2024. (Vendor research; cited for the perception-gap signal — business leaders who feel data-driven versus technical leaders who say they struggle.) https://www.salesforce.com/news/stories/data-analytics-trends/

8. Bidwell, M. (2022). "HR as Strategic Partner: Data Literacy Is Key." *Wharton Executive Education / Wharton@Work*, September 2022. https://executiveeducation.wharton.upenn.edu/thought-leadership/wharton-at-work/2022/09/hr-as-strategic-partner-data-literacy-is-key/

9. Alarcón, A., de Ramón, J., Ginieis, M., & Andraszak, J. (2026). "Data literacy in the labor market: a systematic review." *Humanities and Social Sciences Communications*, Springer Nature, 13, article 506. DOI: 10.1057/s41599-026-06824-w. https://www.nature.com/articles/s41599-026-06824-w

10. Lund, B., Hovious, A., & Kim, J. (2026). "Discourses of data literacy: A critical literature review. An Annual Review of Information Science and Technology (ARIST) paper." *Journal of the Association for Information Science and Technology (JASIST)*, Wiley, 2026. DOI: 10.1002/asi.70054. https://doi.org/10.1002/asi.70054

11. Qlik & Accenture / Data Literacy Project (2020). "The Human Impact of Data Literacy: A leader's guide to democratizing data, boosting productivity and empowering the workforce." Research commissioned from Opinium; survey of 9,000 full-time workers in nine countries. https://newsroom.accenture.com/news/2020/new-research-from-accenture-and-qlik-shows-the-data-skills-gap-is-costing-organizations-billions-in-lost-productivity

12. Ghodoosi, B., Torrisi-Steele, G., West, T., & Heidari, M. (2024/2025). "Perceptions of data literacy and data literacy education." *Journal of Librarianship and Information Science*, SAGE, 57(3), 822–832, September 2025 (online first April 2024). DOI: 10.1177/09610006241246789. https://journals.sagepub.com/doi/10.1177/09610006241246789

13. Condon, P., & Pothier, W. G. (2025). "Data literacy competencies in context: employee perspectives from the workplace." *Journal of Business & Finance Librarianship*, Taylor & Francis, 31(1). DOI: 10.1080/08963568.2025.2546209. https://www.tandfonline.com/doi/full/10.1080/08963568.2025.2546209

14. McKinsey / QuantumBlack (2018). "Analytics translator: The new must-have role." February 1, 2018. https://www.mckinsey.com/capabilities/quantumblack/our-insights/analytics-translator

15. Clarkston Consulting (2019). "The Business Translator Role in Analytics." July 2019. https://clarkstonconsulting.com/insights/business-translator-role/

16. Thoughtworks (2022). "Data Mesh in Practice: Organizational Operating Model." May 19, 2022. https://www.thoughtworks.com/en-us/insights/articles/data-mesh-in-practice-organizational-operating-model

17. Mohammed, S., Budach, L., Feuerpfeil, M., Ihde, N., Nathansen, A., Noack, N., Patzlaff, H., Naumann, F., & Harmouch, H. (2025). "The effects of data quality on machine learning performance on tabular data." *Information Systems*, Elsevier, 132, article 102549, July 2025. DOI: 10.1016/j.is.2025.102549. (arXiv preprint 2207.14529.) https://arxiv.org/abs/2207.14529

18. Knoth, N., Tolzin, A., Janson, A., & Leimeister, J. M. (2024). "AI literacy and its implications for prompt engineering strategies." *Computers and Education: Artificial Intelligence*, Elsevier, 6, article 100225, April 2024. DOI: 10.1016/j.caeai.2024.100225. https://doi.org/10.1016/j.caeai.2024.100225

19. Federiakin, D., Molerov, D., Zlatkin-Troitschanskaia, O., & Maur, A. (2024). "Prompt engineering as a new 21st century skill." *Frontiers in Education*, 9, article 1366434. DOI: 10.3389/feduc.2024.1366434. https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1366434/full

20. Xue, J., Zhang, Q., & Zhu, W. (2025). "Generative AI for Analysts." arXiv preprint arXiv:2512.19705 [q-fin.ST], December 12, 2025. DOI: 10.48550/arXiv.2512.19705. (Preprint — update citation when journal publication is confirmed.) https://arxiv.org/abs/2512.19705

21. Hoerl, R., Kuonen, D., & Redman, T. C. (2022). "Framing Data Science Problems the Right Way from the Start." *MIT Sloan Management Review*, April 14, 2022. https://sloanreview.mit.edu/article/framing-data-science-problems-the-right-way-from-the-start/

22. Murugan, R., & Sekhar, S. (2025). "A Literature Review on Data Democratization, Self-Service Business Intelligence, and Data Literacy." *International Journal of Business Analytics (IJBAN)*, IGI Global, 12(1), 1–12, January 2025. (Abstract-only access.) https://ideas.repec.org/a/igg/jban00/v12y2025i1p1-12.html

23. Ghasemaghaei, M., Ebrahimi, S., & Hassanein, K. (2018). "Data analytics competency for improving firm decision making performance." *The Journal of Strategic Information Systems*, Elsevier, 27, 101–113, March 2018. DOI: 10.1016/j.jsis.2017.10.001. https://experts.mcmaster.ca/display/publication1483987

24. Li, L., Lin, J., Ouyang, Y., & Luo, X. (R.) (2022). "Evaluating the impact of big data analytics usage on the decision-making quality of organizations." *Technological Forecasting and Social Change*, Elsevier, 175, article 121355, 2022. DOI: 10.1016/j.techfore.2021.121355. https://ideas.repec.org/a/eee/tefoso/v175y2022ics0040162521007861.html

**Tier mapping.** Sources 1, 2, 3, 9, 10, 12, 13, 17, 18, 19, 23, 24: Tier 1 (peer-reviewed academic; some with partial-verification caveats noted upstream in the research brief). Source 20: Tier 1 partial (arXiv preprint, not yet peer-reviewed). Sources 4, 5, 6, 7, 8, 11, 14, 16, 21, 22: Tier 2 (named industry research, recognised consultancy, or executive-education thought leadership). Source 15: Tier 3 (practitioner corroboration of the translator role).

