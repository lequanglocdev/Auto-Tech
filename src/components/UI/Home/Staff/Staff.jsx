import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './Staff.module.css';
import staff from "../../../../assets/staff/staff1.jpg"
import staff2 from "../../../../assets/staff/staff2.webp"
import staff3 from "../../../../assets/staff/staff3.jpg"
import staff4 from '../../../../assets/staff/staff4.jpg'

const Staff = () => {
    
    return (
        <Container id="gara">
            <div className={styles.staffContent}>
                <div className={styles.staffHead}>
                    <h4>Nhân viên kỹ thuật chuyên nghiệp</h4>
                </div>
                <div className={styles.staffBody}>
                    <div className={styles.staffCard}>
                        <div className={styles.cardImg}>
                            <img src={staff} alt="staff" />
                        </div>
                        <h2>Nguyên Văn Hùng</h2>
                        <p>Kỹ thuật viên chăm sóc xe</p>
                        <p>
                            Hùng có nhiều năm kinh nghiệm trong việc bảo dưỡng và chăm sóc xe. Anh ấy chuyên về các dịch
                            vụ chi tiết như đánh bóng bề mặt xe, chăm sóc lớp sơn và làm mới ngoại thất xe.
                        </p>
                    </div>
                    <div className={styles.staffCard}>
                        <div className={styles.cardImg}>
                            <img src={staff2} alt="staff" />
                        </div>
                        <h2>Trần Minh Tâm </h2>
                        <p>Kỹ thuật viên bảo dưỡng </p>
                        <p>
                            Tâm chuyên về các dịch vụ bảo dưỡng kỹ thuật cho xe, bao gồm kiểm tra và sửa chữa các hệ
                            thống cơ bản, đảm bảo xe luôn ở trạng thái hoạt động tốt nhất.
                        </p>
                    </div>
                    <div className={styles.staffCard}>
                        <div className={styles.cardImg}>
                            <img src={staff3} alt="staff" />
                        </div>
                        <h2>Lê Quốc Bảo </h2>
                        <p>Nhân viên bảo dưỡng</p>
                        <p>
                            Bảo có kinh nghiệm chuyên sâu về lốp xe, từ việc kiểm tra áp suất, cân bằng lốp đến thay mới
                            và bảo dưỡng định kỳ, giúp xe vận hành an toàn và hiệu quả.
                        </p>
                    </div>
                    <div className={styles.staffCard}>
                        <div className={styles.cardImg}>
                            <img src={staff4} alt="staff" />
                        </div>
                        <h2>Nguyễn Văn Long</h2>
                        <p>Nhân viên tư vấn</p>
                        <p>
                            Long là người có kỹ năng giao tiếp tốt, chuyên tư vấn cho khách hàng về các dịch vụ chăm sóc
                            và bảo dưỡng xe, giúp khách hàng lựa chọn những dịch vụ phù hợp với nhu cầu của họ.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Staff;
