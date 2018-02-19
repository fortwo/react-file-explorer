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
    justify-content: center;
    align-items: center;
  }

  &.small-icons-mode {
    height: 60px;

    > .icon {
      height: 32px;
    }
  }

  &.medium-icons-mode {
    height: 76px;

    > .icon {
      height: 48px;
    }
  }

  &.large-icons-mode {
    height: 100px;

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

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  handleDoubleClick(data) {
    if (data.children) {
      this.props.goToDeeperLevel(data)
    }
  }

  handleRightClick(e, id) {
    e.stopPropagation();
    e.preventDefault();

    this.props.onRightClick(e, id);
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
        id={data.id}
        className={classes}
        onClick={() => onSingleClick(data.id)}
        onDoubleClick={() => this.handleDoubleClick(data)}
        onContextMenu={(e) => this.handleRightClick(e, data.id)}>
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
  viewMode: PropTypes.oneOf([ViewModes.LIST, ViewModes.SMALL_ICONS, ViewModes.MEDIUM_ICONS, ViewModes.LARGE_ICONS]),
  onRightClick: PropTypes.func,
};

export default Node;
