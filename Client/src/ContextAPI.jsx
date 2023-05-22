import React, { createContext } from "react";
const myContext = createContext();

const ContextAPI = ({ children }) => {
  const myName = "Ifechukwu Onyeka";
  return (
    <div>
      <myContext.Provider value={{myName}}>{children}</myContext.Provider>
    </div>
  );
};
export { myContext, ContextAPI };
