import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Constants
import * as ViewModes from '../../constants/viewModes';

// Assets
import fileIcon from '../../assets/file_icon.png';
import folderIcon from '../../assets/folder_icon.png';

// Components
import RenamingForm from '../RenamingForm';

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
    align-items: center;

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

const Node = (props) => {
  const {
    data,
    selected,
    onSingleClick,
    onRightClick,
    viewMode,
    renaming,
    onRenameSubmit,
    goToDeeperLevel
  } = props;

  const [name, setName] = useState(data && data.name);

  useEffect(() => {
    setName(data && data.name);
  }, [renaming])

  const handleDoubleClick = (data) => {
    if (data.children) {
      goToDeeperLevel(data)
    }
  };

  const handleRightClick = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    onRightClick(e, id);
  };

  const handleRenameSubmit = (e) => {
    e.preventDefault();

    onRenameSubmit(data.id, name);
  };

  const isFolder = !!data.children;

  const listView = viewMode === ViewModes.LIST;

  const classes = classNames({
    'file': !isFolder,
    'folder': isFolder,
    'selected': selected,
    'list-mode': listView,
    'small-icons-mode': viewMode === ViewModes.SMALL_ICONS,
    'medium-icons-mode': viewMode === ViewModes.MEDIUM_ICONS,
    'large-icons-mode': viewMode === ViewModes.LARGE_ICONS,
  });

  return (
    <Wrapper
      id={data.id}
      className={`node ${classes}`}
      onClick={() => onSingleClick(data.id)}
      onDoubleClick={() => handleDoubleClick(data)}
      onContextMenu={(e) => handleRightClick(e, data.id)}>
      <img className='icon' src={isFolder ? folderIcon : fileIcon} />

      {
        renaming ?
          <RenamingForm
            listView={listView}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onSubmit={handleRenameSubmit}
            onClickOutside={handleRenameSubmit} />
          :
          <div className='filename'>{data.name}</div>
      }
    </Wrapper>
  );
};

Node.propTypes = {
  data: PropTypes.object,
  onSingleClick: PropTypes.func,
  goToDeeperLevel: PropTypes.func,
  selected: PropTypes.bool,
  viewMode: PropTypes.oneOf([ViewModes.LIST, ViewModes.SMALL_ICONS, ViewModes.MEDIUM_ICONS, ViewModes.LARGE_ICONS]),
  onRightClick: PropTypes.func,
  renaming: PropTypes.bool,
  onRenameSubmit: PropTypes.func,
};

export default Node;
