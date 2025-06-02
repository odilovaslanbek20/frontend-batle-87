import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaUser, FaUserGroup } from 'react-icons/fa6'
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useStore } from '../../zustand/zustand'

function Sidebar() {
	const { isOpen } = useStore()
	const { t } = useTranslation()
	const url = import.meta.env.VITE_API_URL
	const [Dropdown, setDropDown] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	const showModal = () => setIsModalOpen(true)
	const handleCancel = () => setIsModalOpen(false)

	function handleClickShow() {
		setDropDown(prev => (prev ? false : true))
	}

	function handleGroupClick() {}

	const handleOk = async values => {
		const { name, password } = values
		await axios
			.post(
				`${url}/groups`,
				{ password, name },
				{
					headers: {
						'X-auth-token': token,
					},
				}
			)
			.then(() => {
				setIsModalOpen(false)
				toast.success('The group added successfully')
			})
			.catch(() => {
				toast.error('Something went wrong')
			})
	}

	async function getGroups() {
		try {
			const res = await axios.get(`${url}/groups`, {
				headers: {
					'X-auth-token': token,
				},
			})
			return res.data
		} catch (err) {
			console.log(err)
		}
	}
	const { data: groups } = useQuery({
		queryKey: ['groups'],
		queryFn: getGroups,
	})
	console.log(groups)
	return (
		<>
			<div
				onClick={() => navigate('/dashboard')}
				className={`flex items-center gap-[5px] px-[10px] py-[5px] rounded-[5px] translate-all duration-200 ${
					!isOpen
						? 'hover:bg-[#f0f0f0]'
						: 'hover:bg-[#ababab] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
				} cursor-pointer mb-[15px]`}
			>
				<FaUser className='text-[#0d6efd]' />
				<p>{t('profile')}</p>
			</div>
			<div>
				<div
					onClick={() => handleClickShow(true)}
					className={`flex items-center gap-[5px] px-[10px] py-[5px] rounded-[5px] translate-all duration-200 
      ${
				!isOpen
					? 'hover:bg-[#f0f0f0]'
					: 'hover:bg-[#ababab] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
			} 
      cursor-pointer mb-[15px] transition-all duration-500`}
				>
					<FaUserGroup className='text-[#0d6efd]' />
					<p>Group</p>
					<IoIosArrowDown
						className={`transition-transform duration-300 ${
							Dropdown ? 'rotate-180' : ''
						}`}
					/>
				</div>

				<div
					className={`transition-all duration-300 overflow-hidden ${
						Dropdown ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					<div
						onClick={showModal}
						className={`flex items-center gap-[5px] px-[10px] transition-all duration-500 py-[5px] relative rounded-[5px] ${isOpen ? 'hover:bg-[#ababab] text-[#000]' : 'hover:bg-[#f0f0f0]'} cursor-pointer mb-[10px]`}
					>
						<IoMdAdd className='text-[#0d6efd]' />
						<p className={`${isOpen ? 'text-[#f8f9fa]' : 'text-[#000]'}`}>{t('addGroup')}</p>
					</div>
					{groups?.map(item => (
						<div
							onClick={() => handleGroupClick(item._id)}
							key={item._id}
							className={`flex items-center gap-[5px] transition-all duration-500 px-[10px] py-[5px] relative rounded-[5px]  ${isOpen ? 'hover:bg-[#ababab] text-[#000]' : 'hover:bg-[#f0f0f0]'} cursor-pointer pl-[20px]`}
						>
							<p className={`${isOpen ? 'text-[#ffffff]' : 'text-[#000]'}`}>{item.name}</p>
						</div>
					))}
				</div>
			</div>

			{Dropdown && (
				<div>
					<Modal
						title='Group name and password'
						closable={{ 'aria-label': 'Custom Close Button' }}
						open={isModalOpen}
						onOk={handleOk}
						footer={null}
						onCancel={handleCancel}
					>
						<Form
							name='basic'
							onFinish={handleOk}
							style={{ width: '100%' }}
							initialValues={{
								name: '',
								password: '',
							}}
							autoComplete='off'
						>
							<Form.Item
								name='name'
								style={{ width: '100%' }}
								rules={[{ required: true, message: 'Please enter your name!' }]}
							>
								<Input placeholder='Group name' />
							</Form.Item>
							<Form.Item
								name='password'
								style={{ width: '100%' }}
								rules={[
									{ required: true, message: 'Please enter your password!' },
								]}
							>
								<Input placeholder='Group password' />
							</Form.Item>

							<div className='flex gap-[7px] items-center '>
								<Button
									htmlType='submit'
									style={{
										width: '100%',
										backgroundColor: '#0d6efd',
										color: 'white',
										border: 'none',
										padding: '10px 0',
										marginTop: '30px',
									}}
								>
									Create
								</Button>
								<Button
									htmlType='button'
									style={{
										width: '100%',
										backgroundColor: '#fff',
										color: '#000',
										border: '1px solid #0d6efd',
										padding: '10px 0',
										marginTop: '30px',
									}}
									onClick={handleCancel}
								>
									Cancel
								</Button>
							</div>
						</Form>
					</Modal>
				</div>
			)}
		</>
	)
}

export default Sidebar
