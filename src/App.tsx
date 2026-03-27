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


export function App() {

  const endpoint = "https://mainnet.helius-rpc.com/?api-key=7ad415b5-ee80-4ce5-91a5-e958df942ca9";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
            <ConnectButton />
            <Portfolio />
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


export default App;
