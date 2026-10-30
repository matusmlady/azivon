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
          this.group = null//all tiles of the shapes connected into one blob, set once the layer is generated
          this.inset = size/200//distance of the drawn shape from the tile edge where it does not link
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
      while (!this.isPossible(this[layer].chosen, true))
      d.count[this[layer].chosen]++
      if (d.loot[this[layer].chosen]){
        d.loot[this[layer].chosen].push(Math.floor(Math.random() * 2 + 1))
      }

      for (const p of d.colors[this[layer].chosen].properties){
        const toEdit = []
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
        if (layer == 'flooring') return this.randomNeighbourFlooring()
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

    isPossible(color, ban){
      const dirs = [...allDirs]
      for (let x = 0; x < 8; x++){
        const dir = dirs[Math.floor(Math.random() * dirs.length)]
        if (!this.fits(dir, color, ban)) dirs.splice(dirs.indexOf(dir), 1)
        else return 1
      }
      this.positive[color] = 0
      return 0
    }

    fits(dir, color, ban){
      const dimensions = [this.index]
      const l = d.colors[color].layer;
      for (const direction of dir) if (this[direction] < d.colors[color].width - 1) return 0
      for (let x = 1, dimension = this.index; x < d.colors[color].width; x++){
        if (dir.length == 2){
          //abort if color would cross a same layered color diagonally
          for (const t of tiles[dimension + d.go[dir[0]]][l].dimensions) if (tiles[dimension + d.go[dir[1]]][l].dimensions.includes(t)) return 0
          //abort if color would cross a lower layer connection diagonally
          if (tiles[dimension].crossesLower(dir, l)) return 0
        }
        for (const direction of dir) dimension += d.go[direction]
        if (tiles[dimension][l].chosen) return 0
        if (ban && tiles[dimension].banned[color]) return 0
        dimensions.push(dimension)
      }
      this.setDimensions(dimensions, color, dir)
      return 1
    }

    setDimensions(dimensions, color, dir){
      const l = d.colors[color].layer;
      const join = Math.random() < d.connectChance//whether this shape joins other joining shapes of the same layer
      for (const t of dimensions) Object.assign(tiles[t][l], {chosen: color, dimensions, join})
    }

    //polygons in tile coordinates the layer is drawn from: middle square, wedge from it to the edge middle of every side link
    //and to the corner of every diagonal link, whole quarter of the tile when all four tiles around its corner link
    pieces(l){
      const s = this[l].inset
      //middle square corner closest to the given tile corner or side
      const near = v => v == 0 ? s : (v == 1 ? 1 - s : v)
      const pieces = [[[s, s], [1 - s, s], [1 - s, 1 - s], [s, 1 - s]]]
      for (const dir of allDirs){
        const x = dir.includes('left') ? 0 : (dir.includes('right') ? 1 : 0.5), y = dir.includes('up') ? 0 : (dir.includes('down') ? 1 : 0.5)
        //wedge from the two middle square corners facing the linked tile to the point it links through
        const facing = x == 0.5 ? [[s, near(y)], [1 - s, near(y)]] : (y == 0.5 ? [[near(x), s], [near(x), 1 - s]] : (x == y ? [[1 - s, s], [s, 1 - s]] : [[s, s], [1 - s, 1 - s]]))
        if (this.sameNeighbour(dir, l)) pieces.push([facing[0], [x, y], facing[1]])
        else if (dir.length == 2 && this.closedCorner(dir, l)) pieces.push([[near(x), near(y)], [x, 0.5], [x, y], [0.5, y]])
      }
      return pieces
    }

    //whether all four tiles around the corner in dir link to each other by sides so the corner is inside the blob
    closedCorner(dir, l){
      if (!this.sameNeighbour([dir[0]], l) || !this.sameNeighbour([dir[1]], l)) return false
      const a = tiles[this.index + d.go[dir[0]]], b = tiles[this.index + d.go[dir[1]]]
      return a.sameNeighbour([dir[1]], l) && b.sameNeighbour([dir[0]], l)
    }

    sameNeighbour(dir, l){
      if (dir.some(x => !this[x])) return false//no tile in this direction
      const t = dir.reduce((t, x) => t + d.go[x], this.index)
      if (!this.connects(t, l)) return false
      if (dir.length == 1 || this[l].dimensions.includes(t)) return true
      //diagonal connection of different shapes can not cross another one or a lower layer connection, same as when generating
      const a = tiles[this.index + d.go[dir[0]]], b = tiles[this.index + d.go[dir[1]]]
      if (this.crossesLower(dir, l)) return false
      //generated shape always wins, from two chance connections the one going left up to right down wins
      if (!a.connects(b.index, l)) return true
      return !a[l].dimensions.includes(b.index) && dir.includes('left') == dir.includes('up')
    }

    connects(t, l){
      const dims = this[l].dimensions, other = tiles[t][l]
      //if (l == 'feature' && !dims.includes(t)) return false//features connect only within their own shape
      const drawn = c => c && (d.colors[c].width || l == 'flooring')
      if (!drawn(this[l].chosen) || !drawn(other.chosen)) return false//not drawn
      if (dims.includes(t)) return true
      if (!this[l].join || !other.join) return false//different shapes of any color in the layer connect only if both join
      //and only the way their shapes are built so side and diagonal links never mix, single tiles join by sides
      const diagonal = ![1, columns].includes(Math.abs(t - this.index))
      return [this[l], other].every(x => x.dimensions.length == 1 ? !diagonal : diagonalShape(x.dimensions) == diagonal)
    }

    //whether a diagonal from this tile in dir would cross a diagonal connection of a lower layer
    //crossing is fine if either end of the diagonal is part of the crossed blob, only raw crossings are not
    crossesLower(dir, l){
      const a = tiles[this.index + d.go[dir[0]]]
      const end = a.index + d.go[dir[1]]
      const layers = Object.keys(d.layers)//ordered from the lowest
      for (const low of layers.slice(0, layers.indexOf(l))){
        if (!a.sameNeighbour([opposite[dir[0]], dir[1]], low)) continue
        if (!a[low].group.includes(this.index) && !a[low].group.includes(end)) return true
      }
      return false
    }

    //fills group of every tile in the layer with all tiles connected to it
    groupConnected(l){
      if (this[l].group) return
      const group = [this.index]
      for (const t of group) for (const dir of allDirs){
        if (!tiles[t].sameNeighbour(dir, l)) continue
        const n = dir.reduce((n, x) => n + d.go[x], t)
        if (!group.includes(n)) group.push(n)
      }
      for (const t of group) tiles[t][l].group = group
    }

    //adds to given Set of tiles with tiles in the given radius from current tile
    findAffected(toEdit, radius){
      let movingTile = this.index, endTile = this.index
      this.left >= radius ? movingTile -= radius : movingTile -= this.left
      this.up >= radius ? movingTile -= radius * columns : movingTile -= this.up * columns
      toEdit.push(movingTile)
      this.right >= radius ? endTile += radius : endTile += this.right
      this.down >= radius ? endTile += radius * columns : endTile += this.down * columns
      while (movingTile != endTile){
        if (tiles[movingTile].right == tiles[endTile].right) {
          movingTile += d.columns
          if (tiles[movingTile].left >= radius * 2) movingTile -= radius * 2
          else movingTile -= tiles[movingTile].left
        }
        else movingTile++
        toEdit.push(movingTile)
      }
    }

    editSurroundings(surroundings, action = 0, colors){
      for (const t of surroundings){
        if (!action) for (const c of colors) tiles[t].banned[c] = true
        else for (const c of colors) tiles[t].positive[c] += action
      }
    }

    randomNeighbourFlooring() {
      const neighbours = [];
      this.findAffected(neighbours, 1);

      const validChoices = neighbours
        .map(t => tiles[t]?.flooring?.chosen)
        .filter(choice => choice && this.isPossible(choice, false));

      if (validChoices.length === 0) {
        return d.fillerFlooring;
      }

      const idx = Math.floor(Math.random() * validChoices.length);
      return validChoices[idx];
    }
  }

  c = document.getElementById('mapCanvas')
  ctx = c.getContext('2d')

  const dim = getDimension(d)
  c.width = columns * dim
  c.style.width = c.width + 'px'
  c.height = rows * dim
  c.style.height = c.height + 'px'
  ctx.strokeStyle = 'black'
