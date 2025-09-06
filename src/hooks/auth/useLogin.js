import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import conf from "../../config/index";
import useFetch from "../useFetch";
import { toast } from "react-toastify";
import { adminAuthState } from "../../state/authenticatedState/authenticatedState";

const useLogin = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const setUserInfo = useSetRecoilState(adminAuthState);

  const adminLogin = async (email, password) => {
    const data = { email, password };
    console.log("data :-", data);
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/login`,
        data,
      });

      if (res?.success) {
        setLoading(false);
        toast.success(res?.message);
        sessionStorage.setItem("token", res?.token);
        sessionStorage.setItem("superAdminId", res?.admin?.id);
        // sessionStorage.setItem("superAdminName", res?.data?.admin?.name);
        setUserInfo({
          isAuthenticated: true,
        });
        navigate("/dashboard");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
        console.log("error" , error)
      toast.error(error.message);
    }
  };

  const resetAdmin = () => {
    setSAdminResponse(null);
  };

  return {
    resetAdmin,
    adminLogin,
    loading,
  };
};

export default useLogin;
