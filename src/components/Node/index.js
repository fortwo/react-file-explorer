import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Constants
import * as ViewModes from '../../constants/viewModes';

// Assets
import fileIcon from '../../assets/file_icon.png';
import folderIcon from '../../assets/folder_icon.png';

// Style
const Wrapper = styled.div`
  display: flex;
  cursor: default;
  position: relative;
  width: 33%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: lightseagreen;
    color: white;
  }

  &.selected {
    background-color: seagreen;
    color: white;
  }

  &.list-mode {
    flex-direction: row;

    > .icon {
      height: 16px;
    }
  }

  &.icons-mode {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .icon {
      height: 48px;
    }
  }

  > .filename {
    margin-left: 4px;
  }
`;

class Node extends React.Component {
  constructor() {
    super();

    this.state = {
      visibleMenu: false,
    };

    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleRightClick(e) {
    e.preventDefault();

    // e.target.offsetTop

    //this.props.handleRightClick({ x: e.clientX, y: e.target.offsetTop });
  }

  handleDoubleClick(data) {
    if (data.children) {
      this.props.goToDeeperLevel(data)
    }
  }

  render() {
    const { data, selected, onSingleClick, viewMode } = this.props;
    const isFolder = !!data.children;

    const classes = classNames({
      'file': !isFolder,
      'folder': isFolder,
      'selected': selected,
      'list-mode': viewMode === ViewModes.LIST,
      'icons-mode': viewMode === ViewModes.ICONS,
    });

    return (
      <Wrapper
        className={classes}
        onContextMenu={this.handleRightClick}
        onClick={() => onSingleClick(data.id)}
        onDoubleClick={() => this.handleDoubleClick(data)}>
        <img className='icon' src={isFolder ? folderIcon : fileIcon} />
        <div className='filename'>{data.name}</div>
      </Wrapper>
    );
  }
}

Node.propTypes = {
  data: PropTypes.object,
  onSingleClick: PropTypes.func,
  goToDeeperLevel: PropTypes.func,
  selected: PropTypes.bool,
  handleRightClick: PropTypes.func,
  viewMode: PropTypes.oneOf([ViewModes.LIST, ViewModes.ICONS]),
};

export default Node;
