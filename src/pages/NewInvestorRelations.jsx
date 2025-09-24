import React, { useState } from "react";
// import Images from "../../assets/Images";
import QuarterlyResults from "../components/InvestorsRelationsComponents/Financials/QuarterlyResults";
import NewspaperPublication from "../components/InvestorsRelationsComponents/Financials/NewspaperPublication";
import AnnualResults from "../components/InvestorsRelationsComponents/Financials/AnnualResults";
import AnnualReturns from "../components/InvestorsRelationsComponents/Financials/AnnualReturns";
import SubsidiaryFinancial from "../components/InvestorsRelationsComponents/Financials/SubsidiaryFinancial";
import StockExchangeInfo from "../components/InvestorsRelationsComponents/InvestorInformation/StockExchangeInfo";
import InvestorContact from "../components/InvestorsRelationsComponents/InvestorInformation/InvestorContact";
import Prospectus from "../components/InvestorsRelationsComponents/InvestorInformation/Prospectus";
import BoardProfiles from "../components/InvestorsRelationsComponents/InvestorInformation/BoardProfiles";
import CorporatePresentation from "../components/InvestorsRelationsComponents/InvestorInformation/CorporatePresentation";
import ShareholdersInfo from "../components/InvestorsRelationsComponents/InvestorInformation/ShareholdersInfo";
import StockExchangeDisclosure from "../components/InvestorsRelationsComponents/InvestorInformation/StockExchangeDisclosure";
import StockExchangeDisclosureOthers from "../components/InvestorsRelationsComponents/InvestorInformation/StockExchangeDisclosureOthers";
import Circulars from "../components/InvestorsRelationsComponents/InvestorInformation/Circulars";
import ShareHoldingPattern from "../components/InvestorsRelationsComponents/InvestorInformation/ShareHoldingPattern";
import CreditRatings from "../components/InvestorsRelationsComponents/InvestorInformation/CreditRatings";
import SchemeOfAmalgamation from "../components/InvestorsRelationsComponents/InvestorInformation/SchemeOfAmalgamation";
import DisclosuresUnderRegulations from "../components/InvestorsRelationsComponents/InvestorInformation/DisclosuresUnderRegulations";
import PolicesCodes from "../components/InvestorsRelationsComponents/CorporateGoverance/PolicesCodes";
import ConstitutionOfCommiteess from "../components/InvestorsRelationsComponents/CorporateGoverance/ConstitutionOfCommiteess";
import InvestorTabsBg1 from "../assets/InvestorTabsBg1.png";
import InvestorTabsBg2 from "../assets/InvestorTabsBg2.png";

