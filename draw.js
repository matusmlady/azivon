//new js na kreslenie veci
function draw(columns, rows, dimension){
  function floors(){
    for (r = 0; r < rows; r++){
      for (c = 0; c < columns; c++){
        ctx.fillStyle = data[tiles[r*columns+c].podlazie.chosen].color
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
  
  c = document.getElementById("map")//
  c.width = columns * dimension 
  c.height = rows * dimension 
  
  c.style.width = columns * dimension + 'px'
  c.style.height = rows * dimension + 'px'
  
  ctx = document.getElementById("map").getContext("2d")////////////////
  ctx.strokeStyle = "black"

  floors()
  elements()
  features()
}





