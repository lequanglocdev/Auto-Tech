import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailUser, getRankApi, putCustomerRankApi } from '@/utils/api';
import styles from './CustomerDetail.module.css';
import { Spinner, Form, Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CustomerDetailPage = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rank, setRank] = useState('');
    const [rankOptions, setRankOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRank, setSelectedRank] = useState('');
    const rankStyles = {
        Đồng: { backgroundColor: '#d35400', textColor: '#ecf0f1' }, // Màu nền và màu chữ cho Đồng
        Bạc: { backgroundColor: '#bdc3c7', textColor: '#2c3e50' }, // Màu nền và màu chữ cho Bạc
        Vàng: { backgroundColor: '#f1c40f', textColor: '#2c3e50' }, // Màu nền và màu chữ cho Vàng
        'Bạch Kim': { backgroundColor: '#E5E4E2', textColor: '#FFFFFF' }, // Màu nền và màu chữ cho Bạch Kim
    };
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await getDetailUser({ _id: id });
                if (response.customer) {
                    setCustomer(response.customer);
                    setVehicles(response.vehicles || []);
                    // Lưu rank vào localStorage
                    const storedRank = localStorage.getItem(`customerRank_${id}`);
                    const initialRank = storedRank || response.customer.rank || 'Đồng';
                    setRank(initialRank);
                } else {
                    setError('Không tìm thấy dữ liệu khách hàng.');
                }
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setError('Lỗi khi lấy chi tiết khách hàng.');
            } finally {
                setLoading(false);
            }
        };

        const fetchRankOptions = async () => {
            try {
                const response = await getRankApi();
                const formattedRanks = response.map((rank) => ({
                    value: rank._id,
                    label: rank.rank_name,
                }));
                setRankOptions(formattedRanks);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Token đã hết hạn, vui lòng đăng nhập lại.');
                } else {
                    toast.error('Đã xảy ra lỗi khi lấy dữ liệu rank.');
                }
            }
        };

        fetchCustomer();
        fetchRankOptions();
    }, [id]);

    const handleRankChange = (event) => {
        const newRank = event.target.value;
        setSelectedRank(newRank);
        setShowModal(true);
    };

    const handleModalConfirm = async () => {
        setShowModal(false);
        console.log('Selected Rank:', selectedRank); // Kiểm tra giá trị rank đã chọn
        console.log('Customer ID:', customer._id); // Kiểm tra ID của khách hàng

        try {
            // Gọi API để cập nhật rank
            await putCustomerRankApi({ _id: selectedRank, rank: selectedRank }); // Đảm bảo sử dụng ID rank
            setRank(selectedRank); // Cập nhật trạng thái rank hiện tại
            // Lưu rank mới vào localStorage
            localStorage.setItem(`customerRank_${id}`, selectedRank);
            toast.success('Cập nhật rank thành công!');
            // Cập nhật lại thông tin khách hàng nếu cần
            const response = await getDetailUser({ _id: id });
            setCustomer(response.customer);
        } catch (error) {
            console.error('Error updating customer rank:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật rank.');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <div className="text-danger text-center mt-5">{error}</div>;
    }

    if (!customer) {
        return <div className="text-center mt-5">No customer data available.</div>;
    }

    const currentRankName = rankOptions.find((option) => option.value === rank)?.label || 'Đồng';

    return (
        <div className={`${styles.customerDetailWrapper} container mt-4`}>
            <div
                className={styles.customerDetaiProfile}
                style={{
                    backgroundColor: rankStyles[currentRankName]?.backgroundColor || '#FFFFFF', // Mặc định màu trắng nếu không có trong danh sách
                    color: rankStyles[currentRankName]?.textColor || '#000000', // Mặc định màu đen nếu không có trong danh sách
                }}
            >
                <h2 className={`mb-3 ${styles.customerDetailTextHeading}`}>
                    Thông tin chi tiết khách hàng
                </h2>
                <p className={styles.customerDetailTextDes}>
                    <strong>Tên:</strong> {customer.name}
                </p>
                <p className={styles.customerDetailTextDes}>
                    <strong>Email:</strong> {customer.email}
                </p>
                <p className={styles.customerDetailTextDes}>
                    <strong>Số điện thoại:</strong> {customer.phone_number}
                </p>
                <p className={styles.customerDetailTextDes}>
                    <strong>Địa chỉ:</strong> {customer.address}
                </p>
                <div className={styles.customerDetailRank}>
                    <p className={styles.customerDetailTextDes}>
                        <strong>Hạng khách hàng:</strong> {currentRankName}
                    </p>
                    <Form.Select
                        aria-label="Chọn hạng khách hàng"
                        value={rank}
                        onChange={handleRankChange}
                        className={`mb-3 ${styles.CustomerDetailSelect}`}
                    >
                        {rankOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            </div>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton className={styles.modalHeaderCustom}>
                    <Modal.Title>Xác nhận thay đổi rank</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBodyCustom}>
                    Bạn có chắc chắn muốn thay đổi hạng khách hàng này?
                </Modal.Body>
                <Modal.Footer className={styles.modalFooterCustom}>
                    <Button variant="secondary" onClick={handleModalClose} className={styles.buttonCustom}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleModalConfirm} className={styles.buttonCustom}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CustomerDetailPage;
