function main(columns, rows){
  tiles = []//?move to data
  data.instructions["hore"] = - columns
  data.instructions["dole"] = columns

  class tile {
    constructor(arg){
      this.index = arg

      this.farby = {
        positive: {},
        negative: {},
        banned: {}
      }
      for (const x of data.list){
        this.farby.positive[x] = data[x].ratio
      }
      for (const x of data.list){
        this.farby.negative[x] = 0
      }
      for (const x of data.list){
        this.farby.banned[x] = 0
      }
      
      this.vlavo = this.index % columns
      this.vpravo = columns - this.vlavo - 1
      this.hore = Math.floor(this.index / columns)
      this.dole = rows - this.hore - 1
      
      this.flooring = {
        chosen: "",
        dimensions: [this.index],
        "vlavo,hore": [0, 0],
        "vlavo": [0, 0.5],
        "vlavo,dole": [0, 1],
        "dole": [0.5, 1],
        "vpravo,dole": [1, 1],
        "vpravo": [1, 0.5],
        "vpravo,hore": [1, 0],
        "hore": [0.5, 0]
      }
      this.element = {
        chosen: "",
        dimensions: [this.index],
        "vlavo,hore": [33/100/2, 33/100/2],/////////prepocitat na 66%
        "vlavo": [33/100/2, 0.5],
        "vlavo,dole": [33/100/2, 1-33/100/2],
        "dole": [0.5, 1-33/100/2],
        "vpravo,dole": [1-33/100/2, 1-33/100/2],
        "vpravo": [1-33/100/2, 0.5],
        "vpravo,hore": [1-33/100/2, 33/100/2],
        "hore": [0.5, 33/100/2]
        /*"vlavo,hore": [6/30, 6/30],/////////prepocitat na 66%
        "vlavo": [6/30, 15/30],
        "vlavo,dole": [6/30, 24/30],
        "dole": [15/30, 24/30],
        "vpravo,dole": [24/30, 24/30],
        "vpravo": [24/30, 15/30],
        "vpravo,hore": [24/30, 6/30],
        "hore": [15/30, 6/30]*/
      }
      this.feature = {
        chosen: "",
        dimensions: [this.index],
        "vlavo,hore": [66/100/2, 66/100/2],/////////prepocitat na 33%
        "vlavo": [66/100/2, 0.5],
        "vlavo,dole": [66/100/2, 1-66/100/2],
        "dole": [0.5, 1-66/100/2],
        "vpravo,dole": [1-66/100/2, 1-66/100/2],
        "vpravo": [1-66/100/2, 0.5],
        "vpravo,hore": [1-66/100/2, 66/100/2],
        "hore": [0.5, 66/100/2]
      }
      
    }
    
    vyberMain(arg){
      if (this[arg].chosen != ""){
        return
      }
      this.ban(arg)
      this.obmedz(arg)
      
      do{
        this[arg].chosen = this.vyber(arg)
        if (this.dlzka(arg) == 0){
          console.log("error")
          break
        }
      }
      while (!this.smer(this[arg].chosen))
      data.count[this[arg].chosen] += 1
      
      for (const x of data[this[arg].chosen].properties){
        let todo = []
        for (let y = 0; y <= x.radius; y++){//of x.radiuses.split(", ")){
          ////y = Number(y)
          //let todoMinus = []////////////////////////////////////////////////////////////////////
          ////let todoPlus = []
          for (const z of this[arg].dimensions){
            ////todoPlus = tiles[z].stvorec(todoPlus, y)
            todo = [...todo, ...tiles[z].stvorec(todo, y)]
          }
          //for (const z of this[arg].dimensions){
            //todoMinus = tiles[z].stvorec(todoMinus, y - 1)
          //}

          ////todo = [...todo, ...todoPlus]//.filter(x => !todoMinus.includes(x))]
        }
        this.uprav(todo, x.action, x.colors)
        
      }
        
    }

    stvorec(todo, radiusArg){
      if (radiusArg == 0){
        return [...todo, this.index]
      }
      if (radiusArg == - 1){
        return todo
      }
      let todoOkolie = todo
      todoOkolie = this.hrana(todoOkolie, radiusArg, 1, this.hore, this.index - radiusArg * columns, "vlavo", radiusArg, this.vlavo, "vpravo", this.vpravo)
      todoOkolie = this.hrana(todoOkolie, radiusArg, 1, this.dole, this.index + radiusArg * columns, "vlavo", radiusArg, this.vlavo, "vpravo", this.vpravo)
      todoOkolie = this.hrana(todoOkolie, radiusArg, columns, this.vlavo, this.index - radiusArg, "hore", radiusArg * columns - columns, this.hore * columns, "dole", this.dole * columns)
      todoOkolie = this.hrana(todoOkolie, radiusArg, columns, this.vpravo, this.index + radiusArg, "hore", radiusArg * columns - columns, this.hore * columns, "dole", this.dole * columns)
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
      for (const x of data[arg].list){
        counter += this.farby.positive[x]
        if (random < counter){
          return data[x].label
        }
      }
      //?poistka nejaka ak dlzka je 0; vpodstate uz mam poistku niekde v kode
    }
    
    dlzka(arg){
      let counter = 0
      for (const x of data[arg].list){
        counter += this.farby.positive[x]
      }
      return counter
    }
    
    ban(arg){
      for (const x of data[arg].list){
        if (this.farby.banned[x] == 1){
          this.farby.positive[x] = 0
        }
      }
    }
    
    obmedz(arg){
      for (const x of data[arg].list){
        if (this.farby.negative[x] != 0){
          this.farby.positive[x] > this.farby.negative[x] ? this.farby.positive[x] -= this.farby.negative[x] : this.farby.positive[x] = 0
        }
      }
    }
    
    smer(element){
      let directions = [["vlavo"], ["vpravo"], ["hore"], ["dole"], ["vlavo", "hore"], ["vlavo", "dole"], ["vpravo", "hore"], ["vpravo", "dole"]]
      let which = ""
      for (let x = 0; x < 8; x++){
        which = directions[Math.floor(Math.random() * directions.length)]
        if (this.check(which, element)){
          for (let z = 0; z < this[data[element].layer].dimensions.length - 1; z++){
            let tileLocal = tiles[this[data[element].layer].dimensions[z]]
            for (let y = 0; y < this[data[element].layer][which].length; y++){//pre kazdu suradnicu (x, y) vybraneho pomocneho bodu
              if (this[data[element].layer][which][y] != 0.5){//ak nie je stredova ta konkretna suradnica (bud x alebo y)
                tileLocal[data[element].layer][which][y] = Math.round(this[data[element].layer][which][y])//tak ju zaokruhli == posun z vnutra na okraj
              }
            }
            
            if (which.length == 2){//ak riesim diagonalne smery
              for (let y = 0; y < 2; y++){//okrem rohoveho bodu posuniem aj stredove okolo rohoveho bodu
                tileLocal[data[element].layer][which[y]] = this[data[element].layer][which]//na suradnice rohoveho aby nerobili problem pri zobrazovani
              }
            }
          }
          
          if (which == "vpravo"){
            which = ["vlavo"]
          } else if (which == "vlavo"){
            which = ["vpravo"]
          } else if (which == "hore"){
            which = ["dole"]
          } else if (which == "dole"){
            which = ["hore"]
          } else if (which.toString() == "vlavo,hore"){
            which = ["vpravo", "dole"]
          } else if (which.toString() == "vlavo,dole"){
            which = ["vpravo", "hore"]
          } else if (which.toString() == "vpravo,hore"){
            which = ["vlavo", "dole"]
          } else if (which.toString() == "vpravo,dole"){
            which = ["vlavo", "hore"]
          }
          
          for (let z = 1; z < this[data[element].layer].dimensions.length; z++){
            let tileLocal = tiles[this[data[element].layer].dimensions[z]]
            for (let y = 0; y < this[data[element].layer][which].length; y++){
              if (this[data[element].layer][which][y] != 0.5){
                tileLocal[data[element].layer][which][y] = Math.round(this[data[element].layer][which][y])
              }
            }

            if (which.length == 2){
              for (let y = 0; y < 2; y++){
                tileLocal[data[element].layer][which[y]] = tileLocal[data[element].layer][which]
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
        if (this[x] < data[element].colorWidth - 1){
          return 0
        }
      }
      let suradnicky = [this.index]
      let pseudo = this.index;
      for (let x = 0; x < data[element].colorWidth - 1; x++){
        if (pokyn.length == 2){
          /*if (tiles[pseudo + data.instructions[pokyn[0]]][data[element].layer].dimensions.some(y => tiles[pseudo + data.instructions[pokyn[1]]][data[element].layer].dimensions.includes(y))){
            return 0
          }*/
          for (const y of tiles[pseudo + data.instructions[pokyn[0]]][data[element].layer].dimensions){
            if (tiles[pseudo + data.instructions[pokyn[1]]][data[element].layer].dimensions.includes(y)){
              return 0
            }
          }
        }
        for (const y of pokyn){
          pseudo += data.instructions[y]
        }
        if (tiles[pseudo][data[element].layer].chosen != ""){
          return 0
        }
        if (tiles[pseudo].farby.banned[element] == 1){
          return 0
        }
        suradnicky.push(pseudo)
        
      }
      
      for (const x of suradnicky){
        tiles[x][data[element].layer].chosen = element
        tiles[x][data[element].layer].dimensions = suradnicky

      }
      return 1
    }
    
    uprav(arg = [], action = 0, colors = ""){
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
    tiles[tilesRaw[number1][0]].vyberMain(tilesRaw[number1][number2])
    tilesRaw[number1].splice(number2, 1)
    tilesRaw[number1].length == 1 ? tilesRaw.splice(number1, 1) : undefined;
  }

  for (const x of data.loot.list){
    data.loot[x] = []
    for (let y = 0, z = data.count[x]; y < z; y++){
      data.loot[x].push(Math.floor(Math.random() * 3 + 1))
    }
  }

}
