import { useState } from "react";
import patternBg from "../../assets/pattern-bg.png";
import uploadIcon from "../../assets/upload.svg";
import "./QuarterlyResultsForm.css";

const NewspaperPublication = () => {
  const publicationTemplate = {
    englishFinancial: { mainText: "", text: "", file: null },
    englishNotice: { mainText: "", text: "", file: null },
    hindiFinancial: { mainText: "", text: "", file: null },
    hindiNotice: { mainText: "", text: "", file: null }
  };

  const [publications, setPublications] = useState([publicationTemplate]);

  const handleChange = (index, section, field, value) => {
    const updated = [...publications];
    updated[index][section][field] = value;
    setPublications(updated);
  };

  const handleFileChange = (index, section, file) => {
    const updated = [...publications];
    updated[index][section].file = file;
    setPublications(updated);
  };

  const addPublication = () => {
    setPublications([...publications, { ...publicationTemplate }]);
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
        <span>Newspaper Publication</span>
      </div>

      {publications.map((pub, idx) => (
        <div key={idx}>
          {/* English Publication - Financial Results */}
          <h2 className="news-heading">
            English Publication - Financial Results
          </h2>
          <div className="form-field">
            <label className="form-label">Main Text</label>
            <input
              type="text"
              placeholder="English Publication - Financial Results"
              value={pub.englishFinancial.mainText}
              onChange={(e) =>
                handleChange(idx, "englishFinancial", "mainText", e.target.value)
              }
              className="year-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Text</label>
            <input
              type="text"
              placeholder="Free Press Mumbai 30.06.2025"
              value={pub.englishFinancial.text}
              onChange={(e) =>
                handleChange(idx, "englishFinancial", "text", e.target.value)
              }
              className="year-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Action</label>
            <div className="annual-upload-input">
              <span>Upload File</span>
              <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange(idx, "englishFinancial", e.target.files[0])
                }
              />
            </div>
          </div>

          {/* English Publication - Notice To Shareholders */}
          <h2 className="news-heading">
            English Publication - Notice To Shareholders
          </h2>
          <div className="form-field">
            <label className="form-label">Main Text</label>
            <input
              type="text"
              placeholder="English Publication - Notice To Shareholders"
              value={pub.englishNotice.mainText}
              onChange={(e) =>
                handleChange(idx, "englishNotice", "mainText", e.target.value)
              }
              className="year-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Text</label>
            <input
              type="text"
              placeholder="Free Press Indore Notice..."
              value={pub.englishNotice.text}
              onChange={(e) =>
                handleChange(idx, "englishNotice", "text", e.target.value)
              }
              className="year-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Action</label>
            <div className="annual-upload-input">
              <span>Upload File</span>
              <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange(idx, "englishNotice", e.target.files[0])
                }
              />
            </div>
          </div>

          {/* Hindi Publication - Financial Results */}
          <h2 className="news-heading">Hindi Publication - Financial Results</h2>
          <div className="form-field">
            <label className="form-label">Main Text</label>
            <input
              type="text"
              placeholder="Hindi Publication - Financial Results"
              value={pub.hindiFinancial.mainText}
              onChange={(e) =>
                handleChange(idx, "hindiFinancial", "mainText", e.target.value)
              }
              className="year-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Text</label>
            <input
              type="text"
              placeholder="Free Press Mumbai 30.06.2025"
              value={pub.hindiFinancial.text}
              onChange={(e) =>
                handleChange(idx, "hindiFinancial", "text", e.target.value)
              }
              className="year-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Action</label>
            <div className="annual-upload-input">
              <span>Upload File</span>
              <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange(idx, "hindiFinancial", e.target.files[0])
                }
              />
            </div>
          </div>

          {/* Hindi Publication - Notice To Shareholders */}
          <h2 className="news-heading">
            Hindi Publication - Notice To Shareholders
          </h2>
          <div className="form-field">
            <label className="form-label">Main Text</label>
            <input
              type="text"
              placeholder="Hindi Publication - Notice To Shareholders"
              value={pub.hindiNotice.mainText}
              onChange={(e) =>
                handleChange(idx, "hindiNotice", "mainText", e.target.value)
              }
              className="year-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Text</label>
            <input
              type="text"
              placeholder="Peoples Samachar Indore Notice..."
              value={pub.hindiNotice.text}
              onChange={(e) =>
                handleChange(idx, "hindiNotice", "text", e.target.value)
              }
              className="year-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Action</label>
            <div className="annual-upload-input">
              <span>Upload File</span>
              <img src={uploadIcon} alt="Upload Icon" className="annual-upload-icon" />
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange(idx, "hindiNotice", e.target.files[0])
                }
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add More Button */}
      <div className="quater-btn-div">
        <button
          type="button"
          className="add-quater-btn"
          onClick={addPublication}
        >
          + Add more Publication
        </button>
      </div>

    </div>
  );
};

export default NewspaperPublication;
