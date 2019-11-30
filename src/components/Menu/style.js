import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  background: white;
  border: 1px solid red;
  padding: 8px;
  top: ${props => props.top};
  left: ${props => props.left};
`;

export const FirstLevelWrapper = styled.ul`
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
