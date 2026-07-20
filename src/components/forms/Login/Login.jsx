import {useState} from 'react'
import './Login.css'
import{API_URL} from "../../../data/ApiPath"
const Login = ({ showWelcomeHandler, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanedEmail = email.trim();
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanedEmail,
          password: password,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = { message: "Server error or invalid response." };
      }

      if (response.ok && data.success !== false) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginToken", data.token);

        if (data.firmId) {
          localStorage.setItem("firmId", data.firmId);

          try {
            const firmResponse = await fetch(`${API_URL}/firm/${data.firmId}`);
            const firmData = await firmResponse.json();

            if (firmResponse.ok && firmData?.firmName) {
              localStorage.setItem("firmName", firmData.firmName);
              if (onLoginSuccess) {
                onLoginSuccess(firmData.firmName);
              }
            } else {
              localStorage.removeItem("firmName");
              if (onLoginSuccess) {
                onLoginSuccess("");
              }
            }
          } catch (firmError) {
            console.log(firmError);
            localStorage.removeItem("firmName");
            if (onLoginSuccess) {
              onLoginSuccess("");
            }
          }
        } else {
          localStorage.removeItem("firmId");
          localStorage.removeItem("firmName");
          if (onLoginSuccess) {
            onLoginSuccess("");
          }
        }

        alert(data.message || "Login Successful");

        setEmail("");
        setPassword("");

        if (showWelcomeHandler) {
          showWelcomeHandler();
        }
      } else {
        alert(data.message || "Login Failed. Invalid Email or Password.");
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      <form className="AuthForm" onSubmit={handleLogin}>
        <h3>Vendor Login</h3>

        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          placeholder="Enter your Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter your Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <div className="btnSubmit">
          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login
