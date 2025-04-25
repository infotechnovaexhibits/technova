"use client";

import React, { useState } from 'react';
import { 
  Phone, 
  MapPin,
  Mail,
  Facebook,
  Linkedin,
  MessageCircle,
  Loader2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAddLeadMutation } from '../../../lib/redux/services/leadsApi';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [addLead, { isLoading, isSuccess, isError, error }] = useAddLeadMutation();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    try {
      await addLead({ ...formData, status: 'new' }).unwrap();
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Failed to send lead:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[400px] mt-20">
        <Image
          src="/images/contact-banner.jpeg"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white"
        >
          <div className="bg-white/10 p-3 rounded-xl mb-6">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl max-w-2xl">
            Have questions or want to collaborate? We're here to help! Reach out to us through any of our channels below.
          </p>
        </motion.div>
      </div>

      {/* Contact Cards Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Contact Information Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <h2 className="text-2xl font-semibold mb-8 text-gray-800">Contact Information</h2>
            
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start space-x-6"
              >
                <div className="bg-blue-50 p-3 rounded-xl">
                  <Mail className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600">contact@technovaexhibits.com</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start space-x-6"
              >
                <div className="bg-purple-50 p-3 rounded-xl">
                  <MapPin className="text-purple-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Address</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600">GH-2/9 block - D,</p>
                    <p className="text-gray-600">Inderprastha Awasiya Yojna</p>
                    <p className="text-gray-600">Loni, Ghaziabad - 201102</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start space-x-6"
              >
                <div className="bg-green-50 p-3 rounded-xl">
                  <Phone className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Phone</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600">+91 9318415813</p>
                    <p className="text-gray-600">+91 9773584542</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <h3 className="font-medium text-gray-800 mb-6 text-center">Connect With Us</h3>
              <div className="flex justify-center items-center space-x-8">
                <a 
                  href="https://wa.me/919318415813" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-green-50 p-4 rounded-xl hover:bg-green-100 transition-all duration-300"
                >
                  <MessageCircle className="text-green-600 w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/your-page" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-all duration-300"
                >
                  <Facebook className="text-blue-600 w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/your-company" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0077b5]/10 p-4 rounded-xl hover:bg-[#0077b5]/20 transition-all duration-300"
                >
                  <Linkedin className="text-[#0077b5] w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <h2 className="text-2xl font-semibold mb-8 text-gray-800">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    required
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                  required
                ></textarea>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center disabled:opacity-60"
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {/* Submission Status Messages */}
              {submitAttempted && (
                <div className="mt-4 text-center text-sm">
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center text-green-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-1.5" />
                      Message sent successfully! We'll be in touch soon.
                    </motion.div>
                  )}
                  {isError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center text-red-600"
                    >
                      <AlertTriangle className="w-4 h-4 mr-1.5" />
                      Failed to send message. Please try again. {(error as any)?.data?.message}
                    </motion.div>
                  )}
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full h-[600px] mt-12 rounded-2xl overflow-hidden shadow-sm"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3498.6992368518227!2d77.32987427550434!3d28.72853307561251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDQzJzQyLjciTiA3N8KwMTknNTYuOCJF!5e0!3m2!1sen!2sin!4v1745227711135!5m2!1sen!2sin" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
} 