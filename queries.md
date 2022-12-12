MATCH (n) detach DELETE n

#incluido BLHS

WITH "https://github.com/wbfreitas/fiap-datalake/tree/main/csv-data/" AS base
WITH base + "blhs.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MERGE (:BLHS {id: row.id});
MERGE (:BLHS {nome: row.nome, endereco: row.endereco,cep: row.cep, uf: row.uf, id: row.id});


