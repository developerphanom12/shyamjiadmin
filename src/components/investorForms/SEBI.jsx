import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import "./QuarterlyResultsForm.css";

const SEBI = () => {
    const [rows, setRows] = useState([
        {
            srNo: 1,
            columns: [
                { particulars: "", url: "" }
            ]
        }
    ]);

    // Handle Sr. No. change
    const handleSrNoChange = (index, value) => {
        const updated = [...rows];
        updated[index].srNo = value;
        setRows(updated);
    };

    // Handle column field change
    const handleColumnChange = (rowIndex, colIndex, field, value) => {
        const updated = [...rows];
        updated[rowIndex].columns[colIndex][field] = value;
        setRows(updated);
    };

    // Add new column to a specific Sr. No.
    const addColumn = (rowIndex) => {
        const updated = [...rows];
        updated[rowIndex].columns.push({ particulars: "", url: "" });
        setRows(updated);
    };

    // Add new Sr. No. block
    const addRow = () => {
        setRows([
            ...rows,
            { srNo: rows.length + 1, columns: [{ particulars: "", url: "" }] }
        ]);
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
                <span>
                    Disclosures under Regulation 46 of SEBI (Listing Obligations and
                    Disclosure Requirements) Regulations, 2015
                </span>
            </div>

            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="sebi-block">
                    {/* Sr. No. */}
                    <div className="form-field">
                        <label className="form-label">Sr. No.</label>
                        <input
                            type="number"
                            placeholder="1"
                            className="year-input"
                            value={row.srNo}
                            onChange={(e) => handleSrNoChange(rowIndex, e.target.value)}
                        />
                    </div>

                    {/* Columns inside Sr. No. */}
                    {row.columns.map((col, colIndex) => (
                        <div key={colIndex} className="sebi-column">
                            <div className="form-field">
                                <label className="form-label">Particulars as per LODR</label>
                                <input
                                    type="text"
                                    placeholder="Details of Company's Business"
                                    className="year-input"
                                    value={col.particulars}
                                    onChange={(e) =>
                                        handleColumnChange(rowIndex, colIndex, "particulars", e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label">URL</label>
                                <input
                                    type="url"
                                    placeholder="Scheme Of Amalgamation of PNSFBPL with PSL"
                                    className="year-input"
                                    value={col.url}
                                    onChange={(e) =>
                                        handleColumnChange(rowIndex, colIndex, "url", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    {/* Add More Column inside Sr. No. */}
                    <button
                        type="button"
                        className="add-report-btn"
                        onClick={() => addColumn(rowIndex)}
                    >
                        + Add More Column
                    </button>
                </div>
            ))}

            {/* Add More Sr. No. Block */}
            <div className="quater-btn-div">
                <button
                    type="button"
                    className="add-quater-btn"
                    onClick={addRow}
                >
                    + Add More
                </button>
            </div>
        </div>
    );
};

export default SEBI;
