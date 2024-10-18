import { getAppointmentCompleted } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppointmentCard from './AppointmentCard/AppointmentCard';
import SearchBar from './SearchBar/SearchBar';
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
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredAppointments(appointments);
        } else {
            const filtered = appointments.filter((appointment) =>
                appointment.customer_id.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setFilteredAppointments(filtered);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <div className={styles.appointmentHeader}>
                {/* <MdArrowBackIos onClick={handleListCar} className={styles.createCarIcon} /> */}
                <Breadcrumb
                    items={['Quản lý lịch chăm sóc', 'Danh sách lịch hẹn hoàn thành']}
                    activeItem="Danh sách lịch hẹn hoàn thành"
                />
            </div>
            <div  className={styles.appointmentBody}>
                <SearchBar onSearch={handleSearch} />
                <Row>
                    {filteredAppointments.map((appointment) => (
                        <Col key={appointment._id} xs={12} md={6} lg={4}>
                            <AppointmentCard appointment={appointment} />
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};

export default AppointmentCompleted;
