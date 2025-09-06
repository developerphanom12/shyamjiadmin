import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import dummyProducts from '../data/dummyProducts';
import '../pages/ProductManagement.css';
import useProducts from '../hooks/products/useProducts';

const ProductManagement = () => {
  const navigate = useNavigate();
  const {fetchAllProducts , allProducts , deleteUser } = useProducts()
  const [products, setProducts] = useState(allProducts?.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = itemsPerPage ? Math.ceil(products.length / itemsPerPage) : 0;
  useEffect(()=>{
    fetchAllProducts()
  },[])

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  const handleItemsPerPageChange = (e) => {
    const value = Number(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteUser(id)
  };

  const currentProducts = itemsPerPage
    ? products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <div className="product-management-container">
      {/* Top Header */}
      <div className="top-header">
        <h2>Welcome Back, Admin!</h2>
        <button onClick={handleAddProduct} className="add-product-button">
          Add Product
        </button>
      </div>

      {/* Main Card */}
      <div className="main-card">
        <div className="product-management-header">
          <div>
            <h3>Product Management</h3>
            <p>Detailed Product Records For Quick Updates And Monitoring.</p>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts?.map((product) => (
                <tr key={product.id}>
                  <td><img src={product.image_url} alt={product.product_name} /></td>
                  <td>{product.product_name}</td>
                  <td>{product.product_price}</td>
                  <td className="product-actions">
                    <button onClick={() => handleEdit(product.id)}><FiEdit /></button>
                    <button onClick={() => handleDelete(product.id)}><RiDeleteBin6Line /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Controls */}
        <div className="bottom-controls">
          <div>
            Showing
            <select value={itemsPerPage || ''} onChange={handleItemsPerPageChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </div>

          <div className="record-info">
            Showing {currentProducts.length > 0 ? ((currentPage - 1) * itemsPerPage + 1) : 0} to {((currentPage - 1) * itemsPerPage + currentProducts.length)} out of {products.length} records
          </div>

          {/* Pagination */}
          <div className="pagination">
            {/* Previous Arrow */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="arrow-button"
            >
              <FiChevronLeft />
            </button>

            {/* Pagination Using Loop */}
            {(() => {
              const buttons = [];
              for (let page = 1; page <= totalPages; page++) {
                buttons.push(
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? 'active' : ''}
                  >
                    {page}
                  </button>
                );
              }
              return buttons;
            })()}

            {/* Next Arrow */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="arrow-button"
            >
              <FiChevronRight />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
