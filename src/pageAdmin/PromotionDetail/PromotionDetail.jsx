import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getPromotionDetaiApi } from '@/utils/api'; // Đảm bảo import đúng hàm API của bạn

const PromotionDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const location = useLocation();
    const [promotionDetails, setPromotionDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const previousUrl = location.state?.previousUrl || '/';

    useEffect(() => {
        const fetchPromotionDetails = async () => {
            try {
                const response = await getPromotionDetaiApi({ _id: id });
                setPromotionDetails(response.data);
            } catch (error) {
                console.error('Error fetching promotion details:', error);
                setError('Không thể tải dữ liệu chi tiết.');
            } finally {
                setLoading(false);
            }
        };

        fetchPromotionDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Promotion Detail</h1>
            {promotionDetails.length > 0 ? (
                <ul>
                    {promotionDetails.map((detail) => (
                        <li key={detail._id}>
                            <p>Loại giảm giá: {detail.discount_type === 'percentage' ? 'Phần trăm' : 'Cố định'}</p>
                            <p>Giá trị giảm: {detail.discount_value}</p>
                            <p>Giá trị đơn hàng tối thiểu: {detail.min_order_value}</p>
                            <p>Ngày bắt đầu: {new Date(detail.start_date).toLocaleDateString()}</p>
                            <p>Ngày kết thúc: {new Date(detail.end_date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có chi tiết khuyến mãi nào.</p>
            )}
        </div>
    );
};

export default PromotionDetail;
