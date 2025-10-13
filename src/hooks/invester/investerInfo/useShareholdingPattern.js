import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { useState } from "react";
import conf from "../../../config";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getShareholdingPattern } from "../../../state/investor/inverstorState";

const useShareholdingPattern = () => {
  const [fetchData] = useFetch();
//   const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [shareholdingPattern , setShareholdingPattern] = useRecoilState(getShareholdingPattern);
  const [shareholdingPatternDetails , setShareholdingPatternDetails] = useState({})
  const fetchShareholdingPattern = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/shareholding-patterns`,
      });
      if (res?.data) {
        setShareholdingPattern(res?.data?.data);
        console.log("All Shareholding Pattern", res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching shareholding pattern:", error);
      setLoading(false);
    }
  };

  const addShareholdingPattern = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/shareholding-patterns`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Shareholding Pattern Added");
        console.log("response create", res);
        setLoading(false);
        fetchShareholdingPattern()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchShareholdingPatternById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/shareholding-patterns/${id}`,
      });
      if (res?.data) {
        setShareholdingPatternDetails(res?.data);
        console.log("response ", res?.data);
        setLoading(false);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateShareholdingPattern = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/shareholding-patterns/${id}`,
        data,
      });
      if (res?.data) {
          toast.success("Shareholding Pattern Updated");
          console.log("response update", res);
          setLoading(false);
          fetchShareholdingPattern()
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteShareholdingPattern = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Result ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/shareholding-patterns/${id}`,
        });
        if (res?.message === "Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchShareholdingPattern()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
  

  return {
    fetchShareholdingPattern,
    loading,
    shareholdingPattern,
    addShareholdingPattern,
    fetchShareholdingPatternById,
    shareholdingPatternDetails,
    setShareholdingPatternDetails,
    updateShareholdingPattern,
    deleteShareholdingPattern,
    
  }
}

export default useShareholdingPattern