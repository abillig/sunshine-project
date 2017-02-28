import React, {Component} from 'react';
import MeasureRow from './MeasureRow';

export default class Display extends Component {

  render() {
    var rows = [];
    for (var measure in this.props.displayContent) {
      rows.push(<MeasureRow measure={measure} measureValue={this.props.displayContent[measure]}/>);
    }
    return (
      <div id="display">
        <h1 id="header">{this.props.currentScore} </h1>
        <h1 id="header">{this.props.currentRank}</h1>
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
