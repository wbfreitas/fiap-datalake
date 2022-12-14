const { Parser } = require('json2csv');
const fs = require('fs');

let BLHs = require('./blhs');
const nomes = require('./nomes');
const estados = require('./estados');

BLHs = BLHs.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, 20); 

const doadoras = nomes.slice(0, (nomes.length -1)).slice(0, 90);
const donatarias = nomes.slice(((nomes.length - 1) /2 ) + 1, nomes.length -1).slice(0, 90);


const BLHsNomeID = BLHs.map((b, i) => ({id: i, nome: b.nome}));
const doadorasBLHs = linkPessoasBLH(doadoras);
const donatariasBLHs = linkPessoasBLH(donatarias);

function linkPessoasBLH(pessoas) {
    return pessoas.map(p => {
        const blhAleatorio = Math.floor(Math.random() * (BLHs.length - 2));
        const b = BLHs[blhAleatorio];
        b.id = blhAleatorio;

        return {nome: p, blh: b};
    }); 
}

function parseToCSV(data, fileName) {
    try {
        const parser = new Parser();
        const csv = parser.parse(data);
        return csv;
      } catch (err) {
        return "ERROR";
      }
}

function saveCSV(file, fileName) {
    const csv = parseToCSV(file);
    fs.writeFile('../csv-data/' + fileName, csv, function (err) {
        if (err) return console.log(err);
        console.log('CSV salvo!');
    });
}

saveCSV(doadoras.map(d => ({nome: d})), 'doadoras.csv');
saveCSV(donatarias.map(d => ({nome: d})), 'donatarias.csv');
saveCSV(BLHsNomeID, 'blhs.csv');
saveCSV(estados, 'estados.csv');
saveCSV(doadorasBLHs.map(d => ({blh: d.blh.id, nome: d.nome})), 'doadoras-blhs.csv');
saveCSV(donatariasBLHs.map(d => ({blh: d.blh.id, nome: d.nome})), 'donatarias-blhs.csv');

saveCSV(BLHs.map((b, i) => ({
    id: i, uf: b.uf
})), 'blhs-estados.csv');

saveCSV(doadorasBLHs.map((d) => ({
    name: d.nome, uf: d.blh.uf
})), 'doadoras-estados.csv');

saveCSV(donatariasBLHs.map((d) => ({
    name: d.nome, uf: d.blh.uf
})), 'donatarias-estados.csv');