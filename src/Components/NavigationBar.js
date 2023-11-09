
import React from "react";
import {Link} from 'react-router-dom';
import './ComponentCss/NavigationBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
  
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to='/MainScreen' className="link"> <span> <b> TechnoTreasures </b></span> </Link>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Looking for a Product?" />
      </div>
      <div className="navbar-right">
        <span className='iconNavBar'>
            <Link 
              to={'/WishlistScreen'}
              style={{ textDecoration: 'none', color: '#F15A22'}}
            >
              <FontAwesomeIcon icon={ faHeart } size='2x' />
            </Link>
        </span>
        <span className='iconNavBar'>
            <Link 
              to={'/CartScreen'}
              style={{ textDecoration: 'none', color: '#F15A22'}}
            >
              <FontAwesomeIcon icon={ faCartShopping } size='2x'  />
            </Link>
        </span>
        <span className='iconNavBar'>
            <Link
              to={'/EditProfileScreen'}
              style={{ textDecoration: 'none', color: '#F15A22'}}
            >
              <FontAwesomeIcon icon={ faUser } size='2x'  />
            </Link>
        </span>
      </div>
    </div>
  );
}

export default NavigationBar;

