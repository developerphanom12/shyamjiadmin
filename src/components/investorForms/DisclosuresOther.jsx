import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const DisclosuresOther = () => {
    const [tables, setTables] = useState([
        { header: "", file: null }
    ]);

    const handleChange = (index, field, value) => {
        const updatedTables = [...tables];
        updatedTables[index][field] = value;
        setTables(updatedTables);
    };

    const handleFileChange = (index, file) => {
        const updatedTables = [...tables];
        updatedTables[index].file = file;
        setTables(updatedTables);
    };

    const addTableColumn = () => {
        setTables([...tables, { header: "", file: null }]);
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
                <span>Stock Exchange Disclosures - Others</span>
            </div>

            <div className="form-field">
                <label className="form-label">Title<span>*</span></label>
                <input
                    type="text"
                    placeholder="Report of Monitoring Agency"
                    className="year-input"
                />
            </div>

            {tables.map((table, index) => (
                <div key={index}>
                    <h2 className="stock-table-heading">
                        Table {index + 1}
                    </h2>
                    <div className="form-field">
                        <label className="form-label">Header</label>
                        <input
                            type="text"
                            placeholder="Report of Monitoring Agency – March 31, 2021"
                            className="year-input"
                            value={table.header}
                            onChange={(e) => handleChange(index, "header", e.target.value)}
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
                                onChange={(e) => handleFileChange(index, e.target.files[0])}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className="quater-btn-div">
                <button
                    type="button"
                    className="add-quater-btn"
                    onClick={addTableColumn}
                >
                    + Add More Table Column
                </button>
            </div>
        </div>
    );
};

export default DisclosuresOther;
