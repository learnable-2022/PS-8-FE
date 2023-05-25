import { Route, Routes } from "react-router-dom";
import { HR_SignIn } from "./Components/HR_SignIn";
import { Payroll_Dashboard } from "./Components/Payroll_Dashboard";
// import { Display_Employee_Payroll } from "./Components/Display_Employee_Payroll";
import { Navigation } from "./Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route >
          <Route path="/dashboard" element={<Payroll_Dashboard />} exact />
        </Route>
        <Route path="/" element={<HR_SignIn />} />
      </Routes>
<<<<<<< HEAD
=======
     
>>>>>>> 10c729df8fe46536fafaeee1c7c7e840ab69bdab
    </div>
  );
}

export default App;
