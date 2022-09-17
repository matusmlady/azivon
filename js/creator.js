function addColorHtml(label = 'color' + (colorList.length ? Number(colorList[colorList.length - 1].replace('color', '')) + 1 : 0), layer = 'flooring', color = '#8BC766', ratio = 1, properties = [], colorWidth = 1, loot = false){
  const e = document.createElement('div')
  const a = document.createAttribute('id')
  let cll
  colorList.length ? cll = Number(colorList[colorList.length - 1].replace('color', '')) + 1 : cll = 0
  const colorStringStatic = 'color' + cll
  const colorIndexStatic = cll
  a.value = colorStringStatic
  e.setAttributeNode(a)
  document.getElementById('colorList').appendChild(e)

  document.getElementById(colorStringStatic).innerHTML += '</br></br><label for="ratio' + colorIndexStatic + '"></label><input id="ratio' + colorIndexStatic + '" type="number" min="0" max="10000" value="' + ratio + '" size="3" required>'
  document.getElementById(colorStringStatic).innerHTML += '<label for="' + colorStringStatic + '"></label><input id="colorColor' + colorIndexStatic + '" type="color" value="' + color + '" required>'
  document.getElementById(colorStringStatic).innerHTML += '<label for="label' + colorIndexStatic + '"></label><input id="label' + colorIndexStatic + '" type="text" pattern="(?:[A-Za-z][A-Za-z0-9]*)(?<!noFeature|grass|noElement)" maxlength="20" minlength="1" value="' + label + '" size="15" required>'
  document.getElementById(colorStringStatic).innerHTML += '<label for="layer' + colorIndexStatic + '"></label><select id="layer' + colorIndexStatic + '"><option value="' + layer + '" selected hidden>' + layer + '</option><option value="flooring">flooring</option><option value="element">element</option><option value="feature">feature</option></select>'
  document.getElementById(colorStringStatic).innerHTML += '<label for="colorWidth' + colorIndexStatic + '">width:</label><input id="colorWidth' + colorIndexStatic + '" type="number" min="0" max="100" value="' + colorWidth + '"  size="2" required>'
  document.getElementById(colorStringStatic).innerHTML += '<label for="loot' + colorIndexStatic + '"></label><select id="loot'  + colorIndexStatic + '"><option value="' + loot + '" selected hidden>' + (loot ? "loot" : "nothing") + '</option><option value="">nothing</option><option value="true">loot</option></select></br><input id="addPropertyButton' + colorIndexStatic + '" type="button" value="add property" onclick="addPropertyHtml(`' + colorStringStatic + '`)"><input id="deleteColorButton' + colorIndexStatic + '" type="button" value="delete color" onclick="document.getElementById(`' + colorStringStatic + '`).remove(); propertyList.splice(colorList.indexOf(`' + colorStringStatic + '`), 1); colorList.splice(colorList.indexOf(`' + colorStringStatic + '`), 1)"><div id="properties' + colorIndexStatic + '"></div>'

  propertyList[propertyList.length] = []
  colorList.push(colorStringStatic)
  for (let p of properties) addPropertyHtml(colorStringStatic, p.action, p.colors, p.radius)
}

function addPropertyHtml(cllArg, action = 0, colors = document.getElementById('label' + cllArg.replace('color', '')).value, radius = 0){
  const colorStringStatic = cllArg
  const colorIndexStatic = colorStringStatic.replace('color', '')
  const colorIndexDynamic = colorList.indexOf(colorStringStatic)
  const e = document.createElement('div')
  const a = document.createAttribute('id')
  let pll
  propertyList[colorIndexDynamic][0] != undefined ? pll = Number(propertyList[colorIndexDynamic][propertyList[colorIndexDynamic].length - 1].replace('C' + colorIndexStatic + 'P', '')) + 1 : pll = 0
  const p = 'C' + colorIndexStatic + 'P' + pll//property id format CXPY
  a.value = p
  e.setAttributeNode(a)
  document.getElementById('properties' + colorIndexStatic).appendChild(e)

  document.getElementById(p).innerHTML += '<label for="action' + p + '">do</label><input id="action' + p + '" type="number" min="-10000" max="10000" value="' + action + '" size="3" required>'
  document.getElementById(p).innerHTML += '<label for="colors' + p + '">for</label><input id="colors' + p + '" type="text" pattern="[A-Za-z][A-Za-z0-9]{0,29}(?<!noFeature|grass|noElement)(?:, (?:[A-Za-z][A-Za-z0-9]{0,29}(?<!noFeature|grass|noElement)))*" value="' + colors.toString().replaceAll(',', ', ') + '" size="15" required>'
  document.getElementById(p).innerHTML += '<label for="radius' + p + '">in</label><input id="radius' + p + '" type="number" min="0" max="100" size="3" value="' + radius + '" required>'
  document.getElementById(p).innerHTML += '<input id="deleteProperty' + p + '" type="button" value="remove" onclick="document.getElementById(`' + p + '`).remove(); propertyList[colorList.indexOf(`color` + ' + colorIndexStatic + ')].splice(propertyList[colorList.indexOf(`color` + ' + colorIndexStatic + ')].indexOf(`' + p + '`), 1)"></br>'

  propertyList[colorIndexDynamic].push(p)
}

