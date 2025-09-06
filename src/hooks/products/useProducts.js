import { useRecoilState } from "recoil";
import useFetch from "../useFetch";
import { getAllProducts, getProductDetailsAtom } from "../../state/products/productsState";
import { useState } from "react";
import conf from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";


const useProducts = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [allProducts, setAllProducts] = useRecoilState(getAllProducts)
  const [productDetails, setProductDetails] = useState(getProductDetailsAtom)
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products`,
      });
      if (res) {
        setAllProducts(res);
        console.log("res", res);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  };

  const addProduct = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}products`,
        data,
      });
      if (res.success) {
        toast.success("Product Added");
        console.log("response create", res);
        setLoading(false);
        navigate("/products");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  };

  const fetchProductById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/${id}`,
      });
      if (res.success) {
        console.log("response getSingleProduct", res?.product);
        setLoading(false);
        setProductDetails(res?.product);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateProduct = async (id, data)=>{
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}products/${id}`,
        data,
      });
      if (res.success) {
        fetchAllProducts()
        toast.success("Product Updated");
        console.log("response update", res);
        setLoading(false);
        navigate("/products");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteUser = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this product ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}products/${id}`,
        });
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchAllProducts();
        }
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        setLoading(false);
      }
    }
  };

  return {
    fetchAllProducts,
    loading,
    allProducts,
    addProduct,
    fetchProductById,
    productDetails,
    updateProduct,
    deleteUser,
  }
}

export default useProducts