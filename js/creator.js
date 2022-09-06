function addColor(name = 'label' + count, layer = 'flooring', color = '#8BC766', ratio = 1, properties = [], colorWidth = 1, loot = false){
  const e = document.createElement('div')
  const a = document.createAttribute('id')
  a.value = 'label' + count
  e.setAttributeNode(a)
  document.getElementById('colorList').appendChild(e)
  
  colorList.push('label' + count)
  propertyList[count] = []
  
  document.getElementById('label' + count).innerHTML += '</br></br><label for="ratio' + count + '"></label><input id="ratio' + count + '" type="number" min="0" max="10000" value="'+ratio+'" size="3" required>'
  
  document.getElementById('label' + count).innerHTML += '<label for="color' + count + '"></label><input id="color' + count + '" type="color" value="' + color + '" required>'
  document.getElementById("label"+count).innerHTML += '<label for="name' + count + '"></label><input id="name' + count + '" type="text" pattern="(?:[A-Za-z][A-Za-z0-9]*)(?<!noFeature|grass|noElement)" maxlength="20" minlength="1" value="' + name + '" size="15" required>'
  document.getElementById('label' + count).innerHTML += '<label for="layer' + count + '"></label><select id="layer' + count + '"><option value="' + layer + '" selected hidden>' + layer + '</option><option value="flooring">flooring</option><option value="element">element</option><option value="feature">feature</option></select>'
  
  document.getElementById('label' + count).innerHTML += '<label for="colorWidth' + count + '">width:</label><input id="colorWidth' + count + '" type="number" min="0" max="100" value="' + colorWidth + '"  size="2" required>'
  document.getElementById('label' + count).innerHTML += '<label for="loot' + count + '"></label><select id="loot'  + count + '"><option value="' + loot + '" selected hidden>' + (loot ? "loot" : "nothing") + '</option><option value="false">nothing</option><option value="true">loot</option></select></br>'
  
  document.getElementById('label' + count).innerHTML += '<input id="addPropertyButton' + count + '" type="button" value="add property" onclick="addProperty(' + count + ')" onfocus="this.blur()">'
  document.getElementById('label' + count).innerHTML += '<input id="deleteColorButton' + count + '" type="button" value="delete color" onclick="document.getElementById(`label' + count + '`).remove();colorList.splice(colorList.indexOf(`label' + count + '`),1);propertyList[' + count + '] = []">'
  
  document.getElementById('label' + count).innerHTML += '<div id="properties' + count + '"></div>'

  for (let p of properties){
    addProperty(count, p.action, p.colors, p.radius)
  }
  //input {background-color: black; color: white; border:none}
  count++
}

function addProperty(arg, action = 0, colors = document.getElementById('name' + arg).value, radius = 0){
  if (propertyCount[arg] == undefined){//(!propertyCount[arg]){//
    propertyCount[arg] = 0
  } else {
    propertyCount[arg]++
  }
  propertyList[arg].push('C' + arg + 'P' + propertyCount[arg])
  
  const e = document.createElement('div')
  const a = document.createAttribute('id')
  a.value = 'C' + arg + 'P' + propertyCount[arg]
  e.setAttributeNode(a)
  document.getElementById('properties' + arg).appendChild(e)

  document.getElementById('C' + arg + 'P' + propertyCount[arg]).innerHTML += '<label for="actionC' + arg + 'P' + propertyCount[arg] + '">do</label><input id="actionC' + arg + 'P' + propertyCount[arg] + '" type="number" min="-10000" max="10000" value="' + action + '" size="3" required>'
  document.getElementById('C' + arg + 'P' + propertyCount[arg]).innerHTML += '<label for="colorsC' + arg + 'P' + propertyCount[arg] + '">for</label><input id="colorsC' + arg + 'P' + propertyCount[arg] + '" type="text" pattern="[A-Za-z][A-Za-z0-9]{0,29}(?<!noFeature|grass|noElement)(?:, (?:[A-Za-z][A-Za-z0-9]{0,29}(?<!noFeature|grass|noElement)))*" value="' + colors + '" size="15" required>'
  document.getElementById('C' + arg + 'P' + propertyCount[arg]).innerHTML += '<label for="radiusC' + arg + 'P' + propertyCount[arg] + '">in</label><input id="radiusC' + arg + 'P' + propertyCount[arg] + '" type="number" min="0" max="100" size="3" value="' + radius + '" required>'
  document.getElementById('C' + arg + 'P' + propertyCount[arg]).innerHTML += '<input id="deletePropertyC' + arg + 'P' + propertyCount[arg] + '" type="button" value="remove" onclick="document.getElementById(`C' + arg + 'P' + propertyCount[arg] + '`).remove();propertyList[' + arg + '].splice(propertyList[' + arg + '].indexOf(`C' + arg + 'P' + propertyCount[arg] + '`),1)"></br>'
}
  
