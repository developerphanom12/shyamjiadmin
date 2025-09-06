import './Contact.css';
import { useNavigate } from 'react-router-dom';
import ContactFormCard from '../components/ContactFormCard';

const AddContact = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/contact');
    };

    const handleSave = () => {
        navigate('/contact');
    };

    return (
        <div className="contact-page">
            {/* Header */}
            <div className="contact-header">
                <h2 className="contact-title">Contact Us</h2>
                <div className="handel-buttons">
                    <button onClick={handleCancel} className="cancel-button">Cancel</button>
                    <button onClick={handleSave} className="save-button">Save</button>
                </div>
            </div>
            {/* Contact Form Card */}
            <ContactFormCard />
        </div>
    )
}

export default AddContact