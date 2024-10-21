// SlotList.js
import React from 'react';
import SlotCard from '../SlotCard/SlotCard';
import styles from './SlotList.module.css';

const SlotList = ({ slots, handleViewSlot, handleBookSlot }) => {
    return (
        <div className={styles.slotList}>
            {slots.map((slotInfo, index) => (
                <SlotCard
                    key={slotInfo.slot._id}
                    slotInfo={slotInfo}
                    index={index}
                    handleViewSlot={handleViewSlot}
                    handleBookSlot={handleBookSlot}
                    
                />
            ))}
        </div>
    );
};

export default SlotList;
