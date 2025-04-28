import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, MessageCircle, Brain, Lock, Activity, Award, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center bg-dark-100 text-primary-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Sparkles size={16} className="mr-1" />
                <span>AI Chatbot with Attitude</span>
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
                Meet NOVA, Your Gen Z AI Bestie
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Straight talk, no filter. NOVA breaks down complex topics with Gen Z slang, 
                keeps it critical, and isn't afraid to throw a little shade when needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="btn-primary">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn-outline">
                  I Already Have an Account
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 max-w-4xl mx-auto relative"
          >
            <div className="bg-dark-100 rounded-xl border border-gray-800 p-4 shadow-xl">
              <div className="mb-4 flex items-center px-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-accent-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="mx-auto bg-dark-200 rounded-full px-4 py-1 text-sm font-medium">
                  chat.nova-ai.com
                </div>
              </div>
              <div className="bg-dark-300 rounded-lg p-4 h-80 overflow-hidden">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary-600 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-xs">
                      Hey NOVA, can you explain quantum computing in simple terms?
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-dark-100 text-white rounded-2xl rounded-tl-none px-4 py-2 max-w-xs sm:max-w-sm">
                      <p>OK so quantum computing is basically like having a vibe check with atoms. 💅</p>
                      <p className="mt-2">Regular computers be like "it's either 0 or 1" but quantum computers are all "why not both?" Energy of someone who can't make decisions but make it useful. 🤯</p>
                      <p className="mt-2">Basically they solve problems that would take normal computers longer than the universe has existed. And that's on periodt. ✨</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary-600 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-xs">
                      That actually makes sense lol. What about AI safety?
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-dark-100 text-white rounded-2xl rounded-tl-none px-4 py-2 max-w-xs sm:max-w-sm">
                      <p>AI safety is just making sure the robots don't get too spicy and start acting brand new. 🔥</p>
                      <p className="mt-2">It's like teaching your little sibling boundaries but the sibling can potentially take over the world. No pressure tho.</p>
                      <p className="mt-2">The real tea is we need to align AI with human values before it gets too powerful. Otherwise it's big yikes energy. 💀</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 -left-4 h-16 bg-gradient-to-t from-dark-300 to-transparent z-10" />
          </motion.div>
        </div>
        
        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20" />
          <div className="absolute top-0 -right-20 w-80 h-80 bg-accent-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20" />
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 bg-dark-400">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why NOVA Hits Different</h2>
            <p className="text-gray-400">
              Not your average AI chatbot. NOVA delivers knowledge with the perfect blend of sass, 
              simplicity, and straight facts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="text-primary-500" />,
                title: "Gen Z Fluency",
                description: "Communicates in authentic Gen Z slang and keeps it 100% real. No cap."
              },
              {
                icon: <Brain className="text-secondary-500" />,
                title: "Conceptual Simplification",
                description: "Breaks down complex topics into bite-sized, understandable chunks with a side of attitude."
              },
              {
                icon: <Activity className="text-accent-500" />,
                title: "Critical Thinking",
                description: "Doesn't just answer questions – challenges assumptions and provides thoughtful analysis."
              },
              {
                icon: <Lock className="text-primary-500" />,
                title: "Secure Conversations",
                description: "End-to-end encryption keeps your chats private. We don't save or sell your data. Period."
              },
              {
                icon: <Award className="text-secondary-500" />,
                title: "No Filter Honesty",
                description: "Refreshingly direct responses without sugar-coating. The truth, but make it sassy."
              },
              {
                icon: <Zap className="text-accent-500" />,
                title: "Lightning Fast",
                description: "Instant responses that don't leave you on read. Time is precious, bestie."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:scale-105 transition-transform duration-300"
              >
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-dark-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Chat with NOVA?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get started for free and experience a chatbot that actually gets you.
                No awkward AI formality, just straight facts with Gen Z flair.
              </p>
              <Link to="/signup" className="btn-primary inline-flex items-center">
                Start Chatting Now <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            
            {/* Background elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;