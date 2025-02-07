// import React, { useState, useEffect } from 'react';
// import { Form } from 'react-bootstrap';
// import styles from './CalendarSearch.module.css';
// import { createAppointmentCustomer, getAppointmentsforDate } from '@/utils/api';
// import {toast } from 'react-toastify';
// import { formatDateTime } from '@/utils/dateTime';
// import CommonButton from '@/components/UI/CommonButton/CommonButton ';

// const CalendarSearch = ({ bookedSlots, fetchAppointments }) => {
//     const [updatedBookedSlots, setUpdatedBookedSlots] = useState(bookedSlots); 
//     const [searchDate, setSearchDate] = useState('');

//     useEffect(() => {
//         console.log('Received booked slots:', bookedSlots);
//         setUpdatedBookedSlots(bookedSlots);
//     }, [bookedSlots]);

//     const handleConfirmCustomer = async (appointment) => {
//         const id = appointment._id;
//         try {
//             await createAppointmentCustomer(id);
//             toast.success('Xác nhận khách hàng thành công!');

//             const updatedSlots = updatedBookedSlots.filter((slotInfo) => slotInfo.appointments[0]._id !== id);
//             setUpdatedBookedSlots(updatedSlots);
//             await fetchAppointments(); 
//         } catch (error) {
//             toast.error('Đã xảy ra lỗi khi xác nhận khách hàng.');
//             console.error('Lỗi:', error);
//         }
//     };

//     const hanleCancelCustomer = async () => {
//         alert('Hủy lịch khách hàng');
//     };

//     const handleSearch = async () => {
//         try {
//             if (searchDate) {
//                 const response = await getAppointmentsforDate(searchDate);
//                 console.log('API response:', response); 

//                 if (Array.isArray(response)) {
//                     setUpdatedBookedSlots(response);
//                     console.log('Updated booked slots after search:', response); 
//                 } else if (typeof response === 'object' && response !== null) {
//                     setUpdatedBookedSlots([response]);
//                     console.log('Updated booked slots after search (single object):', [response]); 
//                 } else {
//                     toast.error('Dữ liệu không hợp lệ từ API.');
//                 }
//             } else {
//                 setUpdatedBookedSlots(bookedSlots);
//             }
//         } catch (error) {
//             toast.error('Đã xảy ra lỗi khi tìm kiếm lịch hẹn.');
//             console.error('Lỗi:', error);
//         }
//     };

//     return (
//         <div className={styles.calendarSearch}>
//             <div className={styles.calendar}>
//                 <Form.Group className={styles.calendarForm}>
//                     <Form.Control
//                         size="lg"
//                         type="date"
//                         value={searchDate}
//                         onChange={(e) => setSearchDate(e.target.value)}
//                     />
//                 </Form.Group>
//                 <CommonButton label="Tìm" onClick={handleSearch} />
//             </div>
//             <div className={styles.bookedSlots}>
//                 {updatedBookedSlots.length > 0 ? (
//                     updatedBookedSlots.map((slotInfo, index) => {
//                         console.log('Key (slotInfo._id):', slotInfo); 
//                         return (
//                             <div key={slotInfo._id} className={styles.bookedSlot}>
//                                 <div className={styles.slotCardHeader}>
//                                     <p className={styles.slotCardHeaderTextLeft}>Khu vực chăm sóc số {index + 1}</p>
//                                     <p className={styles.availableStatus}>{slotInfo?.status}</p>
//                                 </div>
//                                 <div className={styles.slotCardBody}>
//                                     <p className={styles.slotCardBodyText}>
//                                         <strong>Tên:</strong> {slotInfo?.customer_id?.name}
//                                     </p>
//                                     <p className={styles.slotCardBodyText}>
//                                         <strong>Email:</strong> {slotInfo?.customer_id?.email}
//                                     </p>
//                                     <p className={styles.slotCardBodyText}>
//                                         <strong>Biển số xe:</strong> {slotInfo?.vehicle_id?.license_plate}
//                                     </p>
//                                     <p className={styles.slotCardBodyText}>
//                                         <strong>Thời gian:</strong> {formatDateTime(slotInfo?.slot_id?.slot_datetime)}
//                                     </p>
//                                 </div>
//                                 <div className={styles.slotCardFooter}>
//                                     <div
//                                         className={styles.slotCardFooterCompleted}
//                                         onClick={() => handleConfirmCustomer(slotInfo)}
//                                     >
//                                         <span>Xác nhận</span>
//                                     </div>
//                                     <div className={styles.slotCardFooterDelete} onClick={hanleCancelCustomer}>
//                                         <span>Huỷ</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 ) : (
//                     <p>Không có lịch hẹn nào</p>
//                 )}
//             </div>

        
//         </div>
//     );
// };

// export default CalendarSearch;
