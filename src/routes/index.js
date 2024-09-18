
import Home from "@/pages/Home/Home"
import Auth from "@/pages/Auth/Auth"
import Login from "@/pages/Login/Login"
import Register from "@/pages/Register/Register"
import CareServices from "@/pages/CareServices/CareServices"
import ServicesDetail from "@/components/UI/ServicesDetail/ServicesDetail"
import Intro from "@/pages/Intro/Intro"
import Blogs from "@/pages/Blogs/Blogs"

import Dashboard from "@/pageAdmin/Dashboard/Dashboard"
export const publicRoute = [
    {path:'/',component: Home},
    {path:'/auth',component: Auth,layout:null},
    {path:'/login',component: Login,layout:null},
    {path:'/register',component: Register,layout:null},
    {path:'/services',component:CareServices},
    {path:'/services/:serviceId',component:ServicesDetail},
    {path:'/intro',component:Intro},
    {path:'/blog',component:Blogs}

]

export const privateRoute = [
    {path:'/admin',component:Dashboard}
]
