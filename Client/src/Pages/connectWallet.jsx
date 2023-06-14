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
  let [checkAcct, setCheckAcct] = useState(0);

  const disConnect = function () {
    setCheckAcct(2);
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
        setCheck(1);

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

  // const disconnectWallet = () => {
  //   setCurrentAccount("");
  // };

  const toggleDropdown = () => {
    setShowDropdown(true);
  };
  return (
    <div>
      {currentAccount !== "" ? (
        <button
          onClick={toggleDropdown}
          className=" cursor-pointer bg-[#660000] text-white font-bold py-2 px-4 rounded-xl"
        >
          Disconnect
        </button>
      ) : (
        <button
          className="mr-10 border-[#430359] border
       font-bold px-5 py-1 rounded-full hover:bg-[#7f23a0] hover:text-white transition duration-500 md:flex hidden text-[#430359]"
          onClick={connectWallet}
        >
          Connect
        </button>
      )}

      <div className="dropdown">
        {showDropdown && (
          <div>
            {checkAcct == 1 && (
              <button
                className="disconnect cursor-pointer text-black font-bold py-2 px-4 rounded-xl"
                onClick={disConnect}
              >
                Disconnect Wallet
              </button>
            )}
            <div>
              {checkAcct == 1 && (
                <p className="walletAddress">
                  {`${currentAccount.slice(0, 4)}...${currentAccount.slice(
                    -4
                  )}`}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
