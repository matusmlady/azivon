//deastinne cisla v pomeroch nefunguju

//podmienka aby sa diagonalne veci nekrizovali
//okolie pre elementy horizontalne vertikalne a diagonalne
//grafika elementom
//features

columns = 50
rows = 50
dimension = 20

polia = []

class farba {
  constructor(typ, color, pomer = 0, sirka = 1, properties = []){
    this.typ = typ
    this.color = color
    this.pomer = pomer
    this.properties = properties
    this.sirka = sirka
    data[typ].zoznam.push(this.color)
    data.zoznam.push(this.color)
        
  }

}

const data = new Object()
data.podlazie = new Object()
data.element = new Object()
data.feature = new Object()

//rare spawns work

data.zoznam = []
data.podlazie.zoznam = []
data.element.zoznam = []
data.feature.zoznam = []

data.instructions = new Object()
//data.instructions.zoznam = [["vlavo"], ["vpravo"], ["hore"], ["dole"], ["vlavo", "hore"], ["vlavo", "dole"], ["vpravo", "hore"], ["vpravo", "dole"]]
data.instructions["vlavo"] = - 1
data.instructions["vpravo"] = 1
data.instructions["hore"] = - columns
data.instructions["dole"] = columns



data.yellow = new farba("podlazie", "yellow", 25, 1, [{action: 0, colors: ["white"], okruhy: [1, 2, 3]}, {action: 50, colors: ["yellow"], okruhy: [1, 2, 3]}])
data.white = new farba("podlazie", "white", 50, 1, [{action: 0, colors: ["yellow", "gold"], okruhy: [1, 2, 3]}, {action: 50, colors: ["white"], okruhy: [1, 2, 3]}])
data.green = new farba("podlazie", "green", 250)
data.blue = new farba("podlazie", "blue", 5, 1, [{action: 80, colors: ["blue"], okruhy: [1, 2, 3]}])
data.gold = new farba("podlazie", "gold", 25, 1, [{action: 0, colors: ["white"], okruhy: [1, 2, 3]}, {action: 40, colors: ["gold"], okruhy: [1, 2, 3]}, {action: 10, colors: ["blue"], okruhy: [1, 2, 3]}])

data.brown = new farba("element", "brown", 1, 3)
data.none = new farba("element", "none", 10, 1)

data.ziadne = new farba("feature", "ziadne", 1, 1)



class pole {
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
    this.zabanuj(arg)
    this.obmedz(arg)
    
    do{
      this[arg].chosen = this.vyber(arg)
      if (this.dlzka(arg) == 0){
              console.log("error")
              break
      }
    }
    while (this.smer(data.instructions.zoznam, this[arg].chosen) != 1)
     
