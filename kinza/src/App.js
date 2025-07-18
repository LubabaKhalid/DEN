import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';

function App() {
  const [showMainApp, setShowMainApp] = useState(false);

  return (
    <GlobalProvider>
      <div className="main-container">
        {!showMainApp ? (
          <div className="landing">
            <h1 className="title">Personal Finance Manager</h1>
            <p className="credit">Created by Kinza Noor</p>
            <button className="enter-btn" onClick={() => setShowMainApp(true)}>Enter</button>
          </div>
        ) : (
          <div className="app-container">
            <Header />
            <Balance />
            <IncomeExpense />
            <TransactionList />
            <AddTransaction />
          </div>
        )}
      </div>
    </GlobalProvider>
  );
}

export default App;
