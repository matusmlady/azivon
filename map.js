//single quotes
//english

//grafika elementom + loot
//(spawn) cleaner
//?hrady viac ako jedno policko; ?ne/vycnievanie z elementov na ktorych sa vygeneruju
//?zlato sa spawne obkolesene samymi elementami
//?spolocne vlastnosti (banovanie moze byt jednostranne ak nie je zadefinovane inak)


dimension = 20/////////////////////////////////
tiles = []/////////mvoe to data?

class farba {
  constructor(label, type, color, ratio = 0, properties = [], sirka = 1, lootability = {loot: false}){
    this.label = label
    this.type = type
    this.color = color
    this.ratio = ratio
    this.properties = properties
    this.sirka = sirka
    data[type].list.push(this.label)
    //?poriesit reset data objektu napriec generaciami mapy
    data.list.push(this.label)
    data.count[label] = 0
    this.lootability = lootability
    if (this.lootability.loot == true){
      data.loot.list.push(this.label)
    }
        
  }

}

const data = new Object()

data.count = new Object()

data.instructions = new Object()
data.instructions["vlavo"] = - 1
data.instructions["vpravo"] = 1

data.loot = new Object()
data.loot.list = []
data.loot.maxLoot = function(){
  let tempMax = 0;
  for(let x = 0; x < data.loot.list.length; x++){

    if(tempMax<data.loot[data.loot.list[x]].length * dimension + Math.ceil(ctx.measureText(data.loot["list"][x]).width)){
      tempMax = data.loot[data.loot.list[x]].length * dimension + Math.ceil(ctx.measureText(data.loot["list"][x]).width)
    }
  }
  return tempMax + 23;
}

//rare spawns work
/////////////////////////////loot sa neresetuje; hory ako by generovali loot?
data.list = []////////////////////////////////////////////////////////
data.flooring = new Object()
data.element = new Object()
data.feature = new Object()
data.flooring.list = []
data.element.list = []
data.feature.list = []
//use english everywhere in code



data.desert = new farba("desert", "flooring", "yellow", 25, [{action: 0, colors: ["snow"], radiuses: [1, 2, 3]}, {action: 50, colors: ["desert"], radiuses: [1, 2, 3]}, {action: 0, colors: ["woods"], radiuses: [0]}], undefined, undefined)
data.snow = new farba("snow", "flooring", "white", 50, [{action: 0, colors: ["desert", "sahara"], radiuses: [1, 2, 3]}, {action: 50, colors: ["snow"], radiuses: [1, 2, 3]}], undefined, undefined)
data.grass = new farba("grass", "flooring", "green", 250, undefined, undefined, undefined)
data.water = new farba("water", "flooring", "blue", 5, [{action: 80, colors: ["water"], radiuses: [1, 2, 3]}, {action: 0, colors: ["material", "mountains", "lake", "woods", "village", "metal", "gold", "castle"], radiuses: [0]}], undefined, undefined)
data.sahara = new farba("sahara", "flooring", "gold", 25, [{action: 0, colors: ["snow"], radiuses: [1, 2, 3]}, {action: 40, colors: ["sahara"], radiuses: [1, 2, 3]}, {action: 10, colors: ["water"], radiuses: [1, 2, 3]}, {action: 0, colors: ["woods"], radiuses: [0]}], undefined, undefined)
//pridat flooring nic = none
data.mountains = new farba("mountains", "element", "brown", 5, [{action: 0, colors: ["water"], radiuses: [0]}], 3, undefined)
data.woods = new farba("woods", "element", "burlywood", 5, [{action: 0, colors: ["water", "desert", "sahara", "village", "metal", "gold", "castle"], radiuses: [0]}], 2, undefined)
data.lake = new farba("lake", "element", "aqua", 5, [{action: 0, colors: ["water", "village", "metal", "gold", "castle", "material"], radiuses: [0]}], 2, undefined)
data.noElement = new farba("noElement", "element", "none", 100, undefined, 0, undefined)

