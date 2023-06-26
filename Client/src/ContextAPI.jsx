import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { titleCase } from "./UTILS/Title";
import { getMonthName } from "./UTILS/getMonthName";
import { extractNumFromString } from "./UTILS/parseNum";
import request from "./axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import payPolicy from "../payPolicy";

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
        const response = await request.post("/auth/login", {
          ...signIn,
        });

        if (response.data) {
          setIsPending(false);
          const token = response.data.accessToken;
          const user = JSON.stringify(response.data.user);
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
        } else if (error.message === "Network error") {
          setTimeout(() => {
            toast.error(error.message);
            setIsPending(false);
          }, 1000);
        } else {
          toast.error("An error occurred while logging in");
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

      const payrollColumns = Object.keys(processData[0]);

      const calculate = processData.map((elem) => {
        const baseSalary = elem["Monthly base pay (₦)"] ?? 0;
        const taxPolicy = elem["Tax policy (%)"] ?? 0;
        const taxDeduction = baseSalary * (taxPolicy / 100);

        let totalEarnings = 0;
        let bonusEarnings = 0;
        let otherdeductions = 0;
        let totalDeductions = taxDeduction;
        let netChange = 0;
        let netPay = 0;
        let allowance = elem["Allowance"] ?? 0;
        let loan = elem["Loan"] ?? 0;

        payPolicy.forEach((policy) => {
          if (payrollColumns.includes(_.upperFirst(policy.performance))) {
            //   console.log(elem[_.upperFirst(policy.performance)]);
            const percentValue = policy.percentage;

            let operator = policy.condition;

            const operation = operationToPerform(operator, elem, policy);

            if (operation) {
              netChange += baseSalary * (percentValue / 100);

              if (percentValue >= 0) {
                bonusEarnings += baseSalary * (percentValue / 100);
              } else {
                otherdeductions += baseSalary * (percentValue / 100);
              }
            }
          }
        });

        otherdeductions = Math.abs(otherdeductions);
        totalDeductions += parseFloat(otherdeductions + loan + taxDeduction);
        totalEarnings += parseFloat(baseSalary + allowance + bonusEarnings);
        netPay = totalEarnings - totalDeductions;
        netChange -= taxDeduction;

        return {
          Name: elem["Name"],
          ID: elem.ID,
          "Email Address": elem["Email address"],
          Loan: loan,
          Tax: taxDeduction,
          "Net Change": `${netChange.toFixed(0)}`,
          Bonus: `₦${bonusEarnings.toFixed(0)}`,
          Deduction: ` -${totalDeductions.toFixed(0)}`,
          "Monthly base pay (₦)": `${baseSalary}`,
          // "Total Earnings (₦)": `₦${totalEarnings}`,
          "Net Salary": `${netPay.toLocaleString()}`,
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
        const matchingPayrollItem = calculate.find(
          (payrollItem) => payrollItem.ID === item.ID
        );
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

  // const getNetSalary = processPayroll
  //   .filter((item) => item["Net Salary"])gte
  //   .map((item) => item["Net Salary"]);

  // console.log(getNetSalary);

  // const amounts = getNetSalary
  //   .split("NGN")
  //   .filter((value) => value !== "")
  //   .map((value) => parseFloat(value.replace(/,/g, "")));

  // console.log(amounts);

  const operationToPerform = (operator = "", payroll = {}, policy = {}) => {
    let conditionNum = policy.perfvalue;
    let condition;

    switch (operator) {
      case "=":
        condition = payroll[_.upperFirst(policy.performance)] == conditionNum;
        break;
      case ">":
        condition = payroll[_.upperFirst(policy.performance)] > conditionNum;
        break;
      case "<":
        condition = payroll[_.upperFirst(policy.performance)] < conditionNum;
        break;
      case "<=":
        condition = payroll[_.upperFirst(policy.performance)] <= conditionNum;
        break;
      case ">=":
        condition = payroll[_.upperFirst(policy.performance)] <= conditionNum;
        break;
      default:
        break;
    }

    return condition;
  };
  // -------------------------------------[Process Uploaded Data]-----------------------------------

  // -------------------------------------[Connect Wallet]-----------------------------------
  // -------------------------------------[Connect Wallet]-----------------------------------

  const [nav, setNav] = useState(false);

  const showNavbar = () => {
    setNav((prev) => !prev);
  };

  const closeNav = () => {
    setNav(false);
  };

  // -------------------------------------[Process Disburse Salaries]-----------------------------------//

  const disburseSalary = async () => {
    setLoadingProcessedPayroll(true);
    try {
      const formData = await getFormData();

      const response = await request.post("/disbursement", formData);
      if (response.data) {
        setTimeout(() => {
          setLoadingProcessedPayroll(false);
          setIsPayrollDisbursed(true);
          toast.success(response.data.message);
          window.localStorage.setItem("process_employee_data", null);
          window.localStorage.setItem("employee_data_name", null);

          setProcessData([]);
          setProcessPayroll([]);
        }, 2000);
      } else {
        setLoadingProcessedPayroll(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.error ?? err.message);

      return Promise.reject(err);
    }
  };

  const getFormData = async () => {
    const date = new Date();
    console.log(processPayroll);
    const data = await processPayroll.map((elem, index) => {
      const allowance = elem["Allowance"] ?? 0;
      console.log(elem["Net Salary"]);
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
        netSalary: extractNumFromString(elem["Net Salary"]),
        email: elem["Email Address"],
        allowance,
        year: date.getFullYear(),
        month: getMonthName(date.getMonth()),
        yearsOfService: processData[index]["Years of service"],
        totalWorkingHours: processData[index]["Total working hours"],
        jobRole: processData[index]["Role"],
        appraisal: processData[index]["Appraisal score"],
      };
    });

    return data;
  };
  // -------------------------------------[Process Disburse Salaries end]-----------------------------------//
  const [employeeIsLoading, setEmployeeIsLoading] = useState(false);

  const employeesDatabase = async () => {
    setEmployeeIsLoading(true);
  };

  useEffect(() => {
    employeesDatabase();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      const response = await request.delete(`/employees/${id}`);
      if (response) {
        toast.success(response.data.message);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const [createNewCard, setCreateNewCard] = useState(false);

  const createCard = () => {
    setCreateNewCard(true);
  };

  const closeForm = () => {
    setCreateNewCard(false);
  };

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
          closeNav,
          isPayrollProcessed,
          setIsPayrollProcessed,
          disburseSalary,
          isPayrollDisbursed,
          setIsPayrollDisbursed,
          employeeIsLoading,
          deleteEmployee,
          createNewCard,
          createCard,
          closeForm,
        }}
      >
        {children}
      </myContext.Provider>
    </div>
  );
};
export { myContext, ContextAPI };
