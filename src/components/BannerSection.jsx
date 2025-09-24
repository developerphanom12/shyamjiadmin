import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import upload from "../assets/upload.svg";
import useBanner from "../hooks/banner/useBanner";

const BannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  image: Yup.mixed().nullable(), // update pe image optional
});

const BannerSection = ({ heading, endpoint }) => {
  const { fetchBannerDetails, bannerDetails, updateBanner, loading } = useBanner(endpoint);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchBannerDetails();
  }, [endpoint]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold text-black mb-1">{heading}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Enter Product Details And Expand Your Inventory.
      </p>

      <Formik
        enableReinitialize
        initialValues={{
          title: bannerDetails?.title || "",
          image: null,
        }}
        validationSchema={BannerSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("title", values.title);
          if (values.image) formData.append("image", values.image);

          await updateBanner(formData);
          setSubmitting(false);
          resetForm({ values: { title: values.title, image: null } });
          setPreview(null);
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Title
              </label>
              <Field
                name="title"
                type="text"
                placeholder="Enter banner title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex items-center gap-3">
              <label className="relative flex items-center justify-between w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-500 text-sm bg-white cursor-pointer">
                <span>Upload File</span>
                <img src={upload} alt="Upload" className="w-5 h-5" />
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFieldValue("image", file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-[109px] h-[44px] border border-gray-400 rounded-lg text-sm font-medium hover:bg-gray-100"
              >
                {(isSubmitting || loading) ? "Updating..." : "Update File"}
              </button>
            </div>

            {(preview || bannerDetails?.image_url) && (
              <img
                src={preview || bannerDetails?.image_url}
                alt="Preview"
                className="w-[700px] h-[195px] mt-4 rounded-lg border border-gray-200 object-cover"
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BannerSection;
