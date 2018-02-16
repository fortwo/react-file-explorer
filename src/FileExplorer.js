import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import History from './components/History';
import Node from './components/Node';
import Menu from './components/Menu';

// Constants
import * as ViewModes from './constants/viewModes';
import * as SortModes from './constants/sortModes';

// Style
const Wrapper = styled.div``;

const NodesContainer = styled.div`
  margin-top: 8px;
  border: 1px solid;
  padding: 8px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  overflow: auto;

  &.no-history {
    margin: 0;
  }

  &.list-mode {
    min-height: 35px;
    flex-direction: column;
  }

  &.small-icons-mode {
    min-height: 40px;
    flex-direction: row;
  }

  &.medium-icons-mode {
    min-height: 70px;
    flex-direction: row;
  }

  &.large-icons-mode {
    min-height: 100px;
    flex-direction: row;
  }
`;

class FileExplorer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      nodes: [],
      selected: '',
      visibleMenu: false,
      position: {},
      viewMode: ViewModes.LIST,
      sortMode: SortModes.NAME,
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
    this.handleSortModeChange = this.handleSortModeChange.bind(this);
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

    const position = {
      x: (e.clientX > (this.node_container.offsetWidth / 2)) ? e.clientX - 100 - 16: e.clientX,
      y: e.clientY,
    };

    let visibleMenu = false;
    if (e.target === this.node_container) {
      visibleMenu = true;
    }

    this.setState({
      visibleMenu,
      position,
    });
  }

  hideMenu(e) {
    if (e.target !== this.menu && this.menu && !this.menu.contains(e.target)) {
      this.setState({
        visibleMenu: false,
        position: {},
      });
    }
  }

  toggleViewMode(mode) {
    if (mode !== this.state.viewMode) {
      this.setState({
        viewMode: mode,
        visibleMenu: false,
        position: {},
      }, () => {
        this.props.onViewModeChange && this.props.onViewModeChange(this.state.viewMode);
      });
    }
  }

  handleSortModeChange(mode) {
    if (mode !== this.state.sortMode) {
      let nodes = this.state.nodes.slice();

      switch (mode) {
        case SortModes.NAME:
          nodes.sort((nodeA, nodeB) => nodeA.name > nodeB.name);
          break;

        case SortModes.TYPE:
          nodes.sort((nodeA, nodeB) => {
            if (!nodeA.type) {
              return false;
            }

            if (!nodeB.type) {
              return true;
            }

            return (nodeA.type > nodeB.type);
          });
          break;

        case SortModes.SIZE:
          nodes.sort((nodeA, nodeB) => nodeA.size > nodeB.size);
          break;

        case SortModes.LAST_EDIT:
          nodes.sort((nodeA, nodeB) => nodeA.lastEdit > nodeB.lastEdit);
          break;
      }

      this.setState({
        nodes,
        sortMode: mode,
        visibleMenu: false,
        position: {},
      }, () => {
        this.props.onSortModeChange && this.props.onSortModeChange(this.state.sortMode, this.state.nodes);
      });
    }
  }

  render() {
    const { showHistory } = this.props;

    const classes = classNames({
      'no-history': !showHistory,
      'list-mode': this.state.viewMode === ViewModes.LIST,
      'small-icons-mode': this.state.viewMode === ViewModes.SMALL_ICONS,
      'medium-icons-mode': this.state.viewMode === ViewModes.MEDIUM_ICONS,
      'large-icons-mode': this.state.viewMode === ViewModes.LARGE_ICONS,
    });

    return (
      <Wrapper>
        {
          showHistory &&
          <History
            nodes={this.state.history}
            goToUpperLevel={this.goToUpperLevel} />
        }

        <NodesContainer className={classes} innerRef={component => this.node_container = component} onContextMenu={this.handleRightClick}>
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
        </NodesContainer>

        {
          this.state.visibleMenu &&
          <Menu
            menuRef={component => this.menu = component}
            position={this.state.position}
            viewMode={this.state.viewMode}
            toggleViewMode={this.toggleViewMode}
            sortMode={this.state.sortMode}
            handleSortModeChange={this.handleSortModeChange} />
        }


      </Wrapper>
    );
  }
}

FileExplorer.propTypes = {
  data: PropTypes.array,
  showHistory: PropTypes.bool,
  rootLabel: PropTypes.string,
  onViewModeChange: PropTypes.func,
};

FileExplorer.defaultProps = {
  showHistory: true,
  rootLabel: 'Home',
};

export default FileExplorer;
