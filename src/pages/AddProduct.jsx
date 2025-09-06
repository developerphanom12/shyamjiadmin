import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddProduct.css";
import dummyProducts from "../data/dummyProducts";
import upload from "../assets/upload.svg";
import useProducts from "../hooks/products/useProducts";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [categories, setCategories] = useState(["Snacks", "Chips"]);
  const [initialValues, setInitialValues] = useState({
    id: null,
    name: "",
    slang: "",
    price: "",
    description: "",
    ingredient: "",
    advantages: "",
    categories: "",
    colorCode: "",
    image: null,
    previewImage: "",
    rating: 0,
    label: "best",
    isAddingCategory: false,
    newCategory: "",
  });

  // Yup schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    slang: Yup.string().required("Slang is required"),
    price: Yup.number().typeError("Price must be a number").required("Price is required"),
    description: Yup.string().required("Description is required"),
    ingredient: Yup.string().required("Ingredient is required"),
    advantages: Yup.string().required("Advantages are required"),
    categories: Yup.string().required("Category is required"),
    colorCode: Yup.string().matches(/^#([0-9A-F]{3}){1,2}$/i, "Enter valid color code").required("Color code is required"),
  });


  // handle save with API integration
  const handleSubmit = async (values) => {
    console.log("values", values);

    const formData = new FormData();
    formData.append("product_name", values.name);
    formData.append("product_slang", values.slang);
    formData.append("product_price", values.price);
    formData.append("product_description", values.description);
    formData.append("product_ingredient", values.ingredient);
    formData.append("product_advantages", values.advantages);
    formData.append("product_category", values.categories);
    formData.append("color_code", values.colorCode);
    formData.append("product_rating", values.rating);
    formData.append("product_label", values.label);

    if (values.image) {
      formData.append("product_image", values.image); // 
    }

    try {
      await addProduct(formData); // pass FormData to your API call
      // navigate("/products");
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  };


  return (
    <div className="add-product-container">
      {/* Header */}
      <div className="header">
        <h2>Product Management</h2>
        <div className="header-actions">
          <button onClick={() => navigate("/products")} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" form="productForm" className="save-btn">
            Add
          </button>
        </div>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form id="productForm">
            <div className="form-wrapper">
              <h3>Add Product</h3>
              <p>
                Enter Product Details And Expand Your Inventory.
              </p>

              {/* Label Row */}
              <div className="label-row">
                <span className="label-text">Product Label</span>
                <div className="label-buttons">
                  <span
                    className={`label-btn ${values.label === "best" ? "active" : ""}`}
                    onClick={() => setFieldValue("label", "best")}
                  >
                    BEST
                  </span>
                  <span
                    className={`label-btn ${values.label === "new" ? "active" : ""}`}
                    onClick={() => setFieldValue("label", "new")}
                  >
                    NEW
                  </span>
                </div>
              </div>

              {/* Image + Rating + Upload */}
              <div className="image-rating-upload">
                <div className="product-image">
                  {values.image ? (
                    <img src={values.previewImage} alt="Product" />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                </div>

                <div className="right-side">
                  <label>Rating</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= values.rating ? "star filled" : "star"}
                        onClick={() => setFieldValue("rating", star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <label>Update Image</label>
                  <div className="product-upload-input">
                    <span>Upload File</span>
                    <img src={upload} alt="Upload" className="product-upload-icon" />
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFieldValue("image", file);
                          setFieldValue("previewImage", URL.createObjectURL(file)); // सिर्फ preview के लिए
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="form-grid">
                {/* Categories */}
                <div className="form-field full-width">
                  <label>Categories</label>
                  {values.isAddingCategory ? (
                    <input
                      type="text"
                      placeholder="Enter new category and press Enter"
                      value={values.newCategory || ""}
                      onChange={(e) => setFieldValue("newCategory", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && values.newCategory.trim() !== "") {
                          setCategories([...categories, values.newCategory.trim()]);
                          setFieldValue("categories", values.newCategory.trim());
                          setFieldValue("newCategory", "");
                          setFieldValue("isAddingCategory", false);
                        }
                      }}
                      onBlur={() => {
                        setFieldValue("isAddingCategory", false);
                        setFieldValue("newCategory", "");
                      }}
                      autoFocus
                    />
                  ) : (
                    <Field
                      as="select"
                      name="categories"
                      onChange={(e) => {
                        if (e.target.value === "__add_more__") {
                          setFieldValue("isAddingCategory", true);
                        } else {
                          setFieldValue("categories", e.target.value);
                        }
                      }}
                    >
                      <option value="">Select Categories</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__add_more__"> Add More...</option>
                    </Field>
                  )}
                  <ErrorMessage name="categories" component="div" className="error" />
                </div>

                {/* Product Name */}
                <div className="form-field">
                  <label>Product Name</label>
                  <Field type="text" name="name" placeholder="Write Product Name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                {/* Product Slang */}
                <div className="form-field">
                  <label>Product Slang</label>
                  <Field type="text" name="slang" placeholder="Write Product Slang" />
                  <ErrorMessage name="slang" component="div" className="error" />
                </div>

                {/* Price */}
                <div className="form-field">
                  <label>Select Price</label>
                  <Field type="text" name="price" placeholder="Write Product Price 5/10/20" />
                  <ErrorMessage name="price" component="div" className="error" />
                </div>

                {/* Description */}
                <div className="form-field">
                  <label>Description</label>
                  <Field as="textarea" name="description" placeholder="Write Description" />
                  <ErrorMessage name="description" component="div" className="error" />
                </div>

                {/* Ingredient */}
                <div className="form-field">
                  <label>Ingredient</label>
                  <Field type="text" name="ingredient" placeholder="Write Ingredient" />
                  <ErrorMessage name="ingredient" component="div" className="error" />
                </div>

                {/* Advantages */}
                <div className="form-field">
                  <label>Advantages</label>
                  <Field
                    type="text"
                    name="advantages"
                    placeholder="Write Comma Separated Advantages"
                  />
                  <ErrorMessage name="advantages" component="div" className="error" />
                </div>

                {/* Color Code */}
                {/* Color Code */}
                <div className="form-field full-width">
                  <div className="flex">
                    <label>Color Code</label>
                    {/* Color Preview Box */}
                    <div
                      className=""
                      style={{
                        backgroundColor: values.colorCode || "#fff",
                        height: "15px",
                        width: "15px"
                      }}
                    ></div>
                  </div>

                  <Field
                    type="text"
                    name="colorCode"
                    placeholder="Write Color code #ffffff"
                  />
                  <ErrorMessage name="colorCode" component="div" className="error" />
                </div>

              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
