import React from 'react';

class History extends React.Component {
  render() {
    return (
      <div className="history">
        <button onClick={this.props.goToUpperLevel}>Upper</button>
        {this.props.nodes.map((node, index) => {
          return (
            <span key={index}>{node.name}</span>
          );
        })}
      </div>
    );
  }
}

History.propTypes = {
  nodes: React.PropTypes.array,
  goToUpperLevel: React.PropTypes.func,
};

export default History;