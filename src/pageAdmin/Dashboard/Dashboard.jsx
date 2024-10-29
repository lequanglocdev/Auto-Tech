import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './Dashboard.module.css';
import { Button, Card, Form, Modal, Pagination, Spinner, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {
    createAppointmentCustomer,
    createAppointmentsAddWithoutSlot,
    getAppointmentCompleted,
    getAppointmentsDetailApi,
    getAppointmentsforDate,
    getAppointmentWithoutSlot,
    getSlot,
} from '@/utils/api';
import BookedWaitModal from './BookedWaitModal/BookedWaitModal';
import BookedModal from './BookedModal/BookedModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getCurrentDate } from '@/utils/dateTime';
const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [slots, setSlots] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState(null);

    const [appointments, setAppointments] = useState([]);
    const [withoutSlot, setWithoutSlot] = useState([]);

    const [showModalBookedWait, setShowModalBookedWait] = useState(false);
    const [showModalBooked, setShowModalBooked] = useState(false);

    const [searchDate, setSearchDate] = useState(getCurrentDate());

    const [appointmentDetail, setAppointmentDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const statusMapping = {
        scheduled: 'Đã lên lịch hẹn',
        waiting: 'Đang xử lý',
        completed: 'Đã hoàn thành',
        cancelled: 'Đã hủy',
    };

    const getStatusText = (status) => statusMapping[status] || 'Trạng thái không xác định';
    const fetchSlots = async () => {
        try {
            const slotResponse = await getSlot();
            console.log('Slots data:', slotResponse);
            setSlots(slotResponse);
        } catch (err) {
            console.error('Error fetching slots:', err);
            setError((prev) => (prev ? prev + ' Lỗi khi tải slots.' : 'Lỗi khi tải slots.'));
        }
    };

    const fetchAppointmentsCompleted = async () => {
        try {
            const appointmentResponse = await getAppointmentCompleted();
            setAppointments(appointmentResponse);
        } catch (err) {
            console.error('Error fetching appointments:', err);
            setError((prev) => (prev ? prev + ' Lỗi khi tải appointments.' : 'Lỗi khi tải appointments.'));
        }
    };

    const fetchAppointmentsWithoutSlot = async () => {
        try {
            const withoutSlotResponse = await getAppointmentWithoutSlot();
            setWithoutSlot(withoutSlotResponse);
        } catch (err) {
            console.error('Error fetching appointments without slot:', err);
            setError((prev) =>
                prev ? prev + ' Lỗi khi tải appointments without slot.' : 'Lỗi khi tải appointments without slot.',
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset lỗi trước khi bắt đầu

            // Gọi các hàm fetch riêng lẻ
            await fetchSlots();
            await fetchAppointmentsCompleted();
            await fetchAppointmentsWithoutSlot();

            setLoading(false);
        };

        fetchData();
    }, []);

    const handleShowModalBookedWait = () => setShowModalBookedWait(true);
    const handleCloseModalBookedWait = () => setShowModalBookedWait(false);

    const updateWithoutSlot = async () => {
        try {
            const withoutSlotResponse = await getAppointmentWithoutSlot();
            setWithoutSlot(withoutSlotResponse);
        } catch (err) {
            console.error('Error fetching appointments without slot:', err);
            setError((prev) =>
                prev ? prev + ' Lỗi khi tải appointments without slot.' : 'Lỗi khi tải appointments without slot.',
            );
        }
    };

    const handleSearchCalender = async () => {
        try {
            const response = await getAppointmentsforDate(searchDate);
            console.log('>>> lịch hẹn', response);
            setAppointments(response);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Token đã hết hạn, vui lòng đăng nhập lại.');
            } else {
                toast.error('Không tìm thấy dữ liệu cuộc hẹn.');
            }
        } finally {
            setLoading(false); // Dừng loading khi có kết quả hoặc lỗi
        }
    };

    const handleServiceBooking = async (without) => {
        console.log('Thông tin dịch vụ:', without?._id);

        try {
            const response = await createAppointmentsAddWithoutSlot(without?._id);
            await fetchSlots();
            toast.success('Đã thêm slot vào cuộc hẹn thành công!');
            console.log('Phản hồi từ API:', response);
            // Cập nhật lại danh sách withoutSlot sau khi thêm thành công
            await updateWithoutSlot();
        } catch (error) {
            console.error('Lỗi khi thêm slot vào cuộc hẹn:', error);
            toast.error('Không tìm thấy slot khả dụng');
        }
    };
    // ----------------------------------------
    const updateSlot = async () => {
        try {
            const slotResponse = await getSlot();
            setSlots(slotResponse);
        } catch (err) {
            console.error('Error fetching appointments without slot:', err);
            setError((prev) =>
                prev ? prev + ' Lỗi khi tải appointments without slot.' : 'Lỗi khi tải appointments without slot.',
            );
        }
    };

    const handleShowModalBooked = (slotId) => {
        console.log('Clicked slot ID:', slotId); // Kiểm tra slotId khi click
        setSelectedSlotId(slotId);
        setShowModalBooked(true);
    };
    const handleCloseModalBooked = () => setShowModalBooked(false);

    const handleConfirmView = async (slot) => {
        if (slot?.appointments.length > 0) {
            // Giả sử bạn muốn lấy appointment đầu tiên
            const appointment = slot.appointments[0];

            try {
                // Gọi API để lấy chi tiết appointment
                const response = await getAppointmentsDetailApi(appointment);
                setAppointmentDetail(response); // Lưu dữ liệu vào state
                setShowModal(true); // Mở modal
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết appointment:', error);
            }
        } else {
            console.log('Không có appointment nào cho slot này.');
        }
    };

    const handleWatingView = async (appointment) => {
        console.log(appointment);
        // if (without?.appointments.length > 0) {
        //     // Giả sử bạn muốn lấy appointment đầu tiên
        //     const appointment = without.appointments[0];

        //     try {
        //         // Gọi API để lấy chi tiết appointment
        //         const response = await getAppointmentsDetailApi(appointment);
        //         setAppointmentDetail(response); // Lưu dữ liệu vào state
        //         setShowModal(true); // Mở modal
        //     } catch (error) {
        //         console.error('Lỗi khi lấy chi tiết appointment:', error);
        //     }
        // } else {
        //     console.log('Không có appointment nào cho slot này.');
        // }
    };
    const handleConfirm = async (slot) => {
        console.log('Thông tin slot được xác nhận:', slot);

        // Kiểm tra nếu slot có appointments
        if (slot?.appointments.length > 0) {
            for (const appointment of slot.appointments) {
                try {
                    const response = await createAppointmentCustomer(appointment?._id);
                    toast.success('Đã xác nhận lịch hẹn:'); // Log phản hồi từ API

                    // Cập nhật state appointments để thêm lịch hẹn mới
                    setAppointments((prev) => [
                        ...prev,
                        { ...appointment, _id: response?._id }, // Giả sử API trả về ID mới, bạn có thể điều chỉnh theo cách trả về của API
                    ]);
                    //    await fetchAppointmentsCompleted();
                    setSlots((prevSlots) => prevSlots.filter((s) => s.slot._id !== slot.slot._id));
                } catch (error) {
                    toast.error('Lỗi khi xác nhận lịch hẹn:');
                }
            }
            navigate('/appointments/completed');
        } else {
            console.log('Không có appointment nào cho slot này.');
        }
    };
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Spinner animation="border" variant="primary" size="lg" role="status" aria-hidden="true" />
            </div>
        );
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div className={styles.dasboardWraper}>
            <div className={styles.dashboarHeader}>
                <Breadcrumb items={['Tổng quan', 'Chăm sóc khách hàng']} activeItem="Chăm sóc khách hàng" />
            </div>
            <div className={styles.dasboardBody}>
                <div className={styles.dasboardBodyHandle}>
                    <div className={styles.dasboardBodyEmpty}>
                        <h4>Khu vực chăm sóc khách hàng</h4>
                        <div className={styles.slot}>
                            {slots
                                .filter((slot) => slot.slot.status === 'available') // Lọc slot có trạng thái 'available'
                                .map((slot) => (
                                    <div className={styles.wrapperSlot} key={slot.slot_id}>
                                        <div className={styles.slotHeader}>
                                            <p className={styles.slotCardHeaderTextLeft}>Khu vực chăm sóc</p>
                                            <p className={styles.availableStatus}>Trống</p>
                                        </div>
                                        <div className={styles.slotBody}>
                                            <p className={styles.slotBodyText}></p>
                                        </div>
                                        <div className={styles.slotCardFooter}>
                                            <div
                                                className={styles.slotCardFooterBook}
                                                onClick={() => handleShowModalBooked(slot?.slot?._id)}
                                            >
                                                <span>Đặt dịch vụ</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {slots
                                .filter((slot) => slot.slot.status === 'booked') // Lọc slot có trạng thái 'booked'
                                .map((slot) => (
                                    <div className={styles.wrapperSlot} key={slot.slot_id}>
                                        <div className={styles.slotHeaderCompleted}>
                                            <p className={styles.slotHeaderCompletedText}>Xác nhận hoàn thành</p>
                                            <p className={styles.slotHeaderCompletedText}>Đã đặt</p>
                                        </div>
                                        <div className={styles.slotBody}>
                                            <p className={styles.slotBodyText}>
                                                Thời gian hoàn thành: {slot.slot.duration_minutes} phút
                                            </p>
                                            <p className={styles.slotBodyText}>
                                                Thời gian đặt: {new Date(slot.slot.slot_datetime).toLocaleString()}
                                            </p>
                                            {slot.appointments.length > 0 ? (
                                                <>
                                                    <p className={styles.slotBodyText}>
                                                        Tên: {slot.appointments[0].customer_id.name}{' '}
                                                    </p>
                                                    <p className={styles.slotBodyText}>
                                                        Số điện thoại: {slot.appointments[0].customer_id.phone_number}{' '}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className={styles.slotBodyText}>Chưa có khách hàng</p>
                                            )}
                                        </div>
                                        <div className={styles.slotCardFooter}>
                                            <div
                                                className={styles.slotCardFooterView}
                                                onClick={() => handleConfirm(slot)}
                                            >
                                                <span>Hoàn thành</span>
                                            </div>
                                            <div
                                                className={styles.slotCardFooterBook}
                                                onClick={() => handleConfirmView(slot)}
                                            >
                                                <span>Xem</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {/* ___________________________________________________________________________*/}

                    <div className={styles.dasboardBodyCalender}>
                        <div className={styles.dasboardBodyCalenderHeader}>
                            <h4>Lịch hẹn</h4>
                            <button onClick={handleShowModalBookedWait} className={styles.calendarBtn}>
                                Đặt lịch chờ
                            </button>
                        </div>
                        <div className={styles.calendar}>
                            <Form.Group className={styles.calendarForm}>
                                <Form.Control
                                    size="lg"
                                    type="date"
                                    value={searchDate}
                                    onChange={(e) => setSearchDate(e.target.value)}
                                />
                            </Form.Group>
                            <button onClick={handleSearchCalender} className={styles.calendarBtn}>
                                Tìm kiếm
                            </button>
                        </div>
                        {loading ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Spinner
                                    animation="border"
                                    variant="primary"
                                    size="lg"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </div>
                        ) : (
                            appointments.length > 0 && (
                                <div className={styles.appointmentResults}>
                                    {appointments.map((appointment) => (
                                        <div key={appointment._id} className={styles.appointmentResultsBody}>
                                            <div className={styles.appointmentResultsHeader}>
                                                <p className={styles.appointmentResultsText}>Lịch hẹn</p>
                                                <p className={styles.appointmentResultsText}>
                                                    {getStatusText(appointment.status)}
                                                </p>
                                            </div>
                                            <p className={styles.appointmentResultsBodyText}>
                                                Ngày và giờ:{' '}
                                                {new Date(appointment.appointment_datetime).toLocaleString()}
                                            </p>
                                            <p className={styles.appointmentResultsBodyText}>
                                                Tên: {appointment.customer_id.name}
                                            </p>
                                            <p className={styles.appointmentResultsBodyText}>
                                                Số điện thoại: {appointment.customer_id.phone_number}
                                            </p>
                                            <p className={styles.appointmentResultsBodyText}>
                                                Biển số xe: {appointment.vehicle_id.license_plate}
                                            </p>
                                            {/* <div>
                                                <Button  onClick={() => handleWatingView(appointment)}>Xem</Button>
                                            </div> */}
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                    {/* _______________ */}
                </div>
                <div className={styles.dasboardBodyCompleted}>
                    <h4 className={styles.dasboardBodyCompletedHead}>Khu vực chờ xác nhận </h4>

                    <div className={styles.slotArrive}>
                        {withoutSlot.map((without) => (
                            <div className={styles.wrapperSlot} key={without.slot_id}>
                                <div className={styles.slotHeader}>
                                    <p className={styles.slotCardHeaderTextLeft}>Xác nhận lịch hẹn</p>
                                    <p className={styles.availableStatus}> {getStatusText(without.status)}</p>
                                </div>
                                <div className={styles.slotBody}>
                                    <p className={styles.slotBodyText}>Tên: {without.customer_id.name}</p>
                                    <p className={styles.slotBodyText}>
                                        Thời gian đặt: {new Date(without.appointment_datetime).toLocaleString()}
                                    </p>
                                    <p className={styles.slotBodyText}>
                                        Biển số xe: {without.vehicle_id.license_plate}
                                    </p>
                                </div>
                                <div className={styles.slotCardFooter}>
                                    <div
                                        className={styles.slotCardFooterBook}
                                        onClick={() => handleServiceBooking(without)}
                                    >
                                        <span>Xác nhận</span>
                                    </div>
                                    {/* <div
                                        className={styles.slotCardFooterBook}
                                       
                                    >
                                        <span>Xem</span>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BookedWaitModal
                show={showModalBookedWait}
                handleClose={handleCloseModalBookedWait}
                onUpdateWithoutSlot={updateWithoutSlot}
            />
            <BookedModal
                onUpdateSlot={updateSlot}
                show={showModalBooked}
                handleClose={handleCloseModalBooked}
                slotId={selectedSlotId}
            />
            {showModal && (
                <Modal centered show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className={styles.customerTitle}>
                            Chi tiết cuộc hẹn {appointmentDetail.customer_id.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {appointmentDetail ? (
                            <div>
                                <div>
                                    <h5>Thông tin khách hàng</h5>
                                    {/* <p>ID: {appointmentDetail._id}</p>
                                    <p>
                                        Thời gian: {new Date(appointmentDetail.appointment_datetime).toLocaleString()}
                                    </p> */}
                                    {/* <p>Trạng thái: {appointmentDetail.status}</p> */}
                                    <p>Khách hàng: {appointmentDetail.customer_id.name}</p>

                                    {/* Thêm các thông tin khác nếu cần */}
                                </div>
                                <div>
                                    <h5>Thông tin xe</h5>
                                    <p>Xe: {appointmentDetail.vehicle_id.license_plate}</p>
                                </div>
                                <div>
                                    <h5>Thông tin dịch vụ</h5>
                                    {appointmentDetail.services && appointmentDetail.services.length > 0 ? (
                                        <ul>
                                            {appointmentDetail.services.map((service) => (
                                                <li key={service._id}>
                                                    <p>
                                                        <strong>Tên dịch vụ:</strong> {service.name}
                                                    </p>
                                                    <p>
                                                        <strong>Mô tả:</strong> {service.description}
                                                    </p>
                                                    <p>
                                                        <strong>Giá:</strong> {service.price.toLocaleString()} VND
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>Không có dịch vụ nào được cung cấp.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p>Đang tải dữ liệu...</p>
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default Dashboard;
