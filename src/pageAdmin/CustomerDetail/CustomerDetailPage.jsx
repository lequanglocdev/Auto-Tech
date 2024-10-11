import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailUser } from '@/utils/api';
import styles from './CustomerDetail.module.css';
import AddVehicleModal from './AddVehicleModal/AddVehicleModal';
import { Button, Card, Spinner, Tab, Tabs } from 'react-bootstrap';

const CustomerDetailPage = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addVehicleModalShow, setAddVehicleModalShow] = useState(false);
    const [key, setKey] = useState('customerInfo'); // Tab state to switch between tabs

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

    const handleAddVehicle = (newVehicle) => {
        setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
        setAddVehicleModalShow(false);
    };

    if (loading) {
        return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" variant="primary" /></div>;
    }

    if (error) {
        return <div className="text-danger text-center mt-5">{error}</div>;
    }

    if (!customer) {
        return <div className="text-center mt-5">No customer data available.</div>;
    }

    return (
        <div className={`${styles.customerDetailWrapper} container mt-4`}>
            <Tabs
                id="customer-detail-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className={`mb-3 ${styles.customTab}`}
            >
                <Tab eventKey="customerInfo" title="Thông tin khách hàng">
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <h2 className={`mb-3 text-danger ${styles.customerDetailTextHeading} `}>Thông tin khách hàng</h2>
                            <p className={styles.customerDetailTextDes}><strong>Tên:</strong> {customer.name}</p>
                            <p className={styles.customerDetailTextDes}><strong>Email:</strong> {customer.email}</p>
                            <p className={styles.customerDetailTextDes}><strong>Số điện thoại:</strong> {customer.phone_number}</p>
                            <p className={styles.customerDetailTextDes}><strong>Địa chỉ:</strong> {customer.address}</p>
                        </Card.Body>

                    </Card>
                </Tab>
                <Tab eventKey="customerVehicles" title="Xe của khách hàng">
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <h2  className={`mb-3 text-danger ${styles.customerDetailTextHeading} `}>Xe của khách</h2>
                            {vehicles.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {vehicles.map(vehicle => (
                                        <li key={vehicle._id} className="list-group-item">
                                            <p><strong>Biển số:</strong> {vehicle.license_plate}</p>
                                            <p><strong>Hãng sản xuất:</strong> {vehicle.manufacturer}</p>
                                            <p><strong>Model:</strong> {vehicle.model}</p>
                                            <p><strong>Năm:</strong> {vehicle.year}</p>
                                            <p><strong>Màu sắc:</strong> {vehicle.color}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center">
                                    <p>Chưa có thông tin xe của khách hàng {customer.name}</p>
                                    <Button variant="primary" onClick={() => setAddVehicleModalShow(true)}>Thêm xe</Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>

            <AddVehicleModal
                show={addVehicleModalShow}
                onHide={() => setAddVehicleModalShow(false)}
                onAddVehicle={handleAddVehicle}
            />
        </div>
    );
};

export default CustomerDetailPage;
