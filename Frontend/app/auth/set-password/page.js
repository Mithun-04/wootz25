'use client';
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import "./password.css";
import { useDispatch} from "react-redux";
import { handleLogin } from "@/store/authSlice";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/setpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      dispatch(handleLogin(data.jwt_token))
      toast.success("Password set successfully");
      window.location.href = "/auth/payment";
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };
  
  return (
    <div className="wrapper">
      <div className="wootz-title">Wootz 25</div>
      <div className="card-container">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Set Your Password</div>
            <div className="card-description">Enter a new password to activate your account.</div>
          </div>
          <div className="card-content">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="card-footer">
                <button type="button" className="btn btn-outline" onClick={() =>{
                  window.location.href = "/"
                }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Set Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
