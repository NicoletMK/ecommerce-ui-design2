import React from "react";
import {Link} from 'react-router-dom';
import './ComponentCss/NavigationBar.css'

function NavigationBar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span> <b> TechnoTreasures </b></span>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Looking for a Product?" />
      </div>
      <div className="navbar-right">
        <span> <b> Wishlist </b> </span>
        <span> <b> Cart </b> </span>
        <span> <b> Profile </b> </span>
      </div>
    </div>
  );
}

export default NavigationBar;
