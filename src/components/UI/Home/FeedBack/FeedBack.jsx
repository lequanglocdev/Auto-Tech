import React from 'react';
import styles from './FeedBack.module.css';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import icons from '@/utils/icon';
import userFeedback from '@/assets/feedBackImage.png';
const FeedBack = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const { FaRegStar } = icons;
    return (
        <div className={styles.feedback}>
            <div className={styles.overlay}></div>
            <Container className={styles.content}>
                <div className={styles.feedbackHeader}>
                    <h4>Cảm nhận khách hàng</h4>
                </div>

                <Slider {...settings}>
                    <div className={styles.feedbackBody}>
                        <div className={styles.feedbackContent}>
                            <div class={styles.quoteIcon}>❝</div>
                            <img src={userFeedback} alt="userFeedback" width={50} height={50} />
                            <div>
                                <p  className={styles.feedbackText}>
                                    Dịch vụ ở đây thật tuyệt vời! Xe của tôi không chỉ sạch sẽ mà còn hoạt động mượt mà
                                    hơn rất nhiều sau khi được bảo dưỡng.Tôi rất hài lòng với chất lượng và sự chuyên
                                    nghiệp của đội ngũ kỹ thuật viên
                                </p>
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.feedbackBody}>
                        <div className={styles.feedbackContent}>
                            <div class={styles.quoteIcon}>❝</div>
                            <img src={userFeedback} alt="userFeedback" width={50} height={50} />
                            <div>
                                <p  className={styles.feedbackText}>
                                    Nhân viên tư vấn rất thân thiện và hiểu biết. Họ đã giúp tôi chọn dịch vụ phù hợp và
                                    giải thích rõ ràng từng bước trong quy trình. Tôi cảm thấy được chăm sóc chu đáo và
                                    sẽ quay lại khi cần.
                                </p>
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.feedbackBody}>
                        <div className={styles.feedbackContent}>
                            <div class={styles.quoteIcon}>❝</div>
                            <img src={userFeedback} alt="userFeedback" width={50} height={50} />
                            <div>
                                <p className={styles.feedbackText}>
                                    Dịch vụ ở đây thật tuyệt vời! Xe của tôi không chỉ sạch sẽ mà còn hoạt động mượt mà
                                    hơn rất nhiều sau khi được bảo dưỡng.Tôi rất hài lòng với chất lượng và sự chuyên
                                    nghiệp của đội ngũ kỹ thuật viên
                                </p>
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                                <FaRegStar className={styles.feedbackIcon} />
                            </div>
                        </div>
                    </div>
                </Slider>
            </Container>
        </div>
    );
};

export default FeedBack;
