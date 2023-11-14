import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from '../Components/NavBar2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './ScreenCss/MyProfile.css';

function MyProfileScreen(props) {

  const activeUserID = localStorage.getItem('activeUser');

  let data = useLocation();
  console.log(data && data.state && data.state.testid);

  const [personalEditMode, setPersonalEditMode] = useState(false);
  const [addressesEditMode, setAddressesEditMode] = useState(false);

  const [personalError, setPersonalError] = useState("");
  const [personalErrorField, setPersonalErrorField] = useState("");
  const [addressesError, setAddressesError] = useState("");
  const [addressesErrorField, setAddressesErrorField] = useState("");
  const [error, setError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const [userTest, setUserTest] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  // useEffect(() => {
  //   // Check if data and data.state are not null or undefined before making the API call
  //   if (data && data.state && data.state.testid) {
  //     function getUserTest() {
  //       axios.get("http://localhost:3001/users/"+data.state.testid).then((res) => {
  //         setUserTest(res.data);
  //       });
  //     }
  //     getUserTest();
  //   }
  // }, [data]);

  useEffect(() => {
    // Fetch user data
    axios.get("http://localhost:3001/users/" + activeUserID).then((res) => {
      setUserTest(res.data);
    });

    // Retrieve and filter orders from localStorage
    const orders = Object.keys(localStorage)
      .filter(key => key.includes(`UserId-${activeUserID}`))
      .map(key => JSON.parse(localStorage.getItem(key)));

    setUserOrders(orders);
  }, [activeUserID]);

  useEffect(() => {
    // Check if userTest is not an empty array before initializing formData
    if (userTest.length !== 0) {
      setFormData({
        firstname: userTest.firstname,
        lastname: userTest.lastname,
        email: userTest.email,
        phonenumber: userTest.phonenumber,
        billingaddress: userTest.billingaddress,
        shippingaddress: userTest.shippingaddress,
      });
    }
  }, [userTest]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    billingaddress: "",
    shippingaddress: "",
  });

  const handlePersonalEditClick = () => {
    setPasswordModalOpen(true);
    setPersonalEditMode(!personalEditMode);
  };

  const handleAddressesEditClick = () => {
    setPasswordModalOpen(true);
    setAddressesEditMode(!addressesEditMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset the error field when the user starts typing
    if (name === 'firstname') {
      setPersonalErrorField('');
    } else if (name === 'lastname') {
      setPersonalErrorField('');
    } else if (name === 'email') {
      setPersonalErrorField('');
    } else if (name === 'phonenumber') {
      setPersonalErrorField('');
    } else if (name === 'billingaddress') {
      setAddressesErrorField('');
    } else if (name === 'shippingaddress') {
      setAddressesErrorField('');
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (e) => {

    e.preventDefault();

    if(personalEditMode){
      if (!formData.firstname){
        setPersonalErrorField("firstname");
        setPersonalError("Please fill in your First Name");
        return;
      }

      if (!formData.lastname){
        setPersonalErrorField("lastname");
        setPersonalError("Please fill in your Last Name");
        return;
      }

      if (!formData.email){
        setPersonalErrorField("email");
        setPersonalError("Please fill in your email");
        return;
      }

      if (!formData.phonenumber){
        setPersonalErrorField("phonenumber");  
        setPersonalError("Please fill in your Phone Number");
        return;
      }

      // Validate first name (should not contain digits)
      if (/\d/.test(formData.firstname)) {
        setPersonalErrorField("firstname")
        setPersonalError("First name should not contain digits");
        return;
      }

      // Validate last name (should not contain digits)
      if (/\d/.test(formData.lastname)) {
        setPersonalErrorField("lastname")
        setPersonalError("Last name should not contain digits");
        return;
      }

      // Validate email
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(formData.email)) {
        setPersonalErrorField("email")
        setPersonalError("Invalid email format");
        return;
      }

      // Validate phone
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phoneRegex.test(formData.phonenumber)) {
        setPersonalErrorField("phonenumber")
        setPersonalError("Invalid phone format. Use ###-###-####");
        return;
      }

      // If no errors, reset errorField
      setPersonalErrorField("");

      // Prepare the data for saving
      const userDataToUpdate = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phonenumber: formData.phonenumber,
        billingaddress: userTest.billingaddress,
        shippingaddress: userTest.shippingaddress,
        password: userTest.password
      };

            // Make an API request to update the user's data
        axios
          .post("http://localhost:3001/users/update/"+activeUserID, userDataToUpdate)
          .then((res) => {
            // Handle success - e.g., show a success message
            console.log("User updated!");
            alert("Changes saved successfully!");
            // Update userTest state with the latest data
            setUserTest((prevUserTest) => ({
              ...prevUserTest,
              firstname: formData.firstname,
              lastname: formData.lastname,
              email: formData.email,
              phonenumber: formData.phonenumber,
        }));
          })
          .catch((err) => {
            // Handle errors - e.g., show an error message
            console.error("Error: " + err);
            setError("An error occurred while updating the profile. Please try again.");
          });
      setPersonalEditMode(false);
    } else if (addressesEditMode) {
      // Validate the form data before saving (optional)
      if (!formData.shippingaddress){ 
        setAddressesErrorField("shippingaddress"); 
        setAddressesError("Please fill in the Shipping Address");
        return;
      }

      if (!formData.billingaddress){ 
        setAddressesErrorField("billingaddress"); 
        setAddressesError("Please fill in the Billing Address");
        return;
      }

        // Prepare the data for saving
      const userDataToUpdate = {
        firstname: userTest.firstname,
        lastname: userTest.lastname,
        email: userTest.email,
        phonenumber: userTest.phonenumber,
        billingaddress: formData.billingaddress,
        shippingaddress: formData.shippingaddress,
        password: userTest.password
      };

            // Make an API request to update the user's data
        axios
          .post("http://localhost:3001/users/update/"+activeUserID, userDataToUpdate)
          .then((res) => {
            // Handle success - e.g., show a success message
            console.log("User updated!");
            alert("Changes saved successfully!");
            // Update userTest state with the latest data
            setUserTest((prevUserTest) => ({
              ...prevUserTest,
              billingaddress: formData.billingaddress,
              shippingaddress: formData.shippingaddress,
        }));
          })
          .catch((err) => {
            // Handle errors - e.g., show an error message
            console.error("Error: " + err);
            setError("An error occurred while updating the profile. Please try again.");
          });
      setAddressesEditMode(false);
    };
  };

  const handleCancel = () => {
    setPersonalEditMode(false);
    setAddressesEditMode(false);
  };

  const handlePasswordSave = () => {
    // Check the entered password against the user's password
    if (password === userTest.password) {
      setPassword("");
      setPasswordError("");
      // Password is correct, close the modal and proceed with editing
      setPasswordModalOpen(false);
  
    // Determine which section to edit based on the button clicked
    if (personalEditMode) {
      setPersonalEditMode(true);
    } else if (addressesEditMode) {
      setAddressesEditMode(true);
    }

    } else {
      // Password is incorrect, show an error
      setPasswordError("Incorrect password");
    }
  };

  const handlePasswordCancel = () => {
    // Clear the password and error state
    setPassword("");
    setPasswordError("");

    // Close the password modal
    setPasswordModalOpen(false);

    // Check the edit mode and revert changes if needed
    if (personalEditMode) {
      setPersonalEditMode(false);
    } else if (addressesEditMode) {
      setAddressesEditMode(false);
    }
  };

  const renderPersonalField = (label, value, name) => (
    <div className="field">
      <label>{label}:</label>
      {personalEditMode ? (
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );

  const renderAddressesField = (label, value, name) => (
    <div className="field">
      <label>{label}:</label>
      {addressesEditMode ? (
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );

  return (
    <div className="MainContainerForMyProfileScreen">
      <NavBar />
      <div className="QuickButtonsForMyProfile">
        <Link to='/CartScreen'>
          <button className="MyCartButtonMyProfile"> My Cart </button>
        </Link>

        <Link to='/CartScreen'>
          <button className="MyWishlistButtonMyProfile"> My Wishlist </button>
        </Link>
        
        <Link to='/LoginScreen'>
          <button className="LogoutButtonMyProfile"> Logout </button>
        </Link>

      </div>  
      <div>
        <div className="MyProfilebox">
          <h2>My Profile</h2>
        </div>
        <div className="box-container">
          <div className="Detailsbox">
            <h3>Personal Information</h3>
            {renderPersonalField("First Name", formData.firstname, "firstname")}
            {personalErrorField === "firstname" && <div className="error-message">{personalError}</div>}
            {renderPersonalField("Last Name", formData.lastname, "lastname")}
            {personalErrorField === "lastname"  && <div className="error-message">{personalError}</div>}
            {renderPersonalField("Email", formData.email, "email")}
            {personalErrorField === "email"  && <div className="error-message">{personalError}</div>}
            {renderPersonalField("Phone", formData.phonenumber, "phonenumber")}
            {personalErrorField === "phonenumber"  && <div className="error-message">{personalError}</div>}
            <div className="edit-button-container">
              {personalEditMode ? (
                <>
                  <button onClick={(e) => handleSave(e)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button onClick={handlePersonalEditClick}>
                  <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "8px" }} />
                  Edit
                </button>
              )}
            </div>
          </div>

          <div className="Addressbox">
            <h3>Addresses</h3>
            {renderAddressesField("Billing Address", formData.billingaddress, "billingaddress")}
            {addressesErrorField === "billingaddress" && <div className="error-message">{addressesError}</div>}
            {renderAddressesField("Shipping Address", formData.shippingaddress, "shippingaddress")}
            {addressesErrorField === "shippingaddress" && <div className="error-message">{addressesError}</div>}
            <div className="edit-button-container">
              {addressesEditMode ? (
                <>
                  <button onClick={(e) => handleSave(e)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button onClick={handleAddressesEditClick}>
                  <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "8px" }} />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={passwordModalOpen}
        onRequestClose={handlePasswordCancel}
        style={{
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', 
          }
        }}
      >
        <div className="modal-header">
          <h2>Enter Your Password</h2>
          <button className="close-button" onClick={handlePasswordCancel}>
            &#10005;
          </button>
        </div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <div className="modal-buttons">
          <button className="ok-button" onClick={handlePasswordSave}>OK</button>
          <button className="cancel-button" onClick={handlePasswordCancel}>Cancel</button>
        </div>
      </Modal>
    </div> 
  );
}

export default MyProfileScreen;
