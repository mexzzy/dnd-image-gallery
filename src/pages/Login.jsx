import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div>
      <div className="authContainer">
        <div className="authWrapper">
          <div className="authHeader">Login</div>
          <span className="authText">
            Login to access the drag and drop feature
          </span>
          <form>
            <div className="inputContainer">
              <input type="email" placeholder="email" />
            </div>
            <div className="inputContainer">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="password"
              />
              <div className="pHideShowIcon" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
