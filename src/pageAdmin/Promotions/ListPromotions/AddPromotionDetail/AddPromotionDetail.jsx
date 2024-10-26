import { createPromotionDetail, getCarApi, getRankApi, getServicesApi } from '@/utils/api';
import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';


const AddPromotionDetail = ({ show, promotionHeader, onHide }) => {
    const [services, setServices] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [applicableRanks, setApplicableRanks] = useState([]);
    const [vehicleTypeId, setVehicleTypeId] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [applicableRankId, setApplicableRankId] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const [minOrderValue, setMinOrderValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Gọi API khi modal mở
    useEffect(() => {
        if (show) {
            const fetchInitialData = async () => {
                try {
                    const [vehiclesResponse, servicesResponse, ranksResponse] = await Promise.all([
                        getCarApi(),
                        getServicesApi(),
                        getRankApi()
                    ]);
                    setVehicleTypes(vehiclesResponse);
                    setServices(servicesResponse);
                    setApplicableRanks(ranksResponse);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Không thể tải dữ liệu.');
                } finally {
                    setLoading(false);
                }
            };
            fetchInitialData();
        }
    }, [show]); // Chỉ gọi lại khi `show` thay đổi

    const handleSubmit = async () => {
        if (!promotionHeader?._id) {
            console.error('Không có id của promotionHeader');
            return; // Ngăn không cho gửi nếu không có id
        }
        try {
            const response = await createPromotionDetail(
                promotionHeader._id,
                vehicleTypeId,
                serviceId,
                applicableRankId,
                discountValue,
                minOrderValue
            );
            console.log('Thành công:', response.data);
            onHide(); // Đóng modal sau khi tạo thành công
        } catch (error) {
            console.error('Lỗi khi tạo chi tiết khuyến mãi:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm dòng khuyến mãi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Loại phương tiện</Form.Label>
                        <Form.Select
                            value={vehicleTypeId}
                            onChange={(e) => setVehicleTypeId(e.target.value)}
                        >
                            <option value="">Chọn loại phương tiện</option>
                            {vehicleTypes.map((vehicle) => (
                                <option key={vehicle._id} value={vehicle._id}>
                                    {vehicle.vehicle_type_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Dịch vụ</Form.Label>
                        <Form.Select
                            value={serviceId}
                            onChange={(e) => setServiceId(e.target.value)}
                        >
                            <option value="">Chọn dịch vụ</option>
                            {services.map((service) => (
                                <option key={service._id} value={service._id}>
                                    {service.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Cấp bậc áp dụng</Form.Label>
                        <Form.Select
                            value={applicableRankId}
                            onChange={(e) => setApplicableRankId(e.target.value)}
                        >
                            <option value="">Chọn cấp bậc</option>
                            {applicableRanks.map((rank) => (
                                <option key={rank._id} value={rank._id}>
                                    {rank.rank_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Giá trị giảm giá</Form.Label>
                        <Form.Control
                            type="number"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Giá trị đơn hàng tối thiểu</Form.Label>
                        <Form.Control
                            type="number"
                            value={minOrderValue}
                            onChange={(e) => setMinOrderValue(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={handleSubmit}>Lưu</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPromotionDetail;
