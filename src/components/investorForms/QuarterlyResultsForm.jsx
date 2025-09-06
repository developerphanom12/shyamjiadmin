import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const QuarterlyResultsForm = () => {
  const [sections, setSections] = useState([
    { title: "Results for Quarter and Year ended March 31, 2025", reports: [{ type: "", file: null }] },
    { title: "Results for Quarter and Year ended June 30, 2025", reports: [{ type: "", file: null }] },
    { title: "Results for Quarter and Year ended September 30, 2025", reports: [{ type: "", file: null }], },
  ]);

  const addReportType = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].reports.push({ type: "", file: null });
    setSections(updated);
  };

  const handleReportTypeChange = (sectionIndex, reportIndex, value) => {
    const updated = [...sections];
    updated[sectionIndex].reports[reportIndex].type = value;
    setSections(updated);
  };

  const handleFileChange = (sectionIndex, reportIndex, file) => {
    const updated = [...sections];
    updated[sectionIndex].reports[reportIndex].file = file;
    setSections(updated);
  };

  // const addQuarter = () => {
  //   const nextQuarter = sections.length + 1;
  //   const quarterNames = [
  //     "March 31,",
  //     "June 30,",
  //     "September 30,",
  //     "December 31,"
  //   ];

  //   // Determine the quarter name based on index
  //   const quarterText =
  //     quarterNames[(nextQuarter - 1) % quarterNames.length] || "Custom Quarter";

  //   // Year logic
  //   const year = 2025; // You can make this dynamic later
  //   const newSection = {
  //     title: `Results for Quarter and Year ended ${quarterText} ${year}`,
  //     reports: [{ type: "", file: null }],
  //   };

  //   setSections([...sections, newSection]);
  // };

  const addQuarter = () => {
    setSections([
      ...sections,
      {
        title: "Results for Quarter and Year ended",
        reports: [{ type: "", file: null }],
      },
    ]);
  };

  return (
    <div className="quarterly-form">
      <h3 className="form-heading">FINANCIALS</h3>
      <p className="form-description">
        Enter Product Details And Expand Your Inventory.
      </p>

      {/* Main Yellow Header */}
      <div className="yellow-header">
        <img src={patternBg} alt="bg" className="pattern-bg" />
        <span>Quarterly Results</span>
      </div>

      {/* Year Input */}
      <div className="form-field">
        <label className="form-label">Year</label>
        <input
          type="text"
          placeholder="2025-2026"
          className="year-input"
        />
      </div>

      {/* Loop through both sections */}
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {/* Section Title */}
          <div className="yellow-header">
            <img src={patternBg} alt="bg" className="pattern-bg" />
            <label>{section.title}</label>
          </div>

          {/* Reports inside section */}
          {section.reports.map((report, reportIndex) => (
            <div key={reportIndex} className="report-type-row">
              {/* Dropdown */}
              <div className="form-field">
                <label className="form-label">Report Type</label>
                <select
                  value={report.type}
                  onChange={(e) =>
                    handleReportTypeChange(sectionIndex, reportIndex, e.target.value)
                  }
                >
                  <option value="">Select Report Type</option>
                  <option value="Press Release">Press Release</option>
                  <option value="Financial Statement">Financial Statement</option>
                </select>
              </div>

              {/* File Upload */}
              <div className="form-field">
                <label className="form-label">Action</label>
                <div className="annual-upload-input">
                  <span>Upload File</span>
                  <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(sectionIndex, reportIndex, e.target.files[0])
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <button
            type="button"
            className="add-report-btn"
            onClick={() => addReportType(sectionIndex)}
          >
            + Report Type
          </button>
        </div>
      ))}

      <div className="quater-btn-div">
        <button
          type="button"
          className="add-quater-btn"
          onClick={addQuarter}
        >
          + Add more Quarter
        </button>
      </div>

    </div>
  );
};

export default QuarterlyResultsForm;
