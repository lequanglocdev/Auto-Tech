import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import NavAdmin from './Nav/NavAdmin';
const AdminLayout = ({ children }) => {
    const isAuthenticated = true;
    const [toggle, setToggle] = useState(true);
    const handleToggle = () => {
        setToggle(!toggle);
    };
    return isAuthenticated ? (
        <div className={styles.adminWrapper}>
            <NavAdmin Toggle={handleToggle} />
            <div className={styles.contentWrapper}>
                {React.cloneElement(children, { toggle, handleToggle })}
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
};

export default AdminLayout;
