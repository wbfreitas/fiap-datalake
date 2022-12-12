const CepCoords = require("coordenadas-do-cep");
const { Parser } = require('json2csv');
const fs = require('fs');



const json = require('./blhs');

(async () => {
    const asyncRes = await Promise.all(json.map((async (e) => {
        try {
            const info = await CepCoords.getByCep(e.cep.replace("-", ""));
            e.lat = info.lat;
            e.lon = info.lon;
        } catch (err) {
        }
        return e;
    })));

    parseToCSV(asyncRes);
})();

function parseToCSV(data) {
    try {
        const parser = new Parser();
        const csv = parser.parse(data);
        saveCSV(csv);
      } catch (err) {
        console.error(err);
      }
}

function saveCSV(csv) {
    fs.writeFile('../csv-data/blhs.csv', csv, function (err) {
        if (err) return console.log(err);
        console.log('CSV salvo!');
      });
}
