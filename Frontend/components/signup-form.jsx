"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";
import colleges from "../app/auth/signup/CollegeList";
import departments from "../app/auth/signup/DepartmentList";

const PSG_COLLEGE = "PSG College of Technology (Autonomous), Peelamedu, Coimbatore District 641004";

export function SignupForm({ className, email = "", ...props }) {
  const router = useRouter();

  const [otherCollege, setOtherCollege] = useState("");
  const [otherDept, setOtherDept] = useState("");
  const [isOtherCollegeChecked, setIsOtherCollegeChecked] = useState(false);
  const [isOtherDeptChecked, setIsOtherDeptChecked] = useState(false); // New state for "Other Department" checkbox

  const [formData, setFormData] = useState({
    name: "",
    email: email,
    college: "",
    department: "",
    year: "",
    isPSGStudent: false,
    accommodation: "No",
    phone: "",
    referral: "",
  });

  // Memoize select options to prevent re-creation
  const collegeOptions = useMemo(() => colleges.map((college) => ({ value: college, label: college })), []);
  const deptOptions = useMemo(() => departments.map((dept) => ({ value: dept, label: dept })), []); // Removed "Other" from dropdown since we now have a checkbox
  const yearOptions = useMemo(() => [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
    { value: "5", label: "PG" },
  ], []);

  // Log renders for debugging
  useEffect(() => {
    console.log("SignupForm rendered");
  });

  const handleInputChange = useCallback((field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handleSelectChange = useCallback((field) => (selected) => {
    setFormData((prev) => ({ ...prev, [field]: selected ? selected.value : "" }));
  }, []);

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

  useEffect(() => {
    if (typeof window !== "undefined" && email.endsWith("psgtech.ac.in")) {
      setFormData((prev) => ({
        ...prev,
        college: PSG_COLLEGE,
        isPSGStudent: true,
      }));
    }
  }, [email]);

  const handleContinue = useCallback(async () => {
    if (!formData.name) return toast.error("Please enter your name");
    if (!formData.email) return toast.error("Please enter your email");
    if (!formData.phone) return toast.error("Please enter your phone number");
    if (!formData.college && !isOtherCollegeChecked)
      return toast.error("Please select your college or check 'Other'");
    if (isOtherCollegeChecked && !otherCollege)
      return toast.error("Please enter your college name");
    if (!formData.department && !isOtherDeptChecked)
      return toast.error("Please select your department or check 'Other'");
    if (isOtherDeptChecked && !otherDept)
      return toast.error("Please enter your department name");
    if (!formData.year) return toast.error("Please select your year");

    const finalFormData = {
      ...formData,
      college: isOtherCollegeChecked ? otherCollege : formData.college,
      department: isOtherDeptChecked ? otherDept : formData.department, // Use custom department if checkbox is checked
    };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalFormData.email)) {
      return toast.error("Please enter a valid email address");
    }

    if (!/^\d{10}$/.test(finalFormData.phone)) {
      return toast.error("Please enter a valid phone number");
    }

    if (finalFormData.email.endsWith("psgtech.ac.in") && finalFormData.college !== PSG_COLLEGE) {
      return toast.error("Please choose PSG College of Technology as your college");
    }

    const toastId = toast.loading("Registering...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      if (response.ok) {
        toast.success("Registration successful!", { id: toastId });
        
        router.push(`/auth/verify-email?email=${encodeURIComponent(finalFormData.email)}&name=${encodeURIComponent(finalFormData.name)}`);
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message}`, { id: toastId });
      }
    } catch (error) {
      toast.error(`Registration failed - No Response: ${error.message}`, { id: toastId });
    }
  }, [formData, isOtherCollegeChecked, otherCollege, isOtherDeptChecked, otherDept, router]);

  return (
    <form className={cn("flex flex-col gap-6 form-content", className)} {...props}>
      <div className="form-field">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange("name")}
          required
        />
      </div>

      <div className="form-field">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          required
        />
      </div>

      <div className="form-field">
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange("phone")}
          required
        />
      </div>

      <div className="form-field">
        <Label htmlFor="college">College/University</Label>
        <div className="select-wrapper">
          <Select
            options={collegeOptions}
            isSearchable
            placeholder="Search and select..."
            value={formData.college ? { value: formData.college, label: formData.college } : null}
            onChange={handleSelectChange("college")}
            isDisabled={isOtherCollegeChecked}
          />
        </div>
        <div className="checkbox-container">
          <Checkbox
            id="other-college-check"
            checked={isOtherCollegeChecked}
            onCheckedChange={(checked) => {
              setIsOtherCollegeChecked(checked);
              if (!checked) setOtherCollege("");
            }}
          />
          <Label htmlFor="other-college-check">College Not Listed</Label>
        </div>
        <Input
          id="other-college"
          type="text"
          value={otherCollege}
          onChange={(e) => setOtherCollege(e.target.value)}
          placeholder="Enter your college name"
          required={isOtherCollegeChecked}
          className={cn({ "hidden": !isOtherCollegeChecked })}
        />
      </div>

      <div className="form-field">
        <Label htmlFor="department">Department</Label>
        <div className="select-wrapper">
          <Select
            options={deptOptions}
            isSearchable
            placeholder="Search and select..."
            value={formData.department ? { value: formData.department, label: formData.department } : null}
            onChange={handleSelectChange("department")}
            isDisabled={isOtherDeptChecked} // Disable Select when "Other Department" is checked
          />
        </div>
        <div className="checkbox-container">
          <Checkbox
            id="other-department-check"
            checked={isOtherDeptChecked}
            onCheckedChange={(checked) => {
              setIsOtherDeptChecked(checked);
              if (!checked) {
                setOtherDept(""); // Clear the custom department input when unchecked
                setFormData((prev) => ({ ...prev, department: "" })); // Clear the selected department
              }
            }}
          />
          <Label htmlFor="other-department-check">Department Not Listed</Label>
        </div>
        <Input
          id="other-department"
          type="text"
          value={otherDept}
          onChange={(e) => setOtherDept(e.target.value)}
          placeholder="Enter your department name"
          required={isOtherDeptChecked}
          className={cn({ "hidden": !isOtherDeptChecked })}
        />
      </div>

      <div className="form-field">
        <Label htmlFor="year">Year</Label>
        <div className="select-wrapper">
          <Select
            options={yearOptions}
            placeholder="Select a year"
            value={formData.year ? { value: formData.year, label: formData.year } : null}
            onChange={handleSelectChange("year")}
          />
        </div>
      </div>

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