import React, { useState, useEffect } from "react";
import { FaDownload, FaPlus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SchemeOfAmalgamation = () => {
  const [schem, setSchem] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [showAddModel, setShowModel] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null); // entry object being edited

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    reports: Yup.array().of(
      Yup.object().shape({
        type: Yup.string()
          .notRequired()
          .test(
            "required-if-file",
            "Report type is required",
            function (value) {
              const { file } = this.parent;
              if (file) return value && value.trim() !== "";
              return true;
            }
          ),
        file: Yup.mixed()
          .notRequired()
          .test("required-if-type", "File is required", function (value) {
            const { type } = this.parent;
            if (type && type.trim() !== "") return value != null;
            return true;
          })
          .test("fileFormat", "Only PDF allowed", function (value) {
            if (!value) return true;
            return value.type === "application/pdf";
          }),
      })
    ),
  });

  // const initialValues = {
  //   title: "",
  //   reports: [{ type: "", file: null }],
  // };

  const initialValues = editingEntry
    ? {
        title: editingEntry.data?.title || "",
        reports: [
          {
            type: editingEntry.data?.report_type || "",
            file: null,
          },
        ],
      }
    : {
        title: "",
        reports: [{ type: "", file: null }],
      };

  const fetchSectionsAndEntries = async () => {
    try {
      const response = await axios.get(
        "https://shyamg-api.desginersandme.com/public/api/user/schemes/sections/full"
      );
      const sectionsArray = Array.isArray(response.data?.data)
        ? response.data.data
        : [];
      setSchem(sectionsArray);
    } catch (error) {
      console.log("Error fetching sections or entries:", error);
    }
  };

  useEffect(() => {
    fetchSectionsAndEntries();
  }, []);

  // ------------------- CREATE -------------------
  // const handleSubmit = async (values, { resetForm }) => {
  //   const token = sessionStorage.getItem("token");

  //   try {
  //     const hasReports =
  //       values.reports && values.reports.some((r) => r.type || r.file);

  //     let response;
  //     if (hasReports) {
  //       const payload = {
  //         title: values.title,
  //         fields: [
  //           { key: "title", label: "Title" },
  //           { key: "report_type", label: "Report Type" },
  //           { key: "file", label: "Download" },
  //         ],
  //         position: 1,
  //         entries: values.reports
  //           .filter((r) => r.type || r.file)
  //           .map((report, index) => ({
  //             data: {
  //               title: report.type || "",
  //               report_type: report.type || "",
  //               file:
  //                 typeof report.file === "string"
  //                   ? report.file
  //                   : "https://example.com/" +
  //                     (report.file?.name || "file.pdf"),
  //             },
  //             position: index + 1,
  //           })),
  //       };

  //       response = await axios.post(
  //         "https://shyamg-api.desginersandme.com/public/api/admin/schemes/sections/with-entries",
  //         payload,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //     } else {
  //       response = await axios.post(
  //         "https://shyamg-api.desginersandme.com/public/api/admin/schemes/sections",
  //         {
  //           title: values.title,
  //           fields: [
  //             { key: "title", label: "Title" },
  //             { key: "report_type", label: "Report Type" },
  //             { key: "file", label: "Download" },
  //           ],
  //           position: 1,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //     }

  //     // ------------------- NORMALIZE RESPONSE -------------------
  //     let newSection;
  //     if (response.data.data.section) {
  //       newSection = {
  //         ...response.data.data.section,
  //         entries: response.data.data.entries || [],
  //       };
  //     } else {
  //       newSection = {
  //         ...response.data.data,
  //         entries: response.data.data.entries || [],
  //       };
  //     }

  //     setSchem((prev) => [...prev, newSection]);
  //     toast.success("Section created successfully!");

  //     resetForm();
  //     setShowModel(false);
  //   } catch (error) {
  //     console.error("Create failed:", error.response || error.message);
  //     const message =
  //       error.response?.data?.message ||
  //       error.response?.data?.errors?.[0]?.message ||
  //       error.message ||
  //       "Failed to create section";
  //     toast.error(`Failed to create section: ${message}`);
  //   }
  // };

  const handleSubmit = async (values, { resetForm }) => {
    const token = sessionStorage.getItem("token");

    try {
      // Check if we are editing an entry
      if (editingEntry) {
        // ------------------- UPDATE ENTRY -------------------
        const sectionId = editingEntry.sectionId || editingEntry.section?.id;
        const entryId = editingEntry.id;

        const payload = {
          data: {
            title: values.reports[0].type || "", // Report Type / Title
            report_type: values.reports[0].type || "", // Report Type
          },
          position: editingEntry.position || 1, // preserve position if needed
        };

        const response = await axios.put(
          `https://shyamg-api.desginersandme.com/public/api/admin/schemes/sections/${sectionId}/entries/${entryId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Update state locally
        setSchem((prev) =>
          prev.map((section) => {
            const id = section.id || section.section?.id;
            if (id !== sectionId) return section;
            return {
              ...section,
              entries: section.entries.map((entry) =>
                entry.id === entryId
                  ? { ...entry, data: response.data.data } // replace with updated entry
                  : entry
              ),
            };
          })
        );

        toast.success("Entry updated successfully!");
        resetForm();
        setEditingEntry(null);
        setShowModel(false);
        return; // exit handleSubmit since update is done
      }

      // ------------------- CREATE SECTION / ENTRY -------------------
      const hasReports =
        values.reports && values.reports.some((r) => r.type || r.file);

      let response;
      if (hasReports) {
        const payload = {
          title: values.title,
          fields: [
            { key: "title", label: "Title" },
            { key: "report_type", label: "Report Type" },
            { key: "file", label: "Download" },
          ],
          position: 1,
          entries: values.reports
            .filter((r) => r.type || r.file)
            .map((report, index) => ({
              data: {
                title: report.type || "",
                report_type: report.type || "",
                file:
                  typeof report.file === "string"
                    ? report.file
                    : "https://example.com/" +
                      (report.file?.name || "file.pdf"),
              },
              position: index + 1,
            })),
        };

        response = await axios.post(
          "https://shyamg-api.desginersandme.com/public/api/admin/schemes/sections/with-entries",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.post(
          "https://shyamg-api.desginersandme.com/public/api/admin/schemes/sections",
          {
            title: values.title,
            fields: [
              { key: "title", label: "Title" },
              { key: "report_type", label: "Report Type" },
              { key: "file", label: "Download" },
            ],
            position: 1,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // ------------------- NORMALIZE RESPONSE -------------------
      let newSection;
      if (response.data.data.section) {
        newSection = {
          ...response.data.data.section,
          entries: response.data.data.entries || [],
        };
      } else {
        newSection = {
          ...response.data.data,
          entries: response.data.data.entries || [],
        };
      }

      setSchem((prev) => [...prev, newSection]);
      toast.success("Section created successfully!");
      resetForm();
      setShowModel(false);
    } catch (error) {
      console.error("Submit failed:", error.response || error.message);
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Failed to submit";
      toast.error(`Failed to submit: ${message}`);
    }
  };

  // ------------------- DELETE SECTION -------------------
  // ------------------- DELETE SECTION -------------------
  // ------------------- DELETE SECTION -------------------
  const handleDeleteSection = async (section) => {
    const sectionId = section.id || section.section?.id; // normalize section ID
    const token = sessionStorage.getItem("token");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the entire section along with its entries!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      // ALWAYS call the normal delete endpoint
      const url = `https://shyamg-api.desginersandme.com/public/api/admin/schemes/sections/${sectionId}`;

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // UPDATE STATE
      setSchem((prev) =>
        prev.filter((s) => {
          const id = s.id || s.section?.id;
          return id !== sectionId;
        })
      );

      toast.success("Section deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error.response || error.message);
      toast.error(
        `Failed to delete section: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // ------------------- DELETE ENTRY -------------------
  const handleDeleteEntry = async (entryId, sectionId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    const token = sessionStorage.getItem("token");

    try {
      await axios.delete(
        `https://shyamg-api.desginersandme.com/public/api/admin/schemes/sections/${sectionId}/entries/${entryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSchem((prev) =>
        prev.map((section) => {
          const id = section.id || section.section?.id;
          if (id !== sectionId) return section;
          return {
            ...section,
            entries: section.entries.filter((entry) => entry.id !== entryId),
          };
        })
      );

      toast.success("Entry deleted successfully!");
    } catch (error) {
      console.error("Entry delete failed:", error);
      toast.error("Failed to delete entry. Please try again.");
    }
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // ------------------- RENDER -------------------
  return (
    <>
      <div className="flex justify-end my-3">
        <h4
          onClick={() => setShowModel(true)}
          className="px-4 py-1 bg-[#FFAD00] rounded-sm cursor-pointer"
        >
          Add
        </h4>
      </div>

      <div className="border border-gray-300 w-full max-w-4xl mx-auto text-sm md:text-base">
        {Array.isArray(schem) &&
          schem.map((section, idx) => (
            <div key={idx} className="border-b border-gray-300">
              <div
                className="flex justify-between items-center px-4 py-2 bg-white cursor-pointer hover:bg-gray-100 font-medium"
                onClick={() => toggleSection(section.title)}
              >
                <span>{section.title}</span>
                <button
                  className="hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSection(section);
                  }}
                >
                  <MdDelete />
                </button>
              </div>

              {openSection === section.title && (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-left">
                    <thead>
                      <tr className="bg-[#F4F4F4] text-left font-semibold">
                        <th className="px-4 py-2 border-b border-gray-300">
                          Report Type
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
                      {Array.isArray(section.entries) &&
                        section.entries.map((entry, eIdx) => (
                          <tr
                            key={entry.id ?? eIdx}
                            className={
                              eIdx % 2 === 0 ? "bg-white" : "bg-[#F4F4F4]"
                            }
                          >
                            <td className="p-2 border border-gray-300">
                              {entry.data?.report_type ?? "-"}
                            </td>
                            <td className="p-2 border border-gray-300 flex justify-center">
                              {entry.data?.file && (
                                <a
                                  href={entry.data.file}
                                  className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                                  download
                                >
                                  Download <FaDownload className="text-xs" />
                                </a>
                              )}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-200">
                              <div className="flex gap-3 text-lg text-gray-700">
                                <button
                                  className="hover:text-blue-600"
                                  onClick={() => {
                                    setEditingEntry(entry); // store entry being edited
                                    setShowModel(true); // open modal
                                  }}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="hover:text-red-600"
                                  onClick={() =>
                                    handleDeleteEntry(entry.id, section.id)
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
              )}
            </div>
          ))}
      </div>

      {showAddModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-[90%] max-h-[80vh] max-w-6xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
            <div className="flex justify-between items-center mb-6 pb-3">
              <h2 className="text-2xl font-bold text-gray-800">Add Report</h2>
              <button
                onClick={() => {
                  setShowModel(false);
                  setEditingEntry(null);
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <FiX size={22} className="text-gray-600" />
              </button>
            </div>

            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
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

                  <FieldArray name="reports">
                    {({ push, remove }) => (
                      <div className="mt-2 gap-4">
                        {values.reports.map((_, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                          >
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

                            <div>
                              <label className="block mb-1 font-medium text-gray-700">
                                Upload File (PDF)
                              </label>
                              <input
                                type="file"
                                onChange={(event) =>
                                  setFieldValue(
                                    `reports.${index}.file`,
                                    event.currentTarget.files[0]
                                  )
                                }
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                              />
                              <ErrorMessage
                                name={`reports.${index}.file`}
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
                          onClick={() => push({ type: "", file: null })}
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
                    {editingEntry ? "Update" : "Submit"}
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

export default SchemeOfAmalgamation;
