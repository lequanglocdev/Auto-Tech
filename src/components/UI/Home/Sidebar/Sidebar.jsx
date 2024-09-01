import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Sidebar.module.css';
const Sidebar = () => {
    return (
        <Carousel data-bs-theme="dark" className={`mt-2' ${styles.sidebar}`}>
            <Carousel.Item>
                <img className={styles['sidebar-image']} src="./sidebar.png" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className={styles['sidebar-image']} src="./sidebar.png" alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className={styles['sidebar-image']} src="./sidebar.png" alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    );
};

export default Sidebar;
