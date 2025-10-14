import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { useState } from "react";
import conf from "../../../config";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import {getStockExchangeDisclosureOthersInfo } from "../../../state/investor/inverstorState";

const useStockExchangeDisclosureOthers = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false)
  const [stockExchangeDisclosureOthers , setStockExchangeDisclosureOthers] = useRecoilState(getStockExchangeDisclosureOthersInfo);
  const [stockExchangeDisclosureOthersDetails , setStockExchangeDisclosureOthersDetails] = useState({})
  const fetchStockExchangeDisclosureOthers = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/reg30-others/sections/full`,
      });
      if (res?.data) {
        setStockExchangeDisclosureOthers(res?.data);
        console.log("All Stock Exchange Disclosure Others", res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching :", error);
      setLoading(false);
    }
  };

  const addStockExchangeDisclosureOthersTitle = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/reg30-others/sections/with-entries`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Added Successfully");
        console.log("response create", res);
        setLoading(false);
        fetchStockExchangeDisclosureOthers()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const updateStockExchangeDisclosureOthers = async (sectionId , entryId , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/reg30-others/sections/${sectionId}/entries/${entryId}`,
        data,
      });
      if (res?.message === "Updated") {
          toast.success("Updated Successfully");
          console.log("response update", res);
          setLoading(false);
          fetchStockExchangeDisclosureOthers()
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteStockExchangeDisclosureOthers = async (sectionId , entryId) => {
    const result = await confirmAlert(
      "Do you really want to delete this Entry ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/reg30-others/sections/${sectionId}/entries/${entryId}`,
        });
        if (res?.message === "Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchStockExchangeDisclosureOthers()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
  

  return {
      fetchStockExchangeDisclosureOthers,
      loading,
      stockExchangeDisclosureOthers,
      addStockExchangeDisclosureOthersTitle,
      setStockExchangeDisclosureOthersDetails,
      stockExchangeDisclosureOthersDetails,
      updateStockExchangeDisclosureOthers,
      deleteStockExchangeDisclosureOthers,
      
  }
}

export default useStockExchangeDisclosureOthers