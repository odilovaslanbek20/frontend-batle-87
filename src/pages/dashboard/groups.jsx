import { MdMoreHoriz } from 'react-icons/md'
import { useStore } from '../../zustand/zustand'
import { FaPlus } from 'react-icons/fa'

function Groups() {
	const { isOpen } = useStore()
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
						className={` ${
							isOpen
								? 'bg-[#2c2c2c] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
								: 'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
						} h-[35px] px-[10px] rounded flex items-center justify-center cursor-pointer`}
					>
						<MdMoreHoriz className='text-[20px]' />
					</div>
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
							<div className="w-[30px] h-[30px] rounded flex items-center justify-center bg-blue-600 text-[18px] font-bold text-[#fff] ">
								0
							</div>
						</div>
						<div className="">
							<form className='flex items-center gap-[5px]'>
								<input type="text" placeholder='Title' className='h-[35px] w-[150px] border rounded pl-[4px]'/>
								<button className='w-[35px] h-[35px] rounded flex items-center justify-center text-[#fff] bg-blue-600 text-[18px] cursor-pointer'><FaPlus/></button>
							</form>
						</div>
					</div>
					<div className="mt-[10px]">
						<div className="p-[10px] border rounded-[8px] flex items-center gap-[10px]">
							<div className="text-[18px] font-bold text-[#fff] min-w-[35px] h-[35px] rounded bg-blue-600 flex items-center justify-center">
								S
							</div>
							<div className="">
								<p className='text-[18px] font-semibold line-clamp-1'>Salom</p>
								<p className='text-[16px] font-normal line-clamp-1'>Created by aslanbek (10:55,02-06-2025)</p>
							</div>
							<div className="">
								
							</div>
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
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
					tenetur cumque officiis explicabo amet reprehenderit ducimus eius
					commodi dolores provident repellendus, asperiores numquam alias
					aspernatur officia culpa qui doloremque natus ipsa optio laborum
					temporibus vero ut! Porro eos exercitationem quaerat blanditiis ipsa
					quasi ipsum quibusdam, sed hic! Nobis eaque accusamus quia eos minima!
					Voluptatem sunt consequatur dolore, aspernatur vero quae. Magni
					molestiae dignissimos sit odio autem, obcaecati facere enim sapiente
					quo doloremque, numquam nulla similique asperiores! Distinctio nobis
					quisquam, iusto debitis esse quae eveniet culpa porro odit saepe
					quidem, molestias autem placeat reiciendis dolor, quod explicabo
					incidunt iste. Expedita natus animi earum, doloremque at adipisci
					culpa ullam ad consectetur nisi molestias dolorum suscipit commodi
					dicta autem veritatis magnam provident esse ab nulla facilis
					cupiditate! Excepturi, architecto. Aliquam quae non placeat vel,
					minima, ipsum assumenda quibusdam velit nulla adipisci eveniet quidem
					exercitationem, magni reiciendis hic pariatur. Accusantium porro
					commodi hic eaque atque suscipit inventore, maiores, aperiam ratione
					nobis sit! Dicta sed autem reprehenderit delectus ducimus atque nemo,
					reiciendis, porro odit veritatis eligendi doloremque corporis labore
					dolore sunt tempora! Harum omnis esse quod debitis sint nobis,
					nesciunt pariatur provident qui atque velit dolor sunt quibusdam
					ratione voluptate porro accusantium nulla, sed quaerat?
				</div>
			</div>
		</div>
	)
}

export default Groups
