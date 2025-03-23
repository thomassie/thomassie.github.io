---
layout: page
title: Charts in Flourish
published: true
---

![Flourish.jpg]({{site.baseurl}}/img/Flourish.jpg)<br><br>

## What is Flourish?

[Flourish](https://flourish.studio) is an online visualisation tool. It facilitates the creation of interactive visualisations and stories without the necessity for any coding skills. It boasts a wide range of chart types, maps, and animations, all of which can be customised to accommodate (almost) any data set. With Flourish, users can easily upload their own data to fashion engaging and informative visualisations.

One of the most significant advantages of Flourish is its ease of use. The platform is both intuitive and user-friendly, making it accessible to users with diverse skill levels. Furthermore, Flourish provides a range of integrations, enabling users to embed their visualisations seamlessly into websites.

Flourish boasts an extensive selection of interactive features and animations that can be incorporated into charts and maps, including hover effects, click interactions, and animations. These interactive features empower users to craft engaging and dynamic visualisations that respond to user input and simplify the exploration and understanding of data insights.

In addition to standard interactivity features, Flourish also provides more advanced interactive features such as filters, sliders, and drop-down menus. These can be utilised to allow users to explore different facets of the data set and tailor the visualisation to their specific needs.

The platform offers a free plan encompassing basic features, as well as paid plans for users requiring more advanced functionality, for instance, custom templates.

In the following section, I will display a few visualisations and also mention some of the challenges one might encounter when using Flourish.
<br><br>

## Examples
<br><br>

### **Choropleth map**

...displaying key figures for Swiss municipalities.

<div class="flourish-embed flourish-map" data-src="visualisation/10105282"><script src="https://public.flourish.studio/resources/embed.js"></script></div>

Everything is working as expected here. That is, when hovering over a tile one can obtain a couple of statistics for the respective municipality. Colors indicate that urban character a municipality has, white lines the borders between Swiss major regions. Nothing more, nothing less.
<br><br>

...displaying most expensive and most modest-priced health insurances premiums in 2023 for adults with a deductibel of CHF 300.

<div class="flourish-embed flourish-map" data-src="visualisation/13562828"><script src="https://public.flourish.studio/resources/embed.js"></script></div>

This is a more complex choropleth map than the previous one. First, what is quite evident is the capacity to adjust map colours. That is, one can choose to colour the map either by minimum or maximum premiums. This is achieved by including two columns that contain the values for colouring the map. Additionally, the rather comprehensive pop-up window or tooltip displays detailed information regarding minimum and maximum premiums as well as the maximum potential savings – per month and year.<br><br>
For the most part, the map operates as expected, displaying all information accurately and adjusting the colours appropriately for low/high values. However, there are two points that are somewhat troublesome. First, when using the search field, it lists all values for the column in use. That is, when searching for a specific municipality, you will always see two names instead of just one, as it does not list unique values. Secondly, the search field persistently sits at the very top layer. This causes the visualisation to look a bit messy when the tooltip is overlaid by the search field.

<br>

### **Line chart**

...displaying election results for German Bundestag.

<div class="flourish-embed flourish-chart" data-src="visualisation/13203520"><script src="https://public.flourish.studio/resources/embed.js"></script></div>

This simple visualisatin performs as intended. Nice!

<br>

### **Bar chart**

...displaying vine production in the German federal state of Baden-Württemberg.

<div class="flourish-embed flourish-chart" data-src="visualisation/13662494"><script src="https://public.flourish.studio/resources/embed.js"></script></div>

Here, the intention was to showcase the ability to include and position a picture in the background of the plot. This works smoothly as one would expect. However, when looking carefully at the tooltip one can see that the rounded edges are applied only to the header rectangle. This makes this pop-up window and the entire figure look a bit unprofessional.

<br>

### **Column chart**

...displaying election results for German Bundestag.

<div class="flourish-embed flourish-chart" data-src="visualisation/13200180"><script src="https://public.flourish.studio/resources/embed.js"></script></div>

Also a minor, but nontheless annoying bug is seen in the first column (2021, SPD, 25.7%): one cannot read the label. A workaround would be to set the maximum value of the y-axis to, let's say, 30%. However, this affects the scale also for all other election years. No idea why Flourish is not able to properly handle labels on top of columns. 

<br>

### **Pie chart**

...displaying election results for German Bundestag.

<div class="flourish-embed flourish-chart" data-src="visualisation/13193631"><script src="https://public.flourish.studio/resources/embed.js"></script></div>

The pie chart performs as expected, no surprises here. However, the actual intention was to display charts within pop-up windows. This is enabled by first creating individual time series charts for each of the parties visible, and then including references to these in the dynamic url. It takes a bit of time to load, but basically works well.

This is a different approach compared to, for example, Tableau where within tooltip visualisations are created based on a single chart that gets filtered by whatever variables you hover over. From a workflow perspective, Flourish's approach of dealing with within-pop-up charts is way more labour-intensive – and also a bit annoying, frankly speaking.

<br>

### **Slope chart**

...displaying differences in election results for German Bundestag.

<div class="flourish-embed flourish-slope" data-src="visualisation/13210020"><script src="https://public.flourish.studio/resources/embed.js"></script></div>



<br>

### **Stacked column chart**
...displaying election results for German Bundestag.
<div class="flourish-embed flourish-chart" data-src="visualisation/13726551"><script src="https://public.flourish.studio/resources/embed.js"></script></div>
<br>

### **Area chart**
...displaying election results for German Bundestag.

<div class="flourish-embed flourish-chart" data-src="visualisation/13211564"><script src="https://public.flourish.studio/resources/embed.js"></script></div>
<br>

### **Stream chart**
...displaying the number of seats in the German Bundestag.
<div class="flourish-embed flourish-chart" data-src="visualisation/13735422"><script src="https://public.flourish.studio/resources/embed.js"></script></div>
<br>

### **Parliament chart**
...displaying the number of seats in the German Bundestag.

<div class="flourish-embed flourish-parliament" data-src="visualisation/13193562"><script src="https://public.flourish.studio/resources/embed.js"></script></div>