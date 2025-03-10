
'use client';
import * as React from "react";
import "./payment.css";
import toast from "react-hot-toast";
import { Bold } from "lucide-react";

export default function PaymentPage() {
    const accountDetails = {
        accountNumber: "1481267367",
        ifecCode: "CBIN0280913",
    };

    const amount = 150;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="payment-wrapper">
            <div className="wootz-title">Payment Details</div>
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
                                    <span>IFSC Code:</span>
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
                        <button type="button" className="btn btn-outline">Pay Later</button>
                        <button className="btn btn-primary">Go to forms</button>
                    </div>
                    <div className="footer-description">
                        * After the transaction, the payment cannot be refunded. For any queries,<a href="/"> Contact us</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}
