import React from 'react'
import { Link } from 'react-router-dom';

function HeaderText() {
  return (
    <div className="flex-1 bg-gradient-to-r from-orange-200 to-orange-100">
      {/* Header section */}
      <div className="text-center flex px-4">
        <h1 className="text-xl md:text-5xl font-bold text-red-600 mb-1">T</h1>
        <p className=" flex-1 text-red-500 text-lg font-medium">10-Minutes Legal</p>
      </div>

      {/* Navigation section */}
      {/* <div className="border-t border-dotted border-red-400 bg-orange-100/50 px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <div className="mb-1 md:mb-0">
            <Link
              to="/"
              className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 text-sm"
            >
              Main page
            </Link>
          </div>

          <Link to="./submit "className="text-red-600 font-medium text-sm">Submit a paper</Link>

          <div className="mt-1 md:mt-0">
            <a
              href="#"
              className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 text-sm"
            >
              Join the Econometric Society
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default HeaderText;