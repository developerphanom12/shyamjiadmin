import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaDownload, FaEdit } from "react-icons/fa";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AnnualResults = () => {
  const [data, setData] = useState([]);
  const [openYear, setOpenYear] = useState(null);
  const [showAddModel, setShowModel] = useState(false);
  const [editEntry, setEditEntry] = useState(null);

  const getAnnualReports = async () => {
    try {
      const response = await axios.get(
        "https://shyamg-api.desginersandme.com/public/api/user/annual-reports/sections/full"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching annual returns:", error);
    }
  };

  useEffect(() => {
    getAnnualReports();
  }, []);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Year is required"),
    entries: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Report title is required"),
        file: Yup.mixed()
          .required("File is required")
          .test(
            "fileFormat",
            "Only PDF allowed",
            (value) => !value || (value && value.type === "application/pdf")
          ),
      })
    ),
  });

  const editValidationSchema = Yup.object({
    title: Yup.string().required("Year required"),
    entries: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Report title required"),
        //file: Yup.mixed(), // optional in edit
        file: Yup.mixed().nullable()
      })
    ),
  });

  const initialValues = editEntry
    ? {
        title: editEntry.year,
        entries: [{ title: editEntry.title, file: null }],
      }
    : { title: "", entries: [{ title: "", file: null }] };

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

  const createSection = async (yearTitle, token) => {
    const response = await axios.post(
      "https://shyamg-api.desginersandme.com/public/api/admin/annual-reports/sections",
      {
        title: yearTitle,
        fields: [
          { key: "title", label: "Report Type" },
          { key: "file", label: "Download" },
        ],
        position: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.data.id; // Section ID
  };

  const createEntry = async (sectionId, entry, position, token) => {
    const formData = new FormData();
    formData.append("data[title]", entry.title);
    formData.append("file", entry.file);
    formData.append("position", position);
    formData.append("data[report_type]", "jhsdh");

    const response = await axios.post(
      `https://shyamg-api.desginersandme.com/public/api/admin/annual-reports/sections/${sectionId}/entries`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );
    return response.data.data.id; // Entry ID
  };

  // const handleSubmit = async (values) => {
  //   const token = sessionStorage.getItem("token");

  //   try {
  //     // 1️⃣ Check if Section already exists
  //     let section = data.find((s) => s.title === values.title);
  //     let sectionId;

  //     if (section) {
  //       sectionId = section.id;
  //     } else {
  //       // 2️⃣ Create Section
  //       sectionId = await createSection(values.title, token);
  //     }

  //     // 3️⃣ Loop through entries and create them
  //     for (let i = 0; i < values.entries.length; i++) {
  //       await createEntry(sectionId, values.entries[i], i + 1, token);
  //     }

  //     toast.success("Annual Returns uploaded successfully!");
  //     setShowModel(false);
  //     getAnnualReports(); // Refresh UI
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to upload Annual Returns");
  //   }
  // };

  const handleSubmit = async (values) => {
    const token = sessionStorage.getItem("token");

    try {
      if (editEntry) {
        // 🔹 EDIT MODE
        const { sectionId, entryId } = editEntry;
        const entry = values.entries[0];

        let response;

        if (entry.file) {
          // 📂 Agar naya file upload kiya gaya ho
          const formData = new FormData();
          formData.append("data[title]", entry.title);
          formData.append("file", entry.file);
          formData.append("data[report_type]", "jhsdh");
          formData.append("position", 1);
          formData.append("_method", "PATCH"); // Laravel-style PATCH

          response = await axios.post(
            `https://shyamg-api.desginersandme.com/public/api/admin/annual-reports/sections/${sectionId}/entries/${entryId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            }
          );
        } else {
          // 🧾 Agar sirf title update karna ho (file same hai)
          const payload = {
            data: {
              title: entry.title,
              report_type: "jhsdh",
            },
            position: 1,
          };

          response = await axios.patch(
            `https://shyamg-api.desginersandme.com/public/api/admin/annual-reports/sections/${sectionId}/entries/${entryId}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );
        }

        toast.success("Report updated successfully!");
        setShowModel(false);
        setEditEntry(null);
        getAnnualReports(); // UI refresh
      } else {
        // 🆕 CREATE MODE
        let section = data.find((s) => s.title === values.title);
        let sectionId;

        if (section) {
          sectionId = section.id;
        } else {
          // create section if not exists
          sectionId = await createSection(values.title, token);
        }

        for (let i = 0; i < values.entries.length; i++) {
          await createEntry(sectionId, values.entries[i], i + 1, token);
        }

        toast.success("Annual Returns uploaded successfully!");
        setShowModel(false);
        getAnnualReports(); // Refresh UI
      }
    } catch (error) {
      console.error("Error:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        "Failed to upload Annual Returns";

      toast.error(message);
    }
  };

  const handleEditClick = (sectionId, entry) => {
    const section = data.find((d) => d.id === sectionId);
    if (!section) return;

    setEditEntry({
      sectionId: sectionId,
      entryId: entry.id,
      year: section.title,
      title: entry.data.title,
      file: null,
    });

    setShowModel(true);
  };

  const handleDeleteEntry = async (sectionId, entryId) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Admin token missing! Login again.");
      return;
    }

    // Swal confirmation
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
          `https://shyamg-api.desginersandme.com/public/api/admin/annual-reports/sections/${sectionId}/entries/${entryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        // Toast success
        toast.success("Entry deleted successfully!");

        // UI me se entry remove kar do
        setData((prevData) =>
          prevData.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  entries: section.entries.filter(
                    (entry) => entry.id !== entryId
                  ),
                }
              : section
          )
        );
      } catch (error) {
        console.error("Error deleting entry:", error);

        // Backend se specific message agar mile
        const message =
          error.response?.data?.message || "Failed to delete entry";

        toast.error(message);
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
          Add Reports
        </h4>
      </div>

      <div className="border border-gray-300">
        {/* Years List */}
        {data.map((yearData) => (
          <div key={yearData.id}>
            {/* Year Row */}
            <div
              className="flex justify-between items-center px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleYear(yearData.title)}
            >
              <span>{yearData.title}</span>
              {openYear === yearData.title ? <FaMinus /> : <FaPlus />}
            </div>

            {/* Dropdown Content */}
            {openYear === yearData.title && (
              <div className="border-b border-gray-300">
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 text-sm">
                    {/* Head */}
                    <thead>
                      <tr className="bg-[#F4F4F4] text-left font-semibold">
                        <th className="px-4 py-2 border-b border-gray-300">
                          Report Type
                        </th>
                        <th className="px-4 py-2 border-b border-x border-gray-300">
                          Download
                        </th>
                        <th className="px-4 py-2 border-b border-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                      {yearData.entries.map((res, idx) => (
                        <tr
                          key={res.id || idx}
                          className={
                            idx % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
                          }
                        >
                          {/* Report Type */}
                          <td className="px-4 py-2 border-b border-gray-200">
                            {res.data.title}
                          </td>

                          {/* Download */}
                          <td className="px-4 py-2 border-b border-x border-gray-200">
                            <a
                              href={res.data.file}
                              download
                              className="bg-[#F7BF57] text-black px-3 py-1 rounded flex items-center gap-2 w-fit hover:bg-[#e5a93f]"
                            >
                              Download <FaDownload />
                            </a>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-2 border-b border-gray-200">
                            <div className="flex gap-3 text-lg text-gray-700">
                              <button
                                className="hover:text-blue-600"
                                onClick={() =>
                                  handleEditClick(yearData.id, res)
                                }
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="hover:text-red-600"
                                onClick={() =>
                                  handleDeleteEntry(yearData.id, res.id)
                                }
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
              validationSchema={
                editEntry ? editValidationSchema : validationSchema
              }
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ values, setFieldValue }) => (
                <Form
                  style={{ flexDirection: "column" }}
                  className="flex  gap-5"
                >
                  {/* Year */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Year
                    </label>
                    <Field
                      as="select"
                      name="title"
                      disabled={!!editEntry}
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
                      name="title"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Title */}
                  {/* <div>
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
                          </div> */}

                  {/* Reports */}
                  <FieldArray name="entries">
                    {({ push, remove }) => (
                      <div
                        style={{ flexDirection: "column" }}
                        className="flex flex-col gap-4"
                      >
                        {values.entries?.map((_, index) => (
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
                                name={`entries.${index}.title`}
                                placeholder="Report Type"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                              />
                              <ErrorMessage
                                name={`entries.${index}.title`}
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
                    {editEntry ? "Update Report" : "Submit Report"}
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

export default AnnualResults;
