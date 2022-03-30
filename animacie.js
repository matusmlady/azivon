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
    
        savedData = new Image();
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
     ctx.fillText(" - conquered tiles by player 1", xl += 5, yl);

     ctx.fillStyle = "red";
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
    for (let x = 0; x < 400; x = x + dimension) {
        for (let y = 0; y < 400; y = y + dimension) {
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
    }, cas += 1000);

    // 1. tah hraca 1 - 2. akcia
    setTimeout(function() {
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
    }, cas += 1000);

    // 2. tah hraca 1 - 2. akcia
    setTimeout(function() {
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
    }, cas += 1000);

    // tabulka score
    setTimeout(function() { ctx.font = "20px Calibri";
    ctx.fillStyle = "red";
    ctx.fillText("Player 1", xl, yl += 50);
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
        ctx.lineWidth = 5;
        ctx.strokeStyle = "red";
        stvorec(0, 0, 240, 240);
        ctx.lineWidth = 1}, cas += 1000);

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
        ctx.fillText("1", x += dimension, y += dimension)
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
        
            savedData = new Image();
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
    for (let x = 0; x < 400; x = x + dimension) {
        for (let y = 0; y < 400; y = y + dimension) {
            ctx.fillRect(x, y, dimension, dimension);
            ctx.strokeRect(x,y,dimension,dimension);
        }
    }

    // setup
    let cas = 0;
    ctx.font = "50px Calibri";
    let x = 7 * dimension / 20;
    let y = 11 * dimension / 16;
    ctx.fillStyle = "red";
    ctx.fillText("1", x, y);
    ctx.fillStyle = "yellow";
    ctx.fillText("2", x += 4 * dimension, y += 4 * dimension);
    ctx.fillStyle = "brown";
    // hora
    ctx.fillRect(2 * dimension + 10, 2 * dimension + 10, dimension - 20, dimension - 20);
    ctx.fillRect(3 * dimension + 10, 2 * dimension + 10, dimension - 20, dimension - 20);
    ctx.fillRect(4 * dimension + 10, 2 * dimension + 10, dimension - 20, dimension - 20);
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(2 * dimension + dimension / 2, 2 * dimension + dimension / 2);
    ctx.lineTo(4 * dimension + dimension / 2, 2 * dimension + dimension / 2);
    ctx.stroke();

    // 1. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillStyle = "red";
        ctx.fillText("1", x -= 3 * dimension, y -= 2 * dimension);
    }, cas += 1000);

    // 1. tah hraca 1 - 2. akcia
    setTimeout(function() {
        ctx.fillStyle = "red";
        ctx.fillText("1", x + dimension, y -= dimension);
    }, cas += 1000);

    // 2. tah hraca 2 - 1. akcia
    setTimeout(function() {
        ctx.fillStyle = "yellow";
        ctx.fillText("2", x += dimension, y += 2 * dimension);
    }, cas += 1000);

    // 2. tah hraca 2 - 2. akcia
    setTimeout(function() {
        ctx.fillStyle = "yellow";
        ctx.fillText("2", x += dimension, y);
    }, cas += 1000);

    setTimeout(animacia3, cas += 1000);
}
animácia1(); 
animácia2();
animacia3();
