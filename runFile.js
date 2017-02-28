function runFile(evt) {

var csvContentsAsObject = csvTransformer(evt)
var selectedColor = document.getElementById('color_dropdown').value
alterAndMapJson(csvContentsAsObject, selectedColor)
}
