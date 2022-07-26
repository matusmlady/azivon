dimension = 40

/*function draw(columns, rows, dimension){
  function floorsFeatures(arg1){//change function name//arg1,arg2 useless
    for (r = 0; r < rows; r++){
      for (c = 0; c < columns; c++){
        if (data[tiles[r * columns + c][arg1].chosen].color != "none"){
          ctx.fillStyle = data[tiles[r*columns+c][arg1].chosen].color
          ctx.beginPath()
          ctx.moveTo(c * dimension + tiles[r*columns+c][arg1].right[0] * dimension, r * dimension + tiles[r*columns+c][arg1].right[1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg1]["right,down"][0] * dimension, r * dimension + tiles[r*columns+c][arg1]["right,down"][1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg1].down[0] * dimension, r * dimension + tiles[r*columns+c][arg1].down[1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg1]["left,down"][0] * dimension, r * dimension + tiles[r*columns+c][arg1]["left,down"][1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg1].left[0] * dimension, r * dimension + tiles[r*columns+c][arg1].left[1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg1]["left,up"][0] * dimension, r * dimension + tiles[r*columns+c][arg1]["left,up"][1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg1].up[0] * dimension, r * dimension + tiles[r*columns+c][arg1].up[1] * dimension)
          ctx.lineTo(c * dimension + tiles[r*columns+c][arg1]["right,up"][0] * dimension, r * dimension + tiles[r*columns+c][arg1]["right,up"][1] * dimension)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        }
      }
    }
  }
  function loot(){
    ctx.fillStyle = 'black';
    ctx.strokeStyle= 'black';
    for(let i = 0; i < data.loot.keys.length && data.loot[data.loot.keys[i]].length > 0; i++){
      ctx.font = "14px Arial"
      ctx.rotate(90 * Math.PI / 180);
      ctx.fillText(data.loot.keys[i],0,-columns*dimension-5-i*dimension);
      ctx.rotate(270 * Math.PI / 180);
      ctx.font = "14px Arial"
    
      for (let x = 0; x < data.loot[data.loot.keys[i]].length; x++){
        ctx.fillText(data.loot[data.loot.keys[i]][x],columns*dimension+i*dimension+5, Math.ceil(ctx.measureText(data.loot.keys[i]).width)+23+x*20);
      }
    }
  }
  function noLoot(){
    for(let i = 0; i < data.loot.keys.length && data.loot[data.loot.keys[i]].length>0; i++){
        return data.loot.keys.length*dimension + 10;
    }
      return Number(0);
  }
//  c = document.getElementById("map")
  //ctx = c.getContext("2d")

  if (rows*dimension > data.loot.maxLoot()){
    c.height = rows * dimension
    c.style.height = rows * dimension + 'px'
  } else {
    c.height =  data.loot.maxLoot()
    c.style.height = data.loot.maxLoot() + 'px'
  }

  //c.width = columns * dimension + noLoot()
  //c.style.width = columns * dimension + noLoot() + 'px'
  
  ctx.strokeStyle = "black"

  //floorsFeatures("flooring")
  //floorsFeatures("element")
  //floorsFeatures("feature")
  loot()

}*/
  
function loot(){//todo
  c = document.getElementById('map')
  ctx = c.getContext('2d')
  ctx.fillStyle = 'gray'
  ctx.strokeStyle= 'gray'
  ctx.font = 0.35 * dimension + 'px Arial'//aj do max lootu implemoentovat neskor podla potreby
  let i = 0
  for (const l in data.loot){
    if (!data.loot[l].length){//(data.loot[l].length == 0){
      continue
    }
    ctx.rotate(90 * Math.PI / 180)
    ctx.fillText(l, 0, - data.columns * dimension - i * dimension / 1.3 - dimension / 8)
    ctx.rotate(270 * Math.PI / 180)
    let x = 0
    for (const ll of data.loot[l]){
      ctx.fillText(ll, data.columns * dimension + i * dimension / 1.3 + dimension / 8, Math.ceil(ctx.measureText(l).width) + x * dimension / 2 +  dimension / 2)
      x++
    }
    x--
    ctx.beginPath()
    ctx.moveTo(data.columns * dimension + i * dimension / 1.3 + dimension / 8, Math.ceil(ctx.measureText(l).width) + x * dimension / 2 + dimension / 1.8)
    ctx.lineTo(data.columns * dimension + i * dimension / 1.3 + dimension / 8 + dimension / 2, Math.ceil(ctx.measureText(l).width) + x * dimension / 2 + dimension / 1.8)
    ctx.lineTo(data.columns * dimension + i * dimension / 1.3 + dimension / 8 + dimension / 2, Math.ceil(ctx.measureText(l).width) + x * dimension / 2 - dimension + dimension / 1.8)
    ctx.stroke()
    i++
  }
}

function noLoot(){
  let withLoot = 0
  for (const l in data.loot){
    if (data.loot[l].length > 0){
      withLoot++;
    }
  }
  if (withLoot > 0){
    return (withLoot * dimension)
  }
  return 0;
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
































