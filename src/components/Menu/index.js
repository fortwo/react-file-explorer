import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Constants
import * as ViewModes from '../../constants/viewModes';

// Style
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  background: white;
  border: 1px solid red;
  padding: 8px;
  display: flex;
  top: ${props => props.top};
  left: ${props => props.left};
`;

const FirstLevel = styled.ul`
  width: 100px;
  margin: 0;
  padding: 0;
  list-style: none;

  > li {
    cursor: default;

    &.selected {
      background: red;
    }
  }
`;

class Menu extends Component {
  render() {
    const { position, viewMode } = this.props;

    return (
      <Wrapper
        innerRef={component => this.menu = component}
        top={position.y}
        left={position.x}>

        <FirstLevel>
          <li
            onClick={() => this.props.toggleViewMode(ViewModes.LIST)}
            className={viewMode === ViewModes.LIST && 'selected'}>List</li>
          <li
            onClick={() => this.props.toggleViewMode(ViewModes.SMALL_ICONS)}
            className={viewMode === ViewModes.SMALL_ICONS && 'selected'}>Small Icons</li>
          <li
            onClick={() => this.props.toggleViewMode(ViewModes.MEDIUM_ICONS)}
            className={viewMode === ViewModes.MEDIUM_ICONS && 'selected'}>Medium Icons</li>
          <li
            onClick={() => this.props.toggleViewMode(ViewModes.LARGE_ICONS)}
            className={viewMode === ViewModes.LARGE_ICONS && 'selected'}>Large Icons</li>
        </FirstLevel>

      </Wrapper>
    );
  }
}

const PositionProp = {
  x: PropTypes.number,
  y: PropTypes.number,
};

Menu.propTypes = {
  position: PropTypes.shape(PositionProp),
  viewMode: PropTypes.oneOf([ViewModes.LIST, ViewModes.SMALL_ICONS, ViewModes.MEDIUM_ICONS, ViewModes.LARGE_ICONS]),
  toggleViewMode: PropTypes.func,
};

export default Menu;
