import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";


const SocialMediaLinks = () => {
    const socialLinks = [
        { href: "https://www.facebook.com/profile.php?id=61569060322089", icon: <FaFacebook />, label: "Facebook" },
        { href: "https://www.instagram.com/dieseldowndynos/", icon: <FaInstagram />, label: "Instagram" },
        { href: "https://www.tiktok.com/@dieseldownllc", icon: <FaTiktok />, label: "TikTok" },
        { href: "https://www.youtube.com/@DieselDownDynos", icon: <FaYoutube />, label: "YouTube" },
    ];

    return (
        <div style={{ textAlign: "center" }}>
            <h4>Follow Us</h4>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="social-icon" // Add the CSS class
                    >
                        {link.icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SocialMediaLinks;
