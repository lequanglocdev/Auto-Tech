import React from 'react'
import styles from './TotalCalender.module.css'
const TotalCalender = ({ onClick }) => {
  return (
    <div className={styles.dashBoardTotalCalender} onClick={onClick}>
    <div>
        <div>
            <span>TotalCalender</span>
            <span>277</span>
        </div>
        <div>
            <span>last month</span>
            <span>icon</span>
        </div>
    </div>
</div>
  )
}

export default TotalCalender
