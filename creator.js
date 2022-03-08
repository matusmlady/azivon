count = 0
propertyCount = []
//propertyList = []

function addColor(){
  document.getElementById('colorList').innerHTML += "<div id='label"+count+"'></div>";
  
  document.getElementById('label'+count).innerHTML += "<label for='name"+count+"'>name:</label><input id='name"+count+"' type='text' pattern='[A-Za-z][A-Za-z0-9]*' maxlength='20' minlength='1' value='label"+count+"' required>"
  document.getElementById('label'+count).innerHTML += "<label for='type"+count+"'>type(layer):</label><select id='type"+count+"'><option value='flooring'>flooring</option><option value='element'>element</option><option value='feature'>feature</option></select>"
  document.getElementById('label'+count).innerHTML += "<label for='color"+count+"'>color:</label><input id='color"+count+"' type='color' value='#008000' required>"
  document.getElementById('label'+count).innerHTML += "<label for='ratio"+count+"'>ratio:</label><input id='ratio"+count+"' type='number' min='1' max='10000' value='1' size='5' required></br>"

  document.getElementById('label'+count).innerHTML += "properties:<input id='addPropertyButton"+count+"' type='button' value='add' onclick='addProperty("+count+")'></br><!--add funciontality-->"
  document.getElementById('label'+count).innerHTML += "<div id='properties"+count+"'></div>"

  document.getElementById('label'+count).innerHTML += "<label for='sirka"+count+"'>width(sirka):</label><input id='sirka"+count+"' type='number' min='0' max='100' value='1'  size='3' required>"
  document.getElementById('label'+count).innerHTML += "lootability:"
  document.getElementById('label'+count).innerHTML += "<label for='loot"+count+"'>loot:</label><select id='loot"+count+"'><option value='false'>true</option><option value='false'>false</option></select></br>"
  document.getElementById('label'+count).innerHTML += "<input id='deleteColorButton"+count+"' type='button' value='delete' onclick='document.getElementById(`label"+count+"`).remove()'></br></br>"
  
  count++;////////

}

function addProperty(arg){
  if (propertyCount[arg] == undefined){
    propertyCount[arg] = 0
  } else {
    propertyCount[arg]++
  }

  document.getElementById('properties'+arg).innerHTML += "<div id='C"+arg+"P"+propertyCount[arg]+"'></div>";

  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='action'>action:</label><input id='action' type='number' min='-10000' max='10000' value='0' size='5' required>"//<div id="+arg+">
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='colors'>colors:</label><input id='colors' type='text' pattern='[A-Za-z][A-Za-z0-9]{0,29}(?:, (?:[A-Za-z][A-Za-z0-9]{0,29}))*' value='label"+arg+"' required><!--check ci nie su dvojmo a ci vobec existuju take farby; zdoraznit ze aby sa dalo s nimi pracovat treba ich zadefinovat s pomerom 0/upravit aby sa sami vygenerovali taketo farby-->"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<label for='radiuses'>radiuses:</label><input id='radiuses' type='text' pattern='(?:[1-9][0-9]{0,2}|0)(?:, (?:[1-9][0-9]{0,2}|0))*' value='0' required><!-- check ci  niesu dvojmo okruhy-->"
  document.getElementById("C"+arg+"P"+propertyCount[arg]).innerHTML += "<input id='deleteProperty' type='button' value='remove' onclick='document.getElementById(`C"+arg+"P"+propertyCount[arg]+"`).remove()'></br>";/////////////////////;//</div>"
}




//delete button color

//delete button property

//function to read a provide the stuff on screen to map.js

//unique IDs everywhere..........
