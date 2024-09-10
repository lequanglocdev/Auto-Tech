import React from 'react';
import { useParams } from 'react-router-dom';
import { services } from '@/utils/data';
import { Button, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import sidebar from '@/assets/sidebar/sidebar.png';
import benafit from '@/assets/benafit.png';
import styles from './Services.module.css';

const ServicesDetail = () => {
    const { serviceId } = useParams();
    const service = services.find((s) => s.id === parseInt(serviceId));

    if (!service) {
        return <div>Dịch vụ không tồn tại.</div>;
    }

    return (
        <Container>
            <div>
                <Carousel data-bs-theme="dark" className={styles.detailBanner}>
                    <Carousel.Item>
                        <img className="d-block w-100" src={sidebar} alt="First slide" />
                        <Carousel.Caption className={styles.detailText}>
                            <h3>{service.title}</h3>
                            <p>
                                Tại Auto Tech, chúng tôi mang đến nhiều phương pháp giúp khách hàng giải quyết mọi vấn
                                đề khi dọn nội thất xe hơi bao gồm làm sạch, loại bỏ bụi bẩn, mùi hôi, chống thấm nước,
                                dưỡng nội thất,… Trải nghiệm dịch vụ vệ sinh nội thất ô tô Quận 7 TP HCM chất lượng nhất
                                hiện nay!
                            </p>
                        </Carousel.Caption>
                        <Carousel.Caption className={styles.detailBtn}>
                            <Button variant="danger">LIÊN HỆ NGAY</Button>
                            <Button variant="danger">BÁO GIÁ MIỄN PHÍ</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={sidebar} alt="Second slide" />
                        <Carousel.Caption className={styles.detailText}>
                            <h3>{service.title}</h3>
                            <p>
                                Tại Auto Tech, chúng tôi mang đến nhiều phương pháp giúp khách hàng giải quyết mọi vấn
                                đề khi dọn nội thất xe hơi bao gồm làm sạch, loại bỏ bụi bẩn, mùi hôi, chống thấm nước,
                                dưỡng nội thất,… Trải nghiệm dịch vụ vệ sinh nội thất ô tô Quận 7 TP HCM chất lượng nhất
                                hiện nay!
                            </p>
                        </Carousel.Caption>
                        <Carousel.Caption className={styles.detailBtn}>
                            <Button variant="danger">LIÊN HỆ NGAY</Button>
                            <Button variant="danger">BÁO GIÁ MIỄN PHÍ</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className={styles.detailContent}>
                    <h4>Lợi ích khi dọn {service.benefit} ô tô thường xuyên</h4>
                    <div className={styles.detailBenafit}>
                        <img src={benafit} alt="benafit" className={styles.detailBenafitImg} />
                        <div className={styles.detailBenafitContent}>
                            {service.benefitContent.map((item, index) => (
                                <div key={index}>
                                    <h4>{item.benefitHead}</h4>
                                    <p>{item.benefixDescription}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.detailProcedure}>
                        <h4>Quy trình {service.benefit} ô tô chuyên nghiệp tại Auto Tech</h4>
                        <div className={styles.stepsContainer}>
                            <div className={styles.stepGroup}>
                                <h5>Bước 1: Kiểm tra tình trạng xe</h5>
                                <p>Đánh giá tình trạng bám bẩn, mùi hôi trong khoang nội thất ô tô...</p>
                            </div>
                            <div className={styles.stepGroup}>
                                <h5>Bước 2: Chuẩn bị dụng cụ, sản phẩm</h5>
                                <p>Kiểm tra và chuẩn bị kỹ lưỡng các dụng cụ, sản phẩm chuyên dụng...</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.detailQuestion}>
                        <h4>Những câu hỏi thường gặp</h4>
                        <ul className={styles.faqList}
                        >
                            <li>
                                <span className={styles.faqIcon}>+</span>
                                Bao lâu nên dọn vệ sinh nội thất ô tô?
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ServicesDetail;
