import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import "./QuarterlyResultsForm.css";

const StockInformation = () => {
    const [columns, setColumns] = useState([
        {
            columnTitle: "Table Column",
            rows: [{ header: "", data: "" }]
        }
    ]);

    // Add a new row (Header + Data) inside a specific column
    const handleAddRow = (colIndex) => {
        const updated = [...columns];
        updated[colIndex].rows.push({ header: "", data: "" });
        setColumns(updated);
    };

    // Add a completely new column section
    const handleAddColumn = () => {
        setColumns([
            ...columns,
            { columnTitle: "Table Column", rows: [{ header: "", data: "" }] }
        ]);
    };

    // Handle input change
    const handleChange = (colIndex, rowIndex, field, value) => {
        const updated = [...columns];
        updated[colIndex].rows[rowIndex][field] = value;
        setColumns(updated);
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
                <span>Stock Exchange Information</span>
            </div>

            {/* Title */}
            <div className="form-field">
                <label className="form-label">
                    Title<span>*</span>
                </label>
                <input
                    type="text"
                    placeholder="The equity Shares of the Company are listed on the following 2 Stock Exchanges in India:"
                    className="year-input"
                />
            </div>

            {columns.map((col, colIndex) => (
                <div key={colIndex} className="table-column-section">
                    <h2 className="stock-table-heading">{col.columnTitle}</h2>

                    {col.rows.map((row, rowIndex) => (
                        <div key={rowIndex}>
                            <div className="form-field">
                                <label className="form-label">Header</label>
                                <input
                                    type="text"
                                    placeholder="Name of Stock Exchange"
                                    className="year-input"
                                    value={row.header}
                                    onChange={(e) =>
                                        handleChange(colIndex, rowIndex, "header", e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label">Data</label>
                                <input
                                    type="text"
                                    placeholder="National Stock Exchange of India Limited"
                                    className="year-input"
                                    value={row.data}
                                    onChange={(e) =>
                                        handleChange(colIndex, rowIndex, "data", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="add-report-btn"
                        onClick={() => handleAddRow(colIndex)}
                    >
                        + Add More Data
                    </button>
                </div>
            ))}

            <div className="quater-btn-div">
                <button
                    type="button"
                    className="add-quater-btn"
                    onClick={handleAddColumn}
                >
                    + Add more Table Column
                </button>
            </div>
        </div>
    );
};

export default StockInformation;
