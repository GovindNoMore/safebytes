import React from 'react'
import { Shield } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <header className="border-b border-gray-800/50 bg-[#0d1117]">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/icons/logo.png" 
              alt="SafeBytes" 
              className="w-12 h-12"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const nextEl = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextEl) {
                  nextEl.style.display = 'flex';
                }
              }}
            />
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center hidden">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-white">SafeBytes</h1>
          </div>
        </div>
      </header>
      <main className="text-white">{children}</main>
    </div>
  )
}

export default Layout