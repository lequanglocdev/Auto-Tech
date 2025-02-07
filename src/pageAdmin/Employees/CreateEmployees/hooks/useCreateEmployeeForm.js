import { registerManagerApi, verifyOtpApi } from '@/utils/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useCreateEmployeeForm = () => {
    const [formData, setFormData] = useState({
        employeeCode: '',
        email: '',
        employeeName: '',
        password: '',
        phone: '',
        role: 'manager',
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
        if (!formData.employeeCode) newErrors.employeeCode = 'Bạn chưa nhập mã nhân viên';
        if (!formData.employeeName) newErrors.employeeName = 'Bạn chưa nhập tên nhân viên';
        if (!formData.password) newErrors.password = 'Bạn chưa nhập mật khẩu';
        if (!formData.email) newErrors.email = 'Bạn chưa nhập email';
        if (!formData.phone) newErrors.phone = 'Bạn chưa nhập số điện thoại';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setSubmitError('');
            console.log('Dữ liệu gửi', JSON.stringify(formData, null, 2));
            try {
                await registerManagerApi(
                    formData.employeeCode,
                    formData.email,
                    formData.employeeName,
                    formData.password,
                    formData.phone,
                    formData.role,
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
                    setSubmitError("Đã xảy ra lỗi không xác định.");
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

export default useCreateEmployeeForm;
