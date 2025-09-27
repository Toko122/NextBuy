import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios';
import { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function LoginComponent() {

    const [form, setForm] = useState({ email: '', password: '' })
    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('/users/login', form)
            navigate('/')
            handleLogin(res.data.token)
        } catch (err) {
            setError(err.response?.data.message || "Error Login User")
            setTimeout(() => setError(''), 3000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome back</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" onChange={handleChange} className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" required />
                <input name="password" onChange={handleChange} className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="password" placeholder="Enter your password" required />
                <div className="text-right py-4">
                    <Link to='/forgot-password' className="text-blue-600 underline cursor-pointer">Forgot Password</Link>
                </div>
                <button type="submit" className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full font-semibold text-white cursor-pointer">{loading ? 'Loading...' : 'Log in'}</button>

                {
                    error && (
                        <div className="flex items-center justify-center ml-[7px] max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded-sm">
                            <div className="flex items-center">
                                <p className="text-sm ml-2">{error}</p>
                            </div>
                        </div>
                    )
                }

            </form>
            <p className="text-center mt-4">Don’t have an account? <Link to="/register" className="text-blue-500 underline">Signup</Link></p>
            <button type="button" className="cursor-pointer w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white">
                <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="appleLogo" />
                Log in with Apple
            </button>
            <button type="button" className="cursor-pointer w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
                <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                Log in with Apple
            </button>
        </div>
    );
};