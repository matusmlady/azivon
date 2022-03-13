count = 0
propertyCount = []
colorList = []
propertyList = []

function addColor(name = "label"+count, type = "flooring", color = "#008000", ratio = 1, properties = [], sirka = 1, loot = false){
  colorList.push("label"+count)
  propertyList[count] = []
  
  const att = document.createAttribute("id")
  att.value = "label" + count
  const elmnt = document.createElement("div")
  elmnt.setAttributeNode(att)
  document.getElementById('colorList').appendChild(elmnt)

  document.getElementById('label'+count).innerHTML += "<label for='name"+count+"'>name:</label><input id='name"+count+"' type='text' pattern='[A-Za-z][A-Za-z0-9]*' maxlength='20' minlength='1' value='"+name+"' required>"
  document.getElementById('label'+count).innerHTML += "<label for='type"+count+"'>type(layer):</label><select id='type"+count+"'><option value='"+type+"' selected hidden>"+type+"</option><option value='flooring'>flooring</option><option value='element'>element</option><option value='feature'>feature</option></select>"
  document.getElementById('label'+count).innerHTML += "<label for='color"+count+"'>color:</label><input id='color"+count+"' type='color' value='"+color+"' required>"
  document.getElementById('label'+count).innerHTML += "<label for='ratio"+count+"'>ratio:</label><input id='ratio"+count+"' type='number' min='0' max='10000' value='"+ratio+"' size='4' required>"
  document.getElementById('label'+count).innerHTML += "<label for='sirka"+count+"'>width(sirka):</label><input id='sirka"+count+"' type='number' min='0' max='100' value='"+sirka+"'  size='3' required>"
  document.getElementById('label'+count).innerHTML += "lootability:"
  document.getElementById('label'+count).innerHTML += "<label for='loot"+count+"'>loot:</label><select id='loot"+count+"'><option value='"+loot+"' selected hidden>"+loot+"</option><option value='false'>false</option><option value='true'>true</option></select></br>"
  
  document.getElementById('label'+count).innerHTML += "<input id='addPropertyButton"+count+"' type='button' value='add property' onclick='addProperty("+count+")'></br>"
  document.getElementById('label'+count).innerHTML += "<div id='properties"+count+"'></div>"

  for (let x of properties){
    addProperty(count, x.action, x.colors, x.radiuses)
  }

  document.getElementById('label'+count).innerHTML += "<input id='deleteColorButton"+count+"' type='button' value='delete color' onclick='document.getElementById(`label"+count+"`).remove();colorList.splice(colorList.indexOf(`label"+count+"`),1);propertyList["+count+"] = []'></br></br>"
  
  count++;
}

function addProperty(arg, action = 0, colors = document.getElementById("name"+arg).value, radiuses = "0"){
  if (propertyCount[arg] == undefined){
    propertyCount[arg] = 0
  } else {
    propertyCount[arg]++
  }
  propertyList[arg].push("C"+arg+"P"+propertyCount[arg])
  
  const att = document.createAttribute("id")
  att.value = "C" + arg + "P" + propertyCount[arg]
  const elmnt = document.createElement("div")
  elmnt.setAttributeNode(att)
  document.getElementById('properties'+arg).appendChild(elmnt)

  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='actionC"+arg+"P"+propertyCount[arg]+"'>action:</label><input id='actionC"+arg+"P"+propertyCount[arg]+"' type='number' min='-10000' max='10000' value='"+action+"' size='5' required>"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='colorsC"+arg+"P"+propertyCount[arg]+"'>colors:</label><input id='colorsC"+arg+"P"+propertyCount[arg]+"' type='text' pattern='[A-Za-z][A-Za-z0-9]{0,29}(?:, (?:[A-Za-z][A-Za-z0-9]{0,29}))*' value='"+colors+"' required>"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='radiusesC"+arg+"P"+propertyCount[arg]+"'>radiuses:</label><input id='radiusesC"+arg+"P"+propertyCount[arg]+"' type='text' pattern='(?:[1-9][0-9]{0,2}|0)(?:, (?:[1-9][0-9]{0,2}|0))*' value='"+radiuses+"' required>"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<input id='deletePropertyC"+arg+"P"+propertyCount[arg]+"' type='button' value='remove' onclick='document.getElementById(`C"+arg+"P"+propertyCount[arg]+"`).remove();propertyList["+arg+"].splice(propertyList["+arg+"].indexOf(`C"+arg+"P"+propertyCount[arg]+"`),1)'></br>"
}

