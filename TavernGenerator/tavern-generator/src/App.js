import React, { Component } from 'react';
import ConnectedTavernText from './containers/tavern-connector';
import TavernFloorplan from './components/tavern-floorplan';

class App extends Component {
  render() {
    return (
      <div>
        <TavernFloorplan/>
        <ConnectedTavernText/>
      </div>
    );
  }
}

export default App;
