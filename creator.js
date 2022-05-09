function append(){
  const att = document.createAttribute("id")
  att.value = "label" + count
  const elmnt = document.createElement("div")
  elmnt.setAttributeNode(att)
  document.getElementById('colorList').appendChild(elmnt)
}
function insert(){
  const att = document.createAttribute("id")
  att.value = "label" + count
  const elmnt = document.createElement("div")
  elmnt.setAttributeNode(att)
  document.getElementById('colorList').insertBefore(elmnt, document.getElementById('colorList').children[0])
}

function addColor(name = "label"+count, layer = "flooring", color = "#8BC766", ratio = 1, properties = [], colorWidth = 1, loot = false){
  colorList.push("label"+count)
  propertyList[count] = []
  
  document.getElementById('label'+count).innerHTML += "</br></br><label for='ratio"+count+"'></label><input id='ratio"+count+"' type='number' min='0' max='10000' value='"+ratio+"' size='3' required>"
  
  document.getElementById('label'+count).innerHTML += "<label for='color"+count+"'></label><input id='color"+count+"' type='color' value='"+color+"' required>"
  document.getElementById('label'+count).innerHTML += "<label for='name"+count+"'></label><input id='name"+count+"' type='text' pattern='(?:[A-Za-z][A-Za-z0-9]*)(?<!noFeature|grass|noElement)' maxlength='20' minlength='1' value='"+name+"' size='15' required>"
  document.getElementById('label'+count).innerHTML += "<label for='layer"+count+"'></label><select id='layer"+count+"'><option value='"+layer+"' selected hidden>"+layer+"</option><option value='flooring'>flooring</option><option value='element'>element</option><option value='feature'>feature</option></select>"
  

  document.getElementById('label'+count).innerHTML += "<label for='colorWidth"+count+"'>width:</label><input id='colorWidth"+count+"' type='number' min='0' max='100' value='"+colorWidth+"'  size='2' required>"
  document.getElementById('label'+count).innerHTML += "<label for='loot"+count+"'></label><select id='loot"+count+"'><option value='"+loot+"' selected hidden>"+(loot==true?'loot':'nothing')+"</option><option value='false'>nothing</option><option value='true'>loot</option></select></br>"
  
    document.getElementById('label'+count).innerHTML += "<input id='addPropertyButton"+count+"' type='button' value='add property' onclick='addProperty("+count+")' onfocus='this.blur()'>"
  document.getElementById('label'+count).innerHTML += "<input id='deleteColorButton"+count+"' type='button' value='delete color' onclick='document.getElementById(`label"+count+"`).remove();colorList.splice(colorList.indexOf(`label"+count+"`),1);propertyList["+count+"] = []'>"
  
  document.getElementById('label'+count).innerHTML += "<div id='properties"+count+"'></div>"

  for (let x of properties){
    addProperty(count, x.action, x.colors, x.radius)
  }

//input {background-color: black; color: white; border:none}
  
  count++;
}

function addProperty(arg, action = 0, colors = document.getElementById("name"+arg).value, radius = 0){
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

  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='actionC"+arg+"P"+propertyCount[arg]+"'>do</label><input id='actionC"+arg+"P"+propertyCount[arg]+"' type='number' min='-10000' max='10000' value='"+action+"' size='3' required>"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='colorsC"+arg+"P"+propertyCount[arg]+"'>for</label><input id='colorsC"+arg+"P"+propertyCount[arg]+"' type='text' pattern='[A-Za-z][A-Za-z0-9]{0,29}(?<!noFeature|grass|noElement)(?:, (?:[A-Za-z][A-Za-z0-9]{0,29}(?<!noFeature|grass|noElement)))*' value='"+colors+"' size='15' required>"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='radiusC"+arg+"P"+propertyCount[arg]+"'>in</label><input id='radiusC"+arg+"P"+propertyCount[arg]+"' type='number' min='0' max='100' size='3' value='"+radius+"' required>"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<input id='deletePropertyC"+arg+"P"+propertyCount[arg]+"' type='button' value='remove' onclick='document.getElementById(`C"+arg+"P"+propertyCount[arg]+"`).remove();propertyList["+arg+"].splice(propertyList["+arg+"].indexOf(`C"+arg+"P"+propertyCount[arg]+"`),1)'></br>"
}





