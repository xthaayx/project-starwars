import React, { useContext } from 'react';
import './App.css';
import Table from './components/Table';
import AppPlanetsProvider from './context/AppPlanetsProvider';

function App() {
  const context = useContext(AppPlanetsProvider);
  console.log('context', context);
  return (
    <div>
      <span>Hello, App !</span>
      <Table />
    </div>
  );
}

export default App;
