"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { useGetServicesQuery } from "../../../../lib/redux/services/servicesApi";
import { Service } from "../../../../lib/redux/services/servicesApi";

export const ServicesSection = () => {  
  const { data: services, error, isLoading } = useGetServicesQuery();

  const firstThreeServices = services?.slice(0, 3) || [];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            We offer comprehensive exhibition solutions to help you create memorable brand experiences
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        )}

        {error && (
          <div className="flex flex-col justify-center items-center h-64 px-4 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-xl text-red-600">
              Failed to load services.
            </p>
          </div>
        )}

        {!isLoading && !error && firstThreeServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {firstThreeServices.map((service: Service, index: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    {service.shortDescription.length > 80
                      ? `${service.shortDescription.substring(0, 80)}...`
                      : service.shortDescription}
                  </p>
                  <Link 
                    href={`/services/${service.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-purple-600 transition-colors text-sm"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && !error && firstThreeServices.length === 0 && (
          <div className="text-center h-64 flex flex-col justify-center items-center">
            <p className="text-xl text-gray-500">No services available right now.</p>
          </div>
        )}

        {!isLoading && !error && services && services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              href="/services"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              View All Services <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}; 