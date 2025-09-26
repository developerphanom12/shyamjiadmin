import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Distributos() {
  // Dummy data (60 rows)
  const data = Array.from({ length: 60 }).map((_, idx) => ({
    id: idx + 1,
    name: `Distributor ${idx + 1}`,
    firm: "This Firm",
    state: "XYZ",
    district: "Downtown",
    town: "XYZ",
    brand: "Brand",
    phone: "0000000000",
    email: "this@gmail.com",
    gstin: "000000000000000",
    message:
      idx === 0
        ? "You might use pre-written 'demo messages' for testing purposes."
        : "It is used for various purposes in this demo.",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openDropdown, setOpenDropdown] = useState(false);


  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(data.length / rowsPerPage);

//   const handleRowsChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

  // Pagination buttons logic (show max 4 buttons)
  const maxPageButtons = 4;
  let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

   const rowOptions = [7, 10, 20];

  return (
    //<div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4 ">
    <div className="w-full p-3 md:p-5 mt-[50px]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome Back, Admin!
      </h1>

      <div className="bg-[#FFFFFF] border border-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-[#000000]">
          Distributor With Shyam-G
        </h2>
        <p className="text-sm text-[#6F6F6F] mb-4">
          Detailed Distributor Records For Quick Updates And Monitoring.
        </p>

        {/* Table */}
        <div className=" overflow-x-auto ">
          <table className="min-w-[1200px] border border-[#F6F6F7] rounded-lg text-sm border-collapse">
            <thead className="bg-[#FFFFFF] text-[#A2A1A8]">
              <tr>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Name
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Name of the Firm
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  State
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  District
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Town
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Already Business Brand
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Mobile Number
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Email
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  GSTIN
                </th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row) => (
                <tr
                  key={row.id}
                  className="border-t-2 border-[#F6F6F7] text-[#000000] font-semibold"
                >
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.name}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.firm}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.state}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.district}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.town}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.brand}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.phone}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.email}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.gstin}
                  </td>
                  <td className="px-4 py-2">{row.message}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-600 gap-3">
          {/* Left - Rows per page (Custom Dropdown) */}
          <div className="flex items-center gap-2 relative">
            <span className="text-[#A2A1A8] ">Showing:</span>

            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm text-black bg-white"
            >
              {rowsPerPage}
            </button>

            {openDropdown && (
              <div className="absolute left-full bottom-0 ml-2 bg-white border border-gray-300 rounded-md shadow-md z-10">
                {rowOptions.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setRowsPerPage(opt);
                      setCurrentPage(1);
                      setOpenDropdown(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      rowsPerPage === opt ? "bg-gray-200 font-semibold" : ""
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Center - Info */}
          <div className="text-[#A2A1A8]">
            Showing <span className="font-semibold">{indexOfFirst + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(indexOfLast, data.length)}
            </span>{" "}
            out of <span className="font-semibold">{data.length}</span> records
          </div>

          {/* Right - Pagination Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded bg-gray-100 disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>

            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded  ${
                  currentPage === num
                    ? "border border-[#000000] text-black font-semibold"
                    : " text-black font-semibold"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded bg-gray-100 disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
    //</div>
  );
}
