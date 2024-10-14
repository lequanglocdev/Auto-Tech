// AddPriceDetailModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getServicesApi, getCarApi, createPriceLineApi } from '@/utils/api'; // Thay đổi đường dẫn tới file chứa API

const AddPriceDetailModal = ({ show, handleClose, priceId }) => { // priceId được truyền từ props
    const [services, setServices] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [selectedVehicleId, setSelectedVehicleId] = useState('');
    const [price, setPrice] = useState('');

    // Lấy thông tin dịch vụ
    const fetchServices = async () => {
        try {
            const response = await getServicesApi();
            console.log('>>response service', response);
            setServices(response); // Giả sử response.data là mảng chứa các dịch vụ
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    // Lấy thông tin loại xe
    const fetchCars = async () => {
        try {
            const response = await getCarApi();
            console.log('>>response car', response);
            setVehicles(response); // Giả sử response.data là mảng chứa các loại xe
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchCars();
    }, []);

    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        try {
            await createPriceLineApi(priceId, selectedServiceId, selectedVehicleId, price);
            console.log('Thêm thông tin bảng giá thành công!');
            handleClose(); // Đóng modal sau khi thành công
        } catch (error) {
            console.error('Error creating price line:', error);
        }
    };

    return (
        <Modal size="lg" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Thông Tin Bảng Giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="serviceSelect" className="form-label">
                            Chọn Dịch Vụ
                        </label>
                        <select
                            className="form-select"
                            id="serviceSelect"
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                        >
                            <option value="">Chọn dịch vụ</option>
                            {services.map((service) => (
                                <option key={service._id} value={service._id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vehicleSelect" className="form-label">
                            Chọn Loại Xe
                        </label>
                        <select
                            className="form-select"
                            id="vehicleSelect"
                            value={selectedVehicleId}
                            onChange={(e) => setSelectedVehicleId(e.target.value)}
                        >
                            <option value="">Chọn loại xe</option>
                            {vehicles.map((vehicle) => (
                                <option key={vehicle._id} value={vehicle._id}>
                                    {vehicle.vehicle_type_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="priceListName" className="form-label">
                            Giá
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            placeholder="Nhập giá"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <Button variant="primary" type="submit">
                        Lưu Thông Tin
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPriceDetailModal;
