"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Image from 'next/image';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[400px] mt-20">
        <Image
          src="/images/privacy-banner.jpg"
          alt="Privacy Policy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white"
        >
          <div className="bg-white/10 p-3 rounded-xl mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-2xl">
            How We Protect and Handle Your Information
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto"
        >
          <div className="prose prose-lg max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-3 rounded-xl">
                <Shield className="text-blue-600 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 m-0">Our Commitment to Privacy</h2>
            </div>

            <p className="text-gray-600 mb-8">
              At Technova Exhibits, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Information We Collect</h3>
            <p className="text-gray-600 mb-6">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8">
              <li>Fill out forms on our website</li>
              <li>Contact us through email or phone</li>
              <li>Subscribe to our newsletter</li>
              <li>Request a quote or consultation</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">How We Use Your Information</h3>
            <p className="text-gray-600 mb-6">
              The information we collect is used to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8">
              <li>Provide and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Send you marketing and promotional materials (with your consent)</li>
              <li>Analyze and improve our website performance</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Information Security</h3>
            <p className="text-gray-600 mb-8">
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Rights</h3>
            <p className="text-gray-600 mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-gray-600">
              If you have any questions about our Privacy Policy, please contact us at{' '}
              <a href="mailto:contact@technovaexhibits.com" className="text-blue-600 hover:text-blue-700">
                contact@technovaexhibits.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 