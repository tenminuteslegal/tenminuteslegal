import { Link } from "react-router-dom";

// Article Item Component
const ArticleItem = ({
  title,
  authors,
  pages,
  hasAbstract = true,
  hasPrint = true,
  hasView = true,
}) => (
  <div className="border-b border-gray-200 py-2 flex justify-between items-start">
    <div className="flex-1">
      <Link to={`${title}`} className="text-sm font-medium text-gray-900 mb-1">{title}</Link> 
    </div>
   
  </div>
);

export default ArticleItem;