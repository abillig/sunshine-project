var calculateCollectiveScore = function(categoriesObject) {

var collectiveScore = 0
for (var category in categoriesObject){

  function doubleCertainCategories(categoryName){
          var doubleThese = ['Budget', 'Meetings', 'Elected Officials', 'Administrative Officials', 'Public Records']
          var returnMultiplier = doubleThese.includes(categoryName) ? 2 : 1
          return returnMultiplier
        }

  collectiveScore += Number(categoriesObject[category]["Answer"] * doubleCertainCategories(category))
}
return collectiveScore
}


var collectThese = function(categoriesObject, num) {
  var list = ""
  var checkIfThereAreAnyPresent = false
    var labels = {"0": "Missing: ", ".5": "Partially Collected: ", "1": "Present: "}
    list += labels[num]
    for (var category in categoriesObject){
      if (categoriesObject[category]["Answer"] == num){
        list += category += ", "
        checkIfThereAreAnyPresent = true
      }
    }
    var removeLastComma = list.substring(0, list.length - 2) + "<br><br>"
    var anyPresent = checkIfThereAreAnyPresent ? removeLastComma : ""
    return anyPresent
}
