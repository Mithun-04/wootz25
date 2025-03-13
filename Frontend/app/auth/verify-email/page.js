'use client';

import React from "react";
import { toast } from "react-hot-toast"; // Ensure you have react-hot-toast installed
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./verify.css";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";
  const name = searchParams.get("name") || "your name";


const handleResend = async () => {
  if (!email) return toast.error("Invalid email address");

  const toastId = toast.loading("Resending verification email...");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify_email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, name }),
    });

    if (response.ok) {
      toast.success("Verification email sent successfully!", { id: toastId });
    } else {
      const errorData = await response.json();
      toast.error(`Failed to resend email: ${errorData.message}`, { id: toastId });
    }
  } catch (error) {
    toast.error("Failed to resend email. Please try again later.", { id: toastId });
  }
};

  return (
    <div className="wrapper">
      
      <div className="wootz-title">Wootz 25</div>

      {/* Card Centered in Page */}
      <div className="card-container">
        <Card className="card">
          <CardHeader>
            <CardTitle className="card-title">Email Verification</CardTitle>
            <CardDescription className="card-description">Check Your Email</CardDescription>
          </CardHeader>
          <CardContent className="card-content">
            <p>
              We have sent a password setup link to <strong>{email}</strong>.
              Please check your inbox.Please click the link in the email to confirm your email address. 
            </p>
            <p>If you don't see the email, check your spam folder.</p>
          </CardContent>
          <CardFooter>
            <button onClick = {handleResend}className="btn btn-primary">Resend</button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