function reset(){
  //?totalny reset data objektu napriec generaciami mapy; xbytocne vzdy nanovo cely objekt
  data = {
    count: {},
    instructions: {
      vlavo: - 1,
      vpravo: 1
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
    }
  }

  data.loot = new Object()//////////////////////novy sposob zapisu tvorby objektov
  data.loot.list = []
  data.loot.maxLoot = function(){
    let tempMax = 0;
    for(const x of data.loot.list){
      if(tempMax < data.loot[x].length * dimension + Math.ceil(ctx.measureText(data.loot[x]).width)){
        tempMax = data.loot[x].length * dimension + Math.ceil(ctx.measureText(data.loot[x]).width)
      }
    }
    return tempMax + 23;
  }
  //?hory ako by generovali loot?, 1 za policko vs 1 za 1ks viac polickoveho elementu

}

function readData(){
  class farba {
    constructor(label, type, color, ratio = 0, properties = [], sirka = 1, lootability = {loot: false}){
      this.label = label
      this.type = type
      this.color = color
      this.ratio = ratio
      this.properties = properties
      this.sirka = sirka
      data[type].list.push(this.label)
      data.list.push(this.label)
      data.count[label] = 0
      this.lootability = lootability
      if (this.lootability.loot == true){
        data.loot.list.push(this.label)
      }
          
    }

  }
  
  for (const x of colorList){
    const currentName = document.getElementById(x.replace("label","name")).value;
    const currentType = document.getElementById(x.replace("label","type")).value;
    const currentColor = document.getElementById(x.replace("label","color")).value;
    const currentRatio = document.getElementById(x.replace("label","ratio")).value;
    const currentProperties = []
    for (const y of propertyList[x.replace("label","")]){
      currentProperties.push({action: Number(document.getElementById("action"+y).value), colors: document.getElementById("colors"+y).value, radiuses: document.getElementById("radiuses"+y).value})
    }
    const currentSirka = document.getElementById(x.replace("label","sirka")).value;
    const currentLoot = document.getElementById(x.replace("label","loot")).value;
    data[currentName] = new farba(currentName, currentType, currentColor, Number(currentRatio), currentProperties, Number(currentSirka), {loot: currentLoot=="true"?true:false})
  }
  
  //data.tst = new farba("tst", "flooring", "orange", 300, [{action: 0, colors: ["tst"], radiuses: [1]}], undefined, undefined)
 
  //data.desert = new farba("desert", "flooring", "yellow", 25, [{action: 0, colors: ["snow"], radiuses: [1, 2, 3]}, {action: 50, colors: ["desert"], radiuses: [1, 2, 3]}, {action: 0, colors: ["woods"], radiuses: [0]}], undefined, undefined)
  
  /*data.snow = new farba("snow", "flooring", "white", 50, [{action: 0, colors: ["desert", "sahara"], radiuses: [1, 2, 3]}, {action: 50, colors: ["snow"], radiuses: [1, 2, 3]}], undefined, undefined)
  data.grass = new farba("grass", "flooring", "green", 250, undefined, undefined, undefined)
  data.water = new farba("water", "flooring", "blue", 5, [{action: 80, colors: ["water"], radiuses: [1, 2, 3]}, {action: 0, colors: ["material", "mountains", "lake", "woods", "village", "metal", "gold", "castle"], radiuses: [0]}], undefined, undefined)
  data.sahara = new farba("sahara", "flooring", "gold", 25, [{action: 0, colors: ["snow"], radiuses: [1, 2, 3]}, {action: 40, colors: ["sahara"], radiuses: [1, 2, 3]}, {action: 10, colors: ["water"], radiuses: [1, 2, 3]}, {action: 0, colors: ["woods"], radiuses: [0]}], undefined, undefined)
  //pridat flooring nic = none
  data.mountains = new farba("mountains", "element", "brown", 5, [{action: 0, colors: ["water"], radiuses: [0]}], 3, undefined)
  data.woods = new farba("woods", "element", "burlywood", 5, [{action: 0, colors: ["water", "desert", "sahara", "village", "metal", "gold", "castle"], radiuses: [0]}], 2, undefined)
  data.lake = new farba("lake", "element", "aqua", 5, [{action: 0, colors: ["water", "village", "metal", "gold", "castle", "material"], radiuses: [0]}], 2, undefined)*/
  
  
  //data.noElement = new farba("noElement", "element", "none", 100, undefined, 0, undefined)

  //data.noFeature = new farba("noFeature", "feature", "none", 200, undefined, 0, undefined)
  /*data.village = new farba("village", "feature", "red", 1, [{action: 0, colors: ["water", "woods", "lake"], radiuses: [0]}], undefined, {loot: true})
  data.metal = new farba("metal", "feature", "silver", 1, [{action: 0, colors: ["water", "woods", "lake"], radiuses: [0]}], undefined, undefined)
  data.gold = new farba("gold", "feature", "goldenrod", 1, [{action: 0, colors: ["water", "woods", "lake"], radiuses: [0]}], undefined, undefined)
  data.castle = new farba("castle", "feature", "#3B3131", 1, [{action: 0, colors: ["water", "woods", "lake"], radiuses: [0]}], undefined, undefined)
  data.material = new farba("material", "feature", "pink", 5, [{action: 0, colors: ["water", "lake"], radiuses: [0]}], undefined, undefined)*/
  
  //ways of color representation understand and ability to use them hexa, text
}

