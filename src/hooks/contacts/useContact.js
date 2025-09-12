import { useRecoilState } from "recoil";
import useFetch from "../useFetch";
import { useState } from "react";
import conf from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getContactDetailsAtom } from "../../state/contact/contactState";


const useContact = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [contactDetails, setContactDetails] = useRecoilState(getContactDetailsAtom)
  const fetchContactDetails = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/contact`,
      });
      if (res.success) {
        setContactDetails(res.contact);
        console.log("All Contact", res.contact);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  };

  const UpdateContact = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/contact`,
        data,
      });
      if (res.success) {
          fetchContactDetails();
        toast.success("Contact Updated");
        console.log("response create", res);
        setLoading(false);
        navigate("/contact");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  };

  return {
    fetchContactDetails,
    loading,
    contactDetails,
    UpdateContact,
  }
}

export default useContact
