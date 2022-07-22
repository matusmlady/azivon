class Color {
  //?shouldn't colorWidth = 0 mean display color = none
  //?different size of loot, probabilities, even return strings etc
  constructor(label, layer, color, ratio = 0, properties = [], colorWidth = 1, loot = false){
    this.label = label
    this.layer = layer
    data.layers[layer].push(label)
    this.color = color
    this.ratio = ratio
    this.properties = properties
    this.colorWidth = colorWidth
    data.count[label] = 0
    this.loot = loot
    if (loot){
      data.loot[label] = []
    }

  }

}

function makeColor(...rest) {
  data.colors[rest[0]] = new Color(...rest)
}

function mapMain(columns, rows){
  tiles = []//?move to data
  data.instructions["up"] = - columns
  data.instructions["down"] = columns

  class tile {
    constructor(arg){
      this.index = arg
      this.colors = {//////
        positive: {},
        negative: {},
        banned: {}
      }
      for (const x in data.colors){
        this.colors.positive[x] = data.colors[x].ratio
      }
      for (const x in data.colors){
        this.colors.negative[x] = 0
      }
      for (const x in data.colors){
        this.colors.banned[x] = 0
      }
      
      this.left = this.index % columns
      this.right = columns - this.left - 1
      this.up = Math.floor(this.index / columns)
      this.down = rows - this.up - 1
      
      this.flooring = {
        chosen: "",
        dimensions: [this.index],
        "left,up": [0, 0],
        "left": [0, 0.5],
        "left,down": [0, 1],
        "down": [0.5, 1],
        "right,down": [1, 1],
        "right": [1, 0.5],
        "right,up": [1, 0],
        "up": [0.5, 0]
      }
      this.element = {
        chosen: "",
        dimensions: [this.index],
        "left,up": [33/100/2, 33/100/2],
        "left": [33/100/2, 0.5],
        "left,down": [33/100/2, 1-33/100/2],
        "down": [0.5, 1-33/100/2],
        "right,down": [1-33/100/2, 1-33/100/2],
        "right": [1-33/100/2, 0.5],
        "right,up": [1-33/100/2, 33/100/2],
        "up": [0.5, 33/100/2]
      }
      this.feature = {
        chosen: "",
        dimensions: [this.index],
        "left,up": [66/100/2, 66/100/2],
        "left": [66/100/2, 0.5],
        "left,down": [66/100/2, 1-66/100/2],
        "down": [0.5, 1-66/100/2],
        "right,down": [1-66/100/2, 1-66/100/2],
        "right": [1-66/100/2, 0.5],
        "right,up": [1-66/100/2, 66/100/2],
        "up": [0.5, 66/100/2]
      }
      
    }
    
    tileMain(arg){
      if (this[arg].chosen != ""){
        return
      }
      this.ban(arg)
      this.restrict(arg)
      
      do {
        this[arg].chosen = this.choose(arg)
        /*if (this.ratioSum(arg) == 0){
          this.chosen = 'none'
          console.log("Error: nothing to choose from")
          break
        }*/
      }
      while (this.direction(this[arg].chosen))
      data.count[this[arg].chosen] += 1
      
      for (const p of data.colors[this[arg].chosen].properties){////
        let todo = []
        for (let y = 0; y <= p.radius; y++){
          for (const z of this[arg].dimensions){
            todo = [...todo, ...tiles[z].square(todo, y)]
          }
        }
        this.edit(todo, p.action, p.colors)
      }
    }

    //adds to given array of tiles with tiles of given radius from current tile if not already included
    square(todoArg, radiusArg){
      if (radiusArg == 0){
        return [...todoArg, this.index]
      }
      if (radiusArg == - 1){
        return todoArg
      }
      let todo = todoArg
      todo = this.edge(todo, radiusArg, 1, this.up, this.index - radiusArg * columns, "left", radiusArg, this.left, "right", this.right)
      todo = this.edge(todo, radiusArg, 1, this.down, this.index + radiusArg * columns, "left", radiusArg, this.left, "right", this.right)
      todo = this.edge(todo, radiusArg, columns, this.left, this.index - radiusArg, "up", radiusArg * columns - columns, this.up * columns, "down", this.down * columns)
      todo = this.edge(todo, radiusArg, columns, this.right, this.index + radiusArg, "up", radiusArg * columns - columns, this.up * columns, "down", this.down * columns)
      return todo
    }
    
    //adds one edge of the square in the required radius depending on the arg
    edge(todoArg = [], radiusArg = 0, increase = 0, miesto = 0, bod = 0, direction1 = "", udaj0 = 0, udaj1 = 0, direction2 = "", udaj2 = 0){
      const todo = todoArg
      if (miesto >= radiusArg){
        let x
        this[direction1] >= radiusArg ? x = tiles[bod].index - udaj0 : x = tiles[bod].index - udaj1
        let y
        this[direction2] >= radiusArg ? y = tiles[bod].index + udaj0 : y = tiles[bod].index + udaj2
        for ( ; x <= y; x += increase){
          todo.includes(x) ? undefined : todo.push(x)//////
        }
      }
      return todo
    }
    
    choose(arg){
      let random = Math.floor(Math.random() * this.ratioSum(arg))
      let counter = 0
      for (const x of data.layers[arg]){
        counter += this.colors.positive[x]
        if (random < counter){
          return data.colors[x].label
        }
      }
      //?poistka nejaka ak dlzka je 0; vpodstate uz mam poistku niekde v kode
      //?dlzka 0 nepovolit
    }
    
    ratioSum(arg){
      let counter = 0
      for (const x of data.layers[arg]){
        counter += this.colors.positive[x]
      }
      return counter
    }
    
    ban(arg){
      for (const x of data.layers[arg]){
        if (this.colors.banned[x] == 1){
          this.colors.positive[x] = 0
        }
      }
    }
    
    restrict(arg){
      for (const x of data.layers[arg]){
        if (this.colors.negative[x] != 0){
          this.colors.positive[x] > this.colors.negative[x] ? this.colors.positive[x] -= this.colors.negative[x] : this.colors.positive[x] = 0
        }
      }
    }
    
    direction(color){
      let directions = [["left"], ["right"], ["up"], ["down"], ["left", "up"], ["left", "down"], ["right", "up"], ["right", "down"]]
      let which = ""
      for (let x = 0; x < 8; x++){
        which = directions[Math.floor(Math.random() * directions.length)]
        if (this.check(which, color)){
          for (let z = 0; z < this[data.colors[color].layer].dimensions.length - 1; z++){
            let tileLocal = tiles[this[data.colors[color].layer].dimensions[z]]
            for (let y = 0; y < this[data.colors[color].layer][which].length; y++){//pre kazdu suradnicu (x, y) vybraneho pomocneho bodu
              if (this[data.colors[color].layer][which][y] != 0.5){//ak nie je stredova ta konkretna suradnica (bud x alebo y)
                tileLocal[data.colors[color].layer][which][y] = Math.round(this[data.colors[color].layer][which][y])//tak ju zaokruhli == posun z vnutra na okraj
              }
            }
            
            if (which.length == 2){//ak riesim diagonalne smery
              for (let y = 0; y < 2; y++){//okrem rohoveho bodu posuniem aj stredove okolo rohoveho bodu
                tileLocal[data.colors[color].layer][which[y]] = this[data.colors[color].layer][which]//na suradnice rohoveho aby nerobili problem pri zobrazovani
              }
            }
          }
          
          if (which == "right"){
            which = ["left"]
          } else if (which == "left"){
            which = ["right"]
          } else if (which == "up"){
            which = ["down"]
          } else if (which == "down"){
            which = ["up"]
          } else if (which.toString() == "left,up"){
            which = ["right", "down"]
          } else if (which.toString() == "left,down"){
            which = ["right", "up"]
          } else if (which.toString() == "right,up"){
            which = ["left", "down"]
          } else if (which.toString() == "right,down"){
            which = ["left", "up"]
          }
          
          for (let z = 1; z < this[data.colors[color].layer].dimensions.length; z++){
            let tileLocal = tiles[this[data.colors[color].layer].dimensions[z]]
            for (let y = 0; y < this[data.colors[color].layer][which].length; y++){
              if (this[data.colors[color].layer][which][y] != 0.5){
                tileLocal[data.colors[color].layer][which][y] = Math.round(this[data.colors[color].layer][which][y])
              }
            }
            if (which.length == 2){
              for (let y = 0; y < 2; y++){
                tileLocal[data.colors[color].layer][which[y]] = tileLocal[data.colors[color].layer][which]
              }
            }
          }
          //nakresli priebezne celu danu farbu na tom (prip viacerych) polickach po definitivnom vygenerovani       
          for (const x of this[data.colors[color].layer].dimensions){
            tiles[x].drawYourself()
          }
          if (data.loot[color]){
            data.loot[color].push(Math.floor(Math.random() * 2 + 1))
          }
          return 0
        } else {
          directions.splice(which, 1)
        }
      }
      this.colors.positive[color] = 0
      return 1
    }

    check(which, color){
      for (const x of which){
        if (this[x] < data.colors[color].colorWidth - 1){
          return 0
        }
      }
      let coordinates = [this.index]
      let pseudo = this.index;
      for (let x = 0; x < data.colors[color].colorWidth - 1; x++){
        if (which.length == 2){
          /*if (tiles[pseudo + data.instructions[which[0]]][data.colors[color].layer].dimensions.some(y => tiles[pseudo + data.instructions[which[1]]][data.colors[color].layer].dimensions.includes(y))){
            return 0
          }*///////////////////////////////////////
          for (const y of tiles[pseudo + data.instructions[which[0]]][data.colors[color].layer].dimensions){
            if (tiles[pseudo + data.instructions[which[1]]][data.colors[color].layer].dimensions.includes(y)){
              return 0
            }
          }
        }
        for (const y of which){
          pseudo += data.instructions[y]
        }
        if (tiles[pseudo][data.colors[color].layer].chosen != ""){
          return 0
        }
        if (tiles[pseudo].colors.banned[color] == 1){
          return 0
        }
        coordinates.push(pseudo)
        
      }

      for (const x of coordinates){
        tiles[x][data.colors[color].layer].chosen = color
        tiles[x][data.colors[color].layer].dimensions = coordinates
      }
      
      return 1
    }
    
    edit(arg = [], action = 0, colors = ""){
      for (let x of arg){
        if (action == 0){
          for (const z of colors.split(", ")){
            tiles[x].colors.banned[z] = 1
          }
        } else if (action < 0) {
          for (const z of colors.split(", ")){
            tiles[x].colors.negative[z] += action
          }
        } else {// if (action > 0) {
          for (const z of colors.split(", ")){
            tiles[x].colors.positive[z] += action
          }
        }
      }
    }
    
    drawYourself(){
      if (this.flooring.chosen){
        this.drawUniversal("flooring")
        for (const x of this.flooring.dimensions){
          tiles[x].redrawYourself()
        }
      }
      if (this.element.chosen){
        this.drawUniversal("element")
        for (const x of this.element.dimensions){
          tiles[x].redrawYourself()
        }
      }
      if (this.feature.chosen){
        this.drawUniversal("feature")
        for (const x of this.feature.dimensions){
          tiles[x].redrawYourself()
        }
      }
    }
    
    redrawYourself(){
      if (this.flooring.chosen){
        this.drawUniversal("flooring")
      }
      if (this.element.chosen){
        this.drawUniversal("element")
      }
      if (this.feature.chosen){
        this.drawUniversal("feature")
      }
    }
    
    drawUniversal(arg1){
      if (data.colors[this[arg1].chosen].color != "none"){
        ctx.fillStyle = data.colors[this[arg1].chosen].color
        ctx.beginPath()
        ctx.moveTo(this.left * dimension + tiles[this.up*columns+this.left][arg1].right[0] * dimension, this.up * dimension + tiles[this.up*columns+this.left][arg1].right[1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up*columns+this.left][arg1]["right,down"][0] * dimension, this.up * dimension + tiles[this.up*columns+this.left][arg1]["right,down"][1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up*columns+this.left][arg1].down[0] * dimension, this.up * dimension + tiles[this.up*columns+this.left][arg1].down[1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up*columns+this.left][arg1]["left,down"][0] * dimension, this.up * dimension + tiles[this.up*columns+this.left][arg1]["left,down"][1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up*columns+this.left][arg1].left[0] * dimension, this.up * dimension + tiles[this.up*columns+this.left][arg1].left[1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up*columns+this.left][arg1]["left,up"][0] * dimension, this.up * dimension + tiles[this.up*columns+this.left][arg1]["left,up"][1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up*columns+this.left][arg1].up[0] * dimension, this.up * dimension + tiles[this.up*columns+this.left][arg1].up[1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up*columns+this.left][arg1]["right,up"][0] * dimension, this.up * dimension + tiles[this.up*columns+this.left][arg1]["right,up"][1] * dimension)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    }
  }

  let tilesRaw = []
  c = document.getElementById("map");
  ctx = c.getContext("2d");
  
  c.width = columns * dimension + noLoot()
  c.style.width = columns * dimension + noLoot() + 'px'
  
  ctx.strokeStyle = "black"
  
  if (rows * dimension >= data.maxLoot()){
    c.height = rows * dimension
    c.style.height = rows * dimension + 'px'
  } else {
    c.height =  data.maxLoot()
    c.style.height = data.maxLoot() + 'px'
  }
  
  for (let i = 0; i < rows * columns; i++){
    tilesRaw.push([i, "flooring", "element", "feature"])
    tiles.push(new tile(i))
  }
  
  for (let m = 0; m < rows * columns * 3; m++){
    setTimeout(function(){
      let number1 = Math.floor(Math.random() * tilesRaw.length);
      let number2 = Math.floor(Math.random() * (tilesRaw[number1].length - 1)) + 1;
      tiles[tilesRaw[number1][0]].tileMain(tilesRaw[number1][number2]);
  //////////    if (data.loot.list.includes(tiles[tilesRaw[number1][0]][tilesRaw[number1][number2]].chosen)){
  //        data.loot[tiles[tilesRaw[number1][0]][tilesRaw[number1][number2]].chosen].push(Math.floor(Math.random() * 2 + 1))
    //  }
      tilesRaw[number1].splice(number2, 1);
      tilesRaw[number1].length == 1 ? tilesRaw.splice(number1, 1) : undefined
    }, m * 10)
    /*let number1 = Math.floor(Math.random() * tilesRaw.length);
    let number2 = Math.floor(Math.random() * (tilesRaw[number1].length - 1)) + 1;
    tiles[tilesRaw[number1][0]].tileMain(tilesRaw[number1][number2]);
//////////    if (data.loot.list.includes(tiles[tilesRaw[number1][0]][tilesRaw[number1][number2]].chosen)){
//        data.loot[tiles[tilesRaw[number1][0]][tilesRaw[number1][number2]].chosen].push(Math.floor(Math.random() * 2 + 1))
  //  }
    tilesRaw[number1].splice(number2, 1);
    tilesRaw[number1].length == 1 ? tilesRaw.splice(number1, 1) : undefined*/

  }

  setTimeout(
    function(){
///              c = document.getElementById("map");
 // ctx = c.getContext("2d");
      saved = new Image();//let
      saved = ctx.getImageData(0, 0, c.width, c.height)//c.toDataURL("image/png");//.src
      c.width += noLoot()
      c.style.width = c.width + 'px';
      if (c.height < data.maxLoot()){
        c.height =  data.maxLoot()
        c.style.height = data.maxLoot() + 'px'
      }
 //     c2 = document.getElementById("map");
  //    ctx = c2.getContext("2d");
//      setTimeout(
 //     function(){
      //ctx.drawImage(saved, 0, 0);
      ctx.putImageData(saved, 0, 0)
//      }, 0
//      )
      loot(columns)
    }, (rows * columns * 3 * 10) + 50
  )
  
}
















































