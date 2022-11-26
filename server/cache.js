const database = require('./database');
const NodeCache = require("node-cache");

const feitjeCache = new NodeCache();

class Cache {
    clearAll() {
        feitjeCache.flushAll();
        console.log("cache cleared");
    }

    getFeitjes = async () => {

        if (feitjeCache.get("feitjes")) {
            console.log("feitjes uit cache");
            return feitjeCache.get("feitjes");
        } else {

               let feitje = database.loadFeitjes();
                
            

                feitjeCache.set("feitjes", feitje);
                console.log("feitjes uit database");
                return feitje;

        }
    }
}

module.exports = new Cache();