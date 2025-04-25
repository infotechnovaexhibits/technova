"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertTriangle, Loader2, ArrowRight, Camera } from 'lucide-react';
import { GalleryItem, useGetGalleryItemsQuery } from '../../../../lib/redux/services/galleryApi';
import Link from 'next/link';

interface MappedImage {
  src: string;
  alt: string;
}

export const GallerySection = () => {

  const { data: galleryItems, error, isLoading } = useGetGalleryItemsQuery();

  const images: MappedImage[] = React.useMemo(() => {
    if (!galleryItems) return [];
    return galleryItems.map((item: GalleryItem) => ({
      src: item.image, // Assuming item.image contains the full URL or path
      alt: item.title
    }));
  }, [galleryItems]);

  // Get only the first 6 items
  const recentProjects = images?.slice(0, 9) || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
           <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl mb-4"
          >
            <Camera className="w-6 h-6 text-blue-600" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Recent Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Showcasing our latest exhibition stand designs and creations.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col justify-center items-center min-h-[300px] px-4 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-xl text-red-600">Failed to load gallery items.</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && !error && recentProjects.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {recentProjects.map((item: MappedImage) => (
              <motion.div
                key={item.src}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !error && recentProjects.length === 0 && (
          <div className="text-center min-h-[300px] flex flex-col justify-center items-center">
            <Camera className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-xl text-gray-500">No projects to display currently.</p>
          </div>
        )}

        {/* View All Button */}
        {!isLoading && !error && galleryItems && galleryItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              href="/gallery"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md hover:shadow-lg"
            >
              View Full Gallery <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
