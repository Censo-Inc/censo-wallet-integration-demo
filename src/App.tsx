import React from 'react';
import './App.css';
import CensoWalletIntegration from "@censo/wallet-integration/dist/src";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => {
          const sdk = new CensoWalletIntegration()
        }}>Export Seed Phrase</button>
      </header>
    </div>
  );
}

export default App;
