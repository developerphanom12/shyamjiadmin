import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { useState } from "react";
import conf from "../../../config";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getCirculars } from "../../../state/investor/inverstorState";

const useCirculars = () => {
  const [fetchData] = useFetch();
//   const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [circulars , setCirculars] = useRecoilState(getCirculars);
  const [circularsDetails , setCircularsDetails] = useState({})
  const fetchCirculars = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/circulars`,
      });
      if (res?.data) {
        setCirculars(res?.data?.data);
        console.log("All Circulars", res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching circulars:", error);
      setLoading(false);
    }
  };

  const addCirculars = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/circulars`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Circulars Added");
        console.log("response create", res);
        setLoading(false);
        fetchCirculars()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchCircularsById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/circulars/${id}`,
      });
      if (res?.data) {
        setCircularsDetails(res?.data);
        console.log("response ", res?.data);
        setLoading(false);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateCirculars = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/circulars/${id}`,
        data,
      });
      if (res?.data) {
          toast.success("Circulars Updated");
          console.log("response update", res);
          setLoading(false);
          fetchCirculars()
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteCirculars = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Result ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/circulars/${id}`,
        });
        if (res?.message === "Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchCirculars()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
  

  return {
    fetchCirculars,
    loading,
    circulars,
    addCirculars,
    fetchCircularsById,
    circularsDetails,
    setCircularsDetails,
    updateCirculars,
    deleteCirculars,
  }
}

export default useCirculars