//?hory ako by generovali loot?, 1 za policko vs 1 za 1ks viac polickoveho elementu

function htmlToData(){
  d.count = {}
  d.layers = {
    flooring: [],
    element: [],
    feature: [],
  }
  d.colors = {}
  d.loot = {}
  
  for (const c of colorList){
    const name = document.getElementById(c.replace('label', 'name')).value;
    const layer = document.getElementById(c.replace('label', 'layer')).value;
    const color = document.getElementById(c.replace('label', 'color' )).value;
    const ratio = document.getElementById(c.replace('label', 'ratio')).value;
    const properties = []
    for (const p of propertyList[c.replace('label', '')]){
      properties.push({action: Number(document.getElementById('action' + p).value), colors: document.getElementById('colors' + p).value, radius: Number(document.getElementById('radius' + p).value)})
    }
    const colorWidth = document.getElementById(c.replace('label', 'colorWidth')).value;
    const loot = document.getElementById(c.replace('label', 'loot')).value
    makeColor(name, layer, color, Number(ratio), properties, Number(colorWidth), loot==='true')//== vs ===
  }
  d.columns = Number(document.getElementById('columns').value)
  d.rows = Number(document.getElementById('rows').value)
}

function exportSetup(){
  htmlToData()
  d.fillerFlooringIndex = colorList.indexOf('label0')
  d.fillerElementIndex = colorList.indexOf('label4')
  d.fillerFeatureIndex = colorList.indexOf('label8')
  if (typeof url !== 'undefined'){
    window.URL.revokeObjectURL(url)
  }
  const json = JSON.stringify(d)//let
  
  let exportJson = new Blob([json], {type: 'text/json'});
  url = window.URL.createObjectURL(exportJson);
  document.getElementById('fileExport').href = url;

  //document.getElementById('fileExport').setAttribute('href', 'data:text/plain;charset=utf-8, '+ encodeURIComponent(json))

  let tdy = new Date()
  let nameString = 'azivon-'+tdy.getFullYear()+'-'+(tdy.getMonth()+1)+'-'+tdy.getDate()+'-'+tdy.getHours()+'-'+tdy.getMinutes()+'-'+tdy.getSeconds()+'.json'
  document.getElementById('fileExport').download = nameString;

}

function importSetup(){//?only import and export function names
    document.getElementById('fileInput').files[0].text().then(function(value){
      try {
        d = JSON.parse(value)
      } catch (e){
        console.log('double parse error', e)
      } finally {
        dataToHtml()
        document.getElementById('columns').value = d.columns
        document.getElementById('rows').value = d.rows
        htmlToData()
        mapMain(d.columns, d.rows)
      }
    }
  )
}

