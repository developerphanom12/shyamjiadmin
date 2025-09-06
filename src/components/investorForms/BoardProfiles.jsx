import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const BoardProfiles = () => {
    const [fields, setFields] = useState([
        { file: null, data: "" }
    ]);

    // Handle file change
    const handleFileChange = (index, file) => {
        const updated = [...fields];
        updated[index].file = file;
        setFields(updated);
    };

    // Handle textarea change
    const handleTextChange = (index, value) => {
        const updated = [...fields];
        updated[index].data = value;
        setFields(updated);
    };

    // Add more fields
    const addMoreFields = () => {
        setFields([...fields, { file: null, data: "" }]);
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
                <span>Board Profiles</span>
            </div>

            {fields.map((field, index) => (
                <div key={index} className="form-field-group">
                    {/* Upload Field */}
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
                                    handleFileChange(index, e.target.files[0])
                                }
                            />
                        </div>
                    </div>

                    {/* Textarea Field */}
                    <div className="form-field">
                        <label className="form-label">About</label>
                        <textarea
                            placeholder="Mr. Arvind Mehta is the Chairman and Executive Director of our Company. Being our Promoter, he has been associated with our Company since its incorporation. He was appointed as an additional Director."
                            className="year-input"
                            value={field.data}
                            onChange={(e) =>
                                handleTextChange(index, e.target.value)
                            }
                        />
                    </div>
                </div>
            ))}

            {/* Add More Button */}
            <button
                type="button"
                className="add-quater-btn"
                onClick={addMoreFields}
            >
                + Add more
            </button>
        </div>
    );
};

export default BoardProfiles;
