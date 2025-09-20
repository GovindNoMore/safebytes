// frontend/src/pages/Home.tsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Play, Users, Award, ArrowRight, CheckCircle, Lock, Target } from 'lucide-react'
import BotCharacter from '../components/common/BotCharacter'

const Home: React.FC = () => {
  const [currentBotMessage, setCurrentBotMessage] = useState(0)
  const [showBot, setShowBot] = useState(false)

  const botMessages = [
    "Hi! I'm ByteBot, your cybersecurity learning companion.",
    "Ready to master digital security? Let's start your journey!",
    "I'll help you learn through interactive challenges and real scenarios.",
    "Click 'Start Learning' to begin your first security lesson!"
  ]

  useEffect(() => {
    const showTimer = setTimeout(() => setShowBot(true), 2000)
    
    const messageTimer = setInterval(() => {
      setCurrentBotMessage((prev) => (prev + 1) % botMessages.length)
    }, 5000)

    return () => {
      clearTimeout(showTimer)
      clearInterval(messageTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">SafeBytes</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it works</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
              <Link 
                to="/dashboard" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors font-medium"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
              Learn cybersecurity 
              <br />
              <span className="text-gray-400">the smart way</span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl">
              Master digital security through interactive simulations and gamified learning. 
              Build real skills that protect you and your organization from cyber threats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors group"
              >
                Start learning
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-lg transition-colors">
                <Play className="mr-2 w-4 h-4" />
                Watch demo
              </button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Interactive simulations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Real-world scenarios</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Progress tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything you need to stay secure
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive cybersecurity training designed for modern professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Phishing Detection</h3>
              <p className="text-gray-400 leading-relaxed">
                Practice identifying malicious emails with our realistic inbox simulator. 
                Learn to spot red flags before they become security incidents.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Password Security</h3>
              <p className="text-gray-400 leading-relaxed">
                Master password creation and management through interactive challenges. 
                Build habits that protect your digital identity.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy Protection</h3>
              <p className="text-gray-400 leading-relaxed">
                Understand data tracking and learn to configure privacy settings. 
                Take control of your digital footprint.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Training</h3>
              <p className="text-gray-400 leading-relaxed">
                Scale security awareness across your organization with team challenges 
                and progress tracking.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gamified Learning</h3>
              <p className="text-gray-400 leading-relaxed">
                Earn points, unlock badges, and track your progress as you master 
                cybersecurity fundamentals.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Scenarios</h3>
              <p className="text-gray-400 leading-relaxed">
                Experience realistic cyber threats in a safe environment. 
                Learn from mistakes without real-world consequences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">10,000+</div>
              <div className="text-gray-400">Learners trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">50+</div>
              <div className="text-gray-400">Interactive scenarios</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">95%</div>
              <div className="text-gray-400">Completion rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-400">AI assistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to build your cyber skills?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've strengthened their security knowledge 
            through hands-on, interactive learning.
          </p>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors group text-lg"
          >
            Start learning today
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">SafeBytes</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 SafeBytes. Making the internet safer, one learner at a time.
            </p>
          </div>
        </div>
      </footer>

      {/* Bot Character */}
      <BotCharacter 
        message={botMessages[currentBotMessage]}
        isVisible={showBot}
        onMessageClick={() => setCurrentBotMessage((prev) => (prev + 1) % botMessages.length)}
      />
    </div>
  )
}

export default Home