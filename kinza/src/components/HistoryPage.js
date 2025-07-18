import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import './HistoryPage.css';



const HistoryPage = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <div className="history-page">
      <h2 className="history-title">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="no-history">No transactions to show</p>
      ) : (
        <ul className="history-list">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={`history-item ${transaction.amount < 0 ? 'expense' : 'income'}`}
            >
              <span className="desc">{transaction.text}</span>
              <span className="amount">
                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/" className="back-home-btn">⬅ Back to Home</Link>
      </div>
    </div>
  );
};

export default HistoryPage;
