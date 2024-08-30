import { ContactTop } from "@/pages/Contact"
import { Home } from "@/pages/Home"
import  Upload  from "@/pages/Upload/Upload"

export const publicRoute = [
    {path:'/',component: Home},
    {path:'/contact',component: ContactTop},
    {path:'/upload',component: Upload,layout:null}
    

]

export const privateRoute = [
  
]
