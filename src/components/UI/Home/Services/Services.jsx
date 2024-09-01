import React from 'react';
import { Container, Image } from 'react-bootstrap';
import styles from './Services.module.css';
const Services = () => {
    return (
        <Container>
            <div className={styles['services']}>
                <Image src="./people.png" className={styles['services-image']} />
                <div className={styles['services-content']}>
                    <h4>Dịch vụ</h4>
                    <p>Tại sao bạn lại lựa chọn chúng tôi?</p>
                    <div className={styles['services-center']}>
                        <div className={styles['services-why']}>
                            <h6>Chuyên gia tận tâm</h6>
                            <p>
                                Đội ngũ kỹ thuật viên của chúng tôi với nhiều năm kinh nghiệm sẽ chăm sóc chiếc xe của
                                bạn như chính xe của mình.
                            </p>
                        </div>

                        <div className={styles['services-why']}>
                            <h6>Công nghệ hiện đại:</h6>
                            <p>
                                Chúng tôi trang bị những thiết bị và công nghệ tiên tiến nhất để mang đến dịch vụ tốt
                                nhất cho khách hàng.
                            </p>
                        </div>

                        <div className={styles['services-why']}>
                            <h6>Sản phẩm chất lượng cao</h6>
                            <p>
                                Đội ngũ kỹ thuật viên của chúng tôi với nhiều năm kinh nghiệm sẽ chăm sóc chiếc xe của
                                bạn như chính xe của mình.
                            </p>
                        </div>

                        <div className={styles['services-why']}>
                            <h6>Giá cả cạnh tranh</h6>
                            <p>
                                Chúng tôi cam kết mang đến dịch vụ chất lượng cao với giá cả hợp lý, cạnh tranh trên thị
                                trường.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Services;
