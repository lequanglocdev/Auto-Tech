import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './Blogs.module.css';
import {blogData} from '@/utils/data'
const Blogs = () => {
    return (
        <Container id='blog'>
        <div className="blog">
            <div className={styles.blogHead}>
                <h4>Bài viết mới nhất</h4>
            </div>
            <div className={styles.blogBody}>
                {blogData.map((blog) => (
                    <div key={blog.id} className={styles.blogCard}>
                        <img src={blog.image} alt="" />
                        <div className={styles.blogInfo}>
                            <div className={styles.blogUser}>
                                <p>icon</p>
                                <p>{blog.author}</p>
                            </div>
                            <div className={styles.blogUser}>
                                <p>icon</p>
                                <p>{blog.date}</p>
                            </div>
                            <div className={styles.blogUser}>
                                <p>icon</p>
                                <p>{blog.comments}</p>
                            </div>
                        </div>
                        <div className={styles.blogContent}>
                            <p>{blog.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Container>
    );
};

export default Blogs;