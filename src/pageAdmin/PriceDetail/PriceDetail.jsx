import { createPriceLineApi, getCarApi, getServicesApi } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const PriceDetail = () => {
    const { priceId } = useParams();
    const [services, setServices] = useState([]);
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Chạy cả hai API song song
                const [servicesResponse, carResponse] = await Promise.all([getServicesApi(), getCarApi()]);
                setServices(servicesResponse);
                setCarData(carResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response && error.response.status === 401) {
                    toast.error('Token đã hết hạn, vui lòng đăng nhập lại.');
                } else {
                    toast.error('Đã xảy ra lỗi khi lấy dữ liệu.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedService || !selectedCar || !price) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        try {
            console.log('priceId:', priceId);
            console.log('selectedService:', selectedService);
            console.log('selectedCar:', selectedCar);
            console.log('price:', price);
            await createPriceLineApi(priceId, selectedService, selectedCar, parseFloat(price)); // Sử dụng priceId từ URL
            toast.success('Giá đã được cập nhật thành công!');
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('Đã xảy ra lỗi khi gửi dữ liệu.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Thêm chi tiết bảng giá</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="serviceSelect">
                    <Form.Label>Chọn Dịch Vụ</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                    >
                        <option value="">Chọn dịch vụ</option>
                        {services.map((service) => (
                            <option key={service._id} value={service._id}>
                                {service.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="carSelect">
                    <Form.Label>Chọn Loại Xe</Form.Label>
                    <Form.Control as="select" value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
                        <option value="">Chọn loại xe</option>
                        {carData.map((car) => (
                            <option key={car._id} value={car._id}>
                                {car.vehicle_type_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="priceInput">
                    <Form.Label>Nhập Giá</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập giá"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cập nhật giá
                </Button>
            </Form>
            <ToastContainer />
        </div>
    );
};

export default PriceDetail;
