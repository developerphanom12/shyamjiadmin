import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { getAllBlogs, getBlogDetailsAtom } from "../../../state/blogs/blogsState";
import { useState } from "react";
import conf from "../../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getStockExchange } from "../../../state/investor/inverstorState";

const useStockExchange = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [stockExchange , setStockExchange] = useRecoilState(getStockExchange);
  const [stockExchangeDetails , setStockExchangeDetails] = useState({})
  const fetchStockExchange = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/stockExchange-information`,
      });
      if (res?.data) {
        setStockExchange(res?.data?.data);
        console.log("All Stock Exchange", res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching stock exchange:", error);
      setLoading(false);
    }
  };

  const addStockExchange = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/stockExchange-information`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Stock Exchange Added");
        console.log("response create", res);
        setLoading(false);
        fetchStockExchange()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchStockExchangeById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/stockExchange-information/${id}`,
      });
      if (res?.data) {
        setStockExchangeDetails(res?.data);
        console.log("response getSingleBlog", res?.data);
        setLoading(false);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateStockExchange = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/stockExchange-information/${id}`,
        data,
      });
      if (res?.data) {
        fetchStockExchange()
        toast.success("Stock Exchange Updated");
        console.log("response update", res);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteStockExchange = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Result ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/stockExchange-information/${id}`,
        });
        if (res?.message === "Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchStockExchange()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
  

  return {
    fetchStockExchange,
    loading,
    stockExchange,
    addStockExchange,
    fetchStockExchangeById,
    stockExchangeDetails,
    setStockExchangeDetails,
    updateStockExchange,
    deleteStockExchange,
  }
}

export default useStockExchange