//inspiriert von https://maramonaria.github.io/EIA2-Ergebnisse/Abgabe_L02/ //

"use strict";
//arrays fürs uno//
let cards = [];
let gegner = [];
let ablage = [];
let aufnahme = [];
let turn = "spieler";

window.onload = function () {
    startUno();
};

function startUno() {
    cards = [];
    gegner = [];
    ablage = [];
    aufnahme = [];
    turn = "spieler";
    spielBau();
    updateHtml(cards);
    updateHtml(gegner);
    updateHtml(ablage);
    updateHtml(aufnahme);
    document.getElementById("aufnahme").addEventListener("click", karteZiehen, false);
}

function spielBau() {
    for (let i = 0; i < 4; i++) {
        let color = "";
        if (i == 0)
            color = "green";
        else if (i == 1)
            color = "blue";
        else if (i == 2)
            color = "red";
        else if (i == 3)
            color = "yellow";
        for (let j = 0; j <= 9; j++) {
            let newCard = {
                Farbe: color,
                Wert: j
            };
            aufnahme.push(newCard);
        }
        for (let j = 1; j <= 9; j++) {
            let newCard = {
                Farbe: color,
                Wert: j
            };
            aufnahme.push(newCard);
        }
    }

    // Stapel durchmischen
    mischen(aufnahme);

    //Pop-Up vor Spielbeginn
    let n = Number(window.prompt("Wähle eine Anzahl von Karten von 3-10", ""));
    while (Number.isNaN(n) || n < 3 || n > 10) {
    n = Number(window.prompt("Falsch! Bitte wähle nur eine Zahl von 3-10 aus", ""));
    }

    // Karten austeilen
    while (n) {
        cards.push(aufnahme[0]);
        aufnahme.splice(0, 1);
        gegner.push(aufnahme[0]);
        aufnahme.splice(0, 1);
        n -= 1;
    }

    ablage.push(aufnahmel[aufnahmel.length - 1]); // Startkarte zwischen den Spielern ablegen
    aufnahmel.splice(aufnahmel.length - 1, 1);
}

function karteLegen(_chosenKarte, _index) {
    if (turn == "spieler") {
        if (_chosenKarte.Farbe == ablage[ablage.length - 1].Farbe || _chosenKarte.Wert == ablage[ablage.length - 1].Wert) {
            turn = "system";
            ablage.push(_chosenKarte);
            cards.splice(_index, 1);
            updateHtml(cards);
            updateHtml(ablage);
            if (cards.length == 0) {
                setTimeout(function () { window.alert("Spiel gewonnen!"); startUno(); }, 500);
            }
            else if (turn == "system")
                gegnerTurn();
        }
        else {
            window.alert("Falsch! Suche eine Karte aus die passt!");
        }
    }
}

function karteZiehen() {
    if (turn == "spieler") {
        cards.push(aufnahme1[aufnahme1.length - 1]);
        aufnahme1.splice(aufnahme1.length - 1, 1);
        updateHtml(cards);
        updateHtml(aufnahme1);
        turn = "system";
        gegnerTurn();
    }
}

function gegnerTurn() {
    let couldLay = false;
    for (let i = 0; i < gegner.length; i++) {
        // Fall 1: Gegner kann eine Karte legen
        if (gegner[i].Farbe == ablage[ablage.length - 1].Farbe || gegner[i].Wert == ablage[ablage.length - 1].Wert) {
            ablage.push(gegner[i]);
            setTimeout(function () { document.getElementById(gegner[i].Farbe + gegner[i].Wert).classList.add("cardtransition"); gegner.splice(i, 1); }, 500);
            setTimeout(function () { updateHtml(ablage); updateHtml(gegner); }, 1500);
            couldLay = true;
            break;
        }
    }
    if (couldLay == false) {
        gegner.push(aufnahme1[aufnahme1.length - 1]);
        aufnahme1.splice(aufnahme1.length - 1, 1);
        setTimeout(function () { updateHtml(aufnahme1); updateHtml(gegner); }, 1600);
    }
    if (gegner.length <= 1) {
        setTimeout(function () { window.alert("Gegner hat gewonnen"); startUno(); }, 2000);
    }
    else
        setTimeout(function () { turn = "spieler"; }, 2000);
}

// Fisher-Yates Shuffle
function mischen(_kartenarray) {
    let m = _kartenarray.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = _kartenarray[m];
        _kartenarray[m] = _kartenarray[i];
        _kartenarray[i] = t;
    }
    return _kartenarray;
}

function updateHtml(_array) {
    let classStr = "";
    if (_array == cards) {
        classStr = "spieler";
    }
    else if (_array == gegner) {
        classStr = "system";
    }
    else if (_array == aufnahme1) {
        classStr = "aufnahme1";
    }
    else if (_array == ablage) {
        classStr = "ablage";
    }
    // Bisherige Html Elemente aus der Section entfernen
    let myNode = document.getElementById(classStr);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    if (classStr == "spieler" || classStr == "ablage") {
        for (let i = 0; i < _array.length; i++) {
            createOpenCardHtml(_array, i, classStr);
        }
    }
    else {
        for (let i = 0; i < _array.length; i++) {
            createHiddenCardHtml(_array, i, classStr);
        }
    }
}
function createOpenCardHtml(_array, _arrayIndex, _classString) {
    let holdingDiv = document.createElement("div");
    holdingDiv.setAttribute("class", _classString + " " + "card" + " " + _array[_arrayIndex].Farbe);
    holdingDiv.setAttribute("id", _array[_arrayIndex].Farbe + _array[_arrayIndex].Wert);
    document.getElementById(_classString).appendChild(holdingDiv);
    let i = 5;
    while (i) {
        let numberP = document.createElement("p");
        numberP.innerHTML = "" + _array[_arrayIndex].Wert;
        if (i == 5) {
            numberP.setAttribute("class", "topleft");
        }
        else if (i == 4) {
            numberP.setAttribute("class", "topright");
        }
        else if (i == 3) {
            numberP.setAttribute("class", "middle");
        }
        else if (i == 2) {
            numberP.setAttribute("class", "bottomleft");
        }
        else if (i == 1) {
            numberP.setAttribute("class", "bottomright");
        }
        holdingDiv.appendChild(numberP);
        i -= 1;
    }
    if (_classString == "spieler") {
        holdingDiv.addEventListener("click", function () { karteLegen(_array[_arrayIndex], _arrayIndex); }, false);
    }
}

// Verdeckte Karte in HTML erstellen
function createHiddenCardHtml(_array, _arrayIndex, _classString) {
    let holdingDiv = document.createElement("div");
    holdingDiv.setAttribute("class", _classString + " " + "card" + " " + "backside");
    holdingDiv.setAttribute("id", _array[_arrayIndex].Farbe + _array[_arrayIndex].Wert);
    document.getElementById(_classString).appendChild(holdingDiv);
    let image = document.createElement("img");
    image.setAttribute("src", "verdeckt.jpg");
    holdingDiv.appendChild(image);
}
