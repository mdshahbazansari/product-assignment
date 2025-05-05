'use client'

import { useContext, useState } from 'react'
import Context from './Whishlist'
import Link from 'next/link'

const ProductList = ({ products, session }) => {
  const { watchlist, setWatchlist } = useContext(Context)

  const toggleWatchlist = (productId) => {
    if (watchlist.includes(productId)) {
      setWatchlist(watchlist.filter((id) => id !== productId))
    } else {
      setWatchlist([...watchlist, productId])
    }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1'>
      {products.map((product) => (
        <div
          key={product.id}
          className='border-1 border-gray-300 rounded-lg p-4 bg-white hover:shadow-md'
        >
          <img
            src={product.image}
            alt={product.title}
            className='h-60 mx-auto object-contain'
          />
          <h3 className='mt-4 font-semibold text-sm'>{product.title}</h3>
          {session ? (
            <p className='text-gray-600 mt-1'>${product.price}</p>
          ) : (
            <p className='text-gray-600 mt-1'>
              <Link href='/login' className='text-blue-500 font-semibold'>
                SignIn
              </Link>
              <span> or Create an account to see pricing...</span>
            </p>
          )}

          <div className='flex justify-between items-center mt-2'>
            <div>
              {product.rating?.count === 0 ? (
                <span className='text-red-500 text-sm'>OUT OF STOCK</span>
              ) : (
                <span className='text-green-600 text-sm'>
                  {product.category}
                </span>
              )}
            </div>

            <div>
              <button onClick={() => toggleWatchlist(product.id)}>
                {watchlist.includes(product.id) ? (
                  <i className='ri-heart-3-fill text-3xl cursor-pointer text-rose-500'></i>
                ) : (
                  <i className='ri-heart-3-line text-3xl cursor-pointer'></i>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
