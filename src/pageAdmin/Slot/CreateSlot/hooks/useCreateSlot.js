import { createSlot } from '@/utils/api'; // Giả sử hàm này là hàm axios được sử dụng để tạo slot
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useCreateSlot = () => {
    const initialFormData = {
        slotDatetime: '',
        durationMinutes: '',
        status: '', // Đặt giá trị mặc định là 'available'
        capacity: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Cập nhật giá trị cho formData
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        
        setSubmitError('');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.slotDatetime) newErrors.slotDatetime = 'Bạn chưa nhập thời gian và ngày.';
        if (!formData.durationMinutes) newErrors.durationMinutes = 'Bạn chưa nhập thời lượng.';
        if (!formData.capacity) newErrors.capacity = 'Bạn chưa nhập số lượng.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setSubmitError('');
            try {
                await createSlot(formData.slotDatetime, formData.durationMinutes, formData.status, formData.capacity);
                toast.success('Slot đã được tạo thành công!');
                setFormData(initialFormData);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.msg) {
                    toast.error(error.response.data.msg);
                } else {
                    toast.error('Đã xảy ra lỗi khi tạo slot!');
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

export default useCreateSlot;
