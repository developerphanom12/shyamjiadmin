import { useState } from "react";
import upload from "../assets/upload.svg";

const bannerList = [
    "Product List Page",
    "Our Process Page",
    "Shyam-G Blog Page",
    "Events Page",
    "Contact Us Page",
    "Investor Relations Page"
];

const Banner = () => {

    const [previews, setPreviews] = useState(Array(bannerList.length).fill(null));

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newPreviews = [...previews];
            newPreviews[index] = URL.createObjectURL(file);
            setPreviews(newPreviews);
        }
    };

    return (
        <div className="Supports-page">
            <h2 className="support-title">Welcome Back, Admin!</h2>

            {bannerList.map((title, index) => (
                <div className="contact-card" key={index} style={{ marginBottom: 20 }}>
                    <h2 className="card-title">{title} Banner</h2>
                    <p className="card-subtitle">
                        Enter Product Details And Expand Your Inventory.
                    </p>

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <label className="supports-upload-input" style={{ flex: 1 }}>
                            <span>Upload File</span>
                            <img src={upload} alt="Upload" className="supports-upload-icon" />
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, index)}
                                style={{ display: "none" }}
                            />
                        </label>
                        <button type="button" className="update-btn" style={{
                            width: "109px",
                            height: "44px",
                            borderRadius: "8px",
                            border: "1px solid #BAB9B5",
                        }}>
                            Update File
                        </button>
                    </div>

                    {previews[index] && (
                        <img
                            src={previews[index]}
                            alt="Preview"
                            style={{
                                width: "700px",
                                height: "195px",
                                marginTop: 10,
                                borderRadius: 8,
                                border: "1px solid #ddd"
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Banner;
