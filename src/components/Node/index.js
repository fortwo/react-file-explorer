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
    align-items: center;

    > .icon {
      height: 16px;
    }

    > .filename-input {
      margin-left: 4px;
      height: 18px;
    }
  }

  &.small-icons-mode, &.medium-icons-mode, &.large-icons-mode {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .filename-input {
      margin: 0;
    }
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

const RenamingForm = styled.form`
  margin: 0;
`;

class Node extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.data && props.data.name,
    };

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleRenameSubmit = this.handleRenameSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Reset state after rename
    if (nextProps.renaming !== this.props.renaming && !nextProps.renaming) {
      this.setState({
        name: nextProps.data && nextProps.data.name,
      });
    }
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

  handleRenameSubmit(e) {
    e.preventDefault();

    const { data, onRenameSubmit } = this.props;
    onRenameSubmit(data.id, this.state.name);
  }

  render() {
    const { data, selected, onSingleClick, viewMode, renaming } = this.props;
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

        {
          renaming ?
          <RenamingForm onSubmit={this.handleRenameSubmit}>
            <input
              className='filename-input'
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })} />
          </RenamingForm>
          :
          <div className='filename'>{data.name}</div>
        }
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
  renaming: PropTypes.bool,
  onRenameSubmit: PropTypes.func,
};

export default Node;
