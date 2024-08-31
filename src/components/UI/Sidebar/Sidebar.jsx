import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Sidebar.css';
const Sidebar = () => {
    return (
        <div>
            <Carousel data-bs-theme="dark" className="mt-2 sidebar">
                <Carousel.Item>
                    <img className="sidebar-image" src="./sidebar.png" alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="sidebar-image" src="./sidebar.png" alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="sidebar-image" src="./sidebar.png" alt="Third slide" />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Sidebar;
