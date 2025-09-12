import './Contact.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import useContact from '../hooks/contacts/useContact';

const AddContact = () => {
    const navigate = useNavigate();
    const { fetchContactDetails, contactDetails , UpdateContact } = useContact();
    useEffect(() => {
        fetchContactDetails();
    }, []);
    const handleCancel = () => {
        navigate('/contact');
    };

    // Yup validation
    const validationSchema = Yup.object({
        headOffice: Yup.string().required("Head office address is required"),
        branchOffice1: Yup.string().required("Branch office address is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().required("Phone number is required"),
        secondaryPhone: Yup.string(),
    });

    // Initial values
    const initialValues = {
        headOffice: contactDetails.head_office_address || "",
        branchOffice1: contactDetails.branch_one_address || "",
        email: contactDetails.email || "",
        phone: contactDetails.phone || "",
        secondaryPhone: contactDetails.secondary_phone || "",
    };

    // Handle save (API integration here)
const handleSave = async (values) => {
  console.log("Submitted values:", values);

  const payload = {
    head_office_address: values.headOffice,
    branch_one_address: values.branchOffice1,
    email: values.email,
    phone: values.phone,
    secondary_phone: values.secondaryPhone,
  };

  try {
    await UpdateContact(payload); // pass object directly
    navigate('/contact');
  } catch (error) {
    console.error("Error saving contact:", error);
  }
};


    return (
        <div className="contact-page">
            {/* Header */}
            <div className="contact-header">
                <h2 className="contact-title">Contact Us</h2>
                <div className="handel-buttons">
                    <button onClick={handleCancel} className="cancel-button">Cancel</button>
                    <button type="submit" form="contactForm" className="save-button">Save</button>
                </div>
            </div>

            {/* Contact Form Card */}
            <div className="contact-card">
                <h2 className="card-title">Update Details</h2>
                <p className="card-subtitle">Enter contact details and save them.</p>

                <Formik
                    initialValues={initialValues}
                    //   validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {() => (
                        <Form id="contactForm" className="contact-form">
                            {/* Row 1 */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Head Office</label>
                                    <Field type="text" name="headOffice" placeholder="Write Head Office Address" />
                                    <ErrorMessage name="headOffice" component="div" className="error" />
                                </div>
                                <div className="form-group">
                                    <label>Branch Office - 1</label>
                                    <Field type="text" name="branchOffice1" placeholder="Write Branch Office - 1 Address" />
                                    <ErrorMessage name="branchOffice1" component="div" className="error" />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field type="email" name="email" placeholder="Enter Email" />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <Field type="text" name="phone" placeholder="Enter Phone Number" />
                                    <ErrorMessage name="phone" component="div" className="error" />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Secondary Phone Number</label>
                                    <Field type="text" name="secondaryPhone" placeholder="Enter Phone Number" />
                                    <ErrorMessage name="secondaryPhone" component="div" className="error" />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddContact;
