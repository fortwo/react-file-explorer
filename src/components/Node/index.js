import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Constants
import * as ViewModes from '../../constants/viewModes';

// Assets
import fileIcon from '../../assets/file_icon.png';
import folderIcon from '../../assets/folder_icon.png';

// Style
import './index.css';

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
    const { data, selected, onSingleClick } = this.props;
    const isFolder = !!data.children;

    const classes = classNames({
      'node': true,
      'file': !isFolder,
      'folder': isFolder,
      'selected': selected,
      'noselect': true,
    });

    return (
      <div
        className={classes}
        onContextMenu={this.handleRightClick}
        onClick={() => onSingleClick(data.id)}
        onDoubleClick={() => this.handleDoubleClick(data)}>
        <img className='icon' src={isFolder ? folderIcon : fileIcon} />
        <div className='filename'>{data.name}</div>
      </div>
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
