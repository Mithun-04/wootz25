import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "@/components/signup-form";
import "./signup.css"; // Importing the CSS file

export default function SignupPage() {
    return (
        <div className="signup-container">
            <div className="signup-content">
                {/* Logo */}
                <div className="logo-container">
                    <a href="#" className="logo">
                        <div className="logo-icon">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Wootz 25.
                    </a>
                </div>

                {/* Signup Form */}
                <div className="form-container">
                    <div className="signup-form">
                        <h1 className="text-2xl font-bold">Enter your personal details</h1>
                        <div className="form-scroll">
                            <SignupForm className="signup" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Signup Image */}
            <div className="signup-image">
                <img src="/assets/login.jpg" alt="Signup" className="image" />
            </div>
        </div>
    );
}
