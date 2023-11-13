// ProductDetail.js

import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import NavBar from '../Components/NavBar2';
import CartScreen from './CartScreen';
import './ScreenCss/ProductDetails.css'; 
import image1 from '../Images/Sony1.jpeg';
import image2 from '../Images/Sony2.jpeg';
import image3 from '../Images/Sony3.jpeg';
import image4 from '../Images/Sony4.jpeg';
import image5 from '../Images/Sony5.jpeg';

function ProductDetail() {
  const product = {
    name: 'Sony Camera',
    description: 'Create outstanding content for your viewers with this Sony compact 4K digital camera. The 20-megapixel sensor captures detailed pictures and videos, while Wi-Fi functionality enables easy photo sharing across networks. This Sony compact 4K digital camera features image stabilization for clear shots while walking, and automatic exposure tracks and illuminates faces for consistency in various lighting conditions. ',
    price: '$299.99',
    images: [image1, image2, image3, image4, image5],
    reviews: [],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const [newReview, setNewReview] = useState({ user: '', comment: '', rating: 5 });
  const [reviews, setReviews] = useState(product.reviews);

  const [selectedQty, setSelectedQty] = useState('1');
  //Check Cart Initialization
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false); 

  const handleAddToCart = () => {
    const updatedCart = [...cart, { product, quantity: parseInt(selectedQty, 100) }];
    setCart(updatedCart);
  };


  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleReviewSubmit = () => {
    setReviews([...reviews, newReview]);
    setNewReview({ user: '', comment: '', rating: 5 });
  };


  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? 'star filled' : 'star'}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <div className='MainContainerForProductDetailScreen'>
    <NavBar />
    <div className="product-detail-container">

      <div className="product-detail">
        <div className="image-container">
        <div className="thumbnail-image-container">
        <div className="image-info">
          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Thumbnail ${index}`}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
          </div>
        </div>

         
              <img src={selectedImage} alt="Product Image" className="selected-image" />
          </div>
        

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="ratings">
            <div className="star-icons">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(25 Reviews)</p>
          </div>
         
          <p className="product-price">{product.price}</p>

          <div className="quantity-select">
            <label htmlFor="quantity">Qty:</label>
            <select
              id="quantity"
              value={selectedQty}
              onChange={(e) => setSelectedQty(e.target.value)}
            >
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={String(i + 1)}>
                  {i + 1}
                </option>
              ))}
            </select>

            <button onClick={handleAddToCart} className="add-to-cart">
              Add to Cart
            </button>
            {isCartVisible && <CartScreen cart={cart} removeFromCart={removeFromCart} />}
          </div>

          <div className="view-cart">
            <button onClick={() => setCartVisible(true)} className="view-cart-button">View Cart</button>
          </div>

        </div>
        <div className="details-container">
        <h1 className="section-title">Product Details</h1>
          <p className="product-description">{product.description}</p>
        </div>
        <div className="reviews-container">
          <h2 className="section-title">Product Reviews</h2>
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p className="review-user">User: {review.user}</p>
              <p className="review-comment">Comment: {review.comment}</p>
              <p className="review-rating">Rating: {renderStars(review.rating)}</p>
            </div>
          ))}

          <div className="review-form">
            <h3 className="section-title">Add a Review</h3>
            {/* ... (Same as your original code) */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;
