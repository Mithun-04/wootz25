import React from 'react';
import '../styles/dashboard.css';
import Image from 'next/image';
import { LuUserRound } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { CheckCircle } from "lucide-react";
function Dashboard({ onBackClick, isOpen }) {
    return (
        <>
            <div className={`overlay ${isOpen ? "show" : ""}`} onClick={onBackClick}></div>

            <div className={`dashboard-container ${isOpen ? "show" : ""}`}>
                {/* Profile Header Section */}

                <div className="profile-head">
                    <div className='profile-name-role'>
                        <h1 className="profile-name">Mithun</h1>
                        <p className="profile-role">Profile</p>
                    </div>
                    <IoArrowBack className='back-icon' onClick={onBackClick} />
                </div>


                <div className="profile-details">
                    <div className='about-head'>
                        <LuUserRound />
                        <h2>About</h2>
                    </div>
                    <div className="detail-item">
                        <span className="label">Name:</span>
                        <span className="value">Mithun</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Wootz ID:</span>
                        <span className="value">Wootz-005</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Email:</span>
                        <span className="value">22z341@psgtech.ac.in</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Phone:</span>
                        <span className="value">8610202823</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">College:</span>
                        <span className="value">PSG College of Technology, Coimbatore</span>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="payment-section">
                    <div className='about-head'>
                        <MdOutlinePayment />
                        <h2>Payment</h2>
                    </div>
                    <div className='payment-status'>
                        <span>Verified User</span>
                        <CheckCircle color="#00FF00" size={20} />
                    </div>
                    <div className="logout-button">
                        <button >Logout</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Dashboard;
