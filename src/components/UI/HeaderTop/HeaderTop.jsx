import React from 'react';
import { Container } from 'react-bootstrap';
import './HeaderTop.css';
import icons from '@/utils/icon';
const HeaderTop = () => {
    const { FaCalendarDays, FaPhoneAlt, FaFacebookSquare, FaSquareTwitter, FaGooglePlusSquare, FaLinkedin } = icons;
    return (
        <Container className="header-top">
            <div className="calender">
                <FaCalendarDays className="icon" />
                <span>Thứ hai - Thứ bảy 8:00h - 20:00h </span>
            </div>
            <div className="phone">
                <FaPhoneAlt className="icon" />
                <span>phone: +78 201 236</span>
            </div>
            <div className="info">
                <FaFacebookSquare className="icon" />
                <FaSquareTwitter className="icon" />
                <FaGooglePlusSquare className="icon" />
                <FaLinkedin className="icon" />
            </div>
        </Container>
    );
};

export default HeaderTop;
