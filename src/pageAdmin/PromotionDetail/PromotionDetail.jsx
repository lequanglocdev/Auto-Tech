import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getCarApi, getServicesApi, createPromotionDetail } from '@/utils/api';
import { toast } from 'react-toastify';
import styles from './PromotionDetail.module.css';
import icons from '@/utils/icon';
import { Button, Form } from 'react-bootstrap';

const PromotionDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { MdArrowBackIos } = icons;

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [vehiclesResponse, servicesResponse] = await Promise.all([getCarApi(), getServicesApi()]);
                console.log('Vehicles response:', vehiclesResponse); // Kiểm tra response từ API
                setVehicleTypes(vehiclesResponse);
                setServices(servicesResponse);
            } catch (error) {
                console.error('Error fetching vehicle types or services:', error);
                setError('Không thể tải dữ liệu loại xe hoặc dịch vụ.');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleCreatePromotion = async () => {
        if (!selectedVehicleType || !selectedService) {
            setError('Vui lòng chọn loại xe và dịch vụ.');
            return;
        }

        try {
            const response = await createPromotionDetail(id, selectedVehicleType, selectedService);
            toast.success('Tạo khuyến mãi thành công!');
            console.log('Promotion created:', response);
        } catch (error) {
            console.error('Error creating promotion:', error);
            setError('Không thể tạo khuyến mãi.');
            toast.error('Tạo khuyến mãi thất bại!');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleListPromotion = () => {
        navigate('/promotion');
    };

    return (
        <div>
            <div className={styles.promotionDetaiHead}>
                <MdArrowBackIos onClick={handleListPromotion} className={styles.promotionIcon} />
                <h3>Chi tiết chương trình khuyến mãi</h3>
            </div>

            <div className={styles.invoiceBody}>
                <label htmlFor="vehicleSelect" className={styles.invoiceEmploy}>
                    Chọn loại xe áp dụng:
                </label>
                <Form.Select
                    size="lg"
                    className={styles.invoiceEmploySelect}
                    id="vehicleSelect"
                    value={selectedVehicleType}
                    onChange={(e) => setSelectedVehicleType(e.target.value)}
                >
                    <option value="">Chọn loại xe</option>
                    {vehicleTypes.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                            {vehicle.vehicle_type_name}
                        </option>
                    ))}
                </Form.Select>
            </div>

            <div className={styles.invoiceBody}>
                <label htmlFor="serviceSelect" className={styles.invoiceEmploy}>
                    Chọn dịch vụ:
                </label>
                <Form.Select
                    size="lg"
                    className={styles.invoiceEmploySelect}
                    id="serviceSelect"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                >
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map((service) => (
                        <option key={service._id} value={service._id}>
                            {service.name}
                        </option>
                    ))}
                </Form.Select>
            </div>

            <div className={styles.invoiceBtn}>
                <Button size="lg" onClick={handleCreatePromotion}>
                    Áp dụng
                </Button>
            </div>
         
        </div>
    );
};

export default PromotionDetail;
