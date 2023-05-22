import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div>
      <ul className="flex w-full justify-center gap-10">
        <Link to="/">
          <li>sign In</li>
        </Link>
        <Link to="/payroll_dashboard">
          <li>Payroll Dashboard</li>
        </Link>
        <Link to="/display_employee_payroll">
          <li>Display_Employee_Payroll</li>
        </Link>
      </ul>
    </div>
  );
};
