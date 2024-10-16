import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import CurrentDateTime from '@/components/UI/CurrentDateTime/CurrentDateTime';
import { getSlot } from '@/utils/api';
import { Button, Modal, ModalBody } from 'react-bootstrap';

const Dashboard = ({ toggle }) => {
    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await getSlot();
                console.log(response);
                setSlots(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleBookService = (slotInfo) => {
        if (slotInfo.slot.status === 'booked') {
            setShowModal(true);
        } else {
            navigate(`/slot/${slotInfo.slot._id}`); 
        }
    };
    return (
        <div>
            <div className={styles.dashboardWrapper}>
                <div className={toggle ? styles.dashContentWithSidebar : styles.dashContentFull}>
                    <div className={styles.dashBoard}>
                        <Breadcrumb items={['Tổng quan']} />
                        <CurrentDateTime />
                    </div>
                </div>
                <div>
                    <h2>Khu vực đặt chăm sóc khách hàng</h2>
                </div>
                <div className={styles.slotContainer}>
                    {slots.map((slotInfo, index) => (
                        <div key={slotInfo.slot._id} className={styles.slotCard}>
                            <div className={styles.slotCardHeader}>
                                <p className={styles.slotCardHeaderTextLeft}>Khu vực chăm sóc số {index + 1}</p>
                                <p
                                    className={
                                        slotInfo.slot.status === 'booked' ? styles.bookedStatus : styles.availableStatus
                                    }
                                >
                                    {slotInfo?.slot?.status === 'booked' ? 'Đang thực hiện' : 'Trống'}
                                </p>
                            </div>
                            <div className={styles.slotCardBody}>
                                <p className={styles.slotCardBodyText}>
                                    <strong>Ngày và giờ:</strong>
                                    {new Date(slotInfo.slot.slot_datetime).toLocaleString()}
                                </p>
                                <p className={styles.slotCardBodyText}>
                                    <strong>Tổng thời gian dự kiến:</strong> {slotInfo.slot.duration_minutes} phút
                                </p>
                                <p className={styles.slotCardBodyText}>
                                    <strong>Số lượng khách có thể đặt:</strong> {slotInfo.slot.capacity}
                                </p>
                            </div>
                            <div className={styles.slotCardFooder} onClick={() => handleBookService(slotInfo)}>
                                <span>Đặt dịch vụ</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className={styles.modalHeaderText}>Không được phép</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>Chỗ này không được thực hiện vì đã có người đặt.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
