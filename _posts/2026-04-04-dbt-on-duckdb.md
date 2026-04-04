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
published: true
date: '2026-04-04'
---

In the [previous post](https://thomassie.me/2026-03-21-personal-dwh-duckdb/) I described how to load Parquet exports into a local DuckDB database — a fast, free, file-based data warehouse you can have running in an afternoon. The raw tables are queryable straight away. But to turn them into something reliable, documented, and ready for an analytics environment, you need a transformation layer. That is what **dbt Core** provides.

**What dbt does**

dbt (data build tool) takes the messy work of SQL transformations — renaming columns, joining tables, applying business logic, calculating metrics — and turns it into a versioned, testable, documented codebase. Each transformation is a plain `.sql` file. dbt compiles them, resolves dependencies, and runs them in the right order. The result is a set of clean, analysis-ready tables and views in your database.

The open-source version, **dbt Core**, is free and runs entirely from the command line. A DuckDB adapter connects it to your `.duckdb` file with minimal configuration.

**Installing dbt Core and the DuckDB adapter**

Install both into your Python environment (Conda recommended):

```bash
pip install dbt-core dbt-duckdb
```

Verify the installation:

```bash
dbt --version
```

**Initialising the project**

Navigate to the folder where you want the dbt project to live — not inside the DWH folder — and run:

```bash
dbt init your_project_name
```

The wizard will ask for a project name (lowercase letters, digits, and underscores only) and a database type — select `duckdb`. This creates the project folder structure and writes a starter `profiles.yml` to `~/.dbt/profiles.yml`.

**Configuring the connection**

Open `~/.dbt/profiles.yml` and replace the contents with:

```yaml
your_project_name:
  target: dev
  outputs:
    dev:
      type: duckdb
      path: /absolute/path/to/your/dwh.duckdb
```

The path must be the full absolute path — relative paths will not work reliably across terminal sessions. Test the connection with:

```bash
dbt debug
```

All checks should be green: profiles.yml valid, dbt_project.yml valid, git found, connection successful.

**Project folder structure**

After initialisation, the project looks like this:

```
your_project_name/
├── models/
│   ├── staging/
│   ├── intermediate/
│   └── marts/
├── tests/
├── macros/
├── seeds/
├── snapshots/
└── dbt_project.yml
```

The `models/` directory is where all transformation logic lives. Everything else supports it.

**The three-layer architecture**

dbt projects conventionally follow a three-tier model structure. The tiers are not enforced by dbt itself — they are a well-established pattern that keeps transformations clean, maintainable, and easy to reason about.

**1. Staging** (`models/staging/`)

One model per source table. The only job of a staging model is to clean up the raw data: rename columns to a consistent snake_case convention, cast data types where needed, and make the data structurally consistent. No business logic belongs here.

Before writing staging models, register your raw tables in a `sources.yml` file. This tells dbt where to find the raw data and enables the `{{ source() }}` macro, which powers lineage tracking:

```yaml
# models/staging/sources.yml
version: 2

sources:
  - name: main
    description: "Raw DWH tables loaded from Parquet exports"
    tables:
      - name: customers
      - name: contacts
      - name: orders
      - name: invoices
      - name: products
```

A staging model then looks like this:

```sql
-- models/staging/stg_orders.sql
WITH source AS (
    SELECT * FROM {{ source('main', 'orders') }}
),

renamed AS (
    SELECT
        id                  AS order_id,
        "customerId"        AS customer_id,
        date                AS order_date,
        status,
        "totalAmount"       AS total_amount,
        "createdAt"         AS created_at,
        "updatedAt"         AS updated_at
    FROM source
)

SELECT * FROM renamed
```

The `{{ source() }}` macro is more than a table reference — it creates an explicit dependency that dbt uses to build the lineage graph and surface data freshness information.

**2. Intermediate** (`models/intermediate/`)

Intermediate models sit between staging and marts. They handle joins, enrichments, and any logic that is reusable across multiple final outputs but not meaningful enough to expose directly to consumers. Think of them as named building blocks.

```sql
-- models/intermediate/int_orders_with_customers.sql
SELECT
    o.order_id,
    o.order_date,
    o.status,
    o.total_amount,
    c.customer_name,
    c.customer_type
FROM {{ ref('stg_orders') }} o
LEFT JOIN {{ ref('stg_customers') }} c ON c.customer_id = o.customer_id
```

The `{{ ref() }}` macro — like `{{ source() }}` — creates tracked dependencies. dbt will always run referenced models before the models that depend on them.

**3. Marts** (`models/marts/`)

Marts are the final, analysis-ready outputs. They are designed for consumption: each mart answers a specific analytical question cleanly, at the right grain, with meaningful column names. These are what BI tools, notebooks, or other analytics environments connect to.

Marts are typically materialised as tables (not views) so that query performance in the consuming tool is fast and predictable:

```sql
-- models/marts/revenue_by_month.sql
{{ config(materialized='table') }}

SELECT
    DATE_TRUNC('month', order_date)     AS month,
    customer_type,
    COUNT(order_id)                     AS order_count,
    ROUND(SUM(total_amount), 2)         AS revenue
FROM {{ ref('int_orders_with_customers') }}
WHERE status = 'paid'
GROUP BY 1, 2
ORDER BY 1, 2
```

**Running models**

```bash
dbt run              # build all models
dbt run -s staging   # build only the staging layer
dbt run -s +marts    # build marts and all their upstream dependencies
```

**Adding tests**

dbt has a built-in testing framework. Column-level tests are defined in a `schema.yml` file alongside the models:

```yaml
# models/staging/schema.yml
version: 2

models:
  - name: stg_orders
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
      - name: customer_id
        tests:
          - not_null
          - relationships:
              to: ref('stg_customers')
              field: customer_id
```

Run all tests with:

```bash
dbt test
```

Failed tests show exactly which rows violated which constraints — invaluable for catching data quality issues before they reach your analytics layer.

**Generating documentation**

dbt generates a full documentation site from your models, sources, and schema definitions:

```bash
dbt docs generate
dbt docs serve
```

The docs site includes a **lineage graph** that shows every model, source, and mart as nodes, with edges showing how data flows between them. It is the clearest visual representation of what the data warehouse actually does — and it stays up to date automatically as models change.

**Working in Positron with dbt Power User**

[Positron](https://github.com/posit-dev/positron) is a data science IDE from Posit, built on the VS Code engine. The **dbt Power User** extension (by Altimate Inc.) integrates deeply with dbt Core and makes the day-to-day experience noticeably better:

- A **lineage panel** shows the upstream and downstream dependencies of whatever model you have open
- **Model previews** let you run a model and inspect the output directly in the IDE
- **Autocomplete** for `{{ ref() }}` and `{{ source() }}` macros
- **Run and test** buttons so you rarely need to switch to the terminal

Open the dbt project folder in Positron (`File → Open Folder`) and the extension auto-detects `dbt_project.yml`. The setup wizard walks through selecting your Python interpreter (the environment where dbt is installed) and validating the connection.

**Version control with Git**

dbt init creates a `.gitignore` that already excludes the right folders (`target/`, `dbt_packages/`, `logs/`). Initialise the repository and make an initial commit:

```bash
git init
git add .
git commit -m "Initial dbt project setup"
```

After each meaningful change — a new model, a new test, updated documentation — commit via the terminal or Positron's built-in Source Control panel. Keeping the history clean makes it easy to see what changed and why, and to roll back if something breaks.

One important note: **never commit `profiles.yml` to Git**. It lives in `~/.dbt/` outside the project folder and contains local file paths. It should stay local.

**Refreshing the data**

When new Parquet exports arrive, a full refresh takes three steps:

```bash
./setup_dwh.sh    # rebuild the raw DWH from new parquet files
dbt run           # rebuild all transformed models
dbt test          # verify data quality
```

The entire cycle — from fresh exports to tested, analysis-ready mart tables — runs in seconds for datasets of typical small-to-medium size. No cloud credits, no orchestration infrastructure, no maintenance overhead. For any project where data arrives periodically as flat-file exports, this stack is hard to beat.
