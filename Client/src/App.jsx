import { Route, Routes, Navigate } from "react-router-dom";
import { HR_SignIn } from "./Components/HR_SignIn";
import { Payroll_Dashboard } from "./Components/Payroll_Dashboard";
import { Payroll } from "./Pages/Payroll";
import { Processor } from "./Pages/Processor";
import { ProtectedPage } from "./Components/ProtectedPage";
import { ToastContainer } from "react-toastify";
import { Processor_Payroll } from "./Pages/Processor_Mini_Pages/Processor_Payroll";
import { Processor_History } from "./Pages/Processor_Mini_Pages/Processor_History";
import { Processor_Disbursement } from "./Pages/Processor_Mini_Pages/Processor_Disbursement";
import NotFound from "./Pages/NotFound";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  const token = window.localStorage.getItem("HR_access_token");

  useEffect(() => {
    AOS.init({});
  }, []);
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
