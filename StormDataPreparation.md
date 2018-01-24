---
layout: page
title: ""
date: 2018-01-12
author: "Thomas M. Massie"
output:
  html_document:
    keep_md: true
---
<!-- mathjax: default -->













# Storm data preparation

Since I wnat to focus on the analysis of the storm data, I use R's [hurdat package](https://cran.r-project.org/web/packages/HURDAT/index.html), which does a lot of the cleaning for those who want to save time ([vignette](https://cran.r-project.org/web/packages/HURDAT/HURDAT.pdf)). 


## Reading the data

I read in two data sets: one for hurricanes (Atlantic ocean) and one for typhoons (northeast and central Pacific ocean). The original data format is the revised Atlantic hurricane database (HURDAT2, see [here](http://www.aoml.noaa.gov/hrd/hurdat/Data_Storm.html) for details). You probably want to have a look at the decription that is provided [here](http://www.aoml.noaa.gov/hrd/hurdat/newhurdat-format.pdf). 
To each data set I add a variable that indicates the respective ocean it belongs to.

```r
# Data for Atlantic storms.
dd.atlantic <- get_hurdat(basin = "AL") %>%
  mutate(Ocean = "Atlantic")
# Data for northeast and north-central Pacific storms.
dd.pacific <- get_hurdat(basin = "EP") %>%
  mutate(Ocean = "Pacific")
```

I combine both data sets to a single one.

```r
dd.org <- bind_rows(dd.atlantic, dd.pacific)
str(dd.org)
```

```
## Classes 'tbl_df', 'tbl' and 'data.frame':	76559 obs. of  22 variables:
##  $ Key     : chr  "AL011851" "AL011851" "AL011851" "AL011851" ...
##  $ Name    : chr  "UNNAMED" "UNNAMED" "UNNAMED" "UNNAMED" ...
##  $ DateTime: POSIXct, format: "1851-06-25 00:00:00" "1851-06-25 06:00:00" ...
##  $ Record  : chr  NA NA NA NA ...
##  $ Status  : chr  "HU" "HU" "HU" "HU" ...
##  $ Lat     : num  28 28 28 28.1 28.2 28.2 28.3 28.4 28.6 29 ...
##  $ Lon     : num  -94.8 -95.4 -96 -96.5 -96.8 -97 -97.6 -98.3 -98.9 -99.4 ...
##  $ Wind    : int  80 80 80 80 80 70 60 60 50 50 ...
##  $ Pressure: int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NE34    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SE34    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SW34    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NW34    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NE50    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SE50    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SW50    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NW50    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NE64    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SE64    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SW64    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NW64    : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ Ocean   : chr  "Atlantic" "Atlantic" "Atlantic" "Atlantic" ...
```

Next, I make a couple of adjustments so that the data set matches my needs for analysis:

- *Year*: to summarise/describe data by year.
- *DateTimeSameYear*: when you only want to explore seasonal occurances.
- *Duration*: giving amount of time s storm lasted.
- *WindKPH*: wind speed in km per hour.
- *KeyPlus*: a combination of *Key* and *Name*.
- *SaffirSimpson*: assigning storms a value on the [Saffir-Simpson scale](https://en.wikipedia.org/wiki/Saffir%E2%80%93Simpson_scale).

```r
dd <- dd.org %>%
  mutate(Year = year(DateTime),
         DateTimeSameYear = as.POSIXct(strptime(format(DateTime, "%m/%d %H:%M:%S"), "%m/%d %H:%M:%S")),
         WindKPH = round(Wind * 1.609344, 0),
         Duration = NA, # Needed at a latter point.
         KeyPlus = paste(Name, " (",Key,")", sep = ""),
         SaffirSimpson = ifelse(WindKPH %in% 0:62, "Tropical depression",
                                ifelse(WindKPH %in% 63:118, "Tropical storm",
                                       ifelse(WindKPH %in% 119:153, "1",
                                              ifelse(WindKPH %in% 154:177, "2",
                                                     ifelse(WindKPH %in% 178:208, "3",
                                                            ifelse(WindKPH %in% 209:251, "4", "5")))))))
```

There is one manipulation that is critical for plotting (at least) with [Leaflet for R](https://rstudio.github.io/leaflet/): All longitude values have to be positive. Otherwise Leaflet gets confused and the data "jumps" by 360\degree.

```r
dd$Lon <- ifelse(dd$Lon < 0, dd$Lon + 360, dd$Lon)
```

Then, for some variables it makes more sense if they are declared as factors.

```r
dd[c("Key", 
     "Year",
     "KeyPlus",
     "Status",
     "Ocean",
     "SaffirSimpson")] = lapply(dd[c("Key", 
                                     "Year",
                                     "KeyPlus",
                                     "Status",
                                     "Ocean",
                                     "SaffirSimpson")], as.factor)
```

Finally, I calculate the duration of each storm.

```r
# ids <- as.character(unique(dd$ID))
for (i in as.character(unique(dd$Key))) {
  dd.i <- filter(dd, Key == i)
  for (n in 1:length(dd.i$Key)) {
    # '%--%' is the interval operator returning the time difference (lubridate).
    dd.i$Duration[n] <- round(as.numeric(as.duration(dd.i$DateTime[1] %--% dd.i$DateTime[n]))/60/60/24, 2)
  }
  dd$Duration[which(dd$Key %in% i)] <- dd.i$Duration
}
```

There you go! 

```
## Classes 'tbl_df', 'tbl' and 'data.frame':	76559 obs. of  28 variables:
##  $ Key             : Factor w/ 2900 levels "AL011851","AL011852",..: 1 1 1 1 1 1 1 1 1 1 ...
##  $ Name            : chr  "UNNAMED" "UNNAMED" "UNNAMED" "UNNAMED" ...
##  $ DateTime        : POSIXct, format: "1851-06-25 00:00:00" "1851-06-25 06:00:00" ...
##  $ Record          : chr  NA NA NA NA ...
##  $ Status          : Factor w/ 12 levels "DB","ET","EX",..: 4 4 4 4 4 4 11 11 11 11 ...
##  $ Lat             : num  28 28 28 28.1 28.2 28.2 28.3 28.4 28.6 29 ...
##  $ Lon             : num  265 265 264 264 263 ...
##  $ Wind            : int  80 80 80 80 80 70 60 60 50 50 ...
##  $ Pressure        : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NE34            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SE34            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SW34            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NW34            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NE50            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SE50            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SW50            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NW50            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NE64            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SE64            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ SW64            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ NW64            : int  NA NA NA NA NA NA NA NA NA NA ...
##  $ Ocean           : Factor w/ 2 levels "Atlantic","Pacific": 1 1 1 1 1 1 1 1 1 1 ...
##  $ Year            : Factor w/ 166 levels "1851","1852",..: 1 1 1 1 1 1 1 1 1 1 ...
##  $ DateTimeSameYear: POSIXct, format: "2018-06-25 00:00:00" "2018-06-25 06:00:00" ...
##  $ WindKPH         : num  129 129 129 129 129 113 97 97 80 80 ...
##  $ Duration        : num  0 0.25 0.5 0.75 0.88 1 1.25 1.5 1.75 2 ...
##  $ KeyPlus         : Factor w/ 2900 levels "ABBY (AL011968)",..: 1598 1598 1598 1598 1598 1598 1598 1598 1598 1598 ...
##  $ SaffirSimpson   : Factor w/ 7 levels "1","2","3","4",..: 1 1 1 1 1 7 7 7 7 7 ...
```


## Storing the data set

I save the workspace for later use and exploration!

```r
save.image("StormDataWorkSpace.RData")
```




