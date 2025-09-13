import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../lib/AuthContext";

// Article Item Component
const ArticleItem = ({ id, title, plan }) => {
  const { loginOpenHandler } = useAuth();

  const navigateHandler = (e) => {
    e.preventDefault(); // prevent default link behavior
    const token = localStorage.getItem("app_token");
    if (!token) {
      // Show login modal if no token
      loginOpenHandler(true);
      return;
    }

    if (plan === "paid") {
      // Show plan details
      return alert("This is a paid article. Please subscribe to access.");
    }
    window.location.href = `/${id}`;
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
    </label>
  );
};

ArticleItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
};

export default ArticleItem;
