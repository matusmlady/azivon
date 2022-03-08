function draw(columns, rows, dimension){
  function floors(){
    for (r = 0; r < rows; r++){
      for (c = 0; c < columns; c++){
        ctx.fillStyle = data[tiles[r*columns+c].flooring.chosen].color
        ctx.beginPath()
        ctx.rect(c*dimension, r*dimension, dimension, dimension)
        ctx.fill()
        ctx.stroke()
      }
    }
  }
  //?pocitat pocty kolko mam zatial vygenerovanych jednotlivych typov colors
  function elements(){
    for (r = 0; r < rows; r++){
      for (c = 0; c < columns; c++){
        if (data[tiles[r*columns+c].element.chosen].color != "none"){
          ctx.fillStyle = data[tiles[r*columns+c].element.chosen].color
          ctx.beginPath()
          ctx.rect(c * dimension + dimension / 5, r * dimension + dimension / 5, dimension / 5 * 3, dimension / 5 * 3)
          ctx.fill()
          ctx.stroke()
          
          ctx.strokeStyle = "lime"
          ctx.beginPath();
          ctx.moveTo(tiles[tiles[r*columns+c].element.rozmery[0]].vlavo * dimension + dimension / 2, tiles[tiles[r*columns+c].element.rozmery[0]].hore * dimension + dimension / 2);
          let poslednyRozmer = tiles[r*columns+c].element.rozmery.length - 1
          ctx.lineTo(tiles[tiles[r*columns+c].element.rozmery[poslednyRozmer]].vlavo * dimension + dimension / 2, tiles[tiles[r*columns+c].element.rozmery[poslednyRozmer]].hore * dimension + dimension / 2);
          ctx.stroke();
          ctx.strokeStyle = "black"
        }

      }
    }
  }
  
  function features(){
    for (r = 0; r < rows; r++){
      for (c = 0; c < columns; c++){
        if (data[tiles[r*columns+c].feature.chosen].color != "none"){
          ctx.fillStyle = data[tiles[r*columns+c].feature.chosen].color
          ctx.beginPath()
          ctx.rect(c * dimension + dimension / 3, r * dimension + dimension / 3, dimension / 3, dimension / 3)
          ctx.fill()
          ctx.stroke()
        }
      }
    }
  }
  function loot(){
    ctx.font = "14px Arial"     
    ctx.fillStyle = 'white';
    for(var i = 0; i < data.loot.list.length && data.loot[data.loot["list"][i]].length>0; i++){
      ctx.rotate(90 * Math.PI / 180);
      ctx.fillText(data.loot.list[i],0,-columns*dimension-5-i*dimension);
      ctx.rotate(270 * Math.PI / 180);
      for (var x =0; x < data.loot[data.loot["list"][i]].length; x++){
        console.log(data.loot[data.loot["list"][i]][x]);
        ctx.fillText(data.loot[data.loot["list"][i]][x],columns*dimension+i*dimension+5,60+x*20);

      }         
    }
  }
  c = document.getElementById("map")//
  c.width = columns * dimension + data.loot.list.length*dimension + 10
  c.height = rows * dimension + 60*20
  
  c.style.width = columns * dimension + data.loot.list.length*dimension + 10 + 'px'
  c.style.height = rows * dimension + 60*20+ 'px'
  
  ctx = document.getElementById("map").getContext("2d")
  ctx.strokeStyle = "black"

  floors()
  elements()
  features()
  loot()
}
/////print
function printMap(){  
  var dataUrl = document.getElementById('map').toDataURL();  
  var windowContent = '<!DOCTYPE html>';
  windowContent += '<html>'
  windowContent += '<head><title>Azivon-THE MAP</title></head>';
  windowContent += '<body>'
  windowContent += '<img src="'+dataUrl+'">';
  windowContent += '</body>';
  windowContent += '</html>';
  var printWin = window.open('','','width=500,height=300');
  printWin.document.open();
  printWin.document.write(windowContent);
  printWin.document.close();
  printWin.focus();
  printWin.print();
  printWin.close();
}
