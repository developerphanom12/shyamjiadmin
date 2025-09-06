import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Sidebar.css';

import { MdDashboard } from 'react-icons/md';
import { FiBox, FiPhone} from 'react-icons/fi';
import { FaPenNib, FaUsers } from 'react-icons/fa';
// import { BiSupport } from 'react-icons/bi';
import { RiImageEditLine } from 'react-icons/ri';
import { IoNewspaperOutline } from 'react-icons/io5';

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="logo" />

      <div className="overview">Overviews</div>

      <nav className="nav-menu">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="menu-item">
            <MdDashboard className="icon" />
            Dashboard
          </span>
        </NavLink>

        <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="menu-item">
            <FiBox className="icon" />
            Product Management
          </span>
        </NavLink>

        <NavLink to="/blogs" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="menu-item">
            <FaPenNib className="icon" />
            Blog Management
          </span>
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="menu-item">
            <FiPhone className="icon" />
            Contact Us
          </span>
        </NavLink>

        <NavLink to="/investors" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="menu-item">
            <FaUsers className="icon" />
            Investor Relations
          </span>
        </NavLink>

        {/* <NavLink to="/support" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="menu-item">
            <BiSupport className="icon" />
            Supports
          </span>
        </NavLink> */}

        <NavLink to="/banner" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="menu-item">
            <RiImageEditLine className="icon" /> {/* Or use another relevant icon */}
            Banner
          </span>
        </NavLink>

        <NavLink to="/newsletter" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="menu-item">
            <IoNewspaperOutline className="icon" />
            Newsletter
          </span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
