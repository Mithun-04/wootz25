'use client';
import { useEffect } from 'react';
import '../styles/dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import { LuUserRound } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { CheckCircle, XCircle } from "lucide-react"; // Import cross icon
import { handleLogout } from '@/store/authSlice'; // Import logout action

function Dashboard({ onBackClick, isOpen }) {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isOpen]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)?.user;

    console.log("User:", user);
    

    if (!user) {
        return (
            <div className="dashboard-container">
                <h2>Loading user data...</h2>
            </div>
        );
    }

    const handlePayment = () => {
        window.location.href = "/auth/payment"
    };

    return (
        <>
            <div className={`overlay ${isOpen ? "show" : ""}`} onClick={onBackClick}></div>

            <div className={`dashboard-container ${isOpen ? "show" : ""}`}>
                <div className="profile">
                    <div className="profile-head">
                        <div className='profile-name-role'>
                            <h1 className="profile-name">{user?.name || "User"}</h1>
                            <p className="profile-role">Profile</p>
                        </div>
                        <IoArrowBack className='back-icon' onClick={onBackClick} />
                    </div>

                    {/* Profile Details */}
                    <div className="profile-details">
                        <div className='about-head'>
                            <LuUserRound />
                            <h2>About</h2>
                        </div>
                        <div className="detail-item">
                            <span className="label">Name:</span>
                            <span className="value">{user?.name || "N/A"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Wootz ID:</span>
                            <span className="value">{user?.wootz_id || "N/A"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Email:</span>
                            <span className="value">{user?.email || "N/A"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Phone:</span>
                            <span className="value">{user?.phone || "N/A"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">College:</span>
                            <span className="value">{user?.college || "N/A"}</span>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="payment-section">
                        <div className='about-head'>
                            <MdOutlinePayment />
                            <h2>Payment</h2>
                        </div>
                        <div className="payment-details">
                            <div className='payment-status'>
                                {user?.payment ? (
                                    <>
                                        <span>Payment Verified</span>
                                        <CheckCircle color="#00FF00" size={20} />
                                    </>
                                ) : (
                                    <>
                                        <span>Payment Not Verified</span>
                                        {/* <XCircle color="#FF0000" size={20} /> */}
                                    </>
                                )}
                            </div>
                            {!user?.payment && (
                                <div className="pay-now-button">
                                    <button onClick={handlePayment}>Pay Now</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="logout-button">
                    <button onClick={() => dispatch(handleLogout())}>Logout</button>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
