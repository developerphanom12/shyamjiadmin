import { useRecoilState } from "recoil";
import useFetch from "../../useFetch";
import { getAllBlogs, getBlogDetailsAtom } from "../../../state/blogs/blogsState";
import { useState } from "react";
import conf from "../../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../../utils/alertToast";
import { getShareholdersInfo } from "../../../state/investor/inverstorState";

const useShareholderInfo = () => {
    const [fetchData] = useFetch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [shareholdersInfo, setShareholdersInfo] = useRecoilState(getShareholdersInfo);
    const [shareholdersInfoDetails, setShareholdersInfoDetails] = useState({})

    const fetchShareholdersInfo = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/shareholders/sections/full`,
            });
            if (res?.data) {
                setShareholdersInfo(res?.data);
                console.log("All Shareholders Info", res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching shareholders info:", error);
            setLoading(false);
        }
    };

    const addShareholdersInfo = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}admin/shareholders/sections/with-entries`,
                data,
            });
            if (res?.message === "Created") {
                toast.success("Shareholders Info Added");
                console.log("response create", res);
                setLoading(false);
                fetchShareholdersInfo()

            }
        } catch (error) {
            console.error("Error fetching:", error);
            toast.error(error?.message);
            setLoading(false);
        }
    };

    //   const fetchInvestorContactById= async (id) => {
    //     setLoading(true);
    //      try {
    //       const res = await fetchData({
    //         method: "GET",
    //         url: `${conf.apiBaseUrl}user/investor-contacts/${id}`,
    //       });
    //       if (res?.data) {
    //         setInvestorContactDetails(res?.data);
    //         console.log("response getSingleBlog", res?.data);
    //         setLoading(false);
    //        }
    //     } catch (error) {
    //       console.error("Error fetching:", error);
    //       setLoading(false);
    //     }}

      const updateShareholdersInfoEntry = async (sectionId, entryId , data) => {
        console.log("updateShareholdersInfoEntry called with:", { sectionId, entryId, data });
        setLoading(true);
        try {
          const res = await fetchData({
            method: "PATCH",
            url: `${conf.apiBaseUrl}admin/shareholders/sections/${sectionId}/entries/${entryId}`,
            data,
          });
          console.log("API response:", res);
          if (res?.message === "Updated") {
              toast.success("Shareholders Info Updated");
              console.log("response update", res);
              fetchShareholdersInfo()
          } else {
              console.log("No res.data, full response:", res);
              toast.error("Update failed - no data in response");
          }
        } catch (error) {
          console.error("Error updating:", error);
          toast.error("Update failed");
        } finally {
          setLoading(false);
        }
      }

    const deleteShareholdersInfo = async (id) => {
        const result = await confirmAlert(
            "Do you really want to delete this Result ?"
        );
        if (result.isConfirmed) {
            setLoading(true);
            try {
                const res = await fetchData({
                    method: "DELETE",
                    url: `${conf.apiBaseUrl}admin/shareholders/sections/${id}`,
                });
                if (res?.message === "Deleted") {
                    Swal.fire({
                        title: "Deleted!",
                        text: res.message,
                        icon: "success",
                        confirmButtonText: "Okay",
                    });
                    fetchShareholdersInfo()
                }
            } catch (error) {
                console.error("Error Deleting Result", error);
                setLoading(false);
            }
        }
    };


    const deleteShareholdersInfoEntry = async (sectionId, EntryId) => {
        const result = await confirmAlert(
            "Do you really want to delete this Result ?"
        );
        if (result.isConfirmed) {
            setLoading(true);
            try {
                const res = await fetchData({
                    method: "DELETE",
                    url: `${conf.apiBaseUrl}admin/shareholders/sections/${sectionId}/entries/${EntryId}`,
                });
                if (res?.message === "Deleted") {
                    Swal.fire({
                        title: "Deleted!",
                        text: res.message,
                        icon: "success",
                        confirmButtonText: "Okay",
                    });
                    fetchShareholdersInfo()
                }
            } catch (error) {
                console.error("Error Deleting Result", error);
                setLoading(false);
            }
        }
    };


    return {
        fetchShareholdersInfo,
        loading,
        shareholdersInfo,
        addShareholdersInfo,
        updateShareholdersInfoEntry,
        // fetchShareholdersInfoById,
        shareholdersInfoDetails,
        setShareholdersInfoDetails,
        // updateShareholdersInfo,
        deleteShareholdersInfo,
        deleteShareholdersInfoEntry,
    }
}

export default useShareholderInfo