    for (let x = 0; x < data[this[arg].chosen].properties.length; x++){
      let todo = []
      for (let y = 0; y < data[this[arg].chosen].properties[x].okruhy.length; y++){
        todo = this.stvorec(todo, data[this[arg].chosen].properties[x].okruhy[y])
      }
      this.uprav(todo, data[this[arg].chosen].properties[x].action, data[this[arg].chosen].properties[x].colors)
      
    }
      
  }

  smer(arg, element){
    let smery = [["vlavo"], ["vpravo"], ["hore"], ["dole"], ["vlavo", "hore"], ["vlavo", "dole"], ["vpravo", "hore"], ["vpravo", "dole"]]
    let ktory = 0
    for (let x = 0; x < 8; x++){
      ktory = Math.floor(Math.random() * smery.length)
      if (this.check(smery[ktory], element)){
        return 1
      } else {
        smery.splice(ktory, 1)
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
      for (let x = 0; x < pokyn.length; x++){
        pseudo += data.instructions[pokyn[x]]
      }
      suradnicky.push(pseudo)
      if (polia[pseudo][data[element].typ].chosen != ""){
        return 0
      }
      if (polia[pseudo].farby.banned[element] == 1){
        return 0
      }
      
    }
    for (let x = 0; x < suradnicky.length; x++){
      polia[suradnicky[x]][data[element].typ].chosen = element
      polia[suradnicky[x]][data[element].typ].rozmery = []
      for (let y = 0; y < suradnicky.length; y++){
        polia[suradnicky[x]][data[element].typ].rozmery.push(suradnicky.length)
      }

    }
    return 1
  }
  
  
  
  
  
  
  
  vyber(arg){
    let random = Math.floor(Math.random() * this.dlzka(arg))
    let pocitadlo = 0
    for (let x = 0; x < data[arg].zoznam.length; x++){
      pocitadlo += this.farby.positive[data[arg].zoznam[x]]
      if (random < pocitadlo){
        return data[arg].zoznam[x]
      }
    }
  }
  
  dlzka(arg){
    let pocitadlo = 0
    for (let x = 0; x < data[arg].zoznam.length; x++){
      pocitadlo += this.farby.positive[data[arg].zoznam[x]]
    }
    return pocitadlo
  }
  
  zabanuj(arg){
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

  stvorec(todo, okruh){
    if (okruh == 0){
      return this.index
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
        x = polia[bod].index - udaj0
      } else {
        x = polia[bod].index - udaj1
      }
      let y
      if (this[smer2] >= okruh){
        y = polia[bod].index + udaj0
      } else {
        y = polia[bod].index + udaj2
      }
      for ( ; x <= y; x += increase){
        if (todoSuradnice.indexOf(x) == - 1){
          todoSuradnice.push(x)
        }
      }
    }
    return todoSuradnice
  }
  
  uprav(arg = [], action = 0, colors = []){
    for (let x in arg){
      if (action == 0){
        for (let z = 0; z < colors.length; z++){
          polia[arg[x]].farby.banned[colors[z]] = 1
        }
      } else if (action < 0) {
        for (let z = 0; z < colors.length; z++){
          polia[arg[x]].farby.negative[colors[z]] += action
        }
      } else if (action > 0) {
        for (let z = 0; z < colors.length; z++){
          polia[arg[x]].farby.positive[colors[z]] += action
        }
      }
    }
  }
  
  
}
   
function main(){
  let poliaRaw = []
  for (let i = 0; i < rows * columns; i++){
    poliaRaw.push([i, "podlazie", "element", "feature"])
    polia.push(new pole(i))
  }
  for (let m = 0; m < rows * columns * 3; m++){
    let cislo = Math.floor(Math.random() * poliaRaw.length)
    let cislo2 = Math.floor(Math.random() * (poliaRaw[cislo].length - 1)) + 1
    polia[poliaRaw[cislo][0]].vyberMain(poliaRaw[cislo][cislo2])
    poliaRaw[cislo].splice(cislo2, 1)
    if (poliaRaw[cislo].length == 1){
      poliaRaw.splice(cislo, 1)
    }
  }

}

main()

c = document.getElementById("myCanvas")
c.width = columns * dimension
c.height = rows * dimension
c.style.width = columns * dimension + 'px'
c.style.height = rows * dimension + 'px'
ctx = c.getContext("2d")

pozadia()

function pozadia(){
  ctx.strokeStyle = "black"
  for (r = 0; r < rows; r++){
    for (c = 0; c < columns; c++){
      ctx.fillStyle = polia[r*columns+c].podlazie.chosen
      ctx.beginPath()
      ctx.rect(c*dimension, r*dimension, dimension, dimension)
      ctx.fill()
      ctx.stroke()
    }
  }
}

  for (r = 0; r < rows; r++){
    for (c = 0; c < columns; c++){
      if (polia[r*columns+c].element.chosen != "none"){
        ctx.fillStyle = polia[r*columns+c].element.chosen
        ctx.beginPath()
        ctx.rect(c*dimension+5, r*dimension+5, dimension-10, dimension-10)
        ctx.fill()
        ctx.stroke()
      }

    }
  }
  
console.log(polia,'polia')

console.log(data)


























































