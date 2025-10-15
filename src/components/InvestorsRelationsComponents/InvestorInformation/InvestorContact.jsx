import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useInvestorContact from "../../../hooks/invester/investerInfo/useInvestorContact";

// const [contactDetails, setContactDetails] = useState([
//   {
//     id: 1,
//     title: "Company Secretary & Compliance Officer",
//     name: "Mr. Sanjay Chaurey",
//     additionalFields: [
//       { key: "company", value: "Pratap Snacks Limited" },
//       { key: "address", value: "Khasra No. 378/2, Neemsar Road," },
//       { key: "addressLine2", value: "Near Makrana House, Palda," },
//       { key: "city", value: "Indore - 452 020 (M.P.)" },
//       { key: "phone", value: "(91 731) 2437679" },
//       { key: "fax", value: "(91 731) 2437605" },
//       { key: "email", value: "complianceofficer@yellowdiamond.in" },
//       { key: "website", value: "www.yellowdiamond.in" }
//     ]
//   },
//   {
//     id: 2,
//     title: "Nodal Officer under IEPF",
//     name: "Mr. Sanjay Chaurey",
//     additionalFields: [
//       { key: "phone", value: "(91 731) 2437679" },
//       { key: "email", value: "complianceofficer@yellowdiamond.in" }
//     ]
//   },
//   {
//     id: 3,
//     title: "Share Transfer Agent",
//     name: "KFin Technologies Limited",
//     additionalFields: [
//       { key: "subtitle", value: "Corporate Registry" }
//     ]
//   }
// ]);
const InvestorContact = () => {
  const [showAddModel, setShowAddModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const { fetchInvestorContact, investorContact, addInvestorContact, fetchInvestorContactById, investorContactDetails, setInvestorContactDetails, updateInvestorContact, deleteInvestorContact, } = useInvestorContact();

  useEffect(() => {
    fetchInvestorContact()
  }, [])

  // Form validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    name: Yup.string().required('Name is required'),
    additionalFields: Yup.array().of(
      Yup.object({
        key: Yup.string().required('Field name is required'),
        value: Yup.string().required('Field value is required')
      })
    )
  });

  const initialValues = {
    title: "",
    name: "",
    additionalFields: [
      { key: "", value: "" }
    ]
  };
  const initialValuesUpdate = {
    title: investorContactDetails.title || "",
    name: investorContactDetails.name || "",
    additionalFields: investorContactDetails.details || [{ key: "", value: "" }],
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("name", values.name);
    values.additionalFields.forEach((field, index) => {
      formData.append(`details[${index}][key]`, field.key);
      formData.append(`details[${index}][value]`, field.value);
    });
    addInvestorContact(formData)
    setShowAddModel(false);
  };

  const handleSubmitUpdate = (values) => {
    const jsonData = {
      title: values.title,
      name: values.name,
      details: values.additionalFields.map((field) => ({
        key: field.key,
        value: field.value,
      })),
    };

    updateInvestorContact(investorContactDetails.id, jsonData);
    setShowEditModel(false);

  };

  return (
    <>
      {/* Admin Controls */}
      <div className="flex justify-between items-center ">
        <h2 className=" ">
          Investor Grievances Redressal Contact Details
        </h2>
        <div className="flex justify-end my-3">
          <h4 onClick={() => setShowAddModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add Contact</h4>
        </div>
      </div>

      {/* Table Layout */}
      <div className="bg-white overflow-x-auto shadow border border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#F7BF57]">
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black border-x border-gray-300">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black border-r border-gray-300">Details</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {investorContact?.map((contact, index) => (
              <tr
                key={contact.id}
                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {contact.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 border-x border-gray-300">
                  {contact.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="space-y-1">
                    {contact.details.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="flex items-center">
                        <span className="font-medium capitalize mr-2">{field.key}:</span>
                        {field.key.toLowerCase() === 'email' ? (
                          <a href={`mailto:${field.value}`} className="text-blue-600 hover:underline">
                            {field.value}
                          </a>
                        ) : field.key.toLowerCase() === 'website' ? (
                          <a href={`https://${field.value}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {field.value}
                          </a>
                        ) : (
                          <span>{field.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="px-6  flex justify-center">
                    <button className="hover:text-blue-600">
                      <FaEdit onClick={() => {
                        setInvestorContactDetails({})
                        fetchInvestorContactById(contact.id)
                        setShowEditModel(true)
                      }} />
                    </button>
                    <button className="hover:text-red-600">
                      <MdDelete onClick={() => deleteInvestorContact(contact.id)} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Contact Modal */}
      {showAddModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-[90%] max-h-[90vh] max-w-4xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-3 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Add Contact Details</h2>
              <button
                onClick={() => setShowAddModel(false)}
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
                <Form className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Title *</label>
                      <Field
                        type="text"
                        name="title"
                        placeholder="e.g., Company Secretary & Compliance Officer"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Name *</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="e.g., Mr. Sanjay Chaurey"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Dynamic Key-Value Fields */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block font-medium text-gray-700">Additional Details</label>
                      <button
                        type="button"
                        onClick={() => {
                          const currentFields = values.additionalFields || [];
                          setFieldValue('additionalFields', [
                            ...currentFields,
                            { key: "", value: "" }
                          ]);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <FiPlus size={16} />
                        Add Field
                      </button>
                    </div>

                    <div className="space-y-4">
                      {values.additionalFields?.map((field, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                          <div className="md:col-span-5">
                            <Field
                              type="text"
                              name={`additionalFields[${index}].key`}
                              placeholder="Field name (e.g., Phone, Email, Address)"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                            />
                            <ErrorMessage
                              name={`additionalFields[${index}].key`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div className="md:col-span-6">
                            <Field
                              type="text"
                              name={`additionalFields[${index}].value`}
                              placeholder="Field value"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                            />
                            <ErrorMessage
                              name={`additionalFields[${index}].value`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div className="md:col-span-1">
                            {values.additionalFields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newFields = values.additionalFields.filter((_, i) => i !== index);
                                  setFieldValue('additionalFields', newFields);
                                }}
                                className="w-full p-3 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                                title="Remove field"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModel(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#FFAD00] hover:bg-[#E69A00] text-white rounded-lg font-medium transition-colors"
                    >
                      Add Contact
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {showEditModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-[90%] max-h-[90vh] max-w-4xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-3 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Update Contact Details</h2>
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
                <Form className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Title *</label>
                      <Field
                        type="text"
                        name="title"
                        placeholder="e.g., Company Secretary & Compliance Officer"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Name *</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="e.g., Mr. Sanjay Chaurey"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Dynamic Key-Value Fields */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block font-medium text-gray-700">Additional Details</label>
                      <button
                        type="button"
                        onClick={() => {
                          const currentFields = values.additionalFields || [];
                          setFieldValue('additionalFields', [
                            ...currentFields,
                            { key: "", value: "" }
                          ]);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <FiPlus size={16} />
                        Add Field
                      </button>
                    </div>

                    <div className="space-y-4">
                      {values.additionalFields?.map((field, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                          <div className="md:col-span-5">
                            <Field
                              type="text"
                              name={`additionalFields[${index}].key`}
                              placeholder="Field name (e.g., Phone, Email, Address)"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                            />
                            <ErrorMessage
                              name={`additionalFields[${index}].key`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div className="md:col-span-6">
                            <Field
                              type="text"
                              name={`additionalFields[${index}].value`}
                              placeholder="Field value"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                            />
                            <ErrorMessage
                              name={`additionalFields[${index}].value`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div className="md:col-span-1">
                            {values.additionalFields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newFields = values.additionalFields.filter((_, i) => i !== index);
                                  setFieldValue('additionalFields', newFields);
                                }}
                                className="w-full p-3 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                                title="Remove field"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditModel(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#FFAD00] hover:bg-[#E69A00] text-white rounded-lg font-medium transition-colors"
                    >
                      Update Contact
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestorContact;