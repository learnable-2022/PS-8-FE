import { myContext } from "../ContextAPI";
import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import policy from "../../payPolicy";

const CalculatedPayroll = () => {
  const { processData, removeProcessor, isPayrollProcessed } = useContext(myContext);
  const [updatedPayroll, setUpdatedPayroll] = useState(null);
  const [payPolicy, setPayPolicy] = useState(policy);
  const processedPayroll = [];
  const columnHeader = processData.length > 0 ? Object.keys(processData[0]) : [];

  useEffect(() => {
    if (processData.length > 0) calculatePayroll();
    // console.log(isPayrollProcessed);
  }, [processData]);

  useEffect(() => {
    const flattendArr = _.concat(...processData);

    setUpdatedPayroll(flattendArr);
    calculatePayroll();
  }, []);

  const calculatePayroll = async () => {
    const payrollColumns = Object.keys(updatedPayroll[0]);
    console.log(updatedPayroll, payrollColumns, policy);

    const calculated = updatedPayroll.map((elem) => {
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

      return {
        Name: elem["Name"],
        ID: elem.ID,
        "Email Address": elem["Email address"],
        Loan: loan,
        Tax: taxDeduction,
        "Net Change": `₦${netChange.toFixed(0)}`,
        Bonus: `₦${bonusEarnings.toFixed(0)}`,
        Deduction: ` ₦-${totalDeductions.toFixed(0)}`,
        "Monthly base pay (₦)": `₦${baseSalary}`,
        "Total Earnings (₦)": `₦${totalEarnings}`,
        "Net Salary": `NGN${netPay.toLocaleString()}`,
      };
    });
  };

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

  return (
    <div className="p-4">
      {processData.length > 0 ? (
        <div>
          <div className="w-full flex justify-center mb-10">
            <table className="w-[90%] rounded-2xl h-full bg-white mt-2 overflow-x-scroll">
              <thead className="text-left h-[70px] text-black/70 font-medium ">
                <tr className="border-b">
                  {columnHeader.map((header, index) => (
                    <th key={index} className="pl-[1.5%]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {processData.map((row, index) => (
                  <tr key={index} className="border-b">
                    {columnHeader.map((header, index) => (
                      <td key={index} className="py-2 text-sm pl-[1.5%]">
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={removeProcessor} className="bg-white px-5 py-2 rounded-lg">
              Remove Data{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="bg-[#ededed] w-[90%] py-[10%] mt-10 rounded-xl shadow-black/20 shadow-md">
            <p className="flex items-center justify-center text-gray-500 text-sm">No data found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatedPayroll;
