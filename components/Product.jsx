'use client'

import React, { useEffect, useState } from 'react'
import ProductList from '@/components/ProductList'
import SidebarFilter from '@/components/SidebarFilter'
import { Divider, Pagination, Select } from 'antd'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Product = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filterBtn, setFilterBtn] = useState(true)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://fakestoreapi.com/products')
      setProducts(res.data)
      setFilteredProducts(res.data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/user/verify', {
          withCredentials: true,
        })
        setSession(res.data)
      } catch (err) {
        console.error('Not authorized', err)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleFilterChange = (gender) => {
    if (gender === 'All') {
      setFilteredProducts(products)
    } else {
      let categoryMatch = ''
      if (gender === 'Men') categoryMatch = "men's clothing"
      if (gender === 'Women') categoryMatch = "women's clothing"

      const filtered = products.filter(
        (product) => product.category === categoryMatch
      )
      setFilteredProducts(filtered)
    }
  }

  const handleFilterBtn = () => {
    setFilteredProducts(products)
    setFilterBtn(!filterBtn)
  }

  const onChange = (value) => {
    console.log(`selected ${value}`)

    let sortedProducts = [...filteredProducts]

    if (value === 'price-highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price)
    } else if (value === 'price-lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (value === 'newestFirst') {
      sortedProducts.sort((a, b) => b.id - a.id)
    } else if (value === 'popular') {
      sortedProducts.sort((a, b) => b.rating.count - a.rating.count)
    }

    setFilteredProducts(sortedProducts)
  }

  const onSearch = (value) => {
    console.log('search:', value)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <main className='min-h-screen'>
        {/* Discover Section */}
        <section className='text-center mt-12 mb-6'>
          <h1 className='text-5xl font-semibold'>DISCOVER OUR PRODUCTS</h1>
          <p className='text-gray-600 text-2xl max-w-3xl mx-auto my-10 px-2'>
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
            scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
            dolor.
          </p>
        </section>
        <Divider />
        <section className='flex flex-wrap max-w-7xl mx-auto px-6 justify-between items-center gap-4 py-4'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto'>
            {/* Items Count */}
            <div className='text-xl font-semibold mb-2 sm:mb-0 hidden md:block'>
              {filteredProducts.length} ITEMS
            </div>

            {/* Filter Button */}
            {filterBtn ? (
              <button
                onClick={handleFilterBtn}
                className='mb-2 sm:mb-0 text-gray-400 font-semibold sm:ml-8 text-xl cursor-pointer'
              >
                HIDE FILTER
              </button>
            ) : (
              <button
                onClick={handleFilterBtn}
                className='mb-2 sm:mb-0 text-gray-400 font-semibold sm:ml-8 text-xl cursor-pointer'
              >
                SHOW FILTER
              </button>
            )}
          </div>

          {/* Sorting Select */}
          <div className='w-full sm:w-auto'>
            <Select
              showSearch
              placeholder='RECOMMENDED'
              optionFilterProp='label'
              onChange={onChange}
              onSearch={onSearch}
              options={[
                { value: 'newestFirst', label: 'Newest First' },
                { value: 'popular', label: 'Popular' },
                { value: 'price-highToLow', label: 'Price: High to Low' },
                { value: 'price-lowToHigh', label: 'Price: Low to High' },
              ]}
              className='w-full sm:w-60'
            />
          </div>
        </section>

        <Divider />
        {/* Filters + Product Grid */}
        <section className='flex max-w-7xl mx-auto px-6'>
          {/* Sidebar */}
          {filterBtn && <SidebarFilter onGenderFilter={handleFilterChange} />}

          {/* Products */}
          <ProductList products={filteredProducts} session={session} />
        </section>
      </main>
      <div className='max-w-7xl mx-auto px-6 mt-10'>
        <Pagination
          align='end'
          defaultCurrent={1}
          total={filteredProducts.length}
        />
      </div>
    </div>
  )
}

export default Product
