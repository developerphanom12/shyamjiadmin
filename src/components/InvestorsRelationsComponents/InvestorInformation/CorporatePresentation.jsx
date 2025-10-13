import React, { useState, useEffect } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// const data = [
//   {
//     title: "Corporate Presentation",
//     file: "#"
//   },
//   {
//     title: "Corporate Presentation",
//     file: "#"
//   },
//   {
//     title: "Corporate Presentation",
//     file: "#"
//   },

// ]

const CorporatePresentation = () => {
  const [showAddModel, setShowModel] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    file: null,
  });

  const [presentations, setPresentations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null); //editeing id

  const fetchPresentations = async (page = 1) => {
    try {
      const token = localStorage.getItem("token"); // ya hardcode kar sakte ho
      const response = await axios.get(
        `https://shyamg-api.desginersandme.com/public/api/admin/corporate-presentations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          params: {
            per_page: 10,
            page: page,
          },
        }
      );

      const paginatedData = response.data.data;
      setPresentations(paginatedData.data || []);
      setCurrentPage(paginatedData.current_page);
      setTotalPages(paginatedData.last_page);
    } catch (error) {
      console.error("Error fetching corporate presentations:", error);
    }
  };
  useEffect(() => {
    fetchPresentations(currentPage);
  }, [currentPage]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    file: Yup.mixed().test(
      "fileRequired",
      "File is required",
      function (value) {
        const editingId = this?.options?.context?.editingId; // ← safe access
        if (!editingId && !value) return false; // Create: file required
        return true; // Edit: file optional
      }
    ),
  });

  // Create and Update

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.file) {
      formData.append("file", values.file); // file tabhi append karo agar user change kare
    }

    const token = localStorage.getItem("token");

    try {
      if (editingId) {
        // UPDATE
        await axios.patch(
          `https://shyamg-api.desginersandme.com/public/api/admin/corporate-presentations/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Corporate Presentation updated successfully!");
      } else {
        // CREATE
        await axios.post(
          "https://shyamg-api.desginersandme.com/public/api/admin/corporate-presentations",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Corporate Presentation uploaded successfully!");
      }

      resetForm();
      setShowModel(false);
      setEditingId(null);
      fetchPresentations(currentPage);
    } catch (error) {
      console.error("Error:", error.response || error);
      toast.error(
        editingId
          ? "Failed to update presentation"
          : "Failed to upload presentation"
      );
    }
  };

  //Delete handle
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    // Confirmation alert
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://shyamg-api.desginersandme.com/public/api/admin/corporate-presentations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        toast.success("CorPorate Presentation  deleted successfully!");
        // Refresh table after delete
        fetchPresentations(currentPage);
      } catch (error) {
        console.error("Error deleting CorPorate Presentation :", error);
        toast.error("Failed to delete CorPorate Presentation");
      }
    }
  };

  return (
    <>
      <div className="flex justify-end my-3">
        <h4
          onClick={() => setShowModel(true)}
          className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer"
        >
          Add Presentation
        </h4>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-[#F4F4F4] text-left font-semibold">
                <th className="px-4 py-2 border-b border-gray-300">Title</th>
                <th className="px-4 py-2 border-b border-x border-gray-300">
                  Download
                </th>
                <th className="px-4 py-2 border-b border-x border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {presentations.map((data, yIdx) => (
                <tr
                  key={yIdx}
                  className={yIdx % 2 === 0 ? "bg-white" : "bg-[#F4F4F4]"}
                >
                  <td className="p-2 border border-gray-300">{data.title}</td>
                  <td className="p-2 border border-gray-300  hover:text-blue-600 hover:underline cursor-pointer">
                    <div className="px-6  flex justify-center">
                      <a
                        href={data.file_url}
                        download={data.file_name}
                        target="_blank"
                        className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                      >
                        Download <FaDownload className="text-xs" />
                      </a>
                    </div>
                  </td>
                  <td className="p-2 border border-gray-300">
                    <div className="px-6  flex justify-center">
                      <button
                        className="hover:text-blue-600"
                        onClick={() => {
                          setInitialValues({
                            title: data.title,
                            file: null,
                          });
                          setEditingId(data.id);
                          setShowModel(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="hover:text-red-600"
                        onClick={() => handleDelete(data.id)}
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
        {/* Paginations */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 sm:py-2 bg-gray-300 rounded disabled:opacity-50 min-w-[75px] text-center truncate"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-1 sm:py-2 bg-gray-300 rounded disabled:opacity-50 min-w-[75px] text-center truncate"
          >
            Next
          </button>
        </div>
      </div>

      {showAddModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-[90%] max-h-[80vh] max-w-6xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-3">
              <h2 className="text-2xl font-bold text-gray-800">Add Report</h2>
              <button
                onClick={() => {
                  setShowModel(false);
                  setEditingId(null);
                }}
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
              context={{ editingId }} // ← Yup schema ke liye extra info
            >
              {({ values, setFieldValue }) => (
                <Form
                  style={{ flexDirection: "column" }}
                  className="flex  gap-5"
                >
                  {/* Title */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Title
                    </label>
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
                    {editingId ? "Update" : "Submit"}
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

export default CorporatePresentation;
