import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Sidebar.module.css';
import sidebar from "@/assets/sidebar/sidebar.png"
import sidebar2 from "@/assets/sidebar/sidebar2.png"
import sidebar3 from "@/assets/sidebar/sidebar3.png"

const SidebarHome = () => {
    
    return (
        <Carousel data-bs-theme="dark" className={`mt-2' ${styles.sidebar}`}>
            <Carousel.Item>
                <img className={styles.sidebarImage} src={sidebar3} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className={styles.sidebarImage} src={sidebar2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className={styles.sidebarImage} src={sidebar} alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    );
};

export default SidebarHome;
