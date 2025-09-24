import React from 'react'
import { FaDownload } from 'react-icons/fa'

const data = [
      {
        title: "Credit Ratings january 2025",
        file: "#"
      },
      {
        title: "Credit Ratings january 2025",
        file: "#"
      },
      {
        title: "Credit Ratings january 2025",
        file: "#"
      },
      {
        title: "Credit Ratings january 2025",
        file: "#"
      },
      {
        title: "Credit Ratings january 2025",
        file: "#"
      },
      {
        title: "Credit Ratings january 2025",
        file: "#"
      },
      {
        title: "Credit Ratings january 2025",
        file: "#"
      },
      {
        title: "Credit Ratings january 2025",
        file: "#"
      },
      {
        title: "Credit Ratings january 2025",
        file: "#"
      },

]

const CreditRatings = () => {
  return (
    <div>
        <div className="overflow-x-auto">
                      <table className="w-full border border-gray-300 text-left">
                        <tbody>
                          {data.map((data, yIdx) => (
                            <tr
                              key={yIdx}
                              className={yIdx % 2 === 0 ? "bg-white" : "bg-[#F4F4F4]"}
                            >
                              <td className="p-2 border border-gray-300">
                                {data.title}
                              </td>
                              <td className="p-2 border border-gray-300  hover:text-blue-600 hover:underline cursor-pointer">
                                 <div className="px-6  flex justify-center">
                                    <a
                                        href={data.file}
                                        className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                                        download
                                    >
                                        Download <FaDownload className="text-xs" />
                                    </a>
                                </div>
                              </td>
                             
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
    </div>
  )
}

export default CreditRatings
