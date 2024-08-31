import React from 'react';
import './Banner.css';
import { Button, Container } from 'react-bootstrap';
const Banner = () => {
    return (
        <div className="banner">
            <Container>
                <div className="banner-contenr">
                    <div className="banner-text">
                        <p>Đặt lịch hẹn của bạn</p>
                        <p>Lên lịch của bạn ngay hôm nay</p>
                    </div>
                    <Button size="lg" variant="light" className="banner-btn">
                        Đặt một cuộc hẹn
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default Banner;
