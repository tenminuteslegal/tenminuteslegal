import { Phone, MapPin, Clock } from "lucide-react";
import ten_logo from "../assets/logo-white.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-black text-white p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-8">
          {/* Left Section - Logo and Copyright */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <img
                src={ten_logo}
                alt="10 min logo"
                className="h-[50px] sm:h-[70px] w-auto"
              />
            </div>
            <div className="flex flex-wrap text-xs sm:text-sm text-white">
              <span>&copy;</span>
              <span className="ml-1">
                2025 10-minutes legal | All right reserved.
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-[#2A2A2A] rounded-lg p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Connect With Us Section */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
                  CONNECT WITH US
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Phone className="min-w-[16px] w-4 h-4 text-gray-400" />
                    <span className="text-xs sm:text-sm break-words">
                      +234 803 3435 009
                    </span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <MapPin className="min-w-[16px] w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-xs sm:text-sm break-words">
                      9B, Yinka Arogundade Street, Thomas Estate, Ajah, Lagos.
                    </span>
                  </div>
                </div>
              </div>

              {/* Useful Links Section */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
                  Useful links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/disclaimer"
                      className="text-xs sm:text-sm text-gray-400 underline hover:text-white transition-colors"
                    >
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
