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
        roleEmployee
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
const createCarApi = (vehicleTypeName, description) => {
    const URL_API = '/api/vehicle-types';
    const data = {
        vehicle_type_name:vehicleTypeName,
        description,
    };
    return axios.post(URL_API, data);
};

const createServicesApi = (serviceCode, name, description) => {
    const URL_API = '/api/services';
    const data = {
        service_code: serviceCode,
        name,
        description
    };
    return axios.post(URL_API, data);
};

const createRankApi = (rankName, discountRate, minSpending, description) => {
    const URL_API = '/api/customers-rank';
    const data = {
        rank_name: rankName,
        discount_rate: discountRate,
        min_spending: minSpending,
        description:description
    };
    return axios.post(URL_API, data);
};

const createVehicleApi = (customerId, newVehicle) => {
    const URL_API = `/api/vehicles/${customerId}`;
    const data = {
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
        end_date: endDate
    };
    return axios.post(URL_API, data);
};

const putEmployeeApi = (user) => {
    const URL_API = `/api/employees/${user._id}`;
    return axios.put(URL_API,user);
};

const putCustomerApi = (user) => {
    const URL_API = `/api/users/${user._id}`;
    return axios.put(URL_API,user);
};

const putCustomerRankApi = (rank) => {
    const URL_API = `/api/customers-rank/${rank._id}`;
    return axios.put(URL_API,rank);
};

const putCarApi = (car) => {
    const URL_API = `/api/vehicle-types/${car._id}`;
    return axios.put(URL_API,car);
};

const putServiceApi = (service) => {
    const URL_API = `/api/services/${service._id}`;
    return axios.put(URL_API,service);
};

export {
    registerAdminApi,
    loginAdminApi,
    getUserApi,
    registerManagerApi,
    registerCustomerApi,
    loginCustomerApi,
    loginManagerApi,
    deleteUserApi,
    getDetailUser,
    geEmployeesApi,
    getDetailEmployee,
    deleteEmployeeApi,
    deleteRankApi,
    deleteCarApi,
    deleteServiceApi,
    getRankApi,
    getDetailRank,
    getCarApi,
    getServicesApi,
    getDetailServices,
    verifyOtpApi,
    createCarApi,
    createServicesApi,
    createRankApi,
    createVehicleApi,
    createPriceApi,
    putEmployeeApi,
    putCustomerApi,
    putCustomerRankApi,
    putCarApi,
    putServiceApi
};
