import React from 'react';
import logo from './logo.svg';
import './App.css';
import CentralContextProvider from './contexts/CentralContextProvider';
import Dashboard from './layouts/Dashboard';

function App() {
  return (
    <CentralContextProvider>
      <div className="App">
        <Dashboard />
      </div>
    </CentralContextProvider>
  );
}

export default App;
