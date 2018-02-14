import React from 'react';
import styled from 'styled-components';

// Style
const Wrapper = styled.div`
  display: flex;
  border: 1px solid;
  font-weight: bold;

  > .history-level {
    padding: 8px;
    cursor: default;

    &:hover {
      background: lightgrey;
    }
  }
`;

class History extends React.Component {
  render() {
    return (
      <Wrapper>
        {
          this.props.nodes.map((node, index) => {
            return (
              <span 
                key={index}
                className='history_level'
                onClick={() => this.props.goToUpperLevel(node)}>{node.name}</span>
            );
          })
        }
      </Wrapper>
    );
  }
}

History.propTypes = {
  nodes: React.PropTypes.array,
  goToUpperLevel: React.PropTypes.func,
};

export default History;