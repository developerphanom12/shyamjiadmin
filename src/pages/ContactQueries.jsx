import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCircle, FaEdit } from "react-icons/fa";
import useMessages from "../hooks/message/useMessage";
import { MdDelete, MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";

export default function ContactQueries() {
  // Dummy data (30 rows)
  const data = Array.from({ length: 30 }).map((_, idx) => ({
    id: idx + 1,
    name: `User ${idx + 1}`,
    email: `user${idx + 1}@example.com`,
    state: "XYZ",
    city: "ABC",
    town: "Downtown",
    phone: "9999999999",
    subject: "Query",
    message: "This is a contact message",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { messages, loading, fetchAllMessages, deleteMessage , markAsRead } = useMessages();

  useEffect(() => {
    fetchAllMessages();
  }, [])


  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentItems = messages?.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(messages?.length / rowsPerPage);

  // Pagination buttons logic (max 4 visible at a time)
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
  const rowOptions = [5, 10, 20];

  console.log("messages", messages);

  return (
    // <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full p-5 sm:p-[20px] sm:pt-16">
      <h1 className="font-medium text-[24px] leading-[30px] tracking-normal capitalize text-black mb-4">
        Welcome Back, Admin!
      </h1>

      <div className="bg-[#FFFFFF] border border-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-[#000000]">Contact Us</h2>
        <p className="text-sm text-[#6F6F6F] mb-4">
          Detailed Contact Records For Quick Support And Monitoring.
        </p>

        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="w-full border border-[#F6F6F7] rounded-lg text-sm border-collapse">
            <thead className="bg-[#FFFFFF] text-[#A2A1A8] ">
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
                  State
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  City
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Town
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Mobile Number
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">
                  Subject
                </th>
                <th className="px-4 py-2 text-left border-r border-[#F6F6F7]">Message</th>
                <th className="px-4 py-2 ">Action</th>

              </tr>
            </thead>
            <tbody>
              {currentItems.map((row) => (
                <tr
                  key={row.id}
                  className="border-t-2 border-[#F6F6F7] text-[#000000]"
                >

                  <td className="flex justify-center items-center mt-3  ">
                    {row.reviewed === 1 ? (
                      // <span className="" title="Read">🟢</span>
                      <FaCircle className="text-green-500" />
                    ) : (
                      // <span className="" ></span>
                      <FaCircle className="text-red-500 " />

                    )}
                  </td>

                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.name}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.email}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.state}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.city}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.town}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.mobile_number}
                  </td>
                  <td className="px-4 py-2 border-r border-[#F6F6F7]">
                    {row.subject}
                  </td>
                  <td className="px-4 py-2">{row.message}</td>
                  <td className="p-2 border-l border-gray-100">
                    <div className="px-6  flex justify-center">
                      <button 
                      onClick={()=> markAsRead(row.id)} 
                      className="hover:text-[#E24F14] text-xl cursor-pointer"
                       title={row.reviewed === 1 ?  null : "Mark as read"} >
                       {/* title= "Mark as read"> */}
                        {
                          row.reviewed === 1 ?  <MdMarkEmailRead />:<MdMarkEmailUnread />
                        }
                        {/* <FaEdit /> */}
                      </button>
                      <button className="hover:text-red-600 text-xl cursor-pointer"
                        onClick={() => deleteMessage(row.id)}
                        title="Delete">

                        <MdDelete />
                      </button>
                    </div>
                  </td>
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
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${rowsPerPage === opt ? "bg-gray-200 font-semibold" : ""
                      }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Center - Info */}
          <div className="text-[#A2A1A8] hidden sm:block">
            Showing <span className="font-semibold">{indexOfFirst + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(indexOfLast, messages?.length)}
            </span>{" "}
            out of <span className="font-semibold">{messages?.length}</span> records
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
                className={`px-3 py-1 rounded  ${currentPage === num
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
    //  </div>
  );
}
