import React from 'react';
import { FaDownload } from 'react-icons/fa';

const SubsidiaryFinancial = () => {
  const subsidiaryData = [
    {
      company: "Red Rotopack Pvt. Ltd. - 31st March, 2022",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          file: "#"
        }
      ]
    },
    {
      company: "Avadh Snacks Pvt. Ltd. - 31st March, 2022",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Avadh Snacks Pvt. Ltd - Audited Standalone Accounts 31st March, 2022",
          file: "#"
        }
      ]
    },
    {
      company: "Avadh Snacks Pvt. Ltd. - 31st March, 2021",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Avadh Snacks Pvt. Ltd - Audited Standalone Accounts 31st March, 2021",
          file: "#"
        }
      ]
    },
    {
      company: "Red Rotopack Pvt. Ltd. - 31st March, 2021",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2021",
          file: "#"
        }
      ]
    },
    {
      company: "Avadh Snacks Pvt. Ltd. - 31st March, 2020",
      reports: [
        {
          type: "Audited Financial Statements",
          description: "Avadh Snacks Pvt. Ltd - Audited Standalone Accounts 31st March, 2020",
          file: "#"
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        
        {subsidiaryData.map((subsidiary, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0">
            
            {/* Company Header */}
            <div className="bg-[#F7BF57] px-6 py-2">
              <h3 className="font-semibold text-black text-lg">
                {subsidiary.company}
              </h3>
            </div>

            {/* Reports Table */}
           {/* Reports Table */}
<div className="bg-white overflow-x-auto">
  <table className="min-w-full border border-gray-300">
    {/* Table Head */}
    <thead className="bg-[#F4F4F4]">
      <tr>
        <th className="px-6 py-3 font-semibold text-gray-700 text-left border-b border-gray-300">
          Report Type
        </th>
        <th className="px-6 py-3 font-semibold text-gray-700 text-left border-b border-gray-300 border-l ">
          Description
        </th>
        <th className="px-6 py-3 font-semibold text-gray-700 text-center border-b  border-l border-gray-300">
          Action
        </th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {subsidiary.reports.map((report, rIndex) => (
        <tr
          key={rIndex}
          className={rIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
        >
          <td className="px-6 py-4 text-sm text-gray-800">
            {report.type}
          </td>
          <td className="px-6 py-4 text-sm text-gray-800 border-l border-gray-300">
            {report.description}
          </td>
          <td className="px-6 py-4 text-center border-l border-gray-300">
            <a
              href={report.file}
              className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              download
            >
              Download <FaDownload className="text-xs" />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SubsidiaryFinancial;
