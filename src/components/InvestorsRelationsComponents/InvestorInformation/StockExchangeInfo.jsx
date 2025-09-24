import React from 'react';
import { FaDownload } from 'react-icons/fa';

const StockExchangeInfo = () => {
  const subsidiaryData = [
    {
      reports: [
        {
          nameofexchange: "Audited Financial Statements",
          address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          stockcode: "94759"
        },
        {
          nameofexchange: "Audited Financial Statements",
          address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          stockcode: "3499"
        },
        
      ]
    },
    {
       reports: [
        {
          nameofexchange: "Audited Financial Statements",
          address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          stockcode: "94759"
        },
        {
          nameofexchange: "Audited Financial Statements",
          address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          stockcode: "3499"
        },
        
      ]
    },
    {
       reports: [
        {
          nameofexchange: "Audited Financial Statements",
          address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          stockcode: "94759"
        },
        {
          nameofexchange: "Audited Financial Statements",
          address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          stockcode: "3499"
        },
        
      ]
    },
    {
       reports: [
        {
          nameofexchange: "Audited Financial Statements",
          address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          stockcode: "94759"
        },
        {
          nameofexchange: "Audited Financial Statements",
          address: "Red Rotopack Pvt. Ltd - Audited Accounts 31st March, 2022",
          stockcode: "3499"
        },
        
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto ">
      <div className="bg-white  shadow-lg overflow-hidden border border-gray-200">
        
            {/* Company Header */}
            <div className="px-1 py-2">
              <h3 className="font-semibold text-black text-md">
               The equity Shares of the Company are listed on the following 2 Stock Exchanges in India:
              </h3>
            </div>
        {subsidiaryData.map((subsidiary, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0">
            

            {/* Reports Table */}
            <div className="bg-white">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-[#F7BF57] border-b border-gray-300">
                <div className="px-6 py-3 font-semibold text-black">
                  Name Of Stock Exchange
                </div>
                <div className="px-6 py-3 font-semibold text-black border-x border-gray-300">
                  Address
                </div>
                <div className="px-6 py-3 font-semibold text-black text-center">
                  Stock Codes
                </div>
              </div>

              {/* Table Rows */}
              {subsidiary.reports.map((report, rIndex) => (
                <div 
                  key={rIndex}
                  className={`grid grid-cols-3 items-center border-b border-gray-200 last:border-b-0 ${
                    rIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                  }`}
                >
                  <div className="px-6 py-4 text-sm text-gray-800">
                    {report.nameofexchange}
                  </div>
                  <div className="px-6 py-4 text-sm text-gray-800 border-x border-gray-300">
                    {report.address}
                  </div>
                  <div className="px-6 py-4 text-sm text-gray-800 border-x border-gray-300">
                    {report.stockcode}
                  </div>
                  {/* <div className="px-6 py-4 flex justify-center">
                    <a
                      href={report.file}
                      className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                      download
                    >
                      Download <FaDownload className="text-xs" />
                    </a>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockExchangeInfo;
