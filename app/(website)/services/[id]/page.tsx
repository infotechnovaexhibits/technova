"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, CheckCircle2, Award } from 'lucide-react';
import { useParams } from 'next/navigation';

const services = [
  {
    id: 1,
    name: "Custom Exhibition Stands",
    slug: "custom-exhibition-stands",
    description: "Transform your business presence with our bespoke exhibition stands designed to make a lasting impression.",
    fullDescription: "Our custom exhibition stands are meticulously designed to capture your brand's essence and create memorable experiences. We combine innovative design, premium materials, and expert craftsmanship to deliver stands that not only look stunning but also effectively communicate your brand message.",
    image: "/images/service1.jpg",
    features: [
      "Unique design concepts tailored to your brand",
      "3D visualization and virtual walkthrough",
      "Premium quality materials and finishes",
      "Expert installation and dismantling",
      "Project management from concept to completion",
      "Compliance with exhibition regulations"
    ]
  },
  {
    id: 2,
    name: "Mezzanine Stands",
    slug: "mezzanine-stands",
    description: "Maximize your exhibition space with our innovative double-decker stands for substantial driven spaces.",
    fullDescription: "Our mezzanine stands offer a smart solution to maximize your exhibition space vertically. These double-decker structures provide additional floor space for meetings, presentations, or product displays while creating an impressive visual impact.",
    image: "/images/service2.jpg",
    features: [
      "Structural engineering and safety compliance",
      "Multiple functional areas across two levels",
      "Integrated staircases and access points",
      "Flexible space utilization options",
      "Enhanced visibility in exhibition halls",
      "Comprehensive technical documentation"
    ]
  },
  {
    id: 3,
    name: "Country Pavilion",
    slug: "country-pavilion",
    description: "Showcase your nation's excellence with our expertly designed and managed country pavilions.",
    fullDescription: "Our country pavilion solutions are designed to showcase national identity, culture, and achievements on the global stage. We create immersive spaces that highlight your country's unique offerings while facilitating meaningful business connections.",
    image: "/images/service3.jpg",
    features: [
      "Cultural elements integration",
      "Large-scale project management",
      "Multiple exhibitor coordination",
      "National branding implementation",
      "Interactive visitor experiences",
      "Comprehensive support services"
    ]
  },
  {
    id: 4,
    name: "Interior/Exterior Design",
    slug: "interior-exterior-design",
    description: "Create stunning spaces that reflect your brand's personality with our flamboyant design solutions.",
    fullDescription: "Our interior and exterior design services transform spaces into engaging environments that leave lasting impressions. We focus on creating harmonious designs that blend aesthetics with functionality while maintaining brand consistency.",
    image: "/images/service4.jpg",
    features: [
      "Custom interior layouts and space planning",
      "Exterior facade design and implementation",
      "Material and finish selection",
      "Lighting design and integration",
      "Brand environment creation",
      "Sustainable design solutions"
    ]
  },
  {
    id: 5,
    name: "Exhibition Management",
    slug: "exhibition-management",
    description: "End-to-end exhibition management services ensuring seamless execution of your event.",
    fullDescription: "Our comprehensive exhibition management services cover every aspect of your participation in trade shows and exhibitions. From initial planning to final execution, we ensure a stress-free experience while maximizing your exhibition impact.",
    image: "/images/service5.jpg",
    features: [
      "End-to-end project coordination",
      "Budget management and optimization",
      "Vendor coordination and management",
      "On-site support and supervision",
      "Logistics and transportation handling",
      "Post-event reporting and analysis"
    ]
  }
];

export default function ServiceDetail() {
  const params = useParams();
  
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[400px] mt-20"
      >
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white/10 p-3 rounded-xl mb-6"
          >
            <Building2 className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-5xl font-bold mb-4"
          >
            {service.name}
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24">
        <Link 
          href="/services"
          className="inline-flex items-center text-blue-600 hover:text-purple-600 transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Services
        </Link>

        {/* Overview Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {service.fullDescription}
            </p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>

        {/* Key Features Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-sm mb-10"
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-900">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section - Full Width */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative h-[300px] w-screen"
      >
        <Image
          src="/images/about-3.jpg"
          alt="Exhibition Stand"
          fill
          className="object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 p-3 rounded-xl mb-4"
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold text-white mb-3"
          >
            Ready to Transform Your Exhibition Presence?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-white/90 mb-6 text-lg max-w-2xl"
          >
            Let's create an extraordinary exhibition experience together
          </motion.p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-blue-600 py-3 px-8 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 