import React, { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { titleCase } from "./UTILS/Title";
import { getMonthName } from "./UTILS/getMonthName";
import { extractNumFromString } from "./UTILS/parseNum";
import request from "./axios";
import { useNavigate } from "react-router-dom";

const myContext = createContext();

const ContextAPI = ({ children }) => {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signIn;
  const [isPayrollProcessed, setIsPayrollProcessed] = useState(false);
  const [isPayrollDisbursed, setIsPayrollDisbursed] = useState(false);
  const navigate = useNavigate();

  // -------------------------------------[]--------------------------------------------

  // useEffect(() => {
  //   const data = window.localStorage.getItem("payMe_signIn");
  //   setSignIn(JSON.parse(data));
  // }, []);

  // -------------------------------------[]--------------------------------------------

  // useEffect(() => {
  //   window.localStorage.setItem("payMe_signIn", JSON.stringify(signIn));
  // }, [signIn]);

  // -------------------------------------[]--------------------------------------------

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
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const data = window.localStorage.getItem("userInfo");
    if (data) {
      setUserInfo(data);
    }
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("userInfo", userInfo);
  // }, [userInfo]);

  const handleClick = () => {
    setIsPending(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const getToken = async () => {
      try {
        const response = await request.post(import.meta.env.VITE_API_ENDPOINT + "/auth/login", {
          ...signIn,
        });

        if (response.data) {
          setIsPending(false);

          toast.success("Login successful", { autoClose: 2000 });

          const token = response.data.accessToken;
          const user = JSON.stringify(response.data.user);

          console.log(user);

          setHRToken(token);
          setUserInfo(user);

          window.localStorage.setItem("HR_access_token", token);
          window.localStorage.setItem("userInfo", user);

          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          toast.error(response);
          setIsPending(false);
        }
      } catch (error) {
        if (error.response && error.response.status > 400) {
          setTimeout(() => {
            toast.error("Incorrect email or password");
            setIsPending(false);
          }, 2000);
        } else if (error.message === "Network Error") {
          setTimeout(() => {
            toast.error(error.message);
            setIsPending(false);
          }, 1000);
        } else {
          toast.error("an error occured logging in");
        }
      }
    };
    getToken();
  };

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

  const handleLogout = () => {
    toast.info("Logout successful...", { autoClose: 2000 });
    setTimeout(() => {
      setHRToken(null);
      window.localStorage.removeItem("HR_access_token");
      window.localStorage.removeItem("userInfo");
      navigate("/");
    }, 2000);
  };

  const uploadFile = (e) => {
    setIsLoading(false);
    setProcessPayroll([]);

    const dataType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
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
    window.localStorage.setItem("process_employee_data", JSON.stringify(processData));
  }, [processData]);
  useEffect(() => {
    const data = window.localStorage.getItem("process_notification");
    setNotification(data);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("process_notification", notification);
  }, [notification]);

  const removeProcessor = () => {
    setProcessData([]);
  };

  // -------------------------------------[Process Data]--------------------------------------------

  // -------------------------------------[Process Uploaded Data]----------------------------------
  const [alert, setAlert] = useState("");

  const [loadingProcessedPayroll, setLoadingProcessedPayroll] = useState(false);
  const [processPayroll, setProcessPayroll] = useState([]);
  const [showDataHistory, setShowDataHistory] = useState([]);
  const [date, setDate] = useState("");

  const processUploadedData = () => {
    setLoadingProcessedPayroll(true);
    setTimeout(() => {
      setLoadingProcessedPayroll(false);
      setAlert("Payroll Processed Successfully");
      const calculate = processData.map((item) => {
        const appraisalScore = item["Appraisal score"];
        const workingHours = item["Total working hours"];
        const yearsOfService = item["Years of service"];
        const taxPolicy = item["Tax policy (%)"];
        const monthlyBasePay = item["Monthly base pay (₦)"];

        let totalSalary = monthlyBasePay;

        let bonusPercentage = 0;

        if (appraisalScore === 5) {
          bonusPercentage += 20;
        } else if (appraisalScore === 4) {
          bonusPercentage += 10;
        } else if (appraisalScore === 3) {
          bonusPercentage += 5;
        }

        if (workingHours > 180) {
          bonusPercentage += 20;
        } else if (workingHours >= 161 && workingHours <= 180) {
          bonusPercentage += 10;
        } else if (workingHours === 160) {
          bonusPercentage += 2;
        }

        if (yearsOfService >= 2 && yearsOfService <= 10) {
          const serviceBonus = [0.05, 0.08, 0.1, 0.14, 0.17, 0.2, 0.24, 0.26];
          bonusPercentage += serviceBonus[yearsOfService - 2] * 100;
        } else if (yearsOfService >= 10) {
          bonusPercentage += 35;
        }

        const bonusAmount = monthlyBasePay * (bonusPercentage / 100);
        totalSalary += bonusAmount;

        const taxDeductionPercentage = taxPolicy;
        const taxDeductionAmount = totalSalary * (taxDeductionPercentage / 100);
        totalSalary -= taxDeductionAmount;

        return {
          Name: item.Name,
          ID: item.ID,
          Loan: 0,
          Tax: item["Tax policy (%)"],
          "Email Address": item["Email address"],
          "Net Change": `₦${(totalSalary - monthlyBasePay).toFixed(0)}`,
          Bonus: `₦${bonusAmount.toFixed(0)}`,
          Deduction: ` ₦-${taxDeductionAmount.toFixed(0)}`,
          "Monthly base pay (₦)": `₦${monthlyBasePay}`,
          "Total salary": `NGN${totalSalary.toLocaleString()}`,
        };
      });
      setProcessPayroll(calculate);
      setIsPayrollProcessed(true);
      setIsPayrollDisbursed(false);

      const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleDateString();
      };

      const mergedArray = processData.map((item) => {
        const matchingPayrollItem = calculate.find((payrollItem) => payrollItem.ID === item.ID);
        if (matchingPayrollItem) {
          const mergedItem = {
            ...item,
            ...matchingPayrollItem,
            Date: getCurrentDateTime(),
          };
          delete mergedItem["Email Address"];
          return mergedItem;
        }
        return item;
      });

      setShowDataHistory((prevData) => [...mergedArray, ...prevData]);
      // const dateTime = getCurrentDateTime();
      // setDate(dateTime);
    }, 5000);
  };

  setTimeout(() => {
    setAlert("");
  }, 4000);

  const removeProcessedData = () => {
    setProcessPayroll([]);
  };
  // -------------------------------------[Process Uploaded Data]-----------------------------------

  // -------------------------------------[Connect Wallet]-----------------------------------
  // -------------------------------------[Connect Wallet]-----------------------------------

  const [nav, setNav] = useState(false);

  const showNavbar = () => {
    setNav((prev) => !prev);
  };

  // -------------------------------------[Process Disburse Salaries]-----------------------------------//

  const disburseSalary = async () => {
    setLoadingProcessedPayroll(true);
    try {
      const formData = await getFormData();

      const response = await request.post("/disbursement", formData);
      if (response.data) {
        setIsPayrollDisbursed(true);
        toast.success(response.data.message);
        setLoadingProcessedPayroll(false);
      } else {
        setLoadingProcessedPayroll(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error ?? err.message);

      return Promise.reject(err);
    }
  };

  const getFormData = async () => {
    const date = new Date();

    const data = await processPayroll.map((elem, index) => {
      const allowance = elem["Allowance"] ?? 0;
      return {
        name: elem["Name"],
        employeeId: elem["ID"],
        loan: elem["Loan"],
        tax: elem["Tax"],
        bonus: extractNumFromString(elem["Bonus"]),
        totalDeduction: extractNumFromString(elem["Deduction"]),
        monthlyBasePay: extractNumFromString(elem["Monthly base pay (₦)"]),
        totalSalary:
          extractNumFromString(elem["Monthly base pay (₦)"]) +
          extractNumFromString(elem["Bonus"]) +
          allowance,
        netSalary: extractNumFromString(elem["Total salary"]),
        email: elem["Email Address"],
        allowance,
        year: date.getFullYear(),
        month: getMonthName(date.getMonth()),
        yearsOfService: processData[index]["Years of service"],
        totalWorkingHours: processData[index]["Total working hours"],
        jobRole: processData[index]["Role"],
      };
    });

    return data;
  };
  // -------------------------------------[Process Disburse Salaries end]-----------------------------------//

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
          processUploadedData,
          processPayroll,
          handleLogout,
          handleClick,
          isPending,
          removeProcessedData,
          loadingProcessedPayroll,
          alert,
          showDataHistory,
          date,
          showNavbar,
          nav,
          isPayrollProcessed,
          setIsPayrollProcessed,
          disburseSalary,
          isPayrollDisbursed,
          setIsPayrollDisbursed,
        }}
      >
        {children}
      </myContext.Provider>
    </div>
  );
};
export { myContext, ContextAPI };
