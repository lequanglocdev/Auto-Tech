import { getAppointmentCompleted } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './CardCompleted.module.css'
import CardSucces from './CardSucces/CardSucces';
const CardCompleted = ({ appointments, filteredAppointments, loading, error }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div><p>Chưa có hóa đơn nào</p></div>;
    }

    return (
        <Container>
            <div className={styles.appointmentBody}>
                <Row>
                    {filteredAppointments.map((appointment) => (
                        <Col key={appointment._id} xs={12} md={6} lg={4}>
                            <CardSucces appointment={appointment} />
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};


export default CardCompleted;
