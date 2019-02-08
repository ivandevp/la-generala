import React from 'react';
import { Router } from '@reach/router';
import GenerateCode from './components/GenerateCode';
import ScanCode from './components/ScanCode';

const App = () => (
  <Router>
    <ScanCode path="/" />
    <GenerateCode path="/generate" />
  </Router>
);

export default App;
