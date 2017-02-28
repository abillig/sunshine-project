import React, {Component} from 'react';
import Explanation from './Explanation';

export default class ImgAndExplanation extends Component {
  state = {
    explanation: ''
  };

handleOnMouseover = () => {
    this.setState({
      explanation: <Explanation explanationText={this.props.explanation} />
    });
  };

handleOnMouseOut = () => {
    this.setState({
      explanation: ""
    });
  };

classDetermination = (imgText) => {
  var partialURL = "https://ballotpedia.org/wiki/images/1/1c/Partial.png"
  var className =  imgText === partialURL ?  "partialIcon" : "check"
  return className
}

render(){
    return(
      <div>
        <img src={this.props.img} className={this.classDetermination(this.props.img)}/>
        <img src={this.props.explanationImage} id="explanation" onMouseOver={this.handleOnMouseover.bind(this)} onMouseOut={this.handleOnMouseOut.bind(this)}/>
        {this.state.explanation}
      </div>
    )
  }
}
