import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import CurrentDateTime from '@/components/UI/CurrentDateTime/CurrentDateTime';
import { deleteSlotApi, getSlot, getSlotDetailApi } from '@/utils/api';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import icons from '@/utils/icon';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
import ModalSlot from './Modal/ModalSlot';

const Dashboard = ({ toggle }) => {
    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDetailSlot, setShowDetailSlot] = useState(false);
    const [slotDetails, setSlotDetails] = useState(null);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);

    const { FaPlusCircle, MdArrowBackIos } = icons;

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await getSlot();
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
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Spinner animation="border" variant="primary" size="lg" role="status" aria-hidden="true" />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleBookSlot = (slotInfo) => {
        if (slotInfo.slot.status === 'booked') {
            setShowModal(true);
        } else {
            navigate(`/slot/${slotInfo.slot._id}`);
        }
    };

    const handleDeleteSlot = (slot) => {
        setSlotToDelete(slot);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        if (slotToDelete && slotToDelete.slot) {
            try {
                await deleteSlotApi(slotToDelete.slot);
                setSlots((prevSlots) => prevSlots.filter((slotInfo) => slotInfo.slot._id !== slotToDelete.slot._id));
            } catch (error) {
                console.error('Error deleting slot:', error);
            } finally {
                setConfirmDeleteModalShow(false);
                setSlotToDelete(null);
            }
        }
    };

    const handleViewSlot = async (slotInfo) => {
        const appointmentId = slotInfo.appointments[0]._id;
        console.log('>>> res', appointmentId);

        // Điều hướng tới URL với ID của appointment
        navigate(`appointments/${appointmentId}`);
    };
    

    const bookedSlots = slots.filter((slotInfo) => slotInfo.slot.status === 'booked');
    const availableSlots = slots.filter((slotInfo) => slotInfo.slot.status !== 'booked');

    return (
        <div>
            <div className={styles.dashboardWrapper}>
                <div className={styles.dashboar}>
                    <Breadcrumb items={['Tổng quan', 'Chăm sóc khách hàng']} activeItem="Chăm sóc khách hàng" />
                </div>

                <div className={styles.slotContainer}>
                    <div className={styles.slotContainerAreaOne}>
                        <div>
                            <h3 className={styles.sectionTitle}>Khu vực trống</h3>
                            <div className={styles.slotContainerEmpty}>
                                {availableSlots.length > 0 && (
                                    <>
                                        {availableSlots.map((slotInfo, index) => (
                                            <div key={slotInfo.slot._id} className={styles.slotCard}>
                                                <div className={styles.slotCardHeader}>
                                                    <p className={styles.slotCardHeaderTextLeft}>
                                                        Khu vực chăm sóc số {index + 1 + bookedSlots.length}
                                                    </p>
                                                    <p className={styles.availableStatus}>Trống</p>
                                                </div>
                                                <div className={styles.slotCardBody}>
                                                    <p className={styles.slotCardBodyText}>
                                                        <strong>Ngày và giờ:</strong>{' '}
                                                        {new Date(slotInfo.slot.slot_datetime).toLocaleString()}
                                                    </p>
                                                    <p className={styles.slotCardBodyText}>
                                                        <strong>Tổng thời gian dự kiến:</strong>{' '}
                                                        {slotInfo.slot.duration_minutes} phút
                                                    </p>
                                                    <p className={styles.slotCardBodyText}>
                                                        <strong>Số lượng khách có thể đặt:</strong>{' '}
                                                        {slotInfo.slot.capacity}
                                                    </p>
                                                </div>
                                                <div className={styles.slotCardFooter}>
                                                    {slotInfo.slot.status === 'booked' && (
                                                        <div
                                                            className={styles.slotCardFooterView}
                                                            onClick={() => handleViewSlot(slotInfo)}
                                                        >
                                                            <span>Xác nhận</span>
                                                        </div>
                                                    )}

                                                    <div
                                                        className={styles.slotCardFooterBook}
                                                        onClick={() => handleBookSlot(slotInfo)}
                                                    >
                                                        <span>Đặt</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.slotContainerCalender}>
                            <h3>Lịch hen</h3>
                            <div className={styles.calenderForm}>
                                <Form className={styles.calenderFormSearch}>
                                    <Form.Control size="lg" type="text" placeholder="Search" className=" mr-sm-2" />
                                    <div>
                                        <FaPlusCircle />
                                    </div>
                                </Form>
                            </div>
                            <div className={styles.slotContainerBooked}>
                                {bookedSlots.length > 0 && (
                                    <>
                                        {bookedSlots.map((slotInfo, index) => (
                                            <div key={slotInfo.slot._id} className={styles.slotCard}>
                                                <div className={styles.slotCardHeader}>
                                                    <p className={styles.slotCardHeaderTextLeft}>
                                                        Khu vực chăm sóc số {index + 1}
                                                    </p>
                                                    <p className={styles.bookedStatus}>Đang thực hiện</p>
                                                </div>
                                                <div className={styles.slotCardBody}>
                                                    <p className={styles.slotCardBodyText}>
                                                        <strong>Ngày và giờ:</strong>{' '}
                                                        {new Date(slotInfo.slot.slot_datetime).toLocaleString()}
                                                    </p>
                                                    <p className={styles.slotCardBodyText}>
                                                        <strong>Tổng thời gian dự kiến:</strong>{' '}
                                                        {slotInfo.slot.duration_minutes} phút
                                                    </p>
                                                    <p className={styles.slotCardBodyText}>
                                                        <strong>Số lượng khách có thể đặt:</strong>{' '}
                                                        {slotInfo.slot.capacity}
                                                    </p>
                                                </div>
                                                <div className={styles.slotCardFooter}>
                                                    {slotInfo.slot.status === 'booked' && (
                                                        <div
                                                            className={styles.slotCardFooterView}
                                                            onClick={() => handleViewSlot(slotInfo)}
                                                        >
                                                            <span>Xác nhận</span>
                                                        </div>
                                                    )}

                                                    <div
                                                        className={styles.slotCardFooterBook}
                                                        onClick={() => handleBookSlot(slotInfo)}
                                                    >
                                                        <span>Đặt</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.slotContainerAreaTwo}>
                        <h3 className={styles.sectionTitle}>Khu vực hạng chờ xác nhận</h3>
                    </div>

                    {slots.length === 0 && <p className={styles.noSlotMessage}>Hiện chưa có khu vực nào được tạo.</p>}
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

            <ModalSlot show={showDetailSlot} onHide={() => setShowDetailSlot(false)} slotDetails={slotDetails} />
            <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default Dashboard;



.dashboar {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.dashboardHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 20px 0;
}

.slotContainerEmpty,
.slotContainerBooked {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 10px;
}

.slotContainerEmpty {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.slotContainerBooked {
  margin-top: 40px;
  justify-content: center;
}
.slotContainerAreaTwo {
  margin-top: 40px;
}

.slotContainerCalender {
  width: 900px;
  padding: 0 20px;
}
.slotContainerCalender h3 {
  text-align: center;
  font-size: 2rem;
  color: #e74c3c;
  font-weight: bold;
  font-style: italic;
}
.calenderForm {
  margin-top: 20px;
}
.slotContainerAreaOne {
  display: flex;
}
.calenderFormSearch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.sectionTitle {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-second);
  margin-bottom: 20px;
  font-style: italic;
}

.slotCard {
  width: 350px;
  height: 200px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.slotCardHeader {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  align-items: center;
  background-image: linear-gradient(to right, rgb(29, 162, 86), rgb(72, 212, 131));
}
.slotCardHeaderTextLeft {
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--text-primary) !important;
}

.bookedStatus {
  color: red !important;
  font-size: 1.4rem;
  font-weight: bold;
}

.availableStatus {
  color: var(--text-third) !important;
  font-size: 1.4rem;
  font-weight: bold;
}

.slotCardBody {
  flex: 1;
  background-color: #ecf0f1;
  padding: 4px;
}

.slotCardBodyText {
  font-size: 1.4rem;
}

.slotCardFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.slotCardFooterView,
.slotCardFooterDelete,
.slotCardFooterBook {
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-primary);
  font-size: 1.8rem;
  cursor: pointer;
}
.slotCardFooterView {
  background-color: #f39c12;
  border-bottom-left-radius: 4px;
}
.slotCardFooterDelete {
  background-color: #e74c3c;
}
.slotCardFooterBook {
  background-color: #3498db;
}
.modalHeader {
  background-color: var(--text-second) !important;
}

.modalHeaderText {
  font-size: 1.4rem !important;
  color: var(--text-primary) !important;
}

.modalBody {
  font-size: 1.4rem !important;
}
