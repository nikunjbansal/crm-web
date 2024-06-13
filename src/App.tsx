import React from 'react';
import { Provider } from 'react-redux';
import { store } from './data/store';
import Header from './Header';
import logo from './logo.svg';
import NonProfits from './pages/NonProfit';
// import './App.css';
import Dashboard from './pages/Notifications';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <NonProfits />
    </Provider>
  );
}

export default App;
