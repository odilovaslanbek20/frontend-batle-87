import { Dropdown } from 'antd'
import { IoSettingsSharp, IoNotificationsOutline } from 'react-icons/io5'
import { FaBlog } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa6'
import { LuSearch } from 'react-icons/lu'
import { BsMoonStars, BsSun } from 'react-icons/bs'
import LanguageModal from './language'
import { useTranslation } from 'react-i18next'
import { useStore } from '../../zustand/zustand'

function Header() {
	const { t } = useTranslation()
	const { isOpen, isOpenModal } = useStore()
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	const menu = {
		items: [
			{
				key: 'logout',
				label: (
					<div className='flex items-center gap-2'>
						<AiOutlineLogout className='text-[#000] text-[20px]' />
						<p className='text-[14px] font-medium text-[#000]'>
							{t('log_out')}
						</p>
					</div>
				),
				onClick: () => {
					const isLogOut = window.confirm(
						'Rostdan ham akauntdan chiqmoqchimisiz?'
					)
					if (isLogOut) {
						localStorage.removeItem('token')
						window.location.href = '/'
					}
				},
			},
		],
	}

	return (
		<header
			className={`w-full py-2 px-5 fixed top-0 left-0 z-50 transition-all duration-300
        ${
					isOpen
						? 'bg-[#2c2c2c] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
						: 'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
				}`}
		>
			<nav
				className='flex items-center justify-between gap-10
          max-[800px]:gap-6
          max-[768px]:grid max-[768px]:grid-cols-2 max-[768px]:gap-4'
			>
				<div className='flex items-center gap-8 max-[500px]:gap-3 max-[620px]:order-1'>
					<div className='cursor-pointer' onClick={isOpenModal}>
						{isOpen ? (
							<BsSun className='text-[24px] max-[500px]:text-[20px]' />
						) : (
							<BsMoonStars className='text-[24px] max-[500px]:text-[20px]' />
						)}
					</div>
					<Link to={token ? '/dashboard' : '/'}>
						<FaBlog className='text-[32px] text-[rgb(13,109,252)] max-[500px]:text-[24px]' />
					</Link>
					<div className='flex items-center justify-center cursor-pointer bg-[#0d6efd] w-[80px] h-[33px] rounded-[30px] max-[500px]:w-[60px] max-[500px]:h-[28px]'>
						<FaPlus className='text-[15px] text-white max-[500px]:text-[12px]' />
						<p className='text-white font-medium ml-1 max-[500px]:text-[12px]'>
							{t('new')}
						</p>
					</div>
				</div>

				<div
					className='flex items-center gap-2 w-full max-w-[700px] h-[50px] px-[10px]
            border rounded-md transition-all duration-200
            focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300
            max-[768px]:h-[40px] max-[768px]:order-3 max-[768px]:col-span-2 max-[500px]:h-[36px] max-[768px]:max-w-full'
				>
					<LuSearch />
					<input
						type='text'
						placeholder={t('input')}
						className={`w-full h-full outline-none bg-transparent 
                ${
									isOpen
										? 'text-white placeholder:text-gray-400'
										: 'text-gray-900 placeholder:text-gray-500'
								}`}
					/>
				</div>

				<div className='flex items-center gap-8 justify-end max-[768px]:order-2 '>
					<LanguageModal />
					<div
						onClick={() => (token ? navigate('/dashboard') : navigate('/'))}
						className='relative cursor-pointer'
					>
						<IoNotificationsOutline className='text-[24px] max-[500px]:text-[18px]' />
						<div className='absolute top-[-10px] right-[-13px] px-[7px] rounded-full bg-red-600 text-white text-xs max-[500px]:px-[5px] max-[500px]:text-[10px]'>
							9+
						</div>
					</div>
					<Dropdown menu={menu} trigger={['click']} placement='bottomRight'>
						<div className='cursor-pointer'>
							<IoSettingsSharp className='text-[24px] max-[500px]:text-[18px]' />
						</div>
					</Dropdown>
				</div>
			</nav>
		</header>
	)
}

export default Header
