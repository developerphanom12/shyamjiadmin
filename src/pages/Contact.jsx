import './Contact.css';
import { useNavigate } from 'react-router-dom';
import ContactFormCard from '../components/ContactFormCard';

const Contact = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/contact/add-contact');
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <h2 className="contact-title">Welcome Back, Admin!</h2>
        <button className="contact-button" onClick={handleEdit}>Edit</button>
      </div>
      {/* Contact Form Card */}
      <ContactFormCard />
    </div>
  );
};

export default Contact;
