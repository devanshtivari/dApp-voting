import "./App.css";
import Login from "./Components/Login";

import Connected from "./Components/Connected";
import {useState} from "react";
import {ethers} from "ethers";

export default function App () {

  useState[provider, setProvider] = useState(null);

  async function connectWallet () {
    if(window.ethereum){
      try{
        const provider_ = new ethers.providers.Web3Providers(window.ethereum);
        setProvider(provider_);
        await provider_.send("eth_requestAccounts" , []);
        const signer = provider_.getSigner()

      }catch(err){
        console.error(err);
      }
    }else{
      console.log("No web3 wallet found");
    }
  }

  return (
    <div className="app">
      <div className="app-body">
        <Login connectWallet={connectWallet}/>
      </div>
    </div>
  )
}