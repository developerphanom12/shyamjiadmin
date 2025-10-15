import React, { useState, useEffect } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";;
import useStockExchangeDisclosureOthers from "../../../hooks/invester/investerInfo/useDisclosureOthers";

const StockExchangeDisclosureOthers = () => {
  const [data, setData] = useState([]);
  const [openSection, setOpenSection] = useState("Postal Ballot"); // which section is open
  const { fetchStockExchangeDisclosureOthers, loading, stockExchangeDisclosureOthers, addStockExchangeDisclosureOthersTitle, setStockExchangeDisclosureOthersDetails, stockExchangeDisclosureOthersDetails, updateStockExchangeDisclosureOthers, deleteStockExchangeDisclosureOthers, } = useStockExchangeDisclosureOthers()
  const [showAddModel, setShowModel] = useState(false)
  const [showEditModel, setShowEditModel] = useState(false)

  useEffect(() => {
    fetchStockExchangeDisclosureOthers()
  }, [])

  console.log("stockExchangeDisclosureOthers ", stockExchangeDisclosureOthers)

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    reports: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required("Report type is required"),
        url: Yup.string()
          .required("Url is required")
          .url("Enter a valid URL"),
      })
    ),
  });

  const validationSchemaUpdate = Yup.object({
    report_type: Yup.string().required("Report type is required"),
    url: Yup.string()
      .required("Url is required")
      .url("Enter a valid URL"),
  });


  const initialValues = {
    title: "",
    reports: [{ type: "", url: "" }],
  };

  const initialValuesUpdate = {
    report_type: stockExchangeDisclosureOthersDetails?.data?.report_type || "",
    url: stockExchangeDisclosureOthersDetails?.data?.audio_url || "",
  }

  const handleSubmit = (values) => {
    const jsonData = {
      title: values.title,
      fields: [
        { key: "title", label: "Title" },
        { key: "report_type", label: "Report Type" },
        { key: "file", label: "Download" },
      ],
      entries: values.reports.map((report) => ({
        data: {
          title: "Audio/Video recordings and transcripting of investors call",
          report_type: report.type,
          audio_url: report.url,
        },
      })),
    };

    console.log("jsonData:", jsonData);
    addStockExchangeDisclosureOthersTitle(jsonData);
    setShowModel(false);
  };

  const handleSubmitUpdate = (values) => {
    const jsonData = {
      data: {
        report_type: values.report_type,
        audio_url: values.url,
      }
    }
    updateStockExchangeDisclosureOthers(stockExchangeDisclosureOthersDetails?.reg30_other_section_id, stockExchangeDisclosureOthersDetails?.id, jsonData)
    setShowEditModel(false);
  }

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  console.log("details", stockExchangeDisclosureOthersDetails)

  return (
    <>
      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add Disclosures</h4>
      </div>

      <div className="border border-gray-300 w-full max-w-4xl mx-auto text-sm md:text-base">
        {stockExchangeDisclosureOthers?.map((sec, idx) => (
          <div key={idx} className="border-b border-gray-300">
            {/* Section Header */}
            <div
              className="flex justify-between items-center px-4 py-2 bg-[#F3F4F6] cursor-pointer hover:bg-gray-100"
              onClick={() => toggleSection(sec.title)}
            >
              <span>{sec.title}</span>
               {openSection === sec.title ? <FaMinus /> : <FaPlus />}
            </div>

            {/* Section Content */}
            {openSection === sec.title && sec.entries.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-left">
                  <thead>
                    <tr className="bg-[#F4F4F4] text-left font-semibold">
                      <th className="px-4 py-2 border-b border-gray-300">Title</th>
                      <th className="px-4 py-2 border-b border-x border-gray-300">Download</th>
                      <th className="px-4 py-2 border-b border-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.entries.map((disclosure, yIdx) => (
                      <tr
                        key={yIdx}
                        className={yIdx % 2 === 0 ? "bg-white" : "bg-[#F4F4F4]"}
                      >
                        <td className="p-2 border border-gray-300">
                          {disclosure.data.report_type}
                        </td>
                        <td className="p-2 border border-gray-300  hover:text-blue-600 hover:underline cursor-pointer">
                          <div className="px-6  flex justify-center">
                            <a
                              href={disclosure.data.audio_url} target="_blank"
                              className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                              download
                            >
                              Download <FaDownload className="text-xs" />
                            </a>
                          </div>
                        </td>
                        {/* Actions */}
                        <td className="px-4 py-2 border-b border-gray-200">
                          <div className="flex gap-3 text-lg text-gray-700">
                            <button className="hover:text-blue-600" onClick={() => {
                              setShowEditModel(true);
                              setStockExchangeDisclosureOthersDetails(disclosure);
                            }}>
                              <FaEdit
                              />
                            </button>
                            <button className="hover:text-red-600">
                              <MdDelete  onClick={() => deleteStockExchangeDisclosureOthers(disclosure.reg30_other_section_id , disclosure.id)} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
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

                              {/* URL Input */}
                              <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                  Report URL
                                </label>
                                <Field
                                  type="text"
                                  name={`reports.${index}.url`}
                                  placeholder="Enter report URL"
                                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage
                                  name={`reports.${index}.url`}
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
                            onClick={() => push({ type: "", url: "" })}
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
                validationSchema={validationSchemaUpdate}
                onSubmit={handleSubmitUpdate}
                enableReinitialize
              >
                {({ values, setFieldValue }) => (
                  <Form style={{ flexDirection: "column" }} className="flex  gap-5">

                    {/* Reports */}
             
                        <div style={{ flexDirection: "column" }} className="flex flex-col gap-4">
                         
                            <div
                              
                              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                            >
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

                              {/* URL Input */}
                              <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                  Report URL
                                </label>
                                <Field
                                  type="text"
                                  name="url"
                                  placeholder="Enter report URL"
                                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage
                                  name="url"
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>

                            </div>
                         
                        </div>
        

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

export default StockExchangeDisclosureOthers;
