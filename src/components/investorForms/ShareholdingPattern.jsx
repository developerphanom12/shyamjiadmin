import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const ShareholdingPattern = () => {
  const [blocks, setBlocks] = useState([{ title: "", file: null }]);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...blocks];
    updated[index][field] = value;
    setBlocks(updated);
  };

  // Add a new block
  const handleAddBlock = () => {
    setBlocks([...blocks, { title: "", file: null }]);
  };

  return (
    <div className="quarterly-form">
      <h3 className="form-heading">INVESTOR INFORMATION</h3>
      <p className="form-description">
        Enter Product Details And Expand Your Inventory.
      </p>

      {/* Main Yellow Header */}
      <div className="yellow-header">
        <img src={patternBg} alt="bg" className="pattern-bg" />
        <span>Shareholding Pattern</span>
      </div>

      {blocks.map((block, index) => (
        <div key={index} className="shareholding-block">
          <div className="form-field">
            <label className="form-label">Title</label>
            <input
              type="text"
              placeholder="Shareholding Pattern – 30.06.2025"
              className="year-input"
              value={block.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
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
                onChange={(e) => handleChange(index, "file", e.target.files[0])}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="quater-btn-div">
        <button
          type="button"
          className="add-quater-btn"
          onClick={handleAddBlock}
        >
          + Add More Title
        </button>
      </div>
    </div>
  );
};

export default ShareholdingPattern;
