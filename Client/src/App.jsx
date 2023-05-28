import { Route, Routes } from "react-router-dom";
import { HR_SignIn } from "./Components/HR_SignIn";
import { Payroll_Dashboard } from "./Components/Payroll_Dashboard";
// import { Display_Employee_Payroll } from "./Components/Display_Employee_Payroll";
import { Navigation } from "./Navigation";
import { Payroll } from "./Pages/Payroll";
import { Processor } from "./Pages/Processor";
import { Database } from "./Pages/Database";


function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route>
          <Route element={<Payroll_Dashboard />} exact>
            <Route path="/dashboard" element={<Payroll/>}/>
            <Route path="/processor" element={<Processor/>}/>
            <Route path="/database" element={<Database/>}/>
          </Route>
        </Route>
        <Route path="/" element={<HR_SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
