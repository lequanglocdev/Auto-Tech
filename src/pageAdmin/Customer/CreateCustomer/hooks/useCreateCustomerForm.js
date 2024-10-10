import { registerCustomerApi, verifyOtpApi } from '@/utils/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useCreateCustomerForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        email: '',
        phone: '',
        address:''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setSubmitError('');
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Bạn chưa nhập mã nhân viên';
        if (!formData.name) newErrors.name = 'Bạn chưa nhập tên nhân viên';
        if (!formData.password) newErrors.password = 'Bạn chưa nhập mật khẩu';
        if (!formData.email) newErrors.email = 'Bạn chưa nhập email';
        if (!formData.phone) newErrors.phone = 'Bạn chưa nhập số điện thoại';
        if (!formData.address) newErrors.address = 'Bạn chưa nhập địa chỉ';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setSubmitError('');
            try {
                await registerCustomerApi(
                    formData.username,
                    formData.password,
                    formData.email,
                    formData.name,
                    formData.address,
                    formData.phone,
                );
                setShowOtpModal(true);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.msg) {
                    setSubmitError(error.response.data.msg);
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: error.response.data.msg,
                    }));
                } else {
                    setSubmitError("Đã xảy ra lỗi không xác định.!!!!");
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: "Đã xảy ra lỗi không xác định.",
                    }));
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleOtpSubmit = async () => {
        try {
            await verifyOtpApi(formData.email, otp);
            toast.success('Xác thực OTP thành công!');
            setShowOtpModal(false);
        } catch (error) {
            toast.error('Xác thực OTP thất bại. Vui lòng thử lại!');
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
        setShowOtpModal,
        otp,
        handleOtpChange,
        handleOtpSubmit,
    };
};

export default useCreateCustomerForm;
