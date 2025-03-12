
'use client';
import * as React from "react";
import "./payment.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Link from 'next/link';


export default function PaymentPage() {
    const accountDetails = {
        accountNumber: "1481267367",
        ifecCode: "CBIN0280913",
    };


    const user = useSelector(state => state.auth.user)?.user;
    if (!user) {
        return (
            <div className="relative h-screen bg-black flex items-center justify-center">
                <h1 className="absolute top-4 left-4 text-3xl font-bold text-white">
                    Wootz 2025
                </h1>
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Login Required</h2>
                    <p className="text-gray-600 mt-2">Please log in to access this page.</p>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => (window.location.href = "/auth/login")}
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );

    }
    console.log("User:", user);

    const amount = user.email.endsWith("psgtech.ac.in") ? 200 : 400;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const scrollToSection = (e) => {
        e.preventDefault();
        const section = document.getElementById("contact");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <div className="payment-wrapper">
            <div className="wootz-title">Wootz 2025</div>
            <div className="card-container">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Pay for your Registration</div>
                        <div className="card-description">
                            Use the details below to complete your payment.
                        </div>
                        <div className="payment_details">
                            The general registration for Wootz 2025 is <strong> Rs. {amount}.</strong> Please make the payment manually and then fill the form after the payment.
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="details">
                            <div className="detail-item">
                                <div className="acc-details">
                                    <span>Wootz ID :</span>
                                    <strong>{user.wootz_id}</strong>
                                </div>
                                <button onClick={() => handleCopy(user.wootz_id)}>
                                    Copy
                                </button>
                            </div>
                            <div className="detail-item">
                                <div className="acc-details">
                                    <span>IFSC Code :</span>
                                    <strong>{accountDetails.ifecCode}</strong>
                                </div>
                                <button onClick={() => handleCopy(accountDetails.ifecCode)}>
                                    Copy
                                </button>
                            </div>
                            <div className="detail-item">
                                <div className="acc-details">
                                    <span>Account Number :</span>
                                    <strong>{accountDetails.accountNumber}</strong>
                                </div>
                                <button onClick={() => handleCopy(accountDetails.accountNumber)}>
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-outline" onClick={() => {
                            window.location.href = "/"
                        }}>Pay Later</button>
                        <button className="btn btn-primary">Go to forms</button>
                    </div>
                    <div className="footer-description">
                        * After the transaction, the payment cannot be refunded. For any queries,<Link href="/#contact">
                            Contact us
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
