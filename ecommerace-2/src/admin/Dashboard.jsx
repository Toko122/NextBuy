import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get('/products/getProducts')
                setProducts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])

    const handleDelete = async (productId) => {
        try {
            const res = await axios.delete('/products/deleteProduct', { data: { productId } })
            setProducts((prev) => prev.filter((item) => item._id !== productId))
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full px-6 md:px-12 lg:px-[450px] py-10">
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-semibold">Products</h1>
                <button onClick={() => navigate('/create')} className="bg-green-800 rounded-md py-1.5 px-4 text-center text-white font-semibold w-fit cursor-pointer hover:bg-green-900 transition duration-200">
                    Create New
                </button>

                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700 text-left">
                            <tr>
                                <th className="py-3 px-4 border-b text-center">#</th>
                                <th className="py-3 px-4 border-b text-center">Image</th>
                                <th className="py-3 px-4 border-b text-center">Title</th>
                                <th className="py-3 px-4 border-b text-center">Price</th>
                                <th className="py-3 px-4 border-b text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="py-3 px-4 border-b text-center">{index + 1}</td>
                                    <td className="py-3 px-4 border-b">
                                        <div className="flex justify-center">
                                            <img
                                                src={`http://localhost:5000${product.image}`}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        </div>
                                    </td>

                                    <td className="py-3 px-4 text-center border-b max-w-[200px] truncate">
                                        {product.title}
                                    </td>
                                    <td className="py-3 px-4 border-b text-center font-semibold">${(product.price).toFixed(2)}</td>
                                    <td className="py-3 px-4 border-b text-center">
                                        <button className="bg-blue-600 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-blue-700 transition">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded-md ml-2 hover:bg-red-700 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
