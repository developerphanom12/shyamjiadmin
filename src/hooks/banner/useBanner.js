import { useRecoilState } from "recoil";
import { bannerDetailsFamily, bannerLoadingFamily } from "../../state/banner/bannerState";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";

const useBanner = (endpoint) => {
  const [fetchData] = useFetch();
  const [bannerDetails, setBannerDetails] = useRecoilState(bannerDetailsFamily(endpoint));
  const [loading, setLoading] = useRecoilState(bannerLoadingFamily(endpoint));

  const fetchBannerDetails = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/banner/${endpoint}`,
      });
      if (res?.success) setBannerDetails(res.banner);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateBanner = async (formData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",                // backend ke mutabik PUT bhi ho sakta hai
        url: `${conf.apiBaseUrl}admin/banner/${endpoint}`,
        data: formData,
      });
      if (res?.success) {
        toast.success("Banner Updated");
        await fetchBannerDetails();
      } else {
        toast.error(res?.message || "Failed to update");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { bannerDetails, loading, fetchBannerDetails, updateBanner };
};

export default useBanner;
