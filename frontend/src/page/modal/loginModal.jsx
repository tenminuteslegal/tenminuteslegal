import LoginAuth from "../LoginAuth";
import { useAuth } from "../../lib/AuthContext";

export default function LoginModal() {
  const { loginOpenHandler } = useAuth();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* Modal container */}
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 relative">
        {/* Close button */}
        <button
          onClick={() => loginOpenHandler(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please sign in with your Google account to continue exploring{" "}
          <span className="font-medium text-red-500">10-Minutes Legal</span>.
        </p>

        {/* Login Form */}
        <div className="flex justify-center">
          <LoginAuth />
        </div>
      </div>
    </div>
  );
}
