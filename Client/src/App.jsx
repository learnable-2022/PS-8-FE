import { Route, Routes, Navigate } from "react-router-dom";
import { HR_SignIn } from "./Components/HR_SignIn";
import { Payroll_Dashboard } from "./Components/Payroll_Dashboard";
import { Payroll } from "./Pages/Payroll";
import { Processor } from "./Pages/Processor";
import { Employees_Database } from "./Pages/Employees_Database";
import { ProtectedPage } from "./Components/ProtectedPage";
import { ToastContainer } from "react-toastify";
import { Processor_Payroll } from "./Pages/Processor_Mini_Pages/Processor_Payroll";
import { Processor_History } from "./Pages/Processor_Mini_Pages/Processor_History";
import { Processor_Disbursement } from "./Pages/Processor_Mini_Pages/Processor_Disbursement";
import NotFound from "./Pages/NotFound";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import CalculatedPayroll from "./Components/CalculatedPayroll";
import { myContext } from "./ContextAPI";

function App() {
  const token = window.localStorage.getItem("HR_access_token");
  const { nav } = useContext(myContext);

  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <div>
      <ToastContainer autoClose={4000} />
      <Routes>
        <Route element={<ProtectedPage />}>
          <Route element={<Payroll_Dashboard />}>
            <Route path="/dashboard" element={<Payroll />} />
            <Route path="/employees" element={<Employees_Database />} />
            <Route
              path="/employees/:more_details"
              element={<Employees_Database />}
            />

            <Route path="/processor" element={<Processor />}>
              <Route path="/processor" element={<Processor_Payroll />} />
              <Route
                path="/processor/history"
                element={<Processor_History />}
              />
              <Route
                path="/processor/disbursement"
                element={<Processor_Disbursement />}
              />{" "}
            </Route>
          </Route>
        </Route>

        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <HR_SignIn />}
          exact
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
