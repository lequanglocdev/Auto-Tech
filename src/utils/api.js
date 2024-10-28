import axios from './aixos.custiomzie';

const registerAdminApi = (username, email, password) => {
    const URL_API = '/api/admins/register';
    const data = {
        username,
        email,
        password,
    };
    console.log('Sending data:', data);
    return axios.post(URL_API, data);
};

const registerManagerApi = (username, password, email, name, phone_number, roleEmployee) => {
    const URL_API = '/api/employees/register';
    const data = {
        username,
        email,
        name,
        password,
        phone_number,
        roleEmployee,
    };
    // console.log('Sending data:', data);
    return axios.post(URL_API, data);
};

const registerCustomerApi = (username, password, email, name, address, phone_number) => {
    const URL_API = '/api/users/register';
    const data = {
        username,
        password,
        email,
        name,
        address,
        phone_number,
    };
    console.log('Sending data:', data);
    return axios.post(URL_API, data);
};

const loginAdminApi = (email, password) => {
    const URL_API = '/api/auth/loginAdmin';
    const data = {
        email,
        password,
    };
    return axios.post(URL_API, data);
};

const loginManagerApi = (email, password) => {
    const URL_API = '/api/auth/loginEmployee';
    const data = {
        email,
        password,
    };
    return axios.post(URL_API, data);
};

const loginCustomerApi = (email, password) => {
    const URL_API = '/api/auth/loginCustomer';
    const data = {
        email,
        password,
    };
    return axios.post(URL_API, data);
};

const verifyOtpApi = (email, otp) => {
    const URL_API = '/api/users/activate';
    const data = {
        email,
        otp,
    };
    return axios.post(URL_API, data);
};

const getUserApi = () => {
    const URL_API = '/api/users';
    return axios.get(URL_API);
};

const geEmployeesApi = () => {
    const URL_API = '/api/employees';
    return axios.get(URL_API);
};

const getRankApi = () => {
    const URL_API = '/api/customers-rank';
    return axios.get(URL_API);
};

const getCarApi = () => {
    const URL_API = '/api/vehicle-types';
    return axios.get(URL_API);
};

const getServicesApi = () => {
    const URL_API = '/api/services';
    return axios.get(URL_API);
};

const getDetailUser = (user) => {
    const URL_API = `/api/users/${user._id}`;
    return axios.get(URL_API);
};

const getDetailEmployee = (user) => {
    const URL_API = `/api/employees/${user._id}`;
    return axios.get(URL_API);
};

const getDetailRank = (rank) => {
    const URL_API = `/api/customers-rank/${rank._id}`;
    return axios.get(URL_API);
};

const getDetailServices = (services) => {
    const URL_API = `/api/services/${services._id}`;
    return axios.get(URL_API);
};

const getPriceApi = () => {
    const URL_API = '/api/prices';
    return axios.get(URL_API);
};

const getDetailPrice = (price) => {
    const URL_API = `/api/prices/${price._id}/lines`;
    return axios.get(URL_API);
};

const getPromotionApi = () => {
    const URL_API = '/api/promotions';
    return axios.get(URL_API);
};

const getPromotionDetaiLinelApi = (promotion) => {
    const URL_API = `/api/promotions/${promotion._id}/lines`;
    return axios.get(URL_API);
};

const getPromotionDetaiApi = (promotion) => {
    const URL_API = `/api/promotions/line/details/${promotion._id}`;
    return axios.get(URL_API);
};


const getPromotionDetaiHeaderLineDetailApi = (promotionId) => {
    const URL_API = `/api/promotions/${promotionId}/details`;
    return axios.get(URL_API);
};
const getSlot = () => {
    const URL_API = '/api/slots';
    return axios.get(URL_API);
};

const getAppointmentsforDate = (date) => {
    const URL_API = `/api/appointments?date=${date}`;
    return axios.get(URL_API);
};

const getAppointmentsDetailApi = (appointment) => {
    const URL_API = `/api/appointments/${appointment._id}`;
    return axios.get(URL_API);
};

const getSlotDetailApi = (slot) => {
    const URL_API = `/api/slots/${slot._id}`;
    return axios.get(URL_API);
};

