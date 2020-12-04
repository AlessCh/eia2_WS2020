"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L07_Database = void 0;
const Http = require("http");
const Url = require("url");
var L07_Database;
(function (L07_Database) {
    let server = Http.createServer();
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    console.log("Server starting on port:" + port);
    server.listen(port);
    server.addListener("request", handleRequest);
    function handleRequest(_request, _response) {
        //Erweiterung  local + remote, Entscheidung ob lokal oder online datenbank genutzt
        //package jason den start ändern
        //client anpassen damit er mit Heroku kommuniziert
        //Erweiterung Funktion retrieveOrders mit orders.find() das Order[] zurückliefert
        //async to Array() nutzen für den Barkeeper
        //Erweiterung handleRequest damit retrieveOrders aufgerufen wird
        //Ergebnis als String in die Serverantwort, wenn Server mit command=retrieve aufgerufen wird
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    }
})(L07_Database = exports.L07_Database || (exports.L07_Database = {}));
//# sourceMappingURL=Server.js.map