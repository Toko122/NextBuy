import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { FaShoppingCart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Item = () => {
   const [products, setProducts] = useState([])

   const [error, setError] = useState('')

   const navigate = useNavigate()

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
         await axios.post('/cart/addToCart', { productId }, {
            headers: { Authorization: `Bearer ${token}` }
         })
         window.dispatchEvent(new Event('cartUpdated'))
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className='w-full flex gap-6 flex-wrap justify-center pt-30'>
         <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

         {products.map(item => (
            <div key={item._id} className="flex flex-col bg-white shadow-md w-72 max-h-[500px]">
               <div onClick={() => { navigate(`/product/${item._id}`); window.scrollTo(0, 0) }}>
                  <img className='w-72 h-48 object-cover' src={`https://next-nad6u0xaz-toko122s-projects.vercel.app${item.image}`} alt="image" />

                  <div className="p-4 text-sm">
                     <p className="text-slate-600">${(item.price).toFixed(2)}</p>
                     <p className="text-slate-800 text-base font-medium my-1.5">{item.title}</p>
                     <p className="text-slate-500 overflow-hidden text-ellipsis select-none">
                        {item.description}
                     </p>

                     <button

                        onClick={(e) => {
                           e.stopPropagation()
                           localStorage.getItem('token') ? handleAddCart(item._id)
                              :
                              navigate('/login')
                        }}
                        className="bg-slate-100 text-slate-600 py-2 w-full mt-5 cursor-pointer hover:bg-slate-200 transition duration-300"
                     >
                        Add to cart
                     </button>
                  </div>
               </div>
            </div>
         ))}



      </div>
   )
}

export default Item