function reset(){
  data.count = {}
  data.list = []
  data.flooring = {
    list: []
  }
  data.element = {
    list: []
  }
  data.feature = {
    list: []
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
  //?hory ako by generovali loot?, 1 za policko vs 1 za 1ks viac polickoveho elementu
}




function readData(){
  class farba {
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
  
  for (const x of colorList){
    const currentName = document.getElementById(x.replace("label","name")).value;
    const currentLayer = document.getElementById(x.replace("label","layer")).value;
    const currentColor = document.getElementById(x.replace("label","color")).value;
    const currentRatio = document.getElementById(x.replace("label","ratio")).value;
    const currentProperties = []
    for (const y of propertyList[x.replace("label","")]){
      currentProperties.push({action: Number(document.getElementById("action"+y).value), colors: document.getElementById("colors"+y).value, radius: document.getElementById("radius"+y).value})
    }
    const currentColorWidth = document.getElementById(x.replace("label","colorWidth")).value;
    const currentLoot = document.getElementById(x.replace("label","loot")).value;
    data[currentName] = new farba(currentName, currentLayer, currentColor, Number(currentRatio), currentProperties, Number(currentColorWidth), {loot: currentLoot=="true"?true:false})
  }
  
  data.columns = Number(document.getElementById("columns").value)
  data.rows = Number(document.getElementById("rows").value)
}




function creatorMain(){
  reset()
  readData()
  mapMain(data.columns, data.rows)
  draw(data.columns, data.rows, dimension)

  /*
  console.log(tiles)
  console.log(data)
  console.log(colorList)
  console.log(propertyList)
  console.log(propertyCount)
  */
}




function exportSetup(){
  reset()
  readData()
  data.fillerElementIndex = colorList.indexOf("label4")
    data.fillerFeatureIndex = colorList.indexOf("label8")
      data.fillerFlooringIndex = colorList.indexOf("label0")
  if (typeof url !== 'undefined'){
    window.URL.revokeObjectURL(url);
  }
  let json = JSON.stringify(data)
  
  let exportJson = new Blob([json], {type: 'text/json'});
  url = window.URL.createObjectURL(exportJson);
  document.getElementById('fileExport1').href = url;
    document.getElementById('fileExport2').href = url;
  //document.getElementById('fileExport2').setAttribute('href', 'data:text/plain;charset=utf-8, '+ encodeURIComponent(json))

  let tdy = new Date()
  let nameString = 'azivon-'+tdy.getFullYear()+'-'+(tdy.getMonth()+1)+'-'+tdy.getDate()+'-'+tdy.getHours()+'-'+tdy.getMinutes()+'-'+tdy.getSeconds()+'.json'
  document.getElementById('fileExport1').download = nameString;
    document.getElementById('fileExport2').download = nameString;
}


function importSetup(){
    document.getElementById("fileInput").files[0].text().then(function(value){
      try{
        data = JSON.parse(value);
        //document.getElementById('colorList').innerHTML = ''
      }catch (e){
          console.log("double parse error", e)
      } finally {
        fileUploaded()
        document.getElementById("columns").value = data.columns;
        document.getElementById("rows").value = data.rows;
        creatorMain()
      }
    }
  )
}


function fileUploaded(){
  //?try catch error handling when importing invalid file
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
  count = 0
  propertyCount = []
  colorList = []
  propertyList = []
  
  document.getElementById('colorList').innerHTML = ''
  console.log("deletion success")
  for (const x of data.list){
    append()
    const temp = data[x]
    addColor(temp.label, temp.layer, temp.color, temp.ratio, temp.properties, temp.colorWidth, temp.lootability.loot)
  }
  
  //////////document.getElementById("color"+(data.fillerFlooringIndex)).disabled = "true"//////////////////////////////
  document.getElementById("colorWidth"+(data.fillerFlooringIndex)).disabled = "true"
  document.getElementById("ratio"+(data.fillerFlooringIndex)).min = "1"
  document.getElementById("layer"+(data.fillerFlooringIndex)).disabled = "true"
  document.getElementById("name"+(data.fillerFlooringIndex)).disabled = "true"
  document.getElementById("addPropertyButton"+(data.fillerFlooringIndex)).remove()
  document.getElementById("deleteColorButton"+(data.fillerFlooringIndex)).remove()
  
  document.getElementById("color"+(data.fillerElementIndex)).type = "text"
  document.getElementById("color"+(data.fillerElementIndex)).value = "none"
  document.getElementById("color"+(data.fillerElementIndex)).disabled = "true"
  document.getElementById("color"+(data.fillerElementIndex)).size = "1"
  document.getElementById("colorWidth"+(data.fillerElementIndex)).disabled = "true"
  document.getElementById("ratio"+(data.fillerElementIndex)).min = "1"
  document.getElementById("layer"+(data.fillerElementIndex)).disabled = "true"
  document.getElementById("name"+(data.fillerElementIndex)).disabled = "true"
  document.getElementById("addPropertyButton"+(data.fillerElementIndex)).remove()
  document.getElementById("deleteColorButton"+(data.fillerElementIndex)).remove()
  
  document.getElementById("color"+(data.fillerFeatureIndex)).type = "text"
  document.getElementById("color"+(data.fillerFeatureIndex)).value = "none"
  document.getElementById("color"+(data.fillerFeatureIndex)).disabled = "true"
  document.getElementById("color"+(data.fillerFeatureIndex)).size = "1"
  document.getElementById("colorWidth"+(data.fillerFeatureIndex)).disabled = "true"
  document.getElementById("ratio"+(data.fillerFeatureIndex)).min = "1"
  document.getElementById("layer"+(data.fillerFeatureIndex)).disabled = "true"
  document.getElementById("name"+(data.fillerFeatureIndex)).disabled = "true"
  document.getElementById("addPropertyButton"+(data.fillerFeatureIndex)).remove()
  document.getElementById("deleteColorButton"+(data.fillerFeatureIndex)).remove()
  
}




function initial(columnsArg, rowsArg){
  count = 0
  propertyCount = []
  colorList = []
  propertyList = []
  //reset()
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
    columns: columnsArg,
    rows: rowsArg,
    loot: {
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
  }
  
  //?colors : self miesto cele meno
  //?????pridat flooring nic = none
  //?vlastnosti napr ze nieco v hre davam hracovi = nespawnu sa automaticky dve na rovnakom policku
  
  addColor("grass", "flooring", "#8BC766", 250, [], 1, false, append())
  ////////////////////////document.getElementById("color"+(count-1)).disabled = "true"
  document.getElementById("colorWidth"+(count-1)).disabled = "true"
  document.getElementById("ratio"+(count-1)).min = "1"
  document.getElementById("layer"+(count-1)).disabled = "true"
  document.getElementById("name"+(count-1)).disabled = "true"
  document.getElementById("addPropertyButton"+(count-1)).remove()
  document.getElementById("deleteColorButton"+(count-1)).remove()
  data.fillerFlooring = 'label'+(count-1)
  data.fillerFlooringIndex = colorList.indexOf(data.fillerFlooring)
    
  addColor("desert", "flooring", "#FFFFA5", 50, [{action: 0, colors: "snow", radius: 3}, {action: 0, colors: "woods", radius: 0}, {action: 50, colors: "desert", radius: 3}], 1, false, append())
  addColor("snow", "flooring", "#FFFFFF", 50, [{action: 0, colors: "desert", radius: 3}, {action: 50, colors: "snow", radius: 3}], 1, false, append())
  addColor("water", "flooring", "#66BBDD", 5, [{action: 80, colors: "water", radius: 3}, {action: 0, colors: "material, mountains, lake, woods, village, metal, gold, castle", radius: 0}], 1, false, append())//#5696C0
  
  addColor("noElement", "element", "#000000", 100, [], 0, false, append())
  document.getElementById("color"+(count-1)).type = "text"
  document.getElementById("color"+(count-1)).value = "none"
  document.getElementById("color"+(count-1)).disabled = "true"
  document.getElementById("color"+(count-1)).size = "1"
  document.getElementById("colorWidth"+(count-1)).disabled = "true"
  document.getElementById("ratio"+(count-1)).min = "1"
  document.getElementById("layer"+(count-1)).disabled = "true"
  document.getElementById("name"+(count-1)).disabled = "true"
  document.getElementById("addPropertyButton"+(count-1)).remove()
  document.getElementById("deleteColorButton"+(count-1)).remove()
  data.fillerElement = 'label'+(count-1)
  data.fillerElementIndex = colorList.indexOf(data.fillerElement)
  
  addColor("mountains", "element", "#A75F49", 5, [{action: 0, colors: "water", radius: 0}, {action: 1, colors: "metal, gold, castle", radius: 0}], 3, false, append())
  addColor("woods", "element", "#BCA26F", 7, [{action: 0, colors: "water, desert, village, metal, gold, castle", radius: 0}], 2, false, append())
  addColor("lake", "element", "#64E1E2", 5, [{action: 0, colors: "water, village, metal, gold, castle, castle2, material", radius: 0}], 2, false, append())
  
  addColor("noFeature", "feature", "#000000", 200, [], 0, false, append())
  document.getElementById("color"+(count-1)).type = "text"
  document.getElementById("color"+(count-1)).value = "none"
  document.getElementById("color"+(count-1)).disabled = "true"
  document.getElementById("color"+(count-1)).size = "1"
  document.getElementById("colorWidth"+(count-1)).disabled = "true"
  document.getElementById("ratio"+(count-1)).min = "1"
  document.getElementById("layer"+(count-1)).disabled = "true"
  document.getElementById("name"+(count-1)).disabled = "true"
  document.getElementById("addPropertyButton"+(count-1)).remove()
  document.getElementById("deleteColorButton"+(count-1)).remove()
  data.fillerFeature = 'label'+(count-1)
  data.fillerFeatureIndex = colorList.indexOf(data.fillerFeature)
  
  addColor("village", "feature", "#FD7C7C", 6, [{action: 0, colors: "water, woods, lake", radius: 0}], 1, true, append())
  addColor("metal", "feature", "#8E9ED1", 1, [{action: 0, colors: "water, lake", radius: 0}], 1, false, append())
  addColor("gold", "feature", "#C2AB35", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], 1, false, append())
  addColor("castle", "feature", "#AAAAAA", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], 1, false, append())
  addColor("castle2", "feature", "#AAAAAA", 1, [{action: 0, colors: "water, woods, lake", radius: 0}], 2, false, append())
  addColor("material", "feature", "#D494D0", 6, [{action: 0, colors: "water, lake", radius: 0}], 1, false, append())

  document.getElementById("columns").value = data.columns
  document.getElementById("rows").value = data.rows
  
  readData()
  mapMain(columnsArg, rowsArg)
  draw(columnsArg, rowsArg, dimension)
}

