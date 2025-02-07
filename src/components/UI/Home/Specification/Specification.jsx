import React from 'react';
import styles from './Specification.module.css';
import spetifi from '../../../../assets/specifi/specification1.png';
import spetifi2 from '../../../../assets/specifi/specification2.png';
import spetifi3 from '../../../../assets/specifi/specification3.png';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const Specification = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    
    return (
        <div className={styles.specification} ref={ref}>
            <div className={styles.specificationContent}>
                <div className={styles.specificationHead}>
                    <h4>Thông số kĩ thuật</h4>
                </div>
                <div className={styles.specificationBody}>
                    <div className={styles.bodyText}>
                        {inView ? <CountUp start={0} end={20} duration={2} /> : '0'}
                        <span>Năm kinh nghiệm</span>
                    </div>
                    <div className={styles.bodyText}>
                        {inView ? <CountUp start={0} end={2000} duration={2} /> : '0'}
                        <span>Khách hàng hài lòng</span>
                    </div>
                    <div className={styles.bodyText}>
                        {inView ? <CountUp start={0} end={50} duration={2} /> : '0'}
                        <span>Kĩ thuật viên</span>
                    </div>
                    <div className={styles.bodyText}>
                        {inView ? <CountUp start={0} end={50} duration={2} /> : '0'}
                        <span>Giải thưởng</span>
                    </div>
                </div>
            </div>
            <motion.div
                className={styles.specificationWrapperImage}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
            >
                <motion.img
                    className={styles.specificationImage}
                    src={spetifi}
                    alt="specification"
                    variants={itemVariants}
                />
                <motion.img
                    className={styles.specificationImage}
                    src={spetifi2}
                    alt="specification"
                    variants={itemVariants}
                />
                <motion.img
                    className={styles.specificationImage}
                    src={spetifi3}
                    alt="specification"
                    variants={itemVariants}
                />
            </motion.div>
        </div>
    );
};

export default Specification;
