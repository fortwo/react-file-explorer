import React from 'react';

// Components
import FileExplorer from '../src/FileExplorer';

// Data
import sampleData from './data';

class Root extends React.Component {
  render() {
    return (
      <FileExplorer data={sampleData} />
    );
  }
}

export default Root;