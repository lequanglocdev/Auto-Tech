import { useState } from 'react';

export const useOTP = () => {
    const [formData, setFormData] = useState({
        email:'',
        otp:''
    });

    const [errorMessage, setErrorMessage] = useState({
        email:'',
        otp:''
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrorMessage((prev) => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        let errors = {email:'', otp:''};
        let hasError = false;
        
        if (formData.email.trim() === '') {
            errors.email = 'Email ko được để trống';
            hasError = true;
        }
        if (formData.otp.trim() === '') {
            errors.otp = 'Otp không được để trống';
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
