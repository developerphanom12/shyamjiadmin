import { useNavigate, useLocation } from 'react-router-dom';
import patternBg from '../assets/pattern-bg.png';

const InvestorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    {
      title: 'FINANCIALS',
      menus: [
        { name: 'Quarterly Results', path: 'quarterly-results' },
        { name: 'Newspaper Publication', path: 'newspaper-publication' },
        { name: 'Annual Reports', path: 'annual-reports' },
        { name: 'Annual Returns', path: 'annual-returns' },
        { name: 'Subsidiary Financial', path: 'subsidiary-financial' }
      ]
    },
    {
      title: 'INVESTOR INFORMATION',
      menus: [
        { name: 'Stock Exchange Information', path: 'stock-exchange-info' },
        { name: 'Investor Contact', path: 'investor-contact' },
        { name: 'Prospectus', path: 'prospectus' },
        { name: 'Board Profiles', path: 'board-profiles' },
        { name: 'Corporate Presentation', path: 'corporate-presentation' },
        { name: 'Shareholders Information', path: 'shareholders-info' },
        { name: 'Stock-Exchange-Disclosures-Regulation-30', path: 'disclosures-reg-30' },
        { name: 'Stock Exchange Disclosures - Others', path: 'disclosures-others' },
        { name: 'Circulars', path: 'circulars' },
        { name: 'Shareholding Pattern', path: 'shareholding-pattern' },
        { name: 'Credit-Rating', path: 'credit-rating' },
        { name: 'Scheme Of Amalgamation', path: 'scheme-amalgamation' },
        { name: 'Disclosures under Regulation 46 of SEBI Regulations', path: 'disclosures-reg-46' }
      ]
    },
    {
      title: 'CORPORATE GOVERNANCE',
      menus: [
        { name: 'Polices, Codes, CSR Projects and Other', path: 'policies-codes' },
        { name: 'Constitution Of Committees', path: 'committees' }
      ]
    }
  ];

  return (
    <div className="investor-sidebar">
      {categories.map((section, sectionIndex) => (
        <div className="investor-section" key={sectionIndex}>
          <div className="investor-section-title">
            <img src={patternBg} alt="bg" className="pattern-bg" />
            <span>{section.title}</span>
          </div>

          <ul className="investor-menu-list">
            {section.menus.map((menu, menuIndex) => {
              const isQuarterlyResults = menu.path === 'quarterly-results';
              const isDefaultActive =
                location.pathname === '/investors' && isQuarterlyResults;
              const isActive =
                location.pathname.includes(menu.path) || isDefaultActive;

              return (
                <li
                  key={menuIndex}
                  className={`investor-menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => navigate(`/investors/${menu.path}`)}
                >
                  {menu.name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default InvestorSidebar;
