import { useState, useEffect } from 'react';
import { createPromotions, getRankApi } from '@/utils/api';

const useCreatePromotionForm = () => {
    const [formData, setFormData] = useState({
        promotionCode: '',
        name: '',
        description: '',
        applicableRankId: '',
        isActive: false,
    });

    const [errors, setErrors] = useState({});
    const [ranks, setRanks] = useState([]); // Thêm state để lưu danh sách hạng
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const fetchRanks = async () => {
            try {
                const response = await getRankApi();
                console.log(">> response ranks",response)
                setRanks(response); // Giả sử API trả về một mảng các rank
            } catch (error) {
                console.error('Lỗi khi lấy danh sách hạng:', error);
            }
        };

        fetchRanks();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setSubmitError('');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.promotionCode) newErrors.promotionCode = 'Bạn chưa nhập mã khuyến mãi';
        if (!formData.name) newErrors.name = 'Bạn chưa nhập tên chương trình khuyến mãi';
        if (!formData.description) newErrors.description = 'Bạn chưa nhập mô tả';
        if (!formData.applicableRankId) newErrors.applicableRankId = 'Bạn chưa chọn loại hạng khách hàng';
        if (!formData.isActive) newErrors.isActive = 'Bạn chưa xét trạng thái';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setSubmitError('');
            try {
                console.log('Dữ liệu form trước khi tạo chương trình khuyến mãi:', formData);
                await createPromotions(
                    formData.promotionCode,
                    formData.name,
                    formData.description,
                    formData.applicableRankId,
                    formData.isActive,
                );
            } catch (error) {
                console.error('Lỗi khi tạo chương trình khuyến mãi:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return {
        formData,
        errors,
        ranks,
        handleChange,
        handleSubmit,
        isSubmitting,
        submitError,
    };
};

export default useCreatePromotionForm;
