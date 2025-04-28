import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Frown, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity
            }}
          >
            <Frown size={80} className="text-gray-500" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-400 text-lg mb-8">
          Yikes! This page doesn't exist. Must've gotten lost in the algorithm.
        </p>
        
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home size={18} className="mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;