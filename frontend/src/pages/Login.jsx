import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { LogIn, User, Lock, AlertCircle, ArrowLeft } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login(username, password)
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/resident')
      }
    } catch (err) {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors dark:text-slate-400 dark:hover:text-white z-50"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="card-flat rounded-3xl p-8 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-1 shadow-md border">
              <img src="/logo.jpg" alt="Barangay Ipil Logo" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Municipal Portal</h1>
            <p className="text-center text-slate-600 dark:text-slate-400 mt-2">
              Sign in to manage your borrow requests
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-sm font-medium text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 px-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 px-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium">
            <span className="text-slate-500">New resident? </span>
            <Link to="/signup" className="text-primary hover:underline underline-offset-4">
              Register here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
