import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Zap, Brain, Loader } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';

const Chat = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage } = useChat();
  const { user } = useAuth();
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Send the message to the chat context
    setIsTyping(true);
    try {
      await sendMessage(userMessage);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  // Auto-resize textarea as user types
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };
  
  return (
    <div className="min-h-screen pt-16 pb-0 bg-dark-300">
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Chat header */}
        <div className="bg-dark-200 border-b border-gray-800 p-4">
          <div className="container-custom">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary-500 bg-opacity-10">
                  <Zap size={20} className="text-primary-500" />
                </div>
                <div>
                  <h1 className="font-semibold">NOVA</h1>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-gray-400">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="flex-grow overflow-y-auto p-4">
          <div className="container-custom max-w-4xl">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="mb-6 flex justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Zap size={60} className="text-primary-500" />
                  </motion.div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to NOVA</h2>
                <p className="text-gray-400 max-w-md mb-6">
                  Ask me anything and I'll break it down in Gen Z terms. 
                  I'm here to simplify complex topics with a bit of attitude.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                  {[
                    "Explain quantum computing like I'm 5",
                    "What's the deal with NFTs?",
                    "How does AI actually work?",
                    "Why is everyone talking about Web3?"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      className="bg-dark-200 hover:bg-dark-100 rounded-lg p-3 text-left transition-colors text-sm"
                      onClick={() => {
                        setInput(suggestion);
                        if (inputRef.current) {
                          inputRef.current.focus();
                        }
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender !== 'user' && (
                      <div className="flex items-start mr-2">
                        <div className="p-2 rounded-full bg-primary-500 bg-opacity-10 text-primary-500">
                          <Brain size={16} />
                        </div>
                      </div>
                    )}
                    <div 
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary-600 text-white rounded-tr-none'
                          : 'bg-dark-100 text-white rounded-tl-none'
                      }`}
                    >
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-2' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                    {message.sender === 'user' && (
                      <div className="flex items-start ml-2">
                        <div className="p-2 rounded-full bg-primary-500 bg-opacity-10 text-primary-400">
                          <User size={16} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start mr-2">
                      <div className="p-2 rounded-full bg-primary-500 bg-opacity-10 text-primary-500">
                        <Brain size={16} />
                      </div>
                    </div>
                    <div className="bg-dark-100 text-white rounded-2xl rounded-tl-none px-4 py-3">
                      <div className="flex space-x-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: ["0%", "-50%", "0%"] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              repeatType: "loop",
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
        
        {/* Chat input */}
        <div className="bg-dark-200 border-t border-gray-800 p-4">
          <div className="container-custom max-w-4xl">
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Message NOVA..."
                className="w-full bg-dark-100 border border-gray-700 rounded-lg pl-4 pr-12 py-3 text-white resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                style={{ minHeight: '56px', maxHeight: '120px' }}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-2 transition-colors ${
                  input.trim() && !isTyping
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {isTyping ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;