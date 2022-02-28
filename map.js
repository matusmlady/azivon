//?deastinne cisla v pomeroch
//grafika elementom + loot
//(spawn) cleaner
//?shhapes ako vlastnost elementu
//?hrady viac ako jedno policko; ?ne/vycnievanie z elementov na ktorych sa vygeneruju
//?zlato sa spawne obkolesene samymi elementami
//?spolocne vlastnosti (banovanie moze byt jednostranne ak nie je zadefinovane inak)
//seapre script per vykreslovanie mapy


dimension = 20

tiles = []

class farba {
  constructor(label, typ, color, pomer = 0, properties = [], sirka = 1, lootability = {loot: false}){
    this.label = label
    this.typ = typ
    this.color = color
    this.pomer = pomer
    this.properties = properties
    this.sirka = sirka
    data[typ].zoznam.push(this.label)
    data.zoznam.push(this.label)
    data.count[label] = 0
    this.lootability = lootability
    if (this.lootability.loot == true){
      data.loot.zoznam.push(this.label)
    }
        
  }

}

const data = new Object()

data.count = new Object()

data.instructions = new Object()
data.instructions["vlavo"] = - 1
data.instructions["vpravo"] = 1

data.loot = new Object()
data.loot.zoznam = []

//rare spawns work

data.zoznam = []
data.podlazie = new Object()
data.element = new Object()
data.feature = new Object()
data.podlazie.zoznam = []
data.element.zoznam = []
data.feature.zoznam = []
//use english everywhere in code

data.desert = new farba("desert", "podlazie", "yellow", 25, [{action: 0, colors: ["snow"], okruhy: [1, 2, 3]}, {action: 50, colors: ["desert"], okruhy: [1, 2, 3]}, {action: 0, colors: ["woods"], okruhy: [0]}], undefined, undefined)
data.snow = new farba("snow", "podlazie", "white", 50, [{action: 0, colors: ["desert", "sahara"], okruhy: [1, 2, 3]}, {action: 50, colors: ["snow"], okruhy: [1, 2, 3]}], undefined, undefined)
data.grass = new farba("grass", "podlazie", "green", 250, undefined, undefined)
data.water = new farba("water", "podlazie", "blue", 5, [{action: 80, colors: ["water"], okruhy: [1, 2, 3]}, {action: 0, colors: ["material", "mountains", "lake", "woods", "village", "silver", "gold", "castle"], okruhy: [0]}], undefined, undefined)
data.sahara = new farba("sahara", "podlazie", "gold", 25, [{action: 0, colors: ["snow"], okruhy: [1, 2, 3]}, {action: 40, colors: ["sahara"], okruhy: [1, 2, 3]}, {action: 10, colors: ["water"], okruhy: [1, 2, 3]}, {action: 0, colors: ["woods"], okruhy: [0]}], undefined, undefined)
//pridat podlazie nic = none
data.mountains = new farba("mountains", "element", "brown", 5, [{action: 0, colors: ["water"], okruhy: [0]}], 3, undefined)
data.woods = new farba("woods", "element", "burlywood", 5, [{action: 0, colors: ["water", "desert", "sahara", "village", "silver", "gold", "castle"], okruhy: [0]}], 2, undefined)
data.lake = new farba("lake", "element", "aqua", 5, [{action: 0, colors: ["water", "village", "silver", "gold", "castle", "material"], okruhy: [0]}], 2, undefined)
data.noElement = new farba("noElement", "element", "none", 100, undefined, undefined)

