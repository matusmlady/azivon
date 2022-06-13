dimension = 35
data = {
    count: {},
    instructions: {
      left: - 1,
      right: 1
    },
    list: [],
    flooring: {
      list: []
    },
    element: {
      list: []
    },
    feature: {
      list: []
    },
    columns: 15,
    rows: 15
  }
  data.loot = {
    list: [],
    maxLoot: function(){
      let tempMax = 0;
      for(const x of data.loot.list){
        if(tempMax < data.loot[x].length * dimension + Math.ceil(ctx.measureText(data.loot[x]).width)){
          tempMax = data.loot[x].length * dimension + Math.ceil(ctx.measureText(data.loot[x]).width)
        }
      }
      return tempMax + 23;
    }
  }
  class farba {////////////////////////////
  ///?shouldn't colorWidth = 0 mean display color = none
  //?different size of loot, probabilities, even return strings etc
    constructor(label, layer, color, ratio = 0, properties = [], colorWidth = 1, lootability = {loot: false}){
      this.label = label
      this.layer = layer
      this.color = color
      this.ratio = ratio
      this.properties = properties
      this.colorWidth = colorWidth
      data[layer].list.push(this.label)
      data.list.push(this.label)
      data.count[label] = 0
      this.lootability = lootability
      if (this.lootability.loot == true){
        data.loot.list.push(this.label)
      }
          
    }

  }
  
  data.grass = new farba("grass", "flooring", "#8BC766", 250, undefined, undefined, undefined)
  data.desert = new farba("desert", "flooring", "#FFFD7D", 50, [{action: 0, colors: "snow", radius: 3}, {action: 50, colors: "desert", radius: 3}, {action: 0, colors: "woods", radius: 0}], undefined, undefined)
  data.snow = new farba("snow", "flooring", "#FFFFFF", 50, [{action: 0, colors: "desert, sahara", radius: 3}, {action: 50, colors: "snow", radius: 3}], undefined, undefined)
  data.water = new farba("water", "flooring", "#5696C0", 5, [{action: 80, colors: "water", radius: 3}, {action: 0, colors: "material, mountains, lake, woods, village, metal, gold, castle", radius: 0}], undefined, undefined)

  data.noElement = new farba("noElement", "element", "none", 100, undefined, 0, undefined)
  data.mountains = new farba("mountains", "element", "#A75F49", 5, [{action: 0, colors: "water", radius: 0}], 3, undefined)
  data.woods = new farba("woods", "element", "#BCA26F", 5, [{action: 0, colors: "water, desert, village, metal, gold, castle", radius: 0}], 2, undefined)
  data.lake = new farba("lake", "element", "#64E1E2", 5, [{action: 0, colors: "water, village, metal, gold, castle, material", radius: 0}], 2, undefined)

  data.noFeature = new farba("noFeature", "feature", "none", 200, undefined, 0, undefined)
  data.village = new farba("village", "feature", "#FD7C7C", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], undefined, {loot: true})
  data.metal = new farba("metal", "feature", "#8E9EA5", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], undefined, undefined)
  data.gold = new farba("gold", "feature", "#C2AB35", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], undefined, undefined)
  data.castle = new farba("castle", "feature", "#444647", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], undefined, undefined)
  data.material = new farba("material", "feature", "#D494D0", 5, [{action: 0, colors: "water, lake", radius: 0}], undefined, undefined)
    
  mapMain(data.columns, data.rows);
  draw(data.columns, data.rows, dimension);
