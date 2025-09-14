import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../lib/AuthContext";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ArticleData = () => {
  const { id } = useParams();
  const { loginModalHandler } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("app_token");
        if (!token) {
          // Show login modal if no token
          loginModalHandler();
          return;
        }

        const response = await fetch(`${BACKEND_URL}/api/data/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Unauthorized or server error
          if (response.status === 401) {
            loginModalHandler();
          }
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched article data:", data);

        if (data?.post) {
          console.log("Setting article data:", data.post);
          setArticle(data.post);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The article you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-black-600 hover:text-blue-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Articles
          </button>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
            {article.title}
          </h1>

        
          
        </div>

        {/* Abstract */}
        {article?.subtitle && <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Abstract</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {article.subtitle}
          </p>
        </div>}

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

      
      </div>
    </div>
  );
};

export default ArticleData;
