import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const DisclosuresRegulation = () => {
  const [titles, setTitles] = useState([
    {
      title: "",
      tableRows: [{ header: "", file: null }],
    },
  ]);

  // Update title value
  const handleTitleChange = (titleIndex, value) => {
    const updated = [...titles];
    updated[titleIndex].title = value;
    setTitles(updated);
  };

  // Update header value
  const handleHeaderChange = (titleIndex, rowIndex, value) => {
    const updated = [...titles];
    updated[titleIndex].tableRows[rowIndex].header = value;
    setTitles(updated);
  };

  // Update file upload
  const handleFileChange = (titleIndex, rowIndex, file) => {
    const updated = [...titles];
    updated[titleIndex].tableRows[rowIndex].file = file;
    setTitles(updated);
  };

  // Add new row to existing title
  const addMoreRow = (titleIndex) => {
    const updated = [...titles];
    updated[titleIndex].tableRows.push({ header: "", file: null });
    setTitles(updated);
  };

  // Add new title section
  const addMoreTitle = () => {
    setTitles([...titles, { title: "", tableRows: [{ header: "", file: null }] }]);
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
        <span>Stock-Exchange-Disclosures-Regulation-30</span>
      </div>

      {titles.map((section, titleIndex) => (
        <div key={titleIndex} className="title-section">
          {/* Title */}
          <div className="form-field">
            <label className="form-label">Title<span>*</span></label>
            <input
              type="text"
              placeholder="Intimations/Disclosures"
              value={section.title}
              onChange={(e) => handleTitleChange(titleIndex, e.target.value)}
              className="year-input"
            />
          </div>

          {/* Table */}
          <h2 className="stock-table-heading">Table</h2>
          {section.tableRows.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              <div className="form-field">
                <label className="form-label">Header</label>
                <input
                  type="text"
                  placeholder="16th Annual General Meeting Proceedings"
                  value={row.header}
                  onChange={(e) => handleHeaderChange(titleIndex, rowIndex, e.target.value)}
                  className="year-input"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Upload File</label>
                <div className="annual-upload-input">
                  <span>Upload File</span>
                  <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(titleIndex, rowIndex, e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add More Rows */}
          <button
            type="button"
            className="add-report-btn"
            onClick={() => addMoreRow(titleIndex)}
          >
            + Add More
          </button>
        </div>
      ))}

      {/* Add More Titles */}
      <div className="quater-btn-div">
        <button
          type="button"
          className="add-quater-btn"
          onClick={addMoreTitle}
        >
          + Add More Title
        </button>
      </div>
    </div>
  );
};

export default DisclosuresRegulation;
