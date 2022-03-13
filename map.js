const dimension = 20

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
        dimensions: [this.index]
      }
      this.element = {
        chosen: "",
        dimensions: [this.index]
      }
      this.feature = {
        chosen: "",
        dimensions: [this.index]
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

        for (let y of x.radiuses.split(", ")){
          y = Number(y)
          let todoMinus = []
          let todoPlus = []
          for (const z of this[arg].dimensions){
            todoPlus = tiles[z].stvorec(todoPlus, y)
          }
          for (const z of this[arg].dimensions){
            todoMinus = tiles[z].stvorec(todoMinus, y - 1)
          }

          todo = [...todo, ...todoPlus.filter(x => !todoMinus.includes(x))]
        }
        this.uprav(todo, x.action, x.colors)
        
      }
        
    }

    stvorec(todo, radius){
      if (radius == 0){
        return [...todo, this.index]
      }
      if (radius == - 1){
        return todo
      }
      let todoOkolie = todo
      todoOkolie = this.hrana(todoOkolie, radius, 1, this.hore, this.index - radius * columns, "vlavo", radius, this.vlavo, "vpravo", this.vpravo)
      todoOkolie = this.hrana(todoOkolie, radius, 1, this.dole, this.index + radius * columns, "vlavo", radius, this.vlavo, "vpravo", this.vpravo)
      todoOkolie = this.hrana(todoOkolie, radius, columns, this.vlavo, this.index - radius, "hore", radius * columns - columns, this.hore * columns, "dole", this.dole * columns)
      todoOkolie = this.hrana(todoOkolie, radius, columns, this.vpravo, this.index + radius, "hore", radius * columns - columns, this.hore * columns, "dole", this.dole * columns)
      return todoOkolie

    }
    
    hrana(todoOkolie = [], radius = 0, increase = 0, miesto = 0, bod = 0, smer1 = "", udaj0 = 0, udaj1 = 0, smer2 = "", udaj2 = 0){
      const todoSuradnice = todoOkolie
      if (miesto >= radius){
        let x
        this[smer1] >= radius ? x = tiles[bod].index - udaj0 : x = tiles[bod].index - udaj1
        let y
        this[smer2] >= radius ? y = tiles[bod].index + udaj0 : y = tiles[bod].index + udaj2
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
      let which = 0
      for (let x = 0; x < 8; x++){
        which = Math.floor(Math.random() * directions.length)
        if (this.check(directions[which], element)){
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
        if (this[x] < data[element].sirka - 1){
          return 0
        }
      }
      let suradnicky = [this.index]
      let pseudo = this.index;
      for (let x = 0; x < data[element].sirka - 1; x++){
        if (pokyn.length == 2){
          /*if (tiles[pseudo + data.instructions[pokyn[0]]][data[element].type].dimensions.some(y => tiles[pseudo + data.instructions[pokyn[1]]][data[element].type].dimensions.includes(y))){
            return 0
          }*/
          for (const y of tiles[pseudo + data.instructions[pokyn[0]]][data[element].type].dimensions){
            if (tiles[pseudo + data.instructions[pokyn[1]]][data[element].type].dimensions.includes(y)){
              return 0
            }
          }
        }
        for (const y of pokyn){
          pseudo += data.instructions[y]
        }
        suradnicky.push(pseudo)
        if (tiles[pseudo][data[element].type].chosen != ""){
          return 0
        }
        if (tiles[pseudo].farby.banned[element] == 1){
          return 0
        }
        
      }
      
      for (const x of suradnicky){
        tiles[x][data[element].type].chosen = element
        tiles[x][data[element].type].dimensions = suradnicky

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
























































