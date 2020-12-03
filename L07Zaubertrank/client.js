"use strict";
//erarbeitet mit Corinna
var L06Zaubertrank;
(function (L06Zaubertrank) {
    async function getData() {
        let response = await fetch("data.json");
        let content = await response.text();
        let data = JSON.parse(content);
        console.log("DATA:");
        console.log(data);
        L06Zaubertrank.generateContent(data);
    }
    L06Zaubertrank.getData = getData;
    async function sendDrink(_event) {
        console.log("send potion");
        let url = "https://eiafuwa.herokuapp.com/";
        //let url: string = "http//localhost:5001/";
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        console.log("Query");
        console.log(query);
        url = url + "?" + query.toString();
        console.log(url);
        let select = document.querySelector("select");
        let textarea = document.querySelector("textarea");
        if (select)
            url += "&Wirkung=" + select.value;
        if (textarea.value != "")
            url += "&Nebenwirkungen=" + textarea.value;
        let response = await fetch(url);
        //console.log(response);
        let reply = await response.text();
        //console.log(reply);
        alert("Potion sent!");
    }
    L06Zaubertrank.sendDrink = sendDrink;
})(L06Zaubertrank || (L06Zaubertrank = {}));
//# sourceMappingURL=client.js.map