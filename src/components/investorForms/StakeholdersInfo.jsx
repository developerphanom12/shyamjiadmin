import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const StakeholdersInfo = () => {
    // Titles state
    const [titleBlocks, setTitleBlocks] = useState([
        { mainText: "", title: "", file: null }
    ]);

    // State for multiple "Main Text + Table" blocks
    const [tableBlocks, setTableBlocks] = useState([
        {
            mainText: "",
            columns: [{ header: "", rows: [""] }]
        }
    ]);

    // New state for extra uploads in "+ Add More Data"
    const [extraUploads, setExtraUploads] = useState([]);

    // ===== Handlers for Title Section =====
    const handleTitleChange = (index, field, value) => {
        const updated = [...titleBlocks];
        updated[index][field] = value;
        setTitleBlocks(updated);
    };

    // ===== Handlers for Table Blocks =====
    const handleTableMainTextChange = (blockIndex, value) => {
        const updated = [...tableBlocks];
        updated[blockIndex].mainText = value;
        setTableBlocks(updated);
    };

    const handleHeaderChange = (blockIndex, colIndex, value) => {
        const updated = [...tableBlocks];
        updated[blockIndex].columns[colIndex].header = value;
        setTableBlocks(updated);
    };

    const handleRowChange = (blockIndex, colIndex, rowIndex, value) => {
        const updated = [...tableBlocks];
        updated[blockIndex].columns[colIndex].rows[rowIndex] = value;
        setTableBlocks(updated);
    };

    const addDataRow = (blockIndex, colIndex) => {
        const updated = [...tableBlocks];
        updated[blockIndex].columns[colIndex].rows.push("");
        setTableBlocks(updated);
    };

    const addColumn = (blockIndex) => {
        const updated = [...tableBlocks];
        updated[blockIndex].columns.push({ header: "", rows: [""] });
        setTableBlocks(updated);
    };

    const addMainTextBlock = () => {
        setTableBlocks([
            ...tableBlocks,
            { mainText: "", columns: [{ header: "", rows: [""] }] }
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
                <span>Shareholders Information</span>
            </div>

            {/* ---- Main Text + Title + Action Block ---- */}
            {titleBlocks.map((block, index) => (
                <div key={index}>
                    <div className="form-field">
                        <label className="form-label">Main Text</label>
                        <input
                            type="text"
                            placeholder="Investor's Service Request "
                            className="year-input"
                            value={block.mainText}
                            onChange={(e) =>
                                handleTitleChange(index, "mainText", e.target.value)
                            }
                        />
                    </div>
                    <div className="form-field">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            placeholder="Notice for Common and Simplified Norms..."
                            className="year-input"
                            value={block.title}
                            onChange={(e) =>
                                handleTitleChange(index, "title", e.target.value)
                            }
                        />
                    </div>
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
                                    handleTitleChange(index, "file", e.target.files[0])
                                }
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="button"
                className="add-report-btn"
                onClick={() =>
                    setTitleBlocks([...titleBlocks, { mainText: "", title: "", file: null }])
                }
            >
                + Add More Title
            </button>

            {/* ===== Table Blocks Rendering ===== */}
            {tableBlocks.map((block, blockIndex) => (
                <div key={blockIndex} style={{ marginTop: "20px" }}>
                    {/* Main Text for Table */}
                    <div className="form-field">
                        <label className="form-label">Main Text</label>
                        <input
                            type="text"
                            placeholder="Postal Ballot Notice"
                            className="year-input"
                            value={block.mainText}
                            onChange={(e) =>
                                handleTableMainTextChange(blockIndex, e.target.value)
                            }
                        />
                    </div>

                    <h2 className="stock-table-heading">Table Columns</h2>

                    {/* Render each column */}
                    {block.columns.map((col, colIndex) => (
                        <div key={colIndex} className="table-column-block">
                            <div className="form-field">
                                <label className="form-label">Header</label>
                                <input
                                    type="text"
                                    placeholder="Financial Year"
                                    className="year-input"
                                    value={col.header}
                                    onChange={(e) =>
                                        handleHeaderChange(blockIndex, colIndex, e.target.value)
                                    }
                                />
                            </div>

                            {/* Data rows */}
                            {col.rows.map((row, rowIndex) => (
                                <div className="form-field" key={rowIndex}>
                                    <label className="form-label">Data</label>
                                    <input
                                        type="text"
                                        placeholder="2024-2025"
                                        className="year-input"
                                        value={row}
                                        onChange={(e) =>
                                            handleRowChange(
                                                blockIndex,
                                                colIndex,
                                                rowIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}

                            <button
                                type="button"
                                className="add-report-btn"
                                onClick={() => addDataRow(blockIndex, colIndex)}
                            >
                                + Add Data
                            </button>
                        </div>
                    ))}

                    {/* Add column button */}
                    <div style={{ textAlign: "right" }}>
                        <button
                            type="button"
                            className="add-quater-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                addColumn(blockIndex);
                            }}
                        >
                            + Add More Table Column
                        </button>
                    </div>
                </div>
            ))}

            {/* Add More Main Text Block */}
            <div style={{ textAlign: "right" }}>
                <button
                    type="button"
                    className="add-quater-btn"
                    onClick={addMainTextBlock}
                >
                    + Add More Main Text
                </button>
            </div>

            {/* Fixed file upload fields */}
            <div className="form-field">
                <label className="form-label">De-materialization of Physical Shares</label>
                <div className="annual-upload-input">
                    <span>Upload File</span>
                    <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
                    <input type="file" />
                </div>
            </div>
            <div className="form-field">
                <label className="form-label">IEPF-FAQs</label>
                <div className="annual-upload-input">
                    <span>Upload File</span>
                    <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
                    <input type="file" />
                </div>
            </div>
            <div className="form-field">
                <label className="form-label">IEPF-5 Form</label>
                <div className="annual-upload-input">
                    <span>Upload File</span>
                    <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
                    <input type="file" />
                </div>
            </div>

            {/* Dynamically added uploads */}
            {extraUploads.map((_, index) => (
                <div className="form-field" key={index}>
                    <label className="form-label">Upload File</label>
                    <div className="annual-upload-input">
                        <span>Upload File</span>
                        <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
                        <input type="file" />
                    </div>
                </div>
            ))}

            <button
                type="button"
                className="add-report-btn"
                onClick={() => setExtraUploads([...extraUploads, {}])}
            >
                + Add More Data
            </button>
        </div>
    );
};

export default StakeholdersInfo;
