import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import History from './components/History';
import Node from './components/Node';

// Constants
import * as ViewModes from './constants/viewModes';

// Style
import './index.css';

class FileExplorer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      nodes: [],
      selected: '',
      position: 0,
      visibleMenu: false,
      position: {},
      viewMode: ViewModes.LIST,
    };

    // History Methods
    this.goToUpperLevel = this.goToUpperLevel.bind(this);

    // Node Methods
    this.handleSingleClick = this.handleSingleClick.bind(this);
    this.goToDeeperLevel = this.goToDeeperLevel.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.hideMenu = this.hideMenu.bind(this);

    // Menu Methods
    this.toggleViewMode = this.toggleViewMode.bind(this);
  }

  componentDidMount() {
    const history = [{
      id: '/',
      name: this.props.rootLabel,
      children: this.props.data,
    }];

    this.setState({
      history,
      nodes: this.props.data,
    });

    document.addEventListener('click', this.hideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideMenu);
  }

  // History Methods
  goToUpperLevel(node) {
    const index = this.state.history.findIndex(level => level.id === node.id);
    const history = this.state.history.slice(0, (index + 1));

    this.setState({
      history,
      nodes: node.children,
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

  handleRightClick(e) {
    e.preventDefault();

    const position = {};
    if (e.target === this.node_container) {
      position.x = e.clientX;
      position.y = e.clientY;
    }

    this.setState({
      visibleMenu: true,
      position,
    });
  }

  hideMenu(e) {
    if (e.target !== this.menu && !this.menu.contains(e.target)) {
      this.setState({
        visibleMenu: false,
        position: {},
      });
    }
  }

  toggleViewMode(mode) {
    this.setState({
      viewMode: mode,
      visibleMenu: false,
      position: {},
    });
  }

  render() {
    const { showHistory } = this.props;

    const classes = classNames({
      'nodes-container': true,
      'no-history': !showHistory,
      'list-mode': this.state.viewMode === ViewModes.LIST,
      'icons-mode': this.state.viewMode === ViewModes.ICONS,
    });

    return (
      <div className='container'>
        {
          showHistory &&
          <History
            nodes={this.state.history}
            goToUpperLevel={this.goToUpperLevel} />
        }

        <div className={classes} ref={component => this.node_container = component} onContextMenu={this.handleRightClick}>
          {
            this.state.nodes.map((node, index) => {
              const selected = node.id === this.state.selected;

              return (
                <Node key={node.id}
                  data={node}
                  onSingleClick={this.handleSingleClick}
                  goToDeeperLevel={this.goToDeeperLevel}
                  selected={selected}
                  handleRightClick={this.handleRightClick}
                  viewMode={this.state.viewMode} />
              );
            })
          }
        </div>

        {
          this.state.visibleMenu &&
          <div
            ref={component => this.menu = component}
            className='menu'
            style={{ top: `${this.state.position.y}px`, left: `${this.state.position.x}px` }}>
            <ul>
              <li
                onClick={() => this.toggleViewMode(ViewModes.LIST)}
                className={this.state.viewMode === ViewModes.LIST && 'selected'}>List</li>
              <li
                onClick={() => this.toggleViewMode(ViewModes.ICONS)}
                className={this.state.viewMode === ViewModes.ICONS && 'selected'}>Icons</li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

FileExplorer.propTypes = {
  data: PropTypes.array,
  showHistory: PropTypes.bool,
  rootLabel: PropTypes.string,
};

FileExplorer.defaultProps = {
  showHistory: true,
  rootLabel: 'Home',
};

export default FileExplorer;
