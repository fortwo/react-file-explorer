import React from 'react';

// Style
import './index.css';

class History extends React.Component {
  render() {
    return (
      <div className='history'>
        {
          this.props.nodes.map((node, index) => {
            return (
              <span 
                key={index}
                className='history_level'
                onClick={() => this.props.goToUpperLevel(node)}>{node.name}</span>
            );
          })
        }
      </div>
    );
  }
}

History.propTypes = {
  nodes: React.PropTypes.array,
  goToUpperLevel: React.PropTypes.func,
};

export default History;