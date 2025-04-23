"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageSquare, Quote, Send, Star, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAddTestimonialMutation, useGetTestimonialsQuery } from '../../../lib/redux/services/testimonialsApi';
import { Testimonial } from '../../../lib/redux/services/testimonialsApi'; // Import the interface

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function Testimonials() {
  // API Hooks
  const { data: allTestimonials = [], isLoading: isLoadingTestimonials, error: testimonialsError } = useGetTestimonialsQuery();
  const [addTestimonial, { isLoading: isAdding }] = useAddTestimonialMutation();
  
  // Form State
  const [rating, setRating] = useState(5);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitSuccess(null);
    setSubmitError(null);
    const formData = new FormData(event.currentTarget);

    const newTestimonial = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      rating: rating,
      status: "pending" as const
    };

    try {
      await addTestimonial(newTestimonial);
      setSubmitSuccess('Thank you! Your testimonial has been submitted for review.');
      (event.target as HTMLFormElement).reset();
      setRating(5); // Reset rating to default
    } catch (error) {
      setSubmitError('Failed to submit testimonial. Please try again.');
    }
  };

  // Filter for approved testimonials
  const approvedTestimonials = allTestimonials.filter((t: Testimonial) => t.status === 'approved');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] mt-20">
        <Image
          src="/images/testimonial-banner.jpeg"
          alt="Client Testimonials"
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
            <Quote className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Client Testimonials</h1>
          <p className="text-xl max-w-2xl">
            Hear What Our Clients Say About Their Experience With Us
          </p>
        </motion.div>
      </div>

      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 py-24">
        {isLoadingTestimonials ? (
          <div className="text-center py-16">Loading testimonials...</div>
        ) : testimonialsError ? (
          <div className="text-center py-16 text-red-500">Error loading testimonials.</div>
        ) : approvedTestimonials.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No testimonials available yet.</div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          >
            {approvedTestimonials.map((testimonial: Testimonial, index: number) => (
              <motion.div
                key={testimonial.id} // Use ID from API
                custom={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-3xl p-8 text-center flex flex-col items-center justify-between min-h-[360px] relative group transition-all duration-300"
                style={{
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-3 shadow-lg"
                >
                  <Quote className="w-6 h-6 text-white" />
                </motion.div>
                
                <div className="space-y-6 mt-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className="flex justify-center gap-1"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="text-gray-600 text-lg leading-relaxed font-light"
                  >
                    "{testimonial.message}"
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="mt-6 relative"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                    {testimonial.name}
                  </h3>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Share Your Experience Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.08)] relative"
        >
          <div className="text-center mb-12">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Share Your Experience</h2>
            <p className="text-gray-600">
              We value your feedback. Share your experience working with us.
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your email"
                  required
                />
              </motion.div>
            </div>

            {/* Rating Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                  >
                    <Star
                      className={`h-6 w-6 transition-colors duration-200 ${
                        star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({rating} Star{rating !== 1 ? 's' : ''})
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Experience</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Share your experience working with us..."
                required
              />
            </motion.div>

            {/* Success/Error Messages */}
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {submitSuccess}
              </motion.div>
            )}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {submitError}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <button
                type="submit"
                disabled={isAdding}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 group hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Testimonial
                    <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 