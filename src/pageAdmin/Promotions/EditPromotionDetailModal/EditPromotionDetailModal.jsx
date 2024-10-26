import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { getCarApi, getRankApi, getServicesApi, putPromotionDetail } from '@/utils/api';

const EditPromotionDetailModal = ({ show, onHide, detail }) => {
    const [services, setServices] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [applicableRanks, setApplicableRanks] = useState([]);
    const [vehicleTypeId, setVehicleTypeId] = useState(detail?.vehicleTypeId || '');
    const [serviceId, setServiceId] = useState(detail?.serviceId || '');
    const [applicableRankId, setApplicableRankId] = useState(detail?.applicableRankId || '');
    const [discountValue, setDiscountValue] = useState(detail?.discountValue || 0);
    const [minOrderValue, setMinOrderValue] = useState(detail?.minOrderValue || 0);

    // Fetch initial data for dropdowns when modal is shown
    useEffect(() => {
        if (show) {
            const fetchInitialData = async () => {
                try {
                    const [vehiclesResponse, servicesResponse, ranksResponse] = await Promise.all([
                        getCarApi(),
                        getServicesApi(),
                        getRankApi(),
                    ]);
                    setVehicleTypes(vehiclesResponse);
                    setServices(servicesResponse);
                    setApplicableRanks(ranksResponse);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchInitialData();
        }
    }, [show]);

    useEffect(() => {
        if (detail) {
            setServiceId(detail.serviceId);
            setApplicableRankId(detail.applicableRankId);
            setDiscountValue(detail.discountValue);
            setMinOrderValue(detail.minOrderValue);
        }
    }, [detail]);
   

    const handleSubmit = async () => {
        if (!detail?._id) {
            console.error('Promotion detail ID is missing');
            return;
        }
        try {
            await putPromotionDetail(detail._id, serviceId, applicableRankId, discountValue, minOrderValue);
            onHide(); // Close modal after successful update
        } catch (error) {
            console.error('Error updating promotion detail:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa dòng khuyến mãi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Dịch vụ</Form.Label>
                        <Form.Select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                            {services.map((service) => (
                                <option key={service._id} value={service._id}>
                                    {service.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Cấp bậc áp dụng</Form.Label>
                        <Form.Select value={applicableRankId} onChange={(e) => setApplicableRankId(e.target.value)}>
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

                    <Button variant="primary" onClick={handleSubmit}>
                        Lưu thay đổi
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPromotionDetailModal;
