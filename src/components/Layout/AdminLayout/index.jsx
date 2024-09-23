import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import NavAdmin from './Nav/NavAdmin';
import SidebarAdmin from './SideBarAdmin/SidebarAdmin';
const AdminLayout = ({ children }) => {
    const isAuthenticated = true;
    const [toggle, setToggle] = useState(true);
    const handleToggle = () => {
        setToggle(!toggle);
    };
    return isAuthenticated ? (
        <div className={styles.adminWrapper}>
            <NavAdmin Toggle={handleToggle} />
            <SidebarAdmin isVisible={toggle} />
            <div className={`${styles.content} ${toggle ? styles.withSidebar : styles.fullContent}`}>
                    {children}
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
};

export default AdminLayout;
