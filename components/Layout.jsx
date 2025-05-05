'use client'

import 'remixicon/fonts/remixicon.css'
import React, { useEffect, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { Badge, Breadcrumb, Divider, Drawer, Select } from 'antd'
import Link from 'next/link'
import Context from './Whishlist'
import axios from 'axios'
import { usePathname } from 'next/navigation'

// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [watchlist, setWatchlist] = useState([])
  const [session, setSession] = useState()

  const socialIcon = [
    'ri-facebook-fill',
    'ri-instagram-line',
    'ri-twitter-x-line',
    'ri-linkedin-fill',
  ]

  const paymentIcon = [
    'gPay.png',
    'masterCard.png',
    'payPal.png',
    'AMEX.png',
    'iPay.png',
    'oPay.png',
  ]

  const menu = [
    {
      lable: 'Shop',
      href: 'shop',
    },
    {
      lable: 'Skill',
      href: 'skill',
    },
    {
      lable: 'Stories',
      href: 'stories',
    },
    {
      lable: 'About',
      href: 'about',
    },
    {
      lable: 'Contact Us',
      href: 'contact-us',
    },
  ]

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/user/verify', {
          withCredentials: true,
        })
        setSession(res.data)
      } catch (error) {
        console.error('User verification failed:', error)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout')
      setSession(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  const [openSection, setOpenSection] = useState(null)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    // Safe to access window here (only runs on client)
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSection = (section) => {
    if (isLargeScreen) return
    setOpenSection(openSection === section ? null : section)
  }

  const pathname = usePathname()
  const currentPath = pathname.split('/').pop() || 'home'
  const formattedPath =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1)

  return (
    <div>
      <div className='bg-black'>
        <div className='px-4 w-full h-10 text-rose-500 flex justify-between items-center'>
          <div>Email:mettamuse@gmail.com</div>
          <div className='hidden md:block'>mettamuse</div>
          <div className='flex items-center space-x-2'>
            <i className='ri-facebook-fill text-blue-600 text-lg cursor-pointer'></i>
            <i className='ri-instagram-line text-pink-500 text-lg cursor-pointer'></i>
            <i className='ri-twitter-x-line text-white text-lg cursor-pointer'></i>
            <i className='ri-linkedin-fill text-blue-700 text-lg cursor-pointer'></i>
          </div>
        </div>
      </div>

      <nav className=''>
        {/* Top section */}
        <div className='flex items-center justify-between px-2 py-2 md:py-4  mx-auto'>
          {/* Mobile Menu Icon */}
          <div className='md:hidden flex items-center'>
            <button onClick={() => setMenuOpen(true)}>
              <HiMenu size={30} />
            </button>
          </div>

          {/* Logo */}
          <div className=' justify-start md:justify-center ml-20 hidden md:block'>
            <h1 className='text-2xl font-semibold'>Mettamuse</h1>
          </div>

          <div className=' flex justify-start md:justify-center'>
            <Link href={'/'}>
              <img
                src='../logo.jpg'
                alt='Logo'
                className='w-25 object-contain'
              />
            </Link>
          </div>

          {/* Icons */}
          <div className=' md:flex items-center space-x-2 md:space-x-4 md:mr-6'>
            <i className='ri-search-line text-black text-3xl'></i>
            <button className='cursor-pointer relative'>
              <Badge count={watchlist.length}>
                {watchlist.length > 0 ? (
                  <i className='ri-heart-3-fill text-3xl text-rose-500'></i>
                ) : (
                  <i className='ri-heart-3-line text-3xl'></i>
                )}
              </Badge>
            </button>
            <button className='cursor-pointer'>
              <i className='ri-shopping-bag-4-line text-3xl'></i>
            </button>
            {session ? (
              <button
                onClick={handleLogout}
                className='cursor-pointer text-xl bg-gray-200 px-4 py-1 rounded'
              >
                Logout
              </button>
            ) : (
              <button className='cursor-pointer'>
                <Link href='/login'>
                  <i className='ri-user-line hidden md:block text-2xl'></i>
                </Link>
              </button>
            )}
            <div className=' hidden md:block items-center cursor-pointer'>
              {/* <i className='ri-global-line text-2xl'></i> */}
              <Select
                placeholder='ENG'
                className='w-full'
                options={[
                  {
                    value: 'english',
                    label: 'English',
                  },
                  {
                    value: 'hindi',
                    label: 'Hindi',
                  },
                ]}
              ></Select>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div
          className={`md:flex-row sm:flex-col text-center  justify-center items-center space-x-6 py-2 font-semibold text-xl uppercase ${
            menuOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <a href='#'>Shop</a>
          <a href='#'>Skills</a>
          <a href='#'>Stories</a>
          <a href='#'>About</a>
          <a href='#'>Contact Us</a>
        </div>

        <Drawer
          title='Mettamuse'
          placement='left'
          onClose={() => setMenuOpen(false)}
          open={menuOpen}
        >
          <div className='flex flex-col space-y-6 text-lg font-semibold'>
            {menu.map((item, index) => (
              <div key={index}>
                <a
                  href={item.href}
                  className='text-black font-semibold text-2xl'
                  onClick={() => setMenuOpen(false)}
                >
                  {item.lable}
                </a>
              </div>
            ))}
            <div className='flex items-center space-x-4 text-3xl justify-center'>
              <i className='ri-facebook-fill text-blue-600 cursor-pointer'></i>
              <i className='ri-instagram-line text-pink-500  cursor-pointer'></i>
              <i className='ri-twitter-x-line text-black cursor-pointer'></i>
              <i className='ri-linkedin-fill text-blue-700  cursor-pointer'></i>
            </div>
          </div>
        </Drawer>
      </nav>
      <Divider />

      <div className='mx-auto flex w-10/12 md:hidden '>
        <Breadcrumb items={[{ title: <a href='/'>{formattedPath} /</a> }]} />
      </div>

      <Context.Provider value={{ watchlist, setWatchlist }}>
        {children}
      </Context.Provider>
      <footer className='bg-black text-white px-6 py-12 mt-10'>
        <div className='max-w-7xl mx-auto space-y-12'>
          {/* Newsletter + Contact */}
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-10 lg:space-y-0'>
            {/* Newsletter */}
            <div className='max-w-md'>
              <h3 className='font-semibold mb-2 text-xl'>
                BE THE FIRST TO KNOW
              </h3>
              <p className='text-sm text-gray-400 my-4'>
                Sign up for updates from mettà muse.
              </p>
              <div className='flex mt-10'>
                <input
                  type='email'
                  placeholder='Enter your e-mail...'
                  className='px-4 py-3 rounded-l bg-transparent border border-gray-600 text-sm flex-1'
                />
                <button className='bg-white text-black px-4 py-2 rounded-r text-sm font-semibold'>
                  SUBSCRIBE
                </button>
              </div>
            </div>

            {/* Contact & Currency */}
            <div className='space-y-6 text-md'>
              <div>
                <h3 className='font-semibold mb-1'>CONTACT US</h3>
                <p className='py-2'>+44 221 133 5360</p>
                <p>customercare@mettamuse.com</p>
              </div>
              <div>
                <h3 className='font-semibold mb-1'>CURRENCY</h3>
                <p className='text-xl py-2'>
                  <i className='ri-money-rupee-circle-line text-xl'></i> INR
                </p>
                <p className='text-gray-400 text-xs'>
                  Transactions will be completed in Euros and a currency
                  reference is available on hover.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='h-px bg-gray-700'></div>

          {/* Links */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-xl'>
            {/* Metta Muse */}
            <div>
              <h3
                className='font-semibold mb-4 text-2xl flex justify-between items-center cursor-pointer lg:cursor-default'
                onClick={() => toggleSection('metta')}
              >
                metà muse
                <span className='lg:hidden'>
                  {openSection === 'metta' ? '−' : '+'}
                </span>
              </h3>

              {(isLargeScreen || openSection === 'metta') && (
                <ul className='space-y-3 text-gray-300 text-lg'>
                  <li>
                    <a href='#'>About Us</a>
                  </li>
                  <li>
                    <a href='#'>Stories</a>
                  </li>
                  <li>
                    <a href='#'>Artisans</a>
                  </li>
                  <li>
                    <a href='#'>Boutiques</a>
                  </li>
                  <li>
                    <a href='#'>Contact Us</a>
                  </li>
                  <li>
                    <a href='#'>EU Compliances Docs</a>
                  </li>
                </ul>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className='font-semibold mb-4 text-2xl flex justify-between items-center cursor-pointer lg:cursor-default'
                onClick={() => toggleSection('quick')}
              >
                QUICK LINKS
                <span className='lg:hidden'>
                  {openSection === 'quick' ? '−' : '+'}
                </span>
              </h3>

              {(isLargeScreen || openSection === 'quick') && (
                <ul className='space-y-3 text-gray-300 text-lg'>
                  <li>
                    <a href='#'>Orders & Shipping</a>
                  </li>
                  <li>
                    <a href='#'>Join/Login as a Seller</a>
                  </li>
                  <li>
                    <a href='#'>Payment & Pricing</a>
                  </li>
                  <li>
                    <a href='#'>Return & Refunds</a>
                  </li>
                  <li>
                    <a href='#'>FAQs</a>
                  </li>
                  <li>
                    <a href='#'>Privacy Policy</a>
                  </li>
                  <li>
                    <a href='#'>Terms & Conditions</a>
                  </li>
                </ul>
              )}
            </div>

            {/* Social & Payments */}
            <div className='space-y-6'>
              {/* Social */}
              <div>
                <span className='font-semibold text-2xl'>FOLLOW US</span>
                <div className='flex items-center space-x-4 py-4 text-2xl flex-wrap'>
                  {socialIcon.map((item, index) => (
                    <div key={index}>
                      <i
                        className={`${item} text-xl cursor-pointer border border-white rounded-full px-2 py-2 hover:text-blue-500`}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div>
                <h1 className='text-md font-semibold py-4'>
                  mettà muse ACCEPTS
                </h1>
                <div className='flex space-x-3 space-y-2 '>
                  {paymentIcon.map((item, index) => (
                    <div key={index}>
                      <img
                        src={`../paymentPNG/${item}`}
                        alt={item.replace('.png', '')}
                        className='w-auto'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className='text-center text-md text-gray-500 mt-6'>
            Copyright © 2025 mettamuse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
