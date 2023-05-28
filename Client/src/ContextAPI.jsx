import React, { createContext, useEffect, useRef, useState } from "react";
 import { toast } from 'react-toastify';
import axios from "axios";
import * as XLSX from "xlsx";
const myContext = createContext();

const ContextAPI = ({ children }) => {
  const [signIn, setSignIn] = useState({
    email: "",
    password: ""
  });

  const { email, password} = signIn;
  

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
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const accessToken = window.localStorage.getItem("HR_access_token");
  //   setHRToken(accessToken);
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("HR_access_token", HRtoken);
  // }, [HRtoken]);

  // const [errorMessage, setErrorMessage] = useState("");

  // ------------------------------[SUBMIT FORM |GET TOKEN]-------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
   
   
    const getToken = async () => {
      try {
        await axios
          .post("https://team8api.onrender.com/api/auth/login", {
            ...signIn
          })
          .then((response) => {
            const token = response.data.accessToken;
            setHRToken(token);
            window.localStorage.setItem("HR_access_token", token);
            token && (window.location = "/dashboard");
          });
      } catch (error) {
        if (error.response && error.response.status > 400 < 500) {
          toast.error("Pls you are not authorized");
        }
      }
    };

     if (HRtoken) {
      toast.warning("You are already logged in")
      window.location = "/dashboard";
      return;
    }else{

      getToken();
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log(import.meta.env.VITE_API_ENDPOINT);
  //   // console.log(signIn);
  //   const getToken = async () => {
  //     try {
  //       const response = await axios.post(
  //         import.meta.env.VITE_API_ENDPOINT + "/auth/login",
  //         {
  //           ...signIn,
  //         }
  //         );
  //         if (response.status === 200) { window.location = "/dashboard"}

  //       const token = response.data.accessToken;

  //       setHRToken(token);
  //       window.localStorage.setItem("payMe_signIn", JSON.stringify(signIn));

  //       console.log(response.data);

  //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getToken();
  //   if (HRtoken !== null) {
  //     setLoggedIn(true);
  //   }
  //   if (loggedIn) {
  //     console.log("I am logged In");
  //   }
  // };

  // -------------------------------------[FILE UPLOAD]--------------------------------------------

  const [isFile, setIsFile] = useState([]);

  const handleButtonClick = () => {
    document.getElementById("SelectedFile").click();
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const workBook = XLSX.read(data, { type: "binary" });
      const sheetName = workBook.SheetNames[0];
      const sheet = workBook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      setIsFile(parsedData);
      sendToBackend(parsedData);
    };

    reader.readAsBinaryString(file);
  };

  const sendToBackend = (data) => {
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle response from the backend
        console.log(responseData);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

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
          HRtoken,
          uploadFile,
          isFile,
          handleButtonClick,
        }}
      >
        {children}
      </myContext.Provider>
    </div>
  );
};
export { myContext, ContextAPI };
