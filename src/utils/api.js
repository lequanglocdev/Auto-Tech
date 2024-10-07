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

const deleteEmployeeApi = (user) => {
    const URL_API = `/api/employees/${user._id}`;
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

const putEmployeeApi = (user) => {
    const URL_API = `/api/employees/${user._id}`;
    return axios.put(URL_API);
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
    getRankApi,
    getDetailRank,
    getCarApi,
    getServicesApi,
    getDetailServices,
    verifyOtpApi,
    createCarApi,
    putEmployeeApi
};
