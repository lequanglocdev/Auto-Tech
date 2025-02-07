import React from 'react';
import { Container, Image } from 'react-bootstrap';
import styles from './Services.module.css';
import { motion } from 'framer-motion';
import peopleImage from '../../../../assets/people.png'

const Services = () => {
    const fadeInService = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    };
    
    return (
        <Container>
            <motion.div className={styles.services} initial="hidden" whileInView="visible" variants={fadeInService}>
                <Image src={peopleImage} className={styles.servicesImage} />
                <div className={styles.servicesContent}>
                    <h4>Dịch vụ</h4>
                    <p>Tại sao bạn lại lựa chọn chúng tôi?</p>
                    <div className={styles.servicesCenter}>
                        {[
                            {
                                title: 'Chuyên gia tận tâm',
                                text: 'Đội ngũ kỹ thuật viên nhiều năm kinh nghiệm sẽ chăm sóc xe của bạn như chính xe của mình.',
                            },
                            {
                                title: 'Công nghệ hiện đại',
                                text: 'Trang bị thiết bị và công nghệ tiên tiến nhất để mang đến dịch vụ tốt nhất.',
                            },
                            {
                                title: 'Sản phẩm chất lượng cao',
                                text: 'Sử dụng các sản phẩm uy tín, đảm bảo an toàn và hiệu quả.',
                            },
                            {
                                title: 'Giá cả cạnh tranh',
                                text: 'Cam kết dịch vụ chất lượng với giá hợp lý, cạnh tranh trên thị trường.',
                            },
                        ].map((service, index) => (
                            <div key={index} className={styles.servicesWhy} >
                                <h6>{service.title}</h6>
                                <p>{service.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Container>
    );
};

export default Services;
