import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const AnnualReports = () => {
    const [annualData, setAnnualData] = useState([
        {
            year: "",
            reports: [{ type: "", file: null }],
        },
    ]);

    // Year
    const updateAnnualYear = (yearIndex, value) => {
        const updatedData = [...annualData];
        updatedData[yearIndex].year = value;
        setAnnualData(updatedData);
    };

    // Report type 
    const updateAnnualReportType = (yearIndex, reportIndex, value) => {
        const updatedData = [...annualData];
        updatedData[yearIndex].reports[reportIndex].type = value;
        setAnnualData(updatedData);
    };

    // File change
    const updateAnnualFile = (yearIndex, reportIndex, file) => {
        const updatedData = [...annualData];
        updatedData[yearIndex].reports[reportIndex].file = file;
        setAnnualData(updatedData);
    };

    // Add new report type inside a year
    const insertAnnualReportType = (yearIndex) => {
        const updatedData = [...annualData];
        updatedData[yearIndex].reports.push({ type: "", file: null });
        setAnnualData(updatedData);
    };

    // Add new year section
    const insertAnnualYear = () => {
        setAnnualData([
            ...annualData,
            { year: "", reports: [{ type: "", file: null }] },
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
                <span>Annual Reports</span>
            </div>

            {annualData.map((yearBlock, yIndex) => (
                <div key={yIndex} className="year-block">
                    {/* Year Input */}
                    <div className="form-field">
                        <label className="form-label">Year</label>
                        <input
                            type="text"
                            placeholder="2025-2026"
                            value={yearBlock.year}
                            onChange={(e) => updateAnnualYear(yIndex, e.target.value)}
                            className="year-input"
                        />
                    </div>

                    {/* Reports for this year */}
                    {yearBlock.reports.map((report, rIndex) => (
                        <div key={rIndex} className="report-row">
                            <div className="form-field inventory">
                                <label className="form-label">Report Type</label>
                                <select
                                    value={report.type}
                                    onChange={(e) =>
                                        updateAnnualReportType(yIndex, rIndex, e.target.value)
                                    }
                                >
                                    <option value="">Select Report Type</option>
                                    <option value="Press Release">Press Release</option>
                                    <option value="Financial Statement">
                                        Financial Statement
                                    </option>
                                </select>
                            </div>

                            {/* File Upload */}
                            <div className="form-field">
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
                                            updateAnnualFile(
                                                yIndex,
                                                rIndex,
                                                e.target.files ? e.target.files[0] : null
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Report Type button for this year */}
                    <button
                        type="button"
                        className="add-report-btn"
                        onClick={() => insertAnnualReportType(yIndex)}
                    >
                        + Report Type
                    </button>
                </div>
            ))}

            {/* Add More Year Button */}
            <div className="quater-btn-div">
                <button
                    type="button"
                    className="add-quater-btn"
                    onClick={insertAnnualYear}
                >
                    + Add more Year
                </button>
            </div>

        </div>
    );
};

export default AnnualReports;
