import React from 'react';
import { useMutation } from 'react-query';

const BroadcastTransaction = () => {
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    (transactionData) => {
      // Replace with your actual API endpoint
      const apiUrl = 'https://pwrexplorerbackend.pwrlabs.io/broadcast/';

      return fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ txn: transactionData }),
      }).then((response) => response.json());
    }
  );

  const handleBroadcast = () => {
    // Replace with your hardcoded transaction data
    const hardcodedTransactionData = '1234abcd5678efg';

    // Call the mutation function with the hardcoded data
    mutate(hardcodedTransactionData);
  };

  return (
    <div>
      <h2>Broadcast Transaction</h2>
      <button onClick={handleBroadcast} disabled={isLoading}>
        {isLoading ? 'Broadcasting...' : 'Broadcast Transaction'}
      </button>
      {isError && <div>Error: {error.message}</div>}
      {isSuccess && <div>Transaction broadcasted successfully!</div>}
    </div>
  );
};

export default BroadcastTransaction;
