import React from 'react'


export const Upload = () => {
    return (
        <div className="w-[100%] bg-[#e5e5e5]">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Payroll</h2>
          <button className="bg-[#430359] hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">
            Upload
          </button>
        </div>
            <div className='p-4'> <div className="bg-[#ededed] px-2 py-20"><p className="flex items-center justify-center text-gray-500 text-sm">No data found</p></div></div> 
      </div>
    );
}