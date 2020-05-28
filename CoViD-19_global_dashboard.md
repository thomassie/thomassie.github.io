---
layout: page
title: Global CoViD-19 dashboard
published: true
---
![CoViD-19_Dashboard.mov]({{site.baseurl}}/img/CoViD-19_Dashboard.mov)


## Motivation

When Sars-CoV-2 (the virus) and the disease it causes (CoViD-19) started becoming a pandemic, I wanted to monitor the cases reported by the [Center for Systems Science and Engineering (CSSE) at Johns Hopkins University](https://systems.jhu.edu/). 

There is a [dashboard from CSSE](https://coronavirus.jhu.edu/map.html) already in place that most people have seen due to its immense presence in media:

![CoViD-19_CSSE-dashboard.png]({{site.baseurl}}/img/CoViD-19_CSSE-dashboard.png)

Now, this dashboard isn't bad. But, I got the feeling that it doesn't provide me with the overview I'm expecting from it. Getting the information your looking for isn't that easy because the dashboard is super packed. Here's an [example from the WHO](https://covid19.who.int) that I consider being much better. Also, mixing countries and provinces when plotting them on a map doesn't work, as people are instantly trying to make comparisons between them. Moreover, I'm not happy with the dark layout and the overly dramatic colours that are used. The numbers are already dramatic themselves and one shouldn't add an additional layer of alarm to it.

So, I decided to do my very own dashboard using [Tableau](https://www.tableau.com/) and [Tableau Public](https://public.tableau.com). The aim was to 
 - provide a quick overview about cases on a global and country level,
 - get an idea about how the disease develops on these levels, and
 - allow for comparisons between countries by using relative numbers (i.e., cases per 100'000 citizens).
 
 Also, the colouring shouldn't be alarming but rather neutral to not get distracted by bright reds or blinking gimmicks. In brief, I wanted to create an unbiased and informative dashboard.
 You can find the result [here](https://public.tableau.com/profile/thomas.massie#!/vizhome/Covid-19---VIZ/Dashboard).



## Getting & preparing data

Fortunatelly, the [Center for Systems Science and Engineering (CSSE) at Johns Hopkins University](https://systems.jhu.edu/) provides their data in an easily accessable manner: .csv files placed in a GitHub repository. 

First, I load the required packages `tidyverse` (data manipulation etc.), `janitor` (here, solely to use `clean_names()`) and `plotly`(for minimal interactive plots). No other packages are needed here.
```
library(tidyverse)
library(janitor)
library(plotly)
```

Then, I read the data from CSSE's [CoViD-19 GitHub repository](https://github.com/CSSEGISandData/COVID-19). The times series data is stored as three seperate files for *confirmed cases*, *deaths* and *recovered cases*. Here's what I did with the confirmed cases data.
```
# confirmed cases

# Connect to the repository and read the raw .csv file:
dd_org_confirmed = read_csv(url("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")) %>% 
	# If information on provinces is needed you might uncomment this line:
  	# select(., -c("Province/State")) %>% 
	# Transform to long format.
  	pivot_longer(., cols = -c("Country/Region", "Province/State", "Lat", "Long"), names_to = "Date", values_to = "confirmed")

```

The same is done for deaths and recovered cases.
```
# deaths
dd_org_deaths = read_csv(url("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")) %>% 
  	pivot_longer(., cols = -c("Country/Region", "Province/State", "Lat", "Long"), names_to = "Date", values_to = "deaths") 

# recovered
dd_org_recovered = read_csv(url("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv")) %>% 
  	pivot_longer(., cols = -c("Country/Region", "Province/State", "Lat", "Long"), names_to = "Date", values_to = "recovered") 
 ```

All three datasets are combined to a single one that contains all information, including active cases being calculated as the sum of confirmed cases minus deaths and recovered cases.
```
dd <- dd_org_confirmed %>% 
	# Combine datasets by left-joining these:
  	left_join(., dd_org_deaths, by = c("Country/Region", "Province/State", "Date", "Lat", "Long"), copy = FALSE, keep = FALSE) %>% 
  	left_join(., dd_org_recovered, by = c("Country/Region", "Province/State", "Date", "Lat", "Long"), copy = FALSE, keep = FALSE) %>% 
  	# Adding a new variable for active cases:
  	mutate(active = confirmed - deaths - recovered,
         Date = mdy(Date)) %>% 
    # Collapse case types to a single variable denoted 'status':
  	pivot_longer(., cols = c(confirmed, deaths, recovered, active), names_to = "status", values_to = "cases") %>% 
  	# Clean variable names:
  	clean_names() 
```

Now, a quick check what the data looks like.
```
str(dd)
head(dd)
```
![CoViD-19_str_head.png]({{site.baseurl}}/img/CoViD-19_str_head.png)

And a brief graphical check using data for Germany:
```
ggplotly(dd %>% 
                   filter(., country_region == "Germany") %>% 
                   ggplot(aes(x = date, y = cases, colour = status)) +
                   geom_line() +
                   labs(title = "CoViD-19 cases for Germany") +
                   xlab("") +
                   ylab("") +
                   scale_colour_manual(values = c("#D8A94F", "#4E4E4C", "#A44A51", "#6378AC")) +
                   theme_minimal() +
                   theme(legend.title = element_blank()))
```
![CoViD-19_head_time-series_plotly.png]({{site.baseurl}}/img/CoViD-19_head_time-series_plotly.png)

Looks good!

Finally, I export the the data to a .csv file on my computer. Alterantively, one could save the data to another repository and connect Tableau to it via a web connector. But, for now, I didn't manage to do this...
```
# Export to .csv file.
write.csv(dd, "user_path/covid_time_series.csv")
```


