import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/worker.css'

const WorkerHomePage = () => {
    const [showMenu, setShowMenu] = useState(false);
  
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
  const [shift, setShift] = useState('');
  const [form1Data, setForm1Data] = useState(Array.from({ length: 35 }, () => ''));
  const [form2Data, setForm2Data] = useState(Array.from({ length: 5 }, () => ['', '', '']));
  const [confirmChecked, setConfirmChecked] = useState(false);

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleForm1DataChange = (index, value) => {
    const newData = [...form1Data];
    newData[index] = value;
    setForm1Data(newData);
  };

  const handleForm2DataChange = (rowIndex, colIndex, value) => {
    const newData = [...form2Data];
    newData[rowIndex][colIndex] = value;
    setForm2Data(newData);
  };

  const handleCheckboxChange = () => {
    setConfirmChecked(!confirmChecked);
  };

  const handleSubmit = async () => {
    if (!confirmChecked) {
      alert('Please confirm before submitting.');
      return;
    }

    try {
      const response = await axios.post('https://example.com/api/submitData', {
        shift,
        form1Data,
        form2Data,
      });
      console.log('Data submitted successfully:', response.data);

      // Clear form data
      setForm1Data(Array.from({ length: 35 }, () => ''));
      setForm2Data(Array.from({ length: 5 }, () => ['', '', '']));
      setConfirmChecked(false);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      {/* Navbar */}
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

      {/* Form 1 */}
<div>
  {/* Form 1 */}
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
      {[...Array(35)].map((_, index) => {
        const isDisabled = [1, 6, 9, 15, 18, 22].includes(index + 1);
        const heading = index % 7 === 0 ? `Heading ${Math.floor(index / 7) + 1}` : ''; // Generate headings
        const sampleName = index === 0 ? 'Shift' : `Sample ${index}`;
        return (
          <tr key={index}>
            <td>{heading || sampleName}</td>
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
                  onChange={(e) => handleForm1DataChange(index - 1, e.target.value)}
                  disabled={isDisabled}
                />
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

</div>



      {/* Checkbox */}
      <label>
        <input type="checkbox" checked={confirmChecked} onChange={handleCheckboxChange} />
        Confirm submission
      </label>

      {/* Submit Button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default WorkerHomePage;
