import React from "react";
import Footer from "../Components/Footer";
import './ScreenCss/CartScreen.css'
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

function CartScreen(props) {

  //let data = useLocation();
  //console.log(data.state)

  return (
    <div className="MainContainerForCartScreen">
      <h1> Please put all the things for the Cart Screen here in this page </h1>
      Things added to the card<br></br>
    </div>
  );
}

export default CartScreen;