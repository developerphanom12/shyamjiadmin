import './Dashboard.css';
import productIcon from '../assets/product.svg';
import blogIcon from '../assets/blog.svg';
import careerIcon from '../assets/career.svg';
import distributorIcon from '../assets/distributor.svg';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Welcome Back, Admin!</h2>
      <div className="stats">
        <div className="card">
          <div className="card-text">
            <h4>Total Products</h4>
            <p>80</p>
          </div>
          <div className="icon-container orange">
            <img src={productIcon} alt="Product" className="svg-icon" />
          </div>
        </div>

        <div className="card">
          <div className="card-text">
            <h4>Total Blogs</h4>
            <p>92</p>
          </div>
          <div className="icon-container orange">
            <img src={blogIcon} alt="Blog" className="svg-icon" />
          </div>
        </div>

        <div className="card">
          <div className="card-text">
            <h4>Total Careers</h4>
            <p>4</p>
          </div>
          <div className="icon-container orange">
            <img src={careerIcon} alt="Career" className="svg-icon" />
          </div>
        </div>

        <div className="card">
          <div className="card-text">
            <h4>Distributor Requests</h4>
            <p>80</p>
          </div>
          <div className="icon-container orange">
            <img src={distributorIcon} alt="Distributor" className="svg-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
