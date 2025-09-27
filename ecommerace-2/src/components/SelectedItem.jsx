import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useNavigate, useParams } from 'react-router-dom'
import { GoStarFill } from "react-icons/go";

const SelectedItem = () => {
  const [products, setProducts] = useState([])
  const { id } = useParams()

  const navigate = useNavigate()

  const product = products.find((p) => p._id === id)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('/products/getProducts')
        setProducts(res.data || [])
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  }, [])

  const handleAddCart = async (productId) => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
      }

      const res = await axios.post('/cart/addToCart', { productId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (err) {
      console.log(err);
    }
  }

  if (!product) return <div className="text-center w-full min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="w-full px-6 pt-28 pb-14 flex items-center justify-center">
      <div className='flex flex-col gap-4 items-start'>
        <p className='select-none'>
          <span>Home</span> /
          <span> Products</span> /
          <span className="text-indigo-500 cursor-pointer"> {product.title}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img src={`https://next-buy-eight.vercel.app/${product.image}`} alt="Selected product" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.title}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <GoStarFill key={s} className='text-yellow-600' />
              ))}
              <p className="text-base ml-2">(5)</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">MRP: ${Math.floor(product.price * 1.1)}</p>
              <p className="text-2xl font-medium">MRP: ${product.price}</p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              <li>{product.description}</li>
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button onClick={() => handleAddCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                Add to Cart
              </button>
              <button className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectedItem
