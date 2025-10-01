// frontend/src/pages/Simulator.tsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, AlertTriangle, CheckCircle, XCircle, Shield, Trophy, Zap, Target, ArrowRight, RotateCcw, Home } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Email data structure
interface Email {
  id: number
  from: string
  subject: string
  body: string
  isPhishing: boolean
  redFlags: string[]
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

// Phishing emails database
const phishingEmails: Email[] = [
  {
    id: 1,
    from: 'security@amazone-verify.com',
    subject: 'URGENT: Your Amazon Account Has Been Suspended',
    body: `Dear Valued Customer,

We have detected suspicious activity on your Amazon account. Your account has been temporarily suspended for security reasons.

To restore your account immediately, please verify your identity by clicking the link below:

🔗 Verify Account Now: http://amazon-security-verify.com/login

If you do not verify within 24 hours, your account will be permanently closed and all pending orders will be cancelled.

This is an automated message. Please do not reply to this email.

Thank you,
Amazon Security Team`,
    isPhishing: true,
    redFlags: [
      'Misspelled domain: "amazone-verify.com" instead of "amazon.com"',
      'Creates urgency: "24 hours" threat',
      'Suspicious link that doesn\'t match Amazon\'s domain',
      'Generic greeting: "Dear Valued Customer"',
      'Threats of account closure'
    ],
    explanation: 'This is a classic phishing email! Amazon would never suspend accounts via email or ask you to click suspicious links. The domain "amazone-verify.com" is fake. Always check URLs carefully and go directly to the official website instead of clicking email links.',
    difficulty: 'easy'
  },
  {
    id: 2,
    from: 'notifications@linkedin.com',
    subject: 'You have 3 new profile views',
    body: `Hi there,

Your profile has been viewed by 3 professionals in the last week:

• Sarah Johnson - Senior HR Manager at Tech Corp
• Michael Chen - Recruiter at Innovation Labs  
• Lisa Anderson - Talent Acquisition Lead

View your full profile analytics and see who's interested in connecting with you.

Best,
The LinkedIn Team

© 2024 LinkedIn Corporation, 1000 W Maude Ave, Sunnyvale, CA 94085`,
    isPhishing: false,
    redFlags: [],
    explanation: 'This is a legitimate LinkedIn notification! The email uses the correct domain (@linkedin.com), has professional formatting, includes real company information, and the content matches typical LinkedIn notifications. There are no urgent threats or suspicious links.',
    difficulty: 'easy'
  },
  {
    id: 3,
    from: 'no-reply@paypal-security.net',
    subject: 'Payment Hold - Action Required',
    body: `Hello,

We've placed a hold on a recent payment of $487.99 to your account due to unusual activity.

Transaction Details:
- Amount: $487.99
- Merchant: Electronics Store Online
- Date: Today

To release this payment, please confirm your identity:
👉 Confirm Payment: http://paypal-verify.net/confirm

If you did not authorize this transaction, click here to dispute:
👉 Dispute Transaction: http://paypal-verify.net/dispute

You have 48 hours to respond before the payment is reversed.

PayPal Security Center`,
    isPhishing: true,
    redFlags: [
      'Wrong domain: "paypal-security.net" instead of "paypal.com"',
      'Generic greeting: "Hello" instead of your name',
      'Creates urgency with 48-hour deadline',
      'Suspicious URLs that don\'t match PayPal\'s domain',
      'Vague merchant name',
      'Email from "no-reply" asking for action'
    ],
    explanation: 'This is phishing! PayPal uses only @paypal.com addresses. The fake domain "paypal-security.net" is a huge red flag. PayPal would never ask you to click links to verify payments - you should always log in directly to their website.',
    difficulty: 'medium'
  },
  {
    id: 4,
    from: 'hr@yourcompany.com',
    subject: 'Updated Employee Benefits Package - Please Review',
    body: `Hi Team,

We've updated our employee benefits package for 2024. Please review the changes and acknowledge receipt.

Key Updates:
✓ Enhanced health insurance coverage
✓ Increased 401(k) matching to 6%
✓ Additional vacation days
✓ New wellness programs

📄 View Full Benefits Guide: [Internal Portal Link]

Please log into the HR portal at hr.yourcompany.com to review and acknowledge by Friday.

If you have questions, contact HR at extension 2301.

Best regards,
Jennifer Smith
HR Director
YourCompany Inc.`,
    isPhishing: false,
    redFlags: [],
    explanation: 'This appears to be a legitimate internal email. It uses your company domain, has professional formatting, provides specific details, includes contact information, and directs you to the official company portal. However, always verify with HR directly if you\'re unsure!',
    difficulty: 'medium'
  },
  {
    id: 5,
    from: 'security-alert@microsoft-account.com',
    subject: 'Microsoft Account: Unusual Sign-in Activity',
    body: `Microsoft Account Security Alert

We detected an unusual sign-in attempt to your Microsoft account from:

Location: Lagos, Nigeria
IP Address: 197.210.52.143
Device: Linux PC
Time: Today at 3:42 AM

If this was you, you can safely ignore this email.

If this wasn't you, your account may be compromised. Secure your account immediately:

🔐 Secure My Account: http://microsoft-security-center.com/verify

This link expires in 6 hours for security reasons.

Microsoft Account Team
One Microsoft Way, Redmond, WA 98052`,
    isPhishing: true,
    redFlags: [
      'Domain is "microsoft-account.com" not "microsoft.com"',
      'Creates fear with "compromised" language',
      'Suspicious verification link',
      'Time pressure: "expires in 6 hours"',
      'Foreign location used to create panic',
      'Real Microsoft emails link to account.microsoft.com'
    ],
    explanation: 'This is a sophisticated phishing attempt! While it looks professional, the domain "microsoft-account.com" is fake. Microsoft uses "microsoft.com" or "account.microsoft.com". The scammers use fear (Nigeria location) and urgency (6 hours) to make you act quickly without thinking.',
    difficulty: 'hard'
  },
  {
    id: 6,
    from: 'team@github.com',
    subject: 'Pull request #247 merged into main branch',
    body: `@username merged pull request #247 into yourrepo/main

Changes:
• Updated authentication middleware
• Fixed security vulnerability in login endpoint  
• Added rate limiting to API

View Pull Request: https://github.com/yourrepo/pull/247
View Commit: https://github.com/yourrepo/commit/a3f8b2c

4 files changed, 87 insertions(+), 23 deletions(-)

You can reply to this email or visit GitHub to comment.

GitHub, Inc.
88 Colin P Kelly Jr St, San Francisco, CA 94107`,
    isPhishing: false,
    redFlags: [],
    explanation: 'This is a legitimate GitHub notification. It uses the official @github.com domain, includes specific technical details (file counts, commit hashes), has valid GitHub URLs (github.com), and matches the typical format of GitHub notifications. The content is technical and specific to your repository.',
    difficulty: 'medium'
  },
  {
    id: 7,
    from: 'billing@apple-support.services',
    subject: 'Your Apple ID Has Been Charged $99.99',
    body: `Dear Customer,

Your Apple ID (your.email@gmail.com) has been charged $99.99 for an Apple Music subscription.

INVOICE #APL-2024-89472
Date: Today
Amount: $99.99
Payment Method: Visa ending in 4532

If you did not authorize this charge, your account may have been accessed by an unauthorized user.

CANCEL THIS CHARGE IMMEDIATELY:
🔴 Cancel & Refund: http://apple-support.services/cancel-charge

You have 2 hours to dispute this charge or it will be final.

Apple Support
Cupertino, CA`,
    isPhishing: true,
    redFlags: [
      'Fake domain: "apple-support.services" not "apple.com"',
      'Creates panic with unauthorized charge',
      'Extreme urgency: "2 hours"',
      'Suspicious cancellation link',
      'Generic "Dear Customer" greeting',
      'Real Apple emails come from @apple.com or @email.apple.com'
    ],
    explanation: 'This is phishing! Apple uses @apple.com or @email.apple.com domains only. The scammers create panic with a fake charge and extreme time pressure (2 hours). Apple would never send cancellation links via email. Always check your purchases directly in the App Store or Apple ID settings.',
    difficulty: 'hard'
  },
  {
    id: 8,
    from: 'noreply@netflix.com',
    subject: 'Your Netflix membership has been cancelled',
    body: `Hi,

We're sorry to see you go. Your Netflix membership has been cancelled and you won't be charged again.

Membership Details:
• Plan: Premium (4K)
• Last billing date: March 1, 2024
• Cancellation date: Today

Your account will remain active until the end of your current billing period (March 31, 2024).

Changed your mind? You can restart your membership anytime:
Restart Membership: https://www.netflix.com/restart

Questions? Visit our Help Center at help.netflix.com

Netflix, Inc.
Los Gatos, CA`,
    isPhishing: false,
    redFlags: [],
    explanation: 'This is a legitimate Netflix email. It uses the official @netflix.com domain, links go to netflix.com (always verify!), has specific account details, and no urgent threats or suspicious requests. The tone is professional and informative without creating panic.',
    difficulty: 'easy'
  }
]

const Simulator: React.FC = () => {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [userChoice, setUserChoice] = useState<'safe' | 'phishing' | null>(null)
  const [streak, setStreak] = useState(0)
  const [answeredEmails, setAnsweredEmails] = useState<number[]>([])
  const [xpEarned, setXpEarned] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)

