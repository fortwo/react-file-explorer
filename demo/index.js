import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// Components
import FileExplorer from '../src/FileExplorer';

// Data
import data from './data';

ReactDOM.render(
  <FileExplorer
    data={data}
    onDownload={(id) => console.log('download', id)}
    onRename={(id, name) => console.log('rename', id, name)} />,
  document.getElementById('root')
);