import React, { useState, useEffect } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import axios from "axios";
import conf from "../../../config";
import { confirmAlert } from "../../../utils/alertToast";
import { toast } from "react-toastify";
 
const ConstitutionOfCommiteess = () => {
  const [data, setData] = useState([]);
  console.log("data--->", data);
  const [showAddModel, setShowModel] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const token = sessionStorage.getItem("token");
 
  useEffect(() => {
    fetchPublicList();
  }, [updateData]);
 
  const fetchPublicList = async () => {
    try {
      const res = await axios.get(
        `${conf.apiBaseUrl}user/committees/constitution`,
        {
          headers: { Accept: "application/json" },
        }
      );
      setData(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching committees:", err);
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    designation: Yup.string().required("Designation is required"),
    audit: Yup.string().required("Audit is required"),
    csr: Yup.string().required("CSR is required"),
    nr: Yup.string().required("NR is required"),
    sr: Yup.string().required("SR is required"),
    risk: Yup.string().required("Risk is required"),
  });
 
  const initialValues = {
    name: formData?.name || "",
    designation: formData?.designation || "",
    audit: formData?.audit || "",
    csr: formData?.csr || "",
    nr: formData?.nr || "",
    sr: formData?.sr || "",
    risk: formData?.risk || "",
    position: formData?.position || 1,
  };
  const createCommittee = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `${conf.apiBaseUrl}admin/committees/constitution`,
        values,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res---->", res);
      toast.success("added successfully");
      setUpdateData(!updateData);
      // alert("Committee added successfully!");
      resetForm();
      setShowModel(false);
      // fetchAdminList();
    } catch (err) {
      console.error("Error creating committee:", err);
    }
  };
  const deleteCommittee = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Blog ?"
    );
    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${conf.apiBaseUrl}admin/committees/constitution/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
 
        setUpdateData(!updateData);
        // alert("Committee deleted successfully!");
        // fetchAdminList();
      } catch (err) {
        console.error("Error deleting committee:", err);
      }
    }
  };
  const fetchSingleById = async (id) => {
    try {
      const res = await axios.get(
        `${conf.apiBaseUrl}user/committees/constitution/${id}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      setFormData(res?.data?.data);
      setShowModel(true);
      console.log("Single (by ID):", res?.data?.data);
    } catch (err) {
      console.error("Error fetching by ID:", err);
    }
  };
 
  const updateCommittee = async (id, values) => {
    console.log("uddate api--->");
    try {
      await axios.patch(
        `${conf.apiBaseUrl}admin/committees/constitution/${id}`,
        values,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdateData(!updateData);
      setShowModel(false);
      setEditId(null);
      toast.success("updated successfully");
      // fetchAdminList();
    } catch (err) {
      console.error("Error updating committee:", err);
    }
  };
  // const handleSubmit = (values, helpers) => {
  //   createCommittee(values, helpers);
  // };
  const handleSubmit = (values, helpers) => {
    if (editId) updateCommittee(editId, values);
    else createCommittee(values, helpers);
  };
 
  return (
    <>
      <div className="flex justify-end my-3">
        <h4
          onClick={() => {
            setEditId(null);
            setShowModel(true);
            setFormData(null);
          }}
          className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer"
        >
          Add{" "}
        </h4>
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
                {data?.map((committee, yIdx) => (
                  <tr
                    key={yIdx}
                    className={`border-b border-gray-200 ${
                      yIdx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300 font-medium">
                      {committee.name}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.designation}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.audit}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.csr}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.nr}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                      {committee.sr}
                    </td>
                    <td className="px-1 py-4 text-sm text-gray-800">
                      {committee.risk}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-2 border-b border-l border-gray-200">
                      <div className="flex gap-3 text-lg text-gray-700">
                        <button
                          className="hover:text-blue-600"
                          onClick={() => {
                            setEditId(committee.id);
                            fetchSingleById(committee.id);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="hover:text-red-600"
                          onClick={() => deleteCommittee(committee.id)}
                        >
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
 
      {showAddModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-[90%] max-h-[80vh] max-w-6xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {editId ? "Update Report" : "Add Report"}
              </h2>
              <button
                onClick={() => setShowModel(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <FiX size={22} className="text-gray-600" />
              </button>
            </div>
 
            {/* Form */}
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form
                  style={{ flexDirection: "column" }}
                  className="flex  gap-5"
                >
                  {/* name */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      name
                    </label>
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
                    <label className="block mb-1 font-medium text-gray-700">
                      designation
                    </label>
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
                    <label className="block mb-1 font-medium text-gray-700">
                      audit
                    </label>
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
                    <label className="block mb-1 font-medium text-gray-700">
                      csr
                    </label>
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
                    <label className="block mb-1 font-medium text-gray-700">
                      nr
                    </label>
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
                    <label className="block mb-1 font-medium text-gray-700">
                      sr
                    </label>
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
                    <label className="block mb-1 font-medium text-gray-700">
                      risk
                    </label>
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
                    {editId ? "Update" : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};
 
export default ConstitutionOfCommiteess;
 
 