const getPriceForService = (serviceName = '', vehicleTypeName = '') => {
    const URL_API = `/api/prices/filterprice?serviceName=${serviceName}&vehicleTypeName=${vehicleTypeName}`;
    return axios.get(URL_API);
};

const getAppointmentCompleted = () => {
    const URL_API = '/api/appointments/get/completed';
    return axios.get(URL_API);
};

const getInfoInvoiceCompleted = (appointmentId) => {
    const URL_API = `/api/payments/invoice/${appointmentId}`;
    return axios.get(URL_API);
};

const getInvoiceDetails = (invoiceId) => {
    const URL_API = `/api/payments/invoice/${invoiceId}`;
    return axios.get(URL_API);
};

const getAppointmentWithoutSlot = () => {
    const URL_API = `/api/appointments/get/without-slot`;
    return axios.get(URL_API);
};

const deleteUserApi = (user) => {
    const URL_API = `/api/users/${user._id}`;
    return axios.delete(URL_API);
};

const deleteRankApi = (rank) => {
    const URL_API = `/api/customers-rank/${rank._id}`;
    return axios.delete(URL_API);
};

const deleteEmployeeApi = (user) => {
    const URL_API = `/api/employees/${user._id}`;
    return axios.delete(URL_API);
};

const deleteCarApi = (car) => {
    const URL_API = `/api/vehicle-types/${car._id}`;
    return axios.delete(URL_API);
};

const deleteServiceApi = (service) => {
    const URL_API = `/api/services/${service._id}`;
    return axios.delete(URL_API);
};

const deletePriceApi = (price) => {
    const URL_API = `/api/prices/${price._id}`;
    return axios.delete(URL_API);
};

const deleteVehicleForCustomer = (userId, vehicleId) => {
    const URL_API = `/api/vehicles/${userId}/vehicles/${vehicleId}`;
    return axios.delete(URL_API);
};

const deleteSlotApi = (slot) => {
    const URL_API = `/api/slots/${slot._id}`;
    return axios.delete(URL_API);
};

const deletePromotionApi = (promotion) => {
    const URL_API = `/api/promotions/lines/${promotion}`;
    return axios.delete(URL_API);
};

const deletePromotionHeaderApi = (promotion) => {
    const URL_API = `/api/promotions/${promotion}`;
    return axios.delete(URL_API);
};

const deletePromotionDetailApi = (promotion) => {
    const URL_API = `/api/promotions/details/${promotion}`;
    return axios.delete(URL_API);
};

const deletePriceDetailApi = (price) => {
    const URL_API = `/api/prices/lines/${price._id}`;
    return axios.delete(URL_API);
};

const createCarApi = (vehicleTypeName, description) => {
    const URL_API = '/api/vehicle-types';
    const data = {
        vehicle_type_name: vehicleTypeName,
        description,
    };
    return axios.post(URL_API, data);
};

const createServicesApi = (serviceCode, name, description, timeRequired) => {
    const URL_API = '/api/services';
    const data = {
        service_code: serviceCode,
        name,
        description,
        time_required: timeRequired,
    };
    return axios.post(URL_API, data);
};

const createRankApi = (rankName, discountRate, minSpending, description) => {
    const URL_API = '/api/customers-rank';
    const data = {
        rank_name: rankName,
        discount_rate: discountRate,
        min_spending: minSpending,
        description: description,
    };
    return axios.post(URL_API, data);
};

const createVehicleApi = (customerId, newVehicle) => {
    const URL_API = `/api/vehicles/${customerId}/vehicles`;
    const data = {
        vehicle_type_id: newVehicle.vehicle_type_id,
        license_plate: newVehicle.license_plate,
        manufacturer: newVehicle.manufacturer,
        model: newVehicle.model,
        year: newVehicle.year,
        color: newVehicle.color,
    };
    return axios.post(URL_API, data);
};

const createPriceApi = (priceListName, startDate, endDate) => {
    const URL_API = '/api/prices';
    const data = {
        price_list_name: priceListName,
        start_date: startDate,
        end_date: endDate,
    };
    return axios.post(URL_API, data);
};

