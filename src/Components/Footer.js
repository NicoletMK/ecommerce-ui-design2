import React from 'react';
import './ComponentCss/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className='footerAllContainer'>
            <div className="footerContent">
                <div className="footerSection">
                    <h3 className="footer-Title"><a href='/MainScreen' className="navbar-brand">TechnoTreasure</a></h3>
                    <p className="footerDescription">TechnoTreasure is your go-to destination for all things tech.</p>
                    <div className="socialMedia">
                        <a href="https://www.facebook.com/TechnoTreasureUI" className="socialLink" target="_blank" rel="noopener noreferrer" aria-label="Visit TechnoTreasure on Facebook">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com/TechnoTreUI" className="socialLink" target="_blank" rel="noopener noreferrer" aria-label="Follow TechnoTreasure on Twitter">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://www.instagram.com/technotreasure_/" className="socialLink" target="_blank" rel="noopener noreferrer" aria-label="Follow TechnoTreasure on Instagram">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>

                </div>
                <div className="footerSection links">
                    <h3 className="footerTitle">Quick Links</h3>
                    <ul className='footerList'>
                        <li><a href='/ContactUsScreen' className='footerLink'>Contact Us</a></li>
                        <li><a href='/FAQsScreen' className='footerLink'>FAQs</a></li>
                        <li><a href='/PrivacyPolicyScreen' className='footerLink'>Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footerBottom">
                    <p>© TechnoTreasure 2023. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