data.noFeature = new farba("noFeature", "feature", "none", 200, undefined, 0, undefined)
data.village = new farba("village", "feature", "red", 1, [{action: 0, colors: ["water", "woods", "lake"], radiuses: [0]}], undefined, {loot: true})
data.metal = new farba("metal", "feature", "silver", 1, [{action: 0, colors: ["water", "woods", "lake"], radiuses: [0]}], undefined, undefined)
data.gold = new farba("gold", "feature", "goldenrod", 1, [{action: 0, colors: ["water", "woods", "lake"], radiuses: [0]}], undefined, undefined)
data.castle = new farba("castle", "feature", "#3B3131", 1, [{action: 0, colors: ["water", "woods", "lake"], radiuses: [0]}], undefined, undefined)
data.material = new farba("material", "feature", "pink", 5, [{action: 0, colors: ["water", "lake"], radiuses: [0]}], undefined, undefined)
//ways of color representation understand and ability to use them hexa, text
   
function main(columns, rows){
  tiles = []
  data.instructions["hore"] = - columns
  data.instructions["dole"] = columns

  class tile {
    constructor(arg){
      this.index = arg

      this.farby = new Object()
      this.farby.positive = new Object()
      for (let x = 0; x < data.list.length; x++){
        this.farby.positive[data.list[x]] = data[data.list[x]].ratio
      }
      this.farby.negative = new Object()
      for (let x = 0; x < data.list.length; x++){
        this.farby.negative[data.list[x]] = 0
      }
      this.farby.banned = new Object()
      for (let x = 0; x < data.list.length; x++){
        this.farby.banned[data.list[x]] = 0
      }
      
      this.vlavo = this.index % columns
      this.vpravo = columns - this.vlavo - 1
      this.hore = Math.floor(this.index / columns)
      this.dole = rows - this.hore - 1
      
      this.flooring = new Object()
      this.flooring.chosen = ""
      this.flooring.rozmery = [this.index]
      
      this.element = new Object()
      this.element.chosen = ""
      this.element.rozmery = [this.index]
      
      this.feature = new Object()
      this.feature.chosen = ""
      this.feature.rozmery = [this.index]
      
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
      
      for (let x = 0; x < data[this[arg].chosen].properties.length; x++){
        let todo = []

        for (let y = 0; y < data[this[arg].chosen].properties[x].radiuses.length; y++){
          let todoMinus = []
          let todoPlus = []
          for (let z = 0; z < this[arg].rozmery.length; z++){
            todoPlus = tiles[this[arg].rozmery[z]].stvorec(todoPlus, data[this[arg].chosen].properties[x].radiuses[y])
          }
          for (let z = 0; z < this[arg].rozmery.length; z++){
            todoMinus = tiles[this[arg].rozmery[z]].stvorec(todoMinus, data[this[arg].chosen].properties[x].radiuses[y] - 1)
          }

          todo = [...todo, ...todoPlus.filter(x => !todoMinus.includes(x))]
        }
        this.uprav(todo, data[this[arg].chosen].properties[x].action, data[this[arg].chosen].properties[x].colors)
        
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
        if (this[smer1] >= radius){
          x = tiles[bod].index - udaj0
        } else {
          x = tiles[bod].index - udaj1
        }
        let y
        if (this[smer2] >= radius){
          y = tiles[bod].index + udaj0
        } else {
          y = tiles[bod].index + udaj2
        }
        for ( ; x <= y; x += increase){
          if (!todoSuradnice.includes(x)){
            todoSuradnice.push(x)
          }
        }
      }
      return todoSuradnice
    }
    
    vyber(arg){
      let random = Math.floor(Math.random() * this.dlzka(arg))
      let pocitadlo = 0
      for (let x = 0; x < data[arg].list.length; x++){
        pocitadlo += this.farby.positive[data[arg].list[x]]
        if (random < pocitadlo){
          return data[data[arg].list[x]].label
        }
      }
      //?poistka nejaka ak dlzka je 0; vpodstate uz mam poistku niekde v kode
    }
    
    dlzka(arg){
      let pocitadlo = 0
      for (let x = 0; x < data[arg].list.length; x++){
        pocitadlo += this.farby.positive[data[arg].list[x]]
      }
      return pocitadlo
    }
    
    ban(arg){
      for (let x = 0; x < data[arg].list.length; x++){
        if (this.farby.banned[data[arg].list[x]] == 1){
          this.farby.positive[data[arg].list[x]] = 0
        }
      }
    }
    
    obmedz(arg){
      for (let x = 0; x < data[arg].list.length; x++){
        if (this.farby.negative[data[arg].list[x]] != 0){
          if (this.farby.positive[data[arg].list[x]] > this.farby.negative[data[arg].list[x]]){
            this.farby.positive[data[arg].list[x]] -= this.farby.negative[data[arg].list[x]]
          } else {
            this.farby.positive[data[arg].list[x]] = 0
          }
        }
      }
    }
    
    smer(element){
      let directions = [["vlavo"], ["vpravo"], ["hore"], ["dole"], ["vlavo", "hore"], ["vlavo", "dole"], ["vpravo", "hore"], ["vpravo", "dole"]]
      let ktory = 0
      for (let x = 0; x < 8; x++){
        ktory = Math.floor(Math.random() * directions.length)
        if (this.check(directions[ktory], element)){
          return 1
        } else {
          directions.splice(ktory, 1)
        }
        
      }
      this.farby.positive[element] = 0
      return 0
    }

    check(arg, element){
      let pokyn = arg
      for (let x = 0; x < pokyn.length; x++){
        if (this[pokyn[x]] < data[element].sirka - 1){
          return 0
        }
      }
      let suradnicky = [this.index]
      let pseudo = this.index;
      for (let x = 0; x < data[element].sirka - 1; x++){
        //krizovanie rozlisnych typeov layers? napr flooring a element diagonalny; 
        //suvisi to stym z eby hrad bol siroky napr 2 a bol by aj na elemente aj mimo neho vycnieval by
        if (pokyn.length == 2){
          let prvePoleRozmery = tiles[pseudo + data.instructions[pokyn[0]]][data[element].type].rozmery;
          let druhePoleRozmery = tiles[pseudo + data.instructions[pokyn[1]]][data[element].type].rozmery;
          for (let y = 0; y < prvePoleRozmery.length; y++){
            if (druhePoleRozmery.includes(prvePoleRozmery[y])){
              return 0
            }
          }
        }
        for (let y = 0; y < pokyn.length; y++){
          pseudo += data.instructions[pokyn[y]]
        }
        suradnicky.push(pseudo)
        if (tiles[pseudo][data[element].type].chosen != ""){
          return 0
        }
        if (tiles[pseudo].farby.banned[element] == 1){
          return 0
        }
        
      }
      
      for (let x = 0; x < suradnicky.length; x++){
        tiles[suradnicky[x]][data[element].type].chosen = element
        tiles[suradnicky[x]][data[element].type].rozmery = suradnicky

      }
      return 1
    }
    
    uprav(arg = [], action = 0, colors = []){
      for (let x in arg){
        if (action == 0){
          for (let z = 0; z < colors.length; z++){
            tiles[arg[x]].farby.banned[colors[z]] = 1
          }
        } else if (action < 0) {
          for (let z = 0; z < colors.length; z++){
            tiles[arg[x]].farby.negative[colors[z]] += action
          }
        } else if (action > 0) {
          for (let z = 0; z < colors.length; z++){
            tiles[arg[x]].farby.positive[colors[z]] += action
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
    if (tilesRaw[number1].length == 1){
      tilesRaw.splice(number1, 1)
    }
  }

  for (let x = 0; x < data.loot.list.length; x++){
    data.loot[data.loot.list[x]] = []
    for (let y = 0; y < data.count[data.loot.list[x]]; y++){
      data.loot[data.loot.list[x]].push(Math.floor(Math.random() * 3 + 1))
    }
  }

}


function unofficialMain(columnsArg = Number(document.getElementById("columns").value), rowsArg = Number(document.getElementById("rows").value)){
  main(columnsArg, rowsArg)
  draw(columnsArg, rowsArg, dimension)
  
  console.log(tiles)
  console.log(data)
  console.log(data.count)
  console.log(data.loot)
}






























































