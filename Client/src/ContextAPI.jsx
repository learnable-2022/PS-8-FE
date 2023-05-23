import React, { createContext, useEffect, useState } from "react";
const myContext = createContext();

const ContextAPI = ({ children }) => {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signIn;

  // -------------------------------------[]--------------------------------------------
  useEffect(() => {
    const data = window.localStorage.getItem("payMe_signIn");
    setSignIn(JSON.parse(data));
  }, []);

  // -------------------------------------[]--------------------------------------------

  useEffect(() => {
    window.localStorage.setItem("payMe_signIn", JSON.stringify(signIn));
  }, [signIn]);

  // -------------------------------------[]--------------------------------------------

  const handleSignIn = (e) => {
    const { name, value } = e.target;
    setSignIn((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // -------------------------------------[]--------------------------------------------
  return (
    <div>
      <myContext.Provider
        value={{ handleSignIn, handleSubmit, password, email }}
      >
        {children}
      </myContext.Provider>
    </div>
  );
};
export { myContext, ContextAPI };
