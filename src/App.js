import React, { Component } from 'react';
import Form from './components/Form'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form movie={{ title: 'Hello Kitty'}} />
      </div>
    );
  }
}

export default App;
