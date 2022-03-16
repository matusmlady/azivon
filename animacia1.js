function animácia1() {
    let c = document.getElementById("animacia1"); // First of all, you must find the <canvas> element. This is done by using the HTML DOM method getElementById().
    let ctx = c.getContext("2d"); //Secondly, you need a drawing object for the canvas. The getContext() is a built-in HTML object, with properties and methods for drawing.
    c.height = 500;
    
    savedData = new Image();

    c.width = 720;
    c.style.height = "500px";
    c.style.width = "720px";

    //farba ohraničenia
    // ctx.fillRect(0, 0, 100, 100); Draw a fill rectangle.
    //ctx.strokeRect(0,0,100,100); Draw a stroke

    // zadefinovanie funkcií
    function kruh(xArg = 0, yArg = 0, r = 0) {
        //Draw a circle
        ctx.beginPath();
        ctx.arc(xArg, yArg, r, 0, 2 * Math.PI);
        ctx.fill();
        }
    function cislo(xArg = 0, yArg = 0) {
        //Write a number
        ctx.fillText("1", xArg, yArg);
        }
    function stvorec(xArg = 0, yArg = 0, x = 0, y = 0) {
        //Draw a rectangle
        ctx.beginPath();
        ctx.strokeRect(xArg, yArg, x, y);
        }

     // Legenda
     ctx.fillRect(500, 0, 220, 500);
     ctx.font = " bold 18px Calibri";
     ctx.fillStyle = "white";
     ctx.fillText("Legend", 580,20);
     ctx.fillStyle = "green";
     ctx.strokeStyle = "black";
     ctx.fillRect(513, 45, 14, 14);
     stvorec(513, 45, 14, 14)
     ctx.fillStyle = "white";
     ctx.font = "14px Calibri";
     ctx.fillText(" - tile", 529, 56);
     ctx.fillStyle = "red";
     ctx.fillText("1", 515, 85);
     ctx.fillStyle = "white";
     ctx.fillText(" - conquered tiles", 520, 85);
     ctx.fillStyle = "red";
     kruh(520, 110, 7);
     ctx.fillStyle = "white";
     ctx.fillText(" - conquerable tiles", 528, 115);
     ctx.strokeStyle = "red";
     stvorec(513, 135, 14, 14);
     ctx.fillText(" - conquerable tiles", 531, 146);

    // Nakreslenie pozadia
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";
    for (let x = 0; x < 500; x = x + 100) {
        for (let y = 0; y < 500; y = y + 100) {
            ctx.fillRect(x, y, 100, 100);
            ctx.strokeRect(x,y,100,100);
        }
    }
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    setTimeout(function() {ctx.font = "70px Calibri"}, 500);
    let x = 30;
    let y = 70;

    

    // animácia cisla vľavo hore a uloženie obrázka
    setTimeout(function() {
        cislo(x, y);
        savedData.src = c.toDataURL("image/png");
    }, 1000);

    
    

    //animácia stvorca ohraničujuceho možnosti na pohyb
    setTimeout(function() {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "red";
        stvorec(0, 0, 300, 300)}, 2000);
    

    let cas = 3000;     
    //animácia možných pohybov 
    for (let x = 150; x <= 250; x = x + 100) {
        let y = 50;
        setTimeout(function() {kruh(x, y, 7)}, cas += 100);
        }
    for (let y = 150; y <= 250; y = y + 100) {
        for (let x = 50; x <= 250; x = x + 100) {
            setTimeout(function() {kruh(x, y, 7)}, cas += 100);
        }
    }
    setTimeout(function() {ctx.fillStyle = "green"; kruh(250, 250, 10); ctx.fillStyle = "red"}, 3900);
    

    // animácia cisla v strede
    setTimeout(function() {cislo(x += 200, y += 200)}, 4000);

    setTimeout(function() {
        ctx.drawImage(savedData,0,0);
        for (let x = 150; x <= 250; x = x + 100) {
            let y = 50;
            kruh(x, y, 7);
        }
            for (let y = 150; y <= 250; y = y + 100) {
                for (let x = 50; x <= 250; x = x + 100) {
                kruh(x, y, 7);
            }
        }
        ctx.fillStyle = "green";
        kruh(250, 250, 10);
        ctx.fillStyle = "red";
        cislo(x, y)
        }, 4500);

    //animácia stvorca ohraničujuceho možnosti na pohyb
    setTimeout(function() {stvorec(3, 3, 495, 495)}, 5000);
    
    cas = 6000;
    //animácia možných pohybov
    for (let y = 50; y <= 250; y = y + 100) {
        for (let x = 350; x <= 450; x = x + 100) {
            setTimeout(function() {kruh(x, y, 7)}, cas += 100);
        }
    }
    //animácia možných pohybov
    for (let y = 350; y <= 450; y = y + 100) {
        for (let x = 50; x <= 450; x = x + 100) {
            setTimeout(function() {kruh(x, y, 7)}, cas += 100);
        }
    }
    setTimeout(function() {ctx.fillStyle = "green"; kruh(450, 450, 10); ctx.fillStyle = "red"}, 7900);
    
    // animácia kruhu vpravo dole
    setTimeout(function() {cislo(x += 200, y += 200)}, 8000);
    setTimeout(animácia1, 9000);
    }
    animácia1();
