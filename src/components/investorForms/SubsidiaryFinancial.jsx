import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const SubsidiaryFinancial = () => {
    const [financials, setFinancials] = useState([
        { title: "", firstTable: "", secondTable: "", file: null }
    ]);

    const handleChange = (index, field, value) => {
        const updated = [...financials];
        updated[index][field] = value;
        setFinancials(updated);
    };

    const handleFileChange = (index, file) => {
        const updated = [...financials];
        updated[index].file = file;
        setFinancials(updated);
    };

    const addFinancial = () => {
        setFinancials([
            ...financials,
            { title: "", firstTable: "", secondTable: "", file: null }
        ]);
    };

    return (
        <div className="quarterly-form">
            <h3 className="form-heading">FINANCIALS</h3>
            <p className="form-description">
                Enter Product Details And Expand Your Inventory.
            </p>

            <div className="yellow-header">
                <img src={patternBg} alt="bg" className="pattern-bg" />
                <span>Subsidiary Financial</span>
            </div>

            {financials.map((item, index) => (
                <div key={index} className="financial-block">
                    <div className="form-field">
                        <label className="form-label">Title<span>*</span></label>
                        <input
                            type="text"
                            placeholder="Red Rotopack Pvt. Ptd. - 31 March , 2022"
                            className="year-input"
                            value={item.title}
                            onChange={(e) =>
                                handleChange(index, "title", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">First Table Data</label>
                        <input
                            type="text"
                            placeholder="Audited Financial Statements"
                            className="year-input"
                            value={item.firstTable}
                            onChange={(e) =>
                                handleChange(index, "firstTable", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Second Table Data</label>
                        <input
                            type="text"
                            placeholder="Red Rotopack Pvt. Ptd. - Audited Account 31 March , 2022"
                            className="year-input"
                            value={item.secondTable}
                            onChange={(e) =>
                                handleChange(index, "secondTable", e.target.value)
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
                                    handleFileChange(index, e.target.files[0])
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
                    onClick={addFinancial}
                >
                    + Add more Subsidiary Financial
                </button>
            </div>

        </div>
    );
};

export default SubsidiaryFinancial;
