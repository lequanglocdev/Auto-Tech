import React from 'react';
import Header from './Header/Header';
import HeaderTop from '@/components/UI/HeaderTop/HeaderTop';
// import Footer from './Footer/Footer';
import './DefaultLayout.css';
const DefaultLayout = ({ children }) => {
    return (
        <div className="wrapper">
            <HeaderTop />
            <Header />
            <div className="content">{children}</div>
            {/* <Footer /> */}
        </div>
    );
};

export default DefaultLayout;
