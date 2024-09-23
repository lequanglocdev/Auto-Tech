import React from 'react';

const Breadcrumb = ({ items }) => {
    return (
        <div >
            {items.map((item, index) => (
                <span key={index}>
                    {item}
                    {index < items.length - 1 && ' > '}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumb;
