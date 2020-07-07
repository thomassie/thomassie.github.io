---
layout: post
title: Waffle charts in R
image: /img/Waffle_CoViD-19_US_squared.png
tags:
  - R
  - ggplot
  - visual analytics
  - visualization
  - viz
  - waffle
  - isotype
  - chart
  - CoViD-19
published: true
date: '2020-07-07'
---
Displaying **proportional data**, i.e., subsets of data that contribute to a whole, can be done in various ways. However, two particular suitable types of visualisations are **isotypes** and **waffle charts**. 

By making use of **isotypes** ([**i**nternational **s**ystem **o**f **t**ypographic **p**icture **e**ducation](https://en.wikipedia.org/wiki/Isotype_(picture_language))), one automatically switches from a continuous representation of data to a (semi-)discrete one: each isotype stands for a specific proportion (e.g., 1'000 people) that can easily be summed up by the viewer (23 isotypes make 23'000 people). Also, the viewer can often much better relate to a specific topic compared to when looking at plain percentage bars. 

A **waffle chart** provides a means to graphically display proportions of a whole. Search for it and you will find numerous examples. It is a cool alternative to a pie chart, including the very same restrictions (e.g., number of categories). However, it's discrete with each cell representing a specific proportion of the whole. For instance, a 10 by 10 matrix waffle results in 100 cells and is therefore very well-suited for displaying percentages. In combination with isotypes, waffle charts get really impressive!


![Waffle_CoViD-19-US.png]({{site.baseurl}}/img/Waffle_CoViD-19-US.png)<br/><br/>