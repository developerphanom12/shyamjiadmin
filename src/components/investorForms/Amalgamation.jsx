import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const Amalgamation = () => {
    const [titleBlocks, setTitleBlocks] = useState([
        { mainTitle: "", title: "", file: null }
    ]);

    // Handle input change
    const handleChange = (index, field, value) => {
        const updated = [...titleBlocks];
        updated[index][field] = value;
        setTitleBlocks(updated);
    };

    // Add a new block
    const handleAddBlock = () => {
        setTitleBlocks([...titleBlocks, { mainTitle: "", title: "", file: null }]);
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
                <span>Scheme Of Amalgamation</span>
            </div>

            {titleBlocks.map((block, index) => (
                <div key={index} className="title-block">
                    <div className="form-field">
                        <label className="form-label">Main Title</label>
                        <input
                            type="text"
                            placeholder="Scheme Of Amalgamation of PNSFBPL with PSL"
                            className="year-input"
                            value={block.mainTitle}
                            onChange={(e) => handleChange(index, "mainTitle", e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            placeholder="Draft Scheme of Amalgamation"
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
                                onChange={(e) =>
                                    handleChange(index, "file", e.target.files[0])
                                }
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

export default Amalgamation;
