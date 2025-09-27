import React, { createContext, useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

   const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

   const handleLogout = () => {
      localStorage.removeItem('token')
      setLoggedIn(false)
   }

   const handleLogin = (token) => {
      localStorage.setItem('token', token)
      setLoggedIn(true)
   }

   const autoLogout = async () => {
      const token = localStorage.getItem('token')
      if (!token) return null
      try {
         const decoded = jwtDecode(token)
         const currentTime = Date.now() / 1000
         if (decoded.exp < currentTime) {
              handleLogout()
         }
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <AuthContext.Provider value={{ loggedIn, handleLogin, handleLogout, autoLogout }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)
