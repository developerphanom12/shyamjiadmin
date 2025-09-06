import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import './AddBlog.css';
import upload from '../assets/upload.svg';
import dummyBlogs from '../data/dummyBlogs';
import { Editor } from '@tinymce/tinymce-react';
import useBlogs from '../hooks/blogs/useBlogs';

const EditBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { fetchBlogById, blogDetails, updateBlog } = useBlogs();

     useEffect(() => {
        fetchBlogById(id);
    }, [id]);

  const validationSchema = Yup.object({
    mainTitle: Yup.string().required('Title is required'),
    shortDescription: Yup.string().required('Short Description is required'),
    description: Yup.string().required('Description is required'),
    faqs: Yup.array().of(
      Yup.object({
        question: Yup.string().required('Question is required'),
        answer: Yup.string().required('Answer is required'),
      })
    ),
  });

  const initialValues = {
    image: null,
    preview: blogDetails?.image_url || '',
    mainTitle: blogDetails?.blog_title || '',
    shortDescription: blogDetails?.blog_shortDescription || '',
    description: blogDetails?.blog_description || '',
    faqs:  blogDetails?.faqs || [{ question: '', answer: '' }],
  }
 

  const handleCancel = () => {
    navigate('/blogs');
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("blog_title", values.mainTitle);
    formData.append("blog_shortDescription", values.shortDescription);
    formData.append("blog_description", values.description);
    if (values.image && values.image instanceof File) {
      formData.append("blog_image", values.image);
    }

    values.faqs.forEach((faq, index) => {
    formData.append(`faqs[${index}][question]`, faq.question);
    formData.append(`faqs[${index}][answer]`, faq.answer);
  });
    try {
      await updateBlog(id, formData); // pass FormData to your API call
      // navigate("/blogs");
    } catch (err) {
      console.error("Error uploading blog:", err);
    }
  };


  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="add-blog-container">
      {/* Header */}
      <div className="header">
        <h2>Blog Management</h2>
        <div className="header-actions">
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" form="blogForm" className="save-btn">Update</button>
        </div>
      </div>

      {/* Form */}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form id="blogForm" className="form-wrapper">
            <h3>Edit Blog</h3>
            <p>Update Blog Details To Keep Content Fresh.</p>

            {/* Upload Image */}
            <div className="form-group file-upload-group">
              <label>Update Image</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFieldValue('image', file);
                      setFieldValue('preview', URL.createObjectURL(file));
                    }
                  }}
                />
                <span>{values.image?.name || 'Update File'}</span>
                <img src={upload} alt="Upload Icon" className="upload-icon" />
              </div>
              {values.preview && (
                <div className="image-preview">
                  <img src={values.preview} alt="Preview" />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="form-group">
              <label>Title</label>
              <Field type="text" name="mainTitle" placeholder="Write Title" />
              <ErrorMessage name="mainTitle" component="div" className="error" />
            </div>

            {/* Short Description */}
            <div className="form-group">
              <label>Short Description</label>
              <Field type="text" name="shortDescription" placeholder="Write Description" />
              <ErrorMessage name="shortDescription" component="div" className="error" />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <Editor
                apiKey="lvrlrcqjgu0x83amssn032svvfj3cof1640bfseih7p0w7a5"
                value={values.description}
                init={{
                  height: 400,
                  menubar: false,
                  statusbar: false,
                  plugins: [
                    'advlist autolink lists link image charmap preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic underline forecolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={(content) => setFieldValue('description', content)}
              />
              <ErrorMessage name="description" component="div" className="error" />
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h4>FAQ</h4>
              <FieldArray name="faqs">
                {({ push, remove }) => (
                  <>
                    {values.faqs.map((faq, index) => (
                      <div key={index} className="form-row">
                        <div className="form-group">
                          <label>Question {index + 1}</label>
                          <Field
                            type="text"
                            name={`faqs[${index}].question`}
                            placeholder="Write FAQ Question"
                          />
                          <ErrorMessage
                            name={`faqs[${index}].question`}
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="form-group">
                          <label>Answer</label>
                          <Field
                            type="text"
                            name={`faqs[${index}].answer`}
                            placeholder="Write FAQ Answer"
                          />
                          <ErrorMessage
                            name={`faqs[${index}].answer`}
                            component="div"
                            className="error"
                          />
                        </div>
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-faq-btn"
                      onClick={() => push({ question: '', answer: '' })}
                    >
                      + Add FAQ Question
                    </button>
                  </>
                )}
              </FieldArray>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditBlog;
