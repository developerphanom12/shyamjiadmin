import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaDownload, FaEdit } from "react-icons/fa";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


const SubsidiaryFinancial = () => {
  const [showAddModel, setShowModel] = useState(false)
  const subsidiaryData = [
    {
      company: "Red Rotopack Pvt. Ltd. - 31st March, 2022",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          file: "#"
        }
      ]
    },
    {
      company: "Avadh Snacks Pvt. Ltd. - 31st March, 2022",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Avadh Snacks Pvt. Ltd - Audited Standalone Accounts 31st March, 2022",
          file: "#"
        }
      ]
    },
    {
      company: "Avadh Snacks Pvt. Ltd. - 31st March, 2021",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Avadh Snacks Pvt. Ltd - Audited Standalone Accounts 31st March, 2021",
          file: "#"
        }
      ]
    },
    {
      company: "Red Rotopack Pvt. Ltd. - 31st March, 2021",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2021",
          file: "#"
        }
      ]
    },
    {
      company: "Avadh Snacks Pvt. Ltd. - 31st March, 2020",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Avadh Snacks Pvt. Ltd - Audited Standalone Accounts 31st March, 2020",
          file: "#"
        }
      ]
    }
  ];

  const validationSchema = Yup.object({
    year: Yup.string().required("Year is required"),
    title: Yup.string().required("Title is required"),
    reports: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required("Report type is required"),
        description: Yup.string().required("description is required"),
        file: Yup.mixed()
          .required("File is required")
          .test(
            "fileFormat",
            "Only PDF allowed",
            (value) => !value || (value && value.type === "application/pdf")
          ),
      })
    ),
  });

  // const years = ["2025-26", "2024-25", "2023-24", "2022-23"];
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 20; i++) {
      const start = currentYear - i;
      const end = (start + 1).toString().slice(-2);
      years.push(`${start}-${end}`);
    }
    return years;
  };

  const years = generateYears();


  const initialValues = {
    year: "",
    title: "",
    reports: [{ type: "", description: "", file: null }],
  };

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    setShowModel(false);
  };

  return (
    <>
      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add </h4>
      </div>

      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

          {subsidiaryData.map((subsidiary, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">

              {/* Company Header */}
              <div className="bg-[#F7BF57] px-6 py-2">
                <h3 className="font-semibold text-black text-lg">
                  {subsidiary.company}
                </h3>
              </div>

              {/* Reports Table */}
              {/* Reports Table */}
              <div className="bg-white overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  {/* Table Head */}
                  <thead className="bg-[#F4F4F4]">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-gray-700 text-left border-b border-gray-300">
                        Report Type
                      </th>
                      <th className="px-6 py-3 font-semibold text-gray-700 text-left border-b border-gray-300 border-l ">
                        Description
                      </th>
                      <th className="px-6 py-3 font-semibold text-gray-700 text-center border-b  border-l border-gray-300">
                        Download
                      </th>
                      <th className="px-6 py-3 font-semibold text-gray-700 text-center border-b  border-l border-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {subsidiary.reports.map((report, rIndex) => (
                      <tr
                        key={rIndex}
                        className={rIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
                      >
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {report.type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 border-l border-gray-300">
                          {report.description}
                        </td>
                        <td className="px-6 py-4 text-center border-l border-gray-300">
                          <a
                            href={report.file}
                            className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                            download
                          >
                            Download <FaDownload className="text-xs" />
                          </a>
                        </td>
                        {/* Actions */}
                        <td className="px-4 py-2 border-l border-gray-200">
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
          ))}
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
                    {/* Year */}
                    {/* <div>
                      <label className="block mb-1 font-medium text-gray-700">Year</label>
                      <Field
                        as="select"
                        name="year"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      >
                        <option value="">Select Year</option>
                        {years.map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="year"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div> */}

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



                    {/* Reports */}
                    <FieldArray name="reports">
                      {({ push, remove }) => (
                        <div style={{ flexDirection: "column" }} className="flex flex-col gap-4">
                          {values.reports.map((_, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                            >
                              {/* Report Type */}
                              <div className="mb-3">
                                <label className="block mb-1 font-medium text-gray-700">
                                  Report Type
                                </label>
                                <Field
                                  type="text"
                                  name={`reports.${index}.type`}
                                  placeholder="Report Type"
                                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage
                                  name={`reports.${index}.type`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>

                              {/* Description */}
                              <div>
                                <label className="block mb-1 font-medium text-gray-700">Description</label>
                                <Field
                                  type=""
                                  name="description"
                                  placeholder="Enter description"
                                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage
                                  name="description"
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
                                  // accept="application/pdf"
                                  onChange={(event) =>
                                    setFieldValue(
                                      `reports.${index}.file`,
                                      event.currentTarget.files[0]
                                    )
                                  }
                                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage
                                  name={`reports.${index}.file`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>

                              {/* Remove Button */}
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}
                          {/* Add More */}
                          <button
                            type="button"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium w-fit "
                            onClick={() => push({ type: "", file: null })}
                          >
                            + Add More
                          </button>

                        </div>
                      )}
                    </FieldArray>

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

export default SubsidiaryFinancial;
