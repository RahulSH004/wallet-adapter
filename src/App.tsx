import { ConnectionProvider, useConnection, useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
   WalletMultiButton,
   WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";


export function App() {

  const endpoint = "https://mainnet.helius-rpc.com/?api-key=7ad415b5-ee80-4ce5-91a5-e958df942ca9";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
            <ConnectButton />
            <Portfolio />
            <SendSol />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    // <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      
    // </div>
  );
}

function ConnectButton(){
  const { publicKey } = useWallet();
  return (
    <div className="flex w-full justify-end gap-2">
      {!publicKey && <WalletMultiButton /> }
      {publicKey && <WalletDisconnectButton />}
    </div>
  )
}
function Portfolio() {
  const { publicKey } = useWallet();
  const {connection} = useConnection();
  const [balance , setbalance] = useState<null | number>(null)

  useEffect(() => {
    if(publicKey){
      connection.getBalance(publicKey)
        .then(balance => setbalance(balance))
    }
  }, [publicKey])
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      {publicKey?.toString()} <br />
      Sol balance :- {balance}
    </div>
  )
}

function SendSol(){
  const { publicKey, sendTransaction } = useWallet()
  const {connection} = useConnection();

  async function sendsol(){
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;
    const transaction = new Transaction();
      transaction.add(SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));
    await sendTransaction(transaction, connection);
  }

  return (
      <div className="flex items-centre gap-2">
        <input id="to" type="text" placeholder="publickey address" className="border border-gray-400 rounded-full px-4 py-2"/>
        <input id="amount" type="number" placeholder="Amount" className="border border-gray-400 rounded-full px-4 py-2"/>
        <button onClick={sendsol}
        className="border border-gray-400 rounded-full px-4 py-2 bg-green-500 text-white">Send</button>
      </div>
    )
}


export default App;
