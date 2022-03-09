count = 0
propertyCount = []
colorList = []
propertyList = []

function addColor(){
  document.getElementById('colorList').innerHTML += "<div id='label"+count+"'></div>";
  colorList.push("label"+count)
  propertyList[count] = []
  
  document.getElementById('label'+count).innerHTML += "<label for='name"+count+"'>name:</label><input id='name"+count+"' type='text' pattern='[A-Za-z][A-Za-z0-9]*' maxlength='20' minlength='1' value='label"+count+"' required>"
  document.getElementById('label'+count).innerHTML += "<label for='type"+count+"'>type(layer):</label><select id='type"+count+"'><option value='flooring'>flooring</option><option value='element'>element</option><option value='feature'>feature</option></select>"
  document.getElementById('label'+count).innerHTML += "<label for='color"+count+"'>color:</label><input id='color"+count+"' type='color' value='#008000' required>"
  document.getElementById('label'+count).innerHTML += "<label for='ratio"+count+"'>ratio:</label><input id='ratio"+count+"' type='number' min='1' max='10000' value='1' size='5' required></br>"

  document.getElementById('label'+count).innerHTML += "<input id='addPropertyButton"+count+"' type='button' value='add property' onclick='addProperty("+count+")'></br><!--add funciontality-->"
  document.getElementById('label'+count).innerHTML += "<div id='properties"+count+"'></div>"

  document.getElementById('label'+count).innerHTML += "<label for='sirka"+count+"'>width(sirka):</label><input id='sirka"+count+"' type='number' min='0' max='100' value='1'  size='3' required>"
  document.getElementById('label'+count).innerHTML += "lootability:"
  document.getElementById('label'+count).innerHTML += "<label for='loot"+count+"'>loot:</label><select id='loot"+count+"'><option value='false'>true</option><option value='false'>false</option></select></br>"
  document.getElementById('label'+count).innerHTML += "<input id='deleteColorButton"+count+"' type='button' value='delete' onclick='document.getElementById(`label"+count+"`).remove();colorList.splice(colorList.indexOf(`label"+count+"`),1);propertyList["+count+"] = []'></br></br>"
  
  count++;
  console.log(colorList)
  console.log(propertyList)
  console.log(propertyCount)
}

function addProperty(arg){
  if (propertyCount[arg] == undefined){
    propertyCount[arg] = 0
  } else {
    propertyCount[arg]++
  }
  propertyList[arg].push("C"+arg+"P"+propertyCount[arg])
  document.getElementById('properties'+arg).innerHTML += "<div id='C"+arg+"P"+propertyCount[arg]+"'></div>";

  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='actionC"+arg+"P"+propertyCount[arg]+"'>action:</label><input id='actionC"+arg+"P"+propertyCount[arg]+"' type='number' min='-10000' max='10000' value='0' size='5' required>"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='colorsC"+arg+"P"+propertyCount[arg]+"'>colors:</label><input id='colorsC"+arg+"P"+propertyCount[arg]+"' type='text' pattern='[A-Za-z][A-Za-z0-9]{0,29}(?:, (?:[A-Za-z][A-Za-z0-9]{0,29}))*' value='label"+arg+"' required>"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='radiusesC"+arg+"P"+propertyCount[arg]+"'>radiuses:</label><input id='radiusesC"+arg+"P"+propertyCount[arg]+"' type='text' pattern='(?:[1-9][0-9]{0,2}|0)(?:, (?:[1-9][0-9]{0,2}|0))*' value='0' required>"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<input id='deletePropertyC"+arg+"P"+propertyCount[arg]+"' type='button' value='remove' onclick='document.getElementById(`C"+arg+"P"+propertyCount[arg]+"`).remove();console.log(`mazem aj z evidencie`); propertyList["+arg+"].splice(propertyList["+arg+"].indexOf(`C"+arg+"P"+propertyCount[arg]+"`),1)'></br>"
}

//<!--check ci nie su dvojmo a ci vobec existuju take farby ktore tu napisem vo vlastnostiach; zdoraznit ze aby sa dalo s nimi pracovat treba ich najprv zadefinovat aspon s pomerom 0/?upravit aby sa sami vygenerovali taketo farby-->

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


//?unique ids
