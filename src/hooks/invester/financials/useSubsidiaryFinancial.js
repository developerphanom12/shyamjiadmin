import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { getAllBlogs, getBlogDetailsAtom } from "../../../state/blogs/blogsState";
import { useState } from "react";
import conf from "../../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getSubsidiaryFinancials } from "../../../state/investor/inverstorState";

const useSubsidiaryFinancial = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [subsidiaryFinancials , setSubsidiaryFinancials ] = useRecoilState(getSubsidiaryFinancials);
  const [subsidiaryFinancialDetails , setSubsidiaryFinancialDetails] = useState({})

  const fetchSubsidiaryFinancials = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/subsidiary-financials`,
      });
      if (res?.data) {
        setSubsidiaryFinancials(res?.data);
        console.log("All Subsidiary Financials", res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching stock exchange:", error);
      setLoading(false);
    }
  };

  const addSubsidiaryFinancial = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/subsidiary-financials`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Subsidiary Financial Added");
        console.log("response create", res);
        setLoading(false);
        fetchSubsidiaryFinancials()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchSubsidiaryFinancialById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/subsidiary-financials/${id}`,
      });
      if (res?.data) {
        setSubsidiaryFinancialDetails(res?.data);
        console.log("response getSingleBlog", res?.data);
        setLoading(false);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateSubsidiaryFinancialFields = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/subsidiary-financials/${id}`,
        data,
      });
      if (res?.data) {
        fetchSubsidiaryFinancials()
        toast.success("Fields Updated");
        console.log("response update", res);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

  const updateSubsidiaryFinancialFile = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/subsidiary-financials/${id}`,
        data,
      });
      if (res?.data) {
        fetchSubsidiaryFinancials()
        toast.success("File Updated");
        console.log("response update", res);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteSubsidiaryFinancial = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Result ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/subsidiary-financials/${id}`,
        });
        if (res?.message === "Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchSubsidiaryFinancials()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
  

  return {
    fetchSubsidiaryFinancials,
    loading,
    subsidiaryFinancials,
    addSubsidiaryFinancial,
    fetchSubsidiaryFinancialById,
    subsidiaryFinancialDetails,
    setSubsidiaryFinancialDetails,
    updateSubsidiaryFinancialFields,
    updateSubsidiaryFinancialFile,
    deleteSubsidiaryFinancial,
   
  }
}

export default useSubsidiaryFinancial