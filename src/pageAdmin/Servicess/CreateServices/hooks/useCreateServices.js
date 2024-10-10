import { createServicesApi } from '@/utils/api';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useCreateServices = () => {
    const [formData, setFormData] = useState({
        serviceCode: '',
        name: '',
        description: '',
    });

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
        if (!formData.serviceCode) newErrors.serviceCode = 'Bạn chưa nhập mã nhân viên';
        if (!formData.name) newErrors.name = 'Bạn chưa nhập tên nhân viên';
        if (!formData.description) newErrors.description = 'Bạn chưa nhập mật khẩu';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setSubmitError('');
            try {
                await createServicesApi(
                    formData.serviceCode,
                    formData.name,
                    formData.description,
                );
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
        isSubmitting,
        submitError,
    };
};

export default useCreateServices;
