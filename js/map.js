function generateMap(d, columns, rows){
  class Tile {
    constructor(index){
      this.index = index
      this.positive = {}
      this.banned = {}
      for (const c in d.colors) this.positive[c] = d.colors[c].ratio;
      for (const c in d.colors) this.banned[c] = false

      this.left = index % columns
      this.right = columns - this.left - 1
      this.up = Math.floor(this.index / columns)
      this.down = rows - this.up - 1

      class Layer {
        constructor(size, index){
          this.chosen = ''
          this.dimensions = [index]
          this['left'] = [size/200, 0.5]
          this['right'] = [1 - size/200, 0.5]
          this['up'] = [0.5, size/200]
          this['down'] = [0.5, 1 - size/200]
          this['left,up'] = [size/200, size/200]
          this['right,down'] = [1 - size/200, 1 - size/200]
          this['left,down'] = [size/200, 1 - size/200]
          this['right,up'] = [1 - size/200, size/200]

          const parent = this
          this.columns = 20
          this.go = {
            get a() {return parent.columns},
            get b() {return 'here2'}
          }

        }

      }

      this.flooring = new Layer(0, index)
      this.element = new Layer(33, index)
      this.feature = new Layer(66, index)
    }

    generate(layer){
      if (this[layer].chosen) return
      this.ban(layer)

      do (this[layer].chosen = this.choose(layer))
      while (!this.isPossible(this[layer].chosen))
      d.count[this[layer].chosen]++
      if (d.loot[this[layer].chosen]){
        d.loot[this[layer].chosen].push(Math.floor(Math.random() * 2 + 1))
      }

      for (const p of d.colors[this[layer].chosen].properties){
        const toEdit = new Set()
        for (const z of this[layer].dimensions) tiles[z].findAffected(toEdit, p.radius)
        this.editSurroundings(toEdit, p.action, p.colors)
      }
    }

    ban(layer){
      for (const c of d.layers[layer]) if (this.banned[c] || this.positive[c] < 0) this.positive[c] = 0
    }

    choose(layer){
      let counter = 0
      for (const c of d.layers[layer]) counter += this.positive[c]
      if (!counter){
        if (layer == 'flooring') return d.fillerFlooring
        if (layer == 'element') return d.fillerElement
        return d.fillerFeature
      }
      const random = Math.floor(Math.random() * counter)
      counter = 0
      for (const c of d.layers[layer]){
        counter += this.positive[c]
        if (random < counter){
          return c
        }
      }
    }

    isPossible(color){
      const dirs = [['left'], ['right'], ['up'], ['down'], ['left', 'up'], ['right', 'down'], ['left', 'down'], ['right', 'up']]
      for (let x = 0; x < 8; x++){
        const dir = dirs[Math.floor(Math.random() * dirs.length)]
        if (!this.fits(dir, color)) dirs.splice(dirs.indexOf(dir), 1)
        else return 1
      }
      this.positive[color] = 0
      return 0
    }

    fits(dir, color){
      const dimensions = [this.index]
      const l = d.colors[color].layer;
      for (const direction of dir) if (this[direction] <= d.colors[color].width) return 0
      for (let x = 1, dimension = this.index; x < d.colors[color].width; x++){
        if (dir.length == 2){
          for (const t of tiles[dimension + d.go[dir[0]]][l].dimensions) if (tiles[dimension + d.go[dir[1]]][l].dimensions.includes(t)) return 0//if color would cross a same layered color diagonally abort
        }
        for (const direction of dir) dimension += d.go[direction]
        if (tiles[dimension][l].chosen) return 0
        if (tiles[dimension].banned[color]) return 0
        dimensions.push(dimension)
      }
      this.setDimensions(dimensions, color, dir)
      return 1
    }

    setDimensions(dimensions, color, dir){
      const l = d.colors[color].layer;
      for (const t of dimensions){
        tiles[t][l].chosen = color
        tiles[t][l].dimensions = dimensions
      }
      for (const t of this[l].dimensions){
        //if not the last tile draw the original direction part of the tile
        if (this[l].dimensions.indexOf(t) + 1 != this[l].dimensions.length) this.concentrateEdgePoints(tiles[t][l], dir)
        dir = this.reverseDir(dir)
        //if not the first tile draw the reversed original direction part
        if (t != this.index) this.concentrateEdgePoints(tiles[t][l], dir)
        dir = this.reverseDir(dir)
        tiles[t].drawChosen()
      }
    }

    concentrateEdgePoints(tl, dir){
      for (let y = 0; y < 2; y++){//for both coordinates of the chosen edge point
        if (tl[dir][y] != 0.5) tl[dir][y] = Math.round(tl[dir][y])//round them unless in middle -> move to the edge ready to be drawn
        if (dir.length == 2) tl[dir[y]] = tl[dir]//if diagonal color also concentrate middle edge points to the corner edge point
      }
    }

    reverseDir(dirs){
      for (let dir of dirs){
        if (dir == 'left') dirs[dirs.indexOf(dir)] = 'right'
        else if (dir == 'right') dirs[dirs.indexOf(dir)] = 'left'
        else if (dir == 'up') dirs[dirs.indexOf(dir)] = 'down'
        else dirs[dirs.indexOf(dir)] = 'up'
      }
      return dirs
    }

    //adds to given Set of tiles with tiles in the given radius from current tile
    findAffected(toEdit, radius){
      let movingTile = this.index, endTile = this.index
      this.left >= radius ? movingTile -= radius : movingTile -= this.left
      this.up >= radius ? movingTile -= radius * columns : movingTile -= this.up * columns
      toEdit.add(movingTile)
      this.right >= radius ? endTile += radius : endTile += this.right
      this.down >= radius ? endTile += radius * columns : endTile += this.down * columns
      while (movingTile != endTile){
        if (tiles[movingTile].right == tiles[endTile].right) {
          movingTile += d.columns
          if (tiles[movingTile].left >= radius * 2) movingTile -= radius * 2
          else movingTile -= tiles[movingTile].left
        }
        else movingTile++
        toEdit.add(movingTile)
      }
    }

    editSurroundings(surroundings, action = 0, colors){
      for (const t of surroundings){
        if (!action) for (const c of colors) tiles[t].banned[c] = true
        else for (const c of colors) tiles[t].positive[c] += action
      }
    }

    drawChosen(){
      for (const l in d.layers) if (this[l].chosen) this.drawLayer(l)
    }

    drawLayer(l){
      const dim = getDimension(d)
      if (d.colors[this[l].chosen].width != 0 ? true : (d.colors[this[l].chosen].layer == 'flooring' ? true : false)){
      //if (d.colors[this[l].chosen].width == 0 ? (d.colors[this[l].chosen].layer == 'flooring' ? true : false) : true){
      //if (d.colors[this[l].chosen].layer == 'flooring' ? true : (d.colors[this[l].chosen].width == 0 ? false : true)){
        ctx.fillStyle = d.colors[this[l].chosen].color
        ctx.beginPath()
        this.drawLine('right', l, dim)
        this.drawLine('right,down', l, dim)
        this.drawLine('down', l, dim)
        this.drawLine('left,down', l, dim)
        this.drawLine('left', l, dim)
        this.drawLine('left,up', l, dim)
        this.drawLine('up', l, dim)
        this.drawLine('right,up', l, dim)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    }

    drawLine(dir, l, dim){
      const edgePointCoordinates = tiles[this.up * columns + this.left][l][dir]
      ctx.lineTo(dim * (this.left + edgePointCoordinates[0]), dim * (this.up + edgePointCoordinates[1]))
    }
  }

  c = document.getElementById('mapCanvas')
  ctx = c.getContext('2d')

  for (const t of d.timers) clearTimeout(t)
  d.timers = []

  const dim = getDimension(d)
  c.width = columns * dim
  c.style.width = c.width + 'px'
  c.height = rows * dim
  c.style.height = c.height + 'px'
  ctx.strokeStyle = 'black'

  const tilesRaw = []
  const tiles = []
  for (let i = 0; i < rows * columns; i++){
    tilesRaw.push([i, 'flooring'], [i, 'element'], [i, 'feature'])
    tiles.push(new Tile(i))
  }

  let timeUnit
  rows * columns < 225 ? timeUnit = 8 : timeUnit = 4000 / (rows * columns * 3)

  for (let i = 0; i < rows * columns * 3; i++){//TODO separate generation and animation for more flexibility, functions returning inconsistent results when asking about loot, weird behaviour if tons of stuff has loot
    d.timers.push(setTimeout(
      () => {
        const tileAndLayer = tilesRaw.splice(Math.floor(Math.random() * tilesRaw.length), 1)[0]
        tiles[tileAndLayer[0]].generate(tileAndLayer[1])
      }, i * timeUnit)
    )
  }
  d.timers.push(setTimeout(
    () => {
      d.timers = []
      instantRepaint(d, m)
    }, (rows * columns * 3 * timeUnit) + 100)
  )
  window.onresize = () => instantRepaint(d, m)

  return tiles
}


function createDefaultDeck(){
  const d = {
    count: {},
    columns: 15,
    rows: 15,
    go: {
      left: - 1,
      right: 1,
      get up(){
        return - d.columns
      },
      get down(){
        return d.columns
      }
    },
    colors: {},
    layers: {
      flooring: [],
      element: [],
      feature: [],
    },
    loot: {},
    timers: [],
    fillerFlooring: 'noFlooring',
    fillerFlooringIndex: 0,
    fillerElement: 'noElement',
    fillerElementIndex: 1,
    fillerFeature: 'noFeature',
    fillerFeatureIndex: 2,
  }

  function addColorD(label, layer, color, ratio, properties, width, loot) {
    d.colors[label] = new Color(label, layer, color, ratio, properties, width, loot)
    d.layers[layer].push(label)
    d.count[label] = 0
    if (loot) d.loot[label] = []
  }

  addColorD('noFlooring', 'flooring', '#efefef', 0)//#efefef similar to background of color
  addColorD('noElement', 'element', '#efefef', 100, [], 0)
  addColorD('noFeature', 'feature', '#efefef', 200, [], 0)

  addColorD('grassland', 'flooring', '#8bc766', 50, [new Property(50, ['grassland'], 3)])
  addColorD('desert', 'flooring', '#ffffa5', 50, [new Property(0, ['snow'], 3), new Property(50, ['desert'], 3), new Property(0, ['woods'], 0)])
  addColorD('snow', 'flooring', '#ffffff', 50, [new Property(0, ['desert'], 3), new Property(50, ['snow'], 3)])
  addColorD('water', 'flooring', '#66bbdd', 5, [new Property(80, ['water'], 3), new Property(0, ['material', 'mountains', 'lake', 'woods', 'village', 'metal', 'gold', 'castle', 'castle2'], 0)])

  addColorD('mountains', 'element', '#a75f49', 5, [new Property(0, ['water'], 0), new Property(1, ['gold', 'castle', 'castle2', 'metal'], 0)], 3)
  addColorD('woods', 'element', '#bca26f', 7, [new Property(0, ['water', 'desert', 'village', 'metal', 'gold', 'castle', 'castle2'], 0), new Property(1, ['metal', 'gold', 'castle'], 0)], 2)
  addColorD('lake', 'element', '#64e1e2', 5, [new Property(0, ['water', 'village', 'metal', 'gold', 'castle', 'castle2', 'material'], 0)], 2)

  addColorD('village', 'feature', '#fd7c7c', 5, [new Property(0, ['water', 'lake', 'woods'], 0)], 1, true)
  addColorD('metal', 'feature', '#8e9ea5', 1, [new Property(0, ['water', 'lake'], 0)])
  addColorD('gold', 'feature', '#c2ab35', 1, [new Property(0, ['water', 'lake', 'woods'], 0)])
  addColorD('castle', 'feature', '#aaaaaa', 1, [new Property(0, ['water', 'lake', 'woods'], 0)])
  addColorD('castle2', 'feature', '#aaaaaa', 1, [new Property(0, ['water', 'lake', 'woods'], 0)], 2)
  addColorD('material', 'feature', '#d494d0', 6, [new Property(0, ['water', 'lake'], 0)])

  return d
}

class Color {
  constructor(label, layer, color, ratio = 0, properties = [], width = 1, loot = false){
    if (typeof label != 'string') console.log('Color.label shouldn\'t be a ' + typeof label)
    if (typeof layer != 'string') console.log('Color.layer shouldn\'t be a ' + typeof layer)
    if (typeof color != 'string') console.log('Color.color shouldn\'t be a ' + typeof color)
    if (typeof ratio != 'number') console.log('Color.ratio shouldn\'t be a ' + typeof ratio)
    if (typeof properties != 'object') console.log('Color.properties shouldn\'t be a ' + typeof properties)
    if (typeof width != 'number') console.log('Color.width shouldn\'t be a ' + typeof width)
    if (typeof loot != 'boolean') console.log('Color.loot shouldn\'t be a ' + typeof loot)
    this.label = label
    this.layer = layer
    this.color = color
    this.ratio = ratio
    this.properties = properties
    this.width = width
    this.loot = loot
  }
}

class Property {
  constructor(action = 0, colors = [], radius = 0){
    if (typeof action != 'number') console.log('Property.action shouldn\'t be a ' + typeof action)
    if (typeof colors != 'object') console.log('Property.colors shouldn\'t be a ' + typeof colors)
    if (typeof radius != 'number') console.log('Property.radius shouldn\'t be a ' + typeof radius)
    this.action = action
    this.colors = colors
    this.radius = radius
    //this.tst = () => console.log('hello')
  }
}
