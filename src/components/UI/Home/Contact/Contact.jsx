import React from 'react';
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const Contact = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };
    
    return (
        <Container className={styles.contactContainer}>
            <Row className={styles.contactRow}>
               
                <Col>
                    <motion.div
                        className={styles.contactInfo}
                        initial="hidden"
                        whileInView="visible"
                        
                        variants={fadeIn}
                    >
                        <div className={styles.infoContent}>
                            <h4>Thông tin liên hệ</h4>
                            <div className={styles.infoCenter}>
                                <div className={styles.contentCall}>
                                    <p>Gọi cho chúng tôi:</p>
                                    <p>+78 201 236</p>
                                </div>
                                <div className={styles.contentLocation}>
                                    <p>Vị trí:</p>
                                    <p>Việt Nam, TPHCM</p>
                                </div>
                                <div className={styles.contentTime}>
                                    <p>Giờ làm việc</p>
                                    <p>Từ thứ hai - thứ bảy 8:00h - 20:00h</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Col>

                <Col>
                    <motion.div
                        className={styles.contactInfo}
                        initial="hidden"
                        whileInView="visible"
                      
                        variants={fadeIn}
                    >
                        <div className={styles.infoContent}>
                            <h4>Gửi tin nhắn cho chúng tôi</h4>
                            <Form>
                                <FormControl
                                    type="text"
                                    placeholder="Email"
                                    className={styles.contentInput}
                                    size="lg"
                                />
                                <br />
                                <FormControl
                                    type="text"
                                    placeholder="Số điện thoại"
                                    className={styles.contentInput}
                                    size="lg"
                                />
                                <br />
                                <FormControl
                                    type="text"
                                    placeholder="Nhập tin nhắn"
                                    className={styles.contentInput}
                                    size="lg"
                                />
                            </Form>
                            <br />
                            <Button className={styles.contentBtn} variant="danger" size="lg">
                                Gửi
                            </Button>
                        </div>
                    </motion.div>
                </Col>

                <Col>
                    <motion.div
                        className={styles.contactInfo}
                        initial="hidden"
                        whileInView="visible"
                       
                        variants={fadeIn}
                    >
                        <div className={styles.infoContent}>
                            <h4>Dịch vụ chăm sóc</h4>
                            <p>
                                L&K TECH - Không chỉ là dịch vụ, mà còn là trải nghiệm. Chúng tôi hiểu rằng chiếc xe
                                không chỉ là phương tiện di chuyển mà còn là người bạn đồng hành của bạn. Vì vậy, chúng
                                tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu. Với không gian thoải mái, dịch vụ
                                chuyên nghiệp và giá cả hợp lý. L&K TECH sẽ mang đến cho bạn những trải nghiệm tuyệt vời
                                nhất.
                            </p>
                        </div>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
