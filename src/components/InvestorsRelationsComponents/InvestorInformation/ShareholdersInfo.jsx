import React, { useState, useEffect } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import useShareholderInfo from "../../../hooks/invester/investerInfo/useShareholderInfo";

const ShareholdersInfo = () => {
  // const [data, setData] = useState([]);
  const [openSection, setOpenSection] = useState(""); // which section is open
  const [showAddModel, setShowModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);

  const { fetchShareholdersInfo, loading, shareholdersInfo, addShareholdersInfo, fetchShareholdersInfoById, shareholdersInfoDetails, setShareholdersInfoDetails, updateShareholdersInfoEntry, deleteShareholdersInfo, deleteShareholdersInfoEntry, } = useShareholderInfo()

  useEffect(() => {
    fetchShareholdersInfo()
  }, [])

  const validationSchema = Yup.object({
    // year: Yup.string().required("Year is required"),
    title: Yup.string().required("Title is required"),
    reports: Yup.array().of(
      Yup.object().shape({
        year: Yup.string().required("Year is required"),
        notice: Yup.string().required("Notice is required"),
        results: Yup.string().required("Results is required"),
        forms: Yup.string().required("Forms is required"),
      })
    ),
  });

   const validationSchemaUpdate = Yup.object({
    notice: Yup.string().required("Notice is required"),
    results: Yup.string().required("Results is required"),
    forms: Yup.string().required("Forms is required"),
  });

  const initialValues = {
    title: "",
    reports: [{ year: "", notice: "", results: "", forms: "" }],
  };

  const initialValuesUpdate = {
    year: shareholdersInfoDetails?.financial_year || "",
    notice: shareholdersInfoDetails?.data?.notice || "",
    results: shareholdersInfoDetails?.data?.results || "",
    forms: shareholdersInfoDetails?.data?.forms || "",
  };

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

  const handleSubmit = (values) => {
    const jsonData = {
      title: values.title,
      fields: [
        { key: "notice", label: "Notice - Postal Ballot" },
        { key: "results", label: "Results - Postal Ballot" },
        { key: "forms", label: "Forms - Postal Ballot" },
      ],
      position: 1,
      entries: values.reports.map((report, index) => ({
        financial_year: report.year,
        data: {
          notice: report.notice,
          results: report.results,
          forms: report.forms,
        },
        position: index + 1,
      })),
    };

    addShareholdersInfo(jsonData);
    setShowModel(false);
  };


  const handleSubmitUpdate = (values) => {
    
    const jsonData = {
      financial_year: values.year,
      data: {
        notice: values.notice,
        results: values.results,
        forms: values.forms,
      },
    };
    updateShareholdersInfoEntry(shareholdersInfoDetails?.sectionId, shareholdersInfoDetails?.entryId, jsonData);
    setShowEditModel(false);
  };


  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>

      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add Info</h4>
      </div>

      <div className="border border-gray-300 w-full max-w-4xl mx-auto text-sm md:text-base">
        {shareholdersInfo?.map((sec, idx) => (
          <div key={idx} className="border-b border-gray-300">
            {/* Section Header */}
            <div
              className="flex justify-between items-center px-4 py-2 bg-white cursor-pointer hover:bg-gray-100 font-medium"
              onClick={() => toggleSection(sec.title)}
            >
              <span>{sec.title}</span>
              {/* {openSection === sec.title ? <FaMinus /> : <FaPlus />} */}
              <MdDelete onClick={() => deleteShareholdersInfo(sec.id)} />
            </div>

            {/* Section Content */}
            {openSection === sec.title && sec.entries.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-left">
                  <thead>
                    <tr className="bg-[#F7BF57]">
                      <th className="p-2 border border-gray-300">
                        Particulars / Financial Year
                      </th>
                      <th className="p-2 border border-gray-300">
                        Notice - Postal Ballot
                      </th>
                      <th className="p-2 border border-gray-300">
                        Results - Postal Ballot
                      </th>
                      <th className="p-2 border border-gray-300">
                        Forms - Postal Ballot
                      </th>
                      <th className="p-2 border border-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.entries.map((yearRow, yIdx) => (
                      <tr
                        key={yIdx}
                        className={yIdx % 2 === 0 ? "bg-white" : "bg-[#F4F4F4]"}
                      >
                        <td className="p-2 border border-gray-300">
                          {yearRow.financial_year}
                        </td>
                        <td className="p-2 border border-gray-300  hover:text-blue-600 hover:underline cursor-pointer">
                          {yearRow.data.notice}
                        </td>
                        <td className="p-2 border border-gray-300 hover:text-blue-600 hover:underline cursor-pointer">
                          {yearRow.data.results}
                        </td>
                        <td className="p-2 border border-gray-300 hover:text-blue-600 hover:underline cursor-pointer">
                          {yearRow.data.forms}
                        </td>
                        <td className="p-2 border border-gray-300">
                          <div className="px-6  flex justify-center">
                            <button className="hover:text-blue-600" onClick={() => {
                              setShowEditModel(true);
                              setShareholdersInfoDetails({
                                sectionId: sec.id,
                                entryId: yearRow.id,
                                ...yearRow
                              });
                            }}>
                              <FaEdit />
                            </button>
                            <button className="hover:text-red-600">
                              <MdDelete onClick={() => deleteShareholdersInfoEntry(sec.id, yearRow.id)} />
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
                              {/* Financial Year */}
                              <div className="mb-3">
                                <label className="block mb-1 font-medium text-gray-700">
                                  Financial Year
                                </label>
                                <Field
                                  as="select"
                                  name={`reports.${index}.year`}
                                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                                >
                                  {years.map((yr) => (
                                    <option key={yr} value={yr}>
                                      {yr}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name={`reports.${index}.year`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>

                              <div className="mb-3">
                                <label className="block mb-1 font-medium text-gray-700">
                                  Notice - Postal Ballot
                                </label>
                                <Field
                                  type="text"
                                  name={`reports.${index}.notice`}
                                  placeholder="Enter Notice - Postal Ballot"
                                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage
                                  name={`reports.${index}.notice`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                              <div className="mb-3">
                                <label className="block mb-1 font-medium text-gray-700">
                                  Results - Postal Ballot
                                </label>
                                <Field
                                  type="text"
                                  name={`reports.${index}.results`}
                                  placeholder="Enter Results - Postal Ballot"
                                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage
                                  name={`reports.${index}.results`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                              <div className="mb-3">
                                <label className="block mb-1 font-medium text-gray-700">
                                  Forms - Postal Ballot
                                </label>
                                <Field type="text"
                                  name={`reports.${index}.forms`}
                                  placeholder="Enter Forms - Postal Ballot"
                                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage
                                  name={`reports.${index}.forms`}
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
                            onClick={() => push({ year: "", notice: "", results: "", forms: "" })}
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
                <Form style={{ flexDirection: "column" }} className="flex flex-col gap-5">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Financial Year</label>
                    <Field
                      as="select"
                      name="year"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                    >
                      {years.map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="year" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Notice - Postal Ballot</label>
                    <Field
                      type="text"
                      name="notice"
                      placeholder="Enter Notice - Postal Ballot"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                    />
                    <ErrorMessage name="notice" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Results - Postal Ballot</label>
                    <Field
                      type="text"
                      name="results"
                      placeholder="Enter Results - Postal Ballot"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                    />
                    <ErrorMessage name="results" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Forms - Postal Ballot</label>
                    <Field
                      type="text"
                      name="forms"
                      placeholder="Enter Forms - Postal Ballot"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                    />
                    <ErrorMessage name="forms" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Update
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        )
      }
    </>
  );
};

export default ShareholdersInfo;