function htmlToData(d){
  d.count = {}
  d.layers = {
    flooring: [],
    element: [],
    feature: [],
  }
  d.colors = {}
  d.loot = {}

  for (const c of colorList){
    const label = document.getElementById(c.replace('color', 'label')).value;
    const layer = document.getElementById(c.replace('color', 'layer')).value;
    const color = document.getElementById(c.replace('color', 'colorColor')).value;
    const ratio = document.getElementById(c.replace('color', 'ratio')).value;
    const properties = []
    for (const p of propertyList[colorList.indexOf(c)]){
      properties.push(new Property(Number(document.getElementById('action' + p).value), document.getElementById('colors' + p).value.split(', '), Number(document.getElementById('radius' + p).value)))
    }
    const colorWidth = document.getElementById(c.replace('color', 'colorWidth')).value;
    const loot = document.getElementById(c.replace('color', 'loot')).value
    d.colors[label] = new Color(label, layer, color, Number(ratio), properties, Number(colorWidth), loot === 'true')
    d.layers[layer].push(label)
    d.count[label] = 0
    if (loot === 'true') d.loot[label] = []
  }
  d.columns = Number(document.getElementById('columns').value)
  d.rows = Number(document.getElementById('rows').value)
  d.fillerFlooringIndex = colorList.indexOf('color0')//TODO atleast one bug when importing, indexes don't have to corelate when a color between color0 and oclor4 was deleted
  d.fillerElementIndex = colorList.indexOf('color4')
  d.fillerFeatureIndex = colorList.indexOf('color8')
}

function dataToHtml(d){
  document.getElementById('columns').value = d.columns
  document.getElementById('rows').value = d.rows

  colorList = []
  propertyList = []
  document.getElementById('colorList').innerHTML = ''

  for (const c in d.colors){
    const cc = d.colors[c]
    addColorHtml(cc.label, cc.layer, cc.color, cc.ratio, cc.properties, cc.colorWidth, cc.loot)
  }

  document.getElementById('colorWidth' + (d.fillerFlooringIndex)).disabled = 'true'
  document.getElementById('ratio' + (d.fillerFlooringIndex)).min = '1'
  document.getElementById('layer' + (d.fillerFlooringIndex)).disabled = 'true'
  document.getElementById('label' + (d.fillerFlooringIndex)).disabled = 'true'
  document.getElementById('addPropertyButton' +  (d.fillerFlooringIndex)).disabled = 'true'
  document.getElementById('deleteColorButton' + (d.fillerFlooringIndex)).disabled = 'true'

  document.getElementById('colorColor' + (d.fillerElementIndex)).type = 'text'
  document.getElementById('colorColor' + (d.fillerElementIndex)).value = 'none'
  document.getElementById('colorColor' + (d.fillerElementIndex)).disabled = 'true'
  document.getElementById('colorColor' + (d.fillerElementIndex)).size = '1'
  document.getElementById('colorWidth' + (d.fillerElementIndex)).disabled = 'true'
  document.getElementById('ratio' + (d.fillerElementIndex)).min = '1'
  document.getElementById('layer' + (d.fillerElementIndex)).disabled = 'true'
  document.getElementById('label' + (d.fillerElementIndex)).disabled = 'true'
  document.getElementById('addPropertyButton' + (d.fillerElementIndex)).disabled = 'true'
  document.getElementById('deleteColorButton' + (d.fillerElementIndex)).disabled = 'true'

  document.getElementById('colorColor' + (d.fillerFeatureIndex)).type = 'text'
  document.getElementById('colorColor' + (d.fillerFeatureIndex)).value = 'none'
  document.getElementById('colorColor' + (d.fillerFeatureIndex)).disabled = 'true'
  document.getElementById('colorColor' + (d.fillerFeatureIndex)).size = '1'
  document.getElementById('colorWidth' + (d.fillerFeatureIndex)).disabled = 'true'
  document.getElementById('ratio' + (d.fillerFeatureIndex)).min = '1'
  document.getElementById('layer' + (d.fillerFeatureIndex)).disabled = 'true'
  document.getElementById('label' + (d.fillerFeatureIndex)).disabled = 'true'
  document.getElementById('addPropertyButton' + (d.fillerFeatureIndex)).disabled = 'true'
  document.getElementById('deleteColorButton' + (d.fillerFeatureIndex)).disabled = 'true'
}

function exportData(d){//TODO add menu to customize name or cancel the export
  htmlToData(d)
  if (typeof url !== 'undefined') window.URL.revokeObjectURL(url)
  const json = JSON.stringify(d)

  let exportJson = new Blob([json], {type: 'text/json'})
  url = window.URL.createObjectURL(exportJson)
  document.getElementById('fileExport').href = url

  const date = new Date()
  document.getElementById('fileExport').download = 'azivon-' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.json'

  document.getElementById('expButton').disabled = true
  setTimeout(() => document.getElementById('expButton').disabled = false, 3000)
}

function importData(d){//TODO add menu and warning before import deletes current deck
  document.getElementById('fileInput').files[0].text().then(
    (value) => {
      try {
        for (const t of d.timers) clearTimeout(t)
        const dParsed = JSON.parse(value)
        for (const dParsedProp in dParsed) d[dParsedProp] = dParsed[dParsedProp]
      } catch (e) {
        console.log('double parse error when importing', e)
      }
      dataToHtml(d)
      m = generateMap(d, d.columns, d.rows)
    }
  )
}
