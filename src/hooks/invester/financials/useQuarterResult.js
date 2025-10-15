import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { getAllBlogs, getBlogDetailsAtom } from "../../../state/blogs/blogsState";
import { useState } from "react";
import conf from "../../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getQuarterResult } from "../../../state/investor/inverstorState";

const useQuarterResult = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [quarterResult , setQuarterResult] = useRecoilState(getQuarterResult);
  const [quarterResultDetails , setQuarterResultDetails] = useState({})
  const fetchQuarterResult = async () => {
    setLoading(true);
    // setQuarterResultDetails({})
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/quarterly-results`,
      });
      if (res?.data) {
        setQuarterResult(res?.data);
        console.log("All Quarter Result", res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  };

  const addQuarterResult = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/quarterly-results`,
        data,
      });
      if (res?.data) {
        toast.success("Quarter Result Added");
        console.log("response create", res);
        setLoading(false);
        // navigate("/investors");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchQuarterlyResultById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/quarterly-results/${id}`,
      });
      if (res?.data) {
        console.log("response getSingleBlog", res?.data);
        setLoading(false);
        setQuarterResultDetails(res?.data);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateQuarterlyResult = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/quarterly-results/${id}`,
        data,
      });
      if (res?.success) {
        fetchQuarterResult()
        toast.success("Result Updated");
        console.log("response update", res);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteQuarterlyResult = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Result ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/quarterly-results/${id}`,
        });
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchQuarterResult()
        }
        if (res) {
          toast.success("Deleted Successfully")
          fetchQuarterResult()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
    const deleteSingleQuarterlyResult = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Report ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/quarterly-results/reports/${id}`,
        });
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchQuarterResult()
          toast.success("Deleted Successfully")
        }
        
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };

  return {
    fetchQuarterResult,
    loading,
    quarterResult,
    addQuarterResult,
    deleteQuarterlyResult,
    deleteSingleQuarterlyResult,
    updateQuarterlyResult,
    fetchQuarterlyResultById,
    quarterResultDetails
  }
}

export default useQuarterResult