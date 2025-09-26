import { useRecoilState } from "recoil";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import {  getAllMessagesAtom } from "../../state/message/messageState.js";
import { useState } from "react";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";

const useMessages= () => {
  const [fetchData] = useFetch();
  const [messages , setMessages] = useRecoilState(getAllMessagesAtom);
  const [loading, setLoading] = useState(false);

  const fetchAllMessages = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/contactus`,
      });
      if (res) {
          setMessages(res.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Message ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/contactus/${id}`,
        });
        if (res?.message) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchAllMessages();
        }
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        setLoading(false);
      }
    }
  };
  return { messages, loading, fetchAllMessages, deleteMessage };
};

export default useMessages;