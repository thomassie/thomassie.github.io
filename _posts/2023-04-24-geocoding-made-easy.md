---
layout: post
title: Geocoding made easy
image: /img/tidygeocoder_hex.png
tags:
  - R
  - tidygeocoder
  - geocoding
  - geo
  - map
  - visualization
  - viz
published: true
date: '2023-05-04'
---

It happens from time to time that I'm using datasets which include physical addesses that need to be turned into longitude/latitude data. For example, when working data of [mass shootings](https://www.gunviolencearchive.org/mass-shooting) in the US the [Gun Violence Archive GVA](https://www.gunviolencearchive.org/) provides physical addresses only. 

So, how to get long/lat data? Well, there are many solution out there. However, `tidygeocoder` is by far the most convenient one to get the job done. The package was developped by [Jesse Cambon](https://jessecambon.github.io), [Diego Hernangómez](https://github.com/dieghernan), [Christopher Belanger](https://github.com/chris31415926535) and [Daniel Possenriede](https://github.com/dpprdan). I especially like that it allows you to chose your service or 'method' of choice. You may use ones that don't require any API key, such as [Nominatim](https://nominatim.org) or [ArcGis](https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm), or others that do, such as [Google](https://developers.google.com/maps/documentation/geocoding/overview?hl=de) or [TomTom](https://developer.tomtom.com/search-api/search-api-documentation).

I tried, both, Nominatim (`method = "osm"`) and ArcGis (`method = "arcgis"`) and checked the results. While Nominatim was failing quite often with an address value like `2746 Fleur Dr., Des Moines, Iowa`, ArcGis found all long/lat data as well as the other details that are possible to retrieve (`full_results = TRUE`) with a score of 100 or slightly below. 

Here's the code. You should definitely give it a try! 

```
library(tidyverse)
library(janitor)
library(skimr)
library(tidygeocoder)


# clean workspace
rm(list = ls())


# read data
dd_children_killed_raw = read_csv("../02_data/children_killed_20230423.csv")
dd_children_injured_raw = read_csv("../02_data/children_injured_20230423.csv")

dd_children_raw <- dd_children_killed_raw %>% 
  bind_rows(dd_children_injured_raw)


# basic checks
glimpse(dd_children_raw)
# a bit more detail
skim(dd_children_raw)


# geocoding physical addresses to long/lat data
dd_children <- dd_children_raw %>% 
  # cleaning field names
  clean_names() %>% 
  sample_frac(size = 0.005) %>% 
  mutate(
    # adding an age class
    age_class = "children (0-11 years)",
    # full address field used for geocoding
    full_address = paste0(address, ", ", city_or_county, ", ", state),
    # creating a real date field
    incident_dates = as.Date(incident_date, format = "%B #d, %Y")
  ) %>% 
  arrange(incident_id) %>% 
  # getting all details from selected service
  geocode(full_address, method = "arcgis", full_results = TRUE)
  # getting long/data data only
  # geocode(full_address, method = 'osm', lat = latitude , long = longitude)
```