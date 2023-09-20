import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const navigate = useNavigate();
  
  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
      return;
    }
  };
  return (
    <div>
      <div className="authContainer">
        <div className="authWrapper">
          <div className="authHeader">SignUp</div>
          <span className="authText">
            SignUp to access the drag and drop feature
          </span>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <input
                type="email"
                required
                placeholder="email"
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
            <button type="submit">SignUp</button>
          </form>
          {error && <div className="error">{error}</div>}
          <div className="linkText">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