data.noFeature = new farba("noFeature", "feature", "none", 200, undefined, undefined)
data.village = new farba("village", "feature", "red", 1, [{action: 0, colors: ["water", "woods", "lake"], okruhy: [0]}], undefined, {loot: true})
data.metal = new farba("metal", "feature", "silver", 1, [{action: 0, colors: ["water", "woods", "lake"], okruhy: [0]}], undefined, undefined)
data.gold = new farba("gold", "feature", "goldenrod", 1, [{action: 0, colors: ["water", "woods", "lake"], okruhy: [0]}], undefined, undefined)
data.castle = new farba("castle", "feature", "#3B3131", 1, [{action: 0, colors: ["water", "woods", "lake"], okruhy: [0]}], undefined, undefined)
data.material = new farba("material", "feature", "pink", 5, [{action: 0, colors: ["water", "lake"], okruhy: [0]}], undefined, undefined)
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
      for (let x = 0; x < data.zoznam.length; x++){
        this.farby.positive[data.zoznam[x]] = data[data.zoznam[x]].pomer
      }
      this.farby.negative = new Object()
      for (let x = 0; x < data.zoznam.length; x++){
        this.farby.negative[data.zoznam[x]] = 0
      }
      this.farby.banned = new Object()
      for (let x = 0; x < data.zoznam.length; x++){
        this.farby.banned[data.zoznam[x]] = 0
      }
      
      this.vlavo = this.index % columns
      this.vpravo = columns - this.vlavo - 1
      this.hore = Math.floor(this.index / columns)
      this.dole = rows - this.hore - 1
      
      this.podlazie = new Object()
      this.podlazie.chosen = ""
      this.podlazie.rozmery = [this.index]
      
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

        for (let y = 0; y < data[this[arg].chosen].properties[x].okruhy.length; y++){
          let todoMinus = []
          let todoPlus = []
          for (let z = 0; z < this[arg].rozmery.length; z++){
            todoPlus = tiles[this[arg].rozmery[z]].stvorec(todoPlus, data[this[arg].chosen].properties[x].okruhy[y])
          }
          for (let z = 0; z < this[arg].rozmery.length; z++){
            todoMinus = tiles[this[arg].rozmery[z]].stvorec(todoMinus, data[this[arg].chosen].properties[x].okruhy[y] - 1)
          }

          todo = [...todo, ...todoPlus.filter(x => !todoMinus.includes(x))]
        }
        this.uprav(todo, data[this[arg].chosen].properties[x].action, data[this[arg].chosen].properties[x].colors)
        
      }
        
    }

    stvorec(todo, okruh){
      if (okruh == 0){
        return [...todo, this.index]
      }
      if (okruh == - 1){
        return todo
      }
      let todoOkolie = todo
      todoOkolie = this.hrana(todoOkolie, okruh, 1, this.hore, this.index - okruh * columns, "vlavo", okruh, this.vlavo, "vpravo", this.vpravo)
      todoOkolie = this.hrana(todoOkolie, okruh, 1, this.dole, this.index + okruh * columns, "vlavo", okruh, this.vlavo, "vpravo", this.vpravo)
      todoOkolie = this.hrana(todoOkolie, okruh, columns, this.vlavo, this.index - okruh, "hore", okruh * columns - columns, this.hore * columns, "dole", this.dole * columns)
      todoOkolie = this.hrana(todoOkolie, okruh, columns, this.vpravo, this.index + okruh, "hore", okruh * columns - columns, this.hore * columns, "dole", this.dole * columns)
      return todoOkolie

    }
    
    hrana(todoOkolie = [], okruh = 0, increase = 0, miesto = 0, bod = 0, smer1 = "", udaj0 = 0, udaj1 = 0, smer2 = "", udaj2 = 0){
      const todoSuradnice = todoOkolie
      if (miesto >= okruh){
        let x
        if (this[smer1] >= okruh){
          x = tiles[bod].index - udaj0
        } else {
          x = tiles[bod].index - udaj1
        }
        let y
        if (this[smer2] >= okruh){
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
      for (let x = 0; x < data[arg].zoznam.length; x++){
        pocitadlo += this.farby.positive[data[arg].zoznam[x]]
        if (random < pocitadlo){
          return data[data[arg].zoznam[x]].label
        }
      }
      //?poistka nejaka ak dlzka je 0; vpodstate uz mam poistku niekde v kode
    }
    
    dlzka(arg){
      let pocitadlo = 0
      for (let x = 0; x < data[arg].zoznam.length; x++){
        pocitadlo += this.farby.positive[data[arg].zoznam[x]]
      }
      return pocitadlo
    }
    
    ban(arg){
      for (let x = 0; x < data[arg].zoznam.length; x++){
        if (this.farby.banned[data[arg].zoznam[x]] == 1){
          this.farby.positive[data[arg].zoznam[x]] = 0
        }
      }
    }
    
    obmedz(arg){
      for (let x = 0; x < data[arg].zoznam.length; x++){
        if (this.farby.negative[data[arg].zoznam[x]] != 0){
          if (this.farby.positive[data[arg].zoznam[x]] > this.farby.negative[data[arg].zoznam[x]]){
            this.farby.positive[data[arg].zoznam[x]] -= this.farby.negative[data[arg].zoznam[x]]
          } else {
            this.farby.positive[data[arg].zoznam[x]] = 0
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
        //krizovanie rozlisnych typov layers? napr podlazie a element diagonalny; 
        //suvisi to stym z eby hrad bol siroky napr 2 a bol by aj na elemente aj mimo neho vycnieval by
        if (pokyn.length == 2){
          let prvePoleRozmery = tiles[pseudo + data.instructions[pokyn[0]]][data[element].typ].rozmery;
          let druhePoleRozmery = tiles[pseudo + data.instructions[pokyn[1]]][data[element].typ].rozmery;
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
        if (tiles[pseudo][data[element].typ].chosen != ""){
          return 0
        }
        if (tiles[pseudo].farby.banned[element] == 1){
          return 0
        }
        
      }
      
      for (let x = 0; x < suradnicky.length; x++){
        tiles[suradnicky[x]][data[element].typ].chosen = element
        tiles[suradnicky[x]][data[element].typ].rozmery = suradnicky

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
    tilesRaw.push([i, "podlazie", "element", "feature"])
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

  for (let x = 0; x < data.loot.zoznam.length; x++){
    data.loot[data.loot.zoznam[x]] = []
    for (let y = 0; y < data.count[data.loot.zoznam[x]]; y++){
      data.loot[data.loot.zoznam[x]].push(Math.floor(Math.random() * 3 + 1))
    }
  }

}

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
  
  c = document.getElementById("map")
  c.width = columns * dimension
  c.height = rows * dimension
  c.style.width = columns * dimension + 'px'
  c.style.height = rows * dimension + 'px'
  ctx = c.getContext("2d")
  ctx.strokeStyle = "black"

  floors()
  elements()
  features()
}

document.getElementById("columns").defaultValue = 15;
document.getElementById("rows").defaultValue = 15;

function unofficialMain(columnsArg = Number(document.getElementById("columns").value), rowsArg = Number(document.getElementById("rows").value)){
  main(columnsArg, rowsArg)
  draw(columnsArg, rowsArg, dimension)
}

unofficialMain(Number(document.getElementById("columns").value), Number(document.getElementById("rows").value))

console.log(tiles)

console.log(data)

console.log(data.count)

console.log(data.loot)

























































