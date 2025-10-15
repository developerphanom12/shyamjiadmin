import { useRecoilState } from "recoil";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import { useState } from "react";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";
import { getAllDistibutorAtom } from "../../state/distributor/distributorState.js";

const useDistributor = () => {
  const [fetchData] = useFetch();
  const [distributor, setDistributor] = useRecoilState(getAllDistibutorAtom);
  const [loading, setLoading] = useState(false);

  const fetchAllDistributor = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/distributors`,
      });
      if (res) {
        setDistributor(res?.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDistributor = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Distributor ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/distributors/${id}`,
        });
        if (res?.message) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchAllDistributor();
        }
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        setLoading(false);
      }
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/distributors/${id}`,
        data: {  // ✅ Yeh add karna important hai
          reviewed: true,
          // status: "read"
        }
      });

      if (res) {
        // Success message
        toast.success("Marked as read successfully!");
        fetchAllDistributor()
        return true;
      } else {
        toast.error(res?.message || "Failed to mark as read");
        return false;
      }
    } catch (error) {
      console.error("Mark as read error:", error);
      toast.error("Network error occurred");
      return false;
    }
  };


  return { distributor, fetchAllDistributor, deleteDistributor, markAsRead };
};

export default useDistributor;