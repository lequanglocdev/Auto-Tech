import Home from '@/pages/Home/Home';
import Auth from '@/pages/Auth/Auth';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Otp from '@/pages/OTP/Otp';
import CareServices from '@/pages/CareServices/CareServices';
import ServicesDetail from '@/components/UI/ServicesDetail/ServicesDetail';
import Intro from '@/pages/Intro/Intro';
import Blogs from '@/pages/Blogs/Blogs';

import Dashboard from '@/pageAdmin/Dashboard/Dashboard';
import { CreateCustomer, ListsCustomer } from '@/pageAdmin/Customer/index';
import { CreateEmployees, ListsEmployees } from '@/pageAdmin/Employees/index';
import { CreateCar, ListsCar } from '@/pageAdmin/Car/index';
import { CreateService, ListsService } from '@/pageAdmin/Servicess/index';
import { CreatePromotion, ListsPromotion } from '@/pageAdmin/Promotions/index';
import { CreateRank, ListsRank } from '@/pageAdmin/Rank/index';
import { CreatePrice, ListsPrice, ListDetailPrice } from '@/pageAdmin/Price/index';
import { CreateAppointment, ListAppointment } from '@/pageAdmin/Appointment/index';
import TotalCalender from '@/components/UI/Dashboard/TotalCalender/TotalCalender';
import CustomerDetailPage from '@/pageAdmin/CustomerDetail/CustomerDetailPage';
import PriceDetail from '@/pageAdmin/PriceDetail/PriceDetailPage';
import PriceDetailPage from '@/pageAdmin/PriceDetail/PriceDetailPage';
import EmployeesDetail from '@/pageAdmin/EmployeesDetail/EmployeesDetail';

export const publicRoute = [
    { path: '/', component: Home },
    { path: '/auth', component: Auth, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/otp', component: Otp, layout: null },
    { path: '/services', component: CareServices },
    { path: '/services/:serviceId', component: ServicesDetail },
    { path: '/intro', component: Intro },
    { path: '/blog', component: Blogs },
];

export const privateRoute = [
    { path: '/admin', component: Dashboard },

    { path: '/employees', component: ListsEmployees },
    { path: '/addEmployy', component: CreateEmployees },
    { path: '/employess/:id', component: EmployeesDetail },

    { path: '/customer/', component: ListsCustomer },
    { path: '/addCustomer', component: CreateCustomer },
    { path: '/customer/:id', component: CustomerDetailPage },
    
    { path: '/rank', component: ListsRank },
    { path: '/addRank', component: CreateRank },
    
    { path: '/car', component: ListsCar },
    { path: '/addCar', component: CreateCar },
    
    { path: '/service', component: ListsService },
    { path: '/addService', component: CreateService },

    { path: '/prices', component: ListsPrice },
    { path: '/addPrices', component: CreatePrice },
    { path: '/price-detail/:priceId', component: PriceDetailPage },
    
    { path: '/promotion', component: ListsPromotion },
    { path: '/addPromotion', component: CreatePromotion },
   

 
    
    { path: '/appointments/list', component: ListAppointment },
    { path: '/appointments/create', component: CreateAppointment },
    { path: '/price/list', component: ListDetailPrice },
    
    { path: '/calendar/:id', component: TotalCalender },
];
