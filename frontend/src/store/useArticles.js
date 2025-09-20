import { useSelector, useDispatch } from "react-redux";
import {
  setArticles,
  setCurrentArticle,
  setLoading,
  setError,
  addArticle,
  updateArticle,
  deleteArticle,
} from "./articleSlice";


// const BACKEND_URL =  "http://localhost:5000";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL_DEV;

export const useArticles = () => {
  
  const dispatch = useDispatch();
  const { articles, currentArticle, loading, error } = useSelector(
    (state) => state.articles
  );

  const fetchArticles = async () => {
    try {
      dispatch(setLoading(true));

      // const response = await fetch(`${BACKEND_URL}/api/data`, {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("app_token")}`,
      //     },
      //   });
        //     const result = await response.json();

      const response = await fetch(`${BACKEND_URL}/api/data`);
      const data = await response.json();

      const articlesWithKeysArray = Object.entries(data.articles).map(
        ([key, value]) => {
          return {
            id: key, // The unique key from Firebase

            ...value, // Spread the rest of the article data
          };
        }
      );
      dispatch(setArticles(articlesWithKeysArray));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const fetchArticleById = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`${BACKEND_URL}/api/data/${id}`);
      const data = await response.json();
      dispatch(setCurrentArticle(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const createArticle = async (articleData) => {
    try {
      console.log("Creating article with data:", articleData);
      dispatch(setLoading(true));
      const response = await fetch(`${BACKEND_URL}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 👈 required so backend knows it’s JSON
          Authorization: `Bearer ${localStorage.getItem("app_token")}`,
        },
        body: JSON.stringify(articleData), // articleData must be a plain object
      });

      if (!response.status === 401) {
        // dispatch()
      }
      const data = await response.json();
      console.log(data)
      // console.log(data.data.article)
      const articlesWithKeysArray = Object.entries(data.data).map(
        ([key, value]) => {
          return {
            id: key, // The unique key from Firebase

            ...value, // Spread the rest of the article data
          };
        }
      );
      // console.log("Transformed articles array:", ...articlesWithKeysArray);

      dispatch(addArticle(articlesWithKeysArray));
      return data;
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    }
  };

  const editArticle = async (id, articleData) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`${BACKEND_URL}/api/data/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("app_token")}`,
        },
        body: JSON.stringify(articleData),
      });
      const data = await response.json();
      dispatch(updateArticle(data));
      return data;
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    }
  };

  const removeArticle = async (id) => {
    try {
      dispatch(setLoading(true));
      await fetch(`${BACKEND_URL}/api/data/${id}`, {
        method: "DELETE",
      });
      dispatch(deleteArticle(id));
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    }
  };

  const clearCurrentArticle = () => {
    dispatch(setCurrentArticle(null));
  };

  const clearError = () => {
    dispatch(setError(null));
  };

  return {
    // State
    articles,
    currentArticle,
    loading,
    error,

    // Methods
    fetchArticles,
    fetchArticleById,
    createArticle,
    editArticle,
    removeArticle,
    clearCurrentArticle,
    clearError,
  };
};
