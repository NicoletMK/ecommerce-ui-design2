import React, { useState } from "react";
import './ScreenCss/ContactUs.css';
import { Link, useNavigate } from 'react-router-dom';

function ContactUsScreen() {
  // Define state variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // You can implement logic to send the message or make API calls here
    console.log("Sending message:", { name, email, message });
  };

  return (
    
    
    <div className="MainContainerForContactUsScreen">

      <div className="BackToLoginContainerForContactUsScreen">
        <Link to='/LoginScreen'>
          <button className="BacktoLoginForContactUsScreen"> Back To Login </button>
        </Link>
      </div>

      <div className="WelcomeSectionForContactUsScreen">
        <h1 className="ContactUsTitleForContactUsScreen">Contact Us</h1>
      </div>

      <div className="ContentContainerForContactUsScreen">
        
        
        <div className="ContactInfoSectionForContactUsScreen">
          <h2>Contact Information</h2>
          <p> <b> Email: technotreasure@gmail.com </b></p>
          <p> <b> Phone: +123-456-7890 </b></p>
          <p> <b> Address: 6803 Chase Hill Blvd, San Antonio, TX</b></p>  
        </div>

        <div className="ContactFormSectionForContactUsScreen">
          
          <h2>Contact Us</h2>
          
          <form className="formGroupForContactUsScreen" >
            
            <div className="form-groupForContactUsScreen">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="form-groupForContactUsScreen">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-groupForContactUsScreen">
              <label>Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
              ></textarea>
            </div>
            <button type="button" onClick={handleSend}>Send</button>
          
          </form>
        
        </div>
      </div>
    </div>
  
  );
}

export default ContactUsScreen;