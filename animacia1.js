function animácia1() {
        let c = document.getElementById("animacia1"); // First of all, you must find the <canvas> element. This is done by using the HTML DOM method getElementById().
        let ctx = c.getContext("2d"); //Secondly, you need a drawing object for the canvas. The getContext() is a built-in HTML object, with properties and methods for drawing.
        c.height = 400;
        c.width = 620;
        c.style.height = "400px";
        c.style.width = "620px";
        
        savedData = new Image();
        const dimension = 80;

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
         let xl = 480;
         let yl = 20;
         ctx.fillRect(400, 0, 220, 400);
         ctx.font = " bold 18px Calibri";
         ctx.fillStyle = "white";
         ctx.fillText("Legend", xl,yl);
         ctx.fillStyle = "#8BC766";
         ctx.strokeStyle = "black";
         xl = 413;
         yl = 45;
         let b = 14;
         ctx.fillRect(xl, yl, b, b);
         stvorec(xl, yl, b, b)
         ctx.fillStyle = "white";
         ctx.font = "14px Calibri";
         ctx.fillText(" - tile", xl += 16, yl += 11);
         ctx.fillStyle = "red";
         ctx.fillText("1", xl -= 14, yl += 26);
         ctx.fillStyle = "white";
         ctx.fillText(" - conquered tiles", xl += 5, yl);
         ctx.fillStyle = "red";
         kruh(xl, yl += 25 , 7);
         ctx.fillStyle = "white";
         ctx.fillText(" - conquerable tiles", xl+= 8, yl += 5);
         ctx.strokeStyle = "red";
         xl = 413;
         yl = 135;
         stvorec(xl, yl, b, b);
         ctx.fillText(" - conquerable tiles", xl += 18, yl += 11);

        // Nakreslenie pozadia
        ctx.fillStyle = "#8BC766";
        ctx.strokeStyle = "black";
        for (let x = 0; x < 400; x = x + dimension) {
            for (let y = 0; y < 400; y = y + dimension) {
                ctx.fillRect(x, y, dimension, dimension);
                ctx.strokeRect(x,y,dimension,dimension);
            }
        }

        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        let cas = 500;
        setTimeout(function() {ctx.font = "50px Calibri"}, cas);
        let x = 28;
        let y = 55;
        
        
        // animácia cisla vľavo hore a uloženie obrázka
        setTimeout(function() {
            cislo(x, y);
            savedData.src = c.toDataURL("image/png");
        }, cas += 500);

        
        

        //animácia stvorca ohraničujuceho možnosti na pohyb
        let a = 3 * dimension
        setTimeout(function() {
            ctx.lineWidth = 5;
            ctx.strokeStyle = "red";
            stvorec(0, 0, a, a)}, cas += 1000);
        

             
        //animácia možných pohybov 
        for (let x = 120; x <= 200; x = x + dimension) {
            let y = 40;
            setTimeout(function() {kruh(x, y, 7)}, cas += 100);
            }
        for (let y = 120; y <= 200; y = y + dimension) {
            for (let x = 40; x <= 200; x = x + dimension) {
                setTimeout(function() {kruh(x, y, 7)}, cas += 100);
            }
        }
        cas = 3900;
        setTimeout(function() {ctx.fillStyle = "#8BC766"; kruh(200, 200, 10); ctx.fillStyle = "red"}, cas);
        

        // animácia cisla v strede
        setTimeout(function() {cislo(x += 2 * dimension, y += 2 * dimension)}, cas += 100);

        setTimeout(function() {
            ctx.drawImage(savedData,0,0);
            for (let x = 120; x <= 200; x = x + dimension) {
                let y = 40;
                kruh(x, y, 7);
            }
                for (let y = 120; y <= 200; y = y + dimension) {
                    for (let x = 40; x <= 200; x = x + dimension) {
                    kruh(x, y, 7);
                }
            }
            ctx.fillStyle = "#8BC766";
            kruh(200, 200, 10);
            ctx.fillStyle = "red";
            cislo(x, y)
            }, cas += 500);

        //animácia stvorca ohraničujuceho možnosti na pohyb
        setTimeout(function() {stvorec(3, 3, 395, 395)}, cas += 500);
        
        cas = 6000;
        //animácia možných pohybov
        for (let y = 40; y <= 200; y = y + dimension) {
            for (let x = 280; x <= 360; x = x + dimension) {
                setTimeout(function() {kruh(x, y, 7)}, cas += 100);
            }
        }
        //animácia možných pohybov
        for (let y = 280; y <= 360; y = y + dimension) {
            for (let x = 40; x <= 360; x = x + dimension) {
                setTimeout(function() {kruh(x, y, 7)}, cas += 100);
            }
        }
        cas = 7900;
        setTimeout(function() {ctx.fillStyle = "#8BC766"; kruh(360, 360, 10); ctx.fillStyle = "red"}, cas);
        
        // animácia kruhu vpravo dole
        setTimeout(function() {cislo(x += 2 * dimension, y += 2 * dimension)}, cas += 100);
        setTimeout(animácia1, cas += 1000);
        }
        animácia1();
