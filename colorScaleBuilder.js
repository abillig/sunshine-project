var colorScaleBuilder = function(arrayOfValues, colorSelection){

  //this function prepares a customized colorScale function, which incorporates
  //the values from the csv, finds their minimum and maximum,
  //and then uses d3's scale creator to take in any value included in the dataset,
  //and return a hexidecimal color value along the gradient passed in from the user's selection.

  //the colorScale function will then be passed on to jsonToMap so that each county
  //can have a particular gradient.

  var colorScale = function(num){
    if (num < 5) {
      return '#d73027'
    } else if (num < 10) {
      return '#fee08b'
    } else {
      return '#1a9850'
    }
  }

  return colorScale
}
