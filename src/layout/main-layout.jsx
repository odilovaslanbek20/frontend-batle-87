import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function MainLayout() {
	return (
		<>	
			<div>
				<ToastContainer />
			</div>
			<Outlet />
		</>
	)
}

export default MainLayout
