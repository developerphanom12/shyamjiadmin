import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaDownload, FaEdit } from "react-icons/fa";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import useFinancials from "../../../hooks/invester/financials/useFinancials";

const QuarterlyResults = () => {
  const [data, setData] = useState([]);
  const [openYear, setOpenYear] = useState(null);
  const [showAddModel, setShowModel] = useState(false)
  const { fetchQuarterResult, quarterResult, loading, addQuarterResult } = useFinancials()

  // Dummy API call
  useEffect(() => {

    setData([
      {
        year: "2025-26",
        results: [
          {
            title: "Results for Quarter and Nine Months ended 31st December, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter and Half Year ended 30th September, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter ended 30th June, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter ended 31st March, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          }


        ]
      },
      {
        year: "2024-25",
        results: []
      },
      {
        year: "2023-24",
        results: []
      },
      {
        year: "2022-23",
        results: [
          {
            title: "Results for Quarter and Nine Months ended 31st December, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter and Half Year ended 30th September, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter ended 30th June, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter ended 31st March, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          }


        ]
      },
      {
        year: "2021-22",
        results: []
      },
      {
        year: "2020-21",
        results: []
      },
      {
        year: "2019-20",
        results: []
      },
      {
        year: "2018-19",
        results: []
      },
      {
        year: "2017-18",
        results: []
      }
    ]);
  }, []);

  useEffect(() => {
    fetchQuarterResult()
  }, [])

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  const validationSchema = Yup.object({
    year: Yup.string().required("Year is required"),
    title: Yup.string().required("Title is required"),
    reports: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required("Report type is required"),
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
    reports: [{ type: "", file: null }],
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("year", values.year);
    formData.append("title", values.title);
    values.reports.forEach((report, index) => {
      formData.append(`reports[${index}][type]`, report.type);
      formData.append(`reports[${index}][file]`, report.file);
    });
    console.log("Form Data:", formData);
    addQuarterResult(formData)
    setShowModel(false);
  };

  console.log("Quarter Result", quarterResult);



  return (
    <>
      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add Results</h4>
      </div>

      <div className="border border-gray-300">
        {/* Years List */}
        {data.map((yearData) => (
          <div key={yearData.year}>
            {/* Year Row */}
            <div
              className="flex justify-between items-center px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleYear(yearData.year)}
            >
              <span>{yearData.year}</span>
              {openYear === yearData.year ? <FaMinus /> : <FaPlus />}
            </div>

            {/* Dropdown Content */}
            {openYear === yearData.year && yearData.results.length > 0 && (
              <div className={`border-b border-gray-3000`}>
                {yearData.results.map((res, idx) => (
                  <div key={idx}>
                    {/* Subheading */}
                    <div className="bg-[#F7BF57] font-medium px-4 py-2">
                      {res.title}
                    </div>

                    {/* Table Wrapper */}
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 text-sm">
                        {/* Head */}
                        <thead>
                          <tr className="bg-[#F4F4F4] text-left font-semibold">
                            <th className="px-4 py-2 border-b border-gray-300">Report Type</th>
                            <th className="px-4 py-2 border-b border-gray-300">Download</th>
                            <th className="px-4 py-2 border-b border-gray-300">Actions</th>
                          </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                          {res.reports.map((report, rIdx) => (
                            <tr
                              key={rIdx}
                              className={rIdx % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"}
                            >
                              {/* Report Type */}
                              <td className="px-4 py-2 border-b border-gray-200">
                                {report.type}
                              </td>

                              {/* Download */}
                              <td className="px-4 py-2 border-b border-gray-200">
                                <a
                                  href={report.file}
                                  download
                                  className="bg-[#F7BF57] text-black px-3 py-1 rounded flex items-center gap-2 w-fit hover:bg-[#e5a93f]"
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
                ))}
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
                    <div>
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
                    </div>

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

export default QuarterlyResults;
