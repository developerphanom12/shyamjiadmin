import './Navbar.css';
import { FiBell, FiSearch } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import profile from '../assets/ritik.jpg';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Add event listener when dropdown is open
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="navbar hidden md:flex">
      <div className="search-container">
        <span className="search-icon"><FiSearch /></span>
        <input type="text" placeholder="Search" className="search-box" />
      </div>

      <div className="nav-right">
        {/* <FiBell className="bell-icon" /> */}

        <div className="profile-section" ref={dropdownRef} onClick={handleToggleDropdown}>
          <span className="profile-name">Admin</span>
          <FaChevronDown className="dropdown-icon" />

          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item rounded-lg" onClick={handleLogout}>
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