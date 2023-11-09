import logo from './logo.svg';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import Navbar from './Components/NavigationBar'
import Footer from './Components/Footer'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import MainScreen from './Screens/MainScreen'
import TestScreen from './Screens/TestScreen'


function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact component={<MainScreen />} />
          <Route path="/MainScreen" exact component={<MainScreen />} />
          <Route path="/TestScreen" exact component={<TestScreen />} />
        </Routes>
    </Router>
  );
}

export default App;
