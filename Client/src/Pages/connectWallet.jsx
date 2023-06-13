import React, { useState } from "react";
import "../index.css";
import { ethers } from "ethers";
import contractAbi from "./payme.json";

const contractAddress = "0x0B2ae7d89cCB3CF33eC7c1C4191593d71B15999E";
const paymeAbi = contractAbi.abi;
const getWallet = () => window.ethereum;
const eth = getWallet();

const ConnectWallet = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [checkAcct, setCheckAcct] = useState(0); // Initialize with 0

  const disConnect = function () {
    setCurrentAccount("");
    setCheckAcct(0); // Set checkAcct to 0 to hide the dropdown
  };

  const connectWallet = async () => {
    try {
      if (typeof eth !== "undefined") {
        await eth.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await signer.getAddress();
        setCheckAcct(1);

        setCurrentAccount(accounts[0]);
        alert("Hey " + accounts[0]);
      } else {
        alert("MetaMask wallet not installed");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to Ethereum wallet");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      {currentAccount ? (
        <div className="dropdown">
          <button
            onClick={toggleDropdown}
            className="cursor-pointer bg-[#660000] text-white font-bold py-2 px-4 rounded-xl"
          >
            Disconnect
          </button>
          <p className="walletAddress">
            {`${currentAccount.slice(0, 4)}...${currentAccount.slice(-4)}`}
          </p>
        </div>
      ) : (
        <button
          className="mr-10 border border-[#430359]== text-white font-bold px-5 py-1 rounded-full hover:bg-[#7f23a0] transition duration-500 md:flex hidden"
          onClick={connectWallet}
        >
          {currentAccount ? "Connected" : "Connect"}
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
