import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// HoC
import enhanceWithClickOutside from 'react-click-outside';

// Style
const Wrapper = styled.form`
  margin: ${props => props.listView ? `0 0 0 4px` : `0 4px`};

  > input {
    height: 18px;
    width: 100%;
    text-align: center;
  }
`;

class RenamingForm extends Component {
  handleClickOutside(e) {
    this.props.onClickOutside(e);
  }

  render() {
    const {  listView, onSubmit, value, onChange } = this.props;

    return (
      <Wrapper listView={listView} onSubmit={onSubmit} className='renaming-form'>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className='renaming-form-input' />
      </Wrapper>
    );
  }
}

RenamingForm.propTypes = {
  listView: PropTypes.bool,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClickOutside: PropTypes.func,
};

RenamingForm.defaultProps = {
  listView: false,
};

export default enhanceWithClickOutside(RenamingForm);