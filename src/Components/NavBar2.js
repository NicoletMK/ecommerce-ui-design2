import React from "react";
import { Link } from 'react-router-dom';
import './ComponentCss/NavigationBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to='/MainScreen' className="navbar-brand" aria-label="Go to Home page">TechnoTreasure</Link>
            </div>

            <div className="navbar-right">
                <Link to={'/WishlistScreen'} className='navbar-icon' aria-label="Go to Wishlist">
                    <FontAwesomeIcon icon={faHeart} />
                </Link>
                <Link to={'/CartScreen'} className='navbar-icon' aria-label="Go to Cart">
                    <FontAwesomeIcon icon={faCartShopping} />
                </Link>
                <Link
                    to={'/MyProfileScreen'}
                    state={{ userFirstName: "Musquan", userLastName: "Karovalia", userEmail: "MusquanKarovalia@gmail.com", userShippingAddress: "UTSA - Shipping", userBillingAddress: "UTSA - Billing", testid: "654b15bceb65eab62c7897fe" }}
                    style={{ textDecoration: 'none', color: '#F15A22' }}
                    aria-label="Go to your profile"
                >
                    <FontAwesomeIcon icon={faUser} size='2x' />
                </Link>
            </div>
        </div>
    );
}

export default NavigationBar;
