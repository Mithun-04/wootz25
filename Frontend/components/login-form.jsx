"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { handleLogin } from "@/store/authSlice";
import { Eye, EyeOff } from "lucide-react";


export function LoginForm({ className, ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);


  const handleResend = async () => {
    if (!formData.email) return toast.error("Please enter your email");

    const email = formData.email

    const toastId = toast.loading("Resending verification email...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify_email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Verification email sent successfully!", { id: toastId });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to resend email: ${errorData.message}`, { id: toastId });
      }
    } catch (error) {
      toast.error(`Failed to resend email. Please try again later. - ${error.message}`, { id: toastId });
    }
  };

  const handleLoginSubmit = async () => {
    if (!formData.email) return toast.error("Please enter your email");
    if (!formData.password) return toast.error("Please enter your password");

    // Show intermediate loading toast
    const toastId = toast.loading("Logging in...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(handleLogin(data.token));

        // Update toast to success
        toast.success("Login successful!", { id: toastId });
        router.push("/");
      } else {
        const errorData = await response.json();

        // Update toast to error
        toast.error(`Login failed: ${errorData.message}`, { id: toastId });
      }
    } catch (error) {
      toast.error(`Login failed: ${error.message}`, { id: toastId });
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              className="ml-auto text-sm underline-offset-4 hover:underline cursor:pointer"
              onClick={() => { handleResend() }}
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative w-full">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pr-10" // Add padding-right to avoid text overlap
              required
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>


        </div>
        <Button type="button" onClick={handleLoginSubmit} className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/auth/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
