import React, { useState } from 'react';
import Footer from '../Components/Footer.js';
import './ScreenCss/TestCSS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../Components/ProductCard.js';
import {Link} from "react-router-dom";
import NavBar from '../Components/NavigationBar';

function TestScreen() {
    // Sample product data (replace this with your actual data)
    const sampleProducts = [
        { name: "Product 1", productId: "1" },
        { name: "Product 2", productId: "2"  },
        { name: "Product 3", productId: "3"  },
        { name: "Product 4", productId: "4"  },
        { name: "Product 5", productId: "5"  },
        { name: "Product 6", productId: "6"  },
        { name: "Product 7", productId: "7"  },
        { name: "Product 8", productId: "8"  },
        { name: "Product 9", productId: "9"  },
        { name: "Product 10", productId: "10"  },
        { name: "Product 11", productId: "11"  },
        { name: "Product 12", productId: "12"  },
        { name: "Product 13", productId: "13"  },
        { name: "Product 14", productId: "14"  },
        { name: "Product 15", productId: "15"  },
        { name: "Product 16", productId: "16"  },
        { name: "Product 17", productId: "17"  },
        { name: "Product 18", productId: "18"  },
        { name: "Product 19", productId: "19"  },
        { name: "Product 20", productId: "20"  },
        { name: "Product 21", productId: "21"  },
        { name: "Product 22", productId: "22"  },
        { name: "Product 23", productId: "23"  }
    ];

    const itemsPerPage = 8; // Number of items to display per page
    const itemsPerRow = 4; // Number of items per row
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the range of products to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentProducts = sampleProducts.slice(startIndex, endIndex);

    // Handle pagination controls
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='TestScreenContainer'>
            <NavBar />
            <div className='TitleContainer'>
                <h1> Test Sample Main Menu Screen </h1>
            </div>

            <div className='SampleProductsContainer'>
                {currentProducts.map((product, index) => (
                    <div key={index} className='ProductCard'>
                        <Link to={'/ProductDetailScreen'} 
                                state= {{ productName: product.name, productId: product.productId}}
                                style={{ textDecoration: 'none', color: '#0C2340'}}
                            >
                            <ProductCard name={product.name} id={product.productId} />
                        </Link>
                    </div>
                ))}
            </div>

            <div className='Pagination'>
                {Array.from({ length: Math.ceil(sampleProducts.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                ))}
            </div>
        </div>
    );
}

export default TestScreen;