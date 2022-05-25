       function Expansion1() {
        let c = document.getElementById("Expansion1"); // First of all, you must find the <canvas> element. This is done by using the HTML DOM method getElementById().
        let ctx = c.getContext("2d"); //Secondly, you need a drawing object for the canvas. The getContext() is a built-in HTML object, with properties and methods for drawing.
        c.height = 400;
        c.width = 620;
        c.style.height = "400px";
        c.style.width = "620px";

        
        savedData = new Image();
        const dimension = 80;
        const r = 1/10 * dimension; // relatívny polomer kruhov vyznačujúcich kam sa môže hráč pohnúť
        const font = 5/8 * dimension; // relatívna veľkosť fontu


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
         yl += 25;
         let b = 14;
         ctx.fillRect(xl, yl, b, b);
         stvorec(xl, yl, b, b)
         ctx.fillStyle = "white";
         ctx.font = "14px Calibri";
         ctx.fillText(" - tile", xl += 16, yl += 11);
         ctx.fillStyle = "white";
         ctx.fillText("1", xl -= 14, yl += 26);
         ctx.fillStyle = "white";
         ctx.fillText(" - conquered tiles", xl += 5, yl);
         ctx.fillStyle = "white";
         kruh(xl, yl += 25 , 7);
         ctx.fillStyle = "white";
         ctx.fillText(" - conquerable tiles", xl+= 8, yl += 5);
         ctx.strokeStyle = "red";
         xl -= 14;
         yl += 20;
         stvorec(xl, yl, b, b);
         ctx.fillText(" - conquerable tiles", xl += 18, yl += 11);

        // Nakreslenie pozadia
        ctx.fillStyle = "#8BC766";
        ctx.strokeStyle = "black";
        for (let x = 0; x < 5 * dimension; x += dimension) {
            for (let y = 0; y < 5 * dimension; y += dimension) {
                ctx.fillRect(x, y, dimension, dimension);
                ctx.strokeRect(x,y,dimension,dimension);
            }
        }

        // setup - animácia cisla vľavo hore a uloženie obrázka
        ctx.fillStyle = "white";
        let cas = 1000;
        ctx.font = font + "px Calibri"; 
        let x = 7 * dimension / 20; 
        let y = 11 * dimension / 16; 
        ctx.fillText("1", x, y);
        savedData.src = c.toDataURL("image/png");
        

        //animácia stvorca ohraničujuceho možnosti na pohyb
        setTimeout(function() {
            ctx.lineWidth = 5;
            ctx.strokeStyle = "red";
            stvorec(3, 3, 3 * dimension - 3, 3 * dimension - 3)}, cas += 1000);
        
        //animácia možných pohybov 
        for (let x = dimension + dimension / 2; x <= 2 * dimension + dimension / 2; x += dimension) {
            let y = dimension / 2;
            setTimeout(function() {
                kruh(x, y, r);
            }, cas += 500);
            }

        for (let y = dimension + dimension / 2; y <= 2 * dimension + dimension / 2; y += dimension) {
            for (let x = dimension / 2; x <= 2 * dimension + dimension / 2; x = x + dimension) {
                setTimeout(function() {
                    kruh(x, y, r)
                }, cas += 500);
            }
        } 

        // animácia cisla v strede
        setTimeout(function() {
            ctx.fillStyle = "#8BC766";
            kruh(2 * dimension + dimension / 2, 2 * dimension + dimension / 2, 10);
            ctx.fillStyle = "white";
            ctx.fillText("1", x += 2 * dimension, y += 2 * dimension)
        }, cas += 1000);

        setTimeout(function() {
            ctx.drawImage(savedData,0,0);
            for (let x = dimension + dimension / 2; x <= 2 * dimension + dimension / 2; x += dimension) {
                let y = dimension / 2;
                kruh(x, y, r);
            }
                for (let y = dimension + dimension / 2; y <= 2 * dimension + dimension / 2; y += dimension) {
                    for (let x = dimension / 2; x <= 2 * dimension + dimension / 2; x += dimension) {
                        kruh(x, y, r);
                }
            }
            ctx.fillStyle = "#8BC766";
            kruh(2 * dimension + dimension / 2, 2 * dimension + dimension / 2, r);
            ctx.fillStyle = "white";
            ctx.fillText("1", x, y)
            }, cas += 1000);

        //animácia stvorca ohraničujuceho možnosti na pohyb
        setTimeout(function() {
            stvorec(3, 3, 5 * dimension - 6, 5 * dimension - 6);
        }, cas += 1000);
        
        
        //animácia možných pohybov
        for (let y = dimension / 2; y <= 2 * dimension + dimension / 2; y += dimension) {
            for (let x = 3 * dimension + dimension / 2; x <= 4 * dimension + dimension / 2; x += dimension) {
                setTimeout(function() {
                    kruh(x, y, r);
                }, cas += 500);
            }
        }
        //animácia možných pohybov
        for (let y = 3 * dimension + dimension / 2; y <= 4 * dimension + dimension / 2; y += dimension) {
            for (let x = dimension / 2; x <= 4 * dimension + dimension / 2; x += dimension) {
                setTimeout(function() {
                    kruh(x, y, r);
                }, cas += 500);
            }
        }
        
        // animácia kruhu vpravo dole
        setTimeout(function() {
            ctx.fillStyle = "#8BC766";
            kruh(4 * dimension + dimension / 2, 4 * dimension + dimension / 2, r);
            ctx.fillStyle = "white";
            cislo(x += 2 * dimension, y += 2 * dimension)
        }, cas += 500);

        setTimeout(Expansion1, cas += 3000);
        }  
            Expansion1();
    function Conquering1() {
        let c = document.getElementById("Conquering1"); // First of all, you must find the <canvas> element. This is done by using the HTML DOM method getElementById().
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

     ctx.fillStyle = "white";
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
    ctx.fillStyle = "white";
    let cas = 0;
    ctx.font = "50px Calibri";
    let x = 7 * dimension / 20; 
    let y = 11 * dimension / 16;
    ctx.fillText("1", x, y);
    ctx.fillStyle = "yellow";
    ctx.fillText("2", x += 4 * dimension, y += 4 * dimension);

    // 1. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillStyle = "white";
        ctx.fillText("1", x -= 2 * dimension, y -= 2 * dimension);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("1", xl += 170, yl += 169);
    }, cas += 1000);

    // 1. tah hraca 1 - 2. akcia
    setTimeout(function() {
        ctx.font = "50px Calibri";
        ctx.fillStyle = "white";
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
        ctx.fillStyle = "white";
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
        ctx.fillStyle = "white";
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
        ctx.fillStyle = "white";
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
        ctx.fillStyle = "white";
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

    // obsadenie policka
    setTimeout(function(){
        ctx.fillStyle = "#8BC766";
        ctx.fillRect(dimension, dimension, dimension, dimension);
        ctx.strokeStyle = "black";
        ctx.strokeRect(dimension, dimension, dimension, dimension);
        ctx.fillStyle = "white";
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
        ctx.fillStyle = "white";
        ctx.fillText("1", x, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xl, yl -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("3", xl, yl += 20);
    }, cas += 1000);

    setTimeout(Conquering1, cas += 3000);
    }
    Conquering1();
        function Elements1() {
            let c = document.getElementById("Elements1"); // First of all, you must find the <canvas> element. This is done by using the HTML DOM method getElementById().
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

            function horaNew(xArg = 0, yArg = 0) {
            // hora v potencialne novej grafike
                for (let a = xArg; a < xArg + 3; a += 1) {
                    let b = yArg;
                    ctx.fillStyle = "gray";
                    ctx.beginPath();
                    ctx.moveTo(a * dimension - 7/8 * dimension, b * dimension - dimension / 8);
                    ctx.lineTo(a * dimension - dimension / 8, b * dimension - dimension / 8);
                    ctx.lineTo(a * dimension -  5 * dimension / 16, b * dimension - 5 * dimension / 8);
                    ctx.lineTo(a * dimension - 11 * dimension / 16, b * dimension - 5 * dimension / 8);
                    ctx.fill();
                    ctx.fillStyle = "white";
                    ctx.beginPath();
                    ctx.moveTo(a * dimension - 11 * dimension / 16, b * dimension - 5 * dimension / 8);
                    ctx.lineTo(a * dimension - 5 * dimension / 16, b * dimension - 5 * dimension / 8);
                    ctx.lineTo(a * dimension - dimension / 2, b * dimension - 7/8 * dimension);
                    ctx.fill();
                    }
                }
            function horaOld(xArg = 0, yArg = 0) {
                for (let x = xArg; x <= xArg + 2; x += 1) {
                    let y = yArg;
                    ctx.fillStyle = "brown";
                    ctx.fillRect(x * dimension - 7/8 * dimension, y * dimension - 7/8 * dimension, dimension - 20, dimension - 20);
                }
                ctx.strokeStyle = "yellow";
                ctx.beginPath();
                ctx.moveTo(xArg * dimension - dimension / 2, yArg * dimension - dimension / 2);
                ctx.lineTo((xArg + 1) * dimension + dimension / 2, yArg * dimension - dimension / 2);
                ctx.stroke();
            }

            // Legenda
            let xl = 5 * dimension + 80; // xova suradnica pre legendu
            let yl = 20; //yova suradnica pre legendu
            let xt = xl + 70; // xova suradnica pre tahy
            let yt = yl + 360; // yova suradnica pre tahy

            ctx.fillRect(5 * dimension, 0, 220, 5 * dimension);
            ctx.font = " bold 18px Calibri";
            ctx.fillStyle = "white";
            ctx.fillText("Legend", xl,yl);
            ctx.font = "18px Calibri";
            ctx.fillText("Turn:", xt, yt);

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

            // hora v legende
            yl += 13;
            for ( xl = 5 * dimension + 13; xl <= 5 * dimension + 4 * b + 5; xl += b + 5) {
                ctx.fillStyle = "brown";
                ctx.fillRect(xl, yl, b , b);
                }
            xl = 5 * dimension + 13;
            ctx.strokeStyle = "yellow";
            ctx.beginPath();
            ctx.moveTo(xl + b / 2, yl + b / 2);
            ctx.lineTo(xl + 3 * b + 5, yl + b / 2);
            ctx.stroke();

            ctx.fillStyle = "white";
            ctx.fillText(" - mountain", xl += 3 * b + 10, yl += 11);

            ctx.strokeStyle = "white";
            ctx.lineWidth = "3";
            ctx.beginPath();
            ctx.moveTo(xl -= 3 * b + 3, yl += 15);
            ctx.lineTo(xl, yl += b);
            ctx.stroke();
            ctx.fillText(" - action", xl += 3, yl -= 3);

            // Warehouse
            ctx.fillStyle = "white";
            let xw = xl + 35; // xova suradnica pre warehouse
            let yw = yl + 45; // yova suradnica pre warehouse
            ctx.font = " bold 20px Calibri";
            ctx.fillText("Warehouse", xw, yw);
     
    // Nakreslenie pozadia
    ctx.fillStyle = "#8BC766";
    ctx.strokeStyle = "black";
    ctx.lineWidth = "1";
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
    horaOld(2,3);

    // 1. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillStyle = "white";
        ctx.fillText("1", x, y += 2 * dimension);
        ctx.font = "18px Calibri";
        ctx.fillText("1", xt += 50, yt);
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
        ctx.fillRect(xt, yt -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("2", xt, yt += 20);
    }, cas += 1000);

    setTimeout(function() {
    obrazok.src = c.toDataURL("image/png");
    }, cas += 1000);
    

    // 2. a 3. tah hraca 1 - uloženie akcii do warehouse
    let counter = 0;
    for (let w = 5 * dimension + 85; w < 5 * dimension + 115; w += 10) {
        setTimeout(function(){
            let u = yw + 10;
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
                ctx.fillRect(xt, yt -= 20, 20, 20);
                ctx.fillStyle = "white";
                ctx.font = "18px Calibri";
                ctx.fillText("3", xt, yt += 20);
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
        ctx.fillText("Player 1:", xw += 10, yw += 50);
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
        ctx.fillText(score1, xw += 75, yw);
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
            ctx.fillRect(xw, yw -= 20, 20, 20);
            yw += 20;
            ctx.font = "20px Calibri";
            ctx.fillStyle = "white";
            ctx.fillText(score1, xw, yw);
            ctx.font = "50px Calibri";
            }, cas += 1000);    
        }
    
    // 4. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillText("1", x -= dimension, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xt, yt -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("4", xt, yt += 20);
    }, cas += 1000);

    setTimeout(function() {
        ctx.drawImage(obrazok,0,0);
        ctx.font = "50px Calibri";
        ctx.fillText("1", x, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xt, yt -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("4", xt, yt += 20);
        obrazok.src = c.toDataURL("image/png");
    }, cas += 1000);

    // 4. a 5. tah hraca 1 - uloženie akcii do warehouse
    setTimeout(function() {
    counter = 0;
    }, cas);
    for (let z = 5 * dimension + 85; z < 5 * dimension + 115; z += 10) {
        setTimeout(function(){
            z += 10;
            let u = yw - 40;
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
                ctx.fillRect(xt, yt -= 20, 20, 20);
                ctx.fillStyle = "white";
                ctx.font = "18px Calibri";
                ctx.fillText("5", xt, yt += 20);
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
        ctx.fillText("Player 1:", xw -= 75, yw);
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
        ctx.fillText(score1, xw += 75, yw);
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
            ctx.fillRect(xw, yw -= 20, 20, 20);
            yw += 20;
            ctx.font = "20px Calibri";
            ctx.fillStyle = "white";
            ctx.fillText(score1, xw, yw);
            ctx.font = "50px Calibri";
            }, cas += 1000);    
        }

    // 6. tah hraca 1 - 1. akcia
    setTimeout(function() {
        ctx.fillText("1", x += dimension, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xt, yt -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("6", xt, yt += 20);
    }, cas += 1000);

    setTimeout(function() {
        ctx.drawImage(obrazok,0,0);
        ctx.font = "50px Calibri";
        ctx.fillText("1", x, y);
        ctx.fillStyle = "black";
        ctx.fillRect(xt, yt -= 20, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.fillText("6", xt, yt += 20);
    }, cas += 1000);

    setTimeout(Elements1, cas += 3000);
}
    Elements1();
        function Elements2() {
            let c = document.getElementById("Elements2"); // First of all, you must find the <canvas> element. This is done by using the HTML DOM method getElementById().
            let ctx = c.getContext("2d"); //Secondly, you need a drawing object for the canvas. The getContext() is a built-in HTML object, with properties and methods for drawing.
            c.height = 400;
            c.width = 620;
            c.style.height = "400px";
            c.style.width = "620px";
        
            obrazok2 = new Image();
            const dimension = 80;

            function kruznica(xArg = 0, yArg = 0, r = 0) {
            //Draw a circle
            ctx.beginPath();
            ctx.arc(xArg, yArg, r, 0, 2 * Math.PI);
            ctx.stroke();
            }

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

            function chata(xArg = 0, yArg = 0) {
                ctx.lineWidth = "7";
                ctx.strokeStyle = "brown";
                ctx.strokeRect(xArg * dimension -70, yArg * dimension -50, dimension - 20, dimension - 40);
                ctx.beginPath();
                ctx.moveTo(xArg * dimension -70, yArg * dimension - 50);
                ctx.lineTo(xArg * dimension - 40, yArg * dimension -70);
                ctx.lineTo(xArg * dimension - 10, yArg * dimension - 50);
                ctx.stroke();
            }

            function sweetwoods(xArg = 0, yArg = 0) {
                for (let x = xArg; x <= xArg + 1; x += 1) {
                    let y = yArg;
                    ctx.fillStyle = "#BCA26F";
                    ctx.fillRect(x * dimension - 7/8 * dimension, y * dimension - 7/8 * dimension, dimension - 20, dimension - 20);
                }
                ctx.strokeStyle = "yellow";
                ctx.beginPath();
                ctx.moveTo(xArg * dimension - dimension / 2, yArg * dimension - dimension / 2);
                ctx.lineTo(xArg * dimension + dimension / 2, yArg * dimension - dimension / 2);
                ctx.stroke();
            }

            function drevo(xArg = 0, yArg = 0) {
                // uloženie dreva do warehouse
                ctx.strokeStyle = "brown";
                ctx.lineWidth = "3";
                kruznica(xArg, yArg, b);
                ctx.fillStyle = "#966F33";
                kruh(xArg, yArg, b -= 3);
                b += 3;
                for (let r = 9; r >= 1; r -= 2){
                    ctx.lineWidth = "1";
                    kruznica(xArg, yArg, r);
                }
            }

            // Legenda
            let xl = 5 * dimension + 80; // xova suradnica pre legendu
            let yl = 20; //yova suradnica pre legendu
            let xt = xl + 70; // xova suradnica pre tahy
            let yt = yl + 360; // yova suradnica pre tahy
        
            ctx.fillRect(5 * dimension, 0, 220, 5 * dimension);
            ctx.font = " bold 18px Calibri";
            ctx.fillStyle = "white";
            ctx.fillText("Legend", xl,yl);
            ctx.font = "18px Calibri";
            ctx.fillText("Turn:", xt, yt);

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

            // sweet woods v legende
            yl += 13;
            for ( xl = 5 * dimension + 13; xl < 5 * dimension + 2 * b + 5; xl += b + 5) {
                ctx.fillStyle = "#BCA26F";
                ctx.fillRect(xl, yl, b , b);
                }
            xl = 5 * dimension + 13;
            ctx.strokeStyle = "yellow";
            ctx.beginPath();
            ctx.moveTo(xl + b / 2, yl + b / 2);
            ctx.lineTo(xl + 2 * b - 2, yl + b / 2);
            ctx.stroke();

            ctx.fillStyle = "white";
            ctx.fillText(" - sweet woods", xl += 2 * b + 8, yl += 11);

            // chata v legende
            ctx.lineWidth = "2";
            ctx.strokeStyle = "brown";
            ctx.strokeRect(xl -= 3 * b - b / 2, yl += 20, b, b);
            ctx.beginPath();
            ctx.moveTo(xl, yl);
            ctx.lineTo(xl +=  b / 2, yl -= b / 2);
            ctx.lineTo(xl += b / 2, yl += b / 2);
            ctx.stroke();
            ctx.fillText(" - cottage", xl += 3, yl += 10);

            ctx.strokeStyle = "white";
            ctx.lineWidth = "3";
            ctx.beginPath();
            ctx.moveTo(xl -= b / 2 + 3, yl += 15);
            ctx.lineTo(xl, yl += b);
            ctx.stroke();
            ctx.fillText(" - action", xl += 3, yl -= 3);

            drevo(xl, yl += 25);
            ctx.fillStyle = "white";
            ctx.fillText(" - log", xl += b + 3, yl += 3);
            xl -= b + 3

            // Warehouse
            ctx.fillStyle = "white";
            let xw = xl + 30; // xova suradnica pre warehouse
            let yw = yl + 45; // yova suradnica pre warehouse
            ctx.font = " bold 20px Calibri";
            ctx.fillText("Warehouse", xw, yw);

            // Nakreslenie pozadia
            ctx.fillStyle = "#8BC766";
            ctx.strokeStyle = "black";
            ctx.lineWidth = "1";
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

            // sweet woods
            sweetwoods(2,2);

            // 1. tah hraca 1 - 1. akcia
            setTimeout(function() {
                ctx.fillStyle = "white";
                ctx.fillText("1", x += dimension, y += 2 * dimension);
                ctx.font = "18px Calibri";
                ctx.fillText("1", xt += 45, yt);
            }, cas += 1000);

            setTimeout(function() {
                obrazok2.src = c.toDataURL("image/png");
            }, cas += 1000);

            // 1. a 2. tah hraca 1 - uloženie akcii do warehouse
            let counter = 0;
            for (let w = xw + 45; w <= xw + 55; w += 10) {
                setTimeout(function(){
                    counter += 1;
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = "3";
                    u = yw + 10
                    ctx.beginPath();
                    ctx.moveTo(w, u);
                    ctx.lineTo(w, u += 20);
                    ctx.stroke();
                    if (counter == 2) {
                        ctx.fillStyle = "black";
                        ctx.fillRect(xt, yt -= 20, 20, 20);
                        ctx.fillStyle = "white";
                        ctx.font = "18px Calibri";
                        ctx.fillText("2", xt, yt += 20);
                    }
                }, cas += 1000);
            }

            // zvýraznenie okupového políčka
            setTimeout(function() {
                ctx.strokeStyle = "black";
                ctx.fillStyle = "#5b5e3f";
                ctx.fillRect(dimension, dimension, dimension, dimension);
                ctx.lineWidth = "1";
                stvorec(dimension, dimension, dimension, dimension);
                ctx.fillStyle = "#BCA26F";
                ctx.fillRect(dimension + 10, dimension + 10, dimension - 20, dimension - 20);
                ctx.strokeStyle = "yellow";
                ctx.beginPath();
                ctx.moveTo(dimension + dimension / 2, dimension + dimension / 2);
                ctx.lineTo(2 * dimension, dimension + dimension / 2);
                ctx.stroke();
            }, cas += 1000);

            //animácia stvorca ohraničujuceho podporurujúce políčka
            setTimeout(function() {
                ctx.lineWidth = "5";
                ctx.strokeStyle = "red";
                stvorec(0, 0, 3 * dimension, 3 * dimension);
                ctx.lineWidth = "1";
                }, cas += 1000);
    
            // tabulka score
            setTimeout(function() { 
                ctx.font = "20px Calibri";
                ctx.fillStyle = "white";
                ctx.fillText("Player 1:", xw += 10, yw += 50);
                ctx.font = "50px Calibri";
                xw += 75;
            }, cas += 1000);

            // zvýraznenie sily hraca 1
            let x1 = 7 * dimension / 20;
            let score1 = 0;
            let y1 = 11 * dimension / 16;
            let Y = 0;

            for (let x = 0; x <= dimension; x += dimension) {
                setTimeout(function(){
                    ctx.fillStyle = "#949437";
                    score1 += 1;
                    ctx.fillRect(x, Y, dimension, dimension);
                    stvorec(x, Y, dimension, dimension);
                    Y += 2 * dimension;
                    ctx.fillStyle = "white";
                    ctx.fillText("1", x1, y1);
                    x1 += dimension;
                    y1 += 2 * dimension;
                    // priratanie sily hraca 1
                    ctx.fillStyle = "black";
                    ctx.fillRect(xw, yw -= 20, 20, 20);
                    yw += 20;
                    ctx.font = "20px Calibri";
                    ctx.fillStyle = "white";
                    ctx.fillText(score1, xw, yw);
                    ctx.font = "50px Calibri";
                }, cas += 1000);    
            }
            
            // 3. tah hraca 1 - 1. akcia
            setTimeout(function() {
                ctx.fillText("1", x, y -= dimension);
                ctx.fillStyle = "black";
                ctx.fillRect(xt, yt -= 20, 20, 20);
                ctx.fillStyle = "white";
                ctx.font = "18px Calibri";
                ctx.fillText("3", xt, yt += 20);
            }, cas += 1000);

            // odstranenie zvýraznených políčok
            setTimeout(function() {
                ctx.drawImage(obrazok2,0,0);
                ctx.font = "50px Calibri";
                ctx.fillText("1", x, y);
                ctx.fillStyle = "black";
                ctx.fillRect(xt, yt -= 20, 20, 20);
                ctx.fillStyle = "white";
                ctx.font = "18px Calibri";
                ctx.fillText("3", xt, yt += 20);
            }, cas += 1000);

            // 3. a 4. tah hraca 1 - uloženie akcii do warehouse
            setTimeout(function(){
                counter = 0;
            }, cas) 
            for (let w = xw + 45; w <= xw + 55; w += 10) {
                setTimeout(function(){
                    counter += 1;
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = "3";
                    u = yw - 40
                    ctx.beginPath();
                    ctx.moveTo(w, u);
                    ctx.lineTo(w, u += 20);
                    ctx.stroke();
                    if (counter == 2) {
                        ctx.fillStyle = "black";
                        ctx.fillRect(xt, yt -= 20, 20, 20);
                        ctx.fillStyle = "white";
                        ctx.font = "18px Calibri";
                        ctx.fillText("4", xt, yt += 20);
                    }
                }, cas += 1000);
            }

            // zvýraznenie okupového políčka
            setTimeout(function() {
                ctx.strokeStyle = "black";
                ctx.fillStyle = "#5b5e3f";
                ctx.fillRect(2 * dimension, dimension, dimension, dimension);
                ctx.lineWidth = "1";
                stvorec(2 * dimension, dimension, dimension, dimension);
                ctx.fillStyle = "#BCA26F";
                ctx.fillRect(2 * dimension + 10, dimension + 10, dimension - 20, dimension - 20);
                ctx.strokeStyle = "yellow";
                ctx.beginPath();
                ctx.moveTo(2 * dimension, dimension + dimension / 2);
                ctx.lineTo(2 * dimension + dimension / 2, dimension + dimension / 2);
                ctx.stroke();
            }, cas += 1000);

            //animácia stvorca ohraničujuceho podporurujúce políčka
            setTimeout(function() {
                ctx.lineWidth = "5";
                ctx.strokeStyle = "red";
                stvorec(dimension, 0, 3 * dimension, 3 * dimension);
                ctx.lineWidth = "1";
                }, cas += 1000);

            // tabulka score
            setTimeout(function() { 
                ctx.font = "20px Calibri";
                ctx.fillStyle = "white";
                ctx.fillText("Player 1:", xw -= 75, yw);
                ctx.font = "50px Calibri";
                xw += 75;
            }, cas += 1000);


            // zvýraznenie sily hraca 1
            setTimeout(function(){
                counter = 0;
                x1 = dimension + 7/20 * dimension;
                score1 = 1;
                y1 = dimension + 11/16 * dimension;
            }, cas);
            for (let y = 1; y <= 3; y += 1){
                setTimeout(function(){
                    let x = 1;
                    counter += 1;
                    if (counter == 1){
                        ctx.fillStyle = "#949437";
                        score1 += 1;
                        ctx.fillRect(x * dimension, y * dimension, dimension, dimension);
                        ctx.strokeStyle = "black";
                        stvorec(x * dimension, y * dimension, dimension, dimension);
                        ctx.fillStyle = "#BCA26F";
                        ctx.fillRect(x * dimension + 10, y * dimension + 10, dimension - 20, dimension - 20);
                        ctx.strokeStyle = "yellow";
                        ctx.beginPath();
                        ctx.moveTo(dimension + dimension / 2, dimension + dimension / 2);
                        ctx.lineTo(2 * dimension, dimension + dimension / 2);
                        ctx.stroke();
                        ctx.fillStyle = "white";
                        ctx.fillText("1", x1, y1);
                        y1 += dimension;
                    }
                    if (counter == 2) {
                        ctx.fillStyle = "#949437";
                        score1 += 1;
                        ctx.fillRect(x * dimension, y * dimension, dimension, dimension);
                        ctx.strokeStyle = "black";
                        stvorec(x * dimension, y * dimension, dimension, dimension);
                        ctx.fillStyle = "white";
                        ctx.fillText("1", x1, y1);
                    }
                    // priratanie sily hraca 1
                    ctx.fillStyle = "black";
                    ctx.fillRect(xw, yw -= 20, 20, 20);
                    yw += 20;
                    ctx.font = "20px Calibri";
                    ctx.fillStyle = "white";
                    ctx.fillText(score1, xw , yw);
                    ctx.font = "50px Calibri";   
                }, cas += 1000) 
            }

            // 5. tah hraca 1 - 1. akcia
            setTimeout(function() {
                ctx.fillText("1", x += dimension, y);
                ctx.fillStyle = "black";
                ctx.fillRect(xt, yt -= 20, 20, 20);
                ctx.fillStyle = "white";
                ctx.font = "18px Calibri";
                ctx.fillText("5", xt, yt += 20);
            }, cas += 1000);

            // odstranenie zvýraznených políčok
            setTimeout(function() {
                ctx.drawImage(obrazok2,0,0);
                ctx.font = "50px Calibri";
                ctx.fillText("1", x, y);
                ctx.fillText("1", x -= dimension, y);
                ctx.fillStyle = "black";
                ctx.fillRect(xt, yt -= 20, 20, 20);
                ctx.fillStyle = "white";
                ctx.font = "18px Calibri";
                ctx.fillText("5", xt, yt += 20);
            }, cas += 1000);


             // vytaženie lesa
             setTimeout(function() {
                ctx.strokeStyle = "white";
                ctx.lineWidth = "3";
                ctx.beginPath();
                ctx.moveTo(dimension, dimension);
                ctx.lineTo(2 * dimension, 2 * dimension);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(2 * dimension, dimension);
                ctx.lineTo(dimension, 2 * dimension);
                ctx.stroke();
                ctx.font = "50px Calibri";
                ctx.fillText("1", x, y);
                // uloženie dreva do warehouse
                xk = xw - 55
                yk = yw - 20
                drevo(xk, yk);
            }, cas += 1000);

            // vytaženie lesa
            setTimeout(function() {
                ctx.strokeStyle = "white";
                ctx.lineWidth = "3";
                ctx.beginPath();
                ctx.moveTo(2 * dimension, dimension);
                ctx.lineTo(3 * dimension, 2 * dimension);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(3 * dimension, dimension);
                ctx.lineTo(2 * dimension, 2 * dimension);
                ctx.stroke();
                ctx.font = "50px Calibri";
                ctx.fillStyle = "white";
                ctx.fillText("1", x, y);
                // uloženie dreva do warehouse
                drevo(xk += 40, yk);
            }, cas += 1000);


            // 5. tah hraca 1 - 2. akcia - postavenie chaty
                setTimeout(function() {
                    chata(2, 3);
                    ctx.font = "50px Calibri";
                    ctx.fillStyle = "white";
                    ctx.fillText("1", x, y += dimension);
                    for (let x = xk - 40; x <= xk + 40; x += 40){
                        b = 16;
                        ctx.fillStyle = "black";
                        let y = yk;
                        kruh(x, y, b);
                } 
            }, cas += 1000); 
           
            setTimeout(Elements2, cas += 3000);
        }
        Elements2();
        function Features1() {
            let c = document.getElementById("Features1"); // First of all, you must find the <canvas> element. This is done by using the HTML DOM method getElementById().
            let ctx = c.getContext("2d"); //Secondly, you need a drawing object for the canvas. The getContext() is a built-in HTML object, with properties and methods for drawing.
            c.height = 400;
            c.width = 620;
            c.style.height = "400px";
            c.style.width = "620px";
        
            obrazok3 = new Image();
            const dimension = 80;

            function kruznica(xArg = 0, yArg = 0, r = 0, farba = 0) {
            //Draw a circle
            ctx.strokeStyle = farba;
            ctx.lineWidth = "1";
            ctx.beginPath();
            ctx.arc(xArg, yArg, r, 0, 2 * Math.PI);
            ctx.stroke();
            }

            function kruh(xArg = 0, yArg = 0, r = 0, farba = 0) {
            //Draw a circle
            ctx.fillStyle = farba;
            ctx.beginPath();
            ctx.arc(xArg, yArg, r, 0, 2 * Math.PI);
            ctx.fill();
            }
            
            function stvorec(xArg = 0, yArg = 0, x = 0, y = 0) {
                //Draw a rectangle
                ctx.beginPath();
                ctx.strokeRect(xArg, yArg, x, y);
            }

            function material (xArg = 0, yArg = 0) {
                let m = 1/3 * dimension // sirka materialu
                ctx.fillStyle = "pink";
                ctx.fillRect(xArg * dimension - 11/16 * dimension, yArg * dimension - 11/16 * dimension,  m, m);
            }

            function mec (xArg = 0, yArg = 0) {
                ctx.fillStyle = "brown";
                ctx.beginPath();
                let x = xArg * dimension - 5/8 * dimension;
                let y = yArg * dimension - 5/8 * dimension;
                let r = 3;
                ctx.arc(x, y, r, 0, 1 * Math.PI);
                ctx.fill();
                ctx.fillRect(x -= r, y, 3/40 * dimension, - 4/40 * dimension);
                ctx.fillStyle = "grey";
                ctx.fillRect(x, y -= 4/40 * dimension, 3/40 * dimension, - 6/40 * dimension);
                ctx.beginPath();
                ctx.moveTo(x,y -= 6/40 * dimension);
                ctx.lineTo(x += 2 * r, y);
                ctx.lineTo(x -= r, y -= 3/40 * dimension);
                ctx.lineTo(x -= r, y += 3/40 * dimension);
                ctx.fill();
                ctx.fillStyle = "brown";
                ctx.fillRect(x -= r, y += 5/40 * dimension, 4 * r, 2/40 * dimension)
            }

            function MecADomcek (xArg = 0, yArg = 0) {
                ctx.fillStyle = "brown";
                ctx.beginPath();
                let x = xArg * dimension - 5/8 * dimension;
                let y = yArg * dimension - 5/8 * dimension;
                let r = 3;
                ctx.arc(x, y, r, 0, 1 * Math.PI);
                ctx.fill();
                ctx.fillRect(x -= r, y, 3/40 * dimension, - 4/40 * dimension);
                ctx.fillStyle = "grey";
                ctx.fillRect(x, y -= 4/40 * dimension, 3/40 * dimension, - 6/40 * dimension);
                ctx.beginPath();
                ctx.moveTo(x,y -= 6/40 * dimension);
                ctx.lineTo(x += 2 * r, y);
                ctx.lineTo(x -= r, y -= 3/40 * dimension);
                ctx.lineTo(x -= r, y += 3/40 * dimension);
                ctx.fill();
                ctx.fillStyle = "brown";
                ctx.fillRect(x -= r, y += 5/40 * dimension, 4 * r, 2/40 * dimension);

                ctx.lineWidth = "2";
                ctx.strokeStyle = "white";
                ctx.strokeRect(x += 4 * r + 4, y -= 2, b / 2, b / 2);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x += b / 4, y -= b / 4);
                ctx.lineTo(x += b / 4, y += b / 4);
                ctx.stroke();
            }

            function stit (xArg = 0, yArg = 0) {
                ctx.fillStyle = "blue";
                let x = xArg * dimension - 3/8 * dimension;
                let y = yArg * dimension - 3/8 * dimension;
                ctx.fillRect(x, y, 1/16 * dimension, 3/20 * dimension);
                ctx.fillStyle = "yellow";
                ctx.fillRect(x += 1/16 * dimension, y, 1/16 * dimension, 3/20 * dimension);
                ctx.fillStyle = "blue";
                ctx.beginPath();
                ctx.moveTo(x -= 1/16 * dimension, y += 3/20 * dimension);
                ctx.lineTo(x += 1/16 * dimension, y);
                ctx.lineTo(x, y += 1/16 * dimension);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = "yellow";
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y -= 1/16 * dimension);
                ctx.lineTo(x += 1/16 * dimension, y);
                ctx.closePath();
                ctx.fill();
            }

            function SilaVojakov (xArg = 0, yArg = 0, utok = 0, obrana = 0, katapult = 0) {
                if (katapult == 1) {
                    MecADomcek(xArg,yArg);
                }
                mec(xArg,yArg);
                stit(xArg,yArg);
                //lomené deliace mec a stit
                let x = xArg * dimension - 7/8 * dimension;
                let y = yArg * dimension - 1/8 * dimension;
                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.lineWidth = "3";
                ctx.moveTo(x,y);
                ctx.lineTo(x += 6/8 * dimension, y -= 6/8 * dimension);
                ctx.stroke();
                x = xArg * dimension - 7/8 * dimension - 2;
                y = yArg * dimension - 5/8 * dimension;
                ctx.font = "25px Calibri";
                ctx.fillStyle = "white";
                ctx.fillText(utok, x,y);
                ctx.fillText(obrana, x += 3/8 * dimension - 3, y += 4/8 * dimension - 3);
            }
            // Legenda
            let xl = 5 * dimension + 80; // xova suradnica pre legendu
            let yl = 20; //yova suradnica pre legendu
            let xt = xl + 70; // xova suradnica pre tahy
            let yt = yl + 360; // yova suradnica pre tahy
        
            ctx.fillRect(5 * dimension, 0, 220, 5 * dimension);
            ctx.font = " bold 18px Calibri";
            ctx.fillStyle = "white";
            ctx.fillText("Legend", xl,yl);
            ctx.font = "18px Calibri";
            ctx.fillText("Turn:", xt, yt);

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

            ctx.fillStyle = "white";
            ctx.fillText("1", xl -= 14, yl += 26);
            ctx.fillStyle = "white";
            ctx.fillText(" - conquered tiles", xl += 5, yl);

            ctx.fillStyle = "pink";
            ctx.fillRect(xl -= 5, yl += 17, b / 2, b / 2);
            ctx.fillStyle = "white";
            ctx.fillText(" - material", xl += 9, yl += 7);

            // defender v legende
            kruznica(xl -= 5, yl += 22, 9, "grey");
            ctx.fillStyle = "white";
            ctx.fillText("1", xl -= 3, yl += 4);
            ctx.fillText(" - defender", xl += 12, yl);
            
            // attacker v legende
            ctx.strokeStyle = "grey";
            ctx.beginPath();
            ctx.moveTo(xl -= 17, yl += 33);
            ctx.lineTo(xl += 20, yl);
            ctx.lineTo(xl -= 10, yl -= 20);
            ctx.lineTo(xl -= 10, yl += 20);
            ctx.stroke();
            ctx.fillStyle = "white";
            ctx.fillText("1", xl += 7, yl -= 4);
            ctx.fillText(" - attacker", xl += 12, yl);

            // bowman v legende
            ctx.lineWidth = "1";
            ctx.beginPath();
            ctx.moveTo(xl -= 13, yl += 15);
            ctx.lineTo(xl, yl += 24);
            ctx.quadraticCurveTo(xl += 24, yl -= 12, xl -= 24, yl -= 12); // krivá čiara - quadraticCurveTo(x-position of the control point, y-position of the control point, x-position of the ending point of the line, y-position of the ending point of the line)    
            ctx.stroke();
            ctx.fillText("1", xl += 2, yl += 15);
            ctx.fillText(" - bowman", xl += 12, yl);

            // katapult v legende
            ctx.strokeStyle = "white";
            ctx.lineWidth = "1";
            ctx.strokeRect(xl -= 16, yl += 20, b + 2, b + 2);
            ctx.fillText("1", xl += 5, yl += 12);
            ctx.fillText(" - catapult", xl += 13, yl);

            // mec v legende
            ctx.fillStyle = "brown";
            ctx.beginPath();
            let r = 3;
            ctx.arc(xl -= 9, yl += 40, r, 0, 1 * Math.PI);
            ctx.fill();
            ctx.fillRect(xl -= r, yl, 3/40 * dimension, - 4/40 * dimension);
            ctx.fillStyle = "grey";
            ctx.fillRect(xl, yl -= 4/40 * dimension, 3/40 * dimension, - 6/40 * dimension);
            ctx.beginPath();
            ctx.moveTo(xl,yl -= 6/40 * dimension);
            ctx.lineTo(xl += 2 * r, yl);
            ctx.lineTo(xl -= r, yl -= 3/40 * dimension);
            ctx.lineTo(xl -= r, yl += 3/40 * dimension);
            ctx.fill();
            ctx.fillStyle = "brown";
            ctx.fillRect(xl -= r, yl += 5/40 * dimension, 4 * r, 2/40 * dimension);
            ctx.fillStyle = "white";
            ctx.fillText(" - attack", xl += 4 * r + 2, yl);

            // mec a domcek v legende
            ctx.fillStyle = "brown";
            ctx.beginPath();
            ctx.arc(xl -= 8, yl += 45, r, 0, 1 * Math.PI);
            ctx.fill();
            ctx.fillRect(xl -= r, yl, 3/40 * dimension, - 4/40 * dimension);
            ctx.fillStyle = "grey";
            ctx.fillRect(xl, yl -= 4/40 * dimension, 3/40 * dimension, - 6/40 * dimension);
            ctx.beginPath();
            ctx.moveTo(xl,yl -= 6/40 * dimension);
            ctx.lineTo(xl += 2 * r, yl);
            ctx.lineTo(xl -= r, yl -= 3/40 * dimension);
            ctx.lineTo(xl -= r, yl += 3/40 * dimension);
            ctx.fill();
            ctx.fillStyle = "brown";
            ctx.fillRect(xl -= r, yl += 5/40 * dimension, 4 * r, 2/40 * dimension);

            ctx.lineWidth = "2";
            ctx.strokeStyle = "white";
            ctx.strokeRect(xl += 4 * r + 4, yl -= 2, b / 2, b / 2);
            ctx.beginPath();
            ctx.moveTo(xl, yl);
            ctx.lineTo(xl += b / 4, yl -= b / 4);
            ctx.lineTo(xl += b / 4, yl += b / 4);
            ctx.stroke();

            ctx.fillStyle = "white";
            ctx.fillText(" - attack on structures", xl += 2, yl += 2);

            // stit v legende
            ctx.fillStyle = "blue";
            ctx.fillRect(xl -= 24, yl += 20, 1/16 * dimension, 3/20 * dimension);
            ctx.fillStyle = "yellow";
            ctx.fillRect(xl += 1/16 * dimension, yl, 1/16 * dimension, 3/20 * dimension);
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.moveTo(xl -= 1/16 * dimension, yl += 3/20 * dimension);
            ctx.lineTo(xl += 1/16 * dimension, yl);
            ctx.lineTo(xl, yl += 1/16 * dimension);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.moveTo(xl, yl);
            ctx.lineTo(xl, yl -= 1/16 * dimension);
            ctx.lineTo(xl += 1/16 * dimension, yl);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.fillText(" - defense", xl += 4, yl -= 2);

            // Nakreslenie pozadia
            ctx.fillStyle = "#8BC766";
            ctx.strokeStyle = "black";
            ctx.lineWidth = "1";
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
            material(1,2);
            obrazok3.src = c.toDataURL("image/png");

            // 1. tah hraca 1 - 1. akcia
            setTimeout(function() {
                ctx.fillStyle = "white";
                ctx.font = "50px Calibri";
                ctx.fillText("1", x += 2 * dimension, y += 2 * dimension);
                ctx.font = "18px Calibri";
                ctx.fillText("1", xt += 45, yt);
            }, cas += 1000);

            // 1. tah hraca 1 - 2. akcia
            setTimeout(function() {
                ctx.font = "50px Calibri";
                ctx.fillStyle = "white";
                ctx.fillText("1", x -= 2 * dimension, y -= dimension);
            }, cas += 1000);

            // vyťaženie materiálu a upgrade na defendera
            setTimeout(function() {
                ctx.fillStyle = "#8BC766";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "1";
                ctx.fillRect(0, dimension, dimension, dimension);
                ctx.strokeRect(0,dimension,dimension,dimension);
                ctx.font = "50px Calibri";
                ctx.fillStyle = "white";
                kruznica(3 * dimension - dimension /2, 3 * dimension - dimension / 2, 30, "white");
                ctx.fillText("1", x, y);
            }, cas += 1000);

            // utok a obrana policok
            let CounterX = 0;
            let counterY = 0;
            
            for (let x = 2; x <= 4; x += 1) {
                CounterX += 1;
                for (let y = 2; y <= 4; y += 1) {
                    counterY += 1;
                    if ( CounterX && counterY === 5) { 
                        continue; 
                    }  
                    setTimeout(function() {
                        SilaVojakov(x,y,1,2);
                    }, cas += 1000);  
                }
            }
            
            //setup
            setTimeout(function(){
                ctx.drawImage(obrazok3,0,0);
            }, cas += 1000);

            // 1. tah hraca 1 - 1. akcia
            setTimeout(function() {
                ctx.fillStyle = "white";
                ctx.font = "50px Calibri";
                ctx.fillText("1", x += 2 * dimension, y += dimension);
                ctx.font = "18px Calibri";
                ctx.fillText("1", xt, yt);
            }, cas += 1000);

            // 1. tah hraca 1 - 2. akcia
            setTimeout(function() {
                ctx.font = "50px Calibri";
                ctx.fillStyle = "white";
                ctx.fillText("1", x -= 2 * dimension, y -= dimension);
            }, cas += 1000);

            // vyťaženie materiálu a upgrade na attackera
            setTimeout(function() {
                ctx.fillStyle = "#8BC766";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "1";
                ctx.fillRect(0, dimension, dimension, dimension);
                ctx.strokeRect(0,dimension,dimension,dimension);
                ctx.font = "50px Calibri";
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.moveTo(3 * dimension - 7/8 * dimension, 3 * dimension - 2/8 * dimension);
                ctx.lineTo(3 * dimension - 1/8 * dimension, 3 * dimension - 2/8 * dimension);
                ctx.lineTo(3 * dimension - 4/8 * dimension, 3 * dimension - 7/8 * dimension);
                ctx.closePath();
                ctx.stroke();
                ctx.fillText("1", x, y);
            }, cas += 1000);

            // utok a obrana policok
            let CounterX2 = 0;
            let CounterY2 = 0
            for (let x = 2; x <= 4; x += 1) {
                CounterX2 += 1;
                for (let y = 2; y <= 4; y += 1) {
                    CounterY2 += 1;
                    if ( CounterX2 && CounterY2 === 5) { 
                        continue; 
                    }  
                    setTimeout(function() {
                        SilaVojakov(x,y,2,1);
                    }, cas += 1000);  
                }
            }

            //setup
            setTimeout(function(){
                ctx.drawImage(obrazok3,0,0);
            }, cas += 1000);

            // 1. tah hraca 1 - 1. akcia
            setTimeout(function() {
                ctx.fillStyle = "white";
                ctx.font = "50px Calibri";
                ctx.fillText("1", x += 2 * dimension, y += dimension);
                ctx.font = "18px Calibri";
                ctx.fillText("1", xt, yt);
            }, cas += 1000);

            // 1. tah hraca 1 - 2. akcia
            setTimeout(function() {
                ctx.font = "50px Calibri";
                ctx.fillStyle = "white";
                ctx.fillText("1", x -= 2 * dimension, y -= dimension);
            }, cas += 1000);

            // vyťaženie materiálu a upgrade na bowmana
            setTimeout(function() {
                ctx.fillStyle = "#8BC766";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "1";
                ctx.fillRect(0, dimension, dimension, dimension);
                ctx.strokeRect(0,dimension,dimension,dimension);
                ctx.font = "50px Calibri";
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.moveTo(3 * dimension - 5/8 * dimension - 1/16 * dimension, 3 * dimension - 7/8 * dimension);
                ctx.lineTo(3 * dimension - 5/8 * dimension - 1/16 * dimension, 3 * dimension - 1/8 * dimension);
                ctx.quadraticCurveTo(3 * dimension + 2/8 * dimension, 3 * dimension - 4/8 * dimension, 3 * dimension - 5/8 * dimension - 1/16 * dimension, 3 * dimension - 7/8 * dimension);
                ctx.stroke();
                ctx.fillText("1", x, y);
            }, cas += 1000);

            // utok a obrana policok
            let CounterX3 = 0;
            let CounterY3 = 0
            for (let x = 2; x <= 4; x += 1) {
                CounterX3 += 1;
                for (let y = 2; y <= 4; y += 1) {
                    CounterY3 += 1;
                    if ( CounterX3 && CounterY3 === 5) { 
                        continue; 
                    }  
                    setTimeout(function() {
                        SilaVojakov(x,y,0,0);
                    }, cas += 1000);  
                }
            }

            // utok a obrana policok
            let CounterX4 = 0;
            for (let x = 1; x <= 5; x += 1) {
                CounterX4 += 1;
                let CounterY4 = 0;
                for (let y = 1; y <= 5; y += 1) {
                    CounterY4 += 1;
                    if (CounterX4 >= 2 && CounterX4 <= 4 && CounterY4 >= 2 && CounterY4 <= 4) { 
                        continue;
                    }
                    setTimeout(function() {
                        ctx.fillStyle = "#8BC766";
                        ctx.strokeStyle = "black";
                        ctx.lineWidth = "1";
                        ctx.fillRect(x * dimension - dimension, y * dimension - dimension, dimension, dimension);
                        ctx.strokeRect(x * dimension - dimension, y * dimension - dimension, dimension,dimension);
                        ctx.strokeStyle = "white";
                        SilaVojakov(x,y,1,1);
                    }, cas += 1000);
                }
            }

            //setup
            setTimeout(function(){
                ctx.drawImage(obrazok3,0,0);
            }, cas += 1000);

            // 1. tah hraca 1 - 1. akcia
            setTimeout(function() {
                ctx.fillStyle = "white";
                ctx.font = "50px Calibri";
                ctx.fillText("1", x += 2 * dimension, y += dimension);
                ctx.font = "18px Calibri";
                ctx.fillText("1", xt, yt);
            }, cas += 1000);

            // 1. tah hraca 1 - 2. akcia
            setTimeout(function() {
                ctx.font = "50px Calibri";
                ctx.fillStyle = "white";
                ctx.fillText("1", x -= 2 * dimension, y -= dimension);
            }, cas += 1000);

            // vyťaženie materiálu a upgrade na katapult
            setTimeout(function() {
                ctx.fillStyle = "#8BC766";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "1";
                ctx.fillRect(0, dimension, dimension, dimension);
                ctx.strokeRect(0,dimension,dimension,dimension);
                ctx.font = "50px Calibri";
                ctx.fillStyle = "white";
                ctx.strokeStyle = "white";
                ctx.strokeRect(3 * dimension - 7/8 * dimension, 3 * dimension - 7/ 8 * dimension, 6/8 * dimension, 6/8 * dimension)
                ctx.fillText("1", x, y);
            }, cas += 1000);


            // utok a obrana policok

            let CounterX5 = 0;
            let CounterY5 = 0
            for (let x = 2; x <= 4; x += 1) {
                CounterX5 += 1;
                for (let y = 2; y <= 4; y += 1) {
                    CounterY5 += 1;
                    if ( CounterX5 && CounterY5 === 5) { 
                        continue; 
                    }  
                    setTimeout(function() {
                        SilaVojakov(x,y,0,0,1);
                    }, cas += 1000);  
                }
            }
            let CounterX6 = 0;
            for (let x = 1; x <= 5; x += 1) {
                CounterX6 += 1;
                let CounterY6 = 0;
                for (let y = 1; y <= 5; y += 1) {
                    CounterY6 += 1;
                    if (CounterX6 >= 2 && CounterX6 <= 4 && CounterY6 >= 2 && CounterY6 <= 4) { 
                        continue;
                    }
                    setTimeout(function() {
                        ctx.fillStyle = "#8BC766";
                        ctx.strokeStyle = "black";
                        ctx.lineWidth = "1";
                        ctx.fillRect(x * dimension - dimension, y * dimension - dimension, dimension, dimension);
                        ctx.strokeRect(x * dimension - dimension, y * dimension - dimension, dimension,dimension);
                        ctx.strokeStyle = "white";
                        SilaVojakov(x,y,3,0,1);
                    }, cas += 1000);
                }
            }

            setTimeout(Features1, cas += 3000);
        }
        Features1();
 
