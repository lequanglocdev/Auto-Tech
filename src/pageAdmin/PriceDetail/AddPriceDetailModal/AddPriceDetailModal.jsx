import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getServicesApi, getCarApi, createPriceLineApi } from '@/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPriceDetailModal = ({ show, handleClose, priceId, onUpdatePriceDetail }) => {
    const [services, setServices] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [selectedVehicleId, setSelectedVehicleId] = useState('');
    const [price, setPrice] = useState('');

    const fetchServices = async () => {
        try {
            const response = await getServicesApi();
            setServices(response);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchCars = async () => {
        try {
            const response = await getCarApi();
            setVehicles(response);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchCars();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newPriceDetail = await createPriceLineApi(priceId, selectedServiceId, selectedVehicleId, price);
            console.log('Thêm thông tin bảng giá thành công!', newPriceDetail);
    
            // Gọi callback để cập nhật danh sách chi tiết ngay lập tức
            onUpdatePriceDetail(newPriceDetail);
    
            // Hiển thị toast thông báo thành công
            toast.success('Thêm thông tin bảng giá thành công!');
    
            handleClose(); // Đóng modal sau khi thành công
        } catch (error) {
            console.error('Error creating price line:', error);
            toast.error('Đã xảy ra lỗi khi thêm thông tin bảng giá.');
        }
    };
    

    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Thông Tin Bảng Giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="serviceSelect" className="form-label">Chọn Dịch Vụ</label>
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
                            <label htmlFor="vehicleSelect" className="form-label">Chọn Loại Xe</label>
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
                            <label htmlFor="priceListName" className="form-label">Giá</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                placeholder="Nhập giá"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <Button variant="primary" type="submit">Lưu Thông Tin</Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                </Modal.Footer>
            </Modal>
            
            {/* Toast Container */}
            <ToastContainer />
        </>
    );
};

export default AddPriceDetailModal;
