import './Supports.css';
// some styling get from contact.css
import upload from '../assets/upload.svg';

const Supports = () => {
    return (
        <div className="Supports-page">
            {/* Header */}
            <div className="support-header">
                <h2 className="support-title">Welcome Back, Admin</h2>
                <div className="supports-buttons">
                    <button className="cancel">Cancel</button>
                    <button className="send">Send</button>
                </div>
            </div>

            <div className="contact-card">
                <h2 className="card-title">Customer Support</h2>
                <p className="card-subtitle">Enter product details and expand your inventory.</p>

                <form className="contact-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="Please Enter Your Name" />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" placeholder="Write Subject" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Upload Attachment <span className="supports-required">*</span></label>
                            <div className="supports-upload-wrapper">
                                <div className="supports-upload-input">
                                    <span>Upload File</span>
                                    <img src={upload} alt="Upload Icon" className="supports-upload-icon" />
                                    <input type="file" />
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Supports;