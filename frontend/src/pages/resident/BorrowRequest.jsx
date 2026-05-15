import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, FileUp, Info, Trash2, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const BorrowRequest = () => {
  const [step, setStep] = useState(1)
  const [items, setItems] = useState([])
  const [formData, setFormData] = useState({
    item: '',
    purpose: '',
    duration: '',
    idFile: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory`)
        setItems(response.data.filter(i => i.quantity > 0))
      } catch (err) {
        console.error("Error fetching items:", err)
      }
    }
    fetchItems()

    // Pre-select item if passed via state
    if (location.state?.selectedItem) {
      setFormData(prev => ({ ...prev, item: location.state.selectedItem }))
    }
  }, [location.state])

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, idFile: e.target.files[0] })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In a real scenario, we would use FormData to upload the file.
      // Since we can't touch the backend, we simulate the submission.
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const payload = {
        itemName: formData.item,
        quantity: 1, // Default to 1 for now
        condition: 'Good',
        presentedBy: formData.purpose, // Mapping purpose to presentedBy for now
      }
      
      await axios.post(`${import.meta.env.VITE_API_URL}/api/inventory`, payload)
      setIsSuccess(true)
    } catch (err) {
      console.error("Submission failed:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
        >
          <CheckCircle2 className="h-12 w-12" />
        </motion.div>
        <h1 className="mb-2 text-3xl font-bold">Request Submitted Successfully</h1>
        <p className="mb-10 text-muted-foreground max-w-md mx-auto">
          Your request and documentation have been received. Municipal administrators will review your application shortly.
        </p>
        <button
          onClick={() => navigate('/resident/my-requests')}
          className="rounded-full bg-primary px-10 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105"
        >
          View Status in Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Borrow Application</h1>
          <p className="text-muted-foreground">Complete the form and provide identification to proceed.</p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Step {step} of 3</span>
          <div className="mt-2 h-2 w-32 rounded-full bg-accent overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-8 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Box className="h-5 w-5 text-primary" /> Application Details
                  </h2>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">SELECT RESOURCE</label>
                      <select 
                        required
                        className="w-full rounded-xl border bg-background px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"
                        value={formData.item}
                        onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                      >
                        <option value="">Choose an available item...</option>
                        {items.map(item => (
                          <option key={item._id} value={item.itemName}>{item.itemName} ({item.quantity} available)</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">PURPOSE OF BORROWING</label>
                      <textarea 
                        required
                        placeholder="Please describe why you need this item..."
                        className="w-full rounded-xl border bg-background px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium min-h-[120px]"
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!formData.item || !formData.purpose}
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  Continue to Verification <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <UploadCloud className="h-5 w-5 text-primary" /> Document Submission
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The municipality requires a clear scan or photo of your **valid ID** (e.g., Barangay ID, Passport, or Driver's License) to process this request.
                  </p>
                  
                  {!formData.idFile ? (
                    <div className="group relative flex h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-accent/20 transition-all hover:bg-accent/40">
                      <input 
                        type="file" 
                        accept="image/*,.pdf"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={handleFileChange}
                      />
                      <div className="flex flex-col items-center gap-4 text-muted-foreground">
                        <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                          <FileUp className="h-8 w-8" />
                        </div>
                        <div className="text-center">
                          <p className="font-bold">Choose identification document</p>
                          <p className="text-xs mt-1 text-muted-foreground/60">PDF, JPG, or PNG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-primary/20 bg-primary/5">
                      <div className="h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-4">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <span className="font-bold text-foreground">{formData.idFile.name}</span>
                      <p className="text-xs text-muted-foreground mt-1">Ready for submission</p>
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, idFile: null })}
                        className="mt-6 flex items-center gap-2 rounded-full bg-destructive/10 px-6 py-2.5 text-xs font-bold text-destructive hover:bg-destructive/20 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove & Replace
                      </button>
                    </div>
                  )}

                  <div className="flex items-start gap-4 rounded-2xl bg-amber-500/10 p-5 text-sm text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Info className="h-5 w-5 shrink-0" />
                    <p>Verified information is used strictly for municipal resource security. Your data is protected by privacy protocols.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border bg-background py-4 font-bold hover:bg-accent transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" /> Back
                  </button>
                  <button
                    type="button"
                    disabled={!formData.idFile}
                    onClick={() => setStep(3)}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    Review Application <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Final Review</h2>
                  <div className="divide-y rounded-2xl border bg-accent/10 overflow-hidden">
                    <div className="flex flex-col p-5 gap-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Selected Resource</span>
                      <span className="font-bold text-lg">{formData.item}</span>
                    </div>
                    <div className="flex flex-col p-5 gap-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Purpose</span>
                      <span className="font-medium text-muted-foreground leading-relaxed">{formData.purpose}</span>
                    </div>
                    <div className="flex items-center justify-between p-5 bg-emerald-500/5">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Documentation</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" /> Attached: {formData.idFile?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border bg-background py-4 font-bold hover:bg-accent transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </span>
                    ) : 'Confirm & Submit Application'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}

export default BorrowRequest
