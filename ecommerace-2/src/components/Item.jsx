import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'

const Item = () => {
   const [products, setProducts] = useState([])
   const [loading, setLoading] = useState(true)
   const navigate = useNavigate()

   useEffect(() => {
      const getProducts = async () => {
         try {
            const res = await axios.get('/products/getProducts')
            setProducts(res.data || [])
         } catch (err) {
            console.log(err)
         } finally {
            setLoading(false)
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
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
                * { font-family: 'Poppins', sans-serif; }
            `}</style>

         
         {loading ? (
            <div className="flex flex-col items-center justify-center mt-20">
               <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="mt-4 text-gray-500 font-medium">Loading products...</p>
            </div>
         ) : (
            products.length > 0 ? (
               products.map(item => (
                  <div key={item._id} className="flex flex-col bg-white shadow-md w-72 max-h-[500px]">
                     <div onClick={() => { navigate(`/product/${item._id}`); window.scrollTo(0, 0) }}>
                        <img className='w-72 h-48 object-cover' src={`https://nextbuy-xpvm.onrender.com${item.image}`} alt="image" />
   
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
                                    : navigate('/login')
                              }}
                              className="bg-slate-100 text-slate-600 py-2 w-full mt-5 cursor-pointer hover:bg-slate-200 transition duration-300"
                           >
                              Add to cart
                           </button>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <h1 className='font-semibold text-gray-400'>Not Products Yet</h1>
            )
         )}
      </div>
   )
}

export default Item
