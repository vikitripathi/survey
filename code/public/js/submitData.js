var surveySMEDict = []; // create an empty array

function saveInputText(textFor){
  var inputTextData = document.getElementById(textFor).value;
  surveySMEDict[textFor]  = inputTextData;
}

function saveDataFromSelectorId(id){
  var input = "#" + id;
  var selectedVal = $(input).val();
  surveySMEDict[id] = selectedVal;
}

function saveDataFromRadioBtnName(name) {
  var input = "input[name='" + name + "']:checked";
  var selectedData = $(input).val();
  surveySMEDict[name] = selectedData;
}
