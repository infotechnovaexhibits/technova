"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com" },
  { icon: FaWhatsapp, href: "https://wa.me/+971565010555" },
  { icon: FaLinkedin, href: "https://linkedin.com" },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const words = ["talk", "create", "design"];

const Footer = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const word = words[currentIndex];
    
    const type = () => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
          setTypingSpeed(150);
        } else {
          // Start deleting after a pause
          setTimeout(() => setIsDeleting(true), 2000);
          setTypingSpeed(100);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1));
          setTypingSpeed(100);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(150);
        }
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, typingSpeed]);

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Talk Section */}
          <div className="lg:col-span-1">
            <h2 className="text-5xl font-bold tracking-tight mb-2">We'd love to</h2>
            <div className="flex items-start mb-6">
              <div className="flex items-center relative">
                <h2 className="text-5xl font-bold tracking-tight whitespace-nowrap overflow-hidden">
                  <span className={`inline-block ${isDeleting ? 'animate-slide-out' : 'animate-slide-in'}`}>
                    {currentText}
                  </span>
                </h2>
                <div className={`flex items-center h-full transition-all duration-200 ${currentText.length === 0 ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
                  <div className="border-l-2 border-black h-20 mx-4"></div>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold tracking-tight">...</span>
                    <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-colors">
                      <span className="text-white text-2xl">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700">
              Looking for <span className="font-semibold">collaboration</span> ? Send an email to{' '}
              <a href="mailto:info@technovaexhibits.com" className="text-blue-600 hover:text-purple-600">
                info@technovaexhibits.com
              </a>{' '}
              for enquires and collaborations.
            </p>
          </div>

          {/* Address Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Office</h3>
            <div>
            <p className="text-gray-600">GH-2/9 block - D,</p>
                    <p className="text-gray-600">Inderprastha Awasiya Yojna</p>
                    <p className="text-gray-600">Loni, Ghaziabad - 201102</p>      
                    <p className="text-gray-600">Email: contact@technovaexhibits.com</p>
                            <p className="mt-1 text-gray-900 font-medium">+91 9818000000</p>
            </div>
            <div className="mt-8">
              <div className="flex gap-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="text-black hover:text-blue-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-6 w-6" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-base text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-gray-500">
            COPYRIGHT 2025 © | TECHNOVA EXHIBITS | ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-6 mt-4 lg:mt-0">
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-sm text-gray-500 hover:text-blue-600">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 