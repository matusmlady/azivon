//TODO unify names creator and generator
function addColorHtml(label = 'color' + (colorList.length ? Number(colorList[colorList.length - 1].replace('colorMain', '')) + 1 : 0), layer = 'flooring', color = '#8BC766', ratio = 1, properties = [], width = 1, loot = false){
  const e = document.createElement('div')
  const a = document.createAttribute('id')
  let colorIndexStatic
  colorList.length ? colorIndexStatic = Number(colorList[colorList.length - 1].replace('colorMain', '')) + 1 : colorIndexStatic = 0
  const colorStringStatic = 'colorMain' + colorIndexStatic

  propertyList[propertyList.length] = []
  colorList.push(colorStringStatic)

  a.value = colorStringStatic
  const a1 = document.createAttribute('style')
  a1.value = "display: none"
  e.setAttributeNode(a)
  e.setAttributeNode(a1)
  document.getElementById(layer + 's').appendChild(e)

  document.getElementById(colorStringStatic).innerHTML += '</br><input id="ratio' + colorIndexStatic + '" class="ratio" type="number" min="0" max="10000" value="' + ratio + '" size="1" required>'
  document.getElementById(colorStringStatic).innerHTML += '<input id="colorInput' + colorIndexStatic + '" class="colorInput" type="color" value="' + color + '">'

  document.getElementById(colorStringStatic).innerHTML += '<input id="width' + colorIndexStatic + '" class="width" type="number" min="0" max="100" value="' + width + '"  size="1" required>'

  document.getElementById(colorStringStatic).innerHTML += '<input id="label' + colorIndexStatic + '" class="label" pattern="(?:[A-Za-z][A-Za-z0-9]*)(?<!noFeature|noFlooring|noElement)" minlength="1" maxlength="20" value="' + label + '" size="15" required>'
  document.getElementById(colorStringStatic).innerHTML += '<select id="layer' + colorIndexStatic + '" class="layer"><option value="' + layer + '" selected hidden>' + layer + '</option><option>flooring</option><option>element</option><option>feature</option></select>'

  document.getElementById(colorStringStatic).innerHTML += '<select id="loot' + colorIndexStatic + '" class="loot" size="1"><option selected hidden>' + (loot ? "loot" : "") + '</option><option></option><option>loot</option></select><input id="removeColorButton' + colorIndexStatic + '" type="button" value="x"></br><div id="properties' + colorIndexStatic + '"></div><input type="button" value="+" onclick="const height = document.documentElement.scrollHeight; addPropertyHtml(`' + colorStringStatic + '`); document.documentElement.scrollTop += document.documentElement.scrollHeight - height"></br>'

  const e2 = document.createElement('input')
  const a2 = document.createAttribute('id')
  a2.value = colorStringStatic + 'Minimized'
  const a3 = document.createAttribute('type')
  a3.value = 'color'
  const a4 = document.createAttribute('value')
  a4.value = color
  e2.setAttributeNode(a2)
  e2.setAttributeNode(a3)
  e2.setAttributeNode(a4)
  document.getElementById(layer + 'sMinimized').appendChild(e2)

  document.getElementById('colorInput' + colorIndexStatic).addEventListener('change', saveColor, false)
  document.getElementById('removeColorButton' + colorIndexStatic).addEventListener('click', removeColor, false)
  document.getElementById('label' + colorIndexStatic).addEventListener('input', checkValidityMain, false)
  document.getElementById('label' + colorIndexStatic).addEventListener('focus', checkValidityMain, false)
  document.getElementById('ratio' + colorIndexStatic).addEventListener('input', checkValidityMain, false)
  document.getElementById('ratio' + colorIndexStatic).addEventListener('focus', checkValidityMain, false)
  document.getElementById('width' + colorIndexStatic).addEventListener('input', checkValidityMain, false)
  document.getElementById('width' + colorIndexStatic).addEventListener('focus', checkValidityMain, false)
  document.getElementById('colorMain' + colorIndexStatic + 'Minimized').addEventListener('click', (evt) => evt.preventDefault(), false)
  document.getElementById('colorMain' + colorIndexStatic + 'Minimized').addEventListener('click', toggleColorDisplay, false)

  for (let p of properties) addPropertyHtml(colorStringStatic, p.action, p.colors, p.radius)

  return colorStringStatic//a2.value
}

