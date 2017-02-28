import React, {Component} from 'react';
import Explanation from './Explanation';

export default class ImgAndExplanation extends Component {
render(){
  return(
    <div id="explanationText">
      <p>
        {this.props.explanationText}
      </p>
    </div>
  )
}

}
