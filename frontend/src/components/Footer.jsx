import { Phone, MapPin, Clock } from "lucide-react";
import ten_logo from "../assets/logo-white.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-black text-white p-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Section - Logo and Copyright */}
          <div className="h-full flex flex-col justify-between  space-y-4 ">
            <div className="flex items-center space-x-3">
              <img
                src={ten_logo}
                alt="10 min logo"
                className="h-[70px] w-auto"
              />
            </div>
            <div className="flex items-end space-x-2 text-sm text-white">
              &copy;
              <span className="ml-1">
                {" "}
                2025 10-minutes legal | All right reserved.
              </span>
            </div>
          </div>

          <div className="bg-[#2A2A2A] flex col-span-2 col-start-ol-end-3  rounded-lg p-6">
            {/* Center Section - Connect With Us */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">CONNECT WITH US</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">+234 803 3435 009</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm">
                    9B, Yinka Arogundade Street, Thomas Estate, Ajah, Lagos.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section - Useful Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Useful links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/disclaimer"
                    className="text-sm text-gray-400 underline hover:text-white transition-colors"
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
  );
}
