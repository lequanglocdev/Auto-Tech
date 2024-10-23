import { useState, useEffect } from 'react';
import { createPromotions, getRankApi } from '@/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useCreatePromotionForm = () => {
    const [formData, setFormData] = useState({
        promotionCode: '',
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const [errors, setErrors] = useState({});
    const [ranks, setRanks] = useState([]); // Thêm state để lưu danh sách hạng
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const fetchRanks = async () => {
            try {
                const response = await getRankApi();
                console.log(">> response ranks", response);
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
        const today = new Date().setHours(0, 0, 0, 0); // Ngày hiện tại (chỉ lấy phần ngày)
        const startDate = new Date(formData.startDate).setHours(0, 0, 0, 0);
        const endDate = new Date(formData.endDate).setHours(0, 0, 0, 0);

        if (!formData.promotionCode) newErrors.promotionCode = 'Bạn chưa nhập mã khuyến mãi';
        if (!formData.name) newErrors.name = 'Bạn chưa nhập tên chương trình khuyến mãi';
        if (!formData.description) newErrors.description = 'Bạn chưa nhập mô tả';

        if (!formData.startDate) {
            newErrors.startDate = 'Bạn chưa nhập ngày bắt đầu';
        } else if (startDate < today) {
            newErrors.startDate = 'Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'Bạn chưa nhập ngày kết thúc';
        } else if (endDate <= startDate) {
            newErrors.endDate = 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
        }

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
                    formData.startDate,
                    formData.endDate
                );
                toast.success('Chương trình khuyến mãi đã được tạo thành công!');
                
                setFormData({
                    promotionCode: '',
                    name: '',
                    description: '',
                    startDate: '',
                    endDate: ''
                });
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
