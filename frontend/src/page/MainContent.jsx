import { useEffect, useState } from "react";
import ArticleItem from "../article/article";
import { useArticles } from "../store/useArticles";
import { useSelector } from "react-redux";
import { useAuth } from "../store/AuthReduxContext";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { articles, loading, error, fetchArticles } = useArticles();
  const { saveUser } = useAuth();
  // const [articles, setDbArticles] = useState(articles);
  const itemsPerPage = 30;

  // Fetch from backend
  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
      const fetchUser = async () => {
        // const token = localStorage.getItem("app_token");
        const token = localStorage.getItem("firebase_token");
        console.log("token in maincontent:", token);
        if (token) {
          try {
            const response = await fetch(`${BACKEND_URL}/auth/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            const data = await response.json();
            console.log(data)
  
            if (data.user) {
              saveUser(data.user);
            } 

            // localStorage.setItem("app_token", data.token);
          } catch (error) {
            console.error("Error fetching user:", error);
           
          }
        }
      };
  
      fetchUser();
    }, []);

  // console.log("articles from redux:", articles);

  // Pagination logic

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);
  // console.log("Current Articles:", currentArticles);
  // console.log("database articles:", articles);

  const handlePrevious = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const handleNext = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <div className="flex-1 p-6 w-full md:w-[80%] lg:w-[70%] mx-auto">
      <div className="space-y-[20px]">
        {currentArticles.map((article, index) => (
          <ArticleItem
            key={startIndex + index}
            id={article.id}
            title={article.title}
            plan={article.plan}
          />
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Back
        </button>

        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainContent;
