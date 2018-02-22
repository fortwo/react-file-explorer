import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Constants
import * as ViewModes from '../../constants/viewModes';
import * as SortModes from '../../constants/sortModes';

// HoC
import enhanceWithClickOutside from 'react-click-outside';

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

    & .selected {
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
  constructor() {
    super();

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside() {
    this.props.handleClickOutside();
  }

  render() {
    const {
      position, type, viewMode, sortMode, menuRef,
      sortableByName, sortableBySize, sortableByType, sortableByLastEdit,
    } = this.props;

    const sortable = sortableByName || sortableBySize || sortableByType || sortableByLastEdit;

    return (
      <Wrapper
        innerRef={menuRef}
        top={position.y}
        left={position.x}>

        {
          type === 'general' &&
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

            {
              sortable &&
              <li className='first-level'>
                <div>Sort by</div>
                <ul className='nested-level'>
                  {
                    sortableByName &&
                    <li onClick={() => this.props.handleSortModeChange(SortModes.NAME)}
                      className={sortMode === SortModes.NAME && 'selected'}>Name</li>
                  }

                  {
                    sortableBySize &&
                    <li onClick={() => this.props.handleSortModeChange(SortModes.SIZE)}
                      className={sortMode === SortModes.SIZE && 'selected'}>Size</li>
                  }

                  {
                    sortableByType &&
                    <li onClick={() => this.props.handleSortModeChange(SortModes.TYPE)}
                      className={sortMode === SortModes.TYPE && 'selected'}>Type</li>
                  }

                  {
                    sortableByLastEdit &&
                    <li onClick={() => this.props.handleSortModeChange(SortModes.LAST_EDIT)}
                      className={sortMode === SortModes.LAST_EDIT && 'selected'}>Last edit</li>
                  }
                </ul>
              </li>
            }
          </FirstLevelWrapper>
        }

        {
          type === 'file' &&
          <FirstLevelWrapper>
            <li
              onClick={() => this.props.onDownload()}
              className='first-level'>Download</li>

            <li
              onClick={() => this.props.onRename()}
              className='first-level'>Rename</li>

            <li
              onClick={() => this.props.onDelete()}
              className='first-level'>Delete</li>
          </FirstLevelWrapper>
        }
      </Wrapper>
    );
  }
}

const PositionProp = {
  x: PropTypes.number,
  y: PropTypes.number,
};

Menu.propTypes = {
  handleClickOutside: PropTypes.func,
  position: PropTypes.shape(PositionProp),
  viewMode: PropTypes.oneOf([ViewModes.LIST, ViewModes.SMALL_ICONS, ViewModes.MEDIUM_ICONS, ViewModes.LARGE_ICONS]),
  toggleViewMode: PropTypes.func,
  sortMode: PropTypes.oneOf([SortModes.NAME, SortModes.SIZE, SortModes.TYPE, SortModes.LAST_EDIT]),
  handleSortModeChange: PropTypes.func,
  sortableByName: PropTypes.bool,
  sortableBySize: PropTypes.bool,
  sortableByType: PropTypes.bool,
  sortableByLastEdit: PropTypes.bool,
  type: PropTypes.oneOf(['general', 'file']),
  onRename: PropTypes.func,
  onDelete: PropTypes.func,
  onDownload: PropTypes.func,
};

Menu.defaultProps = {
  sortableByName: true,
  sortableBySize: true,
  sortableByType: true,
  sortableByLastEdit: true,
  type: 'general',
};

export default enhanceWithClickOutside(Menu);
