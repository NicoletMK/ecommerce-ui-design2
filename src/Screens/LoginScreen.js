import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ScreenCss/Login.css'; // Update with the correct path

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function getUsers() {
      axios.get("http://localhost:3001/users/").then((res) => {
        setUsers(res.data);
      });
    }
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleLogin = (event) => {
    event.preventDefault();
    const userFound = users.find(user => user.email === email && user.password === password);
    if (userFound) {
      console.log("Login successful");
      console.log(userFound);
      console.log(userFound._id);
      localStorage.setItem('activeUser', userFound._id);

      navigate("/MainScreen");
    } else {
      setError({ ...errors, form: "Invalid email or password !!" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="OverallContainer">
      <button onClick={() => setModalVisible(true)} className="OpenModalButton">Sign In</button>

      {modalVisible && (
        <div className="Modal">
          <div className="ModalContent">
            <span onClick={() => setModalVisible(false)} className="CloseButton">&times;</span>
            <h2 className="LoginTitle">Welcome Back!</h2>
            <p className="LoginSubtitle">Please sign in to continue</p>
            <form className="LoginForm" onSubmit={handleLogin}>
              <input type="text" placeholder="Email" className="LoginInput" value={email} onChange={e => setEmail(e.target.value)} />
              {errors.email && <p className="error">{errors.email}</p>}

              <div className="PasswordInputContainer">
                <input type={showPassword ? "text" : "password"} placeholder="Password" className="LoginInput" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={togglePasswordVisibility} className="ShowPasswordButton">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.form && <p className="error">{errors.form}</p>}

              <button type="submit" className="LoginButton">Sign In</button>
              <Link to="/ForgotPassword" className="ForgotPasswordLink">Forgot Password?</Link>
              <p className="SignupPrompt">
                Don't have an account? <Link to="/SignupScreen" className="SignupLink">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
