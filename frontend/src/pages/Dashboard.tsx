// frontend/src/pages/Dashboard.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Target, Zap, Shield, Mail, Lock, Eye, ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

const Dashboard: React.FC = () => {
  const stats = [
    { icon: Trophy, label: 'Level', value: '1', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
    { icon: Zap, label: 'XP Points', value: '0', color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
    { icon: Target, label: 'Lessons', value: '0/20', color: 'text-green-400', bgColor: 'bg-green-500/20' },
    { icon: Shield, label: 'Badges', value: '0', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  ]

  const simulators = [
    {
      title: 'Phishing Email Detector',
      description: 'Test your skills identifying malicious emails',
      icon: Mail,
      difficulty: 'Beginner to Advanced',
      emails: '8 scenarios',
      color: 'from-red-500 to-pink-500',
      link: '/simulator'
    },
    {
      title: 'Password Security',
      description: 'Learn to create unbreakable passwords',
      icon: Lock,
      difficulty: 'Coming Soon',
      emails: '6 challenges',
      color: 'from-blue-500 to-cyan-500',
      link: '#'
    },
    {
      title: 'Privacy Tracker',
      description: 'Understand online tracking and protection',
      icon: Eye,
      difficulty: 'Coming Soon',
      emails: '5 lessons',
      color: 'from-green-500 to-emerald-500',
      link: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/logo/android-chrome-192x192.png" 
                alt="SafeBytes Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">SafeBytes</span>
            </Link>
            
            <nav className="flex items-center space-x-8">
              <Link to="/dashboard" className="text-white font-medium">Dashboard</Link>
              <Link to="/simulator" className="text-gray-400 hover:text-white transition-colors">Simulator</Link>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                Profile
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-gray-400 text-lg">Continue your cybersecurity learning journey</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Simulator - Phishing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-red-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-8 border border-red-500/30 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Ready for a Challenge?</h2>
              <p className="text-gray-300 text-lg mb-4">
                Test your skills with our interactive phishing email simulator
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>8 realistic scenarios</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>Earn XP & badges</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Learn from mistakes</span>
                </span>
              </div>
            </div>
            <Link
              to="/simulator"
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Play className="w-5 h-5" />
              <span>Start Simulator</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* All Simulators Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Training Simulators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulators.map((simulator, index) => (
              <motion.div
                key={simulator.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${simulator.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <simulator.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{simulator.title}</h3>
                <p className="text-gray-400 mb-4">{simulator.description}</p>
                
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-500">{simulator.emails}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    simulator.difficulty === 'Coming Soon' 
                      ? 'bg-gray-700 text-gray-400' 
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {simulator.difficulty}
                  </span>
                </div>

                {simulator.difficulty === 'Coming Soon' ? (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-700 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <Link
                    to={simulator.link}
                    className={`block w-full py-3 bg-gradient-to-r ${simulator.color} hover:opacity-90 text-white rounded-lg font-semibold text-center transition-all group-hover:scale-105`}
                  >
                    Start Training
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Path Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Your Learning Path</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Beginner Security Basics</h3>
                <p className="text-gray-400 text-sm">Complete 5 modules to level up</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">0%</div>
                <div className="text-sm text-gray-400">Complete</div>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Phishing Detection</div>
                  <div className="text-xs text-gray-400">Not started</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg opacity-50">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Password Security</div>
                  <div className="text-xs text-gray-400">Locked</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30"
        >
          <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span>Security Tip of the Day</span>
          </h3>
          <p className="text-gray-300">
            Always verify the sender's email address carefully. Attackers often use domains that look similar to legitimate ones (like "amazone.com" instead of "amazon.com").
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard