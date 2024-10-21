import React, { useState } from 'react';
import styles from './SidebarAdmin.module.css';
import icons from '@/utils/icon';
import { useNavigate } from 'react-router-dom';

const SidebarAdmin = ({ isVisible, onSelectMenu }) => {
    const {
        IoIosArrowForward,
        IoIosArrowDown,
        MdDashboard,
        FaUser,
        FaUsers,
        FaCar,
        FaCalendarAlt,
        MdHomeRepairService,
        IoTicket,
        FaMoneyBillTrendUp,
        MdManageAccounts,
        FaRankingStar,
        IoPricetag,
    } = icons;
    const navigate = useNavigate();
    const menus = [
        {
            title: 'Tổng quan',
            icon: MdDashboard,
            path:'/admin'
        },
        {
            title: 'Quản lý nhân viên',
            icon: FaUser,
            path: '/employees'
        },
        {
            title: 'Quản lý khách hàng',
            icon: FaUsers,
            path: '/customer'
        },
        {
            title: 'Quản lý hạng của khách hàng',
            icon: FaRankingStar,
            path: '/rank'
           
        },
        {
            title: 'Quản lý hãng xe ',
            icon: FaCar,
            path: '/car'
        },
        {
            title: 'Quản lý lịch chăm sóc',
            icon: FaCalendarAlt,
            path: '/appointments/completed',
        },
        {
            title: 'Quản lý dịch vụ',
            icon: MdHomeRepairService,
            path: '/service'
        },
        {
            title: 'Quản lý chương trình khuyến mãi',
            icon: IoTicket,
            path: '/promotion'
        },
        {
            title: 'Quản lý bảng giá ',
            icon: IoPricetag,
            path: '/prices'
        },
        {
            title: 'Quản lý hóa đơn',
            icon: FaMoneyBillTrendUp,
            items: ['Chi tiết hóa đơn'],
        },
        {
            title: 'Tài khoản',
            icon: MdManageAccounts,
            items: ['Thông tin cá nhân', 'Thông tin tài khoản', 'Thêm mới tài khoản', 'Đổi mật khẩu', 'Đăng xuất'],
        },
    ];

    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    const handleMenuClick = (item, index) => {
        setSelectedMenu(index);

        if(typeof item === 'string'){
           
            // if (item === 'Danh sách chi tiết bảng giá') {
            //     navigate('/price/list');
            // }
        }else{
            if (item.path) {
                navigate(item.path);
            }
        }
        
    };

    return (
        <div className={`${styles.sideBarAdmin} ${isVisible ? styles.visible : ''}`}>
            {menus.map((menu, index) => (
                <div className={styles.menu} key={index}>
                    <div
                        className={styles.menuHeader}
                        onClick={() => (menu.items ? toggleMenu(index) : handleMenuClick(menu, index))}
                        style={{
                            color: selectedMenu === index ? '#e02f33' : '#333',
                        }}
                    >
                        <menu.icon
                            className={styles.menuIcon}
                            style={{
                                color: selectedMenu === index ? '#e02f33' : '#333',
                            }}
                        />
                        <p className={styles.menuHeaderText}>{menu.title}</p>
                        {menu.items && (
                            openMenuIndex === index ? (
                                <IoIosArrowDown className={styles.menuIcon} />
                            ) : (
                                <IoIosArrowForward className={styles.menuIcon} />
                            )
                        )}
                    </div>
                    {menu.items && (
                        <ul
                            className={`${styles.menuList} ${openMenuIndex === index ? styles.open : ''}`}
                            style={{
                                maxHeight: openMenuIndex === index ? `${menu.items.length * 40}px` : '0px',
                            }}
                        >
                            {menu.items.map((item, itemIndex) => (
                                <li
                                    className={styles.menuItem}
                                    key={itemIndex}
                                    onClick={() => handleMenuClick(item, index)}
                                >
                                    <p className={styles.menuItemText}>{item}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
    
    
};

export default SidebarAdmin;
