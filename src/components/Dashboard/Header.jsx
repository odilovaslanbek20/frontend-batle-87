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
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function Header() {
  const { t } = useTranslation()
  const url = import.meta.env.VITE_API_URL
  const { isOpen, isOpenModal } = useStore()
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [isResultsOpen, setIsResultsOpen] = useState(false)

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [groupPassword, setGroupPassword] = useState('')

  const menu = {
    items: [
      {
        key: 'logout',
        label: (
          <div className='flex items-center gap-2'>
            <AiOutlineLogout className='text-[#000] text-[20px]' />
            <p className='text-[14px] font-medium text-[#000]'>{t('log_out')}</p>
          </div>
        ),
        onClick: () => {
          const isLogOut = window.confirm('Rostdan ham akauntdan chiqmoqchimisiz?')
          if (isLogOut) {
            localStorage.removeItem('token')
            window.location.href = '/'
          }
        },
      },
    ],
  }

  useEffect(() => {
    if (search.trim() === '') {
      setResults([])
      setIsResultsOpen(false)
      return
    }

    setIsResultsOpen(true)

    const delayDebounce = setTimeout(() => {
      axios
        .get(`${url}/groups/search?q=${search}`, {
          headers: {
            'X-auth-token': token,
          },
        })
        .then(res => {
          setResults(res.data)
        })
        .catch(err => {
          console.log(err)
          setResults([])
        })
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [search, url, token])

  function openJoinModal(group) {
    setSelectedGroup(group)
    setGroupPassword('')
    setIsJoinModalOpen(true)
  }

  function handleJoin() {
    if (!groupPassword.trim()) {
      toast.error(t('please_enter_password'))
      return
    }

    axios
      .post(
        `${url}/groups/join/683d113d28c429b0d129a04d`,
        { password: groupPassword },
        {
          headers: { 'X-auth-token': token },
        }
      )
      .then(() => {
        toast.success(`${selectedGroup.name} guruhiga qo'shildingiz`)
        setIsJoinModalOpen(false)
        setSelectedGroup(null)
        setGroupPassword('')
      })
      .catch(err => {
        console.error(err)
        toast.error(t('join_group_error'))
      })
  }

  function closeJoinModal() {
    setIsJoinModalOpen(false)
    setSelectedGroup(null)
    setGroupPassword('')
  }

  return (
    <>
      <header
        className={`w-full py-2 px-5 fixed top-0 left-0 z-50 transition-all duration-300 ${
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
              <p className='text-white font-medium ml-1 max-[500px]:text-[12px]'>{t('new')}</p>
            </div>
          </div>

          <div className='relative w-full max-w-[700px]'>
            <div
              className='flex items-center gap-2 h-[50px] px-[10px]
                border rounded-md transition-all duration-200
                focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300
                max-[768px]:h-[40px] max-[500px]:h-[36px]'
            >
              <LuSearch />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                type='text'
                placeholder={t('input')}
                className={`w-full h-full outline-none bg-transparent ${
                  isOpen ? 'text-white placeholder:text-gray-400' : 'text-gray-900 placeholder:text-gray-500'
                }`}
              />
            </div>

            {isResultsOpen && results.length > 0 && (
              <ul className='absolute top-[52px] left-0 w-full max-h-[250px] overflow-y-auto z-50 bg-white border border-gray-200 rounded-lg shadow-lg'>
                {results.map(item => (
                  <li
                    key={item.id}
                    className='px-4 py-2 hover:bg-gray-100 text-sm text-gray-800 cursor-default flex items-center justify-between'
                  >
                    <span
                      className='cursor-pointer'
                      onClick={() => {
                        navigate(`/groups/${item.id}`)
                        setSearch('')
                        setResults([])
                      }}
                    >
                      {item.name}
                    </span>

                    <button
                      className='ml-4 px-3 py-1 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded-md'
                      onClick={() => openJoinModal(item)}
                    >
                      {t('join')}
                    </button>
                  </li>
                ))}
              </ul>
            )}
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

      {isJoinModalOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
          onClick={closeJoinModal}
        >
          <div
            className='bg-white rounded-lg p-6 w-[320px] relative'
            onClick={e => e.stopPropagation()}
          >
            <h3 className='text-lg font-semibold mb-4'>{selectedGroup?.name} {t('join_group')}</h3>
            <input
              type='password'
              placeholder={t('enter_password')}
              value={groupPassword}
              onChange={e => setGroupPassword(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none focus:border-blue-500'
            />
            <div className='flex justify-end gap-4'>
              <button
                onClick={closeJoinModal}
                className='px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100'
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleJoin}
                className='px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700'
              >
                {t('join')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
