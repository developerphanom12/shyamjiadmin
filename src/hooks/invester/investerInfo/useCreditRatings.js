import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { useState } from "react";
import conf from "../../../config";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getCreditRatings } from "../../../state/investor/inverstorState";

const useCreditRatings = () => {
  const [fetchData] = useFetch();
//   const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [creditRatings , setCreditRatings] = useRecoilState(getCreditRatings);
  const [creditRatingsDetails , setCreditRatingsDetails] = useState({})
  const fetchCreditRatings = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/credit-ratings`,
      });
      if (res?.data) {
        setCreditRatings(res?.data?.data);
        console.log("All Credit Ratings", res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching credit ratings:", error);
      setLoading(false);
    }
  };

  const addCreditRatings = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/credit-ratings`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Credit Rating Added");
        console.log("response create", res);
        setLoading(false);
        fetchCreditRatings()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchCreditRatingsById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/credit-ratings/${id}`,
      });
      if (res?.data) {
        setCreditRatingsDetails(res?.data);
        console.log("response ", res?.data);
        setLoading(false);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateCreditRatings = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/credit-ratings/${id}`,
        data,
      });
      if (res?.data) {
          toast.success("Credit Rating Updated");
          console.log("response update", res);
          setLoading(false);
          fetchCreditRatings()
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteCreditRatings = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Result ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/credit-ratings/${id}`,
        });
        if (res?.message === "Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchCreditRatings()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
  

  return {
    fetchCreditRatings,
    loading,
    creditRatings,
    addCreditRatings,
    fetchCreditRatingsById,
    creditRatingsDetails,
    setCreditRatingsDetails,
    updateCreditRatings,
    deleteCreditRatings,
    
  }
}

export default useCreditRatings