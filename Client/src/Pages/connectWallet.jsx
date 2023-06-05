import React, { useContext, useState, useEffect } from "react";
import "../index.css"

const connectWallet = async() => {
    return (
        <div >
        <button className="cursor-pointer  bg-[#430359] hover:bg-purple-900 text-white font-bold py-3 px-5 rounded-xxl">
            connect
        </button>
        </div>
    );
}

export default connectWallet;