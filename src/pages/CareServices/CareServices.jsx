import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './CareServices.module.css';
import { services } from '@/utils/data';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateSlug } from '@/utils/slug';

const CareServices = () => {
    const navigate = useNavigate();

    const handleService = (service) => {
        const slug = generateSlug(service.title);
        navigate(`/services/${slug}`);
    };

    const fadeInCareServices = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    };
    
    return (
        <Container>
            <motion.div initial="hidden" whileInView="visible" variants={fadeInCareServices}>
                <div className={styles.careServices}>
                    <h4>Dịch vụ chăm sóc</h4>
                    <p>Đây là một trong số những dịch vụ sửa chữa ô tô mà L&K TECH chúng tôi cung cấp.</p>
                </div>
                <div className={styles.careContent}>
                    {services.map((service, index) => (
                        <div className={styles.careCard} key={service.id} onClick={() => handleService(service)}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={service.defaultImage}
                                    alt={service.title}
                                    className={styles.imageDefault}
                                    width={100}
                                    height={100}
                                />
                                <img
                                    src={service.hoverImage}
                                    alt={service.title}
                                    className={styles.imageHover}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <p className={styles.serviceText}>{service.title}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </Container>
    );
};

export default CareServices;
