import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './Dashboard.module.css';
import { Form, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { createAppointmentCustomer, getAppointmentCompleted, getAppointmentWithoutSlot, getSlot } from '@/utils/api';
import BookedWaitModal from './BookedWaitModal/BookedWaitModal';
import BookedModal from './BookedModal/BookedModal';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [slots, setSlots] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState(null);

    const [appointments, setAppointments] = useState([]);
    const [withoutSlot, setWithoutSlot] = useState([]);

    const [showModalBookedWait, setShowModalBookedWait] = useState(false);
    const [showModalBooked, setShowModalBooked] = useState(false);

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
            // await fetchAppointmentsCompleted();
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

    const handleServiceBooking = (without) => {
        console.log('Thông tin dịch vụ:', without);
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

    const handleConfirm = async (slot) => {
        console.log('Thông tin slot được xác nhận:', slot); // Log toàn bộ đối tượng slot
    
        // Kiểm tra nếu slot có appointments
        if (slot?.appointments.length > 0) {
            for (const appointment of slot.appointments) {
                try {
                    const response = await createAppointmentCustomer(appointment?._id);
                    toast.success('Đã xác nhận lịch hẹn:'); // Log phản hồi từ API
    
                    // Cập nhật state appointments để thêm lịch hẹn mới
                    // setAppointments(prev => [
                    //     ...prev,
                    //     { ...appointment, _id: response?._id } // Giả sử API trả về ID mới, bạn có thể điều chỉnh theo cách trả về của API
                    // ]);
                    await fetchAppointmentsCompleted();
                    setSlots(prevSlots => prevSlots.filter(s => s.slot._id !== slot.slot._id));
                } catch (error) {
                    toast.error('Lỗi khi xác nhận lịch hẹn:');
                }
            }
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
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <div className={styles.wrapperSlot} key={appointment._id}>
                                        <div className={styles.slotHeaderCompleted}>
                                            <p className={styles.slotHeaderCompletedText}>Hoàn thành</p>
                                        </div>
                                        <div className={styles.slotBody}>
                                            <p className={styles.slotBodyText}>Tên: {appointment.customer_id.name}</p>
                                            <p className={styles.slotBodyText}>
                                                Số điện thoại: {appointment.customer_id.phone_number}
                                            </p>
                                            <p className={styles.slotBodyText}>
                                                Thời gian đặt:{' '}
                                                {new Date(appointment.appointment_datetime).toLocaleString()}
                                            </p>
                                            <p className={styles.slotBodyText}>
                                                Biển số xe: {appointment.vehicle_id.license_plate}
                                            </p>
                                        </div>
                                        <div className={styles.slotFooterCompleted}>
                                            <div
                                                className={styles.slotCardFooterView}
                                               
                                            >
                                                <span>Lập hóa đơn</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.slotBodyText}></p>
                            )}
                        </div>
                    </div>
                    {/* _______________ */}
                    <div className={styles.dasboardBodyCalender}>
                        <h4>Lịch hẹn</h4>
                        <div className={styles.calendar}>
                            <Form.Group className={styles.calendarForm}>
                                <Form.Control size="lg" type="date" />
                            </Form.Group>
                            <button onClick={handleShowModalBookedWait} className={styles.calendarBtn}>
                                Đặt lịch chờ
                            </button>
                        </div>
                        <div className={styles.slot}>
                            {withoutSlot.map((without) => (
                                <div className={styles.wrapperSlot} key={without.slot_id}>
                                    <div className={styles.slotHeader}>
                                        <p className={styles.slotCardHeaderTextLeft}>Khu vực chăm sóc</p>
                                        <p className={styles.availableStatus}>{without.status}</p>
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
                                        <div className={styles.slotCardFooterBook} onClick={() => handleServiceBooking(without)}>
                                            <span>Đặt dịch vụ</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* _______________ */}
                </div>
                <div className={styles.dasboardBodyCompleted}>
                    <h4 className={styles.dasboardBodyCompletedHead}>Khu vực chờ xác nhận </h4>
                    <div className={styles.slotArrive}>
                        {slots
                            .filter((slot) => slot.slot.status === 'booked') // Lọc slot có trạng thái 'booked'
                            .map((slot) => (
                                <div className={styles.wrapperSlot} key={slot.slot_id}>
                                    <div className={styles.slotHeader}>
                                        <p className={styles.slotCardHeaderTextLeft}>Xác nhân lịch hẹn</p>
                                        <p className={styles.availableStatus}>Đã đặt</p>
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
                                        <div className={styles.slotCardFooterBook} onClick={() => handleConfirm(slot)}>
                                            <span>Xác nhận</span>
                                        </div>
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
        </div>
    );
};

export default Dashboard;
