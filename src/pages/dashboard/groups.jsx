import { MdMoreHoriz } from 'react-icons/md'
import { useStore } from '../../zustand/zustand'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import axios from 'axios'
import { IoMdAddCircleOutline } from "react-icons/io";

function Groups() {
	const url = import.meta.env.VITE_API_URL
	const token = localStorage.getItem('token')
	const { isOpen } = useStore()
	const [openModal, setOpenModal] = useState(false)

	function deleteGroup() {
		axios.delete(`${url}/groups`, {
			headers: {
				'X-auth-token': token,
			},
		})
	}

	function addMember() {}

	return (
		<div className='ml-[300px] p-[20px]'>
			<div className='flex items-center justify-between'>
				<div className=''>
					<h1 className='text-[40px] font-medium text-[#fff] leading-[48px]'>
						CodeStrike
					</h1>
				</div>
				<div className='flex items-center gap-[10px]'>
					<div
						className={` ${
							isOpen
								? 'bg-[#2c2c2c] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
								: 'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
						} font-medium flex items-center gap-[20px] h-[35px] px-[10px] rounded`}
					>
						<p className=''>Owner:</p>
						<div className='flex items-center gap-[5px]'>
							<div className='font-semibold w-[22px] h-[22px] rounded bg-blue-600 flex items-center justify-center'>
								A
							</div>
							<p className='font-medium'>
								Aslanbek<span className='text-[#959393]'>(Odilov_1220)</span>
							</p>
						</div>
					</div>
					<div
						onClick={() => setOpenModal(!openModal)}
						className={` ${
							isOpen
								? 'bg-[#2c2c2c] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
								: 'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
						} h-[35px] px-[10px] rounded flex items-center justify-center cursor-pointer`}
					>
						<MdMoreHoriz className='text-[20px]' />
					</div>

					{openModal && (
						<div className={`absolute top-[70px] right-[20px] w-[180px] ${isOpen ? 'bg-[#2c2c2c] border text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
							: 'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]'} rounded-xl shadow-lg z-50`}>
							<ul className='flex flex-col'>
								<li onClick={addMember} className='px-4 py-2 text-sm hover:bg-[#3e3d3d] cursor-pointer transition rounded-t-[14px] font-medium flex items-center gap-[5px]'>
									<IoMdAddCircleOutline className='text-[20px] mr-[5px]' />
									Add Member
								</li>
								<li onClick={deleteGroup} className='px-4 py-2 text-sm text-red-600 hover:bg-[#3e3d3d] cursor-pointer transition rounded-b-[14px] font-medium'>
									🗑 Delete Group
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className='grid grid-cols-2 gap-[20px]'>
				<div
					className={`rounded-[10px] p-[10px] ${
						isOpen
							? 'bg-[#2c2c2c] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
							: 'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
					}
			  `}
				>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-[8px]'>
							<h2 className='text-[24px] font-semibold '>Items</h2>
							<div className='w-[30px] h-[30px] rounded flex items-center justify-center bg-blue-600 text-[18px] font-bold text-[#fff] '>
								0
							</div>
						</div>
						<div className=''>
							<form className='flex items-center gap-[5px]'>
								<input
									type='text'
									placeholder='Title'
									className='h-[35px] w-[150px] border rounded pl-[4px]'
								/>
								<button className='w-[35px] h-[35px] rounded flex items-center justify-center text-[#fff] bg-blue-600 text-[18px] cursor-pointer'>
									<FaPlus />
								</button>
							</form>
						</div>
					</div>
					<div className='mt-[10px]'>
						<div className='p-[10px] border rounded-[8px] flex items-center gap-[10px]'>
							<div className='text-[18px] font-bold text-[#fff] min-w-[35px] h-[35px] rounded bg-blue-600 flex items-center justify-center'>
								S
							</div>
							<div className=''>
								<p className='text-[18px] font-semibold line-clamp-1'>Salom</p>
								<p className='text-[16px] font-normal line-clamp-1'>
									Created by aslanbek (10:55,02-06-2025)
								</p>
							</div>
							<div className=''></div>
						</div>
					</div>
				</div>

				<div
					className={`rounded-[10px] p-[10px] ${
						isOpen
							? 'bg-[#2c2c2c] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
							: 'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
					}`}
				>
					<div className="">
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-[8px]'>
							<h2 className='text-[24px] font-semibold '>Members</h2>
							<div className='w-[30px] h-[30px] rounded flex items-center justify-center bg-blue-600 text-[18px] font-bold text-[#fff] '>
								0
							</div>
						</div>
					</div>
					<div className='mt-[10px]'>
						<div className='p-[10px] border rounded-[8px] flex items-center gap-[10px]'>
							<div className='text-[18px] font-bold text-[#fff] min-w-[35px] h-[35px] rounded bg-blue-600 flex items-center justify-center'>
								S
							</div>
							<div className=''>
								<p className='text-[18px] font-semibold line-clamp-1'>Aslanbek</p>
								<p className='text-[16px] font-normal line-clamp-1'>
									ocilov_1220
								</p>
							</div>
							<div className=''></div>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Groups
