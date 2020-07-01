---
layout: page
title: Apple Music Library
published: true
---

![AppleMusicLibrary_all.png]({{site.baseurl}}/img/AppleMusicLibrary_all.png)<br/>

Recently, I was wondering about **which are the songs I listen to most often on Apple Music**. Sure, [Apple Music](https://www.apple.com/chde/music/) can show you the "Top 25 Most Played" songs. However, it didn’t provide me with the instant overview I wanted to have. And it’s not made for **conditional filtering**.

So, I exported the library, read and processed the `.xml?` file in **R**, created an excerpt, and visualised this sample in **Tableau**. Well, that worked quite nicely… You can have a look at [the result](https://public.tableau.com/profile/thomas.massie#!/vizhome/AppleMusicLibrary/APPLEMUSICMEDIATHEK) on [Tableau Public](https://public.tableau.com/).

Though, the very first thing that I realized when looking at the dashboard: my kids have a huge impact! Just watch out for "Die drei ??? Kids" or "Deine Freunde"...

You want to have a look at your Apple Music Library, too? You have R and Tableau (Public)? Just follow these really simple steps.


## Step 1

First, you have to export your library to your project folder. You can do this by selecting the export function from the menu:

![AppleMusicLibrary_export.png]({{site.baseurl}}/img/AppleMusicLibrary_export.png)<br/><br/>


## Step 2

Use this **R** snippet to read and process the `.xml` file. It might be a bit confusing when first working with `.xml`files. However, once you understand their structuring it's straightforward to generate a nice and clean tibble. This again is saved to an output folder in your project to be read in with Tableau in step 3. (I admit that this was also the first time I worked on `.xml`files...)


```r
rm(list = ls())

library(tidyverse)
library(xml2)

dd_xml <- read_xml("~/...ProjectFolder.../Input/Mediathek.xml")

track_info_nodes <- xml_find_all(dd_xml, "/plist/dict/dict/dict")

track_info_text <- xml_text(xml_children(track_info_nodes))

dd <- tibble(category = track_info_text[seq(1, length(track_info_text), 2)],
             value = track_info_text[seq(2, length(track_info_text), 2)]) %>% 
  mutate(track_id = ifelse(category == "Track ID", value, NA)) %>% 
  fill(track_id) %>% 
  pivot_wider(., id_cols = track_id, names_from = category, values_from = value) %>% 
  select(., -track_id)

write_csv(dd, "~/...ProjectFolder.../Output/Mediathek.csv")

```
<br/>


## Step 3

Finally, you can download the [Viz](https://public.tableau.com/profile/thomas.massie#!/vizhome/AppleMusicLibrary/APPLEMUSICMEDIATHEK) from [Tableau Public](https://public.tableau.com/)... 

![AppleMusicLibrary_download.png]({{site.baseurl}}/img/AppleMusicLibrary_download.png)<br/><br/>

... to then open it and replace the data source. Voilà! 

![AppleMusicLibrary_data-source.png]({{site.baseurl}}/img/AppleMusicLibrary_data-source.png)<br/>



