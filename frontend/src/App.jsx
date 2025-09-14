// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./page/home";
import LoginModal from "./page/modal/loginModal";
import { useAuth } from "./lib/AuthContext";
import ArticleData from "./components/ArticleData";
import SubmitPage from "./page/Submit";
import minutes from "./assets/logo-white.png";
import Footer from "./components/Footer";
import LegalDisclaimer from "./page/disclaimer";

function App() {
  // const [loginOpen, setLoginOpen] = useState(false);
  const { user, canProceed, loginOpen } = useAuth();
  const location = useLocation();
  console.log("Current user:", user, location.pathname);

  const handleLogout = () => {
    // Clear user session (e.g., remove token from localStorage)
    localStorage.removeItem("app_token");
    // Optionally, you can also clear user state in AuthContext if needed
    window.location.href = '/'; // Redirect to homepage or login page
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        {(canProceed || location.pathname === "/disclaimer") && (
          // <Link to="/" className="absolute top-4 left-4 text-white text-sm underline"></Link>
          <header className="flex lg:flex-row items-center justify-center lg:justify-between px-4 py-4 sm:py-6 bg-black relative">
            {/* Logo Section - Always centered */}
            <div className="flex flex-col  items-center justify-center w-full lg:w-auto mx-auto">
              <div className="h-[80px] w-[140px] s:h-[50px] s:w-[50px]" onClick={() => window.location.href = '/'}>
                <img
                  src={minutes}
                  alt="10 min logo"
                  className="w-full h-full"
                />
              </div>
              <p className="text-center text-white">
                Quick guides that save you time and money
              </p>
            </div>

            {/* Admin Submit Button */}
            {user?.role === "admin" && (
              <div className="mt-3 lg:mt-0 lg:absolute lg:right-6">
                <Link
                  to="/submit"
                  className="border border-white rounded-md px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 
                   text-xs sm:text-sm lg:text-base 
                   text-white hover:bg-white hover:text-black transition"
                >
                  Submit
                </Link>
              </div>
            )}
            {user?.role === "user" && (
              <div className="mt-3 lg:mt-0 lg:absolute lg:right-6">
                <button
                  onClick={handleLogout}
                  className="border border-white rounded-md px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 
                   text-xs sm:text-sm lg:text-base 
                   text-white hover:bg-white hover:text-black transition"
                >
                  Log Out
                </button>
              </div>
            )}

            
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<ArticleData />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/disclaimer" element={<LegalDisclaimer />} />
          </Routes>
        </main>

        {/* Login Modal */}
        {loginOpen && <LoginModal  />}
        {/* <LoginModal  /> */}

        {(canProceed || location.pathname === "/disclaimer") && <Footer />}
      </div>
    </>
  );
}

export default App;
