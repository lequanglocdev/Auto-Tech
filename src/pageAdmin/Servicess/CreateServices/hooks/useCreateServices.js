import { createServicesApi } from '@/utils/api';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useCreateServices = () => {
    const initialFormData = {
        serviceCode: '',
        name: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        if (!formData.serviceCode) newErrors.serviceCode = 'Bạn chưa nhập mã dịch vụ';
        if (!formData.name) newErrors.name = 'Bạn chưa nhập tên dịch vụ';
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
                await createServicesApi(formData.serviceCode, formData.name, formData.description);
                toast.success('Dịch vụ đã được tạo thành công!');
                // Đặt lại formData về giá trị khởi tạo
                setFormData(initialFormData);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.msg) {
                    toast.error(error.response.data.msg);
                } else {
                    toast.error('Đã xảy ra lỗi khi tạo dịch vụ!');
                }
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
        isSubmitting,
        submitError,
    };
};

export default useCreateServices;
