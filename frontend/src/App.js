import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Tabs from './Components/Tabs';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Redirect exact from="/" to="/https://lmsapi.eduskillsfoundation.org/" /> */}
      <header className="App-header">
        <h1>Welcome to Connect - 2024</h1>
      </header>
      <Tabs />
    </div>
  );
}

export default App;
