---
layout: post
title: dbt on DuckDB — from raw tables to mart models
image: /img/dbt_logo.png
tags:
  - DuckDB
  - dbt
  - SQL
  - data modeling
  - data engineering
  - staging
  - marts
published: false
date: '2026-04-04'
---

In the [previous post](https://thomassie.me/personal-dwh-duckdb/) I described how the raw DWH gets built from Parquet exports using DuckDB. Now for the interesting part: the **dbt layer** that sits on top and turns those 38 raw tables into something actually useful.

**Three layers**

dbt projects follow a layered convention. Mine has three:

- **Staging** (`models/staging/`) — one model per source table. Only job: rename camelCase columns to snake_case and register sources. No business logic here.
- **Intermediate** (`models/intermediate/`) — joins and enrichments. Not yet a final output, just a stepping stone between staging and marts.
- **Marts** (`models/marts/`) — the final, analysis-ready tables. These are what Tableau (or any other analytics environment) connects to.

Staging models are simple by design. Here's `stg_invoices.sql`:

```sql
WITH source AS (
    SELECT * FROM {{ source('main', 'invoices') }}
),
renamed AS (
    SELECT
        id                           AS invoice_id,
        "documentNumber"             AS document_number,
        "companyId"                  AS company_id,
        date                         AS invoice_date,
        "datePayment"                AS payment_date,
        status,
        ROUND(netto  / 100.0, 2)    AS netto_chf,
        ROUND(brutto / 100.0, 2)    AS brutto_chf,
        "createdAt"                  AS created_at,
        "editedAt"                   AS edited_at
    FROM source
)
SELECT * FROM renamed
```

Clean, readable, and the `{{ source() }}` macro means dbt tracks lineage automatically — the dbt Power User extension renders this as a visual dependency graph right in the sidebar.

**The tricky mart: revenue vs. expenses**

The most interesting model is `revenue_vs_expenses`. The goal: one row per month × company × product group with revenue on one side and monthly expenses on the other — so Tableau can plot both in a single viz.

The problem: **revenue is naturally at the company × group grain. Expenses are only at the month grain** — they're organisation-wide costs. If you JOIN expenses onto revenue naively, every revenue row in that month gets a copy of the expenses. A month with 20 company/group combinations? Expenses get multiplied by 20. Totals become completely wrong and very hard to debug in Tableau.

The fix is a `ROW_NUMBER()` window function. Expenses get assigned to exactly the *first* revenue row per month; all other rows get a zero:

```sql
CASE WHEN ROW_NUMBER() OVER (
        PARTITION BY month
        ORDER BY company_name, group_name
     ) = 1
THEN expenses_netto_chf
ELSE 0 END AS expenses_netto_chf
```

Now any aggregation in Tableau — at any grain — sums expenses correctly without double-counting. A small amount of extra care at model design time that saves a lot of confusion downstream.

**Refreshing the data**

When new exports arrive, a full refresh takes three commands:

```bash
./setup_dwh.sh    # rebuild DWH from new parquet files
dbt run           # rebuild all transformed models
dbt test          # verify nothing broke
```

That's it. No cloud credits, no orchestration complexity, no infrastructure to maintain. For a small organisation that exports data periodically and needs reliable, queryable analytics on top of it — this stack hits a sweet spot that I'll probably reach for again.
