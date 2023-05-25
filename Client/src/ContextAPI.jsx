import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

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

  const [revealPassword, setRevealPassword] = useState(false);
  const showPassword = () => {
    setRevealPassword((prev) => !prev);
  };
  // -------------------------------------[]--------------------------------------------
  const [HRtoken, setHRToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("HR_access_token");
    setHRToken(accessToken);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("HR_access_token", HRtoken);
  }, [HRtoken]);

  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_API_ENDPOINT);
    console.log(signIn);
    const getToken = async () => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_ENDPOINT + "/auth/login",
          {
            ...signIn,
          }
        );

        const token = response.data.accessToken;

        setHRToken(token);

        console.log(response.data);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        setErrorMessage(error.message);
        console.log("ERROR:", error);
      }
    };
    getToken();
    if (HRtoken !== null) {
      setLoggedIn(true);
    }
    if (loggedIn) {
      console.log("I am logged In");
    }
  };

  // const isLoggedIn = () => {};

  // -------------------------------------[]--------------------------------------------
  return (
    <div>
      <myContext.Provider
        value={{
          handleSignIn,
          handleSubmit,
          password,
          email,
          showPassword,
          revealPassword,
          errorMessage,
          HRtoken,
          loggedIn,
        }}
      >
        {children}
      </myContext.Provider>
    </div>
  );
};
export { myContext, ContextAPI };
