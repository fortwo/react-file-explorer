import React from 'react';

// Components
import History from './History.js';
import Node from './Node';

class FileExplorer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      nodes: [],
    };

    this.goToDeeperLevel = this.goToDeeperLevel.bind(this);
    this.goToUpperLevel = this.goToUpperLevel.bind(this);
  }

  componentDidMount() {
    const history = [{
      name: '/', 
      children: this.props.data,
    }];

    this.setState({
      history,
      nodes: this.props.data,
    });
  }

  goToDeeperLevel(currentNode) {
    const history = this.state.history;
    history.push(currentNode);

    const nodes = currentNode.children;

    this.setState({
      history,
      nodes,
    });
  }

  goToUpperLevel() {
    const history = this.state.history;
    history.pop();

    const nodes = history[history.length - 1].children;

    this.setState({
      history,
      nodes,
    });
  }

  render() {
    return (
      <div>
        <History 
          nodes={this.state.history}
          goToUpperLevel={this.goToUpperLevel} />
        <span>_____________</span>
        {this.state.nodes.map((node, index) => {
          return (
            <Node key={index} 
              data={node} 
              goToDeeperLevel={this.goToDeeperLevel} />
          );
        })}
      </div>
    );
  }
}

FileExplorer.propTypes = {
  data: React.PropTypes.array,
};

export default FileExplorer;