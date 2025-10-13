import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { useState } from "react";
import conf from "../../../config";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getStockExchangeDisclosure30Info } from "../../../state/investor/inverstorState";

const useStockExchangeDisclosure30 = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false)
  const [stockExchangeDisclosure30 , setStockExchangeDisclosure30] = useRecoilState(getStockExchangeDisclosure30Info);
  const [stockExchangeDisclosure30Details , setStockExchangeDisclosure30Details] = useState({})

  const fetchStockExchangeDisclosure30 = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/reg30/sections/full`,
      });
      if (res?.data) {
        setStockExchangeDisclosure30(res?.data);
        console.log("All Stock Exchange Disclosure 30", res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching :", error);
      setLoading(false);
    }
  };

  const addStockExchangeDisclosure30Title = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/reg30/sections/with-entries`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Added Successfully");
        console.log("response create", res);
        setLoading(false);
        fetchStockExchangeDisclosure30()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

//   const fetchPolicesById= async (id) => {
//     setLoading(true);
//      try {
//       const res = await fetchData({
//         method: "GET",
//         url: `${conf.apiBaseUrl}user/av-records/${id}`,
//       });
//       if (res?.data) {
//         setPolicesDetails(res?.data);
//         console.log("response ", res?.data);
//         setLoading(false);
//        }
//     } catch (error) {
//       console.error("Error fetching:", error);
//       setLoading(false);
//     }}

  const updateStockExchangeDisclosure30 = async (sectionId , entryId , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}api/admin/reg30/sections/${sectionId}/entries/${entryId}`,
        data,
      });
      if (res?.message === "Updated") {
          toast.success("Updated Successfully");
          console.log("response update", res);
          setLoading(false);
          fetchStockExchangeDisclosure30()
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

//     const deletePolices = async (id) => {
//     const result = await confirmAlert(
//       "Do you really want to delete this Result ?"
//     );
//     if (result.isConfirmed) {
//       setLoading(true);
//       try {
//         const res = await fetchData({
//           method: "DELETE",
//           url: `${conf.apiBaseUrl}admin/av-records/${id}`,
//         });
//         if (res?.message === "Deleted") {
//           Swal.fire({
//             title: "Deleted!",
//             text: res.message,
//             icon: "success",
//             confirmButtonText: "Okay",
//           });
//           fetchPolices()
//         }
//       } catch (error) {
//         console.error("Error Deleting Result", error);
//         setLoading(false);
//       }
//     }
//   };
  

  return {
    fetchStockExchangeDisclosure30,
    loading,
    stockExchangeDisclosure30,
    addStockExchangeDisclosure30Title,
    stockExchangeDisclosure30Details,
    setStockExchangeDisclosure30Details,
    updateStockExchangeDisclosure30
  }
}

export default useStockExchangeDisclosure30