import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
          <p className="text-gray-600">Level 1 - 0 XP</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Streak</h3>
          <p className="text-gray-600">0 days</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Badges</h3>
          <p className="text-gray-600">0 earned</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
