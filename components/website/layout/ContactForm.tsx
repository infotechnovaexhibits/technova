'use client';

import { Fragment, useState } from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';

interface ContactFormProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ContactForm({ isOpen, closeModal }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted Data:', formData);
    setIsSubmitted(true);

    // Auto close after 2 seconds and reset state
    setTimeout(() => {
      closeModal();
      // Reset states after modal is closed
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 500);
    }, 2000);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="relative z-[100]">
        {/* Background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={closeModal}
          />
        </Transition.Child>

        {/* Drawer panel */}
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-out duration-700"
          enterFrom="-translate-y-full"
          enterTo="translate-y-0"
          leave="transform transition ease-in duration-500"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-full"
        >
          <div className="fixed inset-0 z-[100] overflow-hidden bg-white">
            {/* Close button - now fixed at the top right of the entire form */}
            <button
              type="button"
              className="absolute top-6 right-6 z-[110] text-gray-400 hover:text-gray-500 transition-colors hover:rotate-90 duration-300"
              onClick={closeModal}
            >
              <XMarkIcon className="h-8 w-8" />
            </button>

            <div className="h-full">
              <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                {/* Left side - Title and Contact Info */}
                <div className="relative flex items-center bg-gray-50 p-8 lg:p-12">
                  <div className="w-full max-w-lg mx-auto">
                    <div className="flex justify-between items-start lg:hidden mb-6">
                      <h3 className="text-4xl font-bold">
                        Send a<br />
                        <span className="font-light">message.</span>
                      </h3>
                    </div>
                    <div className="hidden lg:block">
                      <h3 className="text-7xl font-bold mb-2 animate-fade-in">
                        Send a
                      </h3>
                      <p className="text-8xl font-light animate-fade-in animation-delay-200">message.</p>
                    </div>
                    <p className="mt-6 text-gray-600 text-xl animate-fade-in animation-delay-400">
                      We're here to answer any question you may have.
                    </p>

                    <div className="mt-12 space-y-8 animate-fade-in animation-delay-600">
                      <div className="hover:translate-x-2 transition-transform duration-300">
                        <h4 className="font-semibold text-lg mb-2">EXHIBITION</h4>
                        <p className="text-gray-600 mb-2">To receive your quote on exhibition or for further information</p>
                        <p className="text-orange-500 font-medium text-lg hover:text-orange-600 transition-colors">+91 9318415813</p>
                      </div>
                      <div className="hover:translate-x-2 transition-transform duration-300">
                        <h4 className="font-semibold text-lg mb-2">TECHNOLOGY</h4>
                        <p className="text-gray-600 mb-2">To receive your quote on technology or for further information</p>
                        <p className="text-orange-500 font-medium text-lg hover:text-orange-600 transition-colors">+91 9773584542</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Form */}
                <div className="relative flex items-center p-8 lg:p-12">
                  <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto animate-fade-in animation-delay-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-1 group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Full name"
                          className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-transparent placeholder-gray-400"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1 group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-transparent placeholder-gray-400"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1 group">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="Your Contact Number"
                          className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-transparent placeholder-gray-400"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1 group">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          placeholder="I'd like to chat about"
                          className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-transparent placeholder-gray-400"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2 group">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">Your message</label>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="Tell us about your project"
                          className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-transparent resize-none placeholder-gray-400"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-8 space-y-4">
                      <button
                        type="submit"
                        className="mx-auto block w-64 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitted}
                      >
                        {isSubmitted ? 'Message Sent!' : 'Send message'}
                      </button>

                      {isSubmitted && (
                        <div className="text-center animate-fade-in">
                          <div className="flex items-center justify-center text-green-500 mb-2">
                            <CheckCircleIcon className="h-6 w-6 mr-2" />
                            <span className="text-lg font-medium">Thank you!</span>
                          </div>
                          <p className="text-gray-600">We'll contact you soon.</p>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
} 