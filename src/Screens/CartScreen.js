import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavigationBar';
import './ScreenCss/CartScreen.css';
import Sony1 from '../Images/Sony1.jpeg';
import SonyV from '../Images/SonyVloggerKit1.jpeg';
import Sharper from '../Images/SharperMassager1.jpeg';

function CartScreen() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      productId: 1110,
      productName: 'Sony Camera',
      productImage: Sony1,
      quantity: 1,
      price: 499.99,
    },
    {
      productId: 1112,
      productName: 'Sony Vlogger Kit',
      productImage: SonyV,
      quantity: 1,
      price: 59.99,
    },
    {
      productId: 3399,
      productName: 'Sharper Massager',
      productImage: Sharper,
      quantity: 1,
      price: 99.99,
    },
  ]);

  const handleRemoveFrom = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
  };

  const handleIncreaseQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <div className="MainContainerForProductCartScreen">
      <NavBar />

      <div className="ProductsAndOrderSummaryContainer">
        <div className="CartBox">
          <h2>Shopping Cart</h2>
          <div className="ProductsInCartContainer">
            {products.map((product, index) => (
              <div key={index} className="ProductCard">
                <img src={product.productImage} alt="Product" />
                <div className="ProductsDetails">
                  <ul>
                    <li> Product ID: {product.productId} </li>
                    <li> Product Name: {product.productName} </li>
                    <li>
                      Qty: <button onClick={() => handleDecreaseQuantity(product.productId)}>-</button>{' '}
                      {product.quantity} <button onClick={() => handleIncreaseQuantity(product.productId)}>+</button>
                    </li>
                    <li> Unit Price: ${product.price.toFixed(2)} </li>
                    <li> Total Price: ${(product.price * product.quantity).toFixed(2)}</li>
                    <div>
                      <button className="RemoveItemButton" onClick={() => handleRemoveFrom(product.productId)}>
                        Remove Item
                      </button>
                    </div>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="OrderSummaryContainer">
          <h3>Order Summary</h3>
          <p>Total Price: ${products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</p>
          <button className="CheckoutButton" onClick={() => navigate('/CheckoutScreen')}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
