import React from 'react';
import PropTypes from 'prop-types';
import styles from './CommonButton.module.css';

const CommonButton = ({ onClick, icon: Icon, label, className }) => {
    return (
        <button className={`${styles.commonButton} ${className}`} onClick={onClick}>
            {Icon && <Icon style={{ fontSize: 16, marginRight: 8 }} />}
            {label}
        </button>
    );
};

CommonButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.elementType,
    label: PropTypes.string,
    className: PropTypes.string,
};

CommonButton.defaultProps = {
    icon: null,
    label: '',
    className: '',
};

export default CommonButton;
