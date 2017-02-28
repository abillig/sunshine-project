function csvTransformer(evt) {
  //Retrieve the first and only file from the FileList object
  var f = evt.target.files[0];
  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      var contents = e.target.result;
      var contentsArray = contents.split(/\r?\n|\r/);
      var csvContentsAsObject = turnContentsArrayIntoUsableObject(contentsArray)
      //contentsArray contains csv's contents in array form. Each row represented by an element.
      //trigger the runfile, passing in the array containing the csv's contents.
      var selectedColor = document.getElementById('color_dropdown').value
      alterAndMapJson(csvContentsAsObject, selectedColor)
      }

    r.readAsText(f);
  } else {
    alert("Failed to load file");
  }
}

function turnContentsArrayIntoUsableObject(array){
  //This function takes the array that the readSingleFile function prepares from the csv contents
  //and turns it into an object that can be used by the alterAndMapJson function
  var usableObject = {}
  array.map(function(csvRow){
    var csvRowSections = csvRow.split(",")
    usableObject[csvRowSections[0]] = csvRowSections[1]
  })
  return usableObject
}
