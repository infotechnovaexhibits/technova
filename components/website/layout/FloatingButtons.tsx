"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, Phone, Facebook, Linkedin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      icon: Phone, 
      href: 'tel:+919773584542',
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
      hoverBgColor: 'hover:opacity-90'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/your-company',
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
      hoverBgColor: 'hover:opacity-90'
    },
    { 
      icon: Facebook, 
      href: 'https://facebook.com/your-page',
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
      hoverBgColor: 'hover:opacity-90'
    },
    { 
      icon: MessageCircle, 
      href: 'https://wa.me/919318415813',
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
      hoverBgColor: 'hover:opacity-90'
    }
  ].reverse(); // Reverse the array so icons appear from bottom to top

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="flex flex-col-reverse gap-3 mb-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.bgColor} ${social.hoverBgColor} text-white p-3 rounded-full shadow-lg transition-all duration-300`}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300"
        >
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingButtons; 