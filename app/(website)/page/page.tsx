import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to Our Website</h1>
            <p className="text-xl mb-8">
              We provide the best services to help your business grow and succeed in the digital world.
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold inline-flex items-center hover:bg-blue-50 transition-colors"
            >
              Get Started <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Service 1</h3>
              <p className="text-gray-600">
                Description of service 1 and its benefits to the customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Service 2</h3>
              <p className="text-gray-600">
                Description of service 2 and its benefits to the customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Service 3</h3>
              <p className="text-gray-600">
                Description of service 3 and its benefits to the customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                "Amazing service! They helped us grow our business significantly."
              </p>
              <p className="font-semibold">- Client Name</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                "Professional team with excellent results. Highly recommended!"
              </p>
              <p className="font-semibold">- Client Name</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
