// LoginPage.js
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode"; // Correctly imported as a named export
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogIn }) => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          console.log(decoded); // For debugging
          const userId = decoded.sub; // Assuming 'sub' contains the user ID
          onLogIn(userId); // Pass the user ID to the parent component
          navigate("/add-session");
        }}
        onError={() => console.log("Login failed")}
        size="large"
        type="icon"
        shape="circle"
        className="login-button"
        auto_select={true}
      />
    </div>
  );
};

export default LoginPage;