function unofficialMain(columnsArg = Number(document.getElementById("columns").value), rowsArg = Number(document.getElementById("rows").value)){
  reset()
  readData()
  main(columnsArg, rowsArg)
  draw(columnsArg, rowsArg, dimension)
  
  console.log(tiles)
  console.log(data)
  console.log(colorList)
  console.log(propertyList)
  console.log(propertyCount)
}

function initial(columnsArg, rowsArg){
  reset()
  class farba {////////////////////////////
  ///?shouldn't sirka = 0 mean display color = none
  //?different size of loot, probabilities, even return strings etc
    constructor(label, type, color, ratio = 0, properties = [], sirka = 1, lootability = {loot: false}){
      this.label = label
      this.type = type
      this.color = color
      this.ratio = ratio
      this.properties = properties
      this.sirka = sirka
      data[type].list.push(this.label)
      data.list.push(this.label)
      data.count[label] = 0
      this.lootability = lootability
      if (this.lootability.loot == true){
        data.loot.list.push(this.label)
      }
          
    }

  }
  data = {
    count: {},
    instructions: {
      vlavo: - 1,
      vpravo: 1
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
    }
  }

  data.loot = new Object()//////////////////////novy sposob zapisu tvorby objektov
  data.loot.list = []
  data.loot.maxLoot = function(){
    let tempMax = 0;
    for(const x of data.loot.list){
      if(tempMax < data.loot[x].length * dimension + Math.ceil(ctx.measureText(data.loot[x]).width)){
        tempMax = data.loot[x].length * dimension + Math.ceil(ctx.measureText(data.loot[x]).width)
      }
    }
    return tempMax + 23;
  }
  
  //?colors : self miesto cele meno
  //pridat flooring nic = none
  //?use new format of adding colors (see below ) also in map.js
  //?new way of handling radiuses only the highest number; => different input type, todoMinus obsolete
  //?vlastnosti napr ze nieco v hre davam hracovi = nespawnu sa automaticky dve na rovnakom policku
  
  //?poriesit to nejak ze 3 fillers budu uplne hore a tj labels0-2 nebude mozne banovat etc
  //?zakazat v patternoch pouzitie grass, noFeature, noElement aj v name aj v properties
  
  
  addColor("grass", "flooring", "#8BC766", 250, [], 1, false)
  document.getElementById("color"+(count-1)).disabled = "true"
  document.getElementById("color"+(count-1)).size = "1"
  document.getElementById("sirka"+(count-1)).disabled = "true"
  document.getElementById("ratio"+(count-1)).min = "1"
  document.getElementById("type"+(count-1)).disabled = "true"
  document.getElementById("name"+(count-1)).disabled = "true"
  document.getElementById("addPropertyButton"+(count-1)).disabled = "true"
  document.getElementById("deleteColorButton"+(count-1)).disabled = "true"
    
  addColor("desert", "flooring", "#FFFD7D", 50, [{action: 0, colors: "snow", radiuses: "1, 2, 3"}, {action: 0, colors: "woods", radiuses: "0"}, {action: 50, colors: "desert", radiuses: "1, 2, 3"}], 1, false)
  addColor("snow", "flooring", "#FFFFFF", 50, [{action: 0, colors: "desert", radiuses: "1, 2, 3"}, {action: 50, colors: "snow", radiuses: "1, 2, 3"}], 1, false)
  addColor("water", "flooring", "#5696C0", 5, [{action: 80, colors: "water", radiuses: "1, 2, 3"}, {action: 0, colors: "material, mountains, lake, woods, village, metal, gold, castle", radiuses: "0"}], 1, false)
  
  addColor("noElement", "element", "#000000", 100, [], 0, false)
  document.getElementById("color"+(count-1)).type = "text"
  document.getElementById("color"+(count-1)).value = "none"
  document.getElementById("color"+(count-1)).disabled = "true"
  document.getElementById("color"+(count-1)).size = "1"
  document.getElementById("sirka"+(count-1)).disabled = "true"
  document.getElementById("ratio"+(count-1)).min = "1"
  document.getElementById("type"+(count-1)).disabled = "true"
  document.getElementById("name"+(count-1)).disabled = "true"
  document.getElementById("addPropertyButton"+(count-1)).disabled = "true"
  document.getElementById("deleteColorButton"+(count-1)).disabled = "true"
  
  addColor("mountains", "element", "#A75F49", 5, [{action: 0, colors: "water", radiuses: "0"}, {action: 1, colors: "metal, gold, castle", radiuses: "0"}], 3, false)
  addColor("woods", "element", "#BCA26F", 5, [{action: 0, colors: "water, desert, village, metal, gold, castle", radiuses: "0"}], 2, false)
  addColor("lake", "element", "#64E1E2", 5, [{action: 0, colors: "water, village, metal, gold, castle, material", radiuses: "0"}], 2, false)
  
  ///?what if someone bans noFeature or noElement xd
  //vypisovat uzivatelovi ked je v js error => aby dal spat zmenu ktoru vykonal
  //nastavit pri generovani aby nemohlo byt no feature zabanovane = automaticke odbanovanie / asi bud stacit dat mu z 0 hodnotu 1 vramci pomeru vzdy / desatinne cislo 0.0000000001 aby bolo mozne nemat error a zaroven plnu mapu ak to chce uzivatel
  
  addColor("noFeature", "feature", "#000000", 200, [], 0, false)
  document.getElementById("color"+(count-1)).type = "text"
  document.getElementById("color"+(count-1)).value = "none"
  document.getElementById("color"+(count-1)).disabled = "true"
  document.getElementById("color"+(count-1)).size = "1"
  document.getElementById("sirka"+(count-1)).disabled = "true"
  document.getElementById("ratio"+(count-1)).min = "1"
  document.getElementById("type"+(count-1)).disabled = "true"
  document.getElementById("name"+(count-1)).disabled = "true"
  document.getElementById("addPropertyButton"+(count-1)).disabled = "true"
  document.getElementById("deleteColorButton"+(count-1)).disabled = "true"
  
  addColor("village", "feature", "#FD7C7C", 1, [{action: 0, colors: "water, woods, lake", radiuses: "0"}], 1, true)
  addColor("metal", "feature", "#8E9EA5", 1, [{action: 0, colors: "water, woods, lake", radiuses: "0"}], 1, false)
  addColor("gold", "feature", "#C2AB35", 1, [{action: 0, colors: "water, woods, lake", radiuses: "0"}], 1, false)
  addColor("castle", "feature", "#444647", 1, [{action: 0, colors: "water, woods, lake", radiuses: "0"}], 1, false)
  addColor("material", "feature", "#D494D0", 1, [{action: 0, colors: "water, lake", radiuses: "0"}], 1, false)

  //ways of color representation understand and ability to use them hexa, text
  
  readData()
  main(columnsArg, rowsArg)
  draw(columnsArg, rowsArg, dimension)
}

//fillers are deletable via properties of other colors; automatically add a filler when length of possible outcomes is 0 instead of errors

//heck ci nie su dvojmo a ci vobec existuju take farby ktore tu napisem vo vlastnostiach; zdoraznit ze aby sa dalo s nimi pracovat treba ich najprv zadefinovat aspon s pomerom 0/?upravit aby sa sami vygenerovali taketo farby-->

//<!-- check ci  niesu dvojmo okruhy vo vlastnostiach

//check rovnake nazvy farieb

//function to read a provide the stuff on screen to map.js

//miesto pisania vlastnosti do dvch farieb dvojmo aby sa blokovali alebo nieco pridat spolocne vlastnosti/upravit priamo v js povodny sposob dvojmo moze byt obsolete/len spravit nadstavbu v html ze sa proste vlastnost berie ako spolocna a prida sa automaticky vsetkym



/*
<!--
oninvalid='setCustomValidity("Please start with a letter, then you can also use numbers.")'
oninvalid='setCustomValidity("Enter one ore more numbers separated by a comma and a space.")' 
autocomplete='off'

-->*/


//ostranit problem ze treba furt scrollovat etc userfriendliness

//way of detecting errors and telling them to the user, f.e. two colors with a same name













































