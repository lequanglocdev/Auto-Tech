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
            items: ['Danh sách doanh thu'],
        },
        {
            title: 'Quản lý nhân viên',
            icon: FaUser,
            items: ['Danh sách nhân viên'],
        },
        {
            title: 'Quản lý khách hàng',
            icon: FaUsers,
            items: ['Danh sách khách hàng'],
        },
        {
            title: 'Quản lý hạng của khách hàng',
            icon: FaRankingStar,
            items: ['Danh sách hạng khách hàng'],
        },
        {
            title: 'Quản lý xe ',
            icon: FaCar,
            items: ['Danh sách xe'],
        },
        {
            title: 'Quản lý lịch chăm sóc',
            icon: FaCalendarAlt,
            items: ['Danh sách cuộc hẹn', 'Tạo cuộc hẹn'],
        },
        {
            title: 'Quản lý dịch vụ',
            icon: MdHomeRepairService,
            items: ['Danh sách dịch vụ'],
        },
        {
            title: 'Quản lý chương trình khuyến mãi',
            icon: IoTicket,
            items: ['Danh sách khuyến mãi', 'Thêm mới khuyến mãi', 'Gói khuyến mãi'],
        },
        {
            title: 'Quản lý bảng giá ',
            icon: IoPricetag,
            items: ['Danh sách bảng giá', 'Thêm mới bảng giá', 'Danh sách chi tiết bảng giá'],
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
        if (item === 'Danh sách doanh thu') {
            navigate('/admin');
        }
        if (item === 'Danh sách nhân viên') {
            navigate('/employees');
        }

        if (item === 'Danh sách khách hàng') {
            navigate('/customer');
        }

        if (item === 'Danh sách hạng khách hàng') {
            navigate('/rank');
        }
        if (item === 'Thêm hạng khách hàng') {
            navigate('/rank/create');
        }

        if (item === 'Danh sách xe') {
            navigate('/car');
        }
        if (item === 'Thêm xe') {
            navigate('/car/create');
        }
        if (item === 'Danh sách cuộc hẹn') {
            navigate('/appointments/list');
        }
        if (item === 'Tạo cuộc hẹn') {
            navigate('/appointments/create');
        }
        if (item === 'Danh sách dịch vụ') {
            navigate('/service');
        }
        if (item === 'Thêm mới dịch vụ') {
            navigate('/service/create');
        }
        if (item === 'Danh sách khuyến mãi') {
            navigate('/promotion/list');
        }
        if (item === 'Thêm mới khuyến mãi') {
            navigate('/promotion/create');
        }
        if (item === 'Danh sách bảng giá') {
            navigate('/price/header');
        }
        if (item === 'Thêm mới bảng giá') {
            navigate('/price/create');
        }
        if (item === 'Danh sách chi tiết bảng giá') {
            navigate('/price/list');
        }
    };

    return (
        <div className={`${styles.sideBarAdmin} ${isVisible ? styles.visible : ''}`}>
            {menus.map((menu, index) => (
                <div className={styles.menu} key={index}>
                    <div
                        className={styles.menuHeader}
                        onClick={() => toggleMenu(index)}
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
                        {openMenuIndex === index ? (
                            <IoIosArrowDown className={styles.menuIcon} />
                        ) : (
                            <IoIosArrowForward className={styles.menuIcon} />
                        )}
                    </div>
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
                                onClick={() => handleMenuClick(item, index)} // Thêm index vào hàm handleMenuClick
                            >
                                <p className={styles.menuItemText}>{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default SidebarAdmin;