function addPropertyHtml(colorStringStatic, action = 0, colors = document.getElementById('label' + colorStringStatic.replace('colorMain', '')).value, radius = 0){
  const colorIndexStatic = colorStringStatic.replace('colorMain', '')
  const colorIndexDynamic = colorList.indexOf(colorStringStatic)
  const e = document.createElement('div')
  const a = document.createAttribute('id')
  let pll
  propertyList[colorIndexDynamic][0] != undefined ? pll = Number(propertyList[colorIndexDynamic][propertyList[colorIndexDynamic].length - 1].replace('C' + colorIndexStatic + 'P', '')) + 1 : pll = 0
  const p = 'C' + colorIndexStatic + 'P' + pll//property id format CXPY
  a.value = p
  e.setAttributeNode(a)
  document.getElementById('properties' + colorIndexStatic).appendChild(e)

  document.getElementById(p).innerHTML += '<input id="action' + p + '" class="action" type="number" min="-10000" max="10000" value="' + action + '" size="1" required>'//TODO implement classes action here f.e.
  document.getElementById(p).innerHTML += '<input id="colors' + p + '" class="colors" pattern="[A-Za-z][A-Za-z0-9]{0,20}(?:, (?:[A-Za-z][A-Za-z0-9]{0,20}))*" value="' + colors.toString().replaceAll(',', ', ') + '" size="15" required>'
  document.getElementById(p).innerHTML += '<label for="radius' + p + '">in</label><input id="radius' + p + '" class="radius" type="number" min="0" max="100" size="1" value="' + radius + '" required>'
  document.getElementById(p).innerHTML += '<input id="removeProperty' + p + '" type="button" value="x" onclick="const height = document.documentElement.scrollHeight; document.getElementById(`' + p + '`).remove(); propertyList[colorList.indexOf(`colorMain` + ' + colorIndexStatic + ')].splice(propertyList[colorList.indexOf(`colorMain` + ' + colorIndexStatic + ')].indexOf(`' + p + '`), 1); document.documentElement.scrollTop -= height - document.documentElement.scrollHeight"></br>'

  document.getElementById('action' + p).addEventListener('input', checkValidityMain, false)
  document.getElementById('action' + p).addEventListener('focus', checkValidityMain, false)
  document.getElementById('radius' + p).addEventListener('input', checkValidityMain, false)
  document.getElementById('radius' + p).addEventListener('focus', checkValidityMain, false)
  document.getElementById('colors' + p).addEventListener('input', checkValidityMain, false)//TODO too annoying because always pops up, universal check function perhaps for different data types, custom messages, this case move to focusout
  document.getElementById('colors' + p).addEventListener('focus', checkValidityMain, false)

  propertyList[colorIndexDynamic].push(p)
}

function toggleColorDisplay(event){
  const trueColor = document.getElementById(event.target.id.replace('Minimized', ''))
  trueColor.style.display == "none" ? showColor(trueColor) : document.getElementById(event.target.id).style.backgroundColor == "rgb(139, 199, 102)" ? findInvalidElement(trueColor) : hideColor(trueColor)
}


function findInvalidElement(div) {
  document.getElementById(div.id).querySelector(':invalid').focus()
}


function showColor(trueColor){
  const height = document.documentElement.scrollHeight
  trueColor.style.display = ""
  document.getElementById(trueColor.id + 'Minimized').style = 'background: gray'
  document.documentElement.scrollTop += document.documentElement.scrollHeight - height
}

function hideColor(trueColor){
  const height = document.documentElement.scrollTop
  const heightMax = document.documentElement.scrollTopMax
  trueColor.style.display = "none"
  document.getElementById(trueColor.id + 'Minimized').style = ''
  document.documentElement.scrollTop = height - (heightMax - document.documentElement.scrollTopMax)
}

function saveColor(element){//TODO check correctness function
  const trueColor = document.getElementById(element.target.id.replace('colorInput', 'colorMain')).id
  document.getElementById(trueColor + 'Minimized').value = document.getElementById(trueColor.replace('colorMain', 'colorInput')).value
}

function removeColor(element){
  const trueColor = document.getElementById(element.target.id.replace('removeColorButton', 'colorMain')).id
  document.getElementById(trueColor).remove()
  document.getElementById(trueColor + 'Minimized').remove()
  propertyList.splice(colorList.indexOf(trueColor), 1)
  colorList.splice(colorList.indexOf(trueColor), 1)
}



function checkValidityMain(event){
  checkValidity(event)
  setMinimizedColorBackground(event)
}

function checkValidity(event){
  const element = document.getElementById(event.target.id)
  if (element.validity.stepMismatch || element.validity.valueMissing || element.validity.rangeOverflow || element.validity.rangeUnderflow || element.validity.badInput || element.validity.patternMismatch){
    if (element.type == 'number') {
      element.setCustomValidity('Enter a whole number between ' + element.min + ' and ' + element.max + ' inclusive.')
    } else {
      if (element.className == 'label'){//(element.id.match(/[a-z]*/) == 'label'){//TODO classes yes or no
        element.setCustomValidity('Start with a letter, continue with either numbers or letters. Don\'t use the \'noFlooring\', \'noElement\', \'noFeature\' labels.')
      } else {
        element.setCustomValidity('Start a color with a letter, continue with either numbers or letters. Separate the colors with a comma and a space. Don\'t use names longer than 20 characters.')
      }
    }
    element.reportValidity()
    element.style.background = '#8bc766'
  } else {
    element.setCustomValidity('')
    element.reportValidity()
    element.style.background = ''
  }
}

