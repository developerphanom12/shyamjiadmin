import React, { useState, useEffect } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const DisclosuresUnderRegulations = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // useEffect(() => {
  //   setData([
  //     {
  //       srNo: 1,
  //       particulars: "Details of Company's Business",
  //       url: "https://www.yellowdiamond.in/about-us/#sectionE"
  //     },
  //     {
  //       srNo: 2,
  //       particulars: "Memorandum and Articles of Association",
  //       url: "https://www.yellowdiamond.in/wp-content/uploads/2024/09/MOA-and-AOA_PSL_2023-1.pdf"
  //     },
  //     {
  //       srNo: 3,
  //       particulars: "Composition of Committees of Board of Directors",
  //       url: "https://www.yellowdiamond.in/investor-relations/constitution-of-committees/"
  //     },
  //     {
  //       srNo: 4,
  //       particulars: "Terms & Conditions of appointment of Independent Directors",
  //       url: "https://www.yellowdiamond.in/wp-content/uploads/2018/01/Terms-and-conditions-ID.pdf"
  //     },
  //     {
  //       srNo: 5,
  //       particulars: "Code of Conduct of Board of Directors and Senior Management Personnel",
  //       url: "https://www.yellowdiamond.in/wp-content/uploads/2024/09/Code-of-Conduct-for-Board-of-Directors-and-Senior-Management-2.pdf"
  //     },
  //     {
  //       srNo: 6,
  //       particulars: "Vigil Mechanism / Whistle Blower Policy",
  //       url: "https://www.yellowdiamond.in/wp-content/uploads/2024/09/Vigil-Mechanism-Whistle-Blower-Policy.pdf"
  //     },
  //     {
  //       srNo: 7,
  //       particulars: "Criteria of making payments to Non-Executive Directors",
  //       url: "https://www.yellowdiamond.in/investor-relations/annual-reports/"
  //     },
  //     {
  //       srNo: 8,
  //       particulars: "Policy on dealing with Related Party Transactions",
  //       url: "https://www.yellowdiamond.in/wp-content/uploads/2024/09/Policy-on-Related-Party-Transactions.pdf"
  //     }
  //   ]);
  // }, []);

  const [showAddModel, setShowModel] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    url: "",
  });
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    url: Yup.string().required("URL is required"),
  });

  const getDisclosure = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://shyamg-api.desginersandme.com/public/api/user/lodr-disclosures"
      );

      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching LODR disclosures:", error);
    }
  };

  console.log("Fetched disclosures data:", data);

  useEffect(() => {
    getDisclosure();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const token = localStorage.getItem("token");

    try {
      if (editingId) {
        // 🟦 UPDATE EXISTING DISCLOSURE
        await axios.patch(
          `https://shyamg-api.desginersandme.com/public/api/admin/lodr-disclosures/${editingId}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Disclosure updated successfully!");
        resetForm();
      } else {
        // 🟩 ADD NEW DISCLOSURE
        await axios.post(
          "https://shyamg-api.desginersandme.com/public/api/admin/lodr-disclosures",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Disclosure added successfully!");
      }

      // Refresh data & reset modal
      getDisclosure();
      resetForm();
      setShowModel(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error submitting disclosure:", error);
      toast.error("Failed to save disclosure. Try again!");
    }
  };

  const handleDelete = async (id) => {
    const yourToken = localStorage.getItem("token"); // 👈 replace with actual token or variable
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://shyamg-api.desginersandme.com/public/api/admin/lodr-disclosures/${id}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${yourToken}`, // 👈 replace with actual token or variable
              },
            }
          );

          Swal.fire("Deleted!", "Disclosure has been deleted.", "success");

          // Refresh data after delete
          getDisclosure();
        } catch (error) {
          console.error("Error deleting disclosure:", error);
          Swal.fire("Error!", "Failed to delete disclosure.", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="flex justify-end my-3">
        <h4
          onClick={() => {
            setInitialValues({ title: "", url: "" }); // 🔄 Reset form
            setEditingId(null); // 🔄 Ensure it’s add mode
            setShowModel(true);
          }}
          className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer"
        >
          Add Disclosures
        </h4>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F4F4F4] border-b border-gray-300">
                  <th className="px-6 py-3 font-semibold text-gray-700 border-r border-gray-300 w-20">
                    Sr.No
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-700 border-r border-gray-300">
                    Particulars as per LODR
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-700 border-r border-gray-300">
                    URL
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) &&
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm border-r border-gray-300">
                        <a
                          href={item.url}
                          target="_blank"
                          download
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                        >
                          {item.url}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-3 text-lg text-gray-700">
                          <button
                            className="hover:text-blue-600"
                            onClick={() => {
                              setInitialValues({
                                title: item.title,
                                url: item.url,
                              });
                              setEditingId(item.id); // 👈 store which record we’re editing
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
                  {/* url */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      url
                    </label>
                    <Field
                      type="text"
                      name="url"
                      placeholder="Enter url"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                    />
                    <ErrorMessage
                      name="url"
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

export default DisclosuresUnderRegulations;
