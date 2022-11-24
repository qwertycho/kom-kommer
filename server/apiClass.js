const database = require('./database');

const api = {
    getMethod: async (req) => {

        let url = req.url;
        let params = url.split("?");

        if (params[1].includes("action")){

        let action = params[1].split("=");

        let query;

        switch(action[1]){
            case "new":
                query = {
                    table: "feitjes",
                    rows: "feit",
                    order: "feit_id DESC",
                    limit: 1
                }
                break;
            case "random":
                query = {
                    table: "feitjes",
                    rows: "feit",
                    order: "RAND()",
                    limit: 1
                }
                break;
                case "all":
                query = {
                    table: "feitjes",
                    rows: "feit",
                }
                break;
            default:
                res.status(404).send("Geen geldige actie");

            }
            
        return await database.select(query);

        } else{
            throw new Error("Geen geldige actie");
        }
    },
}

module.exports = api;