import React from 'react';
import Header from './Header/Header';
import HeaderTop from '@/components/UI/HeaderTop/HeaderTop';
import Footer from './Footer/Footer';
import './DefaultLayout.css';
import { Container } from 'react-bootstrap';
const DefaultLayout = ({ children }) => {
    return (
        <div className="wrapper">
            <HeaderTop />
            <Header />
            <Container className="content">{children}</Container>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
