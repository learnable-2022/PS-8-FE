
import { Route, Routes } from "react-router-dom";
import { HR_SignIn } from "./Components/HR_SignIn";
import { Payroll_Dashboard } from "./Components/Payroll_Dashboard";
import { Display_Employee_Payroll } from "./Components/Display_Employee_Payroll";
import { Navigation } from "./Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HR_SignIn />} />
        <Route path="/payroll_dashboard" element={<Payroll_Dashboard />} />
        <Route
          path="display_employee_payroll"
          element={<Display_Employee_Payroll />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
