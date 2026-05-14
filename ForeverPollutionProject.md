---
layout: page
title: Forever Pollution Project
published: true
---
![ForeverPolutionProject_parts.png]({{site.baseurl}}/img/ForeverPolutionProject_parts.png)<br><br>

I came across this topic in a recent LinkedIn [post](https://www.linkedin.com/posts/danieldrepper_wir-haben-monatelang-an-einem-projekt-gearbeitet-activity-7034453375794470912-CrkV?utm_source=share&utm_medium=member_desktop) by investigative journalist [Daniel Drepper](https://www.linkedin.com/in/danieldrepper/). An international research network investigated the spread of [PFAS](https://en.wikipedia.org/wiki/Per-_and_polyfluoroalkyl_substances) (per- and polyfluoroalkyl substances) to unveil the scale of pollution. These chemicals are linked to various diseases such as cancer and infertility. As a result, PFAS are estimated to account for between 52 and 84 billion euros in costs for European health systems – each year. Making this threat transparent to the public is the aim of the [Forever Pollution Project](https://foreverpollution.eu/). 

The interesting part besides reporting and displaying the widespread contamination by PFAS with often incredibly high levels is the fact the Forever Pollution Project made [all data available](https://foreverpollution.eu/maps-and-data/data/). I think that this is a truly smart move, not only in terms of transparency, but also to increase trust in their analysis. People like me can easily access the data and explore it themselves. And that's what I did...

I had a look at their [expert dataset](https://assets-decodeurs.lemonde.fr/decodeurs/medias/foreverpollution/expert_dataset.csv). And as is often the case with spatial data, using a map is the way to go. Now, there are various approaches to visualise spatial data using different tools. However, since I wanted to avoid downloading and processing the data before feeding it into a visualisation tool, I decided to build a [Shiny](https://shiny.rstudio.com) app in R. Shiny lets R programmers (soon [available for Python](https://shiny.rstudio.com/py/), too) quickly build interactive visualisations and share these via [shinyapps.io](https://www.shinyapps.io) for free. That is simply great!

The resulting **[app](https://thomassie.shinyapps.io/Forever_Polution_Project/)** lets you 
- get an **overview** of the *entire* dataset; that is, all 33 countries instead of just Germany, for example,
- **filter** for specific characteristics (only groundwater sites in Hamburg, Germany),
- access all information for a **specific site**, and
- come across **biases and flaws** in the data.

In short, these are the main parts:

**1 – side panel**<br>
Lets you adjust the view to specific interests. One can choose between three different contamination categories, select one or more countries as well as site and matrix types, and search for a specific city.<br>
**2 – map**<br>
Lets you quickly locate sites based on the choices made in the side panel.<br>
**3 – tooltip**<br>
Provides all information available for a specific site as well as links to the source and the project itself.

<iframe height="2000" width="100%" frameborder="no" src="https://thomassie.shinyapps.io/Forever_Polution_Project/"> </iframe>

<br>

**Note**: Whenever you see any bugs or want to suggest improvements, please, feel free to contact me!