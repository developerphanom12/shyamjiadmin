import React, { useState, useEffect } from "react";

const ConstitutionOfCommiteess = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        name: "Rajesh Chaudhary",
        designation: "Chairman",
        auditCommittee: "Yes",
        csrCommittee: "Yes",
        nrCommittee: "Yes",
        srCommittee: "Yes",
        riskManagementCommittee: "Yes",
      },
      {
        name: "Rajesh Chaudhary",
        designation: "Chairman",
        auditCommittee: "Yes",
        csrCommittee: "Yes",
        nrCommittee: "Yes",
        srCommittee: "Yes",
        riskManagementCommittee: "Yes",
      },
    ]);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F4F4F4] border-b border-gray-300">
                <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300 ">
                  Name
                </th>
                <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                  Designation
                </th>
                <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                  Audit Committee
                </th>
                <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                  CSR Committee
                </th>
                <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                  NR Committee
                </th>
                <th className="px-1 py-2 font-semibold text-gray-700 border-r border-gray-300">
                  SR Committee
                </th>
                <th className="px-1 py-2 font-semibold text-gray-700">
                 Risk Management Committee
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((committee, yIdx) => (
                <tr
                  key={yIdx}
                  className={`border-b border-gray-200 ${
                    yIdx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300 font-medium">
                    {committee.name}
                  </td>
                  <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                    {committee.designation}
                  </td>
                  <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                    {committee.auditCommittee}
                  </td>
                  <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                    {committee.csrCommittee}
                  </td>
                  <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                    {committee.nrCommittee}
                  </td>
                  <td className="px-1 py-4 text-sm text-gray-800 border-r border-gray-300">
                    {committee.srCommittee}
                  </td>
                  <td className="px-1 py-4 text-sm text-gray-800">
                    {committee.riskManagementCommittee}
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

export default ConstitutionOfCommiteess;
