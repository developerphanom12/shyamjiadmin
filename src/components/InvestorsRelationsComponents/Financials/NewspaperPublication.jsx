import React, { useState } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";


const categories = [
  {
    title: "English Publications - Financial Results",
    reports: [
      { title: "Free press India 30.06.25", file: "#" },
      { title: "Free press India 31.12.24", file: "#" },
      { title: "Free press India 30.09.24", file: "#" },
      { title: "Free press India 30.06.24", file: "#" },
      { title: "Free press India 31.12.23", file: "#" },
      { title: "Free press India 30.09.23", file: "#" },
      { title: "Free press India 30.06.23", file: "#" },
    ]

  },
  {
    title: "Hindi Publications - Financial Results",
    reports: [
      { title: "Free press India 30.06.25", file: "#" },
      { title: "Free press India 31.12.24", file: "#" },
      { title: "Free press India 30.09.24", file: "#" },
      { title: "Free press India 30.06.24", file: "#" },
      { title: "Free press India 31.12.23", file: "#" },
      { title: "Free press India 30.09.23", file: "#" },
      { title: "Free press India 30.06.23", file: "#" },
    ]

  },
  {
    title: "English Publications - Notice to Shareholders",
    reports: [
      { title: "Free press India 30.06.25", file: "#" },
      { title: "Free press India 31.12.24", file: "#" },
      { title: "Free press India 30.09.24", file: "#" },
      { title: "Free press India 30.06.24", file: "#" },
    ]

  },
  {
    title: "Hindi Publications - Notice to Shareholders",
    reports: [
      { title: "Free press India 30.06.25", file: "#" },
      { title: "Free press India 31.12.24", file: "#" },
      { title: "Free press India 30.09.24", file: "#" },
      { title: "Free press India 30.06.24", file: "#" },
    ]

  }
]


const NewspaperPublication = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddModel, setShowModel] = useState(false)

  const initialValues = {
    title: "",
    newspaperName: "",
    date: "",
    file: null,
  }

  const toggleCategory = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add News </h4>
      </div>
      <div className="w-full">
        {categories.map((cat, idx) => (
          <div key={idx} className=" border border-gray-300">
            {/* Header Row */}
            <div
              onClick={() => toggleCategory(idx)}
              className="flex justify-between items-center bg-[#F4F4F4 px-4 py-3 cursor-pointer font-semibold hover:bg-gray-100"
            >
              <span>{cat.title}</span>
              {openIndex === idx ? <FaMinus /> : <FaPlus />}
            </div>

            {/* Dropdown Content */}
            {openIndex === idx && (
              <div className="w-full border border-gray-300 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 text-sm">
                    {/* Head */}
                    <thead>
                      <tr className="bg-[#F4F4F4] text-left font-semibold">
                        <th className="px-4 py-2 border-b border-gray-300">Title</th>
                        <th className="px-4 py-2 border-b border-gray-300">Download</th>
                        <th className="px-4 py-2 border-b border-gray-300">Actions</th>
                      </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                      {cat.reports.map((report, rIdx) => (
                        <tr
                          key={rIdx}
                          className={rIdx % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"}
                        >
                          {/* Report Title */}
                          <td className="px-4 py-2 border-b border-gray-200">
                            {report.title}
                          </td>

                          {/* Download */}
                          <td className="px-4 py-2 border-b border-gray-200">
                            <a
                              href={report.file}
                              download
                              className="bg-yellow-500 text-white px-4 py-1 rounded flex items-center gap-2 hover:bg-yellow-600 w-fit"
                            >
                              Download <FaDownload />
                            </a>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-2 border-b border-gray-200">
                            <div className="flex gap-3 text-lg text-gray-700">
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
            )}

          </div>
        ))}
      </div>


      {
        showAddModel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white w-[90%] max-h-[80vh] max-w-6xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-3">
                <h2 className="text-2xl font-bold text-gray-800">Add Newspaper Publication</h2>
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
  // validationSchema={validationSchema} 
  // onSubmit={handleSubmit}
>
  {({ setFieldValue }) => (
    <Form style={{flexDirection:"column"}} className="flex flex-col gap-5">
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

      {/* Newspaper Name */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Newspaper Name
        </label>
        <Field
          type="text"
          name="newspaperName"
          placeholder="Enter newspaper name"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
        />
        <ErrorMessage
          name="newspaperName"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Date</label>
        <Field
          type="date"
          name="date"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
        />
        <ErrorMessage
          name="date"
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
  );
};

export default NewspaperPublication;
