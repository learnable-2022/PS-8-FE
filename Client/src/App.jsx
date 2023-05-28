import { Route, Routes } from "react-router-dom";
import { HR_SignIn } from "./Components/HR_SignIn";
import { Payroll_Dashboard } from "./Components/Payroll_Dashboard";
// import { Display_Employee_Payroll } from "./Components/Display_Employee_Payroll";
import { Navigation } from "./Navigation";
import { Payroll } from "./Pages/Payroll";
import { Processor } from "./Pages/Processor";
import { Database } from "./Pages/Database";
import { ProtectedPage } from "./Components/ProtectedPage";
 import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <div>
      <ToastContainer/>
      <Navigation />
      <Routes>
        <Route element={<ProtectedPage />}> 
          <Route path="/dashboard" element={<Payroll_Dashboard />}>
            <Route path="/dashboard" element={<Payroll/>}/>
            <Route path="/processor" element={<Processor/>}/>
            <Route path="/database" element={<Database/>}/>
          </Route>
        </Route>
        <Route path="/" element={<HR_SignIn />} exact/>
      </Routes>
    </div>
  );
}

export default App;
