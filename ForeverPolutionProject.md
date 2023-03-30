---
layout: page
title: Forever Polution Project
published: true
---
![ForeverPolutionProject_parts.png]({{site.baseurl}}/img/ForeverPolutionProject_parts.png)<br><br>

I came across this topic in a recent LinkedIn [post](https://www.linkedin.com/posts/danieldrepper_wir-haben-monatelang-an-einem-projekt-gearbeitet-activity-7034453375794470912-CrkV?utm_source=share&utm_medium=member_desktop) by investigative journalist [Daniel Drepper](https://www.linkedin.com/in/danieldrepper/). An international research network investigated the spread of [PFAS](https://en.wikipedia.org/wiki/Per-_and_polyfluoroalkyl_substances) (per- and polyfluoroalkyl substances) to unveil the scale of pollution. This group of chemicals are linked to various deseases such as cancer and infertility. As a result, PFAS are estimated to account for 52 and 84 billion euros in costs for European health systems – each year. Making this thread tarnsparent to the public is the aim of the [Forever Pollution Project](https://foreverpollution.eu/). 

The interesting part besides reporting and displaying the wide spread of PFAS with often incredibly high contamination levels is the fact the Forever polution project made [all data available](https://foreverpollution.eu/maps-and-data/data/). I think that this is a truely smart move, not only in terms of transparency, but also to increase trust in their analysis. People, like me, can easily access the data to explore it themselves. And that's what I did...

I had a look at their [expert dataset](https://assets-decodeurs.lemonde.fr/decodeurs/medias/foreverpollution/expert_dataset.csv). And as it is often the case with spatial data using a map is the way to go. Now, there are various approaches to visualise spatial data using different software solutions. However, since I wanted to avoid downloading and processing the data prior to pushing it further to a visualisation solution, I decided to build a [Shiny](https://shiny.rstudio.com) app in R. Shiny enables R programmers (soon [available for Python](https://shiny.rstudio.com/py/), too) to quickly build interactive visualisations and share these via [shinyapps.io](https://www.shinyapps.io) for free. That is simply great!

The resulting **[app](https://thomassie.shinyapps.io/Forever_Polution_Project/)** allows to 
- get an **overview** about the *entire* dataset; that is, all 33 countries instead of just Germany, for example,
- **filter** for specific characteristics (only groundwater sites in Hamburg, Germany),
- access all information for a **specific site**, and
- come across **biases and flaws** in the data.

In short, these are the main parts:

**1 – side panel**<br>
Allows to adjust the view to specific interests. One can choose between three different contamination categories, select one or more countries as well as site and matrix types, and to search for a specific city.<br>
**2 – map**<br>
Allows to quickly locate sites according to what choices were made in the side panel.<br>
**3 – tooltip**<br>
Provides all information available for a specific site as well as links directing to the source ans the project itself.

<iframe height="2000" width="100%" frameborder="no" src="https://thomassie.shinyapps.io/Forever_Polution_Project/"> </iframe>

<br>

**Note**: Whenever you see any bugs or want to suggest improvements, please, feel free to contact me!