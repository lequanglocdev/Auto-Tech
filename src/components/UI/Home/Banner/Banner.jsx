import React from 'react';
import styles from  './Banner.module.css';
import { Button, Container } from 'react-bootstrap';
const Banner = () => {
    return (
        <div className={styles.banner}>
            <Container>
                <div className={styles.bannerContenr}>
                    <div className={styles.bannerText}>
                        <p>Đặt lịch hẹn của bạn</p>
                        <p>Lên lịch của bạn ngay hôm nay</p>
                    </div>
                    <Button size="lg" variant="light" className={styles.bannerBtn}>
                        Đặt một cuộc hẹn
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default Banner;
