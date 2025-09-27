import axios from '../axios';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterComponent() {
    const [form, setForm] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        userError: '',
    });

    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        
        setErrors({ email: '', name: '', surname: '', password: '', userError: '' });
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        try {
            await axios.post('/users/register', form);
            navigate('/login');
        } catch (err) {
            const status = err.response?.status;
            const message = err.response?.data?.message || 'Invalid input';

            if (status >= 400 && status < 500) {
                if (status === 400 && message.toLowerCase().includes('exist')) {
                    setErrors((prev) => ({ ...prev, userError: message }));
                } else {
                    setErrors({
                        email: message.includes('email') ? message : '',
                        name: message.includes('Name') ? message : '',
                        surname: message.includes('Surname') ? message : '',
                        password: message.includes('Password') ? message : '',
                        userError: '',
                    });
                }
            } else {
                setErrors((prev) => ({ ...prev, userError: 'Server error. Try again later.' }));
            }

            
            timeoutRef.current = setTimeout(() => {
                setErrors({ email: '', name: '', surname: '', password: '', userError: '' });
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center items-center py-42">
            <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Sign up
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

                    <input
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                        type="text"
                        placeholder="Enter your surname"
                        required
                    />
                    {errors.surname && (
                        <p className="text-red-500 text-xs">{errors.surname}</p>
                    )}

                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs">{errors.password}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-indigo-500 py-2.5 rounded-full text-white cursor-pointer font-semibold disabled:opacity-60"
                    >
                        {loading ? 'Loading...' : 'Sign up'}
                    </button>

                    {errors.userError && (
                        <p className="text-red-500 text-xs text-center mt-2">{errors.userError}</p>
                    )}

                    <p className="text-center mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
