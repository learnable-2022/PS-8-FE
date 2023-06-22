import React, { useState, useEffect } from "react";
import "../index.css";
import { ethers } from "ethers";
import contractAbi from "./payme.json";

const contractAddress = "0x0B2ae7d89cCB3CF33eC7c1C4191593d71B15999E";
const paymeAbi = contractAbi.abi;
const getWallet = () => window.ethereum;
const eth = getWallet();

const ConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [checkAcct, setCheckAcct] = useState(0); 

  const disConnect = function () {
    setCurrentAccount("");
    setCheckAcct(0); 
  };

  const connectWallet = async () => {
    // try {
    if (typeof eth !== "undefined") {
      const accounts = await eth.request({
        method: "eth_requestAccounts",
      });

      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const accounts = await signer.getAddress();
      // setCheckAcct(1);

      setCurrentAccount(accounts[0]);
      alert("Hey " + accounts[0]);
    } else {
      alert("MetaMask wallet not installed");
    }
    // } catch (error) {
    //   console.error(error);
    //   alert("Error connecting to Ethereum wallet");
    // }
  };


  return (
    <div>
      {checkAcct !== 1 && (
        <button
          className="connect-btn cursor-pointer text-[#2E3192] font-bold py-1 px-4 rounded-xl hover:bg-[#F5F5F5] hover:border-none hover:transition-all hover:duration-500"
          onClick={connectWallet}>
          Connect
        </button>
      )}

      {checkAcct === 1 && (
        <div>
          <button
            className="cursor-pointer bg-[#660000] text-white font-bold py-2 px-4 rounded-xl"
            onClick={disconnectWallet}>
            Disconnect
          </button>
          {checkAcct === 1 && (
            <div>
              <p className="walletAddress">
                {`${currentAccount.slice(0, 4)}...${currentAccount.slice(-4)}`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;