function dataToHtml(){//?only export html instead of js d object
  //?try catch error handling when importing invalid file
  count = 0
  propertyCount = []
  colorList = []
  propertyList = []
  
  document.getElementById('colorList').innerHTML = ''
  for (const c in d.colors){//
    const temp = d.colors[c]
    addColor(temp.label, temp.layer, temp.color, temp.ratio, temp.properties, temp.colorWidth, temp.loot)
  }
  
  document.getElementById('colorWidth' + (d.fillerFlooringIndex)).disabled = 'true'
  document.getElementById('ratio' + (d.fillerFlooringIndex)).min = '1'
  document.getElementById('layer' + (d.fillerFlooringIndex)).disabled = 'true'
  document.getElementById('name' + (d.fillerFlooringIndex)).disabled = 'true'
  document.getElementById('addPropertyButton' +  (d.fillerFlooringIndex)).remove()
  document.getElementById('deleteColorButton' + (d.fillerFlooringIndex)).remove()
  
  document.getElementById('color' + (d.fillerElementIndex)).type = 'text'
  document.getElementById('color' + (d.fillerElementIndex)).value = 'none'
  document.getElementById('color' + (d.fillerElementIndex)).disabled = 'true'
  document.getElementById('color' + (d.fillerElementIndex)).size = '1'
  document.getElementById('colorWidth' + (d.fillerElementIndex)).disabled = 'true'
  document.getElementById('ratio' + (d.fillerElementIndex)).min = '1'
  document.getElementById('layer' + (d.fillerElementIndex)).disabled = 'true'
  document.getElementById('name' + (d.fillerElementIndex)).disabled = 'true'
  document.getElementById('addPropertyButton' + (d.fillerElementIndex)).remove()
  document.getElementById('deleteColorButton' + (d.fillerElementIndex)).remove()
  
  document.getElementById('color' + (d.fillerFeatureIndex)).type = 'text'
  document.getElementById('color' + (d.fillerFeatureIndex)).value = 'none'
  document.getElementById('color' + (d.fillerFeatureIndex)).disabled = 'true'
  document.getElementById('color' + (d.fillerFeatureIndex)).size = '1'
  document.getElementById('colorWidth' + (d.fillerFeatureIndex)).disabled = 'true'
  document.getElementById('ratio' + (d.fillerFeatureIndex)).min = '1'
  document.getElementById('layer' + (d.fillerFeatureIndex)).disabled = 'true'
  document.getElementById('name' + (d.fillerFeatureIndex)).disabled = 'true'
  document.getElementById('addPropertyButton' + (d.fillerFeatureIndex)).remove()
  document.getElementById('deleteColorButton' + (d.fillerFeatureIndex)).remove()
}


count = 0
propertyCount = []
colorList = []
propertyList = []

addColor('grass', 'flooring', '#8BC766', 250)
document.getElementById('colorWidth' + (count - 1)).disabled = 'true'
document.getElementById('ratio' + (count - 1)).min = '1'
document.getElementById('layer' + (count - 1)).disabled = 'true'
document.getElementById('name' + (count - 1)).disabled = 'true'
document.getElementById('addPropertyButton' + (count - 1)).remove()
document.getElementById('deleteColorButton' + (count - 1)).remove()
d.fillerFlooring = 'label' + (count - 1)
d.fillerFlooringIndex = colorList.indexOf(d.fillerFlooring)
  
addColor('desert', 'flooring', '#FFFFA5', 50, [{action: 0, colors: 'snow', radius: 3}, {action: 0, colors: 'woods', radius: 0}, {action: 50, colors: 'desert', radius: 3}])
addColor('snow', 'flooring', '#FFFFFF', 50, [{action: 0, colors: 'desert', radius: 3}, {action: 50, colors: 'snow', radius: 3}], 1, false)
addColor('water', 'flooring', '#66BBDD', 5, [{action: 80, colors: 'water', radius: 3}, {action: 0, colors: 'material, mountains, lake, woods, village, metal, gold, castle, castle2', radius: 0}])

addColor('noElement', 'element', '#000000', 100, [], 0)
document.getElementById('color' + (count - 1)).type = 'text'
document.getElementById('color' + (count - 1)).value = 'none'
document.getElementById('color' + (count - 1)).disabled = 'true'
document.getElementById('color' + (count - 1)).size = '1'
document.getElementById('colorWidth'+ (count - 1)).disabled = 'true'
document.getElementById('ratio'+ (count - 1)).min = '1'
document.getElementById('layer' + (count - 1)).disabled = 'true'
document.getElementById('name' + (count - 1)).disabled = 'true'
document.getElementById('addPropertyButton'+ (count - 1)).remove()
document.getElementById('deleteColorButton'+ (count - 1)).remove()
d.fillerElement = 'label'+ (count - 1)
d.fillerElementIndex = colorList.indexOf(d.fillerElement)
 
