import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { useState } from "react";
import conf from "../../../config";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getPoliciesInfo } from "../../../state/investor/inverstorState";

const usePolices = () => {
  const [fetchData] = useFetch();
//   const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [polices , setPolices] = useRecoilState(getPoliciesInfo);
  const [policesDetails , setPolicesDetails] = useState({})

  const fetchPolices = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/av-records/grouped`,
      });
      if (res?.data) {
        setPolices(res?.data);
        console.log("All Polices", res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching :", error);
      setLoading(false);
    }
  };

  const addPolices = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/av-records`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Added Successfully");
        console.log("response create", res);
        setLoading(false);
        fetchPolices()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchPolicesById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/av-records/${id}`,
      });
      if (res?.data) {
        setPolicesDetails(res?.data);
        console.log("response ", res?.data);
        setLoading(false);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updatePolices = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/av-records/${id}`,
        data,
      });
      if (res?.data) {
          toast.success("Updated Successfully");
          console.log("response update", res);
          setLoading(false);
          fetchPolices()
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deletePolices = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Result ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/av-records/${id}`,
        });
        if (res?.message === "Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchPolices()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
  

  return {
    fetchPolices,
    polices,
    loading,
    addPolices,
    fetchPolicesById,
    updatePolices,
    policesDetails,
    setPolicesDetails,
    deletePolices,
  }
}

export default usePolices