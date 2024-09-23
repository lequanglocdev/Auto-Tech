import React, { useState } from 'react';
import icons from '@/utils/icon';
import styles from './NavAdmin.module.css';
import logo from '@/assets/logoAdmin.png';
import Avartar from '@/components/UI/Avatar/Avartar';
import { useNavigate } from 'react-router-dom';
const NavAdmin = ({ Toggle }) => {
    const {HiMiniBars3CenterLeft, HiMiniBars3 } = icons;
    const naviagte = useNavigate()
    const [isToggled, setIsToggled] = useState(false);
    const handleToggle = () => {
        setIsToggled(!isToggled);
        Toggle(); 
    };
    const handlePageAdmin = () =>{
        naviagte('/admin')
    }
    return (
        <div className={styles.navAdmin}>
            <div className={styles.navAdminLeft} onClick={handlePageAdmin}>
                <img src={logo} alt="loggo" className={styles.navAdminImage} />
            </div>
            <div className={styles.navAdminCenter}>
                {isToggled ? (
                    <HiMiniBars3 onClick={handleToggle} className={`${styles.navAdminIcon} ${styles.iconActive}`} />
                ) : (
                    <HiMiniBars3CenterLeft onClick={handleToggle} className={styles.navAdminIcon} />
                )}
            </div>
            <div className={styles.navAdminRight}>
                <Avartar />
            </div>
        </div>
    );
};

export default NavAdmin;
