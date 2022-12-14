#limpando dados
MATCH (n) detach DELETE n

#incluido BLHs
WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "blhs.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MERGE (:BLHs {nome: row.nome, id: row.id });

#incluido doadoras
WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "doadoras.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MERGE (:DOADORAS {nome: row.nome });

#incluido donatarias
WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "donatarias.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MERGE (:DONATARIAS {nome: row.nome });

#incluido Estados 
WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "estados.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MERGE (:UFs {nome: row.uf });

#Ligando doadoras e BLHs
WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "doadoras-blhs.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MATCH(destino:BLHs {id: row.blh})
MATCH(doadora:DOADORAS {nome: row.nome})
MERGE (doadora)-[:DOA]->(destino);

#Ligando donatarias e BLHs
WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "donatarias-blhs.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MATCH(origem:BLHs {id: row.blh})
MATCH(destino:DONATARIAS {nome: row.nome})
MERGE (origem)-[:DOA]->(destino);

#Estado Doadora
WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "doadoras-estados.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MATCH(estado:UFs {name: row.uf})
MATCH(doadora:DOADORAS {nome: row.nome})
MERGE (doadora)-[:RESIDE]->(estado);

#Estado Donatarias 
WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "donatarias-estados.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MATCH(estado:UFs {name: row.uf})
MATCH(doadora:DONATARIAS {nome: row.nome})
MERGE (doadora)-[:RESIDE]->(estado);

#Estado BLHs 
WITH "https://raw.githubusercontent.com/wbfreitas/fiap-datalake/main/csv-data/" AS base
WITH base + "blhs-estados.csv" AS uri
LOAD CSV WITH HEADERS FROM uri AS row
MATCH(estado:UFs {name: row.uf})
MATCH(doadora:BLHs {id: row.id})
MERGE (doadora)-[:RESIDE]->(estado);