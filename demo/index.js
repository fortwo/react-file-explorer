import React from 'react';
import ReactDOM from 'react-dom';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/styles/hljs';

// Components
import FileExplorer from '../src/FileExplorer';

// Data
import data from './data';

// Fake styles
import { css } from './styles';

ReactDOM.render(
  <div>
    <h1>React File Explorer</h1>

    <h3>This is the style in use...</h3>
    <SyntaxHighlighter language='css' style={tomorrowNightEighties}>{css}</SyntaxHighlighter>

    <h3>...and this is the result</h3>
    <FileExplorer
      data={data}
      onRename={(id, name) => console.log('rename', id, name)}
    />
  </div>,
  document.getElementById('root')
);
