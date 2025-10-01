// frontend/src/components/common/BotCharacter.tsx
import React, { useState } from 'react'
import { Bot, X } from 'lucide-react'

interface BotCharacterProps {
  message: string
  isVisible: boolean
  onMessageClick?: () => void
}

const BotCharacter: React.FC<BotCharacterProps> = ({ 
  message, 
  isVisible, 
  onMessageClick 
}) => {
  const [showMessage, setShowMessage] = useState(true)

  const handleBotClick = () => {
    if (onMessageClick) {
      onMessageClick()
    }
  }

  const handleCloseMessage = () => {
    setShowMessage(false)
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
    }`}>
      {/* Speech bubble */}
      {message && showMessage && (
        <div className="mb-4 mr-2 max-w-xs">
          <div className="bg-gray-900 border border-gray-700/50 rounded-xl p-4 relative shadow-lg backdrop-blur-sm">
            {/* Close button */}
            <button 
              onClick={handleCloseMessage}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-blue-400 mb-1">ByteBot</div>
                <p className="text-sm text-gray-300 leading-relaxed">{message}</p>
              </div>
            </div>
            
            {/* Speech bubble arrow */}
            <div className="absolute bottom-0 right-6 transform translate-y-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}

      {/* Bot Avatar */}
      <div 
        className={`w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 rounded-full cursor-pointer shadow-lg transition-all duration-200 flex items-center justify-center group ${
          !showMessage ? 'ring-2 ring-blue-500/50 ring-offset-2 ring-offset-[#0d1117]' : ''
        }`}
        onClick={handleBotClick}
      >
        <Bot className="w-7 h-7 text-white" />
        
        {/* Message indicator */}
        {!showMessage && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        )}
      </div>

      {/* Online status indicator */}
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-[#0d1117] rounded-full"></div>
    </div>
  )
}

export default BotCharacter