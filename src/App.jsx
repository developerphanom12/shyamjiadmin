import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

import ProductManagement from "./pages/ProductManagement";
import AddProduct from "./pages/AddProduct";

import BlogManagement from "./pages/BlogManagement";
import AddBlog from "./pages/AddBlog";

import "./App.css";
import Contact from "./pages/Contact";
import AddContact from "./pages/AddContact";
// import Supports from "./pages/Supports";
import Banner from "./pages/Banner";
import InvestorRelations from "./pages/InvestorRelations";
import Newsletter from "./pages/Newsletter";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import EditProduct from "./pages/EditProducts";
import EditBlog from "./pages/EditBlog";

// Layout for all authenticated pages
function AdminLayout() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <div className="page-content">
          <Outlet /> {/* Child routes render here */}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/" element={<LoginPage />} />
           <Route element={<ProtectedRoute />}>
           
        {/* Routes with Sidebar + Navbar */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/blogs" element={<BlogManagement />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/blogs/edit/:id" element={<EditBlog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/add-contact" element={<AddContact />} />
          {/* <Route path="/support" element={<Supports />} /> */}
          <Route path="/banner" element={<Banner />} />
          <Route path="/investors/*" element={<InvestorRelations />} />
          <Route path="/newsletter" element={<Newsletter />} />
        </Route>
           </Route>
      </Routes>
    </Router>
  );
}

export default App;
