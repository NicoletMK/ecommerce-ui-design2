// ProductDetail.js
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import NavBar from '../Components/NavBar2';
import CartScreen from './CartScreen';
import './ScreenCss/ProductDetails.css'; 
import { Link } from "react-router-dom";
import image1 from '../Images/Sony1.jpeg';
import image2 from '../Images/Sony2.jpeg';
import image3 from '../Images/Sony3.jpeg';
import image4 from '../Images/Sony4.jpeg';
import image5 from '../Images/Sony5.jpeg';

function ProductDetail(props) {
  
  let data = useLocation();
  console.log({state : data})

  const activeUserID = localStorage.getItem('activeUser');
  const [mainImage, setMainImage] = useState(data.state.productImagePath);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    console.log("Info Screen Value")
    console.log(newQuantity)
    setQuantity(newQuantity);
  };

  const handleAddToCart = (product) => {
    
    const prevProducts = JSON.parse(localStorage.getItem('products-key-'+activeUserID))|| []

    const existingProductIndex = prevProducts.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingProductIndex !== -1) {
      prevProducts[existingProductIndex].count += quantity;
    } else {
      product.count = quantity;
      prevProducts.push(product);
    }
  
    // Update the cart in local storage
    localStorage.setItem('products-key-'+activeUserID, JSON.stringify(prevProducts));
  
  }

  const handleAddToWishlist = (product) => {
    console.log("WishList Clicked")
    const prevProductsWishlist = JSON.parse(localStorage.getItem('wishlist-products-key-'+activeUserID))|| []
    //const newProductsWishlist = [...prevProductsWishlist, product]

    // localStorage.setItem('wishlist-products-key-'+activeUserID, 
    //   JSON.stringify(newProductsWishlist)
    // )

    const existingProductIndex = prevProductsWishlist.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingProductIndex !== -1) {
      alert("Product already exists in the wishlist");
    } else {
      const newProductsWishlist = [...prevProductsWishlist, product];
      localStorage.setItem('wishlist-products-key-'+activeUserID, JSON.stringify(newProductsWishlist));
      alert("Product added to the wishlist");
    }
  };

  const product = {
    name: data.state.productName,
    description: data.state.ProductDetail,
    price: data.state.productPrice,
    images: [data.state.productImagePath, data.state.productImagePath1, data.state.productImagePath2, data.state.productImagePath3, data.state.productImagePath4],
    rating: data.state.productRating,
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const [newReview, setNewReview] = useState({ user: '', comment: '', rating: 5 });
  const [reviews, setReviews] = useState(product.reviews);

  const [selectedQty, setSelectedQty] = useState('1');
  //Check Cart Initialization
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false); 

  // const handleAddToCart = () => {
  //   const updatedCart = [...cart, { product, quantity: parseInt(selectedQty, 100) }];
  //   setCart(updatedCart);
  // };


  // const removeFromCart = (index) => {
  //   const updatedCart = [...cart];
  //   updatedCart.splice(index, 1);
  //   setCart(updatedCart);
  // };

  // const handleReviewSubmit = () => {
  //   setReviews([...reviews, newReview]);
  //   setNewReview({ user: '', comment: '', rating: 5 });
  // };


  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(<span key={i} className={i <= rating ? 'star filled' : 'star'}>&#9733;</span>);
  //   }
  //   return stars;
  // };

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
          <div className="ProductTitleInProductScreen">
            <h1 className="product-title">{product.name}</h1>
          </div>
          
          {/* <div className="ratings">
            <div className="star-icons">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(25 Reviews)</p>
          </div> */}
          
          <div className="PriceAndRatingDiv">
            <h3 className="product-price"> Price: ${product.price}</h3>
            <h3 className="product-rating"> Price: ${product.rating}</h3>
          </div>

          {/* <div className="quantity-select">
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

            <button onClick={handleAddToCart} className="add-to-cart">
              Add to Wishlist
            </button>

            { {isCartVisible && <CartScreen cart={cart} removeFromCart={removeFromCart} />} }
          </div> */}

          <div className="ContainerForTheItemCountButtonsAddToCartAndWishList">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="quantityInput"
            />

            <Link to="/CartScreen">
              <button onClick={(e) => handleAddToCart(data.state)} className="addToCartButton">
                Add to Cart
              </button>
            </Link>

            <Link to="/WishlistScreen">
              <button onClick={(e) => handleAddToWishlist(data.state)} className="addToWishlistButton">
                Add to Wishlist
              </button>
            </Link>
          </div>

          <div className="details-container">
            <h1 className="section-title">Product Details</h1>
            <p className="product-description">{data.state.productDescription}</p>
          </div>

          {/* <div className="view-cart">
            <button onClick={() => setCartVisible(true)} className="view-cart-button">View Cart</button>
          </div> */}

        </div>
        
        
        
        {/* <div className="reviews-container">
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
          </div>
        </div> */}
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;
