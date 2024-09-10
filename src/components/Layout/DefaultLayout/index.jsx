import React from 'react';
import Header from './Header/Header';
import HeaderTop from '@/components/UI/HeaderTop/HeaderTop';
import Footer from './Footer/Footer';
import styles from './DefaultLayout.module.css';
const DefaultLayout = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <HeaderTop />
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
