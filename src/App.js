import React from 'react';
import { Router } from '@reach/router';
import GenerateCode from './components/GenerateCode';
import Login from './containers/Login';
import ScanCode from './components/ScanCode';

const App = () => (
  <Router>
    <ScanCode path="/" />
    <Login path="/login" />
    <GenerateCode path="/generate" />
  </Router>
);

export default App;
