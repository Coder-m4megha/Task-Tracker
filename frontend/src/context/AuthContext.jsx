import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token')
        
        if (token) {
          // Set default headers for all axios requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Get user data
          const res = await axios.get('/api/users/me')
          setUser(res.data.data)
          setIsAuthenticated(true)
        }
      } catch (error) {
        // If token is invalid, remove it
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      } finally {
        setLoading(false)
      }
    }
    
    checkLoggedIn()
  }, [])
  
  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/signup', userData)
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token)
      
      // Set default headers for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      
      // Set user data
      setUser(res.data.user)
      setIsAuthenticated(true)
      
      toast.success('Registration successful!')
      return true
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return false
    }
  }
  
  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post('/api/auth/login', userData)
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token)
      
      // Set default headers for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      
      // Set user data
      setUser(res.data.user)
      setIsAuthenticated(true)
      
      toast.success('Login successful!')
      return true
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return false
    }
  }
  
  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token')
    
    // Remove default headers
    delete axios.defaults.headers.common['Authorization']
    
    // Reset state
    setUser(null)
    setIsAuthenticated(false)
    
    toast.info('Logged out successfully')
  }
  
  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const res = await axios.put('/api/users/me', userData)
      
      // Update user data
      setUser(res.data.data)
      
      toast.success('Profile updated successfully!')
      return true
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile'
      toast.error(message)
      return false
    }
  }
  
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      register,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}
