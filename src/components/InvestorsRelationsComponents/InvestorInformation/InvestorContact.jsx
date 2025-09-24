
import React from 'react';

const InvestorContact = () => {
  const contactDetails = [
    {
      title: "Company Secretary & Compliance Officer",
      name: "Mr. Sanjay Chaurey",
      company: "Pratap Snacks Limited",
      address: "Khasra No. 378/2, Neemsar Road,",
      addressLine2: "Near Makrana House, Palda,",
      city: "Indore - 452 020 (M.P.)",
      phone: "(91 731) 2437679",
      fax: "(91 731) 2437605",
      email: "complianceofficer@yellowdiamond.in",
      website: "www.yellowdiamond.in"
    },
    {
      title: "Nodal Officer under IEPF",
      name: "Mr. Sanjay Chaurey",
      phone: "(91 731) 2437679",
      email: "complianceofficer@yellowdiamond.in"
    },
    {
      title: "Share Transfer Agent",
      name: "KFin Technologies Limited",
      subtitle: "Corporate Registry"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className=" px-6 py-1 border-b border-gray-200">
          <h3 className="font-semibold text-black text-lg">
            Investor Grievances Redressal Contact Details
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          
          {/* Company Secretary & Compliance Officer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 text-base mb-2">
                  {contactDetails[0].title}
                </h4>
                <p className="text-gray-700 font-medium">{contactDetails[0].name}</p>
                <p className="text-gray-600 text-sm">{contactDetails[0].company}</p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-600 text-sm">{contactDetails[0].address}</p>
                <p className="text-gray-600 text-sm">{contactDetails[0].addressLine2}</p>
                <p className="text-gray-600 text-sm">{contactDetails[0].city}</p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Tel:</span> {contactDetails[0].phone}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Fax:</span> {contactDetails[0].fax}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Email:</span> 
                  <a href={`mailto:${contactDetails[0].email}`} className="text-blue-600 hover:underline ml-1">
                    {contactDetails[0].email}
                  </a>
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Website:</span> 
                  <a href={`https://${contactDetails[0].website}`} className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    {contactDetails[0].website}
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Nodal Officer under IEPF */}
              <div>
                <h4 className="font-semibold text-gray-800 text-base mb-2">
                  {contactDetails[1].title}
                </h4>
                <p className="text-gray-700 font-medium mb-2">{contactDetails[1].name}</p>
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Tel:</span> {contactDetails[1].phone}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Email:</span> 
                    <a href={`mailto:${contactDetails[1].email}`} className="text-blue-600 hover:underline ml-1">
                      {contactDetails[1].email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Share Transfer Agent */}
              <div>
                <h4 className="font-semibold text-gray-800 text-base mb-2">
                  {contactDetails[2].title}
                </h4>
                <p className="text-gray-700 font-medium">{contactDetails[2].name}</p>
                <p className="text-gray-600 text-sm">{contactDetails[2].subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorContact;