const createPriceLineApi = (priceId, serviceId, vehicleTypeId, price) => {
    const URL_API = `/api/prices/${priceId}/lines`;
    const data = {
        service_id: serviceId,
        vehicle_type_id: vehicleTypeId,
        price: price,
    };

    return axios.post(URL_API, data);
};

const createPromotions = (promotionCode, name, description, startDate, endDate) => {
    const URL_API = `/api/promotions`;
    const data = {
        promotion_code: promotionCode,
        name: name,
        description: description,
        start_date: startDate,
        end_date: endDate,
    };

    return axios.post(URL_API, data);
};

const createPromotionLine = (promotionId, discountType, description, startDate, endDate) => {
    const URL_API = `/api/promotions/${promotionId}/lines`;
    const data = {
        promotionId: promotionId,
        discount_type: discountType,
        description: description,
        start_date: startDate,
        end_date: endDate,
    };

    return axios.post(URL_API, data);
};

const createPromotionDetail = (
    promotionId,
    vehicleTypeId,
    serviceId,
    applicableRankId,
    discountValue,
    minOrderValue,
) => {
    const URL_API = `/api/promotions/lines/${promotionId}/details`;
    const data = {
        promotionId: promotionId,
        vehicle_type_id: vehicleTypeId,
        service_id: serviceId,
        applicable_rank_id: applicableRankId,
        discount_value: discountValue,
        min_order_value: minOrderValue,
    };

    return axios.post(URL_API, data);
};
const createAppointments = (slotId, vehicleId, serviceIds, appointmentDatetime,sumTime) => {
    const URL_API = `/api/appointments`;
    const data = {
        slot_id: slotId,
        vehicle_id: vehicleId,
        service_ids: serviceIds,
        appointment_datetime: appointmentDatetime,
        sumTime:sumTime
    };

    return axios.post(URL_API, data);
};

const createAppointmentsWithoutSlot = (vehicleId, serviceIds, appointmentDatetime) => {
    const URL_API = `/api/appointments/without-slot`;
    const data = {
        vehicle_id: vehicleId,
        service_ids: serviceIds,
        appointment_datetime: appointmentDatetime,
    };

    return axios.post(URL_API, data);
};

const createSlot = (slotDatetime, durationMinutes, status, capacity) => {
    const URL_API = `/api/slots`;
    const data = {
        slot_datetime: slotDatetime,
        duration_minutes: durationMinutes,
        status: status,
        capacity: capacity,
    };

    return axios.post(URL_API, data);
};

const createAppointmentCustomer = (appointmentId) => {
    const URL_API = `/api/appointments/${appointmentId}/arrive`;
    return axios.post(URL_API);
};

const createPaymentCustomer = (appointmentId, employeesId) => {
    const URL_API = `/api/payments/generate-invoice/${appointmentId}/employee/${employeesId}`;
    const data = {
        employeesId: employeesId,
    };
    return axios.post(URL_API, data);
};

const createPayment = (invoiceId) =>{
    const URL_API = `/api/payments/create-payment-link/${invoiceId}`
    const data = {
        invoiceId: invoiceId,
    };
    return axios.post(URL_API, data);
}

const putEmployeeApi = (user) => {
    const URL_API = `/api/employees/${user._id}`;
    return axios.put(URL_API, user);
};

const putCustomerApi = (user) => {
    const URL_API = `/api/users/${user._id}`;
    return axios.put(URL_API, user);
};

const putCustomerRankApi = (rank) => {
    const URL_API = `/api/customers-rank/${rank._id}`;
    return axios.put(URL_API, rank);
};

const putCarApi = (car) => {
    const URL_API = `/api/vehicle-types/${car._id}`;
    return axios.put(URL_API, car);
};

const putServiceApi = (service) => {
    const URL_API = `/api/services/${service._id}`;
    return axios.put(URL_API, service);
};

const putVehicleForCustomer = (userId, vehicleId, vehicleData) => {
    const URL_API = `/api/vehicles/${userId}/vehicles/${vehicleId}`;
    return axios.put(URL_API, vehicleData);
};

