import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import icons from '@/utils/icon';
import styles from './AddPromotionDetail.module.css';
import { createPromotionDetail, getRankApi } from '@/utils/api';

const AddPromotionDetail = ({ show, promotionHeader, onHide, onSuccess }) => {
    const [applicableRanks, setApplicableRanks] = useState([]);
    const [vehicleTypeId, setVehicleTypeId] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [applicableRankId, setApplicableRankId] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const [minOrderValue, setMinOrderValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const { FaPlusCircle } = icons;

    useEffect(() => {
        if (show) {
            const fetchInitialData = async () => {
                try {
                    const ranksResponse = await getRankApi();
                    setApplicableRanks(ranksResponse || []);
                } catch (error) {
                    toast.error('Lỗi khi tải dữ liệu cấp bậc');
                } finally {
                    setLoading(false);
                }
            };
            fetchInitialData();
        }
    }, [show]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!promotionHeader?._id) {
            toast.error('Không tìm thấy mã chương trình khuyến mãi');
            return;
        }

        setLoading(true);
        try {
            const newDetail = await createPromotionDetail(
                promotionHeader._id,
                vehicleTypeId || '',
                serviceId || '',
                applicableRankId,
                discountValue,
                minOrderValue,
            );
            console.log("Kết quả từ API createPromotionDetail:", newDetail);
            const rank = applicableRanks.find((rank) => rank._id === applicableRankId);
            const rankName = rank ? rank.rank_name : '';

            setVehicleTypeId('');
            setServiceId('');
            setApplicableRankId('');
            setDiscountValue(0);
            setMinOrderValue(0);
            onHide();

            if (onSuccess) {
                console.log("Calling onSuccess with:", { ...newDetail, applicableRankName: rankName });
                onSuccess({
                    ...newDetail,
                    applicableRankId,
                    applicableRankName: rankName,
                });
            }
        } catch (error) {
            console.error('Lỗi khi tạo chi tiết khuyến mãi:', error);
            toast.error('Lỗi khi tạo chi tiết khuyến mãi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm chi tiết khuyến mãi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className={styles.labelText}>Cấp bậc áp dụng</Form.Label>
                        <Form.Select
                            size="lg"
                            value={applicableRankId}
                            onChange={(e) => setApplicableRankId(e.target.value)}
                            required
                        >
                            <option value="">Chọn cấp bậc</option>
                            {applicableRanks.map((rank) => (
                                <option key={rank._id} value={rank._id}>
                                    {rank.rank_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={styles.labelText}>Giá trị giảm giá</Form.Label>
                        <Form.Control
                            size="lg"
                            type="number"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={styles.labelText}>Giá trị đơn hàng tối thiểu</Form.Label>
                        <Form.Control
                            size="lg"
                            type="number"
                            value={minOrderValue}
                            onChange={(e) => setMinOrderValue(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <button type="submit" className={styles.btnAdd} disabled={loading}>
                        <FaPlusCircle /> {loading ? 'Đang thêm...' : 'Thêm'}
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPromotionDetail;
