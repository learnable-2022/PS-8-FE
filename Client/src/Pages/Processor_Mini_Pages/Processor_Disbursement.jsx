import { useContext, useEffect } from "react";
import { myContext } from "../../ContextAPI";

export const Processor_Disbursement = () => {
  const { isPayrollProcessed } = useContext(myContext);

  useEffect(() => {
    console.log(isPayrollProcessed);
  }, []);
  return <div className="flex justify-center">Processor_Disbursement</div>;
};
