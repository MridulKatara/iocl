import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/worker.css";

const WorkerHomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const [shift, setShift] = useState("");
  const [form1Data, setForm1Data] = useState(
    Array.from({ length: 27 }, () => "") // Adjusted to match number of fields minus shift
  );
  const [confirmChecked, setConfirmChecked] = useState(false);

  const handleShiftChange = (event) => setShift(event.target.value);
  const handleForm1DataChange = (index, value) => {
    let newData = [...form1Data];
    newData[index] = value;
    setForm1Data(newData);
  };

  const handleCheckboxChange = () => setConfirmChecked(!confirmChecked);

  const handleSubmit = async () => {
    if (!confirmChecked) {
      alert("Please confirm before submitting.");
      return;
    }

    // Check if all inputs are filled, including the shift
    if (!shift || form1Data.some((field) => field === "")) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      const response = await axios.post("https://example.com/api/submitData", {
        shift,
        form1Data,
      });
      console.log("Data submitted successfully:", response.data);

      // Clear data after successful submission
      setShift("");
      setForm1Data(Array.from({ length: 27 }, () => ""));
      setConfirmChecked(false);

      // Use a timeout to delay the refresh, ensuring state updates have been processed
      setTimeout(() => {
        window.location.reload();
      }, 500); // 500 milliseconds delay
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const labels = [
    "Shifts",
    "EB INCOMER - HT YARD",
    "Yard Locked",
    "Danger sign displayed Area clear of vegetation",
    "VCB Panel",
    "Voltage",
    "Current (Amps)",
    "Power Factor",
    "KWH Meter reading",
    "Control Supply Voltage (AC/DC)",
    "Meter/lamps/Alarm functional",
    "Power Transformer",
    "Oil level ok No oil leakages Oil Temp (deg C)",
    "Winding temp (deg C)",
    "Condition of silica gel ok Lighting Transformer",
    "Winding temp (deg C)",
    "DG/EB INCOMER - PMCC",
    "Voltage",
    "Power Factor",
    "Load Current (Amps)",
    "Meters & Lamps working",
    "PMCC Panel",
    "Meter/ Lamps working Dust/ cobwebs not existing Emergency Light working",
    "Battery Charger",
    "AC voltage ok Battery voltage float charger voltage boost charger voltage",
    "DC output current",
    "Distilled water level in battery ok Battery terminal condition ok",
    "Equipment",
  ];

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.jpg" alt="Company Logo" />
        </div>
        <div className="menu">
          <span onClick={toggleMenu}>Employee Name ▼</span>
          {showMenu && (
            <div className="dropdown-menu">
              <Link to="/change-password">Change Password</Link>
              <Link to="/logout">Logout</Link>
            </div>
          )}
        </div>
      </nav>

      <div>
        <h1>Form 1</h1>
        <table>
          <thead>
            <tr>
              <th>Heading</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {labels.map((label, index) => (
              <tr key={index}>
                <td>{label}</td>
                <td>
                  {index === 0 ? (
                    <select value={shift} onChange={handleShiftChange}>
                      <option value="">--Select Shift--</option>
                      <option value="Shift 1">Shift 1</option>
                      <option value="Shift 2">Shift 2</option>
                      <option value="Shift 3">Shift 3</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={form1Data[index - 1]}
                      onChange={(e) =>
                        handleForm1DataChange(index - 1, e.target.value)
                      }
                      disabled={false}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <label>
        <input
          type="checkbox"
          checked={confirmChecked}
          onChange={handleCheckboxChange}
          className="homeCheck"
        />
        Confirm submission
      </label>
      <div className="homeSubmit-container">
  <button className="homeSubmit" onClick={handleSubmit}>Submit</button>
</div>
    </div>
  );
};

export default WorkerHomePage;