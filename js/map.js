const d = {//added const
  count: {},
  go: {
    left: - 1,
    right: 1,
  },
  columns: 15,
  rows: 15,
  colors: {},
  layers: {
    flooring: [],
    element: [],
    feature: [],
  },
  loot: {},
  maxLootAmmount: function(){//todo
    let max = 0
    for (const l in d.loot){
      if (max < d.loot[l].length * dimension / 2 + Math.ceil(ctx.measureText(l).width)){
        max = d.loot[l].length * dimension / 2 + Math.ceil(ctx.measureText(l).width)
      }
    }
    return max + dimension / 1.9 //needed because of some error when writing vertical text; previous const was 23pixels
  },
  timers: [],
}

class Color {
  //?shouldn't colorWidth = 0 mean display color = none
  //?different size of loot, probabilities, even return strings etc custom loot
  constructor(label, layer, color, ratio = 0, properties = [], colorWidth = 1, loot = false){
    this.label = label
    this.layer = layer
    d.layers[layer].push(label)
    this.color = color
    this.ratio = ratio
    this.properties = properties
    this.colorWidth = colorWidth
    d.count[label] = 0
    this.loot = loot
    if (loot){
      d.loot[label] = []
    }
  }
}

function makeColor(...rest) {
  d.colors[rest[0]] = new Color(...rest)
}

tiles = []

