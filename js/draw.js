dimension = 40

function draw(columns, rows, dimension){
  function floorsFeatures(arg1, arg2, arg3){
    for (r = 0; r < rows; r++){
      for (c = 0; c < columns; c++){
        if (data.colors[tiles[r * columns + c][arg3].chosen].color != "none"){
          ctx.fillStyle = data.colors[tiles[r*columns+c][arg3].chosen].color
          ctx.beginPath()
          ctx.moveTo(c * dimension + tiles[r*columns+c][arg3].right[0] * dimension, r * dimension + tiles[r*columns+c][arg3].right[1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg3]["right,down"][0] * dimension, r * dimension + tiles[r*columns+c][arg3]["right,down"][1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg3].down[0] * dimension, r * dimension + tiles[r*columns+c][arg3].down[1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg3]["left,down"][0] * dimension, r * dimension + tiles[r*columns+c][arg3]["left,down"][1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg3].left[0] * dimension, r * dimension + tiles[r*columns+c][arg3].left[1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg3]["left,up"][0] * dimension, r * dimension + tiles[r*columns+c][arg3]["left,up"][1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg3].up[0] * dimension, r * dimension + tiles[r*columns+c][arg3].up[1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg3]["right,up"][0] * dimension, r * dimension + tiles[r*columns+c][arg3]["right,up"][1] * dimension)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        }
      }
    }
  }

  //?pocitat pocty kolko mam zatial vygenerovanych jednotlivych typov colors
  
  function loot(){
    ctx.fillStyle = 'black';
    let i = 0;
    for (const l in data.loot) {
      const loot = data.loot[l]
      if (loot.length === 0) break;
      ctx.font = "14px Arial"
      ctx.rotate(90 * Math.PI / 180);
      ctx.fillText(l,0,-columns*dimension-5-i*dimension);
      ctx.rotate(270 * Math.PI / 180);
      ctx.font = "14px Arial"
    
      for (let x = 0; x < loot.length; x++){
        ctx.fillText(loot[x],columns*dimension+i*dimension+5, Math.ceil(ctx.measureText(l).width)+23+x*20);
      }
      
      i++
    }
  }
  function noLoot(){
    for(const l in data.loot) {
      if (data.loot[l].length === 0 ) break;
      return Object.getOwnPropertyNames(data.loot).length * dimension + 10;
    }
    return 0;
  }
  c = document.getElementById("map")
  ctx = c.getContext("2d")

  if (rows*dimension > data.maxLoot()){
    c.height = rows * dimension
    c.style.height = rows * dimension + 'px'
  } else {
    c.height =  data.maxLoot()
    c.style.height = data.maxLoot() + 'px'
  }

  c.width = columns * dimension + noLoot()
  c.style.width = columns * dimension + noLoot() + 'px'
  
  ctx.strokeStyle = "black"

  floorsFeatures(0, 1, "flooring")
  floorsFeatures(dimension/5, 5/3, "element")
  floorsFeatures(dimension/3, 3, "feature")
  loot()
  console.log(data)

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
