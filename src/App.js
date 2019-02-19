import React from 'react';
import { Router } from '@reach/router';
import Dashboard from './containers/Dashboard';
import GenerateCode from './components/GenerateCode';
import Login from './containers/Login';
import ScanCode from './components/ScanCode';

const App = () => (
  <Router>
    <ScanCode path="/" />
    <Login path="login" />
    <Dashboard path="dashboard" />
    <GenerateCode path="generate" />
  </Router>
);

export default App;
