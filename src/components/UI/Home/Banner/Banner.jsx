import React, { useState } from 'react';
import styles from  './Banner.module.css';
import { Button, Container } from 'react-bootstrap';
import Book from '../../Book/Book';
const Banner = () => {
    const [show,setShow] = useState(false)
    return (
        <div className={styles.banner}>
            <Container>
                <div className={styles.bannerContenr}>
                    <div className={styles.bannerText}>
                        <p>Đặt lịch hẹn của bạn</p>
                        <p>Lên lịch của bạn ngay hôm nay</p>
                    </div>
                    <Button  variant="light" onClick={() => setShow(true)} className={styles.bannerBtn}>
                        Đặt một cuộc hẹn
                    </Button>
                </div>
            </Container>
            <Book setShow={setShow} show={show}/>
        </div>
    );
};

export default Banner;
