import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import { useStore } from '../../zustand/zustand'

function MainDashboard() {
  const {isOpen} = useStore()
  return (
    <div className="relative flex main_bg  w-full mt-[66px] max-[768px]:mt-[105px] h-[calc(100vh-66px)] overflow-hidden">
        <div className={`md:w-[300px] p-[20px] fixed h-[100vh] left-0 z-[10] ${isOpen ? 'bg-[#2c2c2c] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]' : 'bg-[#fff]'}`}>
            <Sidebar/>
        </div>
        <div className="md:w-[100%]   absolute right-0 top-0  h-[100vh]">
            <Outlet/>
        </div>  
    </div>
  )
}

export default MainDashboard