function setMinimizedColorBackground(event){
  const element = document.getElementById(event.target.id)
  if (element.validity.stepMismatch || element.validity.valueMissing || element.validity.rangeOverflow || element.validity.rangeUnderflow || element.validity.badInput || element.validity.patternMismatch){
    document.getElementById(element.id.replace(/[a-zC]*/, 'colorMain').replace(/P\d*/, '') + 'Minimized').style = 'background: #8bc766'
  } else {
    if (document.getElementById(element.id.replace(/[a-zC]*/, 'colorMain').replace(/P\d*/, '')).querySelectorAll(':invalid').length == 0) {
      document.getElementById(element.id.replace(/[a-zC]*/, 'colorMain').replace(/P\d*/, '') + 'Minimized').style = 'background: gray'
    }
  }
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

  for (const c of colorList){//TODO useless this way, just use the index number of the corresponding color and take the element with label, layer, colorInput etc. + that number
    const label = document.getElementById(c.replace('colorMain', 'label')).value;
    const layer = document.getElementById(c.replace('colorMain', 'layer')).value;
    const color = document.getElementById(c.replace('colorMain', 'colorInput')).value;
    const ratio = document.getElementById(c.replace('colorMain', 'ratio')).value;
    const properties = []
    for (const p of propertyList[colorList.indexOf(c)]){
      properties.push(new Property(Number(document.getElementById('action' + p).value), document.getElementById('colors' + p).value.split(', '), Number(document.getElementById('radius' + p).value)))
    }
    const width = document.getElementById(c.replace('colorMain', 'width')).value;
    const loot = document.getElementById(c.replace('colorMain', 'loot')).value
    d.colors[label] = new Color(label, layer, color, Number(ratio), properties, Number(width), loot === 'true')
    d.layers[layer].push(label)
    d.count[label] = 0
    if (loot == 'loot') d.loot[label] = []
  }
  d.columns = Number(document.getElementById('columns').value)
  d.rows = Number(document.getElementById('rows').value)
  d.fillerFlooringIndex = colorList.indexOf('colorMain0')
  d.fillerElementIndex = colorList.indexOf('colorMain1')
  d.fillerFeatureIndex = colorList.indexOf('colorMain2')
}

function dataToHtml(d){
  function customizeFiller(layer){
    //document.getElementById('width' + d['filler' + layer + 'Index']).disabled = 'true'
    document.getElementById('width' + d['filler' + layer + 'Index']).max = '1'
    document.getElementById('width' + d['filler' + layer + 'Index']).min = '0'
    document.getElementById('layer' + d['filler' + layer + 'Index']).disabled = 'true'
    document.getElementById('label' + d['filler' + layer + 'Index']).disabled = 'true'
    document.getElementById('removeColorButton' + d['filler' + layer + 'Index']).disabled = 'true'
    document.getElementById('colorInput' + d['filler' + layer + 'Index']).classList.add('color-filler')
    document.getElementById('colorMain' + d['filler' + layer + 'Index'] + 'Minimized').classList.add('color-filler')
  }

  document.getElementById('columns').value = d.columns
  document.getElementById('rows').value = d.rows

  /*floorings = []
  elements = []
  features = []*/

  colorList = []
  propertyList = []
  //document.getElementById('colorList').innerHTML = ''
  document.getElementById('floorings').innerHTML = ''
  document.getElementById('elements').innerHTML = ''
  document.getElementById('features').innerHTML = ''
  //document.getElementById('colorListMinimized').innerHTML = ''
  document.getElementById('flooringsMinimized').innerHTML = ''
  document.getElementById('elementsMinimized').innerHTML = ''
  document.getElementById('featuresMinimized').innerHTML = ''

  for (const c in d.colors){
    const cc = d.colors[c]
    addColorHtml(cc.label, cc.layer, cc.color, cc.ratio, cc.properties, cc.width, cc.loot)
  }

  customizeFiller('Flooring')
  customizeFiller('Element')
  customizeFiller('Feature')
}

function exportData(d){//TODO add menu to customize name or cancel the export
  htmlToData(d)
  //TODO timers not cleaned, separate timers from d object unclean, separate generation and animation
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
      let dParsed = {}
      try {
        for (const t of d.timers) clearTimeout(t)  //TODO timers not cleaned, separate timers from d object unclean, separate generation and animation
        //const dParsed = JSON.parse(value)
        //for (const dParsedProp in dParsed) d[dParsedProp] = dParsed[dParsedProp]
        dParsed = JSON.parse(value)
        console.log(dParsed)
      } catch (e) {
        console.log('The uploaded file was probably modified.', e)
        dParsed = d
      } finally {
        if (dParsed != d) {
          d = dParsed
          dataToHtml(d)
          m = generateMap(d, d.columns, d.rows)
        }
      }
    }
  )
}
