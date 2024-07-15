import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

interface Blog {
  id: String;
  title: String;
  content: String;
  author: { username: String };
  date: String;
}

export const useBlogs: () => { loading: Boolean; blogs: Blog[] } = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/blog/bulk`).then((res) => {
      setBlogs(res.data.blogs);
      setLoading(false);
    });
  }, []);

  return {
    blogs,
    loading,
  };
};

export const useBlog: (id: String | undefined) => {
  loading: Boolean;
  blog: Blog | null;
  error: Boolean;
} = (id) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data.blog);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  return {
    error,
    loading,
    blog,
  };
};
