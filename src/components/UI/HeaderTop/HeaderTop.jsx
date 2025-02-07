import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './HeaderTop.module.css';
import icons from '@/utils/icon';

const HeaderTop = () => {
    const { FaCalendarDays, FaPhoneAlt, FaFacebookSquare, FaSquareTwitter, FaGooglePlusSquare, FaLinkedin } = icons;
   
    return (
        <Row className={styles.headerTop}>
            <Col className={styles.calender}>
                <FaCalendarDays className={styles.icon} />
                <span>Thứ hai - Thứ bảy 8:00h - 20:00h </span>
            </Col>
            <Col className={styles.phone}>
                <FaPhoneAlt className={styles.icon} />
                <span>phone: +78 201 236</span>
            </Col>
            <Col className={styles.info}>
                <FaFacebookSquare className={styles.icon} />
                <FaSquareTwitter className={styles.icon} />
                <FaGooglePlusSquare className={styles.icon} />
                <FaLinkedin className={styles.icon} />
            </Col>
        </Row>
    );
};

export default HeaderTop;
