import React from 'react'
import styles from './CreateCustomer.module.css'
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb'
const CreateCustomer = () => {
  return (
    <div>
    <div className={styles.createCustomer}>
        <Breadcrumb items={['Quản lý khách hàng', 'Thêm mới khách hàng']} activeItem="Thêm mới khách hàng" />
    </div>
</div>
  )
}

export default CreateCustomer
