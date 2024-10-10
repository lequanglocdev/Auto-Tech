import React from 'react';
import styles from './CustomPagination.module.css';

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null;

    const handlePageClick = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.pageButton}
                onClick={() => handlePageClick(1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            <button
                className={styles.pageButton}
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    className={`${styles.pageButton} ${
                        currentPage === index + 1 ? styles.active : ''
                    }`}
                    onClick={() => handlePageClick(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button
                className={styles.pageButton}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
            <button
                className={styles.pageButton}
                onClick={() => handlePageClick(totalPages)}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </div>
    );
};

export default CustomPagination;
