import React, {Component} from 'react';
import ImgAndExplanation from './ImgAndExplanation';

export default class Display extends Component {


selectImage = (text, explanation) => {
  var valuesAndImagesObject = {
    "1": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Echo_curation_alt_check_mark.svg/2000px-Echo_curation_alt_check_mark.svg.png",
    ".5": "https://ballotpedia.org/wiki/images/1/1c/Partial.png",
    "0": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Xmark01.svg/2000px-Xmark01.svg.png"
  }
  var explanationIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Speech_bubble_text.svg/2000px-Speech_bubble_text.svg.png"

  var noExplanation = <ImgAndExplanation img={valuesAndImagesObject[text]}/>
  var explanationOrNo = explanation !== "" ? <ImgAndExplanation img={valuesAndImagesObject[text]} explanationImage = {explanationIcon} explanation={explanation}/> : noExplanation
  return explanationOrNo

//   var check = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Echo_curation_alt_check_mark.svg/2000px-Echo_curation_alt_check_mark.svg.png"
//   var x = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Xmark01.svg/2000px-Xmark01.svg.png"
//
// partialOrNo = (valueWillBeZeroOrPointFive) => {
//   var
//   var vaue = valueWillBeZeroOrPointFive === ".5" ? <img src={check} className="check"/> : <img src={x} className="check"/>
// }
//
//   var display = text === "1" ? <img src={check} className="check"/> : <img src={x} className="check"/>
//   var displayAndExIcon = explanation != "" ? <ImgAndExplanation img={display} explanation={explanation}/> : display
//   return displayAndExIcon;
  };

render() {

  return(
    <tr>
      <td>{this.props.measure}</td>
      <td>{this.selectImage(this.props.measureValue["Answer"], this.props.measureValue["Explanation"])}</td>
    </tr>
    )
  }
}
