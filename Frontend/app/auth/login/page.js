import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import "./login.css"; // Importing the CSS file

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-container">
          <a href="/" className="logo">
            <div className="logo-icon">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Wootz 25.
          </a>
        </div>
        <div className="form-container">
          <div className="login-form">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="login-image">
        <img src="/assets/login.jpg" alt="Login" className="image" />
      </div>
    </div>
  );
}
