import React, {useState, useEffect} from 'react';
import "./ComponentCss/ProductCard.css";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import ProductPlaceHolderImage from '../Images/productComingSoon.jpg';

function ProductCard(props){

    return (

        <div className="productCardContainer">
            <div className='imageContainer'>
                <img className='imagePlaceholder' src={ProductPlaceHolderImage} alt="Error!" width="100%" />
            </div>
            <div className='detailContainer'>
                <div className='titleContainer'>
                    <span className='productTitle'> <b> {props.name} </b> </span>
                </div>
                <div className='iconContainer'> 
                    <span className='icon'>
                        <Link 
                            to={'/WishlistScreen'}
                            style={{ textDecoration: 'none', color: '#0C2340'}}
                            >
                            <FontAwesomeIcon icon={ faHeart } size="2x" />
                        </Link>
                    </span>
                    <span className='icon'>
                        <Link to={'/CartScreen'} 
                                state= {{ productName: props.name, productId: props.id }}
                                style={{ textDecoration: 'none', color: '#0C2340'}}
                            >
                            <FontAwesomeIcon icon={ faCartShopping } size="2x" />
                        </Link>
                    </span>
                </div>
            </div>
        </div>

    );
}

export default ProductCard;
