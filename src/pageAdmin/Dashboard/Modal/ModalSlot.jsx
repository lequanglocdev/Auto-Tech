import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalSlot.module.css';

const ModalSlot = ({ slotDetails, ...props }) => {
    if (!slotDetails) {
        return null; // Nếu chưa có dữ liệu slot, không render modal
    }

    const { slot, appointments } = slotDetails; // Lấy dữ liệu slot và appointment từ slotDetails

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title className={styles.modalTitle} id="contained-modal-title-vcenter">
                    Thông tin chi tiết khu vực
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.slotInfo}>
                    <h4>Thông tin Slot</h4>
                    <p><strong>ID Slot:</strong> {slot._id}</p>
                    <p><strong>Ngày giờ:</strong> {new Date(slot.slot_datetime).toLocaleString()}</p>
                    <p><strong>Thời gian dự kiến:</strong> {slot.duration_minutes} phút</p>
                    <p><strong>Trạng thái:</strong> {slot.status}</p>
                    <p><strong>Sức chứa:</strong> {slot.capacity}</p>
                </div>

                <div className={styles.appointmentsInfo}>
                    <h4>Thông tin các Appointment</h4>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <div key={appointment._id} className={styles.appointmentItem}>
                                <p><strong>ID Appointment:</strong> {appointment._id}</p>
                                <p><strong>ID Khách hàng:</strong> {appointment.customer_id}</p>
                                <p><strong>Biển số xe:</strong> {appointment.vehicle_id.license_plate}</p>
                                <p><strong>Hãng xe:</strong> {appointment.vehicle_id.manufacturer}</p>
                                <p><strong>Mẫu xe:</strong> {appointment.vehicle_id.model}</p>
                                <p><strong>Thời gian đặt:</strong> {new Date(appointment.appointment_datetime).toLocaleString()}</p>
                                <p><strong>Trạng thái:</strong> {appointment.status}</p>
                            </div>
                        ))
                    ) : (
                        <p>Không có appointment nào trong slot này.</p>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className={styles.btn} onClick={props.onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSlot;
