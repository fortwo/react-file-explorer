import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// Components
import OriginalFileExplorer from '../../src/FileExplorer';

// Data
import data from '../data';

const FileExplorer = styled(OriginalFileExplorer) `
  background: lightgreen;

  & .history {
    background: orange;
  }

  & .history-level {
    background: yellow;
    font-size: 23px;

    &:hover {
      background: green;
    }
  }

  & .node {
    background: lightblue;

    & .renaming-form input {
      background: black;
      color: white;
    }
  }
`;

ReactDOM.render(
  <div>
    <h1>With styled-components</h1>
    <FileExplorer
      data={data}
      onDownload={(id) => console.log('download', id)}
      onRename={(id, name) => console.log('rename', id, name)} />
  </div>,
  document.getElementById('root')
);