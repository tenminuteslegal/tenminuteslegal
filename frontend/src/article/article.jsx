import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../store/AuthReduxContext";
import { useState } from "react";
// import { useAuth } from "../lib/AuthContext";

// Article Item Component
const ArticleItem = ({ id, title, plan }) => {
  const { loginOpenHandler, user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

const navigateHandler = (e) => {
  e.preventDefault();
  const token = localStorage.getItem("app_token");

  if (!token) {
    loginOpenHandler(true);
    return;
  }

  if (plan === "paid") {
    setOpen(true);
    return;
  }

  if (user?.role === "admin" && plan === "paid") {
    navigate(`/${id}`); // ✅ SPA navigation
    return;
  }

  navigate(`/${id}`); // ✅ SPA navigation
};

  return (
    <label className="flex items-center justify-between space-x-2 py-3 border-b bg-[#f5f5f58c] px-[20px] rounded-[5px] border-gray-200 cursor-pointer">
      {/* Radio Button */}
      <div className="flex items-center space-x-2">
        <div>
          <div className="h-3 w-3 flex items-center justify-center rounded-[100%] border-[2px] border-gray-700"></div>
        </div>

        {/* Title as Link */}
        <Link
          to={`/${id}`}
          onClick={navigateHandler}
          className="text-sm text-black hover:text-red-600 underline"
        >
          {title}
        </Link>
      </div>
      <div>
        <p className="text-[12px] text-white px-2 py-1 bg-black rounded">
          {plan}
        </p>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-semibold">Paid Article</h2>
            <p className="mt-2 text-gray-600">
              This is a paid article. Please subscribe to access.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </label>
  );
};

ArticleItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
};

export default ArticleItem;
