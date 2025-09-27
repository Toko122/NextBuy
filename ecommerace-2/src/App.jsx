import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import Navbar from './layout/Navbar'
import { Cart } from './pages/Cart'
import { Login } from './pages/Login'
import RegisterComponent from './components/RegisterComponent'
import SelectedItem from './components/SelectedItem'
import Footer from './layout/Footer'
import { useEffect } from 'react'
import { useAuth } from './AuthContext'
import AdminPage from './admin/AdminPage'
import Create from './admin/Create'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

function App() {

  const { handleLogin, autoLogout } = useAuth()

  useEffect(() => {
    autoLogout()
  }, [handleLogin])

  return (

    <>

      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterComponent />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/product/:id' element={<SelectedItem />} />

            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />

            <Route path='/admin' element={<AdminPage />} />
            <Route path='/create' element={<Create />} />

          </Routes>
        </main>

        <Footer />
      </div>

    </>
  )
}

export default App
