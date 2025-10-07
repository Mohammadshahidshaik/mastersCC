import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SignUp from './components/SignUp';
import Mint from './components/Mint';
import DefiABI from './artifacts/contracts/Defi.sol/Defi.json';
import TweetsABI from './artifacts/contracts/Tweets.sol/Tweets.json';
import NFTandDefiMergedABI from './artifacts/contracts/NFTandDefiMerged.sol/NFTandDefiMerged.json';

// Contract addresses
const defiAddress = "0xB67aC27F43a327EC528F04B542AfAa49d430E79A";
const tweetsAddress = "0xF82e1eEca5D4F198447fEaf2695D52e93893F05B";
const nftAndDefiMergedAddress = "0x3533700E04C920436EDaEA85dFE568C7fb9f5949";

const App = () => {
    const [defiContract, setDefiContract] = useState(null);
    const [tweetsContract, setTweetsContract] = useState(null);
    const [nftAndDefiMergedContract, setNftAndDefiMergedContract] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);

                const defi = new ethers.Contract(defiAddress, DefiABI.abi, signer);
                const tweets = new ethers.Contract(tweetsAddress, TweetsABI.abi, signer);
                const nftAndDefiMerged = new ethers.Contract(nftAndDefiMergedAddress, NFTandDefiMergedABI.abi, signer);

                setDefiContract(defi);
                setTweetsContract(tweets);
                setNftAndDefiMergedContract(nftAndDefiMerged);
            } else {
                alert("Please install MetaMask to use this DApp!");
            }
        };
        init();
    }, []);

    return (
        <div>
            <h1>My DApp</h1>
            {defiContract && tweetsContract && nftAndDefiMergedContract && account ? (
                <>
                    <SignUp contract={tweetsContract} account={account} />
                    <Mint contract={nftAndDefiMergedContract} account={account} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default App;