  const currentEmail = phishingEmails[currentEmailIndex]
  const totalEmails = phishingEmails.length
  const progress = ((answeredEmails.length) / totalEmails) * 100

  const handleChoice = (choice: 'safe' | 'phishing') => {
    setUserChoice(choice)
    const isCorrect = (choice === 'phishing') === currentEmail.isPhishing
    
    if (isCorrect) {
      const xpGain = currentEmail.difficulty === 'hard' ? 30 : currentEmail.difficulty === 'medium' ? 20 : 10
      setScore(score + xpGain)
      setXpEarned(xpGain)
      setStreak(streak + 1)
    } else {
      setStreak(0)
      setXpEarned(0)
    }
    
    setShowResult(true)
    setAnsweredEmails([...answeredEmails, currentEmail.id])
  }

  const nextEmail = () => {
    if (currentEmailIndex < totalEmails - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1)
      setShowResult(false)
      setUserChoice(null)
      setShowFeedback(false)
    }
  }

  const resetSimulation = () => {
    setCurrentEmailIndex(0)
    setScore(0)
    setShowResult(false)
    setUserChoice(null)
    setStreak(0)
    setAnsweredEmails([])
    setXpEarned(0)
    setShowFeedback(false)
  }

  const isCorrect = userChoice && (userChoice === 'phishing') === currentEmail.isPhishing

  useEffect(() => {
    if (showResult) {
      setTimeout(() => setShowFeedback(true), 300)
    }
  }, [showResult])

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
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
            
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/simulator" className="text-white font-medium">Simulator</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Phishing Detection Simulator</h1>
          <p className="text-gray-400 text-lg">Can you spot the phishing emails?</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/5 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Score</span>
            </div>
            <div className="text-2xl font-bold">{score} XP</div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-gray-400">Streak</span>
            </div>
            <div className="text-2xl font-bold">{streak} 🔥</div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-2 mb-1">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Progress</span>
            </div>
            <div className="text-2xl font-bold">{answeredEmails.length}/{totalEmails}</div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Accuracy</span>
            </div>
            <div className="text-2xl font-bold">
              {answeredEmails.length > 0 ? Math.round((score / (answeredEmails.length * 20)) * 100) : 0}%
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Email {currentEmailIndex + 1} of {totalEmails}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Email Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEmailIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden mb-6"
          >
            {/* Email Header */}
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">Inbox</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  currentEmail.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                  currentEmail.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {currentEmail.difficulty.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">From:</span>{' '}
                  <span className="text-gray-900">{currentEmail.from}</span>
                </div>
                <div>
                  <span className="font-semibold">Subject:</span>{' '}
                  <span className="text-gray-900 font-medium">{currentEmail.subject}</span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6 bg-white">
              <div className="text-gray-800 whitespace-pre-line leading-relaxed">
                {currentEmail.body}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        {!showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <button
              onClick={() => handleChoice('safe')}
              className="flex-1 sm:flex-initial bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>This is Safe</span>
            </button>
            
            <button
              onClick={() => handleChoice('phishing')}
              className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>This is Phishing</span>
            </button>
          </motion.div>
        )}

        {/* Result Feedback */}
        <AnimatePresence>
          {showResult && showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`rounded-xl p-6 mb-6 border ${
                isCorrect
                  ? 'bg-green-600/10 border-green-600'
                  : 'bg-red-600/10 border-red-600'
              }`}
            >
              {/* Result Header */}
              <div className="flex items-center space-x-3 mb-4">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">Correct! 🎉</h3>
                      <p className="text-green-300">+{xpEarned} XP earned</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 text-red-400" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">Not Quite</h3>
                      <p className="text-red-300">Keep learning!</p>
                    </div>
                  </>
                )}
              </div>

              {/* Explanation */}
              <div className="bg-white/5 rounded-lg p-4 mb-4 border border-gray-800">
                <h4 className="font-semibold text-white mb-2">Explanation:</h4>
                <p className="text-gray-300 leading-relaxed">{currentEmail.explanation}</p>
              </div>

              {/* Red Flags */}
              {currentEmail.isPhishing && currentEmail.redFlags.length > 0 && (
                <div className="bg-white/5 rounded-lg p-4 mb-4 border border-gray-800">
                  <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span>Red Flags to Watch For:</span>
                  </h4>
                  <ul className="space-y-2">
                    {currentEmail.redFlags.map((flag, index) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {currentEmailIndex < totalEmails - 1 ? (
                  <button
                    onClick={nextEmail}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Next Email</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={resetSimulation}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Complete! View Results</span>
                  </button>
                )}
                
                <button
                  onClick={resetSimulation}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Start Over</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Stats */}
        {answeredEmails.length === totalEmails && showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 rounded-xl p-8 border border-gray-800 text-center"
          >
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Simulation Complete! 🎊</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="text-3xl font-bold text-blue-400">{score}</div>
                <div className="text-gray-400">Total XP</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">
                  {Math.round((score / (totalEmails * 20)) * 100)}%
                </div>
                <div className="text-gray-400">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">{streak}</div>
                <div className="text-gray-400">Best Streak</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">{answeredEmails.length}</div>
                <div className="text-gray-400">Emails Reviewed</div>
              </div>
            </div>
            <button
              onClick={resetSimulation}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Simulator