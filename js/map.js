function mapMain(columns, rows){
  tiles = []//?move to data
  data.instructions["up"] = - columns
  data.instructions["down"] = columns

  class tile {
    constructor(arg){
      this.index = arg

      this.farby = {
        positive: {},
        negative: {},
        banned: {}
      }
      for (const x in data.colors){
        this.farby.positive[x] = data.colors[x].ratio
      }
      for (const x in data.colors){
        this.farby.negative[x] = 0
      }
      for (const x in data.colors){
        this.farby.banned[x] = 0
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
    
    vybermapMain(arg){
      if (this[arg].chosen != ""){
        return
      }
      this.ban(arg)
      this.restrict(arg)
      
      do{
        this[arg].chosen = this.vyber(arg)
        if (this.dlzka(arg) == 0){
          this.chosen = 'none'///////////////
          console.log("error")
          break
        }
      }
      while (!this.smer(this[arg].chosen))
      data.count[this[arg].chosen] += 1
      
      for (const x of data.colors[this[arg].chosen].properties){
        let todo = []
        for (let y = 0; y <= x.radius; y++){//of x.radiuses.split(", ")){
          ////y = Number(y)
          //let todoMinus = []////////////////////////////////////////////////////////////////////
          ////let todoPlus = []
          for (const z of this[arg].dimensions){
            ////todoPlus = tiles[z].square(todoPlus, y)
            todo = [...todo, ...tiles[z].square(todo, y)]
          }
          //for (const z of this[arg].dimensions){
            //todoMinus = tiles[z].square(todoMinus, y - 1)
          //}

          ////todo = [...todo, ...todoPlus]//.filter(x => !todoMinus.includes(x))]
        }
        this.edit(todo, x.action, x.colors)
        
      }
        
    }

    square(todo, radiusArg){
      if (radiusArg == 0){
        return [...todo, this.index]
      }
      if (radiusArg == - 1){
        return todo
      }
      let todoOkolie = todo
      todoOkolie = this.hrana(todoOkolie, radiusArg, 1, this.up, this.index - radiusArg * columns, "left", radiusArg, this.left, "right", this.right)
      todoOkolie = this.hrana(todoOkolie, radiusArg, 1, this.down, this.index + radiusArg * columns, "left", radiusArg, this.left, "right", this.right)
      todoOkolie = this.hrana(todoOkolie, radiusArg, columns, this.left, this.index - radiusArg, "up", radiusArg * columns - columns, this.up * columns, "down", this.down * columns)
      todoOkolie = this.hrana(todoOkolie, radiusArg, columns, this.right, this.index + radiusArg, "up", radiusArg * columns - columns, this.up * columns, "down", this.down * columns)
      return todoOkolie

    }
    
    hrana(todoOkolie = [], radiusArg2 = 0, increase = 0, miesto = 0, bod = 0, smer1 = "", udaj0 = 0, udaj1 = 0, smer2 = "", udaj2 = 0){
      const todoSuradnice = todoOkolie
      if (miesto >= radiusArg2){
        let x
        this[smer1] >= radiusArg2 ? x = tiles[bod].index - udaj0 : x = tiles[bod].index - udaj1
        let y
        this[smer2] >= radiusArg2 ? y = tiles[bod].index + udaj0 : y = tiles[bod].index + udaj2
        for ( ; x <= y; x += increase){
          todoSuradnice.includes(x) ? undefined : todoSuradnice.push(x)
        }
      }
      return todoSuradnice
    }
    
    vyber(arg){
      let random = Math.floor(Math.random() * this.dlzka(arg))
      let counter = 0
      for (const x of data.layers[arg]){
        counter += this.farby.positive[x]
        if (random < counter){
          return data.colors[x].label
        }
      }
      //?poistka nejaka ak dlzka je 0; vpodstate uz mam poistku niekde v kode
    }
    
    dlzka(arg){
      let counter = 0
      for (const x of data.layers[arg]){
        counter += this.farby.positive[x]
      }
      return counter
    }
    
    ban(arg){
      for (const x of data.layers[arg]){
        if (this.farby.banned[x] == 1){
          this.farby.positive[x] = 0
        }
      }
    }
    
    restrict(arg){
      for (const x of data.layers[arg]){
        if (this.farby.negative[x] != 0){
          this.farby.positive[x] > this.farby.negative[x] ? this.farby.positive[x] -= this.farby.negative[x] : this.farby.positive[x] = 0
        }
      }
    }
    
    smer(element){
      let directions = [["left"], ["right"], ["up"], ["down"], ["left", "up"], ["left", "down"], ["right", "up"], ["right", "down"]]
      let which = ""
      for (let x = 0; x < 8; x++){
        which = directions[Math.floor(Math.random() * directions.length)]
        if (this.check(which, element)){
          for (let z = 0; z < this[data.colors[element].layer].dimensions.length - 1; z++){
            let tileLocal = tiles[this[data.colors[element].layer].dimensions[z]]
            for (let y = 0; y < this[data.colors[element].layer][which].length; y++){//pre kazdu suradnicu (x, y) vybraneho pomocneho bodu
              if (this[data.colors[element].layer][which][y] != 0.5){//ak nie je stredova ta konkretna suradnica (bud x alebo y)
                tileLocal[data.colors[element].layer][which][y] = Math.round(this[data.colors[element].layer][which][y])//tak ju zaokruhli == posun z vnutra na okraj
              }
            }
            
            if (which.length == 2){//ak riesim diagonalne smery
              for (let y = 0; y < 2; y++){//okrem rohoveho bodu posuniem aj stredove okolo rohoveho bodu
                tileLocal[data.colors[element].layer][which[y]] = this[data.colors[element].layer][which]//na suradnice rohoveho aby nerobili problem pri zobrazovani
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
          
          for (let z = 1; z < this[data.colors[element].layer].dimensions.length; z++){
            let tileLocal = tiles[this[data.colors[element].layer].dimensions[z]]
            for (let y = 0; y < this[data.colors[element].layer][which].length; y++){
              if (this[data.colors[element].layer][which][y] != 0.5){
                tileLocal[data.colors[element].layer][which][y] = Math.round(this[data.colors[element].layer][which][y])
              }
            }

            if (which.length == 2){
              for (let y = 0; y < 2; y++){
                tileLocal[data.colors[element].layer][which[y]] = tileLocal[data.colors[element].layer][which]
              }
            }
          }

          return 1
        } else {
          directions.splice(which, 1)
        }
        
      }
      this.farby.positive[element] = 0

      return 0
    }

    check(arg, element){
      let pokyn = arg
      for (const x of pokyn){
        if (this[x] < data.colors[element].colorWidth - 1){
          return 0
        }
      }
      let suradnicky = [this.index]
      let pseudo = this.index;
      for (let x = 0; x < data.colors[element].colorWidth - 1; x++){
        if (pokyn.length == 2){
          /*if (tiles[pseudo + data.instructions[pokyn[0]]][data[element].layer].dimensions.some(y => tiles[pseudo + data.instructions[pokyn[1]]][data[element].layer].dimensions.includes(y))){
            return 0
          }*/
          for (const y of tiles[pseudo + data.instructions[pokyn[0]]][data.colors[element].layer].dimensions){
            if (tiles[pseudo + data.instructions[pokyn[1]]][data.colors[element].layer].dimensions.includes(y)){
              return 0
            }
          }
        }
        for (const y of pokyn){
          pseudo += data.instructions[y]
        }
        if (tiles[pseudo][data.colors[element].layer].chosen != ""){
          return 0
        }
        if (tiles[pseudo].farby.banned[element] == 1){
          return 0
        }
        suradnicky.push(pseudo)
        
      }
      
      for (const x of suradnicky){
        tiles[x][data.colors[element].layer].chosen = element
        tiles[x][data.colors[element].layer].dimensions = suradnicky

      }
      return 1
    }
    
    edit(arg = [], action = 0, colors = ""){
      for (let x of arg){
        if (action == 0){
          for (const z of colors.split(", ")){
            tiles[x].farby.banned[z] = 1
          }
        } else if (action < 0) {
          for (const z of colors.split(", ")){
            tiles[x].farby.negative[z] += action
          }
        } else if (action > 0) {
          for (const z of colors.split(", ")){
            tiles[x].farby.positive[z] += action
          }
        }
      }
    }
    
  }

  let tilesRaw = []
  for (let i = 0; i < rows * columns; i++){
    tilesRaw.push([i, "flooring", "element", "feature"])
    tiles.push(new tile(i))
  }
  for (let m = 0; m < rows * columns * 3; m++){
    let number1 = Math.floor(Math.random() * tilesRaw.length)
    let number2 = Math.floor(Math.random() * (tilesRaw[number1].length - 1)) + 1
    tiles[tilesRaw[number1][0]].vybermapMain(tilesRaw[number1][number2])
    tilesRaw[number1].splice(number2, 1)
    tilesRaw[number1].length == 1 ? tilesRaw.splice(number1, 1) : undefined;
  }

  for (const x in data.loot){
    data.loot[x] = []
    for (let y = 0, z = data.count[x]; y < z; y++){
      data.loot[x].push(Math.floor(Math.random() * 2 + 1))
    }
  }

}
























































