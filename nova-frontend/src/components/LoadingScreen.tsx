import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-dark-300 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <Zap size={64} className="text-primary-500" />
          <motion.div
            className="absolute inset-0"
            animate={{ 
              boxShadow: ["0 0 0px rgba(14, 165, 233, 0)", "0 0 15px rgba(14, 165, 233, 0.5)", "0 0 0px rgba(14, 165, 233, 0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary-500 rounded-full"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
      
      <motion.p 
        className="mt-4 text-primary-400 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Loading NOVA...
      </motion.p>
    </div>
  );
};

export default LoadingScreen;