import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import HistoryPage from './components/HistoryPage';
import History from './components/History';
function App() {
  const [showMainApp, setShowMainApp] = useState(false);

  return (
    <GlobalProvider>
      <Router>
        <div className="main-container">
          {!showMainApp ? (
            <div className="landing">
              <h1 className="title">Personal Finance Manager</h1>
              <p className="credit">Created by Kinza Noor</p>
              <button className="enter-btn" onClick={() => setShowMainApp(true)}>Enter</button>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <div className="app-container">
                    <Header />
                    <Balance />
                    <IncomeExpense />
                    <AddTransaction />
                  </div>
                }
              />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          )}
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
