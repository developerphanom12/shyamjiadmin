import './Navbar.css';
import { FiBell, FiSearch } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import profile from '../assets/ritik.jpg';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <div className="navbar">

      <div className="search-container">
        <span className="search-icon"><FiSearch /></span>
        <input type="text" placeholder="Search" className="search-box" />
      </div>

      <div className="nav-right">
        {/* <FiBell className="bell-icon" /> */}

        <div className="profile-section" onClick={handleToggleDropdown}>

          <span className="profile-name">Admin</span>

          <FaChevronDown className="dropdown-icon" />

          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
