import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'

function MainDashboard() {
  return (
    <div className="relative flex main_bg  w-full mt-[105px] h-[calc(100vh-66px)] overflow-hidden">
        <div className="md:w-[300px] bg-[#fff] p-[20px] fixed h-[100vh] left-0 z-[10]">
            <Sidebar/>
        </div>
        <div className="md:w-[100%]   absolute right-0 top-0  h-[100vh]">
            <Outlet/>
        </div>  
    </div>
  )
}

export default MainDashboard