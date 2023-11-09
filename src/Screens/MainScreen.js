import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import './ScreenCss/MainScreen.css'

function MainScreen() {
  return (
    <div className="MainContainerForMainMenu">
      <div className="ContainerForInstruction">
        <h1> Please put all the things for the main menu here in this page </h1>
      </div>
      <div className="ContainerForTestingLinks">
        <ul className="LinksForTesting">
          <li> <Link to='/ProductDetailScreen'> Product Details </Link> </li>
          <li> <Link to='/EditProfileScreen'> Edit Profile </Link> </li>
          <li> <Link to='/LoginScreen'> Login </Link> </li>
          <li> <Link to='/SignupScreen'> Sign Up </Link> </li>
          <li> <Link to='/ContactUsScreen'> Contact Us </Link> </li>
          <li> <Link to='/PrivacyPolicyScreen'> Privacy Policy </Link> </li>
          <li> <Link to='/FAQsScreen'> FAQs </Link> </li>
          <li> <Link to='/TestScreen'> TestScreen </Link> </li>
        </ul>
      </div>
    </div>
  );
}

export default MainScreen;