import React from 'react';
import ReactDOM from 'react-dom';

// Components
import FileExplorer from '../../src/FileExplorer';

// Data
import data from '../data';

ReactDOM.render(
  <div>
    <h1>With pure CSS</h1>
    <FileExplorer
      data={data}
      onDownload={(id) => console.log('download', id)}
      onRename={(id, name) => console.log('rename', id, name)} />
  </div>,
  document.getElementById('root')
);