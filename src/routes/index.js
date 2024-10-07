
import Home from "@/pages/Home/Home"
import Auth from "@/pages/Auth/Auth"
import Login from "@/pages/Login/Login"
import Register from "@/pages/Register/Register"
import Otp from "@/pages/OTP/Otp"
import CareServices from "@/pages/CareServices/CareServices"
import ServicesDetail from "@/components/UI/ServicesDetail/ServicesDetail"
import Intro from "@/pages/Intro/Intro"
import Blogs from "@/pages/Blogs/Blogs"

import Dashboard from "@/pageAdmin/Dashboard/Dashboard"
import {CreateCustomer, ListsCustomer} from "@/pageAdmin/Customer/index"
import {CreateEmployees, ListsEmployees} from '@/pageAdmin/Employees/index'
import {CreateCar, ListsCar} from '@/pageAdmin/Car/index'
import {CreateService, ListsService} from '@/pageAdmin/Servicess/index'
import {CreatePromotion, ListsPromotion} from '@/pageAdmin/Promotions/index'
import {CreateRank, ListsRank} from '@/pageAdmin/Rank/index'
import {CreatePrice, ListsPrice} from '@/pageAdmin/Price/index'


export const publicRoute = [
    {path:'/',component: Home},
    {path:'/auth',component: Auth,layout:null},
    {path:'/login',component: Login,layout:null},
    {path:'/register',component: Register,layout:null},
    {path:'/otp',component:Otp,layout:null},
    {path:'/services',component:CareServices},
    {path:'/services/:serviceId',component:ServicesDetail},
    {path:'/intro',component:Intro},
    {path:'/blog',component:Blogs},
   
]

export const privateRoute = [
    {path: '/admin',component:Dashboard},
    {path: '/employees/list',component:ListsEmployees},
    {path: '/employees/create',component:CreateEmployees},
    {path: '/customer/list',component:ListsCustomer},
    {path: '/customer/create',component:CreateCustomer},
    {path: '/car/list',component:ListsCar},
    {path: '/car/create',component:CreateCar},
    {path: '/service/list',component:ListsService},
    {path: '/service/create',component:CreateService},
    {path: '/promotion/list',component:ListsPromotion},
    {path: '/promotion/create',component:CreatePromotion},
    {path: '/rank/list',component:ListsRank},
    {path: '/rank/create',component:CreateRank},
    {path: '/price/list',component:ListsPrice},
    {path: '/price/create',component:CreatePrice},
]
