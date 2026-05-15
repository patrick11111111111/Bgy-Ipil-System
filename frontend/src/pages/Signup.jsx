import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, User, Lock, MapPin, Briefcase, AlertCircle, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1)
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

  const nextStep = () => {
    if (currentStep === 1 && (!username || !password)) {
      setError('Please fill in both username and password')
      return
    }
    if (currentStep === 2 && (!residentData.firstName || !residentData.lastName || !residentData.age || !residentData.gender)) {
      setError('Please fill in all required personal details')
      return
    }
    setError('')
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    setError('')
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!residentData.occupation || !residentData.address) {
      setError('Please fill in your occupation and address')
      return
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      await axios.post(`${apiUrl}/api/auth/register`, {
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

  const inputClass = "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white"

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-6 overflow-hidden text-foreground">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors dark:text-slate-400 dark:hover:text-white z-50"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="card-flat rounded-3xl p-8 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white p-1 shadow-md border">
              <img src="/logo.jpg" alt="Logo" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Resident Registration</h1>
            
            {/* Step Indicator */}
            <div className="mt-4 flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 w-6 rounded-full transition-colors ${s <= currentStep ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} 
                />
              ))}
              <span className="ml-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Step {currentStep} of 3</span>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-sm font-medium text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              {error}
            </motion.div>
          )}

          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Username</label>
                      <input
                        type="text"
                        required
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">First Name</label>
                      <input
                        name="firstName"
                        required
                        value={residentData.firstName}
                        onChange={handleResidentChange}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Last Name</label>
                      <input
                        name="lastName"
                        required
                        value={residentData.lastName}
                        onChange={handleResidentChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Middle Name (Optional)</label>
                    <input
                      name="middleName"
                      value={residentData.middleName}
                      onChange={handleResidentChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Gender</label>
                      <select
                        name="gender"
                        required
                        value={residentData.gender}
                        onChange={handleResidentChange}
                        className={inputClass}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Age</label>
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
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Occupation
                    </label>
                    <input
                      name="occupation"
                      required
                      placeholder="e.g. Teacher, Farmer"
                      value={residentData.occupation}
                      onChange={handleResidentChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 font-bold text-slate-900 transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
              >
                <ChevronLeft className="h-5 w-5" /> Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Continue <ChevronRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Complete Registration
              </button>
            )}
          </div>

          <div className="mt-8 text-center text-sm font-medium">
            <span className="text-slate-500">Already registered? </span>
            <Link to="/login" className="text-primary hover:underline underline-offset-4">
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
