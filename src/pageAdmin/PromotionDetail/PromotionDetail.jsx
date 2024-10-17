import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getCarApi, getServicesApi, createPromotionDetail } from '@/utils/api'; // Đảm bảo import đúng hàm API của bạn
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import style cho Toastify

const PromotionDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const location = useLocation();
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy danh sách loại xe và dịch vụ khi component được mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [vehiclesResponse, servicesResponse] = await Promise.all([getCarApi(), getServicesApi()]);
                setVehicleTypes(vehiclesResponse); // Lưu danh sách loại xe
                setServices(servicesResponse); // Lưu danh sách dịch vụ
            } catch (error) {
                console.error('Error fetching vehicle types or services:', error);
                setError('Không thể tải dữ liệu loại xe hoặc dịch vụ.');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Xử lý khi người dùng bấm nút tạo promotion
    const handleCreatePromotion = async () => {
        if (!selectedVehicleType || !selectedService) {
            setError('Vui lòng chọn loại xe và dịch vụ.');
            return;
        }

        try {
            const response = await createPromotionDetail(id, selectedVehicleType, selectedService);
            toast.success('Tạo khuyến mãi thành công!'); // Hiển thị thông báo thành công
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

    return (
        <div>
            <h1>Promotion Detail</h1>

            {/* Dropdown chọn loại xe */}
            <div>
                <label>Chọn loại xe:</label>
                <select value={selectedVehicleType} onChange={(e) => setSelectedVehicleType(e.target.value)}>
                    <option value="">Chọn loại xe</option>
                    {vehicleTypes.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                            {vehicle.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dropdown chọn dịch vụ */}
            <div>
                <label>Chọn dịch vụ:</label>
                <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                    <option value="">Chọn dịch vụ</option>
                    {services.map((service) => (
                        <option key={service._id} value={service._id}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Nút tạo khuyến mãi */}
            <button onClick={handleCreatePromotion}>Tạo khuyến mãi</button>

            {/* Toast container để hiển thị thông báo */}
            <ToastContainer />
        </div>
    );
};

export default PromotionDetail;
