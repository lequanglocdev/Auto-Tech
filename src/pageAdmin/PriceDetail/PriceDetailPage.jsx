// PriceDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailPrice } from '@/utils/api';
import AddPriceDetailModal from './AddPriceDetailModal/AddPriceDetailModal';

const PriceDetailPage = () => {
    const { priceId } = useParams();
    const [priceDetail, setPriceDetail] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchPriceDetail = async () => {
            try {
                const response = await getDetailPrice({ _id: priceId });
                console.log("response detail price", response);
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

    if (priceDetail.length === 0) {
        return (
            <div style={{
                border: '2px solid red',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: '#ffe6e6',
                borderRadius: '8px',
                margin: '20px 0',
                color: '#cc0000'
            }}>
                <h2>Thông Báo</h2>
                <p>Thông tin chi tiết bảng giá này chưa có sẵn hoặc không tồn tại.</p>
                <button
                    onClick={handleAddInfo}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#cc0000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                >
                    Thêm Thông Tin
                </button>

                <AddPriceDetailModal show={showModal} handleClose={handleCloseModal} priceId={priceId} />
            </div>
        );
    }

    return (
        <div>
            <h1>Price Detail</h1>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Vehicle Type</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {priceDetail.map((item) => (
                        <tr key={item._id}>
                            <td>{item.service_id.name}</td>
                            <td>{item.vehicle_type_id.vehicle_type_name}</td>
                            <td>{item.price}</td>
                            <td>{item.service_id.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddPriceDetailModal show={showModal} handleClose={handleCloseModal} priceId={priceId} />
        </div>
    );
};

export default PriceDetailPage;
