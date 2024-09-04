import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Correctly imported as a named export
import {useNavigate} from "react-router-dom"

const LoginPage = ({onLogIn}) => {
    const navigate = useNavigate()

    return (
        <div className="login-page">
            <GoogleLogin
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse)
                onLogIn()
                navigate("/add-session")
            }}
            onError={()=> console.log("login failed")}

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
