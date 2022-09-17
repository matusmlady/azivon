function generateMap(d, columns, rows){
  d.go.up = - columns
  d.go.down = columns
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
        }
      }

      this.flooring = new Layer(0, index)
      this.element = new Layer(33, index)
      this.feature = new Layer(66, index)
    }

    generate(layer){
      if (this[layer].chosen) return
      this.ban(layer)

      do this.choose(layer)
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
      const random = Math.floor(Math.random() * this.ratioSum(layer))
      let counter = 0
      for (const c of d.layers[layer]){
        counter += this.positive[c]
        if (random < counter){
          this[layer].chosen = c
          return 0
        }
      }
    }

    ratioSum(layer){
      let counter = 0
      for (const c of d.layers[layer]) counter += this.positive[c]
      return counter
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
      for (const direction of dir) if (this[direction] < d.colors[color].colorWidth - 1) return 0
      for (let x = 1, dim = this.index; x < d.colors[color].colorWidth; x++){
        if (dir.length == 2){
          for (const t of tiles[dim + d.go[dir[0]]][l].dimensions) if (tiles[dim + d.go[dir[1]]][l].dimensions.includes(t)) return 0//if color would cross a same layered color diagonally abort
        }
        for (const direction of dir) dim += d.go[direction]
        if (tiles[dim][l].chosen) return 0
        if (tiles[dim].banned[color]) return 0
        dimensions.push(dim)
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

    reverseDir(dir){
      for (let x of dir){
        if (x == 'left') dir[dir.indexOf(x)] = 'right'
        else if (x == 'right') dir[dir.indexOf(x)] = 'left'
        else if (x == 'up') dir[dir.indexOf(x)] = 'down'
        else dir[dir.indexOf(x)] = 'up'
      }
      return dir
    }

    //adds to given Set of tiles with tiles in the given radius from current tile
    findAffected(toEdit, radius){
      let movingTile = this.index, endTile = this.index;
      this.left >= radius ? movingTile -= radius : movingTile -= this.left
      this.up >= radius ? movingTile -= radius * columns : movingTile -= this.up * columns
      this.right >= radius ? endTile += radius : endTile += this.right
      this.down >= radius ? endTile += radius * columns : endTile += this.down * columns
      for ( ; ; ){
        toEdit.add(movingTile)
        if (movingTile == endTile) break
        if (tiles[movingTile].right == tiles[endTile].right) movingTile += columns - radius * 2
        else movingTile++
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
      const dimension = getDimension(d)
      if (d.colors[this[l].chosen].color != 'none'){
        ctx.fillStyle = d.colors[this[l].chosen].color
        ctx.beginPath()
        this.drawLine('right', l, dimension)
        this.drawLine('right,down', l, dimension)
        this.drawLine('down', l, dimension)
        this.drawLine('left,down', l, dimension)
        this.drawLine('left', l, dimension)
        this.drawLine('left,up', l, dimension)
        this.drawLine('up', l, dimension)
        this.drawLine('right,up', l, dimension)
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

  const dimension = getDimension(d)
  c.width = columns * dimension
  c.style.width = c.width + 'px'
  c.height = rows * dimension
  c.style.height = c.height + 'px'
  ctx.strokeStyle = 'black'

  const tilesRaw = []
  const tiles = []
  for (let i = 0; i < rows * columns; i++){
    tilesRaw.push([i, 'flooring'], [i, 'element'], [i, 'feature'])
    tiles.push(new Tile(i))
  }

  for (const t of d.timers) clearTimeout(t)
  d.timers = []

  for (let i = 0; i < rows * columns * 3; i++){//TODO separate generation and animation for more flexibility, functions returning inconsistent results when asking about loot, weird behaviour if tons of stuff has loot
    d.timers.push(setTimeout(
      () => {
        const tileAndLayer = tilesRaw.splice(Math.floor(Math.random() * tilesRaw.length), 1)[0]
        tiles[tileAndLayer[0]].generate(tileAndLayer[1])
      }, i * 10)
    )
  }
  d.timers.push(setTimeout(
    () => {
      d.timers = []
      instantRepaint(d, m)
    }, (rows * columns * 3 * 10) + 10)
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
    },
    colors: {},
    layers: {
      flooring: [],
      element: [],
      feature: [],
    },
    loot: {},
    timers: [],
    fillerFlooring: 'grass',
    fillerFlooringIndex: 0,
    fillerElement: 'noElement',
    fillerElementIndex: 4,
    fillerFeature: 'noFeature',
    fillerFeatureIndex: 8,
  }
  d.go.up = () => - d.columns
  d.go.down = () => d.columns

  function addColorD(label, layer, color, ratio, properties, colorWidth, loot) {
    d.colors[label] = new Color(label, layer, color, ratio, properties, colorWidth, loot)
    d.layers[layer].push(label)
    d.count[label] = 0
    if (loot) d.loot[label] = []
  }

  addColorD('grass', 'flooring', '#8BC766', 250)
  addColorD('desert', 'flooring', '#FFFFA5', 50, [new Property(0, ['snow'], 3), new Property(50, ['desert'], 3), new Property(0, ['woods'], 0)])
  addColorD('snow', 'flooring', '#FFFFFF', 50, [new Property(0, ['desert'], 3), new Property(50, ['snow'], 3)])
  addColorD('water', 'flooring', '#66BBDD', 5, [new Property(80, ['water'], 3), new Property(0, ['material', 'mountains', 'lake', 'woods', 'village', 'metal', 'gold', 'castle', 'castle2'], 0)])

  addColorD('noElement', 'element', 'none', 100, [], 0)
  addColorD('mountains', 'element', '#A75F49', 5, [new Property(0, ['water'], 0), new Property(1, ['gold', 'castle', 'castle2', 'metal'], 0)], 3)
  addColorD('woods', 'element', '#BCA26F', 7, [new Property(0, ['water', 'desert', 'village', 'metal', 'gold', 'castle', 'castle2'], 0), new Property(1, ['metal', 'gold', 'castle'], 0)], 2)
  addColorD('lake', 'element', '#64E1E2', 5, [new Property(0, ['water', 'village', 'metal', 'gold', 'castle', 'castle2', 'material'], 0)], 2)

  addColorD('noFeature', 'feature', 'none', 200, [], 0)
  addColorD('village', 'feature', '#FD7C7C', 5, [new Property(0, ['water', 'lake', 'woods'], 0)], 1, true)
  addColorD('metal', 'feature', '#8E9EA5', 1, [new Property(0, ['water', 'lake'], 0)])
  addColorD('gold', 'feature', '#C2AB35', 1, [new Property(0, ['water', 'lake', 'woods'], 0)])
  addColorD('castle', 'feature', '#AAAAAA', 1, [new Property(0, ['water', 'lake', 'woods'], 0)])
  addColorD('castle2', 'feature', '#AAAAAA', 1, [new Property(0, ['water', 'lake', 'woods'], 0)], 2)
  addColorD('material', 'feature', '#D494D0', 6, [new Property(0, ['water', 'lake'], 0)])

  return d
}

class Color {
  constructor(label, layer, color, ratio = 0, properties = [], colorWidth = 1, loot = false){
    if (typeof label != 'string') console.log('Color.label shouldn\'t be a ' + typeof label)
    if (typeof layer != 'string') console.log('Color.layer shouldn\'t be a ' + typeof layer)
    if (typeof color != 'string') console.log('Color.color shouldn\'t be a ' + typeof color)
    if (typeof ratio != 'number') console.log('Color.ratio shouldn\'t be a ' + typeof ratio)
    if (typeof properties != 'object') console.log('Color.properties shouldn\'t be a ' + typeof properties)
    if (typeof colorWidth != 'number') console.log('Color.colorWidth shouldn\'t be a ' + typeof colorWidth)
    if (typeof loot != 'boolean') console.log('Color.loot shouldn\'t be a ' + typeof loot)
    this.label = label
    this.layer = layer
    this.color = color
    this.ratio = ratio
    this.properties = properties
    this.colorWidth = colorWidth
    this.loot = loot
  }
}

class Property {
  constructor(action, colors, radius){
    if (typeof action != 'number') console.log('Property.action shouldn\'t be a ' + typeof action)
    if (typeof colors != 'object') console.log('Property.colors shouldn\'t be a ' + typeof colors)
    if (typeof radius != 'number') console.log('Property.radius shouldn\'t be a ' + typeof radius)
    this.action = action
    this.colors = colors
    this.radius = radius
  }
}
