import React, { useEffect, useState } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const NewspaperPublication = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddModel, setShowModel] = useState(false);
  const [data, setData] = useState([]);
  const [editingSection, setEditingSection] = useState(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Section title is required"),
    entries: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Report title is required"),
        newspaper_name: Yup.string().required("Newspaper Name is required"),
        date: Yup.date()
          .required("Date is required")
          .typeError("Invalid date format"),
        file: Yup.mixed()
          .required("PDF file is required")
          .test(
            "fileFormat",
            "Only PDF files are allowed",
            (value) =>
              !value ||
              (value.name && value.name.toLowerCase().endsWith(".pdf"))
          ),
      })
    ),
  });

  const initialValues = editingSection
    ? {
        title: editingSection.title,
        entries: editingSection.entries.map((entry) => ({
          id: entry.id,
          title: entry.data.title,
          newspaper_name: entry.data.newspaper_name,
          date: entry.data.date,
          file: null,
          existingFile: entry.data.file,
        })),
      }
    : {
        title: "",
        entries: [{ title: "", newspaper_name: "", date: "", file: null }],
      };

  const toggleCategory = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getNewsPaper = async () => {
    try {
      const response = await axios.get(
        "https://shyamg-api.desginersandme.com/public/api/user/newspapers/sections/full"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching newspaper sections:", error);
    }
  };

  useEffect(() => {
    getNewsPaper();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // CREATE new section + entries
      const formData = new FormData();
      formData.append("title", values.title); // Section title
      formData.append("position", 1);
      //formData.append("data[title]", "active");
      formData.append("data[fields]", [
        ({ key: "title", label: "Title" },
        { key: "newspaper_name", label: "Newspaper Name" },
        { key: "date", label: "Date" },
        { key: "file", label: "Download" }),
      ]);

      values.entries.forEach((report, index) => {
        // Entry data
        formData.append(`entries[${index}][data][title]`, report.newspaper_name); // Entry title
        formData.append(
          `entries[${index}][data][newspaper_name]`,
          report.newspaper_name
        );
        formData.append(`entries[${index}][data][date]`, report.date);

        if (report.file) {
          formData.append(`entries[${index}][data][file]`, report.file);
        }

        formData.append(`entries[${index}][position]`, index + 1);
      });

      const response = await axios.post(
        "https://shyamg-api.desginersandme.com/public/api/admin/newspapers/sections/with-entries",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Section and entries created successfully!");

      resetForm();
      setShowModel(false);
      setEditingSection(null);
      getNewsPaper(); // Refresh list
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        "Failed to submit";
      toast.error(message);
    }
  };

  const deleteEntry = async (sectionId, entryId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://shyamg-api.desginersandme.com/public/api/admin/newspapers/sections/${sectionId}/entries/${entryId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast.success("Entry deleted successfully!");
        console.log("Deleted Entry Response:", response.data);
        // Optionally: Refresh your list after delete
        getNewsPaper();
      } catch (error) {
        console.error("Error deleting entry:", error);
        const message =
          error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.message ||
          error.message ||
          "Failed to delete entry";
        toast.error(message);
      }
    }
  };
  const deleteSection = async (sectionId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://shyamg-api.desginersandme.com/public/api/admin/newspapers/sections/${sectionId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast.success("Sections deleted successfully!");
        console.log("Deleted Section Response:", response.data);
        // Optionally: Refresh your list after delete
        getNewsPaper();
      } catch (error) {
        console.error("Error deleting entry:", error);
        const message =
          error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.message ||
          error.message ||
          "Failed to delete entry";
        toast.error(message);
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-end my-3">
        <h4
          onClick={() => setShowModel(true)}
          className="px-4 py-1 bg-[#FFAD00] rounded-sm cursor-pointer"
        >
          Add News
        </h4>
      </div>
      <div className="w-full">
        {data.map((cat, idx) => (
          <div key={idx} className="border border-gray-300">
            <div
              onClick={() => toggleCategory(idx)}
              className="flex justify-between items-center bg-[#F4F4F4] px-4 py-3 cursor-pointer font-semibold hover:bg-gray-100"
            >
              <span>{cat.title}</span>
              {/* {openIndex === idx ? <FaMinus /> : <FaPlus />} */}
              <button
                className="hover:text-red-600"
                onClick={() => deleteSection(cat.id)}
              >
                <MdDelete />
              </button>
            </div>

            {openIndex === idx && (
              <div className="w-full border border-gray-300 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 text-sm">
                    <thead>
                      <tr className="bg-[#F4F4F4] text-left font-semibold">
                        <th className="px-4 py-2 border-b border-gray-300">
                          Title
                        </th>
                        <th className="px-4 py-2 border-b border-gray-300">
                          Download
                        </th>
                        <th className="px-4 py-2 border-b border-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(cat.entries) &&
                        cat.entries.map((entry, rIdx) => (
                          <tr
                            key={entry.id}
                            className={
                              rIdx % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
                            }
                          >
                            <td className="px-4 py-2 border-b border-gray-200">
                              {entry.data.title}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-200">
                              <a
                                href={entry.data.file}
                                download
                                className="bg-yellow-500 text-white px-4 py-1 rounded flex items-center gap-2 hover:bg-yellow-600 w-fit"
                              >
                                Download <FaDownload />
                              </a>
                            </td>
                            <td className="px-4 py-2 border-b border-gray-200">
                              <div className="flex gap-3 text-lg text-gray-700">
                                <button
                                  className="hover:text-blue-600"
                                  onClick={() => {
                                    setEditingSection(cat); // pura section object
                                    setShowModel(true); // modal open
                                  }}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="hover:text-red-600"
                                  onClick={() => deleteEntry(cat.id, entry.id)}
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
            )}
          </div>
        ))}
      </div>

      {showAddModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-[90%] max-h-[80vh] max-w-6xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
            <div className="flex justify-between items-center mb-6 pb-3">
              <h2 className="text-2xl font-bold text-gray-800">
                Add Newspaper Publication
              </h2>
              <button
                onClick={() => setShowModel(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <FiX size={22} className="text-gray-600" />
              </button>
            </div>

            <Formik
              initialValues={initialValues}
              //validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form className=" gap-5">
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

                  <FieldArray name="entries">
                    {({ push, remove }) => (
                      <div className=" gap-4 mt-2">
                        {values.entries.map((_, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                          >
                            <div>
                              <label className="block mb-1 font-medium text-gray-700">
                                Newspaper Name
                              </label>
                              <Field
                                type="text"
                                name={`entries.${index}.newspaper_name`}
                                placeholder="Enter newspaper name"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                              />
                              <ErrorMessage
                                name={`entries.${index}.newspaper_name`}
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div>
                              <label className="block mb-1 font-medium text-gray-700">
                                Date
                              </label>
                              <Field
                                type="date"
                                name={`entries.${index}.date`}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                              />
                              <ErrorMessage
                                name={`entries.${index}.date`}
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div>
                              <label className="block mb-1 font-medium text-gray-700">
                                Upload File (PDF)
                              </label>
                              <input
                                type="file"
                                onChange={(event) =>
                                  setFieldValue(
                                    `entries.${index}.file`,
                                    event.currentTarget.files[0]
                                  )
                                }
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                              />
                              <ErrorMessage
                                name={`entries.${index}.file`}
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

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

                        <button
                          type="button"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium w-fit mt-2"
                          onClick={() =>
                            push({
                              title: "",
                              newspaper_name: "",
                              date: "",
                              file: null,
                            })
                          }
                        >
                          + Add More
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium mt-2"
                  >
                    {editingSection ? "Update" : "Submit"}
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

export default NewspaperPublication;
