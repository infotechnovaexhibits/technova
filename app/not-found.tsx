"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-16">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-[180px] leading-none font-bold text-gray-900">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
        </motion.div>

        {/* Animated SVG Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-sm mx-auto"
        >
          <svg
            className="w-full h-48"
            viewBox="0 0 480 360"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              d="M226.5 161.5C226.5 161.5 206 139 144.5 139C83 139 37.5 178.5 37.5 178.5L37.5 250.5C37.5 250.5 86 225 144.5 225C203 225 226.5 250.5 226.5 250.5L226.5 161.5Z"
              fill="#000"
              strokeWidth="3"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              d="M253.5 161.5C253.5 161.5 274 139 335.5 139C397 139 442.5 178.5 442.5 178.5L442.5 250.5C442.5 250.5 394 225 335.5 225C277 225 253.5 250.5 253.5 250.5L253.5 161.5Z"
              fill="#000"
              strokeWidth="3"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              cx="144.5"
              cy="175"
              r="12"
              fill="white"
              stroke="#000"
              strokeWidth="3"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              cx="335.5"
              cy="175"
              r="12"
              fill="white"
              stroke="#000"
              strokeWidth="3"
            />
          </svg>
        </motion.div>

        {/* Message and Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
          </p>
          
          <Link href="/">
            <Button
              variant="default"
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-lg h-12 px-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 