addColor('mountains', 'element', '#A75F49', 5, [{action: 0, colors: 'water', radius: 0}, {action: 1, colors: 'metal, gold, castle', radius: 0}], 3)
addColor('woods', 'element', '#BCA26F', 7, [{action: 0, colors: 'water, desert, village, metal, gold, castle, castle2', radius: 0}], 2)
addColor('lake', 'element', '#64E1E2', 5, [{action: 0, colors: 'water, village, metal, gold, castle, castle2, material', radius: 0}], 2)

addColor('noFeature', 'feature', '#000000', 200, [], 0)
document.getElementById('color' + (count - 1)).type = 'text'
document.getElementById('color' + (count - 1)).value = 'none'
document.getElementById('color' + (count - 1)).disabled = 'true'
document.getElementById('color' + (count - 1)).size = '1'
document.getElementById('colorWidth' + (count - 1)).disabled = 'true'
document.getElementById('ratio' + (count - 1)).min = '1'
document.getElementById('layer' + (count - 1)).disabled = 'true'
document.getElementById('name' + (count - 1)).disabled = 'true'
document.getElementById('addPropertyButton'+ (count - 1)).remove()
document.getElementById('deleteColorButton'+ (count - 1)).remove()
d.fillerFeature = 'label' + (count - 1)
d.fillerFeatureIndex = colorList.indexOf(d.fillerFeature)

addColor('village', 'feature', '#FD7C7C', 6, [{action: 0, colors: 'water, woods, lake', radius: 0}], 1, true)
addColor('metal', 'feature', '#8E9ED1', 1, [{action: 0, colors: 'water, lake', radius: 0}])
addColor('gold', 'feature', '#C2AB35', 1, [{action: 0, colors: 'water, woods, lake', radius: 0}])
addColor('castle', 'feature', '#AAAAAA', 1, [{action: 0, colors: 'water, woods, lake', radius: 0}])
addColor('castle2', 'feature', '#AAAAAA', 1, [{action: 0, colors: 'water, woods, lake', radius: 0}], 2)
addColor('material', 'feature', '#D494D0', 6, [{action: 0, colors: 'water, lake', radius: 0}])

document.getElementById('columns').value = d.columns
document.getElementById('rows').value = d.rows

htmlToData()
mapMain(d.columns, d.rows)

//?colors : self miesto celeho mena v properties
//?pridat flooring nic = none; cierna farba znamena no display; v takom pripade treba potencialne upozornit ze o jedno svetlejsia cierna uz bude aj zobrazena; riesit nezobrazovanie radsej sirka = 0 to je intuitivnejsie
//?vlastnosti napr ze nieco v hre davam hracovi = nespawnu sa automaticky dve na rovnakom policku; ?mozno som myslel spawn

//way of detecting errors, vypisovat uzivatelovi ked je v js error => aby dal spat zmenu ktoru vykonal
//desatinne cislo 0.0000000001 aby bolo mozne nemat error a zaroven plnu mapu ak to chce uzivatel -> ked chce mapu full features; ==> kontroly presunut do js, povolit aj 0 fillerov
  
//heck ci nie su dvojmo a ci vobec existuju take farby ktore tu napisem vo vlastnostiach; zdoraznit ze aby sa dalo s nimi pracovat treba ich najprv zadefinovat aspon s pomerom 0/?upravit aby sa sami vygenerovali taketo farby-->

//check ci  niesu dvojmo okruhy vo vlastnostiach;check rovnake nazvy farieb

//miesto pisania vlastnosti do dvch farieb dvojmo aby sa blokovali alebo nieco pridat spolocne vlastnosti/upravit priamo v js povodny sposob dvojmo moze byt obsolete/len spravit nadstavbu v html ze sa proste vlastnost berie ako spolocna a prida sa automaticky vsetkym

//oninvalid='setCustomValidity("Please start with a letter, then you can also use numbers.")'
//autocomplete='off'

//ostranit problem ze treba furt scrollovat etc userfriendliness; accessibility






