const putPromotionHeader = (promotion) => {
    const URL_API = `/api/promotions/${promotion._id}`;
    return axios.put(URL_API, promotion);
};

const putPromotionLine = (promotion) => {
    const URL_API = `/api/promotions/lines/${promotion._id}`;
    return axios.put(URL_API, promotion);
};

const putPromotionDetail =(promotion) =>{
    const URL_API = `/api/promotions/details/${promotion._id}`;
    return axios.put(URL_API, promotion);
}

const putActivePromotion = (promotion) => {
    const URL_API = `/api/promotions/${promotion._id}/toggle-active`;
    return axios.put(URL_API, promotion);
};

const putActivePromotionHeader = (promotion, isActive) => {
    const URL_API = `/api/promotions/${promotion}`;
    return axios.put(URL_API, { is_active: isActive });
};

const putActivePromotionLine = (promotion, isActive) => {
    const URL_API = `/api/promotions/lines/${promotion}`;
    return axios.put(URL_API, { is_active: isActive });
};

const putActivePromotionDetail = (promotion, isActive) => {
    const URL_API = `/api/promotions/details/${promotion}`;
    return axios.put(URL_API, { is_active: isActive });
};


const putPriceApi = (price) => {
    const URL_API = `/api/prices/${price._id}`;
    return axios.put(URL_API, price);
};

const putActivePriceApi = (priceId, isActive) => {
    const URL_API = `/api/prices/${priceId}`;
    return axios.put(URL_API, { is_active: isActive });
};

const putActivePriceDetailApi = (priceId, isActive) => {
    const URL_API = `/api/prices/lines/${priceId}`;
    return axios.put(URL_API, { is_active: isActive });
};

const putPriceDetailApi = (price) => {
    const URL_API = `/api/prices/lines/${price._id}`;
    return axios.put(URL_API, price);
};

const findCustomerApi = (query) => {
    const URL_API = `/api/users/find?${query}`;
    return axios.get(URL_API);
};

export {
    registerAdminApi,
    loginAdminApi,
    registerManagerApi,
    registerCustomerApi,
    loginCustomerApi,
    loginManagerApi,
    getUserApi,
    getDetailUser,
    geEmployeesApi,
    getDetailEmployee,
    getRankApi,
    getDetailRank,
    getCarApi,
    getServicesApi,
    getDetailServices,
    getPriceApi,
    getDetailPrice,
    getPromotionApi,
    getPromotionDetaiLinelApi,
    getPromotionDetaiApi,
    getSlot,
    getAppointmentsforDate,
    getAppointmentsDetailApi,
    getSlotDetailApi,
    getPriceForService,
    getPromotionDetaiHeaderLineDetailApi,
    getAppointmentCompleted,
    getInfoInvoiceCompleted,
    getInvoiceDetails,
    getAppointmentWithoutSlot,
    deleteUserApi,
    deleteEmployeeApi,
    deleteRankApi,
    deleteCarApi,
    deleteServiceApi,
    deletePriceApi,
    deleteVehicleForCustomer,
    deleteSlotApi,
    deletePromotionApi,
    deletePromotionHeaderApi,
    deletePriceDetailApi,
    deletePromotionDetailApi,
    verifyOtpApi,
    createCarApi,
    createServicesApi,
    createRankApi,
    createVehicleApi,
    createPriceApi,
    createPriceLineApi,
    createPromotions,
    createPromotionLine,
    createPromotionDetail,
    createAppointments,
    createSlot,
    createAppointmentCustomer,
    createAppointmentsWithoutSlot,
    createPaymentCustomer,
    createPayment,
    putEmployeeApi,
    putCustomerApi,
    putCustomerRankApi,
    putCarApi,
    putServiceApi,
    putVehicleForCustomer,
    putPromotionHeader,
    putPromotionLine,
    putPromotionDetail,
    putActivePromotion,
    putPriceApi,
    putPriceDetailApi,
    putActivePriceApi,
    putActivePriceDetailApi,
    putActivePromotionHeader,
    putActivePromotionLine,
    putActivePromotionDetail,
    findCustomerApi,
};
