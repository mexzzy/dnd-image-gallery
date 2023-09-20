import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signIn } = UserAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
    } catch (e) {
      setError(e.message); 
      return;
    }
    
  };

  return (
    <div>
      <div className="authContainer">
        <div className="authWrapper">
          <div className="authHeader">Login</div>
          <span className="authText">
            Login to access the drag and drop feature
          </span>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <input
                type="email"
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="inputContainer">
              <input
                required
                type={passwordVisible ? "text" : "password"}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              <div className="pHideShowIcon" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <div className="error">{error}</div>} 
          <div className="linkText">
            Don't have an account yet? <Link to="/signup">SignUp</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
