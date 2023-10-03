import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TransactionHistory from './components/TransactionHistory';
import CreateSignature from './components/CreateSignature';
import UserBalance from './components/UserBalance';
import UserNounce from './components/UserNounce';
import SendingTransaction from './components/SendingTransaction';
import CreateTransaction from './components/CreateTransaction';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
     
     {/* <TransactionHistory /> */}
      {/* <CreateSignature/> */}
     {/* <UserBalance/> */}
     {/* <UserNounce/> */}
      <CreateTransaction/>
     {/* <SendingTransaction/> */}
    </QueryClientProvider>
  );
}

export default App;
