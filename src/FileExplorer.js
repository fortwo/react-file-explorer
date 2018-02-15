import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import History from './components/History';
import Node from './components/Node';

// Constants
import * as ViewModes from './constants/viewModes';

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

const Menu = styled.div`
  position: absolute;
  top: 0;
  background: white;
  width: 100px;
  border: 1px solid red;
  padding: 8px;

  > ul {
    margin: 0;
    padding: 0;
    list-style: none;

    > li {
      cursor: default;

      &.selected {
        background: red;
      }
    }
  }
`;

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
    if (e.target !== this.menu && this.menu && !this.menu.contains(e.target)) {
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
            innerRef={component => this.menu = component}
            style={{ top: `${this.state.position.y}px`, left: `${this.state.position.x}px` }}>
            <ul>
              <li
                onClick={() => this.toggleViewMode(ViewModes.LIST)}
                className={this.state.viewMode === ViewModes.LIST && 'selected'}>List</li>
              <li
                onClick={() => this.toggleViewMode(ViewModes.SMALL_ICONS)}
                className={this.state.viewMode === ViewModes.SMALL_ICONS && 'selected'}>Small Icons</li>
              <li
                onClick={() => this.toggleViewMode(ViewModes.MEDIUM_ICONS)}
                className={this.state.viewMode === ViewModes.MEDIUM_ICONS && 'selected'}>Medium Icons</li>
              <li
                onClick={() => this.toggleViewMode(ViewModes.LARGE_ICONS)}
                className={this.state.viewMode === ViewModes.LARGE_ICONS && 'selected'}>Large Icons</li>
            </ul>
          </Menu>
        }
      </Wrapper>
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
