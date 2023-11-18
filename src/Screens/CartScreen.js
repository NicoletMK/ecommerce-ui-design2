import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar2';
import './ScreenCss/CartScreen.css';
import Sony1 from '../Images/Sony1.jpeg';
import SonyV from '../Images/SonyVloggerKit1.jpeg';
import Sharper from '../Images/SharperMassager1.jpeg';

function CartScreen() {

  const navigate = useNavigate();

  const activeUserID = localStorage.getItem('activeUser');

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || []
  );

  // const [products, setProducts] = useState([
  //   {
  //     productId: 1110,
  //     productName: 'Sony Camera',
  //     productImage: Sony1,
  //     quantity: 1,
  //     price: 499.99,
  //   },
  //   {
  //     productId: 1112,
  //     productName: 'Sony Vlogger Kit',
  //     productImage: SonyV,
  //     quantity: 1,
  //     price: 59.99,
  //   },
  //   {
  //     productId: 3399,
  //     productName: 'Sharper Massager',
  //     productImage: Sharper,
  //     quantity: 1,
  //     price: 99.99,
  //   },
  // ]);

  // const activeUserID = localStorage.getItem('activeUser');
  // const [products, setProducts] = useState(
  //   JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || []
  // );

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.productId === productId
        ? { ...product, count: newQuantity }
        : product
    );

    setProducts(updatedProducts);
    localStorage.setItem(
      'products-key-' + activeUserID,
      JSON.stringify(updatedProducts)
    );
  };

  const handleRemoveFrom = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.productId !== productId
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      'products-key-' + activeUserID,
      JSON.stringify(updatedProducts)
    );

    alert('Item Removed!');
  };

  const calculateProductTotal = (product) => {
    return product.count * product.productPrice; // Assuming productPrice exists in your product object
  };

  const calculateCartTotal = () => {
    return products.reduce((total, product) => total + calculateProductTotal(product), 0);
  };

  const handleCheckout = () => {
    // Logic to navigate to checkout screen with updated product information
    // You can pass the updated products to the checkout screen
    // For example, using react-router-dom history.push

  };


  // const handleRemoveFrom = (productId) => {
  //   setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
  // };

  // const handleIncreaseQuantity = (productId) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.productId === productId ? { ...product, quantity: product.quantity + 1 } : product
  //     )
  //   );
  // };

  // const handleDecreaseQuantity = (productId) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.productId === productId && product.quantity > 1
  //         ? { ...product, quantity: product.quantity - 1 }
  //         : product
  //     )
  //   );
  // };

  return (
    <div className="MainContainerForProductCartScreen">
      <NavBar />

      <div className="ProductsAndOrderSummaryContainer">
        <div className="CartBox">
          <h1>Shopping Cart</h1>
          {products.length === 0 ? (
            <p>No items in the cart. Explore our products and add to your cart!</p>
          ) : (
          <div className="ProductsInCartContainer">
            {products.map((product, index) => (
              <div key={index} className="ProductCard">
                <img src={product.productImagePath} alt="Product" />
                <div className="ProductsDetails">
                  <ul>
                    <li> Product ID: {product.productId} </li>
                    <li> Product Name: {product.productName} </li>
                    {/* <li>
                      Qty: <button onClick={() => handleDecreaseQuantity(product.productId)}>-</button>{' '}
                      {product.quantity} <button onClick={() => handleIncreaseQuantity(product.productId)}>+</button>
                    </li> */}
                    <li>
                      Count:{' '}
                      <input
                        type="number"
                        value={product.count}
                        min='1'
                        onChange={(e) =>
                          handleQuantityChange(product.productId, e.target.value)
                        }
                      />
                    </li>
                    <li> Unit Price: ${product.productPrice} </li>
                    <li> Product Total: ${calculateProductTotal(product).toFixed(2)} </li>
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
          )}
        </div>

        <div className="OrderSummaryContainer">
          <h3>Order Summary</h3>
          {/* <p>Total Price: ${products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</p> */}
          <p>Total Price: ${calculateCartTotal().toFixed(2)}</p>

          {products.length > 0 && (
            <div>
              <Link to="/CheckoutScreen">
                <button className="CheckoutButton" onClick={handleCheckout}>Go to Checkout</button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CartScreen;
