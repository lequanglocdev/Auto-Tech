import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailUser } from '@/utils/api';
import styles from './CustomerDetail.module.css'
const CustomerDetailPage = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [vehicles, setVehicles] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await getDetailUser({ _id: id });
                if (response.customer) {
                    setCustomer(response.customer);
                    setVehicles(response.vehicles || []);
                } else {
                    setError('No customer data found.');
                }
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setError('Error fetching customer details.');
            } finally {
                setLoading(false); 
            }
        };

        fetchCustomer();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!customer) {
        return <div>No customer data available.</div>; 
    }

    return (
        <div className={styles.customerDetailWrapper}>
            <h1>Khách hàng {customer.name}</h1>
            <div>
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone_number}</p>
                <p><strong>Address:</strong> {customer.address}</p>
            </div>

            <h2>Vehicles</h2>
            {vehicles.length > 0 ? (
                <ul>
                    {vehicles.map(vehicle => (
                        <li key={vehicle._id}>
                            <p><strong>License Plate:</strong> {vehicle.license_plate}</p>
                            <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
                            <p><strong>Model:</strong> {vehicle.model}</p>
                            <p><strong>Year:</strong> {vehicle.year}</p>
                            <p><strong>Color:</strong> {vehicle.color}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No vehicles found for this customer.</p>
            )}
        </div>
    );
};

export default CustomerDetailPage;
