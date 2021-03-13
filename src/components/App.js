import { useState } from 'react';
import './App.scss';
import Connect from './Connect/Connect';
import Balance from './Balance/Balance';

function App() {

  const [account, setAccount] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blockchain Playground</h1>
        <Connect setAccount={setAccount} />
        {account && 
          <Balance account={account} />
        }
      </header>
    </div>
  );
}

export default App;
