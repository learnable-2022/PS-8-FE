import React from 'react'


export const Upload = () => {
    return (
        <div className="w-[100%] bg-[#e5e5e5]">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Payroll</h2>
         
          <label htmlFor="payroll" className="cursor-pointer  bg-[#430359] hover:bg-purple-900 text-white font-bold py-3 px-5 rounded-xl">
            Upload
            
          </label>
          <input type="file" className="hidden" id="payroll" name="payroll" />
        </div>
            <div className='p-4'> <div className="bg-[#ededed] px-2 py-20"><p className="flex items-center justify-center text-gray-500 text-sm">No data found</p></div></div> 
      </div>
    );
}