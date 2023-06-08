import { Route, Routes } from "react-router-dom";
import { HR_SignIn } from "./Components/HR_SignIn";
import { Payroll_Dashboard } from "./Components/Payroll_Dashboard";
// import { Display_Employee_Payroll } from "./Components/Display_Employee_Payroll";
import { Payroll } from "./Pages/Payroll";
import { Processor } from "./Pages/Processor";
import { Pay_Policy } from "./Pages/Pay_Policy";
import { ProtectedPage } from "./Components/ProtectedPage";
import { ToastContainer } from "react-toastify";
import { Processor_Payroll } from "./Pages/Processor_Mini_Pages/Processor_Payroll";
import { Processor_History } from "./Pages/Processor_Mini_Pages/Processor_History";
import { Processor_Disbursement } from "./Pages/Processor_Mini_Pages/Processor_Disbursement";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<ProtectedPage />}>
          <Route element={<Payroll_Dashboard />}>
            <Route path="/dashboard" element={<Payroll />} />
            <Route path="/processor" element={<Processor />}>
              <Route path="/processor" element={<Processor_Payroll />} />
              <Route
                path="/processor/history"
                element={<Processor_History />}
              />
              <Route
                path="/processor/disbursement"
                element={<Processor_Disbursement />}
              />
            </Route>
            <Route path="/pay_policy" element={<Pay_Policy />} />
          </Route>
        </Route>
        <Route path="/" element={<HR_SignIn />} exact />
      </Routes>
    </div>
  );
}

export default App;
