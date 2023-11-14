import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import "./ComponentCss/ProductCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FaStar } from 'react-icons/fa';

import ProductPlaceHolderImage from '../Images/productComingSoon.jpg';


function ProductCard(props) {

    const activeUserID = localStorage.getItem('activeUser');

    const WishlistIconClicked = (product) => {

        console.log("WishList Clicked")
        const prevProductsWishlist = JSON.parse(localStorage.getItem('wishlist-products-key-' + activeUserID)) || []
        const existingProductIndex = prevProductsWishlist.findIndex(
            (item) => item.productId === product.productId
        );

        if (existingProductIndex !== -1) {
            alert("Product already exists in the wishlist");
        } else {
            const newProductsWishlist = [...prevProductsWishlist, product];
            localStorage.setItem('wishlist-products-key-' + activeUserID, JSON.stringify(newProductsWishlist));
            alert("Product added to the wishlist");
        }
    };

    const CartIconClicked = (product) => {
        alert("Cart clicked from home screen")

        console.log("Cart Clicked")
        const prevProducts = JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || []

        const existingProductIndex = prevProducts.findIndex(
            (item) => item.productId === product.productId
        );

        if (existingProductIndex !== -1) {
            const updatedProduct = { ...prevProducts[existingProductIndex] };
            updatedProduct.count += 1;
            prevProducts[existingProductIndex] = updatedProduct;
        } else {
            const newProduct = { ...product, count: 1 };
            prevProducts.push(newProduct);
        }
        localStorage.setItem('products-key-' + activeUserID, JSON.stringify(prevProducts));
    };


    return (

        <div className="productCardContainer">
            <div className='imageContainer'>
                <img className='imagePlaceholder' src={props.productImagePath} alt="Error!"  />
            </div>
            <div className='detailContainer'>
                <div className='titleContainer'>
                    <div className='ProductTitleConatiner1'>
                        <h1 className='productTitle'> <b> {props.productName} </b> </h1>
                    </div>
                    <div className='ProductPriceAndRatingConatiner1'>
                        <h1 className='productPrice'> <b>Price: ${props.productPrice} </b> </h1>
                        <h1 className='productPrice'> <b>Rating: <FaStar /> {props.productRating}</b> </h1>
                        {/* <div className='productRating'>
                            <h1 className='productRating'> <b>Rating: <FaStar /> {props.productRating}</b> </h1>
                        </div> */}
                    </div>
                </div>
                <div className='iconContainer'>
                    <span className='icon'>
                        <Link
                            to={'/WishlistScreen'}
                            style={{ textDecoration: 'none', color: '#0C2340' }}
                            onClick={(e) => WishlistIconClicked(props)}
                        >
                            <FontAwesomeIcon icon={faHeart} size="1x" />
                        </Link>
                    </span>
                    <span className='icon'>
                        <Link to={'/CartScreen'}
                            state={{ productName: props.productName, productId: props.productId }}
                            style={{ textDecoration: 'none', color: '#0C2340' }}
                            onClick={(e) => CartIconClicked(props)}
                        >
                            <FontAwesomeIcon icon={faCartShopping} size="1x" />
                        </Link>
                    </span>
                </div>
            </div>
        </div>

    );
}

export default ProductCard;