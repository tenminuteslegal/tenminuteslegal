import minutes from "../assets/logo-white.png";
import { Search } from "lucide-react";
import { useAuth } from "../store/AuthReduxContext";
// import { useAuth } from "../lib/AuthContext";

const StartPage = () => {
  const { proceedHandler } = useAuth();
  
  const handleProceedToHomepage = () => {
    // Handle proceed to homepage
    console.log("Proceeding to homepage");
    proceedHandler();
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          {/* Create a pattern of lines */}
          {Array.from({ length: 30 }, (_, i) => (
            <g key={i}>
              <line
                x1={i * 40}
                y1="0"
                x2={i * 40 + 200}
                y2="800"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <line
                x1="0"
                y1={i * 30}
                x2="1200"
                y2={i * 30 + 200}
                stroke="white"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative  flex flex-col items-center justify-center min-h-screen px-8">
        {/* Search bar without button */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex items-center justify-center w-full lg:w-auto mx-auto">
            <div className="h-[200px] w-[300px] s:h-[50px] s:w-[50px]">
              <img src={minutes} alt="10 min logo" className="w-full h-full" />
            </div>
          </div>
          <p className="text-center mt-8">Quick guides that save you time and money</p>

        </div>

        {/* Shortcuts grid */}
        {/* <div className="w-full max-w-md mb-8">
          <div className="relative">
            <input
              type="text"
              value={""}
              onChange={() => handleProceedToHomepage()}
              className="w-full bg-gray-900 text-white px-4 py-3 pr-12 rounded-lg border border-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder-gray-400"
              placeholder="Search 10 mins legal..."
            />
            <button
              
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Search size={18} />
            </button>
          </div>
        </div> */}

        {/* Proceed to Homepage Button */}
        <button
          onClick={handleProceedToHomepage}
          className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Go to homepage
        </button>
      </div>
    </div>
  );
};

export default StartPage;
