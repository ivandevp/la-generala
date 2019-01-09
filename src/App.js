import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import GenerateCode from './components/GenerateCode';
import ScanCode from './components/ScanCode';

class App extends Component {
  render() {
    return (
      <Router>
        <GenerateCode path="/" />
        <ScanCode path="scan" />
      </Router>
    );
  }
}

export default App;
