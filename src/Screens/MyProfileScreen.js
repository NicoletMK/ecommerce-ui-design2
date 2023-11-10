import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from '../Components/NavigationBar';
import './ScreenCss/MyProfile.css';
import {Link} from 'react-router-dom';

import { useEffect } from 'react';
import axios from "axios";

function MyProfileScreen(props) {

  let data = useLocation();
  console.log(data.state)
  console.log(data.state.userFirstName)
  console.log(data.state.testid)

  const [userTest, setUserTest] = useState([]);

  useEffect(() => {
    function getUserTest() {
      axios.get("http://localhost:3001/users/"+data.state.testid).then((res) => {
        setUserTest(res.data);
      });
    }
    getUserTest();
    }, []);
  
  useEffect(() => {
    console.log(userTest);
  }, [userTest]);

  // Define state variables to store form input values
  //const [firstName, setFirstName] = useState("John");
  //const [lastName, setLastName] = useState("Doe");
  //const [email, setEmail] = useState("johndoe@example.com");
  //const [shippingAddress, setShippingAddress] = useState("123 Main St");
  //const [billingAddress, setBillingAddress] = useState("456 Park Ave");


   // Handler to prevent editing of uneditable fields
   const preventEdit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="MainContainerForMyProfileScreen">
    <NavBar /> 
      <div className="WelcomeSection">
        <h3>Welcome!</h3>
      </div>
      <div className="ContentContainer">
        <div className="LeftSection">
          <div className="ManageAccountSection">
            <h2>Manage My Account</h2>
            <ul className="CenteredButtons">
              <li>
                <Link to={'/EditProfileScreen'}
                  state= {{ userFirstName: "Musquan", userLastName: "Karovalia", userEmail: "MusquanKarovalia@gmail.com", userShippingAddress: "UTSA - Shipping", userBillingAddress: "UTSA - Billing", testid: "654b15bceb65eab62c7897fe"}}
                  >
                  <button>Edit My Profile</button>
                </Link>
              </li>
              <li>
                <a href="/my-wishlist">
                  <button>My Wishlist</button>
                </a>
              </li>
              <li>
                <a href="/my-cart">
                  <button>My Cart</button>
                </a>
              </li>
            </ul>
          </div>
          <div className="MyOrderDetailsSection">
            <h2>My Order Details</h2>
            <div className="OrderItem">
              <p>Order Number: <span>123456</span></p>
              <p>Order ID: <span>ABCDEF123</span></p>
            </div>
            <div className="OrderItem">
              <p>Order Number: <span>789012</span></p>
              <p>Order ID: <span>GHIJKL456</span></p>
            </div>
          </div>  
        </div>   
        <div className="RightSection"> 
          <div className="MyProfileSection">
            <h2>My Profile</h2>
              <form>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={userTest.firstname}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={userTest.lastname}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={userTest.email}
                  />
                </div>
                <div className="form-group">
                  <label>Shipping Address:</label>
                  <input
                    type="text"
                    value={userTest.shippingaddress}
                  />
                </div>
                <div className="form-group">
                  <label>Billing Address:</label>
                  <input
                    type="text"
                    value={userTest.billingaddress}
                  />
                </div>
              </form>
          </div>    
        </div>
      </div>
    </div>
  );
}

export default MyProfileScreen;
