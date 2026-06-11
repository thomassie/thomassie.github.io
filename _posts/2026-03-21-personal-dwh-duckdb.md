---
layout: post
title: A personal data warehouse — free, fast, and local
image: /img/blog_personal-data-warehouse_light.png  #duckdb_logo.png
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

Many business systems don't offer a live database connection. They export data periodically — one Parquet file per table, dropped into a folder. That works fine for a one-off look. It becomes a problem the moment you want to join tables, apply consistent transformations, or connect the data to an analytics environment in a reliable and repeatable way.

The answer is a proper data warehouse. What surprised me, building one recently for a client, is how far you can get with free, local tools — no cloud account, no server to manage, no licensing costs.

**The stack**

All of the following run locally on macOS and are free:

- **[DuckDB](https://duckdb.org)** — an embedded analytical database. No server process, no installation wizard. The entire database lives in a single `.duckdb` file you can move, copy, or delete like any other file. It reads Parquet natively, handles large datasets comfortably, and is noticeably fast.
- **[dbt Core](https://www.getdbt.com)** — the open-source transformation layer. It sits on top of DuckDB and handles all SQL transformations, documentation, and testing. A DuckDB adapter connects the two with minimal configuration.
- **[DBeaver](https://dbeaver.io)** — a free, cross-platform SQL client. Useful for browsing the database visually, running ad-hoc queries, and inspecting table structures without writing any code.
- **[Positron](https://github.com/posit-dev/positron)** — a data science IDE built on the VS Code engine by Posit. It integrates tightly with dbt via the **dbt Power User** extension (by Altimate Inc.), giving you model previews, lineage graphs, and command shortcuts right inside the editor.
- **Git** — for version-controlling the dbt project. The models, tests, and documentation all live in plain text files, which makes them a natural fit for version control.

**DuckDB: the foundation**

DuckDB is best understood as SQLite for analytics. Like SQLite, it is embedded and file-based — there is no server to start or stop. Unlike SQLite, it is built for analytical workloads: columnar storage, vectorised execution, and native support for formats like Parquet, CSV, and JSON.

Install it via the official installer:

```bash
curl https://install.duckdb.org | sh
```

Then add it to your PATH so it is available from any terminal session. Verify with:

```bash
duckdb --version
```

You interact with DuckDB either through its CLI or programmatically via Python, R, or any JDBC/ODBC connection. From the CLI:

```bash
duckdb path/to/your.duckdb
```

Once inside, useful commands include:

```sql
SHOW TABLES;
DESCRIBE table_name;
SELECT COUNT(*) FROM table_name;
.quit
```

**Loading data from Parquet files**

The core idea is simple: point DuckDB at your Parquet files and create tables from them. DuckDB infers column types directly from the Parquet metadata — no manual schema definition needed.

```sql
CREATE OR REPLACE TABLE customers AS
    SELECT * FROM read_parquet('customers.parquet');
```

For a multi-table setup, I use two files: a shell script (`setup_dwh.sh`) and a SQL loader (`load_dwh.sql`), both placed in the same folder as the Parquet files.

The shell script handles the housekeeping — removing any existing database file to ensure a clean rebuild — then calls DuckDB with the SQL loader:

```bash
#!/bin/bash
DB="$(dirname "$0")/dwh.duckdb"
SQL="$(dirname "$0")/load_dwh.sql"

[ -f "$DB" ] && rm "$DB"
duckdb "$DB" < "$SQL"
```

The SQL loader creates one table per Parquet file, groups them into logical sections with comments for readability, and ends with a validation query that prints row counts for every table — so you can immediately see if something loaded empty.

```sql
-- ── CRM ─────────────────────────────────────────────────
CREATE OR REPLACE TABLE customers   AS SELECT * FROM read_parquet('customers.parquet');
CREATE OR REPLACE TABLE contacts    AS SELECT * FROM read_parquet('contacts.parquet');
CREATE OR REPLACE TABLE addresses   AS SELECT * FROM read_parquet('addresses.parquet');

-- ── SALES ────────────────────────────────────────────────
CREATE OR REPLACE TABLE orders      AS SELECT * FROM read_parquet('orders.parquet');
CREATE OR REPLACE TABLE invoices    AS SELECT * FROM read_parquet('invoices.parquet');
CREATE OR REPLACE TABLE products    AS SELECT * FROM read_parquet('products.parquet');

-- ── VALIDATION ───────────────────────────────────────────
SELECT 'customers'  AS table_name, COUNT(*) AS rows FROM customers
UNION ALL
SELECT 'contacts',                 COUNT(*)          FROM contacts
UNION ALL
SELECT 'orders',                   COUNT(*)          FROM orders;
```

Running `./setup_dwh.sh` creates `dwh.duckdb` in a matter of seconds. Run it again at any time to do a full clean rebuild from updated Parquet exports.

**Adding analytical views**

On top of the raw tables, it makes sense to create a set of pre-joined views for the most common analytical questions. Views cost nothing to maintain — they are just stored queries — and they give consumers of the database a clean, stable interface that hides the underlying joins.

```sql
CREATE OR REPLACE VIEW v_orders_full AS
    SELECT
        o.id            AS order_id,
        c.name          AS customer_name,
        o.date          AS order_date,
        o.status,
        o.total_amount
    FROM orders o
    LEFT JOIN customers c ON c.id = o.customer_id;
```

**Connecting DBeaver**

DBeaver connects to DuckDB via a JDBC driver it can download automatically. Create a new connection, select DuckDB, paste the full path to your `.duckdb` file, and click *Test Connection*. Once connected, the Database Navigator panel shows the full table and view tree — double-click any table to preview the data, or open a SQL editor with Cmd + Enter to run queries.

**One important rule: the file lock**

DuckDB only allows one process to open the database file at a time. If DBeaver is connected, the DuckDB CLI and dbt will both fail with a lock error. Always disconnect DBeaver (right-click the connection → *Disconnect*) before switching to dbt or the CLI — and vice versa. Easy to forget, mildly annoying when you do.

**What comes next**

The raw DWH is useful on its own — you can query it directly, explore it in DBeaver, and build views for common questions. But the real power comes when you add a transformation layer on top. In the [next post](https://thomassie.me/2026-04-04-dbt-on-duckdb/) I'll walk through setting up dbt Core on top of this DuckDB foundation: how the project is structured, what the model layers look like, and how the whole thing connects to version control and your analytics environment of choice.
