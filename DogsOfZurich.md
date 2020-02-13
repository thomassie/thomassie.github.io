---
layout: page
title: Dogs of Zurich
published: true
---
![Dogs --- Cover_all.png]({{site.baseurl}}/img/Dogs --- Cover_all.png)

![Dogs --- Dashboard_all.png]({{site.baseurl}}/img/Dogs --- Dashboard_all.png)


### Why this dashboard...?
Do I have a particular interest in dogs? Nope, definitely not. Rather, I wanted to check out two functionalities in [Tableau](tableau.com):

- **synchronous scrolling** of two or more tables, and
- **switching containers on/off** to show/hide content

Now, that dog dataset I came across earlier when looking for data with [Open Data Zurich](https://data.stadt-zuerich.ch/), an open data catalog containing freely accessible data from the city of Zurich. There's a lot of interesting data to find there... I chose the dog dataset because it's small and not used very often. But you can find an outdated version on [Kaggle](), too.


### What's its scope?
Because every visualisation needs to be designed to answer specific questions I stated the following:

1. How many **dogs** are there in Zurich?
2. Which **dog types** are most common?
3. Are there any preferences by a dog **owner**'s gender or age?

These are three questions for which one can easily build a dashboard to answer them.


### What's on the dashboard?
First, I decided that the dashboard should have two parts: a **cover** that provides a quick overview about the main facts (How many dogs? How many types? How many owners?), and, the actual **dashboard** which contains more detailed information and allows for a higher degree of interactivity. These parts are connected by, both, a navigation button on the lower right corner and the globally acting parameter values.

### The cover
I call it 'cover' but it could as well be named 'overview' or 'intro'. To me, it serves as a cover for the actual dashboard. Therefore, it does show the **main facts**, but lacks the detail and interactivity provided by the actual dashboard.

![Dogs --- Cover_1st.png]({{site.baseurl}}/img/Dogs --- Cover_1st.png)

The main part of the cover are **three numbers** providing the answers to the questions stated in the previous paragraph. Next to these, one can see **three donut charts** displaying the contribution of the top *n* dog types to the respective variables (# dogs, # types, # owners). I really appreciate the Pareto approach here. When looking for the most common dog types I'm also interested in how much these contribute to total numbers. For example, in 2017 the top 30 types (10% of all types) made 65% of all dogs in Zurich. I considers this being really helpful to get a good idea about this dataset. **Year** (**1**) and **top *n*** (**2**) parameters can be set in the upper right part of the cover. The act globally for, both, cover and dashboard.
To get to the actual dashboard you can click on the **navigation button** (**3**) in the lower right corner.

![Dogs --- Cover_2nd.png]({{site.baseurl}}/img/Dogs --- Cover_2nd.png)

On the bottom of the cover I included a **wordcloud** (**4**) to see the actual dogs types. When hovering over the type names, a tooltip appears revealing the total number of dogs belonging to this type and the respective rank in parentheses. In addition, when clicking on a type a link is provided to the respective site with [Wikipedia.de](https://wikipedia.de). Please, be aware that this link will guide you to the German Wikipedia page! This is due to the fact that the names of all dog types are in German. It would have been to much of an effort to translate them into English. Sorry...!

Finally, I included a super simple **area chart** (**5**) to display how many dogs belong to which dog type. The respective dog type gets highlighted in here when hovering over the wordcloud.
