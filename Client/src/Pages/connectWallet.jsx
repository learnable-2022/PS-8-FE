import React, { useState } from 'react';
import '../index.css';
import { ethers } from 'ethers';


const contractAddress = '0x0B2ae7d89cCB3CF33eC7c1C4191593d71B15999E';
const contractAbi = payme.json

const ConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await signer.getAddress();

        setCurrentAccount(accounts[0]);
        alert('Hey ' + accounts[0]);
      } else {
        alert('Metamask not installed');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to Metamask');
    }
  };

  return (
    <div>
      <button
        className="connect-btn cursor-pointer text-[#430359] font-bold py-2 px-4 rounded-xl"
        onClick={connectWallet}
      >
        Connect
      </button>
      {currentAccount}
    </div>
  );
};

export default ConnectWallet;

