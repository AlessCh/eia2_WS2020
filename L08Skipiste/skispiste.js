"use strict";
var L08_Skipiste;
(function (L08_Skipiste) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.70; //Goldenen Schnitt
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        //Werte
        let horizon = crc2.canvas.height * golden;
        let slopeWidthBack = 400;
        let slopeWidthFront = 1400;
        let treesOffsetBack = 150;
        let treesOffsetFront = 5;
        //Positionen
        let posMountains = { x: 0, y: 600 };
        let posSlope = { x: 1000, y: 300 };
        let posTreesStart = { x: posSlope.x - slopeWidthBack / 2 - treesOffsetBack, y: horizon };
        let posTreesEnd = { x: crc2.canvas.width / 2 - slopeWidthFront / 2 - treesOffsetFront, y: crc2.canvas.height };
        /*snowfall aufrufe
        createSnowFlakes();
        drawSnowFlakes();
        moveSnowFlakes();
        updateSnowFall(); */
        //Aufrufe
        drawBackground();
        drawSun({ x: 100, y: 50 }); //Vektorobjekt
        drawCloud({ x: 500, y: 100 }, { x: 200, y: 50 }); //Vektoren für Position und Size
        drawMountains(posMountains, 75, 300, "grey", "hsl(183, 6%, 91%)"); //hinten
        drawMountains(posMountains, 50, 250, "grey", "hsl(183, 5%, 81%)"); //vorne
        drawTrees(8, posTreesStart, posTreesEnd, 0.1, 0.37, 1.4);
        posTreesStart.x = posSlope.x + slopeWidthBack / 2 + treesOffsetBack;
        posTreesEnd.x = posTreesEnd.x + slopeWidthFront + 2 * treesOffsetFront;
        drawTrees(8, posTreesStart, posTreesEnd, 0.1, 0.37, 1.4); //
        drawSkitower();
        drawSnowslope(posSlope, slopeWidthBack, slopeWidthFront);
        drawSkihouse();
        drawSkilift();
        drawSkiers();
        drawNonskiers();
        drawSnowflakes();
    }
    function drawTrees(_nTrees, _posStart, _posEnd, _minScale, _stepPos, _stepScale) {
        console.log("Trees", _posStart, _posEnd);
        let transform = crc2.getTransform();
        let step = {
            x: (_posEnd.x - _posStart.x) * _stepPos,
            y: (_posEnd.y - _posStart.y) * _stepPos
        };
        crc2.translate(_posStart.x, _posStart.y);
        crc2.scale(_minScale, _minScale);
        do {
            drawTree();
            crc2.translate(step.x, step.y);
            crc2.scale(_stepScale, _stepScale);
        } while (--_nTrees > 0); //Zeichne Baum solange Anzahl der Bäume größer als 0
        crc2.setTransform(transform);
    }
    function drawTree() {
        console.log("Tree");
        let nBranches = 200; //Anzahl Ast
        let maxRadius = 60; //Radius größe Ast
        let branch = new Path2D();
        branch.arc(0, 0, maxRadius, 0, 2 * Math.PI); //Create vollen Kreis für den Ast
        crc2.fillStyle = "hsl(25, 93%, 8%)"; //Ast Farbe
        crc2.fillRect(0, 0, 20, -200);
        crc2.save();
        crc2.translate(0, -120);
        do {
            let y = Math.random() * 350; //What???????????
            let size = 1 - y / 700;
            let x = (Math.random() - 0.5) * 2 * maxRadius;
            crc2.save();
            crc2.translate(0, -y);
            crc2.scale(size, size);
            crc2.translate(x, 0);
            let colorAngle = 120 - Math.random() * 60;
            let color = "HSLA(" + colorAngle + ", 60%, 10%, 0.5)";
            crc2.fillStyle = color;
            crc2.fill(branch);
            crc2.restore();
        } while (--nBranches > 0);
        crc2.restore();
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height); //Variable vom Typ Gradient vom Typ CanvasGradient, Gradient von oben nach unten (entlang einer Linie)
        gradient.addColorStop(0, "hsl(183, 73%, 80%)"); //lightblue, Haltepunkte
        gradient.addColorStop(golden, "white"); //beim Goldenen Schnitt weiß
        gradient.addColorStop(1, "HSL(30,67%,94%)"); //Linen, 100 Grad, Sättigung, Brightness
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 40; //innerer Radius
        let r2 = 160;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2); //Gradient, Radial Kreisförmig
        gradient.addColorStop(0, "HSL(62, 100%, 92%,1)"); //r1, gelb 60, Helligkeit 90, 1 Opacity 
        gradient.addColorStop(1, "HSL(62, 93%, 80%,0)"); //r2, gelb 60, Helligkeit 50, 0 Opacity
        crc2.save(); //Abspeichern des Status
        crc2.translate(_position.x, _position.y); //Translation zur Position
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI); //Bogen, großer Radius für den ganzen Kreis, Math.Pi sonst Halbkreis
        crc2.fill();
        crc2.restore(); //Transformation zwischengespeichert, deswegen Zustand von davor
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 50;
        let radiusParticle = 60; //einzelne Partikel
        let particle = new Path2D(); //Partikel Path
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y); //Koordinatensystem auf die Position
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) { //zeichnen solange die anzahl der gezeichneten Partikel kleiner als Partikel die wir möchten
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y); //Mit Ausdehnung in der Vertikalen multipliziert
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 200;
        let stepMax = 350;
        let x = 0;
        crc2.save(); //damit Ursprungliche Transformatioen merken
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0); //Startdes Pfades, bei Position x/y = 0
        crc2.lineTo(0, -_max); //Erste Linie, Beginn beim höchsten Wert und nach oben deswegen -_max
        do {
            x += stepMin + Math.random() * (stepMax - stepMin); //für x, stepmax-stepmin Zufallszahl
            let y = -_min - Math.random() * (_max - _min); //y definiert, Zufallszahl
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width); //solange Berge kleiner als Canvas
        crc2.lineTo(x, 0); //Ende des Pfades, x Wert & y = 0
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max); //Anfang beim Fuß des Berges bis zur maximal Höhe
        gradient.addColorStop(0, _colorLow); //unten, color low
        gradient.addColorStop(0.7, _colorHigh); //oben, color high
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    /*function drawBricks(): void {
        console.log("Bricks");

    }*/
    function drawSnowslope(_position, _widthBack, _widthFront) {
        console.log("Slope", _position, _widthBack, _widthFront);
        crc2.beginPath();
        crc2.moveTo(_position.x + _widthBack / 2, _position.y);
        crc2.lineTo(crc2.canvas.width / 2 + _widthFront / 2, crc2.canvas.height);
        crc2.lineTo(crc2.canvas.width / 2 - _widthFront / 2, crc2.canvas.height);
        crc2.lineTo(_position.x - _widthBack / 2, _position.y);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, _position.y, 0, crc2.canvas.height);
        gradient.addColorStop(0, "white"); //hinten
        gradient.addColorStop(0.6, "lightgrey "); //vorne
        crc2.fillStyle = gradient;
        crc2.fill();
    }
    function drawSkihouse() {
        console.log("House");
        //body of the house
        crc2.fillStyle = "hsl(26, 38%, 27%)";
        crc2.fillRect(820, 200, 200, 100); //x,y,width,height
        //rooftop
        crc2.beginPath();
        crc2.moveTo(915, 150); //starting point
        crc2.lineTo(820, 200); //first line
        crc2.lineTo(1000, 200); //second line
        crc2.closePath(); //last line
        crc2.strokeStyle = "#000";
        crc2.stroke();
        crc2.fillStyle = "hsl(26, 19%, 27%)";
        crc2.fill();
        //entrance
        crc2.fillStyle = "hsl(26, 97%, 99%)";
        crc2.fillRect(890, 245, 35, 55); //x,y,width,height
    }
    function drawSkitower() {
        console.log("Tower");
        //first tower part
        crc2.beginPath();
        crc2.moveTo(600, 200); //starting point
        crc2.lineTo(550, 500); //first line
        crc2.lineTo(650, 500); //second line
        crc2.closePath(); //last line
        crc2.strokeStyle = "grey";
        crc2.stroke();
        crc2.fillStyle = "black";
        crc2.fill();
        //second tower part
        crc2.beginPath();
        crc2.moveTo(500, 200); //starting point
        crc2.lineTo(450, 500); //first line
        crc2.lineTo(550, 500); //second line
        crc2.closePath(); //last line
        crc2.strokeStyle = "grey";
        crc2.stroke();
        crc2.fillStyle = "black";
        crc2.fill();
        //top part
        crc2.beginPath();
        crc2.rect(488, 180, 125, 20); //x,y,width,height
        crc2.strokeStyle = "black";
        crc2.stroke();
        crc2.closePath();
        //draw lines in top part
        crc2.beginPath();
        crc2.moveTo(488, 200); //200 unten
        crc2.lineTo(500, 180); //x +12
        crc2.moveTo(500, 180); //180 oben
        crc2.lineTo(512, 200); //x +127
        crc2.moveTo(512, 200);
        crc2.lineTo(524, 180); //x +12
        crc2.moveTo(524, 180);
        crc2.lineTo(536, 200); //x +12
        crc2.moveTo(536, 200);
        crc2.lineTo(548, 180); //x +12
        crc2.moveTo(548, 180);
        crc2.lineTo(560, 200); //x +12
        crc2.moveTo(560, 200);
        crc2.lineTo(572, 180); //x +12
        crc2.moveTo(572, 180);
        crc2.lineTo(584, 200); //x +12
        crc2.moveTo(584, 200);
        crc2.lineTo(596, 180); //x +12
        crc2.moveTo(596, 180);
        crc2.lineTo(612, 200); //x +12
        crc2.closePath();
        crc2.stroke();
    }
    function drawSkilift() {
        console.log("Skilift");
        //lift lines
        crc2.beginPath();
        crc2.moveTo(488, 200); //untere Linie nach links
        crc2.lineTo(0, 350);
        crc2.moveTo(488, 180); //obere Linie nach rechts
        crc2.lineTo(0, 300);
        crc2.moveTo(612, 200); //linie zum haus, unten
        crc2.lineTo(822, 200);
        crc2.moveTo(612, 180); //linie zum haus, oben
        crc2.lineTo(857, 180);
        crc2.closePath();
        crc2.stroke();
        //lift hangers
        crc2.beginPath();
        crc2.moveTo(300, 225); //obere Linie
        crc2.arc(300, 280, 25, 0, 1 * Math.PI); //links&rechts, hoch&runter, größe
        crc2.closePath();
        crc2.stroke();
        crc2.beginPath();
        crc2.moveTo(100, 319); //obere Linie
        crc2.arc(100, 370, 25, 0, 1 * Math.PI); //links&rechts, hoch&runter, größe
        crc2.closePath();
        crc2.stroke();
        crc2.beginPath();
        crc2.moveTo(700, 200); //obere Linie
        crc2.arc(700, 250, 25, 0, 1 * Math.PI); //links&rechts, hoch&runter, größe
        crc2.closePath();
        crc2.stroke();
    }
    function drawSkiers() {
        console.log("Skier");
        //Skier 1
        crc2.save();
        crc2.beginPath();
        crc2.arc(841, 420, 15, 0, 2 * Math.PI); //links&rechts, hoch&runter, größe   !! KOPF
        crc2.fillStyle = "hsl(24, 31%, 81%)";
        crc2.fill();
        crc2.strokeStyle = "hsl(26, 38%, 81%)";
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath(); //OBERTEIL
        crc2.moveTo(825, 435); //starting point
        crc2.lineTo(840, 480);
        crc2.lineTo(870, 480);
        crc2.lineTo(855, 435);
        crc2.closePath();
        crc2.strokeStyle = "grey";
        crc2.stroke();
        crc2.fillStyle = "hsl(11, 61%, 48%)";
        crc2.fill();
        /*crc2.fillStyle = "hsl(22, 93%, 8%)";
        crc2.fillRect(820, 435, 15, 30); //x,y,width,height    !! linker Arm
        crc2.fillRect(830, 435, 15, 30); //x,y,width,height    !! rechter Arm*/
        crc2.beginPath(); //linkes Bein
        crc2.moveTo(840, 480); //starting point
        crc2.lineTo(860, 520);
        crc2.lineTo(870, 520);
        crc2.lineTo(850, 480);
        crc2.closePath();
        crc2.strokeStyle = "grey";
        crc2.stroke();
        crc2.fillStyle = "hsl(98, 5%, 22%)";
        crc2.fill();
        crc2.beginPath(); //rechtes Bein
        crc2.moveTo(860, 480); //starting point
        crc2.lineTo(880, 510);
        crc2.lineTo(890, 510);
        crc2.lineTo(870, 480);
        crc2.closePath();
        crc2.strokeStyle = "grey";
        crc2.stroke();
        crc2.fillStyle = "hsl(98, 5%, 22%)";
        crc2.fill();
        /*crc2.fillStyle = "hsl(98, 5%, 22%)";                  //!! HOSE
        crc2.fillRect(825, 480, 12, 35); //x,y,width,height    !! linkes Bein
        crc2.fillRect(843, 480, 12, 35); //x,y,width,height    !! rechts Bein*/
        //SCHUH
        crc2.beginPath();
        crc2.moveTo(845, 520); //starting point
        crc2.lineTo(845, 527);
        crc2.lineTo(905, 512);
        crc2.lineTo(905, 505);
        crc2.closePath();
        crc2.strokeStyle = "grey";
        crc2.stroke();
        crc2.fillStyle = "hsl(61, 89%, 54%)";
        crc2.fill();
        crc2.restore();
        //Skier 2
        crc2.beginPath();
        crc2.arc(541, 370, 15, 0, 2 * Math.PI); //links&rechts, hoch&runter, größe   !! KOPF
        crc2.fillStyle = "hsl(24, 31%, 81%)";
        crc2.fill();
        crc2.fillStyle = "hsl(227, 93%, 52%)"; //!! OBERTEIL
        crc2.fillRect(525, 385, 30, 45); //x,y,width,height    !! Oberkörper
        crc2.fillRect(520, 385, 30, 30); //x,y,width,height    !! linker Arm
        crc2.fillRect(530, 385, 30, 30); //x,y,width,height    !! rechter Arm
        crc2.fillStyle = "hsl(98, 5%, 22%)"; //!! HOSE
        crc2.fillRect(525, 430, 12, 35); //x,y,width,height    !! linkes Bein
        crc2.fillRect(543, 430, 12, 35); //x,y,width,height    !! rechts Bein
        crc2.fillStyle = "hsl(61, 89%, 54%)"; //!! SCHUHE
        crc2.fillRect(500, 465, 80, 3); //x,y,width,height    !! rechter Schuh
        crc2.strokeStyle = "hsl(26, 38%, 81%)";
        crc2.stroke();
        crc2.closePath();
    }
    function drawNonskiers() {
        console.log("Nonskier");
        crc2.save();
        //Person 1 am Haus
        crc2.beginPath();
        crc2.arc(841, 270, 15, 0, 2 * Math.PI); //links&rechts, hoch&runter, größe   !! KOPF
        crc2.fillStyle = "hsl(26, 38%, 81%)";
        crc2.fill();
        crc2.strokeStyle = "hsl(26, 38%, 81%)";
        crc2.stroke();
        crc2.fillStyle = "hsl(264, 29%, 73%)"; //!! OBERTEIL
        crc2.fillRect(825, 285, 30, 45); //x,y,width,height    !! Oberkörper
        crc2.fillRect(820, 285, 30, 30); //x,y,width,height    !! linker Arm
        crc2.fillRect(830, 285, 30, 30); //x,y,width,height    !! rechter Arm
        crc2.fillStyle = "hsl(98, 5%, 22%)"; //!! HOSE
        crc2.fillRect(825, 330, 12, 35); //x,y,width,height    !! linkes Bein
        crc2.fillRect(843, 330, 12, 35); //x,y,width,height    !! rechts Bein
        crc2.fillStyle = "hsl(6, 47%, 22%)"; //!! SCHUHE
        crc2.fillRect(825, 365, 12, 3); //x,y,width,height    !! rechter Schuh
        crc2.fillRect(843, 365, 12, 3); //x,y,width,height    !! linker Schuh
        crc2.closePath();
        //Person 2 am Haus
        crc2.beginPath();
        crc2.arc(760, 260, 10, 0, 2 * Math.PI); //links&rechts, hoch&runter, größe   !! KOPF
        crc2.fillStyle = "hsl(26, 38%, 81%)";
        crc2.fill();
        crc2.strokeStyle = "hsl(26, 38%, 81%)";
        crc2.stroke();
        crc2.fillStyle = "hsl(153, 47%, 22%)"; //!! OBERTEIL
        crc2.fillRect(750, 271, 20, 40); //x,y,width,height    !! Oberkörper
        crc2.fillRect(745, 271, 20, 25); //x,y,width,height    !! linker Arm
        crc2.fillRect(755, 271, 20, 25); //x,y,width,height    !! rechter Arm
        crc2.fillStyle = "hsl(153, 0%, 0%)"; //!! HOSE
        crc2.fillRect(750, 311, 7, 35); //x,y,width,height    !! linkes Bein
        crc2.fillRect(763, 311, 7, 35); //x,y,width,height    !! rechtes Bein
        crc2.fillStyle = "hsl(78, 72%, 43%)"; //!! SCHUHE
        crc2.fillRect(750, 346, 7, 3); //x,y,width,height    !! rechter Schuh
        crc2.fillRect(763, 346, 7, 3); //x,y,width,height    !! linker Schuh
        crc2.closePath();
        crc2.restore();
    }
    function drawSnowflakes() {
        console.log("Snowflakes");
        crc2.save();
        for (let i = 0; i < 70; i++) {
            const x = Math.random() * 1000;
            const y = Math.random() * 600;
            crc2.beginPath();
            crc2.arc(x, y, 3, 0, Math.PI * 2, false);
            crc2.closePath();
            crc2.restore();
            // fill snowflake with white
            crc2.fillStyle = "white";
            crc2.fill();
        }
    }
})(L08_Skipiste || (L08_Skipiste = {}));
//# sourceMappingURL=skispiste.js.map