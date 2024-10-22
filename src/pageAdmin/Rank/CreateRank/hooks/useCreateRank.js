import { createRankApi } from '@/utils/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useCreateRank = () => {
    const [formData, setFormData] = useState({
        rank_name: '',
        discount_rate: '',
        min_spending: '',
        description: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setSubmitError('');
    };

    const validateForm = () => {
        const newErrors = {};
    
        if (!formData.rank_name) newErrors.rank_name = 'Bạn chưa nhập hạng khách hàng';
        if (!formData.discount_rate || isNaN(formData.discount_rate) || formData.discount_rate < 0 || formData.discount_rate > 100) {
            newErrors.discount_rate = 'Giảm giá phải là số từ 0 đến 100';
        }
        if (!formData.min_spending || isNaN(formData.min_spending) || formData.min_spending <= 0) {
            newErrors.min_spending = 'Phí tối thiểu phải là một số dương';
        }
        if (!formData.description) newErrors.description = 'Bạn chưa nhập mô tả';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setSubmitError('');
            try {
                await createRankApi(
                    formData.rank_name,
                    formData.discount_rate,
                    formData.min_spending,
                    formData.description
                );
                setShowOtpModal(true);
            } catch (error) {
               console.log(error)
            } finally {
                setIsSubmitting(false);
            }
        }
    };

 

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        showOtpModal,
        isSubmitting,
        submitError,
    };
};

export default useCreateRank;