initial(15, 15)

  //vypisovat uzivatelovi ked je v js error => aby dal spat zmenu ktoru vykonal
  //desatinne cislo 0.0000000001 aby bolo mozne nemat error a zaroven plnu mapu ak to chce uzivatel -> ked chce mapu full features
  
//heck ci nie su dvojmo a ci vobec existuju take farby ktore tu napisem vo vlastnostiach; zdoraznit ze aby sa dalo s nimi pracovat treba ich najprv zadefinovat aspon s pomerom 0/?upravit aby sa sami vygenerovali taketo farby-->

//check ci  niesu dvojmo okruhy vo vlastnostiach;check rovnake nazvy farieb

//miesto pisania vlastnosti do dvch farieb dvojmo aby sa blokovali alebo nieco pridat spolocne vlastnosti/upravit priamo v js povodny sposob dvojmo moze byt obsolete/len spravit nadstavbu v html ze sa proste vlastnost berie ako spolocna a prida sa automaticky vsetkym

  //ways of color representation understand and ability to use them hexa, text
  
//oninvalid='setCustomValidity("Please start with a letter, then you can also use numbers.")'
//oninvalid='setCustomValidity("Enter one ore more numbers separated by a comma and a space.")' 
//autocomplete='off'



//ostranit problem ze treba furt scrollovat etc userfriendliness

//way of detecting errors and telling them to the user, f.e. two colors with a same name













































