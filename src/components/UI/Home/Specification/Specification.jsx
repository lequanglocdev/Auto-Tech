import React from 'react';
import styles from './Specification.module.css';
const Specification = () => {
    return (
        <div className={styles['specification']}>
            <div className={styles['specification-content']}>
                <div className={styles['specification-head']}>
                    <h4>Thông số kĩ thuật</h4>
                </div>
                <div className={styles['specification-body']}>
                    <div className={styles['body-text']}>
                        <span>20</span>
                        <span>Năm kinh nghiệm</span>
                    </div>
                    <div className={styles['body-text']}>
                        <span>2000</span>
                        <span>Khách hàng hài lòng</span>
                    </div>
                    <div className={styles['body-text']}>
                        <span>50</span>
                        <span>Kĩ thuật viên</span>
                    </div>
                    <div className={styles['body-text']}>
                        <span>50</span>
                        <span>Giải thưởng</span>
                    </div>
                </div>
            </div>
            <div className="specification-img">
                <img src="./specification1.png" alt="" width={482} height={425} />
                <img src="./specification2.png" alt="" width={482} height={425} />
                <img src="./specification3.png" alt="" width={482} height={425} />
            </div>
        </div>
    );
};

export default Specification;
