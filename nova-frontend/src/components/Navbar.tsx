import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen || location.pathname !== '/' 
          ? 'bg-dark-200 bg-opacity-95 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Zap size={28} className="text-primary-500" />
            </motion.div>
            <span className="text-2xl font-bold tracking-tight">NOVA</span>
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link to="/" className="nav-link text-white hover:text-primary-400 transition-colors">
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/chat" className="nav-link text-white hover:text-primary-400 transition-colors">
                    Chat
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={logout} 
                    className="btn-outline py-2 px-4"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-link text-white hover:text-primary-400 transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="btn-primary py-2 px-4">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-200 border-t border-gray-800"
          >
            <div className="container-custom py-4">
              <ul className="flex flex-col space-y-4 py-2">
                <li>
                  <Link to="/" className="block py-2 text-white hover:text-primary-400 transition-colors">
                    Home
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link to="/chat" className="block py-2 text-white hover:text-primary-400 transition-colors">
                        Chat
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={logout} 
                        className="block w-full text-left py-2 text-white hover:text-primary-400 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="block py-2 text-white hover:text-primary-400 transition-colors">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" className="block py-2 text-white hover:text-primary-400 transition-colors">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;