import { ed25519 } from "@noble/curves/ed25519.js";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from 'bs58'

export function SignMessage(){
    const {publicKey, signMessage} = useWallet();

    async function onclick(){
        if(!publicKey) throw new Error("wallet not connected")
        
        const message = document.getElementById("message").value;
        const endcoded = new TextEncoder().encode(message)
        const signessage = await signMessage(endcoded);

        if(!ed25519.verify(signessage, endcoded, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success',`Message signature: ${bs58.encode(signessage)}`)
    }

    return (
        <div>
            <input id="message" type="text" placeholder="message" className="border border-gray-400 rounded-full px-4 py-2"/>
            <button onClick={onclick} 
            className="border border-gray-400 rounded-full px-4 py-2 bg-green-500 text-white"> SEND </button>
        </div>
    )
}