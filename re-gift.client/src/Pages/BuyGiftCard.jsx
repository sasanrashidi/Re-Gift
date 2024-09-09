import React, { useState } from 'react';
import SimpleGiftCardComponent from '../services/GiftCardService'; // Assuming this is a service or component
import Amazon2 from '../img/Amazon2.jpg';
import Nike2 from '../img/Nike2.jpg';
import HM2 from '../img/HM2.jpg';

import Apple from '../img/Apple.jpg';
import Apple1 from '../img/Apple1.jpg';
import Bio1 from '../img/Bio1.jpg';

export function BuyGiftCard() {
    // State to manage search query, images, and selected image details
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    // Example images data (replace with actual data or fetch from an API)
    const images = [
        { id: 1, title: 'Amazon - 100 Kr', imgSrc: Amazon2, details: 'Amazon Gift Card - 100 Kr' },
        { id: 2, title: 'Nike - 50 Kr', imgSrc: Nike2, details: 'Nike Gift Card - 50 Kr' },
        { id: 3, title: 'H&M - 30 Kr', imgSrc: HM2, details: 'H&M Gift Card - 30 Kr' },
        { id: 4, title: 'Apple - 100 Kr', imgSrc: Apple, details: 'Apple Gift Card - 100 Kr' },
        { id: 5, title: 'Apple - 50 Kr', imgSrc: Apple1, details: 'Apple Gift Card - 50 Kr' },
        { id: 6, title: 'Bio - 60 Kr', imgSrc: Bio1, details: 'Bio Gift Card - 60 Kr' },
        // Add more images
    ];

    // Function to handle search input changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to handle image click
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    // Filter images based on search query
    const filteredImages = images.filter(image =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to close the modal
    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <h1></h1>
            <SimpleGiftCardComponent />

            <p>Here you can buy gift cards from private individuals, log in to see more of the range.</p>

            {/* Search Bar Wrapper with Bootstrap */}
            <div className="d-flex justify-content-center mb-4">
                <div className="input-group" style={{ width: '300px' }}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-search"></i> {/* Bootstrap search icon */}
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a gift card..."
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Images List */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {filteredImages.map(image => (
                    <div key={image.id} style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleImageClick(image)}>
                        <img src={image.imgSrc} alt={image.title} style={{ width: '150px', height: '150px' }} />
                        <p>{image.title}</p>
                    </div>
                ))}
            </div>

            {/* Modal for displaying selected image details */}
            {selectedImage && (
                <div style={{
                    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '20px', borderRadius: '10px',
                        maxWidth: '500px', textAlign: 'center'
                    }}>
                        <h2>{selectedImage.title}</h2>
                        <img src={selectedImage.imgSrc} alt={selectedImage.title} style={{ width: '200px', height: '200px' }} />
                        <p>{selectedImage.details}</p>
                        <button onClick={closeModal} style={{ marginTop: '20px', padding: '10px' }}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
