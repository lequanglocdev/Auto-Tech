
import { Home } from "@/pages/Home"
import Auth from "@/pages/Auth/Auth"
import Login from "@/pages/Login/Login"
import Register from "@/pages/Register/Register"
import ServicesDetail from "@/components/UI/ServicesDetail/ServicesDetail"
export const publicRoute = [
    {path:'/',component: Home},
    {path:'/auth',component: Auth,layout:null},
    {path:'/login',component: Login,layout:null},
    {path:'/register',component: Register,layout:null},
    {path:'/services/:serviceId',component:ServicesDetail}
]

export const privateRoute = [
  
]
