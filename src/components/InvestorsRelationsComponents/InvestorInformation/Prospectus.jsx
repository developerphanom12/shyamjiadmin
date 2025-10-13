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

const data = [
  {
    title: "Prospectus",
    file: "#",
  },
  {
    title: "Prospectus",
    file: "#",
  },
  {
    title: "Prospectus",
    file: "#",
  },
  {
    title: "Prospectus",
    file: "#",
  },
  {
    title: "Prospectus",
    file: "#",
  },
  {
    title: "Prospectus",
    file: "#",
  },
];

const Prospectus = () => {
  const [showAddModel, setShowModel] = useState(false);
  const [prospectuses, setProspectuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const [initialValues, setInitialValues] = useState({
    title: "",
    file: null,
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    file: Yup.mixed().test(
      "fileFormat",
      "Only PDF allowed",
      (value) => !value || value.type === "application/pdf"
    ),
  });

  const fetchProspectuses = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://shyamg-api.desginersandme.com/public/api/admin/prospectuses?per_page=10&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setProspectuses(response.data.data.data || []); // array
      setTotalPages(response.data.data.last_page || 1); // pagination
    } catch (error) {
      console.error("Error fetching prospectuses:", error);
      toast.error("Failed to fetch prospectuses");
    }
  };

  useEffect(() => {
    fetchProspectuses(currentPage);
  }, [currentPage]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      if (values.title) formData.append("title", values.title); // title always
      if (values.file) formData.append("file", values.file); // file optional

      const formDataUpdate = new FormData();

      if (values.title) {
        formDataUpdate.append("title", values.title);
      }

      if (values.file && typeof values.file !== "string") {
        formDataUpdate.append("file", values.file);
      }

      const token = localStorage.getItem("token");

      if (editingId) {
        // PATCH request for update
        await axios.patch(
          `https://shyamg-api.desginersandme.com/public/api/admin/prospectuses/${editingId}`,
          formDataUpdate,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Prospectus updated successfully!");
      } else {
        // POST request for new prospectus
        await axios.post(
          "https://shyamg-api.desginersandme.com/public/api/admin/prospectuses",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Prospectus added successfully!");
      }

      // Reset + close modal
      resetForm();
      setInitialValues({ title: "", file: null });
      setShowModel(false);
      setEditingId(null);

      // 🔄 Refresh table **and wait** for it
      await fetchProspectuses(currentPage);
    } catch (error) {
      console.error(
        "Error uploading/updating prospectus:",
        error.response || error
      );
      toast.error("Failed to update prospectus");
    }
  };

  // Delete function

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
          `https://shyamg-api.desginersandme.com/public/api/admin/prospectuses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        toast.success("Prospectus deleted successfully!");
        // Refresh table after delete
        fetchProspectuses(currentPage);
      } catch (error) {
        console.error("Error deleting prospectus:", error);
        toast.error("Failed to delete prospectus");
      }
    }
  };

  return (
    <>
      <div className="flex justify-end my-3">
        <h4
          onClick={() => {
            setEditingId(null); // ensure edit mode off
            setInitialValues({ title: "", file: null }); // clear old data
            setShowModel(true); // open modal
          }}
          className="px-4 py-1 bg-[#FFAD00] rounded-sm cursor-pointer"
        >
          Add Prospectus
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
              {prospectuses.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#F4F4F4]"}
                >
                  <td className="p-2 border border-gray-300">{item.title}</td>
                  <td className="p-2 border border-gray-300 hover:text-blue-600 hover:underline cursor-pointer">
                    <div className="px-6 flex justify-center">
                      <a
                        href={item.file}
                        className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                        download
                      >
                        Download <FaDownload className="text-xs" />
                      </a>
                    </div>
                  </td>
                  <td className="p-2 border border-gray-300">
                    <div className="px-6 flex justify-center">
                      <button
                        className="hover:text-blue-600"
                        onClick={() => {
                          setInitialValues({
                            title: item.title,
                            file: item.file_url,
                          }); // prefill
                          setEditingId(item.id); // editing mode
                          setShowModel(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="hover:text-red-600"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
      </div>

      {showAddModel && (
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
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
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

export default Prospectus;
