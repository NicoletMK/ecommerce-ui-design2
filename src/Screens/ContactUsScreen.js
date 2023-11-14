import React, { useState } from "react";
import './ScreenCss/ContactUs.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons';

function ContactUsScreen() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    
    console.log("Sending message:", { name, email, message });
     alert("Message sent successfully!");
     setName("");
     setEmail("");
     setMessage("");
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
        
           <p><FontAwesomeIcon icon={faEnvelope} /> technotreasure@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} /> +123-456-7890</p>
            <p><FontAwesomeIcon icon={faAddressCard} /> 6803 Chase Hill Blvd, San Antonio, TX</p>
        </div>

        <div className="ContactFormSectionForContactUsScreen">
          
          <h2>Hola!! How can we help you? </h2>
          
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