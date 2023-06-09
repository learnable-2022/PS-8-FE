
import data from '/data'

export const Pay_Policy = () => {
    return (
    <div className="flex w-full justify-center">
      <div className="mt-8 w-[90%] ">
        <h1 className="text-[34px] font-bold">Pay policy</h1>
        {data.map((item) => (
             <div key={item.id} className="flex items-center space-x-6 justify-center gap-6 border-black/20 bg-white py-[4px] rounded-lg border my-2">
          <p className="font-bold text-black ">{item.id}.</p>
          <p className="font-bold text-black ">If</p>
          <p className="border-solid border-2 py-1 px-2 text-right">{item.performance}</p>
          <p className="font-bold text-black">is</p>
          <p className="border-solid border-2 py-1 px-1">{item.perfvalue}</p>
          <p className="font-bold text-black ">Then Total Pay</p>
          <p className="font-bold text-black">=</p>
          <p className="border-solid border-2 py-1 px-1">{item.percentage}</p>
          <p className="font-bold text-black">of</p>
          <p className="border-solid border-2 py-1 px-1">{item.salary}</p>
        </div>
        ))}
        
      </div>
    </div>
  );
}


