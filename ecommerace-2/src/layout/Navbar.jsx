import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from '../AuthContext';
import axios from '../axios';
import SearchCard from '../components/SearchCard';

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const [products, setProducts] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const token = localStorage.getItem('token')

    const { loggedIn, handleLogout, autoLogout } = useAuth()

    const [cartCount, setCartCount] = useState(0)

    const fetchCartItem = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const res = await axios.get('/cart/getCart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const items = res.data.cart || []

            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

            setCartCount(totalQuantity)

        } catch (err) {
            console.log('error getting cart', err)
        }
    }

    useEffect(() => {
        fetchCartItem()

        const handleUpdate = () => {
            fetchCartItem()
        }

        window.addEventListener('cartUpdated', handleUpdate)
        return () => removeEventListener('cartUpdated', handleUpdate)

    }, [])

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get('/products/getProducts')
                setProducts(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        getProduct()
    }, [])

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setDropDownOpen(false)
            setProducts([])
            return
        }
        const filtered = products.filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setProducts(filtered)
        setDropDownOpen(true)
    }, [searchTerm, products])

    return (
        <div className='fixed w-full z-50'>
            <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

                <Link
                    to="/"
                    className="text-2xl md:text-3xl font-bold cursor-pointer text-indigo-600"
                >
                    NexBuy
                </Link>


                <div className="flex lg:hidden items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <FaSearch />
                </div>


                <div className='hidden lg:flex gap-8 items-center text-[20px] font-semibold'>
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
                    <Link to="/">About</Link>
                    <Link to="/">Contact</Link>
                </div>


                <div className="hidden lg:flex items-center gap-8 justify-center relative">


                    <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                        <FaSearch />
                    </div>

                    {dropDownOpen && (
                            <div className="absolute top-12 left-0 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <div
                                            key={p._id}
                                            onClick={() => {
                                                navigate(`/product/${p._id}`)
                                                setSearchTerm('')
                                                setDropDownOpen(false)
                                            }}
                                            className="hover:bg-gray-100 transition px-3 py-2 cursor-pointer"
                                        >
                                            <SearchCard product={p} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-4 text-gray-500 text-center">
                                        No products found
                                    </div>
                                )}
                            </div>
                        )}

                    <div className="relative cursor-pointer" onClick={() => navigate(`/cart`)}>
                        <FaShoppingCart className='text-blue-400 text-[20px]' />
                        <button className="absolute -top-2 -right-3 flex items-center justify-center text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full cursor-pointer">{token ? cartCount : '0'}</button>
                    </div>

                    {
                        loggedIn ? (
                            <button onClick={handleLogout} className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                                Logout
                            </button>
                        ) : (
                            <button onClick={() => { navigate('/login'); window.scrollTo(0, 0) }} className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                                Login
                            </button>
                        )
                    }
                </div>

                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="lg:hidden">

                    <GiHamburgerMenu className='text-[20px] cursor-pointer' />
                </button>


                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm lg:hidden`}>
                    <Link to="/" className="block">Home</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/about" className="block">About</Link>
                    <Link to="/contact" className="block">Contact</Link>
                    {
                        loggedIn ? (
                            <button onClick={handleLogout} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                                Logout
                            </button>
                        ) : (
                            <button onClick={() => navigate('/login')} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                                Login
                            </button>
                        )
                    }
                </div>

            </nav>
        </div>
    )
}

export default Navbar
