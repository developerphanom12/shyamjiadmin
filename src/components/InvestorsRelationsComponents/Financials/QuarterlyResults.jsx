import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaDownload, FaEdit } from "react-icons/fa";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import useQuarterResult from "../../../hooks/invester/financials/useQuarterResult";

const QuarterlyResults = () => {
  const [data, setData] = useState([]);
  const [openYear, setOpenYear] = useState(null);
  const [showAddModel, setShowModel] = useState(false)
  const [showEditModel, setShowEditModel] = useState(false);
  const { fetchQuarterResult, quarterResult, loading, addQuarterResult, deleteQuarterlyResult, deleteSingleQuarterlyResult, updateQuarterlyResult, fetchQuarterlyResultById, quarterResultDetails } = useQuarterResult()

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
        .test("fileTypeAndSize", "Only PDF allowed and must be larger than 1560 KB", (value) => {
          // 🟢 If string (URL) → skip validation
          if (typeof value === "string") return true;

          // 🔴 If no file → invalid
          if (!value) return false;

          // 🟠 Validate type & size for new file
          const isPdf = value.type === "application/pdf";
          const isLargeEnough = value.size > 1560 * 1024;
          return isPdf && isLargeEnough;
        }),
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


  const initialValuesUpdate = {
    year: quarterResultDetails?.year || "",
    title: quarterResultDetails?.title || "",
    reports:
      quarterResultDetails?.reports?.length > 0
        ? quarterResultDetails.reports.map((report) => ({
          type: report.type || "",
          file: report.url || null, // use url here since API gives pdf URL
        }))
        : [{ type: "", file: null }],
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
    fetchQuarterResult()
    setShowModel(false);
  };
  const handleSubmitUpdate = (values) => {
    const formData = new FormData();
    formData.append("year", values.year);
    formData.append("title", values.title);
    values.reports.forEach((report, index) => {
      formData.append(`reports[${index}][type]`, report.type);
      // formData.append(`reports[${index}][file]`, report.file);
      if (report.file && typeof report.file !== "string") {
      formData.append(`reports[${index}][file]`, report.file);
    }
    });
    console.log("Form Data:", formData);
    updateQuarterlyResult( quarterResultDetails.id,formData)
    fetchQuarterResult()
    setShowEditModel(false);
  };

  console.log("Quarter Result", quarterResult);

  return (
    <>
      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add Results</h4>
      </div>

      <div className="border border-gray-300">
        {/* Years List */}
        {quarterResult?.map((yearData) => (
          <div key={yearData.year}>
            {/* Year Row */}
            <div
              className="flex justify-between items-center px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleYear(yearData.year)}
            >
              <span>{yearData.year}</span>
              {/* {openYear === yearData.year ? <FaMinus /> : <FaPlus />} */}
              <div className="flex gap-2">
                <button className="hover:text-blue-600">
                  {/* <FaEdit onClick={()=> {
                  fetchQuarterlyResultById(yearData.items[0].id)
                  setShowEditModel(true)} }/> */}
                </button>
                <MdDelete onClick={() => {
                  deleteQuarterlyResult(yearData.items[0].id),
                    console.log("idddddddddd", yearData.items.id)
                }
                } />
              </div>
            </div>

            {/* Dropdown Content */}
            {openYear === yearData.year && yearData.items.length > 0 && (
              <div className={`border-b border-gray-3000`}>
                {yearData.items.map((res, idx) => (
                  <div key={idx}>
                    {/* Subheading */}
                    <div className="bg-[#F7BF57] font-medium px-4 py-2 flex">
                      {res.title}
                      <FaEdit onClick={() => {
                        fetchQuarterlyResultById(res.id)
                        console.log("idGetResultById" , res.id)
                        setShowEditModel(true)
                      }} />
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
                                  href={report.url}
                                  target="_blank" rel="noopener noreferrer"
                                  className="bg-[#F7BF57] text-black px-3 py-1 rounded flex items-center gap-2 w-fit hover:bg-[#e5a93f]"
                                >
                                  Download <FaDownload />
                                </a>
                              </td>

                              {/* Actions */}
                              <td className="px-4 py-2 border-b border-gray-200">
                                <div className="flex gap-3 text-lg text-gray-700">
                                  {/* <FaEdit onClick={() => {
                                    fetchQuarterlyResultById(yearData.items[0].id)
                                    setShowEditModel(true)
                                  }} /> */}

                                  <button className="hover:text-red-600">
                                    <MdDelete onClick={() => {
                                      deleteSingleQuarterlyResult(report.id),
                                        console.log("idddddddddd", report.id)
                                    }
                                    } />
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
      {
        showEditModel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white w-[90%] max-h-[80vh] max-w-6xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-3">
                <h2 className="text-2xl font-bold text-gray-800">Edit Report</h2>
                <button
                  onClick={() => setShowEditModel(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <FiX size={22} className="text-gray-600" />
                </button>
              </div>

              {/* Form */}
              <Formik
                initialValues={initialValuesUpdate}
                validationSchema={validationSchema}
                onSubmit={handleSubmitUpdate}
                enableReinitialize
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
                             {/* File Upload (for Update Only) */}
<div>
  <label className="block mb-1 font-medium text-gray-700">
    Upload File (PDF)
  </label>

  {values.reports[index]?.file && typeof values.reports[index].file === "string" ? (
    // ✅ Show existing PDF
    <div className="flex items-center gap-3">
      <a
        href={values.reports[index].file}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View existing file
      </a>
      <button
        type="button"
        className="text-sm text-red-500 hover:underline"
        onClick={() => setFieldValue(`reports.${index}.file`, null)}
      >
        Replace
      </button>
    </div>
  ) : (
    // 📂 Show upload input when no existing file
    <input
      type="file"
      accept="application/pdf"
      onChange={(event) =>
        setFieldValue(`reports.${index}.file`, event.currentTarget.files[0])
      }
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
    />
  )}

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
                      Update
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
