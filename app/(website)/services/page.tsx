import React from 'react';
import { 
  Code, 
  Smartphone, 
  Database, 
  Shield, 
  Cloud, 
  Zap 
} from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices.',
    icon: <Code size={32} className="text-blue-500" />,
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: <Smartphone size={32} className="text-green-500" />,
  },
  {
    title: 'Database Solutions',
    description: 'Scalable and secure database solutions for your business needs.',
    icon: <Database size={32} className="text-purple-500" />,
  },
  {
    title: 'Security Services',
    description: 'Comprehensive security solutions to protect your digital assets.',
    icon: <Shield size={32} className="text-red-500" />,
  },
  {
    title: 'Cloud Services',
    description: 'Cloud infrastructure and services for scalable business solutions.',
    icon: <Cloud size={32} className="text-orange-500" />,
  },
  {
    title: 'Performance Optimization',
    description: 'Optimize your applications for maximum speed and efficiency.',
    icon: <Zap size={32} className="text-yellow-500" />,
  },
];

export default function Services() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          We offer a wide range of services to help your business succeed in the digital world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Contact us today to discuss how we can help your business grow.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
} 