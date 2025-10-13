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
  const { fetchProductById, productDetails, updateProduct, fetchCategories, categories, setCategories } = useProducts();

  // const [categories, setCategories] = useState(["Snacks", "Chips"]);
  useEffect(() => {
    fetchCategories();
  }, []);

  // Yup schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    // slang: Yup.string().required("Slang is required"),
    price: Yup.string()
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
    image: productDetails?.product_image || null,
    previewImage: productDetails?.image_url || "",
    rating: productDetails?.product_rating || 0,
    label: productDetails?.product_label || "none",
    isAddingCategory: false,
    newCategory: "",
    leftBgImage: null,
    rightBgImage: null,
    leftFooterImage: null,
    rightFooterImage: null,
    leftBgImagePreview: productDetails?.left_bg_image_url || "",
    rightBgImagePreview: productDetails?.right_bg_image_url || "",
    leftFooterImagePreview: productDetails?.left_footer_image_url || "",
    rightFooterImagePreview: productDetails?.right_footer_image_url || "",
  };

  // handle save with API integration
  // const handleSubmit = async (values) => {
  //   const formData = new FormData();
  //   formData.append("_method" , "PUT");
  //   formData.append("product_name", values.name);
  //   formData.append("product_slang", values.slang);
  //   formData.append("product_price", values.price);
  //   formData.append("product_description", values.description);
  //   formData.append("product_ingredient", values.ingredient);
  //   formData.append("product_advantages", values.advantages);
  //   formData.append("product_category", values.categories);
  //   formData.append("color_code", values.colorCode);
  //   formData.append("product_rating", values.rating);
  //   formData.append("product_label", values.label);

  //    // ✅ Only append image if it's a File (not just URL string)
  // if (values.image && values.image instanceof File) {
  //   formData.append("product_image", values.image);
  // }

  //   try {
  //     await updateProduct(id, formData);
  //     navigate("/products");
  //   } catch (err) {
  //     console.error("Error updating product:", err);
  //   }
  // };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
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

    if (values.image && values.image instanceof File) {
      formData.append("product_image", values.image);
    }
    if (values.leftBgImage && values.leftBgImage instanceof File) {
      formData.append("left_bg_image", values.leftBgImage);
    }
    if (values.rightBgImage && values.rightBgImage instanceof File) {
      formData.append("right_bg_image", values.rightBgImage);
    }
    if (values.leftFooterImage && values.leftFooterImage instanceof File) {
      formData.append("left_footer_image", values.leftFooterImage);
    }
    if (values.rightFooterImage && values.rightFooterImage instanceof File) {
      formData.append("right_footer_image", values.rightFooterImage);
    }

    try {
      await updateProduct(id, formData);
      navigate("/products");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="p-5 sm:p-[20px] sm:pt-16">
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
                    className={`label-btn ${values.label === "none" ? "active" : ""
                      }`}
                    onClick={() => setFieldValue("label", "none")}
                  >
                    NONE
                  </span>
                  <span
                    className={`label-btn ${values.label === "best" ? "active" : ""
                      }`}
                    onClick={() => setFieldValue("label", "best")}
                  >
                    BEST
                  </span>
                  <span
                    className={`label-btn ${values.label === "new" ? "active" : ""
                      }`}
                    onClick={() => setFieldValue("label", "new")}
                  >
                    NEW
                  </span>
                  <span
                    className={`label-btn ${values.label === "upcoming" ? "active" : ""
                      }`}
                    onClick={() => setFieldValue("label", "upcoming")}
                  >
                    UPCOMING
                  </span>
                  <span
                    className={`label-btn ${values.label === "popular" ? "active" : ""
                      }`}
                    onClick={() => setFieldValue("label", "popular")}
                  >
                    POPULAR
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

                <div className="form-field">
                  <label>Left BG Image</label>
                  {values.leftBgImagePreview ? (
                    <div>
                      <img src={values.leftBgImagePreview} alt="Left BG" style={{ width: 80, height: 80 }} />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                          onClick={() => {
                            // Open file input dialog manually
                            document.getElementById("leftBgImageInput").click();
                          }}
                        >
                          Replace File
                        </button>
                        {/* <button
                          type="button"
                          className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                          onClick={() => {
                            setFieldValue("leftBgImage", null);
                            setFieldValue("leftBgImagePreview", "");
                          }}
                        >
                          Remove Image
                        </button> */}
                      </div>
                      {/* Hidden file input for replace */}
                      <input
                        id="leftBgImageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("leftBgImage", file);
                            setFieldValue("leftBgImagePreview", URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("leftBgImage", file);
                            setFieldValue("leftBgImagePreview", URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="form-field">
                  <label>Right BG Image</label>
                  {values.rightBgImagePreview ? (
                    <div>
                      <img src={values.rightBgImagePreview} alt="Left BG" style={{ width: 80, height: 80 }} />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                          onClick={() => {
                            // Open file input dialog manually
                            document.getElementById("rightBgImageInput").click();
                          }}
                        >
                          Replace File
                        </button>
                        {/* <button
                          type="button"
                          className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                          onClick={() => {
                            setFieldValue("rightBgImage", null);
                            setFieldValue("rightBgImagePreview", "");
                          }}
                        >
                          Remove Image
                        </button> */}
                      </div>
                      {/* Hidden file input for replace */}
                      <input
                        id="rightBgImageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("rightBgImage", file);
                            setFieldValue("rightBgImagePreview", URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("rightBgImage", file);
                            setFieldValue("rightBgImagePreview", URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="form-field">
                  <label>Left Footer Image</label>
                  {values.leftFooterImagePreview ? (
                    <div>
                      <img src={values.leftFooterImagePreview} alt="Left Footer" style={{ width: 80, height: 80 }} />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                          onClick={() => {
                            document.getElementById("leftFooterImageInput").click();
                          }}
                        >
                          Replace File
                        </button>
                        {/* <button
                          type="button"
                          className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                          onClick={() => {
                            setFieldValue("leftFooterImage", null);
                            setFieldValue("leftFooterImagePreview", "");
                          }}
                        >
                          Remove Image
                        </button> */}
                      </div>
                      <input
                        id="leftFooterImageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("leftFooterImage", file);
                            setFieldValue("leftFooterImagePreview", URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("leftFooterImage", file);
                            setFieldValue("leftFooterImagePreview", URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="form-field">
                  <label>Right Footer Image</label>
                  {values.rightFooterImagePreview ? (
                    <div>
                      <img src={values.rightFooterImagePreview} alt="Right Footer" style={{ width: 80, height: 80 }} />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                          onClick={() => {
                            document.getElementById("rightFooterImageInput").click();
                          }}
                        >
                          Replace File
                        </button>
                        {/* <button
                          type="button"
                          className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                          onClick={() => {
                            setFieldValue("rightFooterImage", null);
                            setFieldValue("rightFooterImagePreview", "");
                          }}
                        >
                          Remove Image
                        </button> */}
                      </div>
                      <input
                        id="rightFooterImageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("rightFooterImage", file);
                            setFieldValue("rightFooterImagePreview", URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("rightFooterImage", file);
                            setFieldValue("rightFooterImagePreview", URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  )}
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
