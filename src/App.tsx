import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
   WalletMultiButton,
   WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';


export function App() {

  const endpoint = "https://mainnet.helius-rpc.com/?api-key=7ad415b5-ee80-4ce5-91a5-e958df942ca9";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
            <ConnectButton />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    // <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      
    // </div>
  );
}

function ConnectButton(){
  return (
    <div className="flex w-full justify-end gap-2">
      <WalletMultiButton />
      <WalletDisconnectButton />
    </div>
  )
}


export default App;
