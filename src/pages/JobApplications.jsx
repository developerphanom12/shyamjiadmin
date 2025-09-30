import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdDelete, MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JobApplications() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openDropdown, setOpenDropdown] = useState(false);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentItems = data?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data?.length / rowsPerPage);

  const maxPageButtons = 4;
  let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  const rowOptions = [7, 10, 20];

  // Login + fetch applications

  const getApplications = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return console.log("No token found, please login first.");

      const res = await axios.get(
        "https://shyamg-api.desginersandme.com/public/api/admin/applications?per_page=20",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(res.data.data);
    } catch (error) {
      console.log("Applications not fetched", error);
    }
  };

  const deleteApplication = async (id) => {
    const token = sessionStorage.getItem("token");
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
          `https://shyamg-api.desginersandme.com/public/api/admin/applications/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Application has been deleted.", "success");
      } catch (error) {
        console.error("Delete failed", error);
        Swal.fire("Error!", "Failed to delete application.", "error");
      }
    }
  };

  // Mark as read
  const markAsRead = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return console.log("No token found, please login first.");

      const response = await axios.patch(
        `https://shyamg-api.desginersandme.com/public/api/admin/applications/${id}`,
        { reviewed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update local state
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, reviewed: true } : item
        )
      );

      toast.success("Marked as reviewed successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error marking as reviewed:", error);
      toast.error("Failed to mark as reviewed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className="w-full p-3 md:p-5 mt-[50px] ">
      <ToastContainer />
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome Back, Admin!
      </h1>

      <div className="bg-[#FFFFFF] border border-gray-200 rounded-lg p-4 shadow-[#00000040]">
        <h2 className="text-xl font-semibold text-[#000000]">
          Career With Shyam-G
        </h2>
        <p className="text-sm text-[#6F6F6F] mb-4">
          Detailed Product Records For Quick Updates And Monitoring.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border border-[#F6F6F7] rounded-lg text-sm border-collapse">
            <thead className="bg-[#FFFFFF] text-[#A2A1A8]">
              <tr>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Status
                </th>
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
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((row) => (
                <tr
                  key={row.id}
                  className="border-t-2 border-[#F6F6F7] text-[#000000] font-semibold"
                >
                  {/* Status */}
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    <span
                      className={`h-3 w-3 inline-block rounded-full ${
                        row.reviewed ? "bg-green-600" : "bg-red-500"
                      }`}
                    ></span>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.name}
                  </td>

                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.email}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.mobile_number}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.resume_path ? (
                      <a
                        href={row.resume_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#FFAD00] text-white p-2 rounded-md inline-block"
                      >
                        <FaEye />
                      </a>
                    ) : (
                      <span className="text-gray-400">No Resume</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.department}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.town}
                  </td>
                  <td className="px-4 py-2">{row.expected_salary}</td>

                  {/* Action: Unread -> Read + Delete */}
                  <td className="p-2 border border-gray-300">
                    <div className="flex justify-center gap-2">
                      {row.reviewed ? (
                        <MdMarkEmailRead className="cursor-pointer" />
                      ) : (
                        <MdMarkEmailUnread
                          className="cursor-pointer"
                          onClick={() => markAsRead(row.id)}
                        />
                      )}

                      <MdDelete
                        className="text-gray-700 cursor-pointer"
                        onClick={() => deleteApplication(row.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (unchanged) */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-600 gap-3">
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

          <div className="text-[#A2A1A8]">
            Showing <span className="font-semibold">{indexOfFirst + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(indexOfFirst + rowsPerPage, data.length)}
            </span>{" "}
            out of <span className="font-semibold">{data.length}</span> records
          </div>

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
  );
}
