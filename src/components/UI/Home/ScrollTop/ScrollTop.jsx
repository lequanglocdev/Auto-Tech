import React, { useState, useEffect } from 'react';
import './ScrollTop.css'; // Đừng quên tạo file CSS
import icons from '@/utils/icon';
const { IoIosArrowUp } = icons;
const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <div onClick={scrollToTop}>
                    <IoIosArrowUp className='scroll-icon' />
                </div>
            )}
        </div>
    );
};

export default ScrollTop;
