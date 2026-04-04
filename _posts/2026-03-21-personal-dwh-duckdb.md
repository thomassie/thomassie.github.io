---
layout: post
title: A personal data warehouse — free, fast, and local
image: /img/duckdb_logo.png
tags:
  - DuckDB
  - dbt
  - data warehouse
  - Parquet
  - SQL
  - data engineering
published: true
date: '2026-03-21'
---

Working with a client who runs a small but data-rich organisation, I kept hitting the same wall: their business system exports data as Parquet files — one per table, no live connection. Fine for a one-off analysis. Not fine when you need to run queries across 38 tables, track revenue versus expenses by month, and feed a Tableau dashboard.

The obvious answer was a proper data warehouse. The less obvious answer was to build one entirely for free, locally, in about an afternoon.

**The stack**

- **[DuckDB](https://duckdb.org)** — an embedded analytical database. No server, no installation headaches. Just a single `.duckdb` file you can query like a full-blown data warehouse. It reads Parquet natively and is *fast*.
- **[dbt Core](https://www.getdbt.com)** — the open-source version of dbt. Handles all SQL transformations, testing, and documentation. Connects to DuckDB via a lightweight adapter.
- **[DBeaver](https://dbeaver.io)** — a free SQL client for browsing tables and running ad-hoc queries.
- **[Positron](https://github.com/posit-dev/positron)** — a data science IDE built on the VS Code engine. Pairs nicely with dbt via the **dbt Power User** extension (by Altimate Inc.).
- **Git** — for version-controlling the dbt project. Nothing special here, but I'd feel uncomfortable without it.

**Building the DWH**

The source data covers 38 tables: CRM (companies, contacts, leads), sales (offers, orders, invoices), training management (trainings, events, registrations), and finance (expenses, employment). Loading all of this into DuckDB is surprisingly simple. A shell script (`setup_dwh.sh`) removes any existing database and calls DuckDB with a SQL loader (`load_dwh.sql`). The loader creates one table per Parquet file — DuckDB infers all column types directly from the Parquet metadata, so no manual casting needed — and finishes with a row-count validation table.

```sql
CREATE OR REPLACE TABLE companies AS
    SELECT * FROM read_parquet('companies.parquet');
```

On top of the raw tables, I created **six analytical views** — revenue by company, training utilisation, pipeline, trainer workload, expenses by user, and full contact details. Pre-joined shortcuts for the most common questions.

The whole thing — 38 tables, 6 views — rebuilds from scratch in a few seconds. Running `./setup_dwh.sh` again is all it takes whenever new exports arrive.

One important gotcha: **DuckDB only allows one process to open the database file at a time**. If DBeaver is connected, dbt will throw a lock error. Always disconnect DBeaver before running dbt or the CLI — and vice versa. Easy to forget, mildly annoying when you do.

In the [next post](https://thomassie.me/dbt-on-duckdb/) I'll walk through the dbt layer: what the three model tiers look like, and one mart model that needed careful handling to avoid silently double-counting expenses in Tableau.
