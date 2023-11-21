import React from "react";
import Footer from "../Components/Footer";
import './ScreenCss/Wishlist.css'
import { useEffect } from 'react';
import NavBar from '../Components/NavBar2';
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from 'react-icons/fa';
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
  
  const handleAddToCart = (product) => {

    const prevProducts = JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || []

    const existingProductIndex = prevProducts.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingProductIndex !== -1) {
      alert('This item is already in your cart!');
      return;
    } else {
      product.count = 1;
      prevProducts.push(product);
    }

    // Update the cart in local storage
    localStorage.setItem('products-key-' + activeUserID, JSON.stringify(prevProducts));

  }

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            i <= rating ? <FaStar color="orange" key={i} /> : <FaRegStar color="orange" key={i} />
        );
    }
    return stars;
   };


  return (
    <>
      <div className="ContainerForNavBar">
        <NavBar />
      </div>

      <div className="MainContainerForWishlistScreen">
        <div className="WishlistHeader">
          <h1> Your Wishlist {userTest.firstname} {userTest.lastname}</h1>
          {productsWishlist.length === 0 ? (
            <p>No products found in your wishlist. Explore our products and add your favorites!!</p>
        ) : (
            <div className='ProductsInWishlistContainer'>
                {productsWishlist.map((product, index) => (
                    
                    <div key={index} className='ProductCard'>
                        <ul>
                            
                            <li> <img src={product.productImagePath} alt={product.productName} /> </li>
                            
                            
                            <Link 
                              to='/ProductDetailScreen'
                              state={{
                                productName:product.productName,
                                productPrice: product.productPrice,
                                productId: product.productId,
                                productRating: product.productRating,
                                productImagePath: product.productImagePath,
                                productImagePath1: product.productImagePath1,
                                productImagePath2: product.productImagePath2,
                                productImagePath3: product.productImagePath2,
                                productImagePath4: product.productImagePath4,
                                productDescription: product.productDescription,
                                productCategory: product.productCategory
                              }}
                            >
                              <li> <h3> {product.productName} </h3> </li>
                            </Link>
                            <li>Description: {product.productDescription} </li>
                            <li> Rating:{renderStars(product.productRating)}</li>
                            <li> Price: ${Number(product.productPrice).toFixed(2)} </li>
                            {/* <li> {product.productPrice}</li> */}
                            <button className='RemoveItemButton' onClick={(e) => handleRemoveFromWishlist(product.productId)}> Remove Item </button>
                            <Link to="/CartScreen">
                              <button onClick={(e) => handleAddToCart(product)} className="WishlistAddToCartButton">
                                Add to Cart
                              </button>
                            </Link>
                        </ul>
                    </div>
                
                
                ))}
            </div>
        )}
        </div>
      </div>
  </>  
  );
}

export default WishlistScreen;