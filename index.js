const CepCoords = require("coordenadas-do-cep");
const json = require('./blhs');

(async () => {
    const asyncRes = await Promise.all(json.slice(0, 1).map((async (e) => {
        try {
            const info = await CepCoords.getByCep(e.cep.replace("-", ""));
            e.lat = info.lat;
            e.lon = info.lon;
        } catch (err) {
        
        }
        return e;
    })));

    console.log(asyncRes);
})();
