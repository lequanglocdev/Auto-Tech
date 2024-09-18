/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from './SidebarAdmin.module.css';
import logo from '@/assets/logo.png';
import { Nav, NavDropdown } from 'react-bootstrap';

const SidebarAdmin = () => {
    return (
        <div className="">
            <div className={styles.sidebarAdminHead}>
                <img src={logo} alt="logo" className={styles.adminHeadImage} />
                <hr className="text-white" />
            </div>
            <div className={styles.listGroup}>
                <a href='#' className={`${styles.listGroupItem}`}>
                    <i>ICon</i>
                    <span>Quản lý nhân viên</span>
                </a>
                <a href='#' className={`${styles.listGroupItem}`}>
                    <i>ICon</i>
                    <span>Quản lý dịch vụ</span>
                </a>
                <a href='#' className={`${styles.listGroupItem}`}>
                    <i>ICon</i>
                    <span>Quản lý khách hang</span>
                </a>
                <a href='#' className={`${styles.listGroupItem}`}>
                    <i>ICon</i>
                    <span>Quản lý thanh toán</span>
                </a>
            </div>
        </div>
    );
};

export default SidebarAdmin;
