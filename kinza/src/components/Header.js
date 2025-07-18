import React from 'react';
import { Link } from 'react-router-dom';
import './HistoryPage.css'; // Assuming you have a CSS file for styling

function Header() {
  return (
    <div className="header">
      <h2>Track Your Finances</h2>
      <Link to="/history" className="history-btn">View History</Link>
    </div>
  );
}

export default Header;
