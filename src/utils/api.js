import axios from './aixos.custiomzie';

const createAdminApi = (username, email, password) => {
    const URL_API = '/api/admins/register';
    const data = {
        username,
        email,
        password,
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

const getUserApi = () => {
    const URL_API = '/api/users';
    return axios.get(URL_API);
};

export { createAdminApi, loginAdminApi, getUserApi };
