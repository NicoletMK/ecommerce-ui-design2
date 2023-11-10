import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ScreenCss/Checkout.css';
import NavBar from '../Components/NavigationBar';
import dellLaptop from '../Images/dell laptop.png';
import Earpod from '../Images/earpod.png';

function CheckoutScreen() {
    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        billingAddress: '',
        shippingAddress: '',
        phoneNumber: '',
        emailAddress: '',
    });

    const [items, setItems] = useState([
        { id: 1, name: 'Dell Laptop', price:999.99, quantity: 2, image: dellLaptop},
        { id: 2, name: 'Earpod', price: 99, quantity: 1, image: Earpod },

    ]);

    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const [cardInfo, setCardInfo] = useState({
        cardName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateShippingFee = (subtotal) => {
        return subtotal > 199 ? 0 : 10;
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = () => {
        // Create a confirmation message
        const confirmationMessage = `Confirm your order with a total of $${total}`;

        // Display the confirmation dialog
        const isConfirmed = window.confirm(confirmationMessage);

        if (isConfirmed) {
            console.log('Order confirmed!');
        } else {
            console.log('Order canceled.');
        }
    }

    const subtotal = calculateTotal();
    const shippingFee = calculateShippingFee(subtotal);
    const total = (subtotal + shippingFee).toFixed(2);

    return (
        <div className='MainContainerForCheckoutScreen'>
            <NavBar />
    
            <div>
            <h1>TechnoTreasure</h1>
            </div>
           
            <div className='ContainerForCheckoutScreen'>
            
            
                <div className='CheckoutForm'>
                    <div className='checkout-billing-info'>
                        <h2>Billing Details</h2>
                        <form>
                            <div className='checkout-form-group'>
                                <label className='required-label'>First Name </label>
                                <input
                                    type='text'
                                    value={billingInfo.firstName}
                                    onChange={(e) =>
                                        setBillingInfo({ ...billingInfo, firstName: e.target.value })
                                    }
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label className='required-label'>Last Name </label>
                                <input
                                    type='text'
                                    value={billingInfo.lastName}
                                    onChange={(e) =>
                                        setBillingInfo({ ...billingInfo, lastName: e.target.value })
                                    }
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label className='required-label'>Billing Address </label>
                                <input
                                    type='text'
                                    value={billingInfo.billingAddress}
                                    onChange={(e) =>
                                        setBillingInfo({ ...billingInfo, billingAddress: e.target.value })
                                    }
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label className='required-label'>Shipping Address</label>
                                <input
                                    type='text'
                                    value={billingInfo.shippingAddress}
                                    onChange={(e) =>
                                        setBillingInfo({ ...billingInfo, shippingAddress: e.target.value })
                                    }
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label className='required-label'>Phone Number</label>
                                <input
                                    type='text'
                                    value={billingInfo.phoneNumber}
                                    onChange={(e) =>
                                        setBillingInfo({ ...billingInfo, phoneNumber: e.target.value })
                                    }
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label>Email Address</label>
                                <input
                                    type='text'
                                    value={billingInfo.emailAddress}
                                    onChange={(e) =>
                                        setBillingInfo({ ...billingInfo, emailAddress: e.target.value })
                                    }
                                />
                            </div>
                        </form>
                    </div>
                    <div className='checkout-order-summary'>
                        <h2>Order Summary</h2>
                        <ul className='checkout-ul'>
                            {items.map((item) => (
                                <li className='checkout-li' key={item.id}>
                                    <div className='product-image'>
                                        <img src={item.image} alt={item.name} /> <span>{item.name} x {item.quantity} </span>
                                    </div>
                                    <div className='product-details'>
                                     ${item.price * item.quantity}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='checkout-totalprice'>
                            <span>Subtotal:</span> ${subtotal}
                        </div>
                        <div className='checkout-separator'></div>
                        <div className='checkout-shipping-fee'>
                            <span>Shipping Fee:</span> {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
                        </div>
                        <div className='checkout-separator'></div>
                        <div className='checkout-total'>
                            <span>Total:</span> ${total}
                        </div>
                        <div className='checkout-payment-methods'>
                            <h3>Payment Methods</h3>
                            <label>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value='paypal'
                                    checked={paymentMethod === 'paypal'}
                                    onChange={handlePaymentMethodChange}
                                />
                                PayPal
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value='creditdebit'
                                    checked={paymentMethod === 'creditdebit'}
                                    onChange={handlePaymentMethodChange}
                                />
                                Credit/Debit Card
                            </label>
                            {paymentMethod === 'creditdebit' && (
                                <div>
                                    <h4>Enter Card Information</h4>
                                    <div className='checkout-form-group'>
                                        <label>Name on Card</label>
                                        <input
                                            type='text'
                                            value={cardInfo.cardName}
                                            onChange={(e) =>
                                                setCardInfo({ ...cardInfo, cardName: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className='checkout-form-group'>
                                        <label>Card Number</label>
                                        <input
                                            type='text'
                                            value={cardInfo.cardNumber}
                                            onChange={(e) =>
                                                setCardInfo({ ...cardInfo, cardNumber: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className='checkout-form-group'>
                                        <label>Expiration Date</label>
                                        <input
                                            type='text'
                                            value={cardInfo.expirationDate}
                                            onChange={(e) =>
                                                setCardInfo({ ...cardInfo, expirationDate: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className='checkout-form-group'>
                                        <label>CVV</label>
                                        <input
                                            type='text'
                                            value={cardInfo.cvv}
                                            onChange={(e) =>
                                                setCardInfo({ ...cardInfo, cvv: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className='PlaceOrderButton' onClick={handlePlaceOrder}>
                            Place Order
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutScreen;
