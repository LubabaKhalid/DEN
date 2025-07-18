import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import './History.css';

function History() {
  const { transactions } = useContext(GlobalContext);

  return (
    <div className="history-page">
      <h2 className="history-title">🧾 Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="no-history">No transaction history available.</p>
      ) : (
        <ul className="history-list">
          {transactions.map((transaction, index) => (
            <li
              key={index}
              className={`history-item ${transaction.amount < 0 ? 'expense' : 'income'}`}
            >
              <span className="desc">{transaction.text}</span>
              <span className="amount">
                {transaction.amount < 0 ? '-' : '+'}₨{Math.abs(transaction.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
