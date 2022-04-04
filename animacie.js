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
         let xl = 5 * dimension + 80;
         let yl = 20;
         ctx.fillRect(5 * dimension, 0, 220, 5 * dimension);
         ctx.font = " bold 18px Calibri";
         ctx.fillStyle = "white";
         ctx.fillText("Legend", xl,yl);
         ctx.fillStyle = "#8BC766";
         ctx.strokeStyle = "black";
         xl = 5 * dimension + 13;
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
        for (let x = 0; x < 5 * dimension; x = x + dimension) {
            for (let y = 0; y < 5 * dimension; y = y + dimension) {
                ctx.fillRect(x, y, dimension, dimension);
                ctx.strokeRect(x,y,dimension,dimension);
            }
        }

        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        let cas = 500;
        setTimeout(function() {ctx.font = "50px Calibri"}, cas);
        let x = 7 * dimension / 20; 
        let y = 11 * dimension / 16; 
        
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
    function animácia2() {
        let c = document.getElementById("animacia2"); // First of all, you must find the <canvas> element. This is done by using the HTML DOM method getElementById().
        let ctx = c.getContext("2d"); //Secondly, you need a drawing object for the canvas. The getContext() is a built-in HTML object, with properties and methods for drawing.
        c.height = 400;
        c.width = 620;
        c.style.height = "400px";
        c.style.width = "620px";
    
        obrazok1 = new Image();
        const dimension = 80;

        // zadefinovanie funkcií
        function kruh(xArg = 0, yArg = 0, r = 0) {
        //Draw a circle
        ctx.beginPath();
        ctx.arc(xArg, yArg, r, 0, 2 * Math.PI);
        ctx.fill();
        }
        function stvorec(xArg = 0, yArg = 0, x = 0, y = 0) {
        //Draw a rectangle
        ctx.beginPath();
        ctx.strokeRect(xArg, yArg, x, y);
        }
    

     // Legenda
     let xl = 5 * dimension + 80;
     let yl = 20;
     ctx.fillRect(5 * dimension, 0, 220, 5 * dimension);
     ctx.font = " bold 18px Calibri";
     ctx.fillStyle = "white";
     ctx.fillText("Legend", xl,yl);
     ctx.font = "18px Calibri";
     ctx.fillText("Turn:", xl += 70, yl += 360);
     
     xl = 5 * dimension + 13;
     yl = 45;
     let b = 14;

     ctx.fillStyle = "#8BC766";
     ctx.strokeStyle = "black";
     ctx.fillRect(xl, yl, b, b);
     stvorec(xl, yl, b, b)
     ctx.fillStyle = "white";
     ctx.font = "14px Calibri";
     ctx.fillText(" - tile", xl += 16, yl += 11);

     ctx.fillStyle = "red";
     ctx.fillText("1", xl -= 14, yl += 26);
     ctx.fillStyle = "white";
     ctx.fillText(" - conquered tiles by player 1", xl += 5, yl);

     ctx.fillStyle = "yellow";
     ctx.fillText("2", xl -= 5, yl += 25);
     ctx.fillStyle = "white";
     ctx.fillText(" - conquered tiles by player 2", xl+= 8, yl);

     ctx.strokeStyle = "red";
     stvorec(xl -= 10, yl += 15, b, b);
     ctx.fillText(" - supporting  tiles", xl += 18, yl += 11);

     ctx.strokeStyle = "black";
     ctx.fillStyle = "#5b5e3f";
     ctx.fillRect(xl -= 18, yl += 15, b, b);
     stvorec(xl, yl, b, b);
     ctx.fillStyle = "white";
     ctx.fillText(" - occupied tile", xl+= 16, yl += 11);

     ctx.fillStyle = "#949437";
     ctx.fillRect(xl -= 16, yl += 15, b, b);
     stvorec(xl, yl, b, b);
     ctx.fillStyle = "white";
     ctx.fillText(" - player 1 power ", xl+= 16, yl += 11);

     ctx.fillStyle = "#3d0d2c";
     ctx.fillRect(xl -= 16, yl += 15, b, b);
     stvorec(xl, yl, b, b);
     ctx.fillStyle = "white";
     ctx.fillText(" - player 2 power ", xl+= 16, yl += 11);
     

    // Nakreslenie pozadia
    ctx.fillStyle = "#8BC766";
    ctx.strokeStyle = "black";
    for (let x = 0; x < 5 * dimension; x = x + dimension) {
        for (let y = 0; y < 5 * dimension; y = y + dimension) {
            ctx.fillRect(x, y, dimension, dimension);
            ctx.strokeRect(x,y,dimension,dimension);
        }
    }

    // setup
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    let cas = 0;
    ctx.font = "50px Calibri";
    let x = 7 * dimension / 20; 
    let y = 11 * dimension / 16;
    ctx.fillText("1", x, y);
    ctx.fillStyle = "yellow";
    ctx.fillText("2", x += 4 * dimension, y += 4 * dimension);

    // 1. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillStyle = "red";
        ctx.fillText("1", x -= 2 * dimension, y -= 2 * dimension);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("1", xl += 170, yl += 169);
    }, cas += 1000);

    // 1. tah hraca 1 - 2. akcia
    setTimeout(function() {
        ctx.font = "50px Calibri";
        ctx.fillStyle = "red";
        ctx.fillText("1", x + dimension, y += dimension);
    }, cas += 1000);

    // 1. tah hraca 2 - 1. akcia
    setTimeout(function() {
        ctx.fillStyle = "yellow";
        ctx.fillText("2", x += dimension, y -= dimension);
    }, cas += 1000);

    // 1. tah hraca 2 - 2. akcia
    setTimeout(function() {
        ctx.fillStyle = "yellow";
        ctx.fillText("2", x -= 2 * dimension, y -= dimension);
    }, cas += 1000);

    // 2. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillStyle = "red";
        ctx.fillText("1", x, y += dimension);
        ctx.fillStyle = "black";
        ctx.fillRect(xl, yl -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("2", xl, yl += 20);
    }, cas += 1000);

    // 2. tah hraca 1 - 2. akcia
    setTimeout(function() {
        ctx.font = "50px Calibri";
        ctx.fillStyle = "red";
        ctx.fillText("1", x += dimension, y += dimension);
    }, cas += 1000);

    // 2. tah hraca 2 - 1. akcia
    setTimeout(function() {
        ctx.fillStyle = "yellow";
        ctx.fillText("2", x, y -= 2 * dimension);
    }, cas += 1000);

    // 2. tah hraca 2 - 2. akcia
    setTimeout(function() {
        ctx.fillStyle = "yellow";
        ctx.fillText("2", x -= dimension, y += 2 * dimension);
        obrazok1.src = c.toDataURL("image/png");
    }, cas += 1000);

    // tabulka score
    setTimeout(function() { 
        ctx.font = "20px Calibri";
        ctx.fillStyle = "red";
        ctx.fillText("Player 1", xl -= 170, yl -= 120);
        ctx.fillStyle = "yellow";
        ctx.fillText("Player 2", xl += 100, yl);
        ctx.fillStyle = "white";
        ctx.fillText(":", xl -= 20, yl += 30)
        ctx.font = "50px Calibri";
    }, cas += 1000);

    // zvýraznenie okupovaného políčka
    setTimeout(function() {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#5b5e3f";
        ctx.fillRect(dimension, dimension, dimension, dimension);
        stvorec(dimension, dimension, dimension, dimension);
        ctx.fillStyle = "yellow";
        ctx.fillText("2", x, y -= 2 * dimension);
        // priratanie sily hraca 2
        ctx.font = "20px Calibri";
        ctx.fillText("1", xl += 45, yl);
        ctx.font = "50px Calibri";
    }, cas += 1000);

    //animácia stvorca ohraničujuceho podporurujúce políčka
    setTimeout(function() {
        ctx.lineWidth = "5";
        ctx.strokeStyle = "red";
        stvorec(0, 0, 3 * dimension, 3 * dimension);
        ctx.lineWidth = "1";
        }, cas += 1000);

    // zvýraznenie sily hraca 2
    
    setTimeout(function() {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#3d0d2c";
        ctx.fillRect( 2 * dimension, dimension, dimension, dimension);
        stvorec(2 * dimension, dimension, dimension, dimension);
        ctx.fillStyle = "yellow";
        ctx.fillText("2", x += dimension, y);
        //priratanie sily hraca 2
        ctx.fillStyle = "black";
        ctx.fillRect(xl, yl -= 20, 20, 20);
        yl += 20;
        ctx.font = "20px Calibri";
        ctx.fillStyle = "yellow";
        ctx.fillText("2", xl, yl);
        ctx.font = "50px Calibri";
    }, cas += 1000);

    // zvýraznenie sily hraca 1
    let x1 = 28;
    let score1 = 1;
    setTimeout(function() {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#949437";
        ctx.fillRect(0, 0, dimension, dimension);
        stvorec(0, 0, dimension, dimension);
        ctx.fillStyle = "red";
        ctx.fillText("1", x -= 2 * dimension, y -= dimension);
        // priratanie sily hraca 1
        ctx.font = "20px Calibri";
        ctx.fillText(score1, xl -= 100, yl);
        ctx.font = "50px Calibri";
    }, cas += 1000);
        for (let x = dimension; x <= 2 * dimension; x += dimension) {
        let y = 2 * dimension;
        let y1 = 2 * dimension + 55;
        setTimeout(function(){
            ctx.fillStyle = "#949437";
            score1 += 1;
            ctx.fillRect(x, y, dimension, dimension);
            stvorec(x, y, dimension, dimension);
            x1 += dimension;
            ctx.fillStyle = "red";
            ctx.fillText("1", x1, y1);
            // priratanie sily hraca 1
            ctx.fillStyle = "black";
            ctx.fillRect(xl, yl -= 20, 20, 20);
            yl += 20;
            ctx.font = "20px Calibri";
            ctx.fillStyle = "red";
            ctx.fillText(score1, xl, yl);
            ctx.font = "50px Calibri";
            }, cas += 1000);    
        }

    // obsadenie policka
    setTimeout(function(){
        ctx.fillStyle = "#8BC766";
        ctx.fillRect(dimension, dimension, dimension, dimension);
        ctx.strokeStyle = "black";
        ctx.strokeRect(dimension, dimension, dimension, dimension);
        ctx.fillStyle = "red";
        ctx.fillText("1", x += dimension, y += dimension);
        ctx.fillStyle = "black";
        ctx.fillRect(xl += 145, yl += 70, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("3", xl, yl += 20);
    }, cas += 1000);

    setTimeout(function() {
        ctx.drawImage(obrazok1,0,0);
        ctx.font = "50px Calibri";
        ctx.fillStyle = "#8BC766";
        ctx.fillRect(dimension,  dimension, dimension, dimension);
        ctx.strokeStyle = "black";
        ctx.strokeRect(dimension, dimension, dimension, dimension);
        ctx.fillStyle = "red";
        ctx.fillText("1", x, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xl, yl -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("3", xl, yl += 20);
    }, cas += 1000);

    /*savedData.src = c.toDataURL("image/png");
    ctx.drawImage(savedData,0,0);*/
    

    setTimeout(animácia2, cas += 1000);
    }
        function animacia3() {
            let c = document.getElementById("animacia3"); // First of all, you must find the <canvas> element. This is done by using the HTML DOM method getElementById().
            let ctx = c.getContext("2d"); //Secondly, you need a drawing object for the canvas. The getContext() is a built-in HTML object, with properties and methods for drawing.
            c.height = 400;
            c.width = 620;
            c.style.height = "400px";
            c.style.width = "620px";
        
            obrazok = new Image();
            const dimension = 80;

            function stvorec(xArg = 0, yArg = 0, x = 0, y = 0) {
            //Draw a rectangle
            ctx.beginPath();
            ctx.strokeRect(xArg, yArg, x, y);
            }
            function hora() {
            // hora v potencialne novej grafike
                for (let a = 2; a < 5; a += 1) {
                    let b = 3;
                    ctx.fillStyle = "gray";
                    ctx.beginPath();
                    ctx.moveTo(a * dimension + dimension / 8, b * dimension + 7 * dimension / 8);
                    ctx.lineTo(a * dimension +  7 * dimension / 8, b * dimension + 7 * dimension / 8);
                    ctx.lineTo(a * dimension +  11 * dimension / 16, b * dimension + 3 * dimension / 8);
                    ctx.lineTo(a * dimension + 5 * dimension / 16, b * dimension + 3 * dimension / 8);
                    ctx.fill();
                    ctx.fillStyle = "white";
                    ctx.beginPath();
                    ctx.moveTo(a * dimension + 5 * dimension / 16, b * dimension + 3 * dimension / 8);
                    ctx.lineTo(a * dimension + 11 * dimension / 16, b * dimension + 3 * dimension / 8);
                    ctx.lineTo(a * dimension + dimension / 2, b * dimension + dimension / 8);
                    ctx.fill();
                    }
                }

            // Legenda
            let xl = 5 * dimension + 80;
            let yl = 20;
            ctx.fillRect(5 * dimension, 0, 220, 5 * dimension);
            ctx.font = " bold 18px Calibri";
            ctx.fillStyle = "white";
            ctx.fillText("Legend", xl,yl);
            ctx.font = "18px Calibri";
            ctx.fillText("Turn:", xl += 70, yl += 360);

     
            xl = 5 * dimension + 13;;
            yl = 45;
            let b = 14;
            
            ctx.fillStyle = "#8BC766";
            ctx.strokeStyle = "black";
            ctx.fillRect(xl, yl, b, b);
            stvorec(xl, yl, b, b)
            ctx.fillStyle = "white";
            ctx.font = "14px Calibri";
            ctx.fillText(" - tile", xl += 16, yl += 11);

            ctx.fillStyle = "white";
            ctx.fillText("1", xl -= 14, yl += 26);
            ctx.fillStyle = "white";
            ctx.fillText(" - conquered tiles", xl += 5, yl);

            ctx.strokeStyle = "red";
            stvorec(xl -= 8, yl += 15, b, b);
            ctx.fillText(" - supporting  tiles", xl += 16, yl += 11);

            ctx.strokeStyle = "black";
            ctx.fillStyle = "#5b5e3f";
            ctx.fillRect(xl -= 16, yl += 15, b, b);
            stvorec(xl, yl, b, b);
            ctx.fillStyle = "white";
            ctx.fillText(" - occupied tile", xl+= 16, yl += 11);

            ctx.fillStyle = "#949437";
            ctx.fillRect(xl -= 16, yl += 15, b, b);
            stvorec(xl, yl, b, b);
            ctx.fillStyle = "white";
            ctx.fillText(" - player 1 power ", xl+= 16, yl += 11);
            ctx.font = " bold 20px Calibri";
            ctx.fillText("Warehouse", xl+= 30, yl += 50);

     
    // Nakreslenie pozadia
    ctx.fillStyle = "#8BC766";
    ctx.strokeStyle = "black";
    for (let x = 0; x < 5 * dimension; x = x + dimension) {
        for (let y = 0; y < 5 * dimension; y = y + dimension) {
            ctx.fillRect(x, y, dimension, dimension);
            ctx.strokeRect(x,y,dimension,dimension);
        }
    }

    // setup
    let cas = 0;
    ctx.font = "50px Calibri";
    let x = 7 * dimension / 20;
    let y = 11 * dimension / 16;
    ctx.fillStyle = "white";
    ctx.fillText("1", x, y);

    // hora
    for (a = 1; a <= 3; a += 1) {
        ctx.fillStyle = "brown";
        ctx.fillRect( a * dimension + 10, 2 * dimension + 10, dimension - 20, dimension - 20);
    }
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(dimension + dimension / 2, 2 * dimension + dimension / 2);
    ctx.lineTo(3 * dimension + dimension / 2, 2 * dimension + dimension / 2);
    ctx.stroke();

    // 1. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillStyle = "white";
        ctx.fillText("1", x, y += 2 * dimension);
        ctx.font = "18px Calibri";
        ctx.fillText("1", xl += 140, yl += 170);
    }, cas += 1000);

    // 1. tah hraca 1 - 2. akcia
    setTimeout(function() {
        ctx.font = "50px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("1", x += dimension, y -= dimension);
    }, cas += 1000);

    // 2. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.font = "50px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("1", x += dimension, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xl, yl -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("2", xl, yl += 20);
        u = yl - 160;
    }, cas += 1000);

    setTimeout(function() {
    obrazok.src = c.toDataURL("image/png");
    }, cas += 1000);
    

    // 2. a 3. tah hraca 1 - uloženie akcii do warehouse
    let counter = 0;
    for (w = 5 * dimension + 50; w < 5 * dimension + 80; w += 10) {
        setTimeout(function(){
            w += 10;
            counter += 1;
            ctx.strokeStyle = "white";
            ctx.lineWidth = "3";
            ctx.beginPath();
            ctx.moveTo(w, u);
            ctx.lineTo(w, u += 20);
            ctx.stroke();
            u -= 20
            if (counter == 2) {
                ctx.fillStyle = "black";
                ctx.fillRect(xl, yl -= 20, 20, 20);
                ctx.fillStyle = "white";
                ctx.font = "18px Calibri";
                ctx.fillText("3", xl, yl += 20);
            }
        }, cas += 1000);
    }

    // zvýraznenie okupového políčka
    setTimeout(function() {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#5b5e3f";
        ctx.fillRect(dimension, 2 * dimension, dimension, dimension);
        ctx.lineWidth = "1";
        stvorec(dimension, 2 * dimension, dimension, dimension);
        ctx.fillStyle = "brown";
        ctx.fillRect(dimension + 10, 2 * dimension + 10, dimension - 20, dimension - 20);
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo(dimension + dimension / 2, 2 * dimension + dimension / 2);
        ctx.lineTo(2 * dimension, 2 * dimension + dimension / 2);
        ctx.stroke();
    }, cas += 1000);

    //animácia stvorca ohraničujuceho podporurujúce políčka
    setTimeout(function() {
        ctx.lineWidth = "5";
        ctx.strokeStyle = "red";
        stvorec(0, dimension, 3 * dimension, 3 * dimension);
        ctx.lineWidth = "1";
        }, cas += 1000);

    // tabulka score
    setTimeout(function() { 
        ctx.font = "20px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("Player 1:", xl -= 130, yl -= 100);
        ctx.font = "50px Calibri";
    }, cas += 1000);

    // zvýraznenie sily hraca 1
    let x1 = 7 * dimension / 20;
    let score1 = 1;
    setTimeout(function() {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#949437";
        ctx.fillRect(0, 2 * dimension, dimension, dimension);
        stvorec(0, 2 * dimension, dimension, dimension);
        ctx.fillStyle = "white";
        ctx.fillText("1", x1, y += dimension);
        // priratanie sily hraca 1
        ctx.font = "20px Calibri";
        ctx.fillText(score1, xl += 75, yl);
        ctx.font = "50px Calibri";
    }, cas += 1000);

    for (let x = dimension; x <= 2 * dimension; x += dimension) {
        let y = dimension;
        let y1 = dimension + 11 * dimension / 16;
        setTimeout(function(){
            ctx.fillStyle = "#949437";
            score1 += 1;
            ctx.fillRect(x, y, dimension, dimension);
            stvorec(x, y, dimension, dimension);
            x1 += dimension;
            ctx.fillStyle = "white";
            ctx.fillText("1", x1, y1);
            // priratanie sily hraca 1
            ctx.fillStyle = "black";
            ctx.fillRect(xl, yl -= 20, 20, 20);
            yl += 20;
            ctx.font = "20px Calibri";
            ctx.fillStyle = "white";
            ctx.fillText(score1, xl, yl);
            ctx.font = "50px Calibri";
            }, cas += 1000);    
        }
    
    // 4. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillText("1", x -= dimension, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xl += 55, yl += 80, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("4", xl, yl += 20);
    }, cas += 1000);

    setTimeout(function() {
        ctx.drawImage(obrazok,0,0);
        ctx.font = "50px Calibri";
        ctx.fillText("1", x, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xl, yl -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("4", xl, yl += 20);
        obrazok.src = c.toDataURL("image/png");
    }, cas += 1000);

    // 4. a 5. tah hraca 1 - uloženie akcii do warehouse
    setTimeout(function() {
    counter = 0;
    }, cas);
    for (z = 5 * dimension + 50; z < 5 * dimension + 80; z += 10) {
        setTimeout(function(){
            z += 10;
            counter += 1;
            ctx.strokeStyle = "white";
            ctx.lineWidth = "3";
            ctx.beginPath();
            ctx.moveTo(z, u);
            ctx.lineTo(z, u += 20);
            ctx.stroke();
            u -= 20
            if (counter == 2) {
                ctx.fillStyle = "black";
                ctx.fillRect(xl, yl -= 20, 20, 20);
                ctx.fillStyle = "white";
                ctx.font = "18px Calibri";
                ctx.fillText("5", xl, yl += 20);
            }
        }, cas += 1000);
    }

    // zvýraznenie okupového políčka
    setTimeout(function() {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#5b5e3f";
        ctx.fillRect( 2 * dimension, 2 * dimension, dimension, dimension);
        ctx.lineWidth = "1";
        stvorec( 2 * dimension, 2 * dimension, dimension, dimension);
        ctx.fillStyle = "brown";
        ctx.fillRect( 2 * dimension + 10, 2 * dimension + 10, dimension - 20, dimension - 20);
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo( 2 * dimension, 2 * dimension + dimension / 2);
        ctx.lineTo(3 * dimension, 2 * dimension + dimension / 2);
        ctx.stroke();
    }, cas += 1000);

    //animácia stvorca ohraničujuceho podporurujúce políčka
    setTimeout(function() {
        ctx.lineWidth = "5";
        ctx.strokeStyle = "red";
        stvorec(dimension, dimension, 3 * dimension, 3 * dimension);
        ctx.lineWidth = "1";
        }, cas += 1000);
    
    // tabulka score
    setTimeout(function() { 
        ctx.font = "20px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("Player 1:", xl -= 130, yl -= 100);
        ctx.font = "50px Calibri";
    }, cas += 1000);

    // zvýraznenie sily hraca 1
    setTimeout(function() {
        x1 = dimension + 7 * dimension / 20;
        score1 = 3;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#949437";
        ctx.fillRect(dimension, 2 * dimension, dimension, dimension);
        stvorec(dimension, 2 * dimension, dimension, dimension);
        ctx.fillStyle = "brown";
        ctx.fillRect(dimension + 10, 2 * dimension + 10, dimension - 20, dimension - 20);
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo(dimension + dimension / 2, 2 * dimension + dimension / 2);
        ctx.lineTo(2 * dimension, 2 * dimension + dimension / 2);
        ctx.stroke();
        ctx.strokeStyle = "black"
        ctx.fillStyle = "white";
        ctx.fillText("1", x1, y);
        // priratanie sily hraca 1
        ctx.font = "20px Calibri";
        ctx.fillText(score1, xl += 75, yl);
        ctx.font = "50px Calibri";
    }, cas += 1000);

    for (let x = dimension; x <= 2 * dimension; x += dimension) {
        let y = dimension;
        let y1 = dimension + 11 * dimension / 16;
        setTimeout(function(){
            ctx.fillStyle = "#949437";
            score1 += 1;
            ctx.fillRect(x, y, dimension, dimension);
            stvorec(x, y, dimension, dimension);
            ctx.fillStyle = "white";
            ctx.fillText("1", x1, y1);
            x1 += dimension;
            // priratanie sily hraca 1
            ctx.fillStyle = "black";
            ctx.fillRect(xl, yl -= 20, 20, 20);
            yl += 20;
            ctx.font = "20px Calibri";
            ctx.fillStyle = "white";
            ctx.fillText(score1, xl, yl);
            ctx.font = "50px Calibri";
            }, cas += 1000);    
        }

    // 6. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillText("1", x += dimension, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xl += 55, yl += 80, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("6", xl, yl += 20);
    }, cas += 1000);

    setTimeout(function() {
        ctx.drawImage(obrazok,0,0);
        ctx.font = "50px Calibri";
        ctx.fillText("1", x, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xl, yl -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("6", xl, yl += 20);
    }, cas += 1000);

    setTimeout(animacia3, cas += 1000);
}
animácia1();
animácia2();
animacia3();
