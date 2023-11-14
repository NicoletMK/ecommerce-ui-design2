import React from "react";
import Footer from "../Components/Footer";
import './ScreenCss/Wishlist.css'
import { useEffect } from 'react';
import NavBar from '../Components/NavigationBar';
import { useState } from 'react';

import axios from "axios";

function WishlistScreen(props) {

  const activeUserID = localStorage.getItem('activeUser');
  const [userTest, setUserTest] = useState([]);
  console.log(userTest)

  useEffect(() => {
    // Fetch user data
    axios.get("http://localhost:3001/users/" + activeUserID).then((res) => {
      setUserTest(res.data);
    });
  }, [activeUserID]);
  
  const [productsWishlist, setProductsWishlist] = useState(JSON.parse(localStorage.getItem('wishlist-products-key-'+activeUserID)) || []);

  console.log({
    productsWishlist
  });

  const handleRemoveFromWishlist = (productId) => {  
    console.log("This is Remove From Wishlist");
    console.log(productId);
    const updatedProductsWishlist = productsWishlist.filter(product => product.productId !== productId);

    setProductsWishlist(updatedProductsWishlist);

    localStorage.setItem('wishlist-products-key-'+activeUserID, JSON.stringify(updatedProductsWishlist));

    alert("Item Removed from wishlist!")
  }   


  return (

    <div className="CotainerForWishlistPage">

      <div className="ContainerForNavBar">
        <NavBar />
      </div>

      <div className="MainContainerForWishlistScreen">
        <h1> Your Wishlist {userTest.firstname} {userTest.lastname}</h1>

        {productsWishlist.length === 0 ? (
            <p>No products in your wishlist</p>
        ) : (
            <div className='ProductsInWishlistContainer'>
                {productsWishlist.map((product, index) => (
                    <div key={index} className='ProductCard'>
                        <ul>
                            <li> <img src={product.productImagePath} alt="error" /> </li>
                            {/* <li> {product.productId} </li> */}
                            <li> <h3> {product.productName} </h3> </li>
                            <li> {product.productCategory} </li>
                            <li> {product.productDescription} </li>
                            <button className='RemoveItemButton' onClick={(e) => handleRemoveFromWishlist(product.productId)}> Remove Item </button>
                        </ul>
                    </div>
                ))}
            </div>
        )}
      
      </div>



    </div>
  );
}

export default WishlistScreen;