import React from 'react';
import './ComponentCss/Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className='footerAllContainer'>
            <div className="footerContent">
                <div className="footerSection">
                <h3 className="footer-Title"><Link to='/MainScreen' className="navbar-brand">TechnoTreasure</Link></h3>
                    <p className="footerDescription">TechnoTreasure is your go-to destination for all things tech.</p>
                    <div className="socialMedia">
                        <Link to="/social/facebook" className="socialLink"><FontAwesomeIcon icon={faFacebook} /></Link>
                        <Link to="/social/twitter" className="socialLink"><FontAwesomeIcon icon={faTwitter} /></Link>
                        <Link to="/social/instagram" className="socialLink"><FontAwesomeIcon icon={faInstagram} /></Link>
                    </div>
                </div>
                <div className="footerSection links">
                    <h3 className="footerTitle">Quick Links</h3>
                    <ul className='footerList'>
                        <li><Link to='/ContactUsScreen' className='footerLink'>Contact Us</Link></li>
                        <li><Link to='/FAQsScreen' className='footerLink'>FAQs</Link></li>
                        <li><Link to='/PrivacyPolicyScreen' className='footerLink'>Privacy Policy</Link></li>
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
