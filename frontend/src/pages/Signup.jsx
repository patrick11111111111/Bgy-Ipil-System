import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, User, Lock, MapPin, Briefcase, AlertCircle } from 'lucide-react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [residentData, setResidentData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    address: 'Echague, Isabela',
    occupation: '',
  })
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleResidentChange = (e) => {
    setResidentData({ ...residentData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username,
        password,
        role: 'resident',
        residentData
      })
      await login(username, password)
      navigate('/resident')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  const inputClass = "w-full rounded-xl border bg-background/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground"

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12 overflow-hidden text-foreground">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] h-[40rem] w-[40rem] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[50rem] w-[50rem] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
              <UserPlus className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Resident Registration</h1>
            <p className="text-muted-foreground mt-2">Join the municipal community portal</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 flex items-center gap-3 rounded-xl bg-destructive/10 p-4 text-sm font-medium text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-semibold">First Name</label>
                <input
                  name="firstName"
                  required
                  value={residentData.firstName}
                  onChange={handleResidentChange}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Middle Name</label>
                <input
                  name="middleName"
                  value={residentData.middleName}
                  onChange={handleResidentChange}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Last Name</label>
                <input
                  name="lastName"
                  required
                  value={residentData.lastName}
                  onChange={handleResidentChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Gender</label>
                <select
                  name="gender"
                  required
                  value={residentData.gender}
                  onChange={handleResidentChange}
                  className={inputClass}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Age</label>
                <input
                  name="age"
                  type="number"
                  required
                  value={residentData.age}
                  onChange={handleResidentChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Occupation
              </label>
              <input
                name="occupation"
                required
                value={residentData.occupation}
                onChange={handleResidentChange}
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Address
              </label>
              <input
                name="address"
                required
                value={residentData.address}
                onChange={handleResidentChange}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90"
            >
              Initialize Account
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium">
            <span className="text-muted-foreground">Already registered? </span>
            <Link to="/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
