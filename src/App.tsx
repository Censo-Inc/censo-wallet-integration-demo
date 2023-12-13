import React, {useState} from 'react';
import './App.css';
import CensoWalletIntegration from "@censo/wallet-integration";
import QRCode from 'react-qr-code'

const mnemonic = 'grocery crush fantasy pulse struggle brain federal equip remember figure lyrics afraid tape ugly gold yard way isolate drill lawn daughter either supply student'
// use e.g. bip39's mnemonicToEntropy to convert from mnemonic to raw binary entropy
const raw = "66c6a14c56cd7435d51a61b5aac215824dddd81917f6f80ed10bbf037c8e3676"

function App() {
  const [link, setLink] = useState<string>()
  const [state, setState] = useState<'initial' | 'accepted' | 'succeeded' | 'failed'>('initial')
  const [showPhrase, setShowPhrase] = useState<boolean>(false)
  return (
    <div className="App">
      <header>
        <h1>Censo Wallet Integration Demo</h1>
      </header>
      <main className="App-header" style={{backgroundImage: "url('/wallet-mock.png')", backgroundBlendMode: "color-burn"}}>
        <div style={{backgroundColor: "darkgrey", minWidth: 900, display: "flex", flexDirection: "column", alignItems: "center"}}>
          <div style={{maxWidth: 850, margin: 48}}>
            <button style={{fontSize: "x-large", width: 300}}
                    onClick={() => setShowPhrase(!showPhrase)}
            >{showPhrase ? "Hide" : "Show"} Seed Phrase
            </button>
            {showPhrase && <>
              <div style={{margin: 48}}>{mnemonic}</div>
            </>}
          </div>
          <button style={{fontSize: "x-large", width: 300}} onClick={async () => {
            const sdk = new CensoWalletIntegration()
            const session = await sdk.initiate((success: boolean) => {
              setLink(undefined)
              setState(success ? 'succeeded' : 'failed')
            })
            setLink(await session.connect(() => {
              setState('accepted')
              session.phrase(raw)
            }))
          }}>Export Seed Phrase
          </button>
          <div style={{padding: 32}}>
            {link ? <>
              <QRCode
                size={256}
                style={{height: "auto", width: 200, padding: 32}}
                value={link}
                viewBox={`0 0 256 256`}
              />
              <div style={{fontSize: "medium", maxWidth: 600}}>
                This QR code will allow a Censo user to establish a secure connection to this wallet.
                Once they scan it and accept the export request, their seed phrase will be automatically encrypted
                and exported to their Censo app, which will allow them to securely save it.
              </div>
            </> : <>
              {state === 'accepted' && "Waiting for user to accept phrase export"}
              {state === 'succeeded' && "Successfully exported phrase"}
              {state === 'failed' && "Failed to export phrase"}
            </>
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
