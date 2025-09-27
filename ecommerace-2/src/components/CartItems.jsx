import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";


const CartItems = () => {
    const [selectedItems, setSelectedItems] = useState([])
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const getSelectedItems = async () => {
            try {
                const res = await axios.get('/cart/getCart')
                setSelectedItems(res.data.cart)
            } catch (err) {
                console.log(err);
            }
        }
        getSelectedItems()
    }, [])

    const handleDelete = async (productId) => {
        try {
            const res = await axios.delete(`/cart/deleteCart`, { data: { productId } })
            setSelectedItems((prev) => prev.filter(item => item.productId?._id !== productId))
            window.dispatchEvent(new Event('cartUpdated'))
        } catch (err) {
            console.log(err);
        }
    }

    const item = selectedItems.find((i) => i._id === id)


    const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0)


    const subtotal = selectedItems.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0)

    const tax = subtotal * 0.02
    const total = subtotal + tax

    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">
                        {totalItems} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {
                    selectedItems.map((product, index) => (
                        <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                            <div className="flex items-center md:gap-6 gap-3">
                                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={`https://next-buy-eight.vercel.app/${product.image}`}
                                        alt={product.productId?.title}
                                    />
                                </div>
                                <div>
                                    <p className="hidden md:block font-semibold">{product.productId?.title}</p>
                                    <div className="font-normal text-gray-500/70">
                                        <div className='flex items-center'>
                                            <p>Qty: {product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center">${(product.productId?.price * product.quantity).toFixed(2)}</p>
                            <button onClick={() => handleDelete(product.productId?._id)} className="cursor-pointer mx-auto">
                                <IoMdCloseCircle className='text-red-500 text-[20px]' />
                            </button>
                        </div>
                    ))
                }

                <button onClick={() => navigate('/')} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <FaArrowLeftLong className='text-indigo-500' />
                    Continue Shopping
                </button>
            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">No address found</p>
                        <button className="text-indigo-500 hover:underline cursor-pointer">
                            Change
                        </button>
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>${subtotal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>${tax.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>${total.toFixed(2)}</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                    Place Order
                </button>
            </div>
        </div>
    )
}

export default CartItems
