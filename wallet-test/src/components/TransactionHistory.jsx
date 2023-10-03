// components/TransactionHistory.js
import React from 'react';
import { useQuery } from 'react-query';

function TransactionHistory() {
  const address = '0x61Bd8fc1e30526Aaf1C4706Ada595d6d236d9883'; // Hardcoded address
  const count = 10; // You can also hardcode the count if needed
    
  const fetchTransactionHistory = async () => {
    const res = await fetch(`https://pwrexplorerbackend.pwrlabs.io/transactionHistory/?address=${address}&count=${count}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  };

  const { data, error, isLoading } = useQuery(['transactionHistory', address, count], fetchTransactionHistory);
  console.log('transactionHistory', data);
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  
  // Check if the status of the request is not success
  if (data.status !== 'success') return 'Failed to fetch transaction history';
  
  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {data.data.txns.map((transaction, index) => (
          <div key={index}>
            {/* Render transaction properties as needed */}
            <p>Transaction Hash: {transaction.txnHash}</p>
            <p>TimeStamp: {transaction.timeStamp}</p>
            <p>Transaction Fee: {transaction.txnFee}</p>
            <p>Transaction Fee in USD: {transaction.txnFeeInUsd}</p>
            <p>Transaction Type: {transaction.txnType}</p>
            <p>Value:{transaction.value}</p>
            <p>Value In USD: {transaction.valueInUsd}$</p>
            
            {/*...other transaction details...*/}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
