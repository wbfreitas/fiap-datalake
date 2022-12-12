#incluido BLHS

WITH "https://github.com/wbfreitas/fiap-datalake/tree/main/csv-data" AS base
WITH base + "blhs.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MERGE (:User {id: row.id});