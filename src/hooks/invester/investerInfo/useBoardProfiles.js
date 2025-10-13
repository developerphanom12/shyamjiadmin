import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { useState } from "react";
import conf from "../../../config";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getBoardProfiles } from "../../../state/investor/inverstorState";

const useBoardProfiles = () => {
  const [fetchData] = useFetch();
//   const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [boardProfiles , setBoardProfiles] = useRecoilState(getBoardProfiles);
  const [boardProfileDetails , setBoardProfileDetails] = useState({})
  const fetchBoardProfiles = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/board-profiles`,
      });
      if (res?.data) {
        setBoardProfiles(res?.data?.data);
        console.log("All Board Profiles", res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching board profiles:", error);
      setLoading(false);
    }
  };

  const addBoardProfile = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/board-profiles`,
        data,
      });
      if (res?.message === "Created") {
        toast.success("Board Profile Added");
        console.log("response create", res);
        setLoading(false);
        fetchBoardProfiles()
        
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchBoardProfileById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}user/board-profiles/${id}`,
      });
      if (res?.data) {
        setBoardProfileDetails(res?.data);
        console.log("response ", res?.data);
        setLoading(false);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateBoardProfile = async (id , data) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/board-profiles/${id}`,
        data,
      });
      if (res?.data) {
          toast.success("Board Profile Updated");
          console.log("response update", res);
          setLoading(false);
          fetchBoardProfiles()
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteBoardProfile = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Result ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/board-profiles/${id}`,
        });
        if (res?.message === "Deleted") {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchBoardProfiles()
        }
      } catch (error) {
        console.error("Error Deleting Result", error);
        setLoading(false);
      }
    }
  };
  

  return {
    fetchBoardProfiles,
    loading,
    boardProfiles,
    addBoardProfile,
    fetchBoardProfileById,
    boardProfileDetails,
    setBoardProfileDetails,
    updateBoardProfile,
    deleteBoardProfile,
  }
}

export default useBoardProfiles