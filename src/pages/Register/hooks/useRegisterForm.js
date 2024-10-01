import { useState } from 'react';

export const useRegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        email: '',
        phone_number: '',
        address: '',
    });

    const [errorMessage, setErrorMessage] = useState({
        username: '',
        name: '',
        password: '',
        email: '',
        phone_number: '',
        address: '',
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrorMessage((prev) => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        let errors = { username: '', name: '', password: '', phone_number: '' , email: '', address:'' };
        let hasError = false;

        if (formData.username.trim() === '') {
            errors.name = 'Tên tài khoản không được để trống';
            hasError = true;
        }

        if (formData.name.trim() === '') {
            errors.name = 'Tên không được để trống';
            hasError = true;
        }
        if (formData.password.trim() === '') {
            errors.password = 'Mật khẩu không được để trống';
            hasError = true;
        }
        if (formData.email.trim() === '') {
            errors.email = 'Email ko được để trống';
            hasError = true;
        }
        if (formData.phone_number.trim() === '') {
            errors.phone_number = 'Số điện thoại ko được để trống';
            hasError = true;
        }
        if (formData.address.trim() === '') {
            errors.phone_number = 'Địa chỉ ko được để trống';
            hasError = true;
        }
        setErrorMessage(errors);
        return !hasError;
    };

    return {
        formData,
        setFormData,
        errorMessage,
        handleInputChange,
        validateForm,
    };
};

export const usePasswordToggle = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return [showPassword, togglePasswordVisibility];
};
