"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L06Zaubertrank = void 0;
const Http = require("http");
const Url = require("url");
var L06Zaubertrank;
(function (L06Zaubertrank) {
    let server = Http.createServer();
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    console.log("Server starting on port:" + port);
    server.listen(port);
    server.addListener("request", handleRequest);
    function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    }
})(L06Zaubertrank = exports.L06Zaubertrank || (exports.L06Zaubertrank = {}));
//# sourceMappingURL=server.js.map