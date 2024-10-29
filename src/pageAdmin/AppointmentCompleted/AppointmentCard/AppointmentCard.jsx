import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './appointmentCard.module.css';

const AppointmentCard = ({ appointment }) => {
    const navigate = useNavigate(); 

    const handlePaymentClick = () => {
        console.log("Thông tin cuộc hẹn:", appointment);
        navigate(`/invoice/${appointment._id}`);
    };
    return (
        <Card className={styles.appointmentCard}>
            <Card.Header className={styles.appointmentCardHeader}>
                <h5>{appointment.status ? 'Hoàn thành' : "Chưa hoàn thành"}</h5>
                <h5>Thời gian: {new Date(appointment.appointment_datetime).toLocaleString()}</h5>
            </Card.Header>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className={styles.appointmentCardText}>
                        <h4>Thông tin khách hàng</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        <p className={styles.appointmentCardText}><strong>Tên:</strong> {appointment.customer_id.name}</p>
                        <p className={styles.appointmentCardText}><strong>Email:</strong> {appointment.customer_id.email}</p>
                        <p className={styles.appointmentCardText}><strong>Số điện thoại:</strong> {appointment.customer_id.phone_number}</p>
                        <p className={styles.appointmentCardText}><strong>Địa chỉ:</strong> {appointment.customer_id.address}</p>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <h4>Thông tin xe </h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        {/* <p className={styles.appointmentCardText}><strong>:</strong> {appointment.vehicle_id._id}</p> */}
                        <p className={styles.appointmentCardText}><strong>Biển số xe:</strong> {appointment.vehicle_id.license_plate}</p>
                        <p className={styles.appointmentCardText}><strong>Tên xe:</strong> {appointment.vehicle_id.manufacturer}</p>
                        <p className={styles.appointmentCardText}><strong>mẫu xe:</strong> {appointment.vehicle_id.model}</p>
                        <p className={styles.appointmentCardText}><strong>năm sản xuất:</strong> {appointment.vehicle_id.year}</p>
                        <p className={styles.appointmentCardText}><strong>màu sắc:</strong> {appointment.vehicle_id.color}</p>
                    </Accordion.Body>
                </Accordion.Item>

                {/* <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <h4>Thông tin khu vực</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        <p className={styles.appointmentCardText}><strong>Mã khu vực:</strong> {appointment.slot_id._id}</p>
                        <p className={styles.appointmentCardText}><strong>Thời gian đặt:</strong> {new Date(appointment.slot_id.slot_datetime).toLocaleString()}</p>
                        <p className={styles.appointmentCardText}><strong>Thời gian thực hiện (phút):</strong> {appointment.slot_id.duration_minutes}</p>
                        <p className={styles.appointmentCardText}><strong>Trạng thái:</strong> {appointment.slot_id.status}</p>
                        <p className={styles.appointmentCardText}><strong>Số lượng:</strong> {appointment.slot_id.capacity}</p>
                    </Accordion.Body>
                </Accordion.Item> */}

                <Accordion.Item eventKey="3">
                    <Button variant="primary" className={styles.accordionBtn} onClick={handlePaymentClick}>
                        Lập hóa đơn
                    </Button>
                </Accordion.Item>
            </Accordion>
        </Card>
    );
};

export default AppointmentCard;
