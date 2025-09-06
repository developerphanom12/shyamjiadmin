import '../pages/Contact.css';

const ContactFormCard = () => {
  return (
    <div className="contact-card">
      <h2 className="card-title">Contact Us</h2>
      <p className="card-subtitle">Enter product details and expand your inventory.</p>

      <form className="contact-form">
        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>Head Office</label>
            <input type="text" placeholder="Write Head Office Address" />
          </div>
          <div className="form-group">
            <label>Branch Office - 1</label>
            <input type="text" placeholder="Write Branch Office - 1 Address" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter Email" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter Phone Number" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group">
            <label>Secondary Phone Number</label>
            <input type="text" placeholder="Enter Phone Number" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactFormCard;
