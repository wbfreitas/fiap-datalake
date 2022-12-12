MATCH (n) detach DELETE n

#incluido BLHS

WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "blhs.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MERGE (:BLHS {nome: row.nome});



