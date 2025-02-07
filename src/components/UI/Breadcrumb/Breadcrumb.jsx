import React from 'react';
import styles from './Breadcrumb.module.css'

const Breadcrumb = ({ items, activeItem  }) => {
    
    return (
        <div >
            {items.map((item, index) => (
                <p key={index} className={`${styles.breadcrumbText} ${item === activeItem ? styles.active : ''}`}>
                    {item}
                    {index < items.length - 1 && ' / '}
                </p>
            ))}
        </div>
    );
};

export default Breadcrumb;
