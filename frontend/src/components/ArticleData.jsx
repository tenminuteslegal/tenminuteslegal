import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../store/AuthReduxContext";
import { authFetch } from "../lib/utils";
import { useDispatch } from "react-redux";

// import { useAuth } from "../lib/AuthContext";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const ArticleData = () => {
  const { id } = useParams();
  const { loginOpenHandler, proceedHandler, user, logout } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      // try {
      //   const token = localStorage.getItem("app_token");
      //   if (!token) {
      //     // Show login modal if no token
      //     loginOpenHandler();
      //     return;
      //   }

      //   const response = await fetch(`${BACKEND_URL}/api/data/${id}`, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });

      //   // const data = await authFetch(
      //   //   `${BACKEND_URL}/api/data`,
      //   //   {
      //   //     method: "POST",
      //   //     body: JSON.stringify(articleData),
      //   //   },
      //   //   () => dispatch(logout()) // 👈 What to do when 401
      //   // );

      //   if (response.status === 401) {
      //     logout();
      //     return
      //   }

      //   const data = await response.json();
      //   console.log("Fetched article data:", data);

      //   console.log("Setting article data:", data);
      //   setArticle(data.post);
      //   // if (data?.post) {
      //   //   console.log("Setting article data:", data.post);
      //   //   setArticle(data.post);
      //   // }
      // } catch (error) {
      //   console.error("Error fetching article:", error);
      // } finally {
      //   setLoading(false);
      // }

      try {
        const response = await authFetch(
          `${BACKEND_URL}/api/data/${id}`, // 👈 your backend endpoint
          { method: "GET" },
          () => {
            // This runs if token expired or unauthorized (401)
            localStorage.removeItem("app_token");
           localStorage.removeItem("firebase_token");

            logout();
            navigate("/"); // redirect to login       
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        console.log("Setting article data:", data);
        setArticle(data.post);
      } catch (err) {
          console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const backHandler = () => {
    console.log("Navigating back to articles list");
    if (!user) {
      loginOpenHandler();
    }
    proceedHandler(true);
    navigate("/");
  };

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
            <button
              onClick={() => backHandler()}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Articles
            </button>
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
            onClick={() => backHandler()}
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
        {article?.subtitle && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Abstract</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {article.subtitle}
            </p>
          </div>
        )}

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
