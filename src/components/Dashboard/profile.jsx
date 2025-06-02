import { useTranslation } from 'react-i18next'
import { FaTrashAlt } from "react-icons/fa"
import { MdContentCopy } from "react-icons/md"
import { useStore } from '../../zustand/zustand'
import axios from 'axios'
import { useState } from 'react'

function Profile() {
  const url = import.meta.env.VITE_API_URL
  const { t } = useTranslation()
  const {isOpen} = useStore()
  const [data, setData] = useState()

  axios.get(`${url}/auth`, {
    headers: {
      'X-auth-token': localStorage.getItem('token')
    }
  }).then(res => {
    setData(res?.data)
    console.log(res?.data)
  }).catch(err => {
    console.log(err)
  })

  return (
    <div className="bg-transparent p-[20px] ml-[300px]">
      <div className={`${isOpen ? 'bg-[#2c2c2c] text-white shadow-[0_2px_8px_rgba(255,255,255,0.2)]' : 'bg-[#fff]'} rounded-[20px] p-[25px]`}>
        <div className="flex items-center justify-between">
          <h2 className="text-[35px] font-[600]">{t("your_profile")}</h2>
          <div className="flex gap-[10px] items-center mb-[20px]">
            <button className="flex gap-[3px] cursor-pointer items-center py-[6px] px-[10px] bg-[#0d6efd] rounded-[7px]">
              <MdContentCopy className="text-[#fff]"/>
              <p className="text-[#fff]">{t("copeUserName")}</p>
            </button>
            <button className="flex gap-[3px] cursor-pointer items-center py-[6px] px-[10px] bg-[#DC3545] rounded-[7px]">
              <FaTrashAlt className="text-[#fff]"/>
              <p className="text-[#fff] ">{t("deleteAccount")}</p>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-[30px]">
          <div className="flex items-center justify-center w-[200px] h-[200px] bg-[#DC3545] rounded-[50%]">
            <h2 className="text-[40px] text-[#fff] uppercase">{data?.name ? data.name.charAt(0) : ''}</h2>
          </div>
          <div>
            <div className="flex gap-[20px] items-start mb-[10px]">
              <h3 className="text-[25px]">{data?.name}</h3>
              <button className="bg-[#198754] px-[7px] rounded-[5px] text-[#fff] ">{data?.status}</button>
            </div>
            <p>{data?.username}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile