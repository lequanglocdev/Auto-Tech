import { useState } from 'react';

export const useLoginForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmpassword: '',
        email: '',
        phone: '',
    });

    const [errorMessage, setErrorMessage] = useState({
        name: '',
        password: '',
        confirmpassword: '',
        email: '',
        phone: '',
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrorMessage((prev) => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        let errors = { name: '', password: '', phone: '' };
        let hasError = false;
        
        if (formData.password.trim() === '') {
            errors.password = 'Mật khẩu không được để trống';
            hasError = true;
        }
        if (formData.email.trim() === '') {
            errors.email = 'Email ko được để trống';
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
        setShowPassword(prevState => !prevState);
    };

    return [showPassword, togglePasswordVisibility];
};
