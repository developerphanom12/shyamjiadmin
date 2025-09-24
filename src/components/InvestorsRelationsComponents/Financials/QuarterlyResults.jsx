import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaDownload } from "react-icons/fa";

const QuarterlyResults = () => {
  const [data, setData] = useState([]);
  const [openYear, setOpenYear] = useState(null);

  // Dummy API call
  useEffect(() => {
   
    setData([
      {
        year: "2025-26",
          results: [
          {
            title: "Results for Quarter and Nine Months ended 31st December, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter and Half Year ended 30th September, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter ended 30th June, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter ended 31st March, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          }
          

        ]
      },
      {
        year: "2024-25",
        results: []
      },
      {
        year: "2023-24",
        results: []
      },
      {
        year: "2022-23",
        results: [
          {
            title: "Results for Quarter and Nine Months ended 31st December, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter and Half Year ended 30th September, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter ended 30th June, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          },
          {
            title: "Results for Quarter ended 31st March, 2022",
            reports: [
              { type: "Press Release", file: "#" },
              { type: "Corporate Presentation", file: "#" },
              { type: "Financial Results", file: "#" }
            ]
          }


        ]
      },
      {
        year: "2021-22",
        results: []
      },
      {
        year: "2020-21",
        results: []
      },
      {
        year: "2019-20",
        results: []
      },
      {
        year: "2018-19",
        results: []
      },
      {
        year: "2017-18",
        results: []
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
          {openYear === yearData.year && yearData.results.length > 0 && (
            <div className={`border-b border-gray-3000`}>
              {yearData.results.map((res, idx) => (
                <div key={idx}>
                  {/* Subheading */}
                  <div className="bg-[#F7BF57] font-medium px-4 py-2">
                    {res.title}
                  </div>

                  {/* Table */}
                  <div>
                    <div className="grid grid-cols-2 font-semibold px-4 py-2 border-b border-gray-300 bg-[#F4F4F4]">
                      <span>Report Type</span>
                      <span>Action</span>
                    </div>
                    {res.reports.map((report, rIdx) => (
                      <div
                        key={rIdx}
                        className={`${rIdx % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"} 
                           grid grid-cols-2 px-4 py-2 border-b border-gray-200 items-center`}
                      >
                        <span>{report.type}</span>
                        <a
                          href={report.file}
                          className="bg-[#F7BF57] text-black px-3 py-1 rounded flex items-center gap-2 w-fit"
                          download
                        >
                          Download <FaDownload />
                        </a>
                      </div>
                    ))}
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

export default QuarterlyResults;
