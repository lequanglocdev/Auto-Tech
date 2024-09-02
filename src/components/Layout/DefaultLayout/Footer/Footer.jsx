import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Footer.module.css';
import icons from '@/utils/icon';

const Footer = () => {
    const { FaFacebookSquare, FaSquareTwitter, FaGooglePlusSquare, FaLinkedin, MdOutlineArrowForwardIos } = icons;
    return (
        <div className={styles['footer']}>
            <Container>
                <Row className={styles['footer-content']}>
                    <Col className={styles['footer-left']}>
                        <img src="./logo.png" alt="" width={200} height={200} />
                        <p>
                            Với Autotech, niềm đam mê xe hơi của bạn sẽ được thỏa mãn trọn vẹn. Chúng tôi không chỉ là
                            một nhà cung cấp dịch vụ, mà còn là những người bạn đồng hành cùng bạn khám phá thế giới của
                            những chiếc xe.
                        </p>

                        <FaFacebookSquare className={styles['footer-icon']} />
                        <FaSquareTwitter className={styles['footer-icon']} />
                        <FaGooglePlusSquare className={styles['footer-icon']} />
                        <FaLinkedin className={styles['footer-icon']} />
                    </Col>
                    <Col className={styles['footer-center']}>
                        <h6>Dịch vụ</h6>
                        <ul>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                        </ul>
                    </Col>
                    <Col className={styles['footer-center']}>
                        <h6>Liên hệ với chúng tôi</h6>
                        <ul>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;
