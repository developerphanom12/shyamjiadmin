import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaDownload } from "react-icons/fa";

const AnnualResults = () => {
  const [data, setData] = useState([]);
  const [openYear, setOpenYear] = useState(null);

  // Dummy API call
  useEffect(() => {
   
    setData([
      {
        year: "2025-26",
            reports: [
              { type: "Annual Report 2025-26", file: "#" },
              { type: "Business Responsibility and Sustainability Report FY24-25", file: "#" },
            ]
      },
      {
        year: "2024-25",
          reports: [
              { type: "Annual Report 2025-26", file: "#" },
              { type: "Business Responsibility and Sustainability Report FY24-25", file: "#" },
            ]
      },
      {
        year: "2023-24",
        reports: []
      },
      {
        year: "2022-23",
       reports:[]
      },
      {
        year: "2021-22",
        reports: []
      },
      {
        year: "2020-21",
        reports: []
      },
      {
        year: "2019-20",
        reports: []
      },
      {
        year: "2018-19",
        reports: []
      },
      {
        year: "2017-18",
        reports: []
      }
    ]);
  }, []);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  return (
    <div className="border border-gray-300">

      {/* Years List */}
      {data.map((yearData) => (
        <div key={yearData.year}>
          {/* Year Row */}
          <div
            className="flex justify-between items-center px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
            onClick={() => toggleYear(yearData.year)}
          >
            <span>{yearData.year}</span>
            {openYear === yearData.year ? <FaMinus /> : <FaPlus />}
          </div>

          {/* Dropdown Content */}
          {openYear === yearData.year && yearData.reports.length > 0 && (
            <div className={`border-b border-gray-3000`}>
              {yearData.reports.map((res, idx) => (
                <div key={idx}>
                  {/* Subheading */}
                  {/* <div className="bg-[#F7BF57] font-medium px-4 py-2">
                    {res.title}
                  </div> */}

                  {/* Table */}
                  <div>
                    <div className="grid grid-cols-2 font-semibold px-4 py-2 border-b border-gray-300 bg-[#F4F4F4]">
                      <span>Report Type</span>
                      <span>Action</span>
                    </div>

                      <div
                        className={`${idx % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"} 
                           grid grid-cols-2 px-4 py-2 border-b border-gray-200 items-center`}
                      >
                        <span>{res.type}</span>
                        <a
                          href={res.file}
                          className="bg-[#F7BF57] text-black px-3 py-1 rounded flex items-center gap-2 w-fit"
                          download
                        >
                          Download <FaDownload />
                        </a>
                      </div>
                  
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnnualResults;
