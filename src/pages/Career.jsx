import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Career() {
  // Dummy data (48 rows)
  const data = Array.from({ length: 48 }).map((_, idx) => ({
    id: idx + 1,
    name: `Name ${idx + 1}`,
    email: `user${idx + 1}@gmail.com`,
    phone: "0000000000",
    dept: "XYZ",
    town: "Downtown",
    salary: "Rs 20,000",
  }));

  // States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openDropdown, setOpenDropdown] = useState(false);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(data.length / rowsPerPage);

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
    //<div className="w-full min-h-screen bg-[#F5F7F9] flex items-center justify-center p-4">
    <div className="w-full max-w-7xl bg-gray-50  shadow-md p-3 md:p-6 ">
      {/* Welcome Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome Back, Admin!
      </h1>

      {/* Career Section Wrapper */}
      <div className="bg-[#FFFFFF] border border-gray-200 rounded-lg px-2 pt-4 shadow-[#00000040]">
        {/* Section Heading */}
        <h2 className="text-xl font-semibold text-[#000000]">
          Career With Shyam-G
        </h2>
        <p className="text-sm text-[#6F6F6F] mb-4">
          Detailed Product Records For Quick Updates And Monitoring.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-[#F6F6F7] rounded-lg text-sm border-collapse">
            <thead className="bg-[#FFFFFF] text-[#A2A1A8]">
              <tr>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Name
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Email
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Mobile Number
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Resume
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Departments
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Town
                </th>
                <th className="px-4 py-2 text-left">Expected Salary</th>
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
                    {row.email}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.phone}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    <button className="bg-[#FFAD00] text-white p-2 rounded-md">
                      <FaEye />
                    </button>
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.dept}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.town}
                  </td>
                  <td className="px-4 py-2">{row.salary}</td>
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
      {/* End Career Section */}
    </div>
    //</div>
  );
}
