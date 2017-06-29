import React from 'react';

class Node extends React.Component {
  render() {
    return (
      <div>
        {this.props.data.children ? 
          <div onDoubleClick={() => this.props.goToDeeperLevel(this.props.data)}>{this.props.data.name}</div>
          :
          <div>{this.props.data.name}</div>
        }
      </div>
    );
  }
}

Node.propTypes = {
  data: React.PropTypes.object,
  goToDeeperLevel: React.PropTypes.func,
};

export default Node;