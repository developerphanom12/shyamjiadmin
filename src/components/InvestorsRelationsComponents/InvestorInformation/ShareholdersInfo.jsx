import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaDownload } from "react-icons/fa";

const ShareholdersInfo = () => {
  const [data, setData] = useState([]);
  const [openSection, setOpenSection] = useState("Postal Ballot"); // which section is open

  useEffect(() => {
    // Dummy data
    setData([
      {
        section: "Investor's Service Request",
        years: [], // no years here for now
      },
      {
        section: "Postal Ballot",
        years: [
          {
            year: "2024-25",
            notice: "Postal Ballot Notice",
            results: "Postal Ballot Results",
            forms: "",
          },
          {
            year: "2023-24",
            notice: "Postal Ballot Notice",
            results: "Postal Ballot Results",
            forms: "",
          },
          {
            year: "2022-23",
            notice: "Postal Ballot Notice",
            results: "Postal Ballot Results",
            forms: "",
          },
          {
            year: "2019-20",
            notice: "Postal Ballot Notice",
            results: "Postal Ballot Results",
            forms: "Postal Ballot Form",
          },
        ],
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
          {openSection === sec.section && sec.years.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-left">
                <thead>
                  <tr className="bg-[#F7BF57]">
                    <th className="p-2 border border-gray-300">
                      Particulars / Financial Year
                    </th>
                    <th className="p-2 border border-gray-300">
                      Notice - Postal Ballot
                    </th>
                    <th className="p-2 border border-gray-300">
                      Results - Postal Ballot
                    </th>
                    <th className="p-2 border border-gray-300">
                      Forms - Postal Ballot
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sec.years.map((yearRow, yIdx) => (
                    <tr
                      key={yIdx}
                      className={yIdx % 2 === 0 ? "bg-white" : "bg-[#F4F4F4]"}
                    >
                      <td className="p-2 border border-gray-300">
                        {yearRow.year}
                      </td>
                      <td className="p-2 border border-gray-300  hover:text-blue-600 hover:underline cursor-pointer">
                        {yearRow.notice}
                      </td>
                      <td className="p-2 border border-gray-300 hover:text-blue-600 hover:underline cursor-pointer">
                        {yearRow.results}
                      </td>
                      <td className="p-2 border border-gray-300 hover:text-blue-600 hover:underline cursor-pointer">
                        {yearRow.forms}
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

export default ShareholdersInfo;
