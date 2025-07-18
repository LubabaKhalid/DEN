import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);

  return (
    <div>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(tx => (
          <li key={tx.id} className={tx.amount < 0 ? 'minus' : 'plus'}>
            {tx.text} 
            <span>{tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount)}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(tx.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
