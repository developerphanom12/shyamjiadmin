import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { getAllBlogs, getBlogDetailsAtom } from "../../../state/blogs/blogsState";
import { useState } from "react";
import conf from "../../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getInvestorContact } from "../../../state/investor/inverstorState";

const useInvestorContact = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [investorContact , setInvestorContact] = useRecoilState(getInvestorContact);
  const [investorContactDetails , setInvestorContactDetails] = useState({})
  const fetchInvestorContact = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/investor-contacts`,
      });
      if (res?.data) {
        setInvestorContact(res?.data?.data);
        console.log("All Investor Contact", res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching investor contact:", error);
      setLoading(false);
    }
  };

  const addInvestorContact = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/investor-contacts`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Investor Contact Added");
        console.log("response create", res);
        setLoading(false);
        fetchInvestorContact()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchInvestorContactById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/investor-contacts/${id}`,
      });
      if (res?.data) {
        setInvestorContactDetails(res?.data);
        console.log("response getSingleBlog", res?.data);
        setLoading(false);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateInvestorContact = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/investor-contacts/${id}`,
        data,
      });
      if (res?.data) {
          toast.success("Investor Contact Updated");
          console.log("response update", res);
          setLoading(false);
          fetchInvestorContact()
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteInvestorContact = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Result ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/investor-contacts/${id}`,
        });
        if (res?.message === "Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchInvestorContact()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
  

  return {
    fetchInvestorContact,
    loading,
    investorContact,
    addInvestorContact,
    fetchInvestorContactById,
    investorContactDetails,
    setInvestorContactDetails,
    updateInvestorContact,
    deleteInvestorContact,
  }
}

export default useInvestorContact