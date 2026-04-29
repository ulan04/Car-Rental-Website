import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastContext";

export default function Signup() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 3) {
      setError("Password must be at least 3 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    // Simulate async registration
    setTimeout(() => {
      addToast("Account created successfully! Please log in.", "success");
      setIsLoading(false);
      navigate("/login");
    }, 800);
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <h1>Sign up</h1>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="login-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

