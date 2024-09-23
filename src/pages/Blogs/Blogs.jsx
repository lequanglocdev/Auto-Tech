import React from 'react';
import { Container } from 'react-bootstrap';
import image from '@/assets/sidebar/blog1.jpg';
import styles from './Blog.module.css';
import icons from '@/utils/icon';
const Blogs = () => {
    const { FaUser, FaRegComment, MdKeyboardDoubleArrowRight } = icons;
    return (
        <Container>
            <div className={styles.blog}>
                <img src={image} alt="" width={350} height={250} />
                <div className={styles.blogContent}>
                    <h4 className={styles.blogContentHead}>5 bí quyết đơn giản giúp xe luôn như mới</h4>
                    <div className={styles.blogContentComent}>
                        <div className={styles.blogContentComentBy}>
                            <FaUser />
                            Admin 
                        </div>
                        <div className={styles.blogContentComentDetail}>
                          <FaRegComment />
                          10
                        </div>
                    </div>
                    <p className={styles.blogContentDes}>
                        Mở đầu bằng việc nhấn mạnh tầm quan trọng của việc chăm sóc xe thường xuyên để tăng tuổi thọ và
                        giữ gìn vẻ đẹp của xe.
                    </p>
                    <button className={styles.blogContentBtn}>Đọc thêm  <MdKeyboardDoubleArrowRight/> </button>
                </div>
            </div>
        </Container>
    );
};

export default Blogs;
