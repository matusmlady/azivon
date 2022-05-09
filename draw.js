dimension = 40

function draw(columns, rows, dimension){
  function floorsFeatures(arg1, arg2, arg3){
    for (r = 0; r < rows; r++){
      for (c = 0; c < columns; c++){
        if (data[tiles[r*columns+c][arg3].chosen].color != "none"){
          ctx.fillStyle = data[tiles[r*columns+c][arg3].chosen].color
          /*ctx.beginPath()
          ctx.rect(c*dimension + arg1, r*dimension + arg1 , dimension / arg2, dimension / arg2)
          ctx.fill()
          ctx.stroke()*/
  ctx.beginPath()
  ctx.moveTo(c * dimension + tiles[r*columns+c][arg3].vpravo[0] * dimension, r * dimension + tiles[r*columns+c].element.vpravo[1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c][arg3]["vpravo,dole"][0] * dimension, r * dimension + tiles[r*columns+c].element["vpravo,dole"][1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c][arg3].dole[0] * dimension, r * dimension + tiles[r*columns+c].element.dole[1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c][arg3]["vlavo,dole"][0] * dimension, r * dimension + tiles[r*columns+c].element["vlavo,dole"][1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c][arg3].vlavo[0] * dimension, r * dimension + tiles[r*columns+c].element.vlavo[1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c][arg3]["vlavo,hore"][0] * dimension, r * dimension + tiles[r*columns+c].element["vlavo,hore"][1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c][arg3].hore[0] * dimension, r * dimension + tiles[r*columns+c].element.hore[1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c][arg3]["vpravo,hore"][0] * dimension, r * dimension + tiles[r*columns+c].element["vpravo,hore"][1] * dimension)

  ctx.closePath()
  ctx.fill()
  ctx.stroke()/*
          ctx.strokeStyle = "lime"
          ctx.beginPath();
          ctx.moveTo(tiles[tiles[r*columns+c][arg3].dimensions[0]].vlavo * dimension + dimension / 2, tiles[tiles[r*columns+c][arg3].dimensions[0]].hore * dimension + dimension / 2);
          let poslednyRozmer = tiles[r*columns+c][arg3].dimensions.length - 1
          ctx.lineTo(tiles[tiles[r*columns+c][arg3].dimensions[poslednyRozmer]].vlavo * dimension + dimension / 2, tiles[tiles[r*columns+c][arg3].dimensions[poslednyRozmer]].hore * dimension + dimension / 2);
          ctx.stroke();
          ctx.strokeStyle = "black"*/


        }
      }
    }
  }

  //?pocitat pocty kolko mam zatial vygenerovanych jednotlivych typov colors
  
  function loot(){
    ctx.fillStyle = 'black';
    for(var i = 0; i < data.loot.list.length && data.loot[data.loot["list"][i]].length>0; i++){
      ctx.font = "14px Arial"
      ctx.rotate(90 * Math.PI / 180);
      ctx.fillText(data.loot.list[i],0,-columns*dimension-5-i*dimension);
      ctx.rotate(270 * Math.PI / 180);
      ctx.font = "14px Arial"
    
      for (var x =0; x < data.loot[data.loot["list"][i]].length; x++){
        ctx.fillText(data.loot[data.loot["list"][i]][x],columns*dimension+i*dimension+5, Math.ceil(ctx.measureText(data.loot["list"][i]).width)+23+x*20);
      }
    }
  }
  function noLoot(){
    for(var i = 0; i < data.loot.list.length && data.loot[data.loot["list"][i]].length>0; i++){
        return data.loot.list.length*dimension + 10;
    }
      return 0;
  }
  c = document.getElementById("map")
  ctx = c.getContext("2d")

  if(rows*dimension > data.loot.maxLoot()){
    c.height = rows * dimension
    c.style.height = rows * dimension + 'px'
  }else{
    c.height =  data.loot.maxLoot()
    c.style.height = data.loot.maxLoot() + 'px'
  }

  c.width = columns * dimension + noLoot()
  c.style.width = columns * dimension + noLoot() + 'px'
  
  ctx.strokeStyle = "black"

  floorsFeatures(0, 1, "flooring")
  floorsFeatures(dimension/5, 5/3, "element")
  floorsFeatures(dimension/3, 3, "feature")
  loot()
  console.log(data)
  /*
  ctx.beginPath()
  ctx.moveTo(c * dimension + tiles[r*columns+c].element.vpravo[0] * dimension, r * dimension + tiles[r*columns+c].element.vpravo[1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c].element["vpravo,dole"][0] * dimension, r * dimension + tiles[r*columns+c].element["vpravo,dole"][1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c].element.dole[0] * dimension, r * dimension + tiles[r*columns+c].element.dole[1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c].element["vlavo,dole"][0] * dimension, r * dimension + tiles[r*columns+c].element["vlavo,dole"][1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c].element.vlavo[0] * dimension, r * dimension + tiles[r*columns+c].element.vlavo[1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c].element["vlavo,hore"][0] * dimension, r * dimension + tiles[r*columns+c].element["vlavo,hore"][1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c].element.hore[0] * dimension, r * dimension + tiles[r*columns+c].element.hore[1] * dimension)
  ctx.lineTo(c * dimension + tiles[r*columns+c].element["vpravo,hore"][0] * dimension, r * dimension + tiles[r*columns+c].element["vpravo,hore"][1] * dimension)

  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  */
}
function printMap(){  
  let dataUrl = document.getElementById('map').toDataURL();  
  let windowContent = '<!DOCTYPE html>';
  windowContent += '<html>'
  windowContent += '<head><title>Azivon-THE MAP</title></head>';
  windowContent += '<body>'
  windowContent += '<img src="'+dataUrl+'">';
  windowContent += '</body>';
  windowContent += '</html>';
  let printWin = window.open('','','width=500,height=300');
  printWin.document.open();
  printWin.document.write(windowContent);
  printWin.document.close();
  printWin.focus();
  printWin.print();
  printWin.close();
}
