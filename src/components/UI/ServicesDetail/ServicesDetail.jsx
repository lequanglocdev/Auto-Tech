import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { services } from '@/utils/data';
import { Button, Container } from 'react-bootstrap';
import styles from './ServicesDetail.module.css';
import icons from '@/utils/icon';
const ServicesDetail = () => {
    const { serviceId } = useParams();
    const service = services.find((s) => s.id === parseInt(serviceId));

    const [openQuestion, setOpenQuestion] = useState(null); // Theo dõi câu hỏi nào đang mở
    const { FaPlus, IoMdRemove } = icons;

    if (!service) {
        return <div>Dịch vụ không tồn tại.</div>;
    }

    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <Container>
            <div>
                <div data-bs-theme="dark" className={styles.detailBanner}>
                    <div>
                        <img
                            className={`d-block w-100 ${styles.bannerServices}`}
                            src={service.bannerServices}
                            alt="First slide"
                        />
                        <div className={styles.detailText}>
                            <h3>{service.title}</h3>
                            <p>
                                Tại L&K TECH, chúng tôi mang đến nhiều phương pháp giúp khách hàng giải quyết mọi vấn đề
                                khi dọn nội thất xe hơi bao gồm làm sạch, loại bỏ bụi bẩn, mùi hôi, chống thấm nước,
                                dưỡng nội thất,… Trải nghiệm dịch vụ vệ sinh nội thất ô tô Quận 7 TP HCM chất lượng nhất
                                hiện nay!
                            </p>
                        </div>
                        <div className={styles.detailBtn}>
                            <Button variant="danger" className={styles.btn}>
                                LIÊN HỆ NGAY
                            </Button>
                            <Button variant="danger" className={styles.btn}>
                                BÁO GIÁ MIỄN PHÍ
                            </Button>
                        </div>
                    </div>
                </div>
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
                                <li key={item.id} className={styles.faqItem}>
                                    <p
                                        className={styles.faqIcon}
                                        onClick={() => toggleQuestion(item.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {openQuestion === item.id ? <IoMdRemove /> : <FaPlus />}
                                    </p>
                                    <p className={styles.faqDescription}>
                                        {item.text}
                                        {openQuestion === item.id && (
                                            <>
                                                <br /> {/* Thêm dòng mới */}
                                                {item.description}
                                            </>
                                        )}
                                    </p>
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
