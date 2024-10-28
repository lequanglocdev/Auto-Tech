import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { getCarApi, getRankApi, getServicesApi, putPromotionDetail } from '@/utils/api';
import styles from './EditPromotionDetailModal.module.css';
const EditPromotionDetailModal = ({ show, onHide, detail, onSave }) => {
    const [services, setServices] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [applicableRanks, setApplicableRanks] = useState([]);
    const [serviceId, setServiceId] = useState('');
    const [applicableRankId, setApplicableRankId] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const [minOrderValue, setMinOrderValue] = useState(0);

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
            setServiceId(detail.service_id || '');
            setApplicableRankId(detail.applicable_rank_id || '');
            setDiscountValue(detail.discount_value || 0);
            setMinOrderValue(detail.min_order_value || 0);
        }
    }, [detail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!detail?._id) {
            console.error('Promotion detail ID is missing');
            return;
        }
        try {
            const updatedDetail = {
                _id: detail._id,
                service_id: serviceId,
                applicable_rank_id: applicableRankId,
                discount_value: discountValue,
                min_order_value: minOrderValue,
            };
            await putPromotionDetail(updatedDetail);
            onSave(updatedDetail); // Cập nhật danh sách sau khi lưu
            onHide(); // Close modal after successful update
        } catch (error) {
            console.error('Error updating promotion detail:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Chỉnh sửa dòng khuyến mãi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* <Form.Group>
                        <Form.Label>Dịch vụ</Form.Label>
                        <Form.Select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                            {services.map((service) => (
                                <option key={service._id} value={service._id}>
                                    {service.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group> */}

                    <Form.Group className={styles.customerGroup}>
                        <Form.Label className={styles.customerLabel}>Cấp bậc áp dụng</Form.Label>
                        <Form.Select
                            value={applicableRankId}
                            size="lg"
                            onChange={(e) => setApplicableRankId(e.target.value)}
                        >
                            {applicableRanks.map((rank) => (
                                <option key={rank._id} value={rank._id}>
                                    {rank.rank_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className={styles.customerGroup}>
                        <Form.Label className={styles.customerLabel}>Giá trị giảm giá</Form.Label>
                        <Form.Control
                            className={styles.customerControl}
                            type="number"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={styles.customerGroup}>
                        <Form.Label  className={styles.customerLabel}>Giá trị đơn hàng tối thiểu</Form.Label>
                        <Form.Control
                            className={styles.customerControl}
                            type="number"
                            value={minOrderValue}
                            onChange={(e) => setMinOrderValue(e.target.value)}
                        />
                    </Form.Group>

                    {/* <Button variant="primary" onClick={handleSubmit}>
                        Lưu thay đổi
                    </Button> */}
                    <div className={styles.btn}>
                            <Button className={`mt-2 ${styles.customerBtn}`} variant="primary" type="submit" onClick={handleSubmit}>
                                Cập nhật
                            </Button>
                        </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPromotionDetailModal;
