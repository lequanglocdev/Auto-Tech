import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import NavAdmin from './Nav/NavAdmin';
import SidebarAdmin from './SideBarAdmin/SidebarAdmin';
import { AuthContext } from '@/components/context/auth.context';
const AdminLayout = ({ children }) => {
    const { auth } = useContext(AuthContext); 
    const isAuthenticated = auth.user?.role === "admin" || auth.user?.role === "employee";
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
