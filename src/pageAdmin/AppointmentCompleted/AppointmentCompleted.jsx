import { getAppointmentCompleted } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import AppointmentCard from './AppointmentCard/AppointmentCard';
import styles from './AppointmentCompleted.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
const AppointmentCompleted = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getAppointmentCompleted();
                setAppointments(response);
                setFilteredAppointments(response);
                console.log(  ">>>abc",response)
                
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const updateAppointment = (updatedAppointment) => {
        setAppointments((prevAppointments) =>
            prevAppointments.map((app) =>
                app._id === updatedAppointment._id ? updatedAppointment : app
            )
        );
        setFilteredAppointments((prevAppointments) =>
            prevAppointments.map((app) =>
                app._id === updatedAppointment._id ? updatedAppointment : app
            )
        );
    };
    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Spinner animation="border" variant="primary" size="lg" role="status" aria-hidden="true" />
            </div>
        );
    }
    return (
        <Container>
            <div className={styles.appointmentHeader}>
                <Breadcrumb
                    items={['Quản lý lịch chăm sóc', 'Danh sách lịch hẹn hoàn thành']}
                    activeItem="Danh sách lịch hẹn hoàn thành"
                />
            </div>
            <div  className={styles.appointmentBody}>
                <Row>
                    {filteredAppointments.map((appointment) => (
                        <Col key={appointment._id} xs={12} md={6} lg={4}>
                            <AppointmentCard appointment={appointment} updateAppointment={updateAppointment}/>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};

export default AppointmentCompleted;
