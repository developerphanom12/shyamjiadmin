import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaDownload, FaEdit } from "react-icons/fa";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import useSubsidiaryFinancial from "../../../hooks/invester/financials/useSubsidiaryFinancial";


const SubsidiaryFinancial = () => {
  const [showAddModel, setShowModel] = useState(false)
  const [showEditModel, setShowEditModel] = useState(false)
  const { fetchSubsidiaryFinancials, subsidiaryFinancials, addSubsidiaryFinancial , fetchSubsidiaryFinancialById , setSubsidiaryFinancialDetails , subsidiaryFinancialDetails , updateSubsidiaryFinancialFields , updateSubsidiaryFinancialFile , deleteSubsidiaryFinancial } = useSubsidiaryFinancial()

  useEffect(() => {
    fetchSubsidiaryFinancials()
  }, [])

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
    title: Yup.string().required("Title is required"),
    report_type: Yup.string().required("Report type is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.mixed()
      .test("fileRequired", "File is required", (value) => {
        if (typeof value === "string") return true;
        return !!value;
      })
      .test("fileFormat", "Only PDF allowed", (value) => {
        if (typeof value === "string" || !value) return true;
        return value.type === "application/pdf";
      })
      .test("fileSize", "File size must be greater than 1560 KB", (value) => {
        if (typeof value === "string" || !value) return true;
        return value.size >= 1560 * 1024; // convert KB to bytes
      }),

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

  console.log("Subsidialry", subsidiaryFinancials)


  const initialValues = {
    title: "",
    report_type: "",
    description: "",
    file: null
  };

  const initialValuesUpdate = {
    title: subsidiaryFinancialDetails.title || "",
    report_type: subsidiaryFinancialDetails.report_type || "",
    description: subsidiaryFinancialDetails.description || "",
    file: subsidiaryFinancialDetails.file_url || null,
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("report_type", values.report_type);
    formData.append("description", values.description);
    formData.append("file", values.file);
    formData.append("year", "2025")
    addSubsidiaryFinancial(formData)
    setShowModel(false);
    fetchSubsidiaryFinancials()

  };
const handleSubmitUpdate = async (values) => {
  try {
    // 1️⃣ Prepare JSON data (for text fields)
    const jsonData = {
      title: values.title,
      report_type: values.report_type,
      description: values.description,
    };

    // 2️⃣ Send text fields update first
    await updateSubsidiaryFinancialFields(subsidiaryFinancialDetails.id, jsonData);

    // 3️⃣ Prepare file data only if new file uploaded
    if (values.file && typeof values.file !== "string") {
      const formData = new FormData();
      formData.append("file", values.file);
      await updateSubsidiaryFinancialFile(subsidiaryFinancialDetails.id, formData);
    }

    // 4️⃣ Close modal and refresh list
    setShowEditModel(false);
    fetchSubsidiaryFinancials();

  } catch (error) {
    console.error("Error updating subsidiary financial:", error);
  }
};



  return (
    <>
      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add </h4>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white  shadow-lg overflow-hidden border border-gray-200">

          {subsidiaryFinancials?.map((subsidiary, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">

              {/* Company Header */}
              <div className="bg-[#F7BF57] px-6 py-2 flex justify-between">
                <h3 className="font-semibold text-black text-lg">
                  {subsidiary.title}
                </h3>
                 <button onClick={() => deleteSubsidiaryFinancial(subsidiary.id)} className="hover:text-red-600">
                            <MdDelete />
                          </button>
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

                    <tr

                      className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {subsidiary.report_type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 border-l border-gray-300">
                        {subsidiary.description}
                      </td>
                      <td className="px-6 py-4 text-center border-l border-gray-300">
                        <a
                          href={subsidiary.file_url}
                          target="_blank"
                          className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                          // download
                        >
                          Download <FaDownload className="text-xs" />
                        </a>
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-2 border-l border-gray-200">
                        <div className="flex gap-3 text-lg text-gray-700">
                          <button className="hover:text-blue-600">
                            <FaEdit
                              onClick={() => {
                                setSubsidiaryFinancialDetails({})
                                fetchSubsidiaryFinancialById(subsidiary.id)
                                setShowEditModel(true)
                              }}
                            />
                          </button>
                         
                        </div>
                      </td>
                    </tr>

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

                    {/* Report Type */}
                    <div className="mb-3">
                      <label className="block mb-1 font-medium text-gray-700">
                        Report Type
                      </label>
                      <Field
                        type="text"
                        name="report_type"
                        placeholder="Report Type"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="report_type"
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
                            `file`,
                            event.currentTarget.files[0]
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name={`file`}
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

                    {/* Report Type */}
                    <div className="mb-3">
                      <label className="block mb-1 font-medium text-gray-700">
                        Report Type
                      </label>
                      <Field
                        type="text"
                        name="report_type"
                        placeholder="Report Type"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="report_type"
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
                    {/* <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Upload File (PDF)
                      </label>
                      <input
                        type="file"
                        // accept="application/pdf"
                        onChange={(event) =>
                          setFieldValue(
                            `file`,
                            event.currentTarget.files[0]
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name={`file`}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div> */}

                     {/* File Upload */}
                                        <div>
                                          <label className="block mb-1 font-medium text-gray-700">
                                            Upload File (PDF)
                                          </label>
                    
                                          {/* If an existing file is present, show its name and Change option */}
                                          {typeof values.file === "string" && subsidiaryFinancialDetails.file_name ? (
                                            <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2 bg-gray-50">
                                              <div className="text-sm text-gray-700 truncate">
                                                <span className="font-medium text-gray-800">Current file: </span>
                                                <a
                                                  href={values.file}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-blue-600 underline"
                                                >
                                                  {subsidiaryFinancialDetails.file_name}
                                                </a>
                                              </div>
                                              <button
                                                type="button"
                                                onClick={() => setFieldValue("file", null)}
                                                className="ml-3 text-blue-600 hover:text-blue-700 text-sm underline"
                                              >
                                                Change File
                                              </button>
                                            </div>
                                          ) : (
                                            <>
                                              {/* File input visible only when no file is present */}
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
                                            </>
                                          )}
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

export default SubsidiaryFinancial;
