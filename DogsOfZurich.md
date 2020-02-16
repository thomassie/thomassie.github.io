---
layout: page
title: Dogs of Zurich
published: true
---
![Dogs --- Cover_all.png]({{site.baseurl}}/img/Dogs --- Cover_all.png)

![Dogs --- Dashboard_all.png]({{site.baseurl}}/img/Dogs --- Dashboard_all.png)

Dogs of Zurich is a dashboard that provides an overview about the dog types registered in the city of Zurich (CH). I


## Why this dashboard...?
Do I have a particular interest in dogs? Nope, definitely not. Rather, I wanted to check out two functionalities in [Tableau](tableau.com):

- **synchronous scrolling** of two or more tables, and
- **switching containers on/off** to show/hide content

Now, that dog dataset I came across earlier when looking for data with [Open Data Zurich](https://data.stadt-zuerich.ch/), an open data catalog containing freely accessible data from the city of Zurich. There's a lot of interesting data to find there... I chose the dog dataset because it's small and not used very often. But you can find an outdated version on [Kaggle](https://www.kaggle.com/kmader/dogs-of-zurich), too.


## What's its scope?
Because every visualisation needs to be designed to answer specific questions I came up with the following:

1. How many **dogs** are there in Zurich?
2. Which **dog types** are most common?
3. Are there any preferences by a dog **owner**'s gender or age?

These are three questions for which one can easily build a dashboard to answer them.


## What's the content?
First, I decided that the dashboard should have two parts: a **cover** that provides a quick overview about the main facts (How many dogs? How many types? How many owners?), and, the actual **dashboard** which contains more detailed information and allows for a higher degree of interactivity. These parts are connected by, both, a navigation button on the lower right corner and the globally acting parameter values.

## Part I: the cover
I call it 'cover' but it could as well be named 'overview' or 'intro'. To me, it serves as a cover for the actual dashboard. Therefore, it does show the **main facts**, but lacks the detail and interactivity provided by the actual dashboard.

![Dogs --- Cover_1st.png]({{site.baseurl}}/img/Dogs --- Cover_1st.png)

The main part of the cover are **three numbers** providing the answers to the questions stated in the previous paragraph. Next to these, one can see **three donut charts** displaying the contribution of the top *n* dog types to the respective variables (# dogs, # types, # owners). I really appreciate the Pareto approach here. When looking for the most common dog types I'm also interested in how much these contribute to total numbers. For example, in 2017 the top 30 types (10% of all types) made 65% of all dogs in Zurich. I considers this being really helpful to get a good idea about this dataset. **Year** (**1**) and **top *n*** (**2**) parameters can be set in the upper right part of the cover. The act globally for, both, cover and dashboard.
To get to the actual dashboard you can click on the **navigation button** (**3**) in the lower right corner.

![Dogs --- Cover_2nd.png]({{site.baseurl}}/img/Dogs --- Cover_2nd.png)

On the bottom of the cover I included a **wordcloud** (**4**) to see the actual dogs types. When hovering over the type names, a tooltip appears revealing the total number of dogs belonging to this type and the respective rank in parentheses. In addition, when clicking on a type a link is provided to the respective site with [Wikipedia.de](https://wikipedia.de). Please, be aware that this link will guide you to the German Wikipedia page! This is due to the fact that the names of all dog types are in German. It would have been too much of an effort to translate them into English. Sorry...!

Finally, I included a super simple **area chart** (**5**) to display how many dogs belong to which dog type. The respective dog type gets highlighted in here when hovering over the wordcloud.


## Part II: the dashboard

The actual dashboard contains all the information, visualisations and functionality to quickly answer the questions stated above, and, in addition, allows to **derive detailed insights** about this dataset.

![Dogs --- Dashboard_1st.png]({{site.baseurl}}/img/Dogs --- Dashboard_1st.png)

The dashboard shows the same **key figures** (**1**) and **adjustable parameters** (**2**) as the cover. This helps the viewer getting quickly familiar with the dashboard.
The detailed information provided here is given by introducing **dog types (races)** (**3**) and **age classes** (**4**) for dog owners. These two categorical variables span a matrix in which the number of dogs is displayed by numbers and colour. Dog types are sorted by numbers in descending order. The result is a heatmap the easily allows to identify which dog types are most popular for a given age class.

![Dogs --- Dashboard_2nd.png]({{site.baseurl}}/img/Dogs --- Dashboard_2nd.png)

On top of the heatmap I placed a **first distribution** (**5**) of dog numbers related to owners age classes. In addition, the proportion of top *n* dog types is coloured in yellow to quickly compare it to all other dog types (grey).

![Dogs --- Dashboard_3rd.png]({{site.baseurl}}/img/Dogs --- Dashboard_3rd.png)

To the right of the heatmap, a **second distribution** (**6**) provides the viewer with dog numbers related to the top *n* dog types as well as the respective rank. When hovering over the bars one can read the type, the number of dogs and its relative contribution to the top *n* group.

This is the basic design: a heatmap with marginal distributions to the top and right. Now, let's switch to the actual topics why I designed this dashboard.


## Synchronous scrolling

In general, I'm not a bid fan of tables being used in dashboards. That's something people asked me for very often in my daily work: re-building Excel in Tableau. Not only that this is really missing the point of why to use dashboards, but also it gives you an idea about the mindset of the people and how they think about (visual) data analytics...

What I do like are **ranked tables**. Whenever one is interested in top performing branches, most sold products, best reviewed locations and so on, a ranked table provides this information at a glance. Hence, this type of tables can come in very handy from time to time.

However, due to design reasons, sometimes one has to combine two or more tables to behave like a single one. That's when synchronous scrolling comes into play. And that's not easy to solve, in my opinion.

## Switching containers on/off

fr