const NewInvestorRelations = () => {
    const categories = [
        {
            title: "FINANCIALS",
            items: [
                "Quarterly Results",
                "Newspaper Publication",
                "Annual Reports",
                "Annual Returns",
                "Subsidiary Financial",
            ],
        },
        {
            title: "INVESTOR INFORMATION",
            items: [
                "Stock Exchange Information",
                "Investor Contact",
                "Prospectus",
                "Board Profiles",
                "Corporate Presentation",
                "Shareholders Information",
                "Stock-Exchange-Disclosures-Regulation-30",
                "Stock Exchange Disclosures-Others",
                "Circulars",
                "Shareholding Pattern",
                "Credit Rating",
                "Scheme of Amalgamation",
                "Disclosures Under Regulation 46 Of SEBI (LODR) Regulations"
            ],
        },
        {
            title: "CORPORATE GOVERNANCE",
            items: [
                "Polices, Codes, CSR Projects And Other",
                "Constitution Of Committees",
            ],
        },

    ];

    const [selectedCategory, setSelectedCategory] = useState("Quarterly Results");

    // Component mapping
    const renderRightComponent = () => {
        switch (selectedCategory) {
              case "Quarterly Results":
                return <QuarterlyResults />;
              case "Newspaper Publication":
                return <NewspaperPublication />;
              case "Annual Reports":
                return <AnnualResults />;
              case "Annual Returns":
                return <AnnualReturns />;
              case "Subsidiary Financial":
                return <SubsidiaryFinancial />;
              case "Stock Exchange Information":
                return <StockExchangeInfo />;
              case "Investor Contact":
                return <InvestorContact />;
              case "Prospectus":
                return <Prospectus />;
              case "Board Profiles":
                return <BoardProfiles />;
              case "Corporate Presentation":
                return <CorporatePresentation />;
              case "Shareholders Information":
                return <ShareholdersInfo />;
              case "Stock-Exchange-Disclosures-Regulation-30":
                return <StockExchangeDisclosure />;
              case "Stock Exchange Disclosures-Others":
                return <StockExchangeDisclosureOthers />;
              case "Circulars":
                return <Circulars />;
              case "Shareholding Pattern":
                return <ShareHoldingPattern />;
              case "Credit Rating":
                return <CreditRatings/>;
              case "Scheme of Amalgamation":
                return <SchemeOfAmalgamation/>;
              case "Disclosures Under Regulation 46 Of SEBI (LODR) Regulations":
                return <DisclosuresUnderRegulations/>;
              case "Polices, Codes, CSR Projects And Other":
                return <PolicesCodes/>;
              case "Constitution Of Committees":
                return <ConstitutionOfCommiteess/>;
            default:
                return <div className="p-4">No data available</div>;
        }
    };

    return (
        <div className="min-h-screen sm:pt-16">
            <div className="flex justify-start px-4">
                <h3 className="text-2xl font-semibold">Welcome Back , Admin !</h3>
            </div>
            {/* Content */}
            <div className=" mx-auto mt-3 px-4">
                {/* Desktop and Tablet Layout */}
                <div className="hidden md:grid md:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div>
                        {categories.map((cat, idx) => (
                            <div key={idx} className="">
                                {/* Category Title */}
                                <div className="bg-[#FFAD00] relative text-white font-bold px-4 py-2 overflow-hidden">
                                    <img
                                        src={InvestorTabsBg1}
                                        alt="bg"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <span className="relative z-10">{cat.title}</span>
                                </div>

                                {/* Items */}
                                <ul className="border border-gray-300">
                                    {cat.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className={`px-4 py-2 border-b border-gray-300 font-semibold last:border-b-0 hover:text-yellow-400 hover:underline cursor-pointer ${selectedCategory === item ? "text-[#E60118] font-medium" : ""
                                                }`}
                                            onClick={() => setSelectedCategory(item)}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-2">
                        <div className="bg-[#FFAD00] relative text-white font-bold px-4 py-2 overflow-hidden">
                            <img
                                src={InvestorTabsBg2}
                                alt="bg"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <span className="relative z-10">{selectedCategory}</span>
                        </div>
                        <div className="">
                            {renderRightComponent()}
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="mb-4">
                            {/* Category Title */}
                            <div className="bg-[#FFAD00] relative text-white font-bold px-4 py-2 overflow-hidden">
                                <img
                                    src={InvestorTabsBg1}
                                    alt="bg"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <span className="relative z-10">{cat.title}</span>
                            </div>

                            {/* Items with inline content */}
                            <ul className="border border-gray-300">
                                {cat.items.map((item, i) => (
                                    <div key={i}>
                                        <li
                                            className={`px-4 py-2 border-b border-gray-300 font-semibold cursor-pointer ${selectedCategory === item ? "text-[#E60118] font-medium bg-gray-50" : ""
                                                }`}
                                            onClick={() => setSelectedCategory(selectedCategory === item ? null : item)}
                                        >
                                            {item}
                                        </li>
                                        
                                        {/* Content appears below active item in mobile */}
                                        {selectedCategory === item && (
                                            <div className="border-b border-gray-300">
                                                <div className="bg-[#FFAD00] relative text-white font-bold px-4 py-2 overflow-hidden">
                                                    <img
                                                        src={InvestorTabsBg2}
                                                        alt="bg"
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                    <span className="relative z-10">{selectedCategory}</span>
                                                </div>
                                                <div className="bg-white">
                                                    {renderRightComponent()}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewInvestorRelations;
