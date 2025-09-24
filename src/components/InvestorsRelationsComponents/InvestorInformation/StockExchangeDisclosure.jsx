import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaDownload } from "react-icons/fa";

const StockExchangeDisclosure = () => {
  const [data, setData] = useState([]);
  const [openSection, setOpenSection] = useState("Postal Ballot"); // which section is open

  useEffect(() => {
    // Dummy data
    setData([
      {
        section: "Intimation / Disclosures",
          disclosure : [
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            
        ]
      },
      {
        section: "Outcome Of Board Meeting",
          disclosure : [
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            
        ]
      },
      {
        section: "Audio/Video recordings and transcripting of investors call",
        disclosure : [
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            {
              title: "Audio/Video recordings and transcripting of investors call",
              file: "#"
            },
            
        ]
      },
    ]);
  }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="border border-gray-300 w-full max-w-4xl mx-auto text-sm md:text-base">
      {data.map((sec, idx) => (
        <div key={idx} className="border-b border-gray-300">
          {/* Section Header */}
          <div
            className="flex justify-between items-center px-4 py-2 bg-white cursor-pointer hover:bg-gray-100 font-medium"
            onClick={() => toggleSection(sec.section)}
          >
            <span>{sec.section}</span>
            {openSection === sec.section ? <FaMinus /> : <FaPlus />}
          </div>

          {/* Section Content */}
          {openSection === sec.section && sec.disclosure.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-left">
                <tbody>
                  {sec.disclosure.map((disclosure, yIdx) => (
                    <tr
                      key={yIdx}
                      className={yIdx % 2 === 0 ? "bg-white" : "bg-[#F4F4F4]"}
                    >
                      <td className="p-2 border border-gray-300">
                        {disclosure.title}
                      </td>
                      <td className="p-2 border border-gray-300  hover:text-blue-600 hover:underline cursor-pointer">
                         <div className="px-6  flex justify-center">
                            <a
                                href={disclosure.file}
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
          )}
        </div>
      ))}
    </div>
  );
};

export default StockExchangeDisclosure;
