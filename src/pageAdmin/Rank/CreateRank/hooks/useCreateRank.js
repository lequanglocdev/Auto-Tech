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
        if (!formData.rank_name) newErrors.rank_name = 'Bạn chưa nhập mã nhân viên';
        if (!formData.discount_rate) newErrors.discount_rate = 'Bạn chưa nhập tên nhân viên';
        if (!formData.min_spending) newErrors.min_spending = 'Bạn chưa nhập mật khẩu';
        if (!formData.description) newErrors.description = 'Bạn chưa nhập email';

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
