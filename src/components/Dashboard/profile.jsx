import { useTranslation } from 'react-i18next'
import { FaTrashAlt } from 'react-icons/fa'
import { MdContentCopy } from 'react-icons/md'
import { useStore } from '../../zustand/zustand'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'

function Profile() {
	const url = import.meta.env.VITE_API_URL
	const token = localStorage.getItem('token')
	const { t } = useTranslation()
	const { isOpen } = useStore()
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(false)

	const getMe = () => {
		setIsLoading(true)
		axios
			.get(`${url}/auth`, {
				headers: {
					'X-auth-token': token,
				},
			})
			.then(res => {
				setData(res?.data)
			})
			.catch(err => {
				toast.error(err?.message)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const { data: auth } = useQuery({
		queryKey: ['auth'],
		queryFn: getMe,
	})

	console.log(auth)

	const deleteAccount = () => {
		const isDelete = window.confirm(t('are_you_sure'))
		if (isDelete) {
			axios
				.delete(`${url}/users`, {
					headers: {
						'X-auth-token': token,
					},
				})
				.then(() => {
					toast.success(t('account_deleted'))
					localStorage.removeItem('token')
					window.location.href = '/'
				})
				.catch(err => {
					toast.error(err?.message)
				})
		}
	}

	const copyUserName = () => {
		if (data?.username) {
			navigator.clipboard
				.writeText(data.username)
				.then(() => toast.success(t('copied_to_clipboard')))
				.catch(() => toast.error(t('copy_failed')))
		}
	}

	return (
		<div className='bg-transparent p-[20px] ml-[300px]'>
			<div
				className={`${
					isOpen
						? 'bg-[#2c2c2c] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
						: 'bg-[#fff]'
				} rounded-[20px] p-[25px]`}
			>
				<div className='flex items-center justify-between'>
					<h2 className='text-[35px] font-[600]'>{t('your_profile')}</h2>
					<div className='flex gap-[10px] items-center mb-[20px]'>
						<button
							onClick={copyUserName}
							className='flex gap-[3px] cursor-pointer items-center py-[6px] px-[10px] bg-[#0d6efd] rounded-[7px]'
						>
							<MdContentCopy className='text-[#fff]' />
							<p className='text-[#fff]'>{t('copeUserName')}</p>
						</button>
						<button
							onClick={deleteAccount}
							className='flex gap-[3px] cursor-pointer items-center py-[6px] px-[10px] bg-[#DC3545] rounded-[7px]'
						>
							<FaTrashAlt className='text-[#fff]' />
							<p className='text-[#fff] '>{t('deleteAccount')}</p>
						</button>
					</div>
				</div>
				<div className='flex items-center gap-[30px]'>
					<div className='flex items-center justify-center w-[200px] h-[200px] bg-[#DC3545] rounded-[50%]'>
						<Skeleton
							loading={isLoading}
							active
							avatar={{ size: 100, shape: 'circle' }}
							paragraph={false}
							title={false}
							style={{
								'--antd-skeleton-color': isOpen ? '#444' : '#e0e0e0', 
								'--antd-skeleton-background': isOpen ? '#666' : '#f5f5f5', 
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<h2 className='text-[40px] text-[#fff] uppercase'>
								{data?.name ? data.name.charAt(0) : ''}
							</h2>
						</Skeleton>
					</div>

					<div>
						<Skeleton
							loading={isLoading}
							active
							title={{
								width: 200,
								style: {
									height: 30,
									marginBottom: 8,
									backgroundColor: isOpen ? '#444' : '#e0e0e0',
								},
							}}
							paragraph={false}
							style={{
								'--antd-skeleton-color': isOpen ? '#444' : '#e0e0e0',
								'--antd-skeleton-background': isOpen ? '#666' : '#f5f5f5',
							}}
						>
							<div className='flex gap-[20px] items-start mb-[10px]'>
								<h3 className='text-[25px] capitalize'>{data?.name}</h3>
								<button className='bg-[#198754] px-[7px] rounded-[5px] text-[#fff] '>
									{data?.status}
								</button>
							</div>
							<p>{data?.username}</p>
						</Skeleton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
