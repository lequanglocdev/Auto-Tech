import React from 'react';
import { Container } from 'react-bootstrap';
import styles from  './CareServices.module.css';
import {services} from '@/utils/data'
const CareServices = () => {
    return (
        <Container>
            <div className={styles['care-services']}>
                <h4>Dịch vụ chăm sóc</h4>
                <p>Đây là một trong số những dịch vụ sửa chữa ô tô mà Auto Tech chúng tôi cung cấp.</p>
            </div>
            <div className={styles['care-content']}>
                {services.map((service,index)=>(
                    <div className={styles['care-card']} key={index}>
                    <div className={styles['image-wrapper']}>
                        <img
                            src={service.defaultImage}
                            alt={service.title}
                            className={styles['image-default']}
                            width={100}
                            height={100}
                        />
                        <img
                            src={service.hoverImage}
                            alt={service.title}
                            className={styles['image-hover']}
                            width={100}
                            height={100}
                        />
                    </div>
                    <p>{service.title}</p>
                </div>
                ))}
            </div>
        </Container>
    );
};

export default CareServices;
