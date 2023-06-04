import React, { useState, useEffect, useContext } from "react";
import "../index.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { myContext } from "../ContextAPI";

const Pay_Policy = () => {
  const { isFile } = useContext(myContext);
  const [commands, setCommands] = useState([]);
  const [newCommand, setNewCommand] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [performance, setPerformance] = useState("");
  const [perfvalue, setPerfvalue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [salary, setSalary] = useState("");

  const handleSalaryChange = () => {
    setSalary(isFile.map((item) => item["Monthly base pay ($)"]));
  };
  useEffect(() => {
    const storedCommands = localStorage.getItem("commands");
    if (storedCommands) {
      setCommands(JSON.parse(storedCommands));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("commands", JSON.stringify(commands));
  }, [commands]);

  const handleAddCommand = () => {
    const command = {
      performance,
      perfvalue,
      percentage,
      salary,
    };

    setCommands((prevCommands) => [...prevCommands, command]);
    setPerformance("");
    setPerfvalue("");
    setPercentage("");
    setSalary();
  };

  const handleDeleteCommand = (index) => {
    setCommands((prevCommands) => prevCommands.filter((_, i) => i !== index));
  };

  const handleEditCommand = (index) => {
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
      salary,
    };

    setCommands((prevCommands) => {
      const updatedCommands = [...prevCommands];
      updatedCommands[editingIndex] = updatedCommand;
      return updatedCommands;
    });

    setEditingIndex(-1);
    setPerformance("");
    setPerfvalue("");
    setPercentage("");
    setSalary("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setPerformance("");
    setPerfvalue("");
    setPercentage("");
    setSalary("");
  };

  console.log(commands);

  return (
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
            onChange={handleSalaryChange}
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

export default Pay_Policy;
