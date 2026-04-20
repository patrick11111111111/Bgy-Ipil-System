import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Modal from './ui/Modal'

const PublicLayout = () => {
  const [activeModal, setActiveModal] = useState(null) // 'privacy' | 'terms' | null

  const closeModal = () => setActiveModal(null)

  const privacyContent = (
    <div className="space-y-4 text-sm md:text-base">
      <p><strong>Basically, we respect your data.</strong></p>
      <p>We only collect what we absolutely need to verify you're a real resident and to keep track of who has our municipal equipment. This usually means your name, address, and a copy of your ID.</p>
      <p>We don't sell your info to anyone. We don't use it for marketing. It stays within the municipal portal solely for borrowing purposes.</p>
      <p>If you want to know what we have on file or want it deleted, just reach out to the municipal office. We're humans, not a faceless corporation.</p>
    </div>
  )

  const termsContent = (
    <div className="space-y-4 text-sm md:text-base">
      <p><strong>Don't break the stuff, and bring it back on time.</strong></p>
      <ul className="list-disc pl-5 space-y-2">
        <li>You're responsible for the equipment while you have it. If it gets damaged or lost, we'll have to talk about repairs or replacement.</li>
        <li>Bring it back when you said you would. Other neighbors might be waiting for that same tent or sound system.</li>
        <li>Be honest with your documentation. Fake IDs are a big no-no and will get you banned from the platform (and possibly more).</li>
        <li>Treat the staff with respect when picking up or dropping off. They're here to help the community.</li>
      </ul>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Outlet />
        </div>
      </main>

      {/* Footer - No BS, flat design */}
      <footer className="relative z-10 border-t py-6 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
            <p className="text-slate-500">© 2024 Barangay Ipil. All rights reserved.</p>
            <div className="flex gap-6 text-slate-500 font-medium">
              <button 
                onClick={() => setActiveModal('privacy')}
                className="hover:text-primary transition-colors"
              >
                Privacy
              </button>
              <button 
                onClick={() => setActiveModal('terms')}
                className="hover:text-primary transition-colors"
              >
                Terms
              </button>
              <span className="text-gray-400 cursor-not-allowed opacity-60 text-xs">Coming Soon</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Privacy Policy"
      >
        {privacyContent}
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="Terms of Service"
      >
        {termsContent}
      </Modal>
    </div>
  )
}

export default PublicLayout
