import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SidebarAdmin from './SideBarAdmin/SidebarAdmin';
import styles from './AdminLayout.module.css';
import NavAdmin from './Nav/NavAdmin';
const AdminLayout = ({ children }) => {
    const isAuthenticated = true;
    const [toggle, setToggle] = useState(true);
    const handleToggle = () => {
        setToggle(!toggle);
    };
    return isAuthenticated ? (
        <div className="container-fluid bg-secondary min-vh-100">
            <div className="row">
                {toggle && (
                    <div className={`${styles.adminSidebar} col-2  vh-100 p-0`}>
                        <SidebarAdmin />
                    </div>
                )}
                <div className="col p-0">
                    <NavAdmin Toggle={handleToggle}/>
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
};

export default AdminLayout;
