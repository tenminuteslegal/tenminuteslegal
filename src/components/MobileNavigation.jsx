import { useState } from "react";
import { Link } from "react-router-dom";
import { editorialBoardData, navigationLinks } from "../sidebar/data";

// Mobile Navigation Component
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-red-600 text-white p-2 rounded-md shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-40 h-full w-80 bg-[#EEEEEE] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Mobile Sidebar Content */}
          <div className="mt-8">
            {/* Editorial Board Section */}
            <div className="mb-6">
              <h3 className="text-red-600 font-bold mb-4 text-base">
                Editorial Board
              </h3>

              {/* Editor */}
              <div className="mb-4">
                <div className="text-red-600 mb-1 font-medium">Editor</div>
                <div className="text-red-700 text-sm">
                  {editorialBoardData.editor.name}
                </div>
              </div>

              {/* Coeditors */}
              <div className="mb-4">
                <div className="text-red-600 mb-1 font-medium">Coeditors</div>
                <div className="text-xs space-y-1 text-gray-800">
                  {editorialBoardData.coeditors.map((member, index) => (
                    <Link
                      key={index}
                      to={`/author/${encodeURIComponent(member)}`}
                      className="block hover:underline"
                      onClick={() => setIsOpen(false)}
                    >
                      {member}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Associate Editors - Collapsible */}
              <div className="mb-4">
                <div className="text-red-600 mb-1 font-medium">
                  Associate Editors
                </div>
                <div className="text-xs space-y-1 text-red-900 max-h-40 overflow-y-auto">
                  {editorialBoardData.associateEditors.map((member, index) => (
                    <Link
                      key={index}
                      to={`/author/${encodeURIComponent(member)}`}
                      className="block hover:underline"
                      onClick={() => setIsOpen(false)}
                    >
                      {member}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="border-t pt-4">
              <div className="mb-4">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-red-600 mb-2 hover:underline cursor-pointer transition-colors block"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
