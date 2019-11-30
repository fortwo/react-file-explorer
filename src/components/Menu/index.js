import React from 'react';
import PropTypes from 'prop-types';

// Constants
import * as ViewModes from '../../constants/viewModes';
import * as SortModes from '../../constants/sortModes';

// HoC
import enhanceWithClickOutside from 'react-click-outside';

// Style
import {FirstLevelWrapper, Wrapper} from './style'


const Menu = ({
  handleClickOutside,
  position, type,
  viewMode, toggleViewMode,
  sortMode, sortableByName, 
  sortableBySize, sortableByType, 
  sortableByLastEdit, handleSortModeChange,
  onRename, onDelete}) => {  

  const sortable = sortableByName || sortableBySize || sortableByType || sortableByLastEdit;

  return (
    <Wrapper
      top={position.y}
      left={position.x}
      className='menu'
      onClickOutside={() => handleClickOutside}
      >      
      {
        type === 'general' &&
        <FirstLevelWrapper>
          <li className='first-level'>
            <div>View</div>
            <ul className='nested-level'>
              <li
                onClick={() => toggleViewMode(ViewModes.LIST)}
                className={viewMode === ViewModes.LIST && 'selected'}>List</li>
              <li
                onClick={() => toggleViewMode(ViewModes.SMALL_ICONS)}
                className={viewMode === ViewModes.SMALL_ICONS && 'selected'}>Small Icons</li>
              <li
                onClick={() => toggleViewMode(ViewModes.MEDIUM_ICONS)}
                className={viewMode === ViewModes.MEDIUM_ICONS && 'selected'}>Medium Icons</li>
              <li
                onClick={() => toggleViewMode(ViewModes.LARGE_ICONS)}
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
                  <li onClick={() => handleSortModeChange(SortModes.NAME)}
                    className={sortMode === SortModes.NAME && 'selected'}>Name</li>
                }

                {
                  sortableBySize &&
                  <li onClick={() => handleSortModeChange(SortModes.SIZE)}
                    className={sortMode === SortModes.SIZE && 'selected'}>Size</li>
                }

                {
                  sortableByType &&
                  <li onClick={() => handleSortModeChange(SortModes.TYPE)}
                    className={sortMode === SortModes.TYPE && 'selected'}>Type</li>
                }

                {
                  sortableByLastEdit &&
                  <li onClick={() => handleSortModeChange(SortModes.LAST_EDIT)}
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
          {
            onRename &&
            <li
              onClick={onRename}
              className='first-level'>Rename</li>
          }

          {
            onDelete &&
            <li
              onClick={onDelete}
              className='first-level'>Delete</li>
          }
        </FirstLevelWrapper>
      }
    </Wrapper>
  );
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
};

Menu.defaultProps = {
  sortableByName: true,
  sortableBySize: true,
  sortableByType: true,
  sortableByLastEdit: true,
  type: 'general',
};

export default enhanceWithClickOutside(Menu);
