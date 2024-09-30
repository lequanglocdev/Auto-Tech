import React from 'react';
import styles from './Breadcrumb.module.css'
const Breadcrumb = ({ items }) => {
    return (
        <div >
            {items.map((item, index) => (
                <p key={index} className={styles.breadcrumbText}>
                    {item}
                    {index < items.length - 1 && ' > '}
                </p>
            ))}
        </div>
    );
};

export default Breadcrumb;
