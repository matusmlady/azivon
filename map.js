//deastinne cisla v pomeroch nefunguju

//grafika elementom
//loot
//(spawn) cleaner
//?shhapes ako vlastnost elementu
//?hrady viac ako jedno policko; ?ne/vycnievanie z elementov na ktorych sa vygeneruju
//?zlato sa spawne obkolesene samymi elementami

//?spolocne vlastnosti (banovanie moze byt jednostranne ak nie je zadefinovane inak)

//?pri generovani a pomeroch znasobit vsetky veci 8 pretoze mam osem smerov; nie ze ked vygenerujem snazim sa to rovno aj natrepat ale skor vyberiem z celkoeho zoznamu konkretny smer a dam prec ak sa nezmesti a potom generujem dalej teoreticky aj dalsie typy elementov

columns = 15
rows = 15
dimension = 20

polia = []

class farba {
  constructor(typ, color, pomer = 0, properties = [], sirka = 1){
    this.typ = typ
    this.color = color
    this.pomer = pomer
    this.properties = properties
    this.sirka = sirka
    data[typ].zoznam.push(this.color)
    data.zoznam.push(this.color)
    data.count[color] = 0
    
        
  }

}

const data = new Object()
data.podlazie = new Object()
data.element = new Object()
data.feature = new Object()


data.count = new Object()

data.instructions = new Object()
data.instructions["vlavo"] = - 1
data.instructions["vpravo"] = 1
data.instructions["hore"] = - columns
data.instructions["dole"] = columns


data.loot = new Object()

//rare spawns work

data.zoznam = []
data.podlazie.zoznam = []
data.element.zoznam = []
data.feature.zoznam = []


data.yellow = new farba("podlazie", "yellow", 25, [{action: 0, colors: ["white"], okruhy: [1, 2, 3]}, {action: 50, colors: ["yellow"], okruhy: [1, 2, 3]}, {action: 0, colors: ["burlywood"], okruhy: [0]}], 1)
data.white = new farba("podlazie", "white", 50, [{action: 0, colors: ["yellow", "gold"], okruhy: [1, 2, 3]}, {action: 50, colors: ["white"], okruhy: [1, 2, 3]}], 1)
data.green = new farba("podlazie", "green", 250, undefined, 1)
data.blue = new farba("podlazie", "blue", 5, [{action: 80, colors: ["blue"], okruhy: [1, 2, 3]}, {action: 0, colors: ["pink", "brown", "aqua", "burlywood", "red", "silver", "goldenrod", "gray"], okruhy: [0]}], 1)
data.gold = new farba("podlazie", "gold", 25, [{action: 0, colors: ["white"], okruhy: [1, 2, 3]}, {action: 40, colors: ["gold"], okruhy: [1, 2, 3]}, {action: 10, colors: ["blue"], okruhy: [1, 2, 3]}, {action: 0, colors: ["burlywood"], okruhy: [0]}], 1)
//pridat podlazie nic
data.brown = new farba("element", "brown", 5, [{action: 0, colors: ["blue"], okruhy: [0]}], 3)
data.burlywood = new farba("element", "burlywood", 5, [{action: 0, colors: ["blue", "yellow", "gold", "red", "silver", "goldenrod", "gray"], okruhy: [0]}], 2)
data.aqua = new farba("element", "aqua", 5, [{action: 0, colors: ["blue", "red", "silver", "goldenrod", "gray", "pink"], okruhy: [0]}], 2)
data.none = new farba("element", "none", 100, undefined, 1)
//universal none ziadna name pre vsetky tri typy
data.ziadna = new farba("feature", "ziadna", 200, undefined, 1)
data.red = new farba("feature", "red", 1, [{action: 0, colors: ["blue", "burlywood", "aqua"], okruhy: [0]}], 1)
data.silver = new farba("feature", "silver", 1, [{action: 0, colors: ["blue", "burlywood", "aqua"], okruhy: [0]}], 1)
data.goldenrod = new farba("feature", "goldenrod", 1, [{action: 0, colors: ["blue", "burlywood", "aqua"], okruhy: [0]}], 1)
data.gray = new farba("feature", "gray", 1, [{action: 0, colors: ["blue", "aqua", "burlywood"], okruhy: [0]}], 1)
data.pink = new farba("feature", "pink", 5, [{action: 0, colors: ["blue", "aqua"], okruhy: [0]}], 1)


   
function main(rows, columns){

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
      while (!this.smer(this[arg].chosen))
      data.count[this[arg].chosen] += 1
      
      for (let x = 0; x < data[this[arg].chosen].properties.length; x++){
        let todo = []

        for (let y = 0; y < data[this[arg].chosen].properties[x].okruhy.length; y++){
          let todoMinus = []
          let todoPlus = []
          for (let z = 0; z < this[arg].rozmery.length; z++){
            todoPlus = polia[this[arg].rozmery[z]].stvorec(todoPlus, data[this[arg].chosen].properties[x].okruhy[y])
            
          }
          for (let z = 0; z < this[arg].rozmery.length; z++){
            todoMinus = polia[this[arg].rozmery[z]].stvorec(todoMinus, data[this[arg].chosen].properties[x].okruhy[y] - 1)
            
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
    
    smer(element){
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
        if (pokyn.length == 2){
          let prvePoleRozmery = polia[pseudo + data.instructions[pokyn[0]]][data[element].typ].rozmery
          let druhePoleRozmery = polia[pseudo + data.instructions[pokyn[1]]][data[element].typ].rozmery;
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
          polia[suradnicky[x]][data[element].typ].rozmery.push(suradnicky[y])
        }

      }
      return 1
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

  data.loot.red = []  
  for (let x = 0; x < data.count.red; x++){
    data.loot.red.push(Math.floor(Math.random() * 3 + 1))
  }

}

main(15, 15, 20)

function draw(rows, columns, dimension){
  function pozadia(){
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
  
  function elementy(){
    for (r = 0; r < rows; r++){
      for (c = 0; c < columns; c++){
        if (polia[r*columns+c].element.chosen != "none"){
          ctx.fillStyle = polia[r*columns+c].element.chosen
          ctx.beginPath()
          ctx.rect(c * dimension + dimension / 5, r * dimension + dimension / 5, dimension / 5 * 3, dimension / 5 * 3)
          ctx.fill()
          ctx.stroke()
          
          ctx.strokeStyle = "lime"
          ctx.beginPath();
          ctx.moveTo(polia[polia[r*columns+c].element.rozmery[0]].vlavo * dimension + dimension / 2, polia[polia[r*columns+c].element.rozmery[0]].hore * dimension + dimension / 2);
          let poslednyRozmer = polia[r*columns+c].element.rozmery.length - 1
          ctx.lineTo(polia[polia[r*columns+c].element.rozmery[poslednyRozmer]].vlavo * dimension + dimension / 2, polia[polia[r*columns+c].element.rozmery[poslednyRozmer]].hore * dimension + dimension / 2);
          ctx.stroke();
          ctx.strokeStyle = "black"
        }

      }
    }
  }
  
  function features(){
    for (r = 0; r < rows; r++){
      for (c = 0; c < columns; c++){
        if (polia[r*columns+c].feature.chosen != "ziadna"){
          ctx.fillStyle = polia[r*columns+c].feature.chosen
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

  pozadia()
  elementy()
  features()
}

draw(15, 15, 20)

console.log(polia,'polia')

console.log(data)

console.log(data.count)

console.log(data.loot)

























































