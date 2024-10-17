import { getAppointmentCompleted } from '@/utils/api';
import React, { useEffect, useState } from 'react';

const AppointmentCompleted = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getAppointmentCompleted();
                console.log(response);
                setAppointments(response); // Giả định dữ liệu trả về có dạng mảng
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []); // Chạy 1 lần khi component được mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Completed Appointments</h2>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment._id}>
                        <h3>Appointment ID: {appointment._id}</h3>
                        <h4>Customer Information:</h4>
                        <p>
                            <strong>ID:</strong> {appointment.customer_id._id}
                        </p>
                        <p>
                            <strong>Name:</strong> {appointment.customer_id.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {appointment.customer_id.email}
                        </p>
                        <p>
                            <strong>Phone Number:</strong> {appointment.customer_id.phone_number}
                        </p>
                        <p>
                            <strong>Address:</strong> {appointment.customer_id.address}
                        </p>
                        <p>
                            <strong>Total Spending:</strong> {appointment.customer_id.total_spending}
                        </p>
                        <h4>Vehicle Information:</h4>
                        <p>
                            <strong>ID:</strong> {appointment.vehicle_id._id}
                        </p>
                        <p>
                            <strong>License Plate:</strong> {appointment.vehicle_id.license_plate}
                        </p>
                        <p>
                            <strong>Manufacturer:</strong> {appointment.vehicle_id.manufacturer}
                        </p>
                        <p>
                            <strong>Model:</strong> {appointment.vehicle_id.model}
                        </p>
                        <p>
                            <strong>Year:</strong> {appointment.vehicle_id.year}
                        </p>
                        <p>
                            <strong>Color:</strong> {appointment.vehicle_id.color}
                        </p>
                        <h4>Slot Information:</h4>
                        <p>
                            <strong>Slot ID:</strong> {appointment.slot_id._id}
                        </p>
                        <p>
                            <strong>Slot Datetime:</strong>{' '}
                            {new Date(appointment.slot_id.slot_datetime).toLocaleString()}
                        </p>
                        <p>
                            <strong>Duration (minutes):</strong> {appointment.slot_id.duration_minutes}
                        </p>
                        <p>
                            <strong>Status:</strong> {appointment.slot_id.status}
                        </p>
                        <p>
                            <strong>Capacity:</strong> {appointment.slot_id.capacity}
                        </p>
                        <h4>Appointment Details:</h4>
                        <p>
                            <strong>Appointment Datetime:</strong>{' '}
                            {new Date(appointment.appointment_datetime).toLocaleString()}
                        </p>
                        <p>
                            <strong>Status:</strong> {appointment.status}
                        </p>
                        <p>
                            <strong>Created At:</strong> {new Date(appointment.created_at).toLocaleString()}
                        </p>
                        <p>
                            <strong>Updated At:</strong> {new Date(appointment.updated_at).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentCompleted;
