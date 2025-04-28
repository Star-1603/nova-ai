import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isChat = location.pathname === '/chat';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      {!isChat && <Footer />}
    </div>
  );
};

export default Layout;