import React, { useState, useEffect } from 'react';
import '../index.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import payPolicy from '/pay_policy.json';

const Pay_Policy = () => {
  const [commands, setCommands] = useState([]);
  const [newCommand, setNewCommand] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [performance, setPerformance] = useState('');
  const [perfvalue, setPerfvalue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [salary, setSalary] = useState('');
  useEffect(() => {
    const storedCommands = localStorage.getItem('commands');
    if (storedCommands) {
      setCommands(JSON.parse(storedCommands));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('commands', JSON.stringify(commands));
  }, [commands]);

  const handleAddCommand = () => {
    const command = {
      performance,
      perfvalue,
      percentage,
      salary
    };

    setCommands(prevCommands => [...prevCommands, command]);
    setPerformance('');
    setPerfvalue('');
    setPercentage('');
    setSalary('');
  };

  const handleDeleteCommand = index => {
    setCommands(prevCommands => prevCommands.filter((_, i) => i !== index));
  };

  const handleEditCommand = index => {
    setEditingIndex(index);
    const command = commands[index];
    setPerformance(command.performance);
    setPerfvalue(command.perfvalue);
    setPercentage(command.percentage);
    setSalary(command.salary);
  };

  const handleUpdateCommand = () => {
    const updatedCommand = {
      performance,
      perfvalue,
      percentage,
      salary
    };

    setCommands(prevCommands => {
      const updatedCommands = [...prevCommands];
      updatedCommands[editingIndex] = updatedCommand;
      return updatedCommands;
    });

    setEditingIndex(-1);
    setPerformance('');
    setPerfvalue('');
    setPercentage('');
    setSalary('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setPerformance('');
    setPerfvalue('');
    setPercentage('');
    setSalary('');
  };

  return (
    <div className="flex w-full justify-center">
      <div className="mt-8 w-[90%] ">
        <h1 className="text-[34px] font-bold">Pay policy</h1>
        {payPolicy.map((item) => (
             <div key={item.id} className="flex items-center space-x-6 justify-center gap-6 border-black/20 bg-white py-[4px] rounded-lg border my-2">
          <p className="font-bold text-black ">{item.id}.</p>
          <p className="font-bold text-black ">If</p>
          <p className="border-solid border-2 py-1 px-2">{item.performance}</p>
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
};

export { Pay_Policy };
export default Pay_Policy;
