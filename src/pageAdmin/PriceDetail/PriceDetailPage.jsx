// PriceDetailPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDetailPrice } from '@/utils/api';
import AddPriceDetailModal from './AddPriceDetailModal/AddPriceDetailModal';
import styles from './PriceDetailPage.module.css';
import { Table } from 'react-bootstrap';
import icons from '@/utils/icon';
import { useNavigate } from 'react-router-dom';

const PriceDetailPage = () => {
    const navigate = useNavigate();
    const { priceId } = useParams();
    const location = useLocation();
    const { priceListName } = location.state || {};
    const [priceDetail, setPriceDetail] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { MdArrowBackIos } = icons;

    useEffect(() => {
        const fetchPriceDetail = async () => {
            try {
                const response = await getDetailPrice({ _id: priceId });
                console.log('response detail price', response);
                setPriceDetail(response); // Lưu trữ mảng thông tin chi tiết
            } catch (error) {
                console.error('Error fetching price detail:', error);
            }
        };

        fetchPriceDetail();
    }, [priceId]);

    const handleAddInfo = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleListPrice = () => {
        navigate('/prices');
    };

    const renderContent = () => {
        if (priceDetail.length === 0) {
            return (
                <div
                    style={{
                        border: '2px solid red',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#ffe6e6',
                        borderRadius: '8px',
                        margin: '20px 0',
                        color: '#cc0000',
                    }}
                >
                    <h2>Thông Báo</h2>
                    <p>Thông tin chi tiết bảng giá này chưa có sẵn hoặc không tồn tại.</p>
                </div>
            );
        }

        return (
            <div className={styles.dataTableWrapper}>
                <Table striped bordered hover className={styles.dataTable}>
                    <thead>
                        <tr>
                            <th className={styles.dataTableHead}>Tên dịch vụ</th>
                            <th className={styles.dataTableHead}>Loại xe</th>
                            <th className={styles.dataTableHead}>Giá</th>
                            <th className={styles.dataTableHead}>Mô tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priceDetail.map((item) => (
                            <tr key={item._id} className={styles.dataTableRow}>
                                <td className={styles.dataTableItem}>{item.service_id.name}</td>
                                <td className={styles.dataTableItem}>{item.vehicle_type_id.vehicle_type_name}</td>
                                <td className={styles.dataTableItem}>{item.price}</td>
                                <td className={styles.dataTableItem}>{item.service_id.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    };

    return (
        <div>
            <div className={styles.priceDetailHead}>
                <MdArrowBackIos onClick={handleListPrice} className={styles.priceDetailHeadIcon} />
                {priceListName && <h4>{priceListName} tại cửa hàng L&K TECH</h4>}
                <div></div>
            </div>
            <button
                onClick={handleAddInfo}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#cc0000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                }}
            >
                Thêm Thông Tin
            </button>
            {/* Hiển thị nội dung chi tiết */}
            {renderContent()}

            {/* Nút thêm thông tin luôn hiển thị */}

            {/* Modal thêm thông tin */}
            <AddPriceDetailModal show={showModal} handleClose={handleCloseModal} priceId={priceId} />
        </div>
    );
};

export default PriceDetailPage;