function generateMap(columns, rows){
  while (((document.documentElement.clientWidth * 0.9 > dimension * d.columns + Object.keys(d.loot).length * (dimension / 1.3)) || (document.documentElement.clientHeight * 0.9 > dimension * d.rows)) && dimension < 45){
    dimension += 0.1
  }
  while (((document.documentElement.clientWidth * 0.9 < dimension * d.columns + Object.keys(d.loot).length * (dimension / 1.3)) || (document.documentElement.clientHeight * 0.9 < dimension * d.rows)) && dimension > 20){
    dimension -= 0.1
  }
  tiles = []//?move to d
  d.go['up'] = - columns
  d.go['down'] = columns

  class Tile {
    constructor(arg){
      this.index = arg
      this.colors = {
        positive: {},
        negative: {},//unused
        banned: {},
      }
      for (const c in d.colors){
        this.colors.positive[c] = d.colors[c].ratio
      }
      for (const c in d.colors){//unused
        this.colors.negative[c] = 0
      }
      for (const c in d.colors){
        this.colors.banned[c] = false
      }

      this.left = this.index % columns
      this.right = columns - this.left - 1
      this.up = Math.floor(this.index / columns)
      this.down = rows - this.up - 1

      this.flooring = {
        chosen: '',
        dimensions: [this.index],
        'left,up': [0, 0],
        'left': [0, 0.5],
        'left,down': [0, 1],
        'down': [0.5, 1],
        'right,down': [1, 1],
        'right': [1, 0.5],
        'right,up': [1, 0],
        'up': [0.5, 0],
      }
      this.element = {
        chosen: '',
        dimensions: [this.index],
        'left,up': [33/100/2, 33/100/2],
        'left': [33/100/2, 0.5],
        'left,down': [33/100/2, 1-33/100/2],
        'down': [0.5, 1-33/100/2],
        'right,down': [1-33/100/2, 1-33/100/2],
        'right': [1-33/100/2, 0.5],
        'right,up': [1-33/100/2, 33/100/2],
        'up': [0.5, 33/100/2],
      }
      this.feature = {
        chosen: '',
        dimensions: [this.index],
        'left,up': [66/100/2, 66/100/2],
        'left': [66/100/2, 0.5],
        'left,down': [66/100/2, 1-66/100/2],
        'down': [0.5, 1-66/100/2],
        'right,down': [1-66/100/2, 1-66/100/2],
        'right': [1-66/100/2, 0.5],
        'right,up': [1-66/100/2, 66/100/2],
        'up': [0.5, 66/100/2],
      }

    }

    tileMain(arg){
      if (this[arg].chosen){// != ''){
        return
      }
      this.ban(arg)
      this.restrict(arg)//unused

      do {
        this.choose(arg)//this[arg].chosen =
        /*if (!this.ratioSum(arg)){
          this.chosen = 'none'
          console.log('Error: nothing to choose from')
          break
        }*/
      }
      while (this.fits(this[arg].chosen))
      d.count[this[arg].chosen]++

      for (const p of d.colors[this[arg].chosen].properties){
        let todo = []
        for (let y = 0; y <= p.radius; y++){
          for (const z of this[arg].dimensions){
            todo = [...tiles[z].square(todo, y)]//...todo, huge bug
          }
        }
        this.edit(todo, p.action, p.colors)
      }
    }

    //adds to given array of tiles with tiles of given radius from current tile if not already included
    square(todoArg, radiusArg){
      if (!radiusArg){//(radiusArg == 0){
        return [...todoArg, this.index]
      }
      if (radiusArg == - 1){
        return todoArg
      }
      let todo = todoArg
      todo = this.edge(todo, radiusArg, 1, this.up, this.index - radiusArg * columns, 'left', radiusArg, this.left, 'right', this.right)
      todo = this.edge(todo, radiusArg, 1, this.down, this.index + radiusArg * columns, 'left', radiusArg, this.left, 'right', this.right)
      todo = this.edge(todo, radiusArg, columns, this.left, this.index - radiusArg, 'up', radiusArg * columns - columns, this.up * columns, 'down', this.down * columns)
      todo = this.edge(todo, radiusArg, columns, this.right, this.index + radiusArg, 'up', radiusArg * columns - columns, this.up * columns, 'down', this.down * columns)
      return todo
    }

    //adds one edge of the square in the required radius depending on the arg
    edge(todoArg = [], radiusArg = 0, increase = 0, miesto = 0, bod = 0, direction1 = '', udaj0 = 0, udaj1 = 0, direction2 = '', udaj2 = 0){
      const todo = todoArg
      if (miesto >= radiusArg){
        let x
        this[direction1] >= radiusArg ? x = tiles[bod].index - udaj0 : x = tiles[bod].index - udaj1
        let y
        this[direction2] >= radiusArg ? y = tiles[bod].index + udaj0 : y = tiles[bod].index + udaj2
        for ( ; x <= y; x += increase){
          todo.includes(x) ? undefined : todo.push(x)
        }
      }
      return todo
    }

    choose(arg){
      const random = Math.floor(Math.random() * this.ratioSum(arg))
      let counter = 0
      for (const c of d.layers[arg]){
        counter += this.colors.positive[c]
        if (random < counter){
          this[arg].chosen = d.colors[c].label
          return 0
        }
      }
      //?poistka nejaka ak dlzka je 0; vpodstate uz mam poistku niekde v kode
      //?dlzka 0 nepovolit
    }

    ratioSum(arg){
      let counter = 0
      for (const c of d.layers[arg]){
        counter += this.colors.positive[c]
      }
      return counter
    }

    ban(arg){
      for (const c of d.layers[arg]){
        if (this.colors.banned[c]){// == 1){
          this.colors.positive[c] = 0
        }
      }
    }

    restrict(arg){
      for (const c of d.layers[arg]){
        if (this.colors.negative[c]){// != 0){
          this.colors.positive[c] > this.colors.negative[c] ? this.colors.positive[c] -= this.colors.negative[c] : this.colors.positive[c] = 0
        }
      }
    }

    fits(color){//
      const directions = [['left'], ['right'], ['up'], ['down'], ['left', 'up'], ['left', 'down'], ['right', 'up'], ['right', 'down']]
      let way = ''
      for (let x = 0; x < 8; x++){
        way = directions[Math.floor(Math.random() * directions.length)]
        if (this.check(way, color)){
          const l = d.colors[color].layer;
          for (const t of this[l].dimensions.slice(0, - 1)){//pre kazdu dimension tohoto pola okrem poslednej
            for (let y = 0; y < 2; y++){//pre kazdu suradnicu (x, y) vybraneho pomocneho bodu
              if (this[l][way][y] != 0.5){//ak nie je stredova ta konkretna suradnica (bud x alebo y)
                tiles[t][l][way][y] = Math.round(this[l][way][y])//tak ju zaokruhli == posun z vnutra na okraj
              }
            }
            if (way.length == 2){//ak riesim diagonalne smery
              for (let y = 0; y < 2; y++){//okrem rohoveho bodu posuniem aj stredove okolo rohoveho bodu
                tiles[t][l][way[y]] = this[l][way]//na suradnice rohoveho aby nerobili problem pri zobrazovani
              }
            }
          }

          if (way == 'right'){//converting way to opposite
            way = ['left']
          } else if (way == 'left'){
            way = ['right']
          } else if (way == 'up'){
            way = ['down']
          } else if (way == 'down'){
            way = ['up']
          } else if (way.toString() == 'left,up'){
            way = ['right', 'down']
          } else if (way.toString() == 'left,down'){
            way = ['right', 'up']
          } else if (way.toString() == 'right,up'){
            way = ['left', 'down']
          } else {
            way = ['left', 'up']
          }

          for (const t of this[l].dimensions.slice(1)){//for all dimensions except this tile
            for (let y = 0; y < 2; y++){
              if (this[l][way][y] != 0.5){
                tiles[t][l][way][y] = Math.round(this[l][way][y])
              }
            }
            if (way.length == 2){
              for (let y = 0; y < 2; y++){
                tiles[t][l][way[y]] = tiles[t][l][way]
              }
            }
          }
          //nakresli priebezne celu danu farbu na tom (prip viacerych) polickach po definitivnom vygenerovani
          for (const t of this[l].dimensions){
            tiles[t].drawYourself()
          }
          if (d.loot[color]){
            d.loot[color].push(Math.floor(Math.random() * 2 + 1))
          }
          return 0
        } else {
          directions.splice(way, 1)
        }
      }
      this.colors.positive[color] = 0
      return 1
    }

    check(way, color){
      for (const x of way){
        if (this[x] < d.colors[color].colorWidth - 1){
          return 0
        }
      }
      const dimensions = [this.index]
      let scout = this.index;
      const l = d.colors[color].layer;
      for (let x = 1; x < d.colors[color].colorWidth; x++){
        /*if (tiles == 2 && tiles[scout + d.go[way[0]]][l].dimensions.some(t => tiles[scout + d.go[way[1]]][l].dimensions.includes(t))){
          return 0
        }*/
        if (way.length == 2){
          for (const t of tiles[scout + d.go[way[0]]][l].dimensions){
            if (tiles[scout + d.go[way[1]]][l].dimensions.includes(t)){
              return 0
            }
          }
        }
        for (const w of way){
          scout += d.go[w]
        }
        if (tiles[scout][l].chosen){// != ''){
          return 0
        }
        if (tiles[scout].colors.banned[color]){// == 1){
          return 0
        }
        dimensions.push(scout)
      }

      for (const t of dimensions){
        tiles[t][l].chosen = color
        tiles[t][l].dimensions = dimensions
      }

      return 1
    }

    edit(arg = [], action = 0, colors = ''){
      for (const t of arg){
        if (!action){// == 0){
          for (const c of colors.split(', ')){
            tiles[t].colors.banned[c] = true//
          }
        } else if (action > 0) {
          for (const c of colors.split(', ')){
            tiles[t].colors.positive[c] += action
          }
        } else {
          for (const c of colors.split(', ')){
            tiles[t].colors.negative[c] += action
          }
        }
      }
    }

    drawYourself(){
      if (this.flooring.chosen){
        this.drawUniversal('flooring')
        for (const t of this.flooring.dimensions){
          tiles[t].redrawYourself()
        }
      }
      if (this.element.chosen){
        this.drawUniversal('element')
        for (const t of this.element.dimensions){
          tiles[t].redrawYourself()
        }
      }
      if (this.feature.chosen){
        this.drawUniversal('feature')
        for (const t of this.feature.dimensions){
          tiles[t].redrawYourself()
        }
      }
    }

    redrawYourself(){
      if (this.flooring.chosen){
        this.drawUniversal('flooring')
      }
      if (this.element.chosen){
        this.drawUniversal('element')
      }
      if (this.feature.chosen){
        this.drawUniversal('feature')
      }
    }

    drawUniversal(arg){
      if (d.colors[this[arg].chosen].color != 'none'){
        ctx.fillStyle = d.colors[this[arg].chosen].color
        ctx.beginPath()
        ctx.moveTo(this.left * dimension + tiles[this.up * columns + this.left][arg].right[0] * dimension, this.up * dimension + tiles[this.up * columns + this.left][arg].right[1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up * columns + this.left][arg]['right,down'][0] * dimension, this.up * dimension + tiles[this.up * columns + this.left][arg]['right,down'][1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up * columns + this.left][arg].down[0] * dimension, this.up * dimension + tiles[this.up * columns + this.left][arg].down[1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up * columns + this.left][arg]['left,down'][0] * dimension, this.up * dimension + tiles[this.up * columns + this.left][arg]['left,down'][1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up * columns + this.left][arg].left[0] * dimension, this.up * dimension + tiles[this.up * columns + this.left][arg].left[1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up * columns + this.left][arg]['left,up'][0] * dimension, this.up * dimension + tiles[this.up * columns + this.left][arg]['left,up'][1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up * columns + this.left][arg].up[0] * dimension, this.up * dimension + tiles[this.up * columns  + this.left][arg].up[1] * dimension)
        ctx.lineTo(this.left * dimension + tiles[this.up * columns + this.left][arg]['right,up'][0] * dimension, this.up * dimension + tiles[this.up * columns + this.left][arg]['right,up'][1] * dimension)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    }
  }


  const tilesRaw = []
  c = document.getElementById('map')
  ctx = c.getContext('2d')

  c.width = columns * dimension + Object.keys(d.loot).length * (dimension / 1.3)
  c.style.width = c.width + 'px'
  c.height = rows * dimension
  c.style.height = c.height + 'px'
  ctx.strokeStyle = 'black'

  for (let i = 0; i < rows * columns; i++){
    tilesRaw.push([i, 'flooring', 'element', 'feature'])
    tiles.push(new Tile(i))
  }

  for (const t of d.timers){
    clearTimeout(t)
  }
  d.timers = []
  for (let i = 0; i < rows * columns * 3; i++){
    d.timers.push(setTimeout(
      function(){
        const m = Math.floor(Math.random() * tilesRaw.length)
        const n = Math.floor(Math.random() * (tilesRaw[m].length - 1)) + 1
        tiles[tilesRaw[m][0]].tileMain(tilesRaw[m][n])
    //////////    if (d.loot.includes(tiles[tilesRaw[m][0]][tilesRaw[m][n]].chosen)){
    //        d.loot[tiles[tilesRaw[m][0]][tilesRaw[m][n]].chosen].push(Math.floor(Math.random() * 2 + 1))
      //  }
        tilesRaw[m].splice(n, 1)
        tilesRaw[m].length == 1 ? tilesRaw.splice(m, 1) : undefined
      }, i * 10)
    )
      //todo option to skip animation
  }
  d.timers.push(setTimeout(
    function(){
      let saved = new Image()
      saved = ctx.getImageData(0, 0, c.width, c.height)//c.toDataURL('image/png');//.src
        //c.width = columns * dimension + Object.keys(d.loot).length * dimension//c.width = columns * dimension + noLoot()//noLoot useless
      //c.style.width = c.width + 'px'
      if (c.height < d.maxLootAmmount()){
        c.height = d.maxLootAmmount()
        c.style.height = c.height + 'px'
      }
      ctx.putImageData(saved, 0, 0)
      loot()
    }, (rows * columns * 3 * 10) + 50)
  )
  window.onresize = instantRepaint
}

//haprovanie na hlavnej stranke
//?telefon ma rovnako px ako pc ale meneej cm => test after push
function instantRepaint(){
  ctx.clearRect(0, 0, c.width, c.height)
  while (((document.documentElement.clientWidth * 0.9 > dimension * d.columns + Object.keys(d.loot).length * (dimension / 1.3)) || (document.documentElement.clientHeight * 0.9 > dimension * d.rows)) && dimension < 45){
    dimension += 0.1
  }
  /*if dimensions smaller than 30 fit to the whole page
  if dimensions larger no need to fit in the whole height of the map
  this means width is more important
  //the viewport height affcts the dimension however it doesn't try to fit the canvas all in, only two thirds, hence the multiplyer 1.5 for the current viewport height*/
  while (((document.documentElement.clientWidth * 0.9 < dimension * d.columns + Object.keys(d.loot).length * (dimension / 1.3)) || (document.documentElement.clientHeight * 0.9 < dimension * d.rows)) && dimension > 20){
    dimension -= 0.1
  }//the viewport being too small for one or both dimension overwrites the larger one


  c.width = d.columns * dimension + Object.keys(d.loot).length * (dimension / 1.3)
  c.style.width = c.width + 'px'
  c.height = d.rows * dimension
  c.style.height = c.height + 'px'
  ctx.strokeStyle = 'black'
  for (let t of tiles){
    t.drawYourself()
  }
  if (!d.timers.length){
    let saved = new Image()
    saved = ctx.getImageData(0, 0, c.width, c.height)
    if (c.height < d.maxLootAmmount()){
      c.height = d.maxLootAmmount()
      c.style.height = c.height + 'px'
    }
    ctx.putImageData(saved, 0, 0)
    loot()
  }
  window.onresize = instantRepaint
}
