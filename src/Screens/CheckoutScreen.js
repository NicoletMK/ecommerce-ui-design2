import React, { useState } from 'react';
import './ScreenCss/Checkout.css';
import logoImage from './ScreenCss/logoo.png'
function CheckoutScreen() {
    /* For the Shipping tab */
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    /* Items */
    const orderItems = [
        { id: 1, name: 'Item 1', price: 20.00, quantity: 2 },
        { id: 2, name: 'Item 2', price: 15.00, quantity: 1 }
    ];

    /* Payment Methods */
    const [paymentMethod, setPaymentMethod] = useState('paypal'); // 'paypal' or 'creditCard'
    const [creditCardInfo, setCreditCardInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const handleCreditCardInfoChange = (event) => {
        const { name, value } = event.target;
        setCreditCardInfo(prevState => ({ ...prevState, [name]: value }));
    };

    /*If it is Std delivery or express*/

    const [deliveryOption, setDeliveryOption] = useState('standard'); // 'standard' or 'express'

    /*Calculates total (w/o) delivery fee */
    const orderSubtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const calculateDeliveryCost = () => {
        if (deliveryOption === 'standard') {
            return orderSubtotal > 200 ? 0 : 10;
        } else if (deliveryOption === 'express') {
            return orderSubtotal > 500 ? 0 : 25;
        }
        return 0;
    };

    // Calculate total price
    const deliveryCost = calculateDeliveryCost();
    const totalPrice = orderSubtotal + deliveryCost;
    const [currentTab, setCurrentTab] = useState(1);
    const handleTabClick = (tabNumber) => {
        setCurrentTab(tabNumber);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShippingInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add order placement logic here
    };

    return (
        <div className="checkout-containers">
            <div className="CheckoutLogo"><img src={logoImage}></img></div>
            <div className="checkout-container">
                <div className="checkout-content">
                    <div className="checkout-tabs">
                        <div className={`checkout-tab ${currentTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>Shipping</div>
                        <div className={`checkout-tab ${currentTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>Delivery</div>
                        <div className={`checkout-tab ${currentTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>Payment</div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {currentTab === 1 && (
                            <div className="checkout-tab-content">
                                <h3>Shipping Information</h3>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={shippingInfo.fullName}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={shippingInfo.address}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={shippingInfo.city}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    value={shippingInfo.postalCode}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={shippingInfo.country}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        {currentTab === 2 && (
                            <div className="checkout-tab-content">
                                <h3>Delivery Options</h3>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="standard-delivery"
                                        name="delivery"
                                        value="standard"
                                        checked={deliveryOption === 'standard'}
                                        onChange={() => setDeliveryOption('standard')}
                                    />
                                    <label htmlFor="standard-delivery">
                                        Standard Delivery - {orderSubtotal > 200 ? 'Free' : '$10'}
                                    </label>
                                </div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="express-delivery"
                                        name="delivery"
                                        value="express"
                                        checked={deliveryOption === 'express'}
                                        onChange={() => setDeliveryOption('express')}
                                    />
                                    <label htmlFor="express-delivery">
                                        Express Delivery - {orderSubtotal > 500 ? 'Free' : '$25'}
                                    </label>
                                </div>
                            </div>
                        )}

{currentTab === 3 && (
    <div className="checkout-tab-content">
        <h3>Payment Information</h3>
        <div className="radio-option">
            <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
            />
            <label htmlFor="paypal">PayPal</label>
        </div>
        <div className="radio-option">
            <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={() => setPaymentMethod('creditCard')}
            />
            <label htmlFor="creditCard">Credit Card</label>
        </div>
        {paymentMethod === 'creditCard' && (
            <div className="credit-card-info">
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={creditCardInfo.cardNumber}
                    onChange={handleCreditCardInfoChange}
                />
                <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date (MM/YY)"
                    value={creditCardInfo.expiryDate}
                    onChange={handleCreditCardInfoChange}
                />
                <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={creditCardInfo.cvv}
                    onChange={handleCreditCardInfoChange}
                />
                 <button type="submit" className="place-order-button">Place Order</button>
            </div>
            
        )}
    </div>
)}

                    </form>
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <ul>
                        {orderItems.map(item => (
                            <li key={item.id}>
                                {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default CheckoutScreen;
