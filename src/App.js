import "./App.css";
import Login from "./Components/Login";
import Connected from "./Components/Connected";
import Results from "./Components/Results";
import {contractAddress , contractAbi} from './Constants/constant';

import {useState , useEffect} from "react";
import {ethers} from "ethers";

export default function App () {

  const[provider, setProvider] = useState(null);
  const[conn, setConn] = useState(false);
  const[address, setAddress] = useState(null);
  const[votingStatus, setVotingStatus] = useState(true);
  const[remainingTime, setRemainingTime] = useState(0);
  const[candidates, setCandidates] = useState([]);
  const[choice, setChoice] = useState(0);
  const[canVote, setcanVote] = useState(true);

  useEffect( () => {
    getCandidate();
    getRemainingTime();
    getCurrentStatus();
    voterEligibility();
    if(window.ethereum) {
      window.ethereum.on('accountsChanged' , handleAccountChanged);
    }

    return () => {
      if(window.ethereum) {
        window.ethereum.removeListener('accountsChanged' , handleAccountChanged);
      }
    }
  },[])

  async function addVote () {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts" , []);
    const signer_ = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress , contractAbi , signer_
    )
    const tx = await contractInstance.addVote(choice);
    voterEligibility(); 
  }

  async function voterEligibility () {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts" , []);
    const signer_ = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress , contractAbi , signer_
    )
    const voteStatus = await contractInstance.voters(await signer_.getAddress());
    setcanVote(voteStatus);
  }

  async function getCandidate () {  //it will give the array of all the candidates
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts" , []);
    const signer_ = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress , contractAbi , signer_
    );
    const candidateList = await contractInstance.getAllVotesofCandidate();
    const formattedList = candidateList.map((candidate , index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: parseInt(candidate.voteCount)
      }
    });
    console.log(formattedList);
    setCandidates(formattedList);
  }

  async function getCurrentStatus () {   //to check if voting can go or not
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts" , []);
    const signer_ = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress , contractAbi , signer_
    );
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status);
  }

  async function getRemainingTime () {  //to get the remaining time from SC and set it
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts" , []);
    const signer_ = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress , contractAbi , signer_
    );
    const time = await contractInstance.getRemainingVoteTime();
    setRemainingTime(parseInt(time , 16));
  }

  function handleAccountChanged(accounts) {  //function to check any change in account address
    if(accounts > 0 && accounts[0] != address){
      setAddress(accounts[0]);
      voterEligibility();
    }else{
      setAddress(null);
      setConn(false);
    }
  }

  async function connectWallet () {  //function to connect the wallet
    if(window.ethereum){
      try{
        const provider_ = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider_);
        await provider_.send("eth_requestAccounts" , []);
        const signer = await provider_.getSigner();
        const address_ = await signer.getAddress();
        setAddress(address_)
        setConn(true);
        voterEligibility();
      }catch(err){
        console.error(err);
      }
    }else{
      console.log("No web3 wallet found");
    }
  }

  function handleInputChange(e) {
    console.log(e.target.value);
    setChoice(e.target.value);
  }

  return (
    <div className="app">
      <div className="app-body">
        {votingStatus ? (conn ? <Connected account={address} candidates={candidates} votingStatus={votingStatus} remainingTime={remainingTime} handleChange={handleInputChange} addVote={addVote} canVote={canVote}/> : <Login connectWallet={connectWallet}/>) : <Results account={address} candidates={candidates}/>}
      </div>
    </div>
  )
}