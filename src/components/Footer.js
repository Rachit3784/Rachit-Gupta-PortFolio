// components/Footer.js
import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16 border-t border-gray-800 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-bold text-white dark:text-yellow-400 mb-3">
              Rachit Gupta
            </h2>
            <p className="text-gray-400 max-w-md">
              Software Developer & Application Developer specializing in React Native and MERN Stack development.
            </p>
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex space-x-4"
          >
            <a 
              href="https://github.com/Rachit3784" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 dark:bg-gray-800 rounded-full text-gray-300 hover:bg-black hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300"
            >
              <FaGithub size={22} />
            </a>
            <a 
              href="https://www.linkedin.com/in/rachit-gupta-099999261" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 dark:bg-gray-800 rounded-full text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <FaLinkedin size={22} />
            </a>
            <a 
              href="https://www.instagram.com/rac_hit384/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 dark:bg-gray-800 rounded-full text-gray-300 hover:bg-pink-600 hover:text-white transition-all duration-300"
            >
              <FaInstagram size={22} />
            </a>
            <a 
              href="mailto:grachit736@gmail.com" 
              className="p-3 bg-gray-800 dark:bg-gray-800 rounded-full text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <FaEnvelope size={22} />
            </a>
          </motion.div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Rachit Gupta. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <p className="text-gray-500 text-sm">
              Built with <span className="text-yellow-400">React</span> & <span className="text-yellow-400">Next.js</span>
            </p>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-2 bg-gray-800 dark:bg-gray-800 hover:bg-black dark:hover:bg-yellow-400 text-gray-300 hover:text-white dark:hover:text-black rounded-lg text-sm transition-all duration-300"
            >
              Back to top ↑
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;