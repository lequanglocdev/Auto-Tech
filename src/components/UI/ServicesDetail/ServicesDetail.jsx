import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { services } from '@/utils/data';
import { Button, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import sidebar from '@/assets/sidebar/sidebar.png';
import styles from './ServicesDetail.module.css';
import icons from '@/utils/icon';
const ServicesDetail = () => {
    const { serviceId } = useParams();
    const service = services.find((s) => s.id === parseInt(serviceId));

    const [openQuestion, setOpenQuestion] = useState(null); // Theo dõi câu hỏi nào đang mở
    const {FaPlus,IoMdRemove} = icons
  
    if (!service) {
        return <div>Dịch vụ không tồn tại.</div>;
    }

    const toggleQuestion = (id) => {
        // Đóng nếu đã mở, mở nếu đang đóng
        setOpenQuestion(openQuestion === id ? null : id);
      };
  
    return (
        <Container>
            <div>
                <Carousel data-bs-theme="dark" className={styles.detailBanner}>
                    <Carousel.Item>
                        <img className="d-block w-100" src={service.bannerServices} alt="First slide" width={600} height={450} />
                        <Carousel.Caption className={styles.detailText}>
                            <h3>{service.title}</h3>
                            <p>
                                Tại L&K TECH, chúng tôi mang đến nhiều phương pháp giúp khách hàng giải quyết mọi vấn
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
                    {/* <Carousel.Item>
                        <img className="d-block w-100" src={sidebar} alt="Second slide" />
                        <Carousel.Caption className={styles.detailText}>
                            <h3>{service.title}</h3>
                            <p>
                                Tại L&K TECH, chúng tôi mang đến nhiều phương pháp giúp khách hàng giải quyết mọi vấn
                                đề khi dọn nội thất xe hơi bao gồm làm sạch, loại bỏ bụi bẩn, mùi hôi, chống thấm nước,
                                dưỡng nội thất,… Trải nghiệm dịch vụ vệ sinh nội thất ô tô Quận 7 TP HCM chất lượng nhất
                                hiện nay!
                            </p>
                        </Carousel.Caption>
                        <Carousel.Caption className={styles.detailBtn}>
                            <Button variant="danger">LIÊN HỆ NGAY</Button>
                            <Button variant="danger">BÁO GIÁ MIỄN PHÍ</Button>
                        </Carousel.Caption>
                    </Carousel.Item> */}
                </Carousel>
                <div className={styles.detailContent}>
                    <h4>Lợi ích khi dọn {service.benefit} ô tô thường xuyên</h4>
                    <div className={styles.detailBenafit}>
                        <img src={service.benefitImage} alt="benafit" className={styles.detailBenafitImg} />
                        <div className={styles.detailBenafitContent}>
                            {service.benefitContent.map((item, index) => (
                                <div key={index}>
                                    <h6 className={styles.detailBenafitContentHead}>{item.benefitHead}</h6>
                                    <p className={styles.detailBenafitContentDes}>{item.benefixDescription}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.detailProcedure}>
                        <h4>Quy trình {service.benefit} ô tô chuyên nghiệp tại L&K TECH</h4>
                        <div className={styles.stepsContainer}>
                            {service.step.map((item, index) => (
                                <div key={index}>
                                    <h6 className={styles.stepHead}>{item.stepHead}</h6>
                                    <p className={styles.stepDes}>{item.stepDescription}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.detailQuestion}>
                        <h4>Những câu hỏi thường gặp</h4>
                        <ul className={styles.faqList}>
                            {service.question.map((item) => (
                                <li key={item.id}>
                                    <span
                                        className={styles.faqIcon}
                                        onClick={() => toggleQuestion(item.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {openQuestion === item.id ? <IoMdRemove/> : <FaPlus/>} {/* Đổi icon dựa trên trạng thái */}
                                    </span>
                                    {item.text}
                                    {openQuestion === item.id && (
                                        <p className={styles.faqDescription}>{item.description}</p> // Hiển thị description khi mở
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ServicesDetail;
