import React from 'react';
import { Container } from 'react-bootstrap';
import styles from  './CareServices.module.css';
import {services} from '@/utils/data';
import { useNavigate } from 'react-router-dom';

const CareServices = () => {
    const navigate = useNavigate();

    const handleService = (serviceId) =>{
        navigate(`/services/${serviceId}`);
    }

    return (
        <Container id='services'>
            <div className={styles['care-services']}>
                <h4>Dịch vụ chăm sóc</h4>
                <p>Đây là một trong số những dịch vụ sửa chữa ô tô mà Auto Tech chúng tôi cung cấp.</p>
            </div>
            <div className={styles['care-content']}>
                {services.map((service,index)=>(
                <div className={styles['care-card']} key={service.id} 
                onClick={() => handleService(service.id)}>
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
