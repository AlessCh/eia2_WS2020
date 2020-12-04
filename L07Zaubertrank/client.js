"use strict";
//erarbeitet mit Corinna
var L07Zaubertrank;
(function (L07Zaubertrank) {
    async function getData() {
        let response = await fetch("data.json");
        let content = await response.text();
        let data = JSON.parse(content);
        console.log("DATA:");
        console.log(data);
        L07Zaubertrank.generateContent(data);
    }
    L07Zaubertrank.getData = getData;
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
        let descriptionData = new FormData(document.forms[0]);
        let instructionData = new FormData(document.forms[1]);
        let descriptionQuery = new URLSearchParams(descriptionData);
        let instructionQuery = new URLSearchParams(instructionData);
        let response = await fetch(url + "?" + descriptionQuery.toString() + "&" + instructionQuery.toString());
        let responseText = await response.text();
        alert("Potion sent! " + responseText.replace(/<br>/g, " "));
    }
    L07Zaubertrank.sendDrink = sendDrink;
})(L07Zaubertrank || (L07Zaubertrank = {}));
//# sourceMappingURL=client.js.map