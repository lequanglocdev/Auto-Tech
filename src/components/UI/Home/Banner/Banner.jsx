import React from 'react';
import { motion } from 'framer-motion';
import styles from './Banner.module.css';
import { Container } from 'react-bootstrap';
import imageAppStore from '../../../../assets/app_store.png';
import imageAppPlayStore from '../../../../assets/play_store.png';

const Banner = () => {
    const fadeInBanner = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    };

    return (
        <motion.div className={styles.banner} initial="hidden" whileInView="visible" variants={fadeInBanner}>
            <Container>
                <div className={styles.bannerContenr}>
                    <div className={styles.bannerText}>
                        <p>Tải ứng dụng để được đặt lịch hẹn của bạn</p>
                        <p>Lên lịch của bạn ngay hôm nay</p>
                    </div>
                    <div className={styles.bannerImageWrapper}>
                        <img className={styles.bannerImage} src={imageAppStore} alt="imageAppStore" />
                        <img className={styles.bannerImage} src={imageAppPlayStore} alt="imageAppPlayStore" />
                    </div>
                </div>
            </Container>
        </motion.div>
    );
};

export default Banner;
