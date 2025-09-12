import './Contact.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useContact from '../hooks/contacts/useContact';

const Contact = () => {
  const navigate = useNavigate();
  const { fetchContactDetails, contactDetails } = useContact();

  // Fetch API
  useEffect(() => {
    fetchContactDetails();
  }, []);

  const handleEdit = () => {
    navigate('/contact/add-contact');
  };

  if (!contactDetails) return <p>Loading...</p>;

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <h2 className="contact-title">Welcome Back, Admin!</h2>
        <button className="contact-button" onClick={handleEdit}>Edit</button>
      </div>

      {/* Contact Form Card */}
      <div className="contact-card">
        <h2 className="card-title">Contact Us</h2>
        <p className="card-subtitle">View your saved contact information.</p>

        <Formik
          enableReinitialize
          initialValues={{
            headOffice: contactDetails.head_office_address || "",
            branchOffice1: contactDetails.branch_one_address || "",
            email: contactDetails.email || "",
            phone: contactDetails.phone || "",
            secondaryPhone: contactDetails.secondary_phone || "",
          }}
          onSubmit={() => {}} // no submit, just display
        >
          {() => (
            <Form className="contact-form">
              {/* Row 1 */}
              <div className="form-row">
                <div className="form-group">
                  <label>Head Office</label>
                  <Field name="headOffice" type="text" readOnly />
                </div>
                <div className="form-group">
                  <label>Branch Office - 1</label>
                  <Field name="branchOffice1" type="text" readOnly />
                </div>
              </div>

              {/* Row 2 */}
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <Field name="email" type="email" readOnly />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <Field name="phone" type="text" readOnly />
                </div>
              </div>

              {/* Row 3 */}
              <div className="form-row">
                <div className="form-group">
                  <label>Secondary Phone Number</label>
                  <Field name="secondaryPhone" type="text" readOnly />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
