import './InvestorRelations.css';
import InvestorSidebar from '../components/InvestorSidebar';
import { Routes, Route } from 'react-router-dom';
import QuarterlyResultsForm from '../components/investorForms/QuarterlyResultsForm';
import AnnualReports from '../components/investorForms/AnnualReports';
import AnnualReturns from '../components/investorForms/AnnualReturns';
import SubsidiaryFinancial from '../components/investorForms/SubsidiaryFinancial';
import NewspaperPublication from '../components/investorForms/NewspaperPublication';
import StockInformation from '../components/investorForms/StockInformation';
import InvestorContact from '../components/investorForms/InvestorContact';
import Prospectus from '../components/investorForms/Prospectus';
import BoardProfiles from '../components/investorForms/BoardProfiles';
import Corprate from '../components/investorForms/Corprate';
import StakeholdersInfo from '../components/investorForms/StakeholdersInfo';
import DisclosuresRegulation from '../components/investorForms/DisclosuresRegulation';
import DisclosuresOther from '../components/investorForms/DisclosuresOther';
import Circulars from '../components/investorForms/Circulars';
import ShareholdingPattern from '../components/investorForms/ShareholdingPattern';
import CreditRating from '../components/investorForms/CreditRating';
import Amalgamation from '../components/investorForms/Amalgamation';
import SEBI from '../components/investorForms/SEBI';
import Policies from '../components/investorForms/Policies';
import Committees from '../components/investorForms/Committees';

const InvestorRelations = () => {
  return (
    <div className="investor-page">
      <div className="investor-header">
        <h2>Welcome Back, Admin!</h2>
        <button className="update-button">
          Update
        </button>
      </div>

      <div className="investor-content">
        <InvestorSidebar />

        <div className="investor-main">
          <Routes>
            {/* Default page */}
            <Route index element={<QuarterlyResultsForm />} />
            <Route path="quarterly-results" element={<QuarterlyResultsForm />} />
            <Route path="newspaper-publication" element={<NewspaperPublication />} />
            <Route path="annual-reports" element={<AnnualReports />} />
            <Route path="annual-returns" element={<AnnualReturns />} />
            <Route path="subsidiary-financial" element={<SubsidiaryFinancial />} />
            <Route path="stock-exchange-info" element={<StockInformation />} />
            <Route path="investor-contact" element={<InvestorContact />} />
            <Route path="prospectus" element={<Prospectus />} />
            <Route path="board-profiles" element={<BoardProfiles />} />
            <Route path="corporate-presentation" element={<Corprate />} />
            <Route path="shareholders-info" element={<StakeholdersInfo />} />
            <Route path="disclosures-reg-30" element={<DisclosuresRegulation />} />
            <Route path="disclosures-others" element={<DisclosuresOther />} />
            <Route path="circulars" element={<Circulars />} />
            <Route path="shareholding-pattern" element={<ShareholdingPattern />} />
            <Route path="credit-rating" element={<CreditRating />} />
            <Route path="scheme-amalgamation" element={<Amalgamation />} />
            <Route path="disclosures-reg-46" element={<SEBI />} />
            <Route path="policies-codes" element={<Policies />} />
            <Route path="committees" element={<Committees />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default InvestorRelations;
