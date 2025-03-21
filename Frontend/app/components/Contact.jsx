import React from "react";
import "../styles/contact.css";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { Mail } from "lucide-react";
import { Instagram } from 'lucide-react';// Import icons


export default function ContactUs() {
    return (
        <div className="contact-container" id="contact">
            <h1 className="contact-title">Contact Us</h1>
            <div className="contact-section">
                <div className="social-links">
                    <div className="social-item">
                        <Instagram size={30} />
                        <a href="https://www.instagram.com/psgct_metallurgy?igsh=MW5xOXJoZGtmMHRxaw==" target="_blank" rel="noreferrer">Instagram</a>
                    </div>
                    <div className="social-item">
                        <Mail size={30} />
                        <a href="mailto:noreply.wootzed16@gmail.com?subject=Contact%20Request" target="_blank" rel="noreferrer">Mail</a>
                    </div>
                </div>

                <div className="contact-details">
                    <div className="category">
                        <h3>Secretaries</h3>
                        <p><strong>Kavinkumar S</strong><br />📞 +91  8838269364</p>
                        <p><strong>Ajaykumar K
                        </strong><br />📞 +91 82488 90149</p>
                        <p><strong>Dharani A S
                        </strong><br />📞 +91  93458 06166</p>
                    </div>

                    <div className="category">
                        <h3>Tech Support</h3>
                        <p><strong>Mathan Kumar S</strong><br />📞 +91 6385800939</p>
                        <p><strong>Mithunkarthik A S</strong><br />📞 +91 6381197998</p>
                    </div>

                    <div className="category">
                        <h3>Developers</h3>
                        <p><strong>Mathan Kumar S</strong></p>
                        <p><strong>Mithunkarthik A S</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
