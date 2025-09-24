import React, { useState } from "react";
import { FaDownload, FaPlus, FaMinus } from "react-icons/fa";

const categories = [
  {
    title: "English Publications - Financial Results",
    reports: [
      { title: "Free press India 30.06.25", file: "#" },
      { title: "Free press India 31.12.24", file: "#" },
      { title: "Free press India 30.09.24", file: "#" },
      { title: "Free press India 30.06.24", file: "#" },
      { title: "Free press India 31.12.23", file: "#" },
      { title: "Free press India 30.09.23", file: "#" },
      { title: "Free press India 30.06.23", file: "#" },
    ]

  },
  {
    title: "Hindi Publications - Financial Results",
    reports: [
      { title: "Free press India 30.06.25", file: "#" },
      { title: "Free press India 31.12.24", file: "#" },
      { title: "Free press India 30.09.24", file: "#" },
      { title: "Free press India 30.06.24", file: "#" },
      { title: "Free press India 31.12.23", file: "#" },
      { title: "Free press India 30.09.23", file: "#" },
      { title: "Free press India 30.06.23", file: "#" },
    ]

  },
  {
    title: "English Publications - Notice to Shareholders",
    reports: [
      { title: "Free press India 30.06.25", file: "#" },
      { title: "Free press India 31.12.24", file: "#" },
      { title: "Free press India 30.09.24", file: "#" },
      { title: "Free press India 30.06.24", file: "#" },
    ]

  },
  {
    title: "Hindi Publications - Notice to Shareholders",
    reports: [
      { title: "Free press India 30.06.25", file: "#" },
      { title: "Free press India 31.12.24", file: "#" },
      { title: "Free press India 30.09.24", file: "#" },
      { title: "Free press India 30.06.24", file: "#" },
    ]

  }
]


const NewspaperPublication = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCategory = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {categories.map((cat, idx) => (
        <div key={idx} className=" border border-gray-300">
          {/* Header Row */}
          <div
            onClick={() => toggleCategory(idx)}
            className="flex justify-between items-center bg-[#F4F4F4 px-4 py-3 cursor-pointer font-semibold hover:bg-gray-100"
          >
            <span>{cat.title}</span>
            {openIndex === idx ? <FaMinus /> : <FaPlus />}
          </div>

          {/* Dropdown Content */}
          {openIndex === idx && (
            <div className="w-full border border-gray-300 overflow-hidden">
              {cat.reports.map((report, rIdx) => (
                <div
                  key={rIdx}
                  className={`grid grid-cols-[1fr_auto] items-center divide-x divide-gray-300
          ${rIdx % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"}
          ${rIdx < cat.reports.length - 1 ? "border-b border-gray-300" : ""}`}
                >
                  {/* Left Text */}
                  <div className="px-4 py-2 text-sm leading-snug">
                    {report.title}
                  </div>

                  {/* Right Button */}
                  <div className="px-4 py-2 flex justify-center">
                    <a
                      href={report.file}
                      className="bg-yellow-500 text-white px-4 py-1 rounded flex items-center gap-2"
                      download
                    >
                      Download <FaDownload />
                    </a>
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

export default NewspaperPublication;