//TODO separate generation and animation for more flexibility, functions returning inconsistent results when asking about loot, weird behaviour if tons of stuff has loot
  const opposite = {left: 'right', right: 'left', up: 'down', down: 'up'}
  const allDirs = [['left'], ['right'], ['up'], ['down'], ['left', 'up'], ['right', 'down'], ['left', 'down'], ['right', 'up']]
  const diagonalShape = dims => ![1, columns].includes(Math.abs(dims[1] - dims[0]))
  const tiles = []
  for (let i = 0; i < rows * columns; i++){
    tiles.push(new Tile(i))
  }

  function generateLayer(tiles, layer){
    let ungeneratedTiles = []
    for (let i = 0; i < rows * columns; i++){
      ungeneratedTiles.push(i)
    }
    for (let i = 0; i < rows * columns; i++){
      const idx = ungeneratedTiles.splice(Math.floor(Math.random() * ungeneratedTiles.length), 1)[0];
      tiles[idx].generate(layer);
    }
  }

  //layers generate from the lowest, each one grouped into blobs before the next one so it can avoid crossing them
  for (const l in d.layers){
    generateLayer(tiles, l)
    for (const t of tiles) t.groupConnected(l)
  }

  return tiles
}

//draws layers from the lowest, every blob at once so only its outside gets outlined
function drawMap(d, tiles){
  const dim = getDimension(d)
  //adds polygon in tile coordinates to the path, always clockwise so overlapping pieces of one blob fill as one
  const addPolygon = (path, t, points) => {
    const area = points.reduce((a, p, i) => a + p[0] * points[(i + 1) % points.length][1] - points[(i + 1) % points.length][0] * p[1], 0)
    if (area < 0) points = [...points].reverse()
    points.forEach((p, i) => path[i ? 'lineTo' : 'moveTo'](dim * (t.left + p[0]), dim * (t.up + p[1])))
    path.closePath()
  }
  for (const l in d.layers) for (const t of tiles){
    const tl = t[l]
    if (!tl.chosen || !d.colors[tl.chosen].width && l != 'flooring') continue//not drawn
    if (!tl.inset){//whole tiles, each outlined so the grid stays visible
      ctx.fillStyle = d.colors[tl.chosen].color
      ctx.fillRect(dim * t.left, dim * t.up, dim, dim)
      ctx.strokeRect(dim * t.left, dim * t.up, dim, dim)
      continue
    }
    if (tl.group[0] != t.index) continue//blob is drawn once from its first tile
    //outline twice as thick drawn first, the fill then covers its inner half and every line inside the blob
    const outline = new Path2D(), fills = {}
    for (const i of tl.group){
      const color = d.colors[tiles[i][l].chosen].color
      if (!fills[color]) fills[color] = new Path2D()
      for (const p of tiles[i].pieces(l)) for (const path of [outline, fills[color]]) addPolygon(path, tiles[i], p)
    }
    //round joins so the narrow wedge tips do not stick out as spikes
    Object.assign(ctx, {lineWidth: 2, lineJoin: 'round'})
    ctx.stroke(outline)
    Object.assign(ctx, {lineWidth: 1, lineJoin: 'miter'})
    for (const color in fills){
      ctx.fillStyle = color
      ctx.fill(fills[color])
    }
  }
}


