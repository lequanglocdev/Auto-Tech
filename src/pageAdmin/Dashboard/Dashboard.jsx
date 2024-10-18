import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import CurrentDateTime from '@/components/UI/CurrentDateTime/CurrentDateTime';
import { deleteSlotApi, getSlot, getSlotDetailApi } from '@/utils/api';
import { Button, Modal, Spinner } from 'react-bootstrap';
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

    // const handleViewSlot = async (slotInfo) => {
    //     try {
    //         const response = await getSlotDetailApi(slotInfo.slot);
    //         console.log(">>response",response)
    //         setSlotDetails(response);
    //         setShowDetailSlot(true);
    //     } catch (error) {
    //         console.error('Error fetching slot details:', error);
    //     }
    // };
    const handleViewSlot = async (slotInfo) => {
    
    
        // Giả sử slotInfo chứa danh sách appointments và bạn muốn lấy ID của appointment đầu tiên (ví dụ)
        const appointmentId = slotInfo.appointments[0]._id;
        console.log(">>> res",appointmentId)
    
        // Điều hướng tới URL với ID của appointment
        navigate(`appointments/${appointmentId}`);
    };

    const handleAddSlot = () => {
        navigate('/addSlot');
    };

    const bookedSlots = slots.filter((slotInfo) => slotInfo.slot.status === 'booked');
    const availableSlots = slots.filter((slotInfo) => slotInfo.slot.status !== 'booked');

    return (
        <div>
            <div className={styles.dashboardWrapper}>
                <div className={styles.dashboar}>
                    <Breadcrumb items={['Tổng quan', 'Chăm sóc khách hàng']} activeItem="Chăm sóc khách hàng" />
                </div>
                {/* <div className={styles.dashboardHeader}>
                    <div className={styles.listsServicesButton}>
                        <CommonButton onClick={handleAddSlot} icon={FaPlusCircle} label="Thêm" />
                    </div>
                </div> */}
                <div className={styles.slotContainer}>
                    <div className={styles.slotContainerAreaOne}>
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
                                                    <strong>Số lượng khách có thể đặt:</strong> {slotInfo.slot.capacity}
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
                    <hr />
                    <div className={styles.slotContainerAreaTwo}>
                        <h3 className={styles.sectionTitle}>Khu vực hạng chờ xác nhận</h3>
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
                                                    <strong>Số lượng khách có thể đặt:</strong> {slotInfo.slot.capacity}
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
