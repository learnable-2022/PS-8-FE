import React, { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as XLSX from "xlsx";
import { titleCase } from "./UTILS/Title";
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
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const data = window.localStorage.getItem("userInfo");
    setUserInfo(data);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("userInfo", userInfo);
  }, [userInfo]);

  // ------------------------------[SUBMIT FORM |GET TOKEN]-------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_API_ENDPOINT + "/auth/login");
    const getToken = async () => {
      try {
        await axios
          .post(import.meta.env.VITE_API_ENDPOINT + "/auth/login", {
            ...signIn,
          })
          .then((response) => {
            const token = response.data.accessToken;
            const user = response.data.user.username;
            setHRToken(token);
            setUserInfo(user);
            window.localStorage.setItem("HR_access_token", token);
            token && (window.location = "/dashboard");
          });
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status > 400 < 500) {
          toast.error("Pls you are not authorized");
        }
      }
    };
    getToken();
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
  const [fileName, setFileName] = useState("");
  const [typeError, setTypeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = window.localStorage.getItem("employee_data_name");
    setFileName(data);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("employee_data_name", fileName);
  }, [fileName]);

  const handleButtonClick = () => {
    document.getElementById("SelectedFile").click();
  };

  const uploadFile = (e) => {
    setIsLoading(false);
    const dataType = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const file = e.target.files[0];
    setFileName(titleCase(file.name.split(".")[0]));
    if (file) {
      if (file && dataType.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const data = event.target.result;
          const workBook = XLSX.read(data, { type: "binary" });
          const sheetName = workBook.SheetNames[0];
          const sheet = workBook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);

          setIsFile(parsedData);
        };
        reader.readAsBinaryString(file);
      } else {
        setTypeError("Only excel file is allowed...");
        return;
      }
    }
  };

  setTimeout(() => {
    setTypeError("");
  }, 5000);

  useEffect(() => {
    const data = window.localStorage.getItem("employee_data");
    setIsFile(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("employee_data", JSON.stringify(isFile));
  }, [isFile]);

  const removeData = () => {
    setIsFile([]);
  };

  // -------------------------------------[]--------------------------------------------

  // -------------------------------------[Process Data]--------------------------------------------

  const [notification, setNotification] = useState(true);
  const handleNotification = () => {
    setNotification(false);
    setMoveIsSuccessful("");
  };
  const [processData, setProcessData] = useState([]);
  const [moveIsSuccessful, setMoveIsSuccessful] = useState("");

  const loading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMoveIsSuccessful("Data is moved successfully");
    }, 5000);
  };
  const moveData = () => {
    setTimeout(() => {
      setProcessData([...isFile]);
      setIsFile([]);
      setNotification(true);
    }, 5000);
  };

  setTimeout(() => {
    setMoveIsSuccessful("");
  }, 7000);

  useEffect(() => {
    const data = window.localStorage.getItem("process_employee_data");
    setProcessData(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "process_employee_data",
      JSON.stringify(processData)
    );
  }, [processData]);

  const removeProcessor = () => {
    setProcessData([]);
  };

  // -------------------------------------[Process Data]--------------------------------------------
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
          userInfo,
          fileName,
          moveData,
          processData,
          notification,
          handleNotification,
          moveIsSuccessful,
          removeData,
          typeError,
          isLoading,
          removeProcessor,
          loading,
        }}
      >
        {children}
      </myContext.Provider>
    </div>
  );
};
export { myContext, ContextAPI };
