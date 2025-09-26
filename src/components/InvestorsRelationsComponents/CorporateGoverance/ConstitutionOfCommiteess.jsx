import React, { useState, useEffect } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";

const ConstitutionOfCommiteess = () => {
  const [data, setData] = useState([]);
  const [showAddModel, setShowModel] = useState(false)

  useEffect(() => {
    setData([
      {
        name: "Rajesh Chaudhary",
        designation: "Chairman",
        auditCommittee: "Yes",
        csrCommittee: "Yes",
        nrCommittee: "Yes",
        srCommittee: "Yes",
        riskManagementCommittee: "Yes",
      },
      {
        name: "Rajesh Chaudhary",
        designation: "Chairman",
        auditCommittee: "Yes",
        csrCommittee: "Yes",
        nrCommittee: "Yes",
        srCommittee: "Yes",
        riskManagementCommittee: "Yes",
      },
    ]);
  }, []);


  const initialValues = {
    name: "",
    designation: "",
    audit: "",
    csr: "",
    nr: "",
    sr: "",
    risk: "",
  };
  return (
    <>
      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add </h4>
      </div>


      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left overflow-x-auto">
              <thead>
                <tr className="bg-[#F4F4F4] border-b border-gray-300">
                  <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300 ">
                    Name
                  </th>
                  <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                    Designation
                  </th>
                  <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                    Audit Committee
                  </th>
                  <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                    CSR Committee
                  </th>
                  <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                    NR Committee
                  </th>
                  <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                    SR Committee
                  </th>
                  <th className="px-1 py-2 font-semibold border-r border-gray-300 text-gray-700">
                    Risk Management Committee
                  </th>
                  <th className="px-1 py-2 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((committee, yIdx) => (
                  <tr
                    key={yIdx}
                    className={`border-b border-gray-200 ${yIdx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                      }`}
                  >
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300 font-medium">
                      {committee.name}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.designation}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.auditCommittee}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.csrCommittee}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.nrCommittee}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.srCommittee}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800">
                      {committee.riskManagementCommittee}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-2 border-b border-l border-gray-200">
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
              //  validationSchema={validationSchema}
              //  onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }) => (
                  <Form style={{ flexDirection: "column" }} className="flex  gap-5">


                    {/* name */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">name</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* designation */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">designation</label>
                      <Field
                        type="text"
                        name="designation"
                        placeholder="Enter designation"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="designation"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* audit */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">audit</label>
                      <Field
                        type="text"
                        name="audit"
                        placeholder="Enter audit"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="audit"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* csr */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">csr</label>
                      <Field
                        type="text"
                        name="csr"
                        placeholder="Enter csr"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="csr"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* nr */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">nr</label>
                      <Field
                        type="text"
                        name="nr"
                        placeholder="Enter nr"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="nr"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* sr */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">sr</label>
                      <Field
                        type="text"
                        name="sr"
                        placeholder="Enter sr"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="sr"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* risk */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">risk</label>
                      <Field
                        type="text"
                        name="risk"
                        placeholder="Enter risk"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="risk"
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

export default ConstitutionOfCommiteess;
