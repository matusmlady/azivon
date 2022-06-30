dimension = 35
data = {
  count: {},
  instructions: {
    left: -1,
    right: 1,
  },
  colors: {},
  layers: {
    flooring: [],
    element: [],
    feature: [],
  },
  loot: {},
  columns: 15,
  rows: 15,
}

data.maxLoot = () => {
  let max = 0
  for (const l in data.loot) {
    const loot = data.loot[l]
    const value = loot.length * dimension + Math.ceil(ctx.measureText(loot).width)
    if (max < value) max = value
  }
  return max + 23
}

class farba {////////////////////////////
  ///?shouldn't colorWidth = 0 mean display color = none
  //?different size of loot, probabilities, even return strings etc
  constructor(label, layer, color, ratio = 0, properties = [], colorWidth = 1, loot){
    this.label = label
    this.layer = layer
    data.layers[layer].push(label)
    this.color = color
    this.ratio = ratio
    this.properties = properties
    this.colorWidth = colorWidth
    data.count[label] = 0
    this.loot = loot
    if (this.loot) { // Works because values are truthy. https://developer.mozilla.org/en-US/docs/Glossary/Truthy
      data.loot[label] = []
    }
  }
}

function makeColor(label, ...rest) {
  data.colors[label] = new farba(label, ...rest)
}

makeColor("grass", "flooring", "#8BC766", 250, undefined, undefined, undefined)
makeColor("desert", "flooring", "#FFFFA5", 50, [{action: 0, colors: "snow", radius: 3}, {action: 50, colors: "desert", radius: 3}, {action: 0, colors: "woods", radius: 0}], undefined, undefined)
makeColor("snow", "flooring", "#FFFFFF", 50, [{action: 0, colors: "desert, sahara", radius: 3}, {action: 50, colors: "snow", radius: 3}], undefined, undefined)
makeColor("water", "flooring", "#66BBDD", 5, [{action: 80, colors: "water", radius: 3}, {action: 0, colors: "material, mountains, lake, woods, village, metal, gold, castle", radius: 0}], undefined, undefined)

makeColor("noElement", "element", "none", 100, undefined, 0, undefined)
makeColor("mountains", "element", "#A75F49", 5, [{action: 0, colors: "water", radius: 0}], 3, undefined)
makeColor("woods", "element", "#BCA26F", 5, [{action: 0, colors: "water, desert, village, metal, gold, castle", radius: 0}], 2, undefined)
makeColor("lake", "element", "#64E1E2", 5, [{action: 0, colors: "water, village, metal, gold, castle, material", radius: 0}], 2, undefined)

makeColor("noFeature", "feature", "none", 200, undefined, 0, undefined)
makeColor("village", "feature", "#FD7C7C", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], undefined, {})
makeColor("metal", "feature", "#8E9EA5", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], undefined, undefined)
makeColor("gold", "feature", "#C2AB35", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], undefined, undefined)
makeColor("castle", "feature", "#AAAAAA", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], undefined, undefined)
makeColor("castle2", "feature", "#AAAAAA", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], 2, undefined)
makeColor("material", "feature", "#D494D0", 5, [{action: 0, colors: "water, lake", radius: 0}], undefined, undefined)

mapMain(data.columns, data.rows)//////removed ;
draw(data.columns, data.rows, dimension)/////also here



















































