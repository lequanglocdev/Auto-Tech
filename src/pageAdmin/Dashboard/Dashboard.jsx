import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import { getAppointmentCompleted, getSlot } from '@/utils/api';
import SlotList from './SlotList/SlotList';
import { Form, Spinner } from 'react-bootstrap';
import CalendarSearch from './CalendarSearch/CalendarSearch';
import { useNavigate } from 'react-router-dom';
import CardCompleted from './CardCompleted/CardCompleted';

const Dashboard = ({ toggle }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [appointmentsLoading, setAppointmentsLoading] = useState(true);
    const [appointmentsError, setAppointmentsError] = useState(null);
    const navigate = useNavigate();

    const fetchSlots = async () => {
        setLoading(true);
        try {
            const response = await getSlot();
            setSlots(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAppointments = async () => {
        setAppointmentsLoading(true);
        try {
            const response = await getAppointmentCompleted();
            console.log('Appointments response:', response); 
            setAppointments(response);
            setFilteredAppointments(response);
        } catch (err) {
            setAppointmentsError(err);
        } finally {
            setAppointmentsLoading(false);
        }
    };

    useEffect(() => {
        fetchSlots();
        fetchAppointments();
    }, []);

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

    const handleBookSlot = (slotInfo) => {
        navigate(`/slot/${slotInfo.slot._id}`);
    };
    const availableSlots = slots.filter((slotInfo) => slotInfo.slot.status !== 'booked');
    const bookedSlots = slots.filter((slotInfo) => slotInfo.slot.status === 'booked');
    console.log('Booked Slots:', bookedSlots);
    return (
        <div className={styles.dasboardWraper}>
            <div className={styles.dashboarHeader}>
                <Breadcrumb items={['Tổng quan', 'Chăm sóc khách hàng']} activeItem="Chăm sóc khách hàng" />
            </div>
            <div className={styles.dasboardBody}>
                <div className={styles.dasboardBodyHandle}>
                    <div className={styles.dasboardBodyEmpty}>
                        <h4>Khu vực chăm sóc khách hàng</h4>
                        {availableSlots.length > 0 ? (
                            <SlotList slots={availableSlots} handleBookSlot={handleBookSlot} />
                        ) : (
                            <div className={styles.noSlotsMessage}>Hiện tại không có chỗ trống.</div>
                        )}
                    </div>
                    <div className={styles.dasboardBodyCalender}>
                        <h4>Lịch hẹn</h4>
                        {bookedSlots.length > 0 ? (
                            <CalendarSearch bookedSlots={bookedSlots} fetchAppointments={fetchAppointments} />
                        ) : (
                            <div>
                                <p>Chưa có lịch hẹn nào </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.dasboardBodyCompleted}>
                    <h4 className={styles.dasboardBodyCompletedHead}>Khu vực lập hóa đơn</h4>
                    <CardCompleted
                        key={appointments.length}
                        appointments={appointments}
                        filteredAppointments={filteredAppointments}
                        fetchAppointments={fetchAppointments}
                        loading={appointmentsLoading}
                        error={appointmentsError}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
