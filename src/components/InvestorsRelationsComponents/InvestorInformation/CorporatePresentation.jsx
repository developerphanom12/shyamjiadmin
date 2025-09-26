import React, { useState, useEffect } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";

const data = [
  {
    title: "Corporate Presentation",
    file: "#"
  },
  {
    title: "Corporate Presentation",
    file: "#"
  },
  {
    title: "Corporate Presentation",
    file: "#"
  },
  

]


const CorporatePresentation = () => {
  const [showAddModel, setShowModel] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    file: null,
  });
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    file: Yup.mixed()
      .required("File is required")
      .test(
        "fileFormat",
        "Only PDF allowed",
        (value) => !value || (value && value.type === "application/pdf")
      ),
  });
  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    setShowModel(false);
  };
  
  return (
    <>
      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add Presentation</h4>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-[#F4F4F4] text-left font-semibold">
                <th className="px-4 py-2 border-b border-gray-300">Title</th>
                <th className="px-4 py-2 border-b border-x border-gray-300">Download</th>
                <th className="px-4 py-2 border-b border-x border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, yIdx) => (
                <tr
                  key={yIdx}
                  className={yIdx % 2 === 0 ? "bg-white" : "bg-[#F4F4F4]"}
                >
                  <td className="p-2 border border-gray-300">
                    {data.title}
                  </td>
                  <td className="p-2 border border-gray-300  hover:text-blue-600 hover:underline cursor-pointer">
                    <div className="px-6  flex justify-center">
                      <a
                        href={data.file}
                        className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                        download
                      >
                        Download <FaDownload className="text-xs" />
                      </a>
                    </div>
                  </td>
                  <td className="p-2 border border-gray-300">
                    <div className="px-6  flex justify-center">
                      <button className="hover:text-blue-600">
                        <FaEdit />
                      </button>
                      <button className="hover:text-red-600">
                        <MdDelete />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {
        showAddModel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white w-[90%] max-h-[80vh] max-w-6xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-3">
                <h2 className="text-2xl font-bold text-gray-800">Add Report</h2>
                <button
                  onClick={() => setShowModel(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <FiX size={22} className="text-gray-600" />
                </button>
              </div>

              {/* Form */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }) => (
                  <Form style={{ flexDirection: "column" }} className="flex  gap-5">


                    {/* Title */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Title</label>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* File Upload */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Upload File (PDF)
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(event) =>
                          setFieldValue("file", event.currentTarget.files[0])
                        }
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="file"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )
      }

    </>
  )
}

export default CorporatePresentation
