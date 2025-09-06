import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import "./QuarterlyResultsForm.css";

const Committees = () => {
  const [committeeRows, setCommitteeRows] = useState([
    {
      name: "",
      destination: "",
      audit: "",
      csr: "",
      nr: "",
      sr: "",
      risk: "",
    },
  ]);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedRows = [...committeeRows];
    updatedRows[index][field] = value;
    setCommitteeRows(updatedRows);
  };

  // Add new row
  const handleAddRow = () => {
    setCommitteeRows([
      ...committeeRows,
      { name: "", destination: "", audit: "", csr: "", nr: "", sr: "", risk: "" },
    ]);
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
        <span>Constitution Of Committees</span>
      </div>

      {committeeRows.map((row, index) => (
        <div key={index} className="committee-block">
          <h2 className="stock-table-heading">Table Column {index + 1}</h2>

          <div className="form-field">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Mr. Arvind Mehta"
              className="year-input"
              value={row.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Destination</label>
            <input
              type="text"
              placeholder="Chairman and Executive Director"
              className="year-input"
              value={row.destination}
              onChange={(e) => handleChange(index, "destination", e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Audit Committee</label>
            <input
              type="text"
              placeholder="-"
              className="year-input"
              value={row.audit}
              onChange={(e) => handleChange(index, "audit", e.target.value)}
            />
          </div>

          <div className="form-field inventory">
            <label className="form-label">CSR Committee</label>
            <select
              value={row.csr}
              onChange={(e) => handleChange(index, "csr", e.target.value)}
            >
              <option value="">Member</option>
              <option value="Ritik">Ritik</option>
              <option value="Mohit">Mohit</option>
            </select>
          </div>

          <div className="form-field inventory">
            <label className="form-label">NR Committee</label>
            <select
              value={row.nr}
              onChange={(e) => handleChange(index, "nr", e.target.value)}
            >
              <option value="">Member</option>
              <option value="Ritik">Ritik</option>
              <option value="Mohit">Mohit</option>
            </select>
          </div>

          <div className="form-field inventory">
            <label className="form-label">SR Committee</label>
            <select
              value={row.sr}
              onChange={(e) => handleChange(index, "sr", e.target.value)}
            >
              <option value="">Member</option>
              <option value="Ritik">Ritik</option>
              <option value="Mohit">Mohit</option>
            </select>
          </div>

          <div className="form-field inventory">
            <label className="form-label">Risk Management Committee</label>
            <select
              value={row.risk}
              onChange={(e) => handleChange(index, "risk", e.target.value)}
            >
              <option value="">Member</option>
              <option value="Ritik">Ritik</option>
              <option value="Mohit">Mohit</option>
            </select>
          </div>
        </div>
      ))}

      <div className="quater-btn-div">
        <button type="button" className="add-quater-btn" onClick={handleAddRow}>
          + Add More
        </button>
      </div>
    </div>
  );
};

export default Committees;