function createDefaultDeck(){
  const d = {
    count: {},
    columns: 15,
    rows: 15,
    connectChance: 0.8,//chance that a shape joins adjacent shapes of the same layer that join too
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

  addColorD('grassland', 'flooring', '#8bc766', 50, [new Property(0, ['snow', 'desert', 'water'], 1), new Property(50, ['grassland'], 2)])
  addColorD('desert', 'flooring', '#ffffa5', 50, [new Property(0, ['snow', 'grassland', 'water'], 1), new Property(50, ['desert'], 2), new Property(0, ['woods'], 0)])
  addColorD('snow', 'flooring', '#ffffff', 50, [new Property(0, ['desert', 'grassland', 'water'], 1), new Property(50, ['snow'], 2)])
  addColorD('water', 'flooring', '#66bbdd', 50, [new Property(0, ['desert', 'grassland', 'snow'], 1), new Property(50, ['water'], 2), new Property(0, ['material', 'mountains', 'lake', 'woods', 'village', 'iron', 'gold', 'castle', 'castle2', 'castle3', 'fortification', 'fortification2', 'fortification3'], 0)])

  addColorD('mountains', 'element', '#a75f49', 5, [new Property(0, ['water'], 0), new Property(1, ['gold', 'iron', 'castle', 'castle2', 'castle3', 'fortification', 'fortification2', 'fortification3'], 0)], 3)
  addColorD('woods', 'element', '#bca26f', 7, [new Property(0, ['water', 'desert', 'village', 'iron', 'gold'], 0), new Property(1, ['castle', 'castle2', 'castle3', 'fortification', 'fortification2', 'fortification3'], 0)], 2)
  addColorD('lake', 'element', '#64e1e2', 5, [new Property(0, ['water', 'village', 'iron', 'gold', 'material', 'castle', 'castle2', 'castle3', 'fortification', 'fortification2', 'fortification3'], 0)], 2)

  addColorD('village', 'feature', '#fd7c7c', 5, [new Property(0, ['water', 'lake', 'woods'], 0)], 1, true)
  addColorD('iron', 'feature', 'LightGray', 4, [new Property(0, ['water', 'lake'], 0)])
  addColorD('gold', 'feature', '#c2ab35', 1, [new Property(0, ['water', 'lake', 'woods'], 0)])
  addColorD('castle', 'feature', 'Gray', 1, [new Property(0, ['water', 'lake', 'woods'], 0)])
  addColorD('castle2', 'feature', 'Gray', 1, [new Property(0, ['water', 'lake', 'woods'], 0)], 2)
  addColorD('castle3', 'feature', 'Gray', 1, [new Property(0, ['water', 'lake', 'woods'], 0)], 3)
  addColorD('fortification', 'feature', '#b2815c', 1, [new Property(0, ['water', 'lake', 'woods'], 0)])
  addColorD('fortification2', 'feature', '#b2815c', 1, [new Property(0, ['water', 'lake', 'woods'], 0)], 2)
  addColorD('fortification3', 'feature', '#b2815c', 1, [new Property(0, ['water', 'lake', 'woods'], 0)], 3)
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
  }
}
