import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { useToast } from "../components/ToastContext";

export default function Login() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("johndoe@gmail.com");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setIsLoading(true);

    // Simulate async authentication delay
    setTimeout(() => {
      if (pass === "123") {
        login();
        addToast("Login successful!", "success");
        navigate("/cars");
      } else {
        setError("Wrong password! Hint: 123");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <h1>Log in</h1>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleLogin} noValidate>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password (123)"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            autoFocus
          />
          <button className="login-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

