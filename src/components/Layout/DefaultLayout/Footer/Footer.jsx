import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './Footer.module.css';
import icons from '@/utils/icon';
import logo from '@/assets/logo.png';
const Footer = () => {
    const {
        FaFacebookSquare,
        FaSquareTwitter,
        FaGooglePlusSquare,
        FaLinkedin,
        MdOutlineArrowForwardIos,
        CiLocationOn,
        FaPhoneAlt,
        IoMailOutline
    } = icons;
    return (
        <div className={styles.footer}>
            <Container>
                <div className={styles.footerContent}>
                    <div className={styles.footerLeft}>
                        <img src={logo} alt="" width={200} height={200} />
                        <p>
                            Với L&K TECH, niềm đam mê xe hơi của bạn sẽ được thỏa mãn trọn vẹn. Chúng tôi không chỉ là
                            một nhà cung cấp dịch vụ, mà còn là những người bạn đồng hành cùng bạn khám phá thế giới của
                            những chiếc xe.
                        </p>

                        <FaFacebookSquare className={styles.footerIcon} />
                        <FaSquareTwitter className={styles.footerIcon} />
                        <FaGooglePlusSquare className={styles.footerIcon} />
                        <FaLinkedin className={styles.footerIcon} />
                    </div>
                    <div className={styles.footerCenter}>
                        <h6>Dịch vụ</h6>
                        <ul>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ chăm sóc xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ đánh bóng xe
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ dán PPF
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ vệ sinh khoang máy
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ vệ sinh ngoại thất
                            </li>
                            <li>
                                <MdOutlineArrowForwardIos /> dịch vụ xịt phủ gầm
                            </li>
                        </ul>
                    </div>
                    <div className={styles.footerCenter}>
                        <h6>Liên hệ với chúng tôi</h6>
                        <ul>
                            <li>
                                <CiLocationOn />
                                319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM
                            </li>
                            <li>
                                <FaPhoneAlt /> 078 201 236
                            </li>
                            <li>
                                <IoMailOutline /> dichvul&k@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
