
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import axios from "axios";

const clientId =
  "1086949398176-k2r6ujkc99378urjafp5uoeu83gpmsu5.apps.googleusercontent.com"; // Replace with your Google OAuth client ID

const LoginPage = () => {
//   const fetchData = async (data) => {
//     const res = await axios.get(
//       "http://localhost:5000/auth/google/verify",
//       {
//         headers: {
//           Authorization: `Bearer ${data.credential}`,
//         },
//       }
//     );
//     console.log(res.data);
//  };
  const handleLoginSuccess = async (credentialResponse) => {
    console.log("Google Credential Response:", credentialResponse);
    // Send credentialResponse.credential (JWT token) to your backend for verification and login

    // await fetchData(credentialResponse);
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
