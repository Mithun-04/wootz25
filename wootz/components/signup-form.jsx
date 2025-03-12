"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import colleges from "../app/auth/signup/CollegeList";
import departments from "../app/auth/signup/DepartmentList";

const PSG_COLLEGE = "PSG College of Technology (Autonomous), Peelamedu, Coimbatore District 641004"; // Define PSG College name

export function SignupForm({ className, email = "", ...props }) {
  const router = useRouter();
  const Select = dynamic(() => import('react-select'), { ssr: false });

  const [otherCollege, setOtherCollege] = useState("");
  const [otherDept, setOtherDept] = useState("");
  const [isOther, setIsOther] = useState(false);
  const [isOtherDept, setIsOtherDept] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    department: "",
    year: "",
    isPSGStudent: false,
    accommodation: "No",
    phone: "",
    referral: "",
  });

  // Fetch user data if email is provided
  useEffect(() => {
    if (!email) return;

    fetch(`/api/getUserByEmail?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          ...data.user,
          ...(email.endsWith("psgtech.ac.in") && {
            college: PSG_COLLEGE,
            isPSGStudent: true,
          }),
        }));
      })
      .catch((err) => console.error("ERROR", err));
  }, [email]);

  // Ensure client-specific state changes happen only on the client side
  useEffect(() => {
    // This ensures formData is initialized only on the client
    if (typeof window !== "undefined") {
      // Client-specific logic here
      if (email.endsWith("psgtech.ac.in")) {
        setFormData((prev) => ({
          ...prev,
          college: PSG_COLLEGE,
          isPSGStudent: true,
        }));
      }
    }
  }, [email]);

  const handleContinue = async () => {
    if (!formData.name) return toast.error("Please enter your name");
    if (!formData.email) return toast.error("Please enter your email");
    if (!formData.phone) return toast.error("Please enter your phone number");
    if (!formData.college) return toast.error("Please select your college");
    if (formData.college === "Other" && !otherCollege)
      return toast.error("Please enter your college name");
    if (!formData.department) return toast.error("Please select your department");
    if (formData.department === "Other" && !otherDept)
      return toast.error("Please enter your department name");
    if (!formData.year) return toast.error("Please select your year");

    // Assign "Other" values
    if (formData.college === "Other") formData.college = otherCollege;
    if (formData.department === "Other") formData.department = otherDept;

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }

    // Phone number validation
    if (!/^\d{10}$/.test(formData.phone)) {
      return toast.error("Please enter a valid phone number");
    }

    // Ensure PSG email users select PSG College
    if (formData.email.endsWith("psgtech.ac.in") && formData.college !== PSG_COLLEGE) {
      return toast.error("Please choose PSG College of Technology as your college");
    }

    // Show intermediate processing toast
    const toastId = toast.loading("Registering...");

    try {
      console.log("Form Data", formData);
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Send verification email
        const res = await fetch("http://localhost:5000/api/auth/verify_email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
          }),
        });

        if (res.ok) {
          // Update toast to success
          toast.success("Registration successful!", { id: toastId });

          router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.name)}`);
        } else {
          // Update toast to error
          toast.error("Registration failed", { id: toastId });
        }
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message} Please Check The Email!`, { id: toastId });
      }
    } catch (error) {
      toast.error(`Registration failed - No Response: ${error.message}`, { id: toastId });
    }
  };


  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      {/* Phone Number */}
      <Label htmlFor="phone">Phone number</Label>
      <Input
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />

      {/* College Selection (Searchable) */}
      <Label htmlFor="college">College/University</Label>
      <Select
        options={[...colleges.map((college) => ({ value: college, label: college })), { value: "Other", label: "Other" }]}
        isSearchable
        placeholder="Search and select..."
        value={{ value: formData.college, label: formData.college }}
        onChange={(selected) => {
          setFormData({ ...formData, college: selected.value });
          setIsOther(selected.value === "Other");
        }}
      />

      {/* Other College Input */}
      {isOther && (
        <>
          <Label htmlFor="other-college">Enter College Name</Label>
          <Input
            id="other-college"
            type="text"
            value={otherCollege}
            onChange={(e) => setOtherCollege(e.target.value)}
            required
          />
        </>
      )}

      {/* Department Selection (Searchable) */}
      <Label htmlFor="department">Department</Label>
      <Select
        options={[...departments.map((dept) => ({ value: dept, label: dept })), { value: "Other", label: "Other" }]}
        isSearchable
        placeholder="Search and select..."
        value={{ value: formData.department, label: formData.department }}
        onChange={(selected) => {
          setFormData({ ...formData, department: selected.value });
          setIsOtherDept(selected.value === "Other");
        }}
      />

      {/* Other Department Input */}
      {isOtherDept && (
        <>
          <Label htmlFor="other-department">Enter Department Name</Label>
          <Input
            id="other-department"
            type="text"
            value={otherDept}
            onChange={(e) => setOtherDept(e.target.value)}
            required
          />
        </>
      )}

      {/* Year Selection */}
      <Label htmlFor="year">Year</Label>
      <Select
        options={[
          { value: "1", label: "1st Year" },
          { value: "2", label: "2nd Year" },
          { value: "3", label: "3rd Year" },
          { value: "4", label: "4th Year" },
          { value: "5", label: "PG" },
        ]}
        placeholder="Select a year"
        value={{ value: formData.year, label: formData.year }}
        onChange={(selected) => setFormData({ ...formData, year: selected.value })}
      />

      <Button type="button" onClick={handleContinue}>
        Continue
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/auth/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
