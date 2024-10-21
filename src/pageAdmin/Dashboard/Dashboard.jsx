import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import { getAppointmentCompleted, getSlot } from '@/utils/api';
import SlotList from './SlotList/SlotList';
import { Spinner } from 'react-bootstrap';
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
        setAppointmentsLoading(true); // Set loading to true before fetching
        try {
            const response = await getAppointmentCompleted();
            setAppointments(response);
            setFilteredAppointments(response);
        } catch (err) {
            setAppointmentsError(err); // Set error if fetching fails
        } finally {
            setAppointmentsLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        fetchSlots(); // Fetch slots when component mounts
        fetchAppointments(); // Fetch appointments when component mounts
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
        navigate(`/slot/${slotInfo.slot._id}`);
    };
    const availableSlots = slots.filter((slotInfo) => slotInfo.slot.status !== 'booked');
    const bookedSlots = slots.filter((slotInfo) => slotInfo.slot.status === 'booked');
    return (
        <div className={styles.dasboardWraper}>
            <div className={styles.dashboarHeader}>
                <Breadcrumb items={['Tổng quan', 'Chăm sóc khách hàng']} activeItem="Chăm sóc khách hàng" />
            </div>
            <div className={styles.dasboardBody}>
                <div className={styles.dasboardBodyHandle}>
                    <div className={styles.dasboardBodyEmpty}>
                        {availableSlots.length > 0 ? (
                            <SlotList slots={availableSlots} handleBookSlot={handleBookSlot} />
                        ) : (
                            <div className={styles.noSlotsMessage}>Hiện tại không có chỗ trống.</div>
                        )}
                    </div>
                    <div className={styles.dasboardBodyCalender}>
                        {bookedSlots.length > 0 && (
                            <CalendarSearch bookedSlots={bookedSlots} fetchAppointments={fetchAppointments} />
                        )}
                    </div>
                </div>
                <hr />
                <div className={styles.dasboardBodyCompleted}>
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
