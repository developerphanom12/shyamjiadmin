import React, { useState, useEffect } from "react";
import { FaDownload, FaPlus, FaMinus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";

const StockExchangeInfo = () => {
  const [showAddModel, setShowModel] = useState(false);
  const initialValues = {
    stock: "",
    address: "",
    stockcode: "",
  };
  const validationSchema = Yup.object({
    stock: Yup.string().required("Stock is required"),
    address: Yup.string().required("Address is required"),
    stockcode: Yup.string().required("Stock code is required"),
  });
  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    setShowModel(false);
  };


  const info = [

    {
      nameofexchange: "Audited Financial Statements",
      address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
      stockcode: "94759"
    },
    {
      nameofexchange: "Audited Financial Statements",
      address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
      stockcode: "3499"
    },

  ];

  return (

    <>
      <div className="flex justify-end my-3">
        <h4 onClick={() => setShowModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add Stock Info</h4>
      </div>

      <div className="w-full max-w-4xl mx-auto ">
        <div className="bg-white  shadow-lg overflow-hidden border border-gray-200">

          {/* Company Header */}
          <div className="px-1 py-2">
            <h3 className="font-semibold text-black text-md">
              The equity Shares of the Company are listed on the following 2 Stock Exchanges in India:
            </h3>
          </div>

          <div className="border-b border-gray-200 last:border-b-0">


            {/* Reports Table with Enhanced Responsiveness */}
            <div className="bg-white overflow-x-auto shadow-sm rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Table Header */}
                <thead className="bg-[#F7BF57]">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-black uppercase tracking-wider">
                      Name Of Stock Exchange
                    </th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-black uppercase tracking-wider border-x border-gray-300">
                      Address
                    </th>
                    <th scope="col" className="px-4 py-3 text-center font-semibold text-black uppercase tracking-wider">
                      Stock Codes
                    </th>
                    <th scope="col" className="px-4 py-3 text-center font-semibold text-black uppercase tracking-wider border-l border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {info.map((report, rIndex) => (
                    <tr key={rIndex} className={rIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-4   text-gray-800">
                        {report.nameofexchange}
                      </td>
                      <td className="px-4 py-4  text-gray-800 border-x border-gray-300">
                        <div className=" " title={report.address}>
                          {report.address}
                        </div>
                      </td>
                      <td className="px-4 py-4   text-gray-800 text-center">
                        <span className="inline-block px-2 py-1 rounded ">
                          {report.stockcode}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm border-l border-gray-300">
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
                      <label className="block mb-1 font-medium text-gray-700">Stock</label>
                      <Field
                        type="text"
                        name="stock"
                        placeholder="Enter stock name"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="stock"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* url */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Address</label>
                      <Field
                        as="textarea"
                        name="address"
                        placeholder="Enter address"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 resize-none"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* url */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Stock Codes</label>
                      <Field
                        type="text"
                        name="stockcode"
                        placeholder="Enter stockcode"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                      />
                      <ErrorMessage
                        name="stockcode"
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

export default StockExchangeInfo;
