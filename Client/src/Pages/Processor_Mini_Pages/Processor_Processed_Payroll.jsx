import React, { useContext } from 'react'
import { myContext } from '../../ContextAPI';

export const Processor_Processed_Payroll = () => {
    const { processPayroll } = useContext(myContext);
  return (
    <div className='w-full flex justify-center'>
      <table className="w-[90%] rounded-2xl h-full bg-white mt-2 overflow-x-scroll">
        <thead className="text-left h-[70px] text-black/70 font-medium ">
          <tr className="border-b">
            {Object.keys(processPayroll[0]).map((header) => (
              <th key={header} className="pl-[1.5%] pr-5">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processPayroll.map((item, index) => (
            <tr key={index} className="border-b">
              {Object.values(item).map((value, index) => (
                <td key={index} className="py-2 text-sm pl-[1.5%] pr-5">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
