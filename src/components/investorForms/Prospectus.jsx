import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const Prospectus = () => {
  // State: Array of tables
  const [tables, setTables] = useState([
    {
      text: "",
      files: [null], // Each table starts with one file input
    },
  ]);

  // Handle text change
  const handleTextChange = (tableIndex, value) => {
    const updated = [...tables];
    updated[tableIndex].text = value;
    setTables(updated);
  };

  // Handle file change
  const handleFileChange = (tableIndex, fileIndex, file) => {
    const updated = [...tables];
    updated[tableIndex].files[fileIndex] = file;
    setTables(updated);
  };

  // Add more files to a specific table
  const addMoreFile = (tableIndex) => {
    const updated = [...tables];
    updated[tableIndex].files.push(null);
    setTables(updated);
  };

  // Add new table (text + file input)
  const addMoreTable = () => {
    setTables([
      ...tables,
      {
        text: "",
        files: [null],
      },
    ]);
  };

  return (
    <div className="quarterly-form">
      <h3 className="form-heading">INVESTOR INFORMATION</h3>
      <p className="form-description">
        Enter Product Details And Expand Your Inventory.
      </p>

      <div className="yellow-header">
        <img src={patternBg} alt="bg" className="pattern-bg" />
        <span>Prospectus</span>
      </div>

      {tables.map((table, tIndex) => (
        <div key={tIndex} className="prospectus-table">
          {/* Text input */}
          <div className="form-field">
            <label className="form-label">Text</label>
            <input
              type="text"
              value={table.text}
              onChange={(e) => handleTextChange(tIndex, e.target.value)}
              placeholder="The equity Shares of the Company are listed on the following 2 Stock Exchanges in India:"
              className="year-input"
            />
          </div>

          {/* File inputs */}
          {table.files.map((file, fIndex) => (
            <div key={fIndex} className="form-field">
              <label className="form-label">Action</label>
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
                    handleFileChange(tIndex, fIndex, e.target.files[0])
                  }
                />
              </div>
            </div>
          ))}

          {/* Add more file */}
          <button
            type="button"
            className="add-report-btn"
            onClick={() => addMoreFile(tIndex)}
          >
            + Add More
          </button>
        </div>
      ))}

      {/* Add more */}
      <div className="quater-btn-div">
        <button type="button" className="add-quater-btn" onClick={addMoreTable}>
          + Add more Prospectus
        </button>
      </div>

    </div>
  );
};

export default Prospectus;
