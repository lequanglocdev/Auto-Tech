import React from 'react';
import Header from './Header/Header';
import HeaderTop from '@/components/UI/HeaderTop/HeaderTop';
import Footer from './Footer/Footer';

const DefaultLayout = ({ children }) => {
    return (
        <div style={{ 'min-height': '100vh', 'background-color': 'var(--background-primary)' }}>
            <HeaderTop />
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
