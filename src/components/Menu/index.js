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
  top: ${props => props.top};
  left: ${props => props.left};
`;

const FirstLevelWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 1;

  > li {
    cursor: default;

    &:hover {
      background: orange;
    }

    &.selected {
      background: red;
    }
  }

  > .first-level {
    position: relative;
  }

  > .first-level > .nested-level {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    border: 1px solid red;
    padding: 8px;
  }

  > .first-level:hover > .nested-level {
    display: block;
    list-style: none;
    left: 40px;
    z-index: 2;

    > li:hover {
      background: orange;
    }
  }
`;

class Menu extends Component {
  render() {
    const { position, viewMode, menuRef } = this.props;

    return (
      <Wrapper
        innerRef={menuRef}
        top={position.y}
        left={position.x}>

        <FirstLevelWrapper>
          <li className='first-level'>
            <div>View</div>
            <ul className='nested-level'>
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
            </ul>
          </li>

          <li className='first-level'>
            <div>Sort by</div>
            <ul className='nested-level'>
              <li>Name</li>
              <li>Size</li>
              <li>Type</li>
              <li>Last edit</li>
            </ul>
          </li>
        </FirstLevelWrapper>

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
