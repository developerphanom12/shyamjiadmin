import { useRecoilState } from "recoil";
import useFetch from "../useFetch";
import { getAllBlogs, getBlogDetailsAtom } from "../../state/blogs/blogsState";
import { useState } from "react";
import conf from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";


const useBlogs = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [allBlogs, setAllBlogs] = useRecoilState(getAllBlogs)
  const [blogDetails, setBlogDetails] = useState(getBlogDetailsAtom)
  const fetchAllBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}blogs`,
      });
      if (res.success) {
        setAllBlogs(res.blogs);
        console.log("All Blogs", res.blogs);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  };

  const addBlog = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}blogs`,
        data,
      });
      if (res.success) {
        toast.success("Blog Added");
        console.log("response create", res);
        setLoading(false);
        navigate("/blogs");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  };

  const fetchBlogById= async (id) => {
    setLoading(true);
     try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}blogs/${id}`,
      });
      if (res.success) {
        console.log("response getSingleBlog", res?.blog);
        setLoading(false);
        setBlogDetails(res?.blog);
       }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }}

  const updateBlog = async (id, data)=>{
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}blogs/${id}?_method=PUT`,
        data,
      });
      if (res?.success) {
        fetchAllBlogs();
        toast.success("Blog Updated");
        console.log("response update", res);
        setLoading(false);
        navigate("/blogs");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  }

    const deleteBlog = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Blog ?"
    );
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}blogs/${id}`,
        });
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchAllBlogs();
        }
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        setLoading(false);
      }
    }
  };

  return {
    fetchAllBlogs,
    loading,
    allBlogs,
    addBlog,
    fetchBlogById,
    blogDetails,
    updateBlog,
    deleteBlog,
  }
}

export default useBlogs
