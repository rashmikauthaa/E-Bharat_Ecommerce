import React, { Fragment, useContext, useState, useMemo } from 'react'
import myContext from '../../context/data/myContext'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'

function Navbar() {
  const { mode, toggleMode } = useContext(myContext)
  const [open, setOpen] = useState(false)

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch {
      return null
    }
  }, [])

  const cartItems = useSelector(state => state.cart)

  const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Mobile Sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40,44,52)' : '', color: mode === 'dark' ? 'white' : '' }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross2 />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <Link to='/allproducts' className="block p-2 font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>
                    All Products
                  </Link>
                  <Link to='/about' className="block p-2 font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>
                    About
                  </Link>
                  <Link to='/contact' className="block p-2 font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>
                    Contact
                  </Link>
                  {user ? (
                    <Link to='/order' className="block p-2 font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>
                      Orders
                    </Link>
                  ) : (
                    <Link to='/signup' className="block p-2 font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>
                      Signup
                    </Link>
                  )}
                  {user && user.email === import.meta.env.VITE_ADMIN_EMAIL && (
                    <Link to='/dashboard' className="block p-2 font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>
                      Admin Panel
                    </Link>
                  )}
                  {user && (
                    <button onClick={logout} className="block p-2 font-medium text-left w-full" style={{ color: mode === 'dark' ? 'white' : '' }}>
                      Logout
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
              style={{ backgroundColor: mode === 'dark' ? 'rgb(80,82,87)' : '', color: mode === 'dark' ? 'white' : '' }}
            >
              <span className="sr-only">Open menu</span>
              {/* Hamburger icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Logo Link */}
            <div className="ml-4 flex lg:ml-0">
              <Link to='/' className='flex'>
                <h1 className='text-2xl font-bold px-2 py-1' style={{ color: mode === 'dark' ? 'white' : '' }}>E-Bharat</h1>
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              {/* Desktop Nav Links */}
              <div className="hidden lg:flex lg:space-x-6">
                <Link to='/allproducts' className="text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>All Products</Link>
                <Link to='/about' className="text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>About</Link>
                <Link to='/contact' className="text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>Contact</Link>
                {user ? (
                  <Link to='/order' className="text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>Orders</Link>
                ) : (
                  <Link to='/signup' className="text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>Signup</Link>
                )}
                {user && user.email === import.meta.env.VITE_ADMIN_EMAIL && (
                  <Link to='/dashboard' className="text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>Admin Panel</Link>
                )}
              </div>

              {/* Theme Toggle */}
              <div className="flex lg:ml-8">
                <button onClick={toggleMode} style={{ color: mode === 'dark' ? 'white' : '' }}>
                  {mode === 'light' ? <FiSun size={24} /> : <BsFillCloudSunFill size={24} />}
                </button>
              </div>

              {/* Cart Icon */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link to='/cart' className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  {/* Cart SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '' }}>{cartItems.length}</span>
                  <span className="sr-only">items in cart</span>
                </Link>
              </div>

              {/* User Profile Dropdown */}
              {user && (
                <Menu as="div" className="relative ml-4">
                  <Menu.Button className="flex items-center focus:outline-none">
                    <img
                      src="https://wallpapers.com/images/featured/funny-facebook-profile-pictures-nghrweqjmsbdt69s.jpg"
                      alt="user"
                      className="inline-block w-10 h-10 rounded-full"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ backgroundColor: mode === 'dark' ? '#3a3f47' : 'white' }}>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                              style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar;