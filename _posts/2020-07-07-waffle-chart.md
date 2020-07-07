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
published: true
date: '2020-07-07'
---
Recently, I was wondering about **which are the songs I listen to most often on Apple Music**. Sure, [Apple Music](https://www.apple.com/chde/music/) can show you the "Top 25 Most Played" songs. However, it didn’t provide me with the instant overview I wanted to have. And it’s not made for **conditional filtering**.

So, I exported the library, read and processed the `.xml?` file in **R**, created an excerpt, and visualised this sample in **Tableau**. Well, that worked quite nicely… You can have a look at [the result](https://public.tableau.com/profile/thomas.massie#!/vizhome/AppleMusicLibrary/APPLEMUSICMEDIATHEK) on [Tableau Public](https://public.tableau.com/) or watch a demo on [Vimeo](https://vimeo.com/427384435).

In case you want to use this dashboard to apply it to your very own music library, just [follow these steps](https://thomassie.me/AppleMusic/)!