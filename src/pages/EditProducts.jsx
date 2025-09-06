import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddProduct.css";
import upload from "../assets/upload.svg";
import useProducts from "../hooks/products/useProducts";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProductById, productDetails, updateProduct } = useProducts();

  const [categories, setCategories] = useState(["Snacks", "Chips"]);

  // Yup schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    slang: Yup.string().required("Slang is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
    ingredient: Yup.string().required("Ingredient is required"),
    advantages: Yup.string().required("Advantages are required"),
    categories: Yup.string().required("Category is required"),
    colorCode: Yup.string().matches(
      /^#([0-9A-F]{3}){1,2}$/i,
      "Enter valid color code"
    ),
  });

  // fetch product details once
  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  // prepare initial values after productDetails comes
  const initialValues = {
    name: productDetails?.product_name || "",
    slang: productDetails?.product_slang || "",
    price: productDetails?.product_price || "",
    description: productDetails?.product_description || "",
    ingredient: productDetails?.product_ingredient || "",
    advantages: productDetails?.product_advantages || "",
    categories: productDetails?.product_category || "",
    colorCode: productDetails?.color_code || "",
    image: productDetails?.product_image || null, // file will go here
    previewImage: productDetails?.image_url || "", // just for preview
    rating: productDetails?.product_rating || 0,
    label: productDetails?.product_label || "best",
    isAddingCategory: false,
    newCategory: "",
  };

  // handle save with API integration
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("_method" , "PUT");
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

     // ✅ Only append image if it's a File (not just URL string)
  if (values.image && values.image instanceof File) {
    formData.append("product_image", values.image);
  }

    try {
      await updateProduct(id, formData);
      navigate("/products");
    } catch (err) {
      console.error("Error updating product:", err);
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
            Save
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
              <h3>Edit Product</h3>
              <p>Update Product Information.</p>

              {/* Label Row */}
              <div className="label-row">
                <span className="label-text">Product Label</span>
                <div className="label-buttons">
                  <span
                    className={`label-btn ${
                      values.label === "best" ? "active" : ""
                    }`}
                    onClick={() => setFieldValue("label", "best")}
                  >
                    BEST
                  </span>
                  <span
                    className={`label-btn ${
                      values.label === "new" ? "active" : ""
                    }`}
                    onClick={() => setFieldValue("label", "new")}
                  >
                    NEW
                  </span>
                </div>
              </div>

              {/* Image + Rating + Upload */}
              <div className="image-rating-upload">
                <div className="product-image">
                  {values.previewImage ? (
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
                        className={
                          star <= values.rating ? "star filled" : "star"
                        }
                        onClick={() => setFieldValue("rating", star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <label>Update Image</label>
                  <div className="product-upload-input">
                    <span>Upload File</span>
                    <img
                      src={upload}
                      alt="Upload"
                      className="product-upload-icon"
                    />
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFieldValue("image", file); // keep actual file
                          setFieldValue(
                            "previewImage",
                            URL.createObjectURL(file) // preview only
                          );
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
                      onChange={(e) =>
                        setFieldValue("newCategory", e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          values.newCategory.trim() !== ""
                        ) {
                          setCategories([
                            ...categories,
                            values.newCategory.trim(),
                          ]);
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
                  <ErrorMessage
                    name="categories"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Product Name */}
                <div className="form-field">
                  <label>Product Name</label>
                  <Field type="text" name="name" placeholder="Write Product Name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Product Slang */}
                <div className="form-field">
                  <label>Product Slang</label>
                  <Field type="text" name="slang" placeholder="Write Product Slang" />
                  <ErrorMessage
                    name="slang"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Price */}
                <div className="form-field">
                  <label>Select Price</label>
                  <Field type="text" name="price" placeholder="Write Product Price 5/10/20" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Description */}
                <div className="form-field">
                  <label>Description</label>
                  <Field as="textarea" name="description" placeholder="Write Description" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Ingredient */}
                <div className="form-field">
                  <label>Ingredient</label>
                  <Field type="text" name="ingredient" placeholder="Write Ingredient" />
                  <ErrorMessage
                    name="ingredient"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Advantages */}
                <div className="form-field">
                  <label>Advantages</label>
                  <Field
                    type="text"
                    name="advantages"
                    placeholder="Write Comma Separated Advantages"
                  />
                  <ErrorMessage
                    name="advantages"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Color Code */}
                <div className="form-field full-width">
                  <label>Color Code</label>
                  <Field type="text" name="colorCode" placeholder="Write Color code #ffffff" />
                  <ErrorMessage
                    name="colorCode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProduct;
