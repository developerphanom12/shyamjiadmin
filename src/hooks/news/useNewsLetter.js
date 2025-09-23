import useFetch from "../useFetch";
import conf from "../../config";
import { getnewsLetterListAtom } from "../../state/newsLetter/newsState";
import { useRecoilState } from "recoil";

const useNewsletter = () => {
  const [fetchData] = useFetch();
  const [newsLetterList, setNewsLetterList] = useRecoilState(getnewsLetterListAtom);

  // 🔹 Fetch list
  const fetchNews = async () => {
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/newsletters`,
      });
      if (res) {
        setNewsLetterList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Toggle subscriber enabled/disabled
  const toggleNewsletter = async (id, enabled) => {
    try {
      const res = await fetchData({
        method: "PATCH",
        url: `${conf.apiBaseUrl}admin/newsletters/${id}`,
        data: { enabled },
      });

      if (res) {
        // local state update karo bina pura fetch kare
        setNewsLetterList((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, enabled } : item
          )
        );
      }
    } catch (error) {
      console.log("Toggle failed:", error);
    }
  };

  return {
    fetchNews,
    newsLetterList,
    toggleNewsletter, 
  };
};

export default useNewsletter;
