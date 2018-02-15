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
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  min-width: 150px;
  width: 150px;

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

  &.small-icons-mode, &.medium-icons-mode, &.large-icons-mode {
    flex-direction: column;
    align-items: center;
  }

  &.small-icons-mode {
    > .icon {
      height: 32px;
    }
  }

  &.medium-icons-mode {
    > .icon {
      height: 48px;
    }
  }

  &.large-icons-mode {
    > .icon {
      height: 72px;
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
      'small-icons-mode': viewMode === ViewModes.SMALL_ICONS,
      'medium-icons-mode': viewMode === ViewModes.MEDIUM_ICONS,
      'large-icons-mode': viewMode === ViewModes.LARGE_ICONS,
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
  viewMode: PropTypes.oneOf([ViewModes.LIST, ViewModes.SMALL_ICONS, ViewModes.MEDIUM_ICONS, ViewModes.LARGE_ICONS]),
};

export default Node;
