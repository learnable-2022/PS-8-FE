import React, { useState, useEffect } from 'react';
import '../index.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

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
<<<<<<< HEAD
    <div className="flex w-[83%] payroll-bg">
      <div className="w-3/4 p-12 items-center justify-between">
      <h1 className=" font-bold payp p-3">Pay policy</h1>
        <div className="mb-4">
          <h2 className="text-x p-3">Input command</h2>
          <div className="flex items-center mt-2 paypolicy">
            <p className="p1 p">If</p>
            <input
              type="text"
              className="in1 input"
              placeholder="Appraisal"
              value={performance}
              onChange={e => setPerformance(e.target.value)}
            />
            <p className="p2">is</p>
            <input
              type="number"
              className="in2 input"
              placeholder="5"
              value={perfvalue}
              onChange={e => setPerfvalue(e.target.value)}
            />
            <p className="p3">=</p>
            <input
              type="text"
              className="in3 input"
              placeholder="+10%"
              value={percentage}
              onChange={e => setPercentage(e.target.value)}
            />
            <p className="p4">of</p>
            <input
              type="text"
              className="in4 input"
              placeholder="Base salary"
              value={salary}
              onChange={e => setSalary(e.target.value)}
            />
            <div className="addcommand">
              {editingIndex === -1 ? (
                <button
                  className="bg-[#430359] text-white py-2 px-4 rounded-xl"
                  onClick={handleAddCommand}
                >
                  Add command +
                </button>
              ) : (
                <div>
                  <button
                    className="bg-[#430359] text-white py-2 px-4 rounded-xl update-button"
                    onClick={handleUpdateCommand}
                  >
                    Update
                  </button>
                  <button
                    className=" text-[#430359] py-2 px-4 rounded-xl cancel-button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
=======
    <div className="flex w-full justify-center">
      <div className="mt-20 w-[90%] ">
        <h1 className="text-2xl font-bold mb-5">Pay policy</h1>
        <h2 className="text-lg font-bold mb-3">Input command</h2>
        <div className="flex items-center justify-center gap-6 border-black/20 bg-white py-4 rounded-lg border">
          <p className="font-bold text-black/40 ">If</p>
          <input
            type="text"
            className="outline-none w-[15%] py-1 text-center rounded-lg bg-black/10"
            placeholder="Appraisal"
            value={performance}
            onChange={(e) => setPerformance(e.target.value)}
          />
          <p className="">is</p>
          <input
            type="number"
            className=" outline-none w-[7%] py-1 text-center rounded-lg bg-black/10"
            placeholder="5"
            value={perfvalue}
            onChange={(e) => setPerfvalue(e.target.value)}
          />
          <p className="">=</p>
          <input
            type="text"
            className=" outline-none w-[7%] py-1 text-center rounded-lg bg-black/10"
            placeholder="+10%"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
          <p className="">of</p>
          <input
            type="text"
            className="outline-none w-[15%] py-1 text-center rounded-lg bg-black/10"
            placeholder="Base salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          {editingIndex === -1 ? (
            <button
              className="bg-[#430359] text-white w-1/5 py-1 text-center rounded-lg"
              onClick={handleAddCommand}
            >
              Add command +
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                className="bg-[#430359] hover:bg-[#660e83] transition duration-300 text-white py-1 px-4 rounded-lg update-button"
                onClick={handleUpdateCommand}
              >
                Update
              </button>
              <button
                className=" text-[#430359] hover:bg-[#e9e6e6] transition duration-300  py-1 px-4 rounded-lg cancel-button  hover:border-none"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
>>>>>>> 5e6f8362b20c938d4b3307866681bf92f608240a
            </div>
          )}
        </div>
        <h2 className="text-x p-3">Command lines</h2>
        {commands.map((command, index) => (
          <div
            key={index}
            className="span border rounded-xl p-1 flex items-center mb-2"
            onMouseEnter={() => setNewCommand(index)}
            onMouseLeave={() => setNewCommand(-1)}
          >
            <span className="mr-2 flex">
              <p className="comm">{index + 1}. If</p>
              <p className="comm co1">{command.performance}</p>
              <p className="comm">is</p>
              <p className="comm co1">{command.perfvalue}</p>
              <p className="comm">=</p>
              <p className="comm co1">{command.percentage}</p>
              <p className="comm">of</p>
              <p className="comm co1">{command.salary}</p>
            </span>
            {newCommand === index && editingIndex !== index && (
              <div className="">
                <button
                  className=" p-2"
                  onClick={() => handleEditCommand(index)}
                >
                  <BiEditAlt />
                </button>
                <button
                  className=" p-2"
                  onClick={() => handleDeleteCommand(index)}
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Pay_Policy };
export default Pay_Policy;
