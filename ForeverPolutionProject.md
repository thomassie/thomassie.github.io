---
layout: page
title: ForeverPolutionProject
published: true
---
![ForeverPolutionProject.png]({{site.baseurl}}/img/ForeverPolutionProject.png)<br/><br/>

I came across this topic in a recent LinkedIn [post](https://www.linkedin.com/posts/danieldrepper_wir-haben-monatelang-an-einem-projekt-gearbeitet-activity-7034453375794470912-CrkV?utm_source=share&utm_medium=member_desktop) by investigative journalist [Daniel Drepper](https://www.linkedin.com/in/danieldrepper/). An international research network investigated the spread of [PFAS](https://en.wikipedia.org/wiki/Per-_and_polyfluoroalkyl_substances) (per- and polyfluoroalkyl substances) to unveil the scale of pollution. This group of chemicals are linked to various deseases such as cancer and infertility. As a result, PFAS are estimated to account for 52 and 84 billion euros in costs for European health systems – each year. Making this thread tarnsparent to the public is the aim of the [Forever Pollution Project](https://foreverpollution.eu/). 

The interesting part besides reporting and displaying the wide spread of PFAS with often incredibly high contamination levels is the fact the Forever polution project made [all data available](https://foreverpollution.eu/maps-and-data/data/). I think that this is a truely smart move, not only in terms of transparency, but also to increase trust in their analysis. People, like me, can easily access the data to explore it themselves. And that's what I did...

I had a look at their [expert dataset](https://assets-decodeurs.lemonde.fr/decodeurs/medias/foreverpollution/expert_dataset.csv). And as it is often the case with spatial data using a map is the way to go. Now, there are various approaches to visualise spatial data using different software solution. However, since I wanted to avoid downloading and processing the data prior to pushing it further to a visualisation solution, I decided to build a [Shiny](https://shiny.rstudio.com) app in R. In my opinion, Shiny enables R programmers (soon [available for Python](https://shiny.rstudio.com/py/), too) to quickly build interactive visualisations and make these available on [shinyapps.io](https://www.shinyapps.io) for free. 


[app](https://thomassie.shinyapps.io/Forever_Polution_Project/)