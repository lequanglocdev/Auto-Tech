import React from 'react';
import styles from './Intro.module.css';
import { Container } from 'react-bootstrap';
import intro1 from '../../assets/intro1.png';
import intro2 from '../../assets/intro2.png';
import { motion } from 'framer-motion';

const Intro = () => {
    const fadeIntro = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    const fadeIntro2 = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    };
    
    return (
        <Container id="intro">
            <div className={styles['intro']}>
                <motion.div initial="hidden" whileInView="visible" variants={fadeIntro}>
                    <div className={styles.introHead}>
                        <h4>Giới thiệu L&K TECH</h4>
                    </div>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" variants={fadeIntro2}>
                    <div className={styles.introBody}>
                        <h6>L&K TECH đối tác tin cậy cho xế yêu của bạn:</h6>
                        <p>
                            Được thành lập vào năm 2021, L&K TECH đã nhanh chóng khẳng định vị thế là một trong những
                            công ty phụ kiện ô tô hàng đầu tại Việt Nam. Với đội ngũ nhân viên giàu kinh nghiệm và hệ
                            thống phân phối rộng khắp, L&K TECH cung cấp đa dạng các sản phẩm và dịch vụ chăm sóc xe ô
                            tô, từ nâng cấp âm thanh, dán phim cách nhiệt, phủ ceramic đến lắp đặt các phụ kiện nội thất
                            cao cấp.
                        </p>
                        <h6>Điểm nổi bật của L&K Tech:</h6>
                        <p>
                            Sản phẩm chất lượng: Phân phối độc quyền các thương hiệu nổi tiếng thế giới như Limousine
                            Hongyi, Silent Pro, PPF SAP, phim cách nhiệt ASWF, âm thanh Venom, Mosconi...
                        </p>
                        <p>
                            Dịch vụ chuyên nghiệp: Đội ngũ kỹ thuật viên giàu kinh nghiệm, quy trình làm việc bài bản,
                            đảm bảo chất lượng dịch vụ tốt nhất.
                        </p>
                        <p>
                            Dịch vụ chuyên nghiệp: Đội ngũ kỹ thuật viên giàu kinh nghiệm, quy trình làm việc bài bản,
                            đảm bảo chất lượng dịch vụ tốt nhất.
                        </p>
                        <p>
                            Cơ sở vật chất hiện đại: Hệ thống phòng trưng bày, xưởng thi công được trang bị đầy đủ thiết
                            bị hiện đại.
                        </p>
                        <p>
                            Giá cả hợp lý: Cam kết mang đến cho khách hàng những sản phẩm và dịch vụ chất lượng với giá
                            cả cạnh tranh.
                        </p>
                        <p>Uy tín: Được khách hàng tin tưởng và đánh giá cao về chất lượng sản phẩm và dịch vụ.</p>
                        <h6>Kết luận</h6>
                        <p>
                            L&K TECH là một địa chỉ tin cậy để bạn chăm sóc và nâng cấp xế yêu của mình. Với đội ngũ
                            chuyên nghiệp, sản phẩm chất lượng và dịch vụ tận tâm, L&K TECH sẽ mang đến cho bạn những
                            trải nghiệm tuyệt vời nhất.
                        </p>
                        <div className={styles.introWrapperImage}>
                            <img className={styles.introImage} src={intro1} alt="intro" />
                            <img className={styles.introImage} src={intro2} alt="intro" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Container>
    );
};

export default Intro;
