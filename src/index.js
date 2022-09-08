import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppPlanetsProvider from './context/AppPlanetsProvider';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <AppPlanetsProvider>
    <App />
  </AppPlanetsProvider>,
  document.getElementById('root'),
);
