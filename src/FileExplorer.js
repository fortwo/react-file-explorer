import React from 'react';
import PropTypes from 'prop-types';

// Components
import History from './History.js';
import Node from './Node';

class FileExplorer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      nodes: [],
      selected: '',
    };

    // History Methods
    this.goToUpperLevel = this.goToUpperLevel.bind(this);

    // Node Methods
    this.handleSingleClick = this.handleSingleClick.bind(this);
    this.goToDeeperLevel = this.goToDeeperLevel.bind(this);
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

  // History Methods
  goToUpperLevel() {
    const history = this.state.history;
    history.pop();

    const nodes = history[history.length - 1].children;

    this.setState({
      history,
      nodes,
      selected: '',
    });
  }

  // Node Methods
  handleSingleClick(key) {
    this.setState({
      selected: key,
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

  render() {
    return (
      <div className='container'>
        <History
          nodes={this.state.history}
          goToUpperLevel={this.goToUpperLevel} />

        {
          this.state.nodes.map((node, index) => {
            const selected = node.id === this.state.selected;

            return (
              <Node key={node.id}
                data={node}
                onSingleClick={this.handleSingleClick}
                goToDeeperLevel={this.goToDeeperLevel}
                selected={selected} />
            );
          })
        }
      </div>
    );
  }
}

FileExplorer.propTypes = {
  data: PropTypes.array,
};

export default FileExplorer;