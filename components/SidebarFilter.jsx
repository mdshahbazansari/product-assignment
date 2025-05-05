'use client'

import { useState } from 'react'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'


const SidebarFilter = ({ onGenderFilter }) => {
  const [selectedGender, setSelectedGender] = useState('All')

  const handleGenderClick = (gender) => {
    setSelectedGender(gender)
    onGenderFilter(gender)
  }

  return (
    <aside className='w-64 mr-8 hidden md:block'>
      {/* Filters */}
      <div className='space-y-4'>
        <div>
          <label>
            <input type='checkbox' className='mr-2' />
            CUSTOMIZABLE
          </label>
        </div>

        <div>
          <details open>
            <summary className='cursor-pointer'>IDEAL FOR</summary>
            <ul className='ml-4 mt-2 space-y-1'>
              {['All', 'Men', 'Women'].map((gender) => (
                <li
                  key={gender}
                  onClick={() => handleGenderClick(gender)}
                  className={`cursor-pointer ${
                    selectedGender === gender ? 'font-bold text-blue-600' : ''
                  }`}
                >
                  {gender}
                </li>
              ))}
            </ul>
          </details>
        </div>

        <div>
          <details>
            <summary className='cursor-pointer'>OCCASION</summary>
            <ul className='ml-4 mt-2 space-y-1'>
              <li>All</li>
              <li>Travel</li>
            </ul>
          </details>
        </div>

        <div>
          <details>
            <summary className='cursor-pointer'>WORK</summary>
            <ul className='ml-4 mt-2 space-y-1'>
              <li>All</li>
              <li>Work</li>
            </ul>
          </details>
        </div>

        <div>
          <details>
            <summary className='cursor-pointer'>FABRIC</summary>
            <ul className='ml-4 mt-2 space-y-1'>
              <li>All</li>
              <li>Fabric</li>
            </ul>
          </details>
        </div>

        <div>
          <details>
            <summary className='cursor-pointer'>SEGMENT</summary>
            <ul className='ml-4 mt-2 space-y-1'>
              <li>All</li>
              <li>Segment</li>
            </ul>
          </details>
        </div>

        <div>
          <details>
            <summary className='cursor-pointer'>SUITABLE FOR</summary>
            <ul className='ml-4 mt-2 space-y-1'>
              <li>All</li>
              <li>suitable for</li>
            </ul>
          </details>
        </div>

        <div>
          <details>
            <summary className='cursor-pointer'>RAW MATERIALS</summary>
            <ul className='ml-4 mt-2 space-y-1'>
              <li>All</li>
              <li>suitable for</li>
            </ul>
          </details>
        </div>

        <div>
          <details>
            <summary className='cursor-pointer'>PATTERN</summary>
            <ul className='ml-4 mt-2 space-y-1'>
              <li>All</li>
              <li>Pattern</li>
            </ul>
          </details>
        </div>
      </div>
    </aside>
  )
}

export default SidebarFilter
