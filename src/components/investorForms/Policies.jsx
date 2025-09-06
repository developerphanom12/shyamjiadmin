import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const Policies = () => {
  const [policyRows, setPolicyRows] = useState([
    { mainText: "", text: "", file: null }
  ]);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updated = [...policyRows];
    updated[index][field] = value;
    setPolicyRows(updated);
  };

  // Add new row
  const handleAddRow = () => {
    setPolicyRows([...policyRows, { mainText: "", text: "", file: null }]);
  };

  return (
    <div className="quarterly-form">
      <h3 className="form-heading">CORPORATE GOVERNANCE</h3>
      <p className="form-description">
        Enter Product Details And Expand Your Inventory.
      </p>

      {/* Main Yellow Header */}
      <div className="yellow-header">
        <img src={patternBg} alt="bg" className="pattern-bg" />
        <span>Policies, Codes, CSR Projects and Other</span>
      </div>

      {policyRows.map((row, index) => (
        <div key={index} className="policy-block">
          <div className="form-field">
            <label className="form-label">Main Text</label>
            <input
              type="text"
              placeholder="Policies"
              className="year-input"
              value={row.mainText}
              onChange={(e) => handleChange(index, "mainText", e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Text</label>
            <input
              type="text"
              placeholder="Vigil Mechanism/Whistle Blower Policy"
              className="year-input"
              value={row.text}
              onChange={(e) => handleChange(index, "text", e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Upload File</label>
            <div className="annual-upload-input">
              <span>Upload File</span>
              <img
                src={uploadIcon}
                alt="Upload Icon"
                className="annual-upload-icon"
              />
              <input
                type="file"
                onChange={(e) =>
                  handleChange(index, "file", e.target.files[0])
                }
              />
            </div>
          </div>
        </div>
      ))}

      <div className="quater-btn-div">
        <button
          type="button"
          className="add-quater-btn"
          onClick={handleAddRow}
        >
          + Add More Main Text
        </button>
      </div>

    </div>
  );
};

export default Policies;
