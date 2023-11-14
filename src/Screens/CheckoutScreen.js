import React, { useState } from 'react';
import NavBar from '../Components/NavBar2';
import { useNavigate } from "react-router-dom";
import './ScreenCss/Checkout.css';
import logoImage from './ScreenCss/logoo.png'

function CheckoutScreen(props) {
    const navigate = useNavigate();

    const activeUserID = localStorage.getItem('activeUser');
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || []
    );

    const [currentTab, setCurrentTab] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');

    const handleTabClick = (tabIndex) => {
        setCurrentTab(tabIndex);
    };

    const calculateProductTotal = (product) => {
        return product.count * product.productPrice;
    };

    const calculateSubtotal = () => {
        return products.reduce(
            (total, product) => total + calculateProductTotal(product),
            0
        );
    };

    const calculateTax = (subtotal) => {
        return subtotal * 0.08; // 8% tax
    };


    const goToPaymentTab = () => {
        if (!firstName || !lastName || !shippingAddress || !billingAddress || !phoneNumber) {
            alert('Please fill all required fields.');
            return;
        }
        handleTabClick(2);
    };
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const tax = calculateTax(subtotal);
        return subtotal + tax;
    };

    const handlePlaceOrder = () => {
        handleCheckout(); 
    };

    // New state for credit card information
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [zip, setBillingZip] = useState('');
    const handleCheckout = () => {
        if (
            !firstName ||
            !lastName ||
            !shippingAddress ||
            !billingAddress ||
            !phoneNumber ||
            !cardName ||
            !cardNumber ||
            !expiryDate ||
            !cvv ||
            !zip 
        ) {
            alert('Please fill all sections before proceeding to checkout.');
            return;
        }

        // Generate a unique order ID
        const orderId = Math.floor(Math.random() * 1000000);

        const orderTotal = calculateTotal();

        // Create an object to represent the entire order
        const order = {
            orderId,
            orderTotal,
            firstName,
            lastName,
            shippingAddress,
            billingAddress,
            phoneNumber,
            paymentInfo,
            products,
        };

        localStorage.setItem('order-key-' + orderId + '-UserId-' + activeUserID, JSON.stringify(order));

        // Handle the checkout logic, e.g., sending data to a server or processing the order
        console.log('Checkout initiated with the following details:');
        console.log('Order ID:', orderId);
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Shipping Address:', shippingAddress);
        console.log('Billing Address:', billingAddress);
        console.log('Phone Number:', phoneNumber);
        console.log('Payment Information:', paymentInfo);
        console.log('Ordered Products:', products);
        console.log('Order Total:', orderTotal);

        localStorage.removeItem('products-key-' + activeUserID);
        setProducts([]);

        // we can clear the form fields after successful checkout
        setFirstName('');
        setLastName('');
        setShippingAddress('');
        setBillingAddress('');
        setPhoneNumber('');
        setPaymentInfo('');

        navigate("/MainScreen");

    };

    return (
        <>
            <NavBar />
            <div className="CheckoutLogo"><img src={logoImage}></img></div>
            <div className="checkout-container">
           
                <div className="checkout-content">
                    <div className="checkout-tabs">
                        <div className={`checkout-tab ${currentTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>Personal Info</div>
                        <div className={`checkout-tab ${currentTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>Payment Method</div>
                    </div>

                    {currentTab === 1 && (
                        <div className="checkout-tab-content">
                            <h2>Personal Information</h2>
                            <form>
                                <label>
                                    First Name:
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </label>

                                <label>
                                    Last Name:
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </label>

                                <label>
                                    Shipping Address:
                                    <input type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
                                </label>

                                <label>
                                    Billing Address:
                                    <input type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
                                </label>

                                <label>
                                    Phone Number:
                                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </label>

                                <button type="button" onClick={goToPaymentTab}>OK</button>
                            </form>
                        </div>
                    )}

                    {currentTab === 2 && (
                        <div className="checkout-tab-content">
                            <h2>Credit Card details</h2>
                            <form>
                                <label>
                                    Name on the Card :
                                    <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                                </label>

                                <label>
                                    Card Number:
                                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                                </label>

                                <label>
                                    Expiry Date:
                                    <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                                </label>

                                <label>
                                    CVV:
                                    <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                                </label>
                                <label>
                                    Billing Zip code:
                                    <input type="text" value={zip} onChange={(e) => setBillingZip(e.target.value)} />
                                </label>

                            </form>
                        </div>
                    )}
                </div>

                <div className="order-summary">
                    <h1>Product Details</h1>
                    <ul>
                        {products.map((product, index) => {
                            const productTotal = calculateProductTotal(product);
                            return (
                                <li key={index} className="product-item">
                                    <div className='product-image'>
                                        <img src={product.productImagePath} alt={product.productName} />
                                        <span>{product.productName} x {product.count}</span>
                                        <p>Total: ${productTotal.toFixed(2)}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="pricing-details">
                        <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                        <p>Tax (8%): ${calculateTax(calculateSubtotal()).toFixed(2)}</p>
                        <p><strong>Total: ${calculateTotal().toFixed(2)}</strong></p>
                    </div>
                    <button type="button" className="checkout-button" onClick={handleCheckout}>
                        Place Order
                    </button>
                </div>

            </div>
        </>
    );
}

export default CheckoutScreen;
