import { useEffect, useState } from "react";
import ArticleItem from "../article/article";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dbArticles, setDbArticles] = useState([]);
  const itemsPerPage = 30;

  // Fetch from backend
  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/data`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("app_token")}`,
          },
        });
        const result = await response.json();
        // console.log("Fetched articles:", result);
        setDbArticles(result.data.articles || []);
        // console.log("Fetched articles: list only", result.data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    getArticles();
  }, []);

  // Pagination logic

  const totalPages = Math.ceil(dbArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = dbArticles.slice(startIndex, endIndex);

  
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
