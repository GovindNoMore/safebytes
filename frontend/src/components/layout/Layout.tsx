import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-green-600">SafeBytes</h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
