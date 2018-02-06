import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Node extends React.Component {
  constructor() {
    super();

    this.state = {
      hovered: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleMouseOver() {
    this.setState({
      hovered: !this.state.hovered,
    });
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
      'file': !isFolder,
      'folder': isFolder,
      'hovered': this.state.hovered && !selected,
      'selected': selected,
      'no-select': true,
    });

    return (
      <div
        className={classes}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseOver}
        onClick={() => onSingleClick(data.id)}
        onDoubleClick={() => this.handleDoubleClick(data)}>
        {data.name}
      </div>
    );
  }
}

Node.propTypes = {
  data: PropTypes.object,
  onSingleClick: PropTypes.func,
  goToDeeperLevel: PropTypes.func,
  selected: PropTypes.bool,
};

export default Node;