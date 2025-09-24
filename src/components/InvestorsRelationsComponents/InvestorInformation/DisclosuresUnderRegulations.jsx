import React, { useState, useEffect } from "react";

const DisclosuresUnderRegulations = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        srNo: 1,
        particulars: "Details of Company's Business",
        url: "https://www.yellowdiamond.in/about-us/#sectionE"
      },
      {
        srNo: 2,
        particulars: "Memorandum and Articles of Association",
        url: "https://www.yellowdiamond.in/wp-content/uploads/2024/09/MOA-and-AOA_PSL_2023-1.pdf"
      },
      {
        srNo: 3,
        particulars: "Composition of Committees of Board of Directors",
        url: "https://www.yellowdiamond.in/investor-relations/constitution-of-committees/"
      },
      {
        srNo: 4,
        particulars: "Terms & Conditions of appointment of Independent Directors",
        url: "https://www.yellowdiamond.in/wp-content/uploads/2018/01/Terms-and-conditions-ID.pdf"
      },
      {
        srNo: 5,
        particulars: "Code of Conduct of Board of Directors and Senior Management Personnel",
        url: "https://www.yellowdiamond.in/wp-content/uploads/2024/09/Code-of-Conduct-for-Board-of-Directors-and-Senior-Management-2.pdf"
      },
      {
        srNo: 6,
        particulars: "Vigil Mechanism / Whistle Blower Policy",
        url: "https://www.yellowdiamond.in/wp-content/uploads/2024/09/Vigil-Mechanism-Whistle-Blower-Policy.pdf"
      },
      {
        srNo: 7,
        particulars: "Criteria of making payments to Non-Executive Directors",
        url: "https://www.yellowdiamond.in/investor-relations/annual-reports/"
      },
      {
        srNo: 8,
        particulars: "Policy on dealing with Related Party Transactions",
        url: "https://www.yellowdiamond.in/wp-content/uploads/2024/09/Policy-on-Related-Party-Transactions.pdf"
      }
    ]);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F4F4F4] border-b border-gray-300">
                <th className="px-6 py-3 font-semibold text-gray-700 border-r border-gray-300 w-20">
                  Sr.No
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700 border-r border-gray-300">
                  Particulars as per LODR
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  URL
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((disclosure, yIdx) => (
                <tr
                  key={yIdx}
                  className={`border-b border-gray-200 ${
                    yIdx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300 font-medium">
                    {disclosure.srNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300">
                    {disclosure.particulars}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={disclosure.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                    >
                      {disclosure.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisclosuresUnderRegulations;
