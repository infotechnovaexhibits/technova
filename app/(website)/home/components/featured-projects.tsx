"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Tech Expo 2023",
    description: "A cutting-edge technology exhibition featuring interactive displays and immersive experiences.",
    image: "/projects/tech-expo.jpg",
    category: "Exhibition"
  },
  {
    title: "Brand Launch Event",
    description: "A spectacular brand launch event with innovative installations and engaging activities.",
    image: "/projects/brand-launch.jpg",
    category: "Event"
  },
  {
    title: "Corporate Conference",
    description: "A professional conference setup with state-of-the-art audiovisual equipment and staging.",
    image: "/projects/conference.jpg",
    category: "Conference"
  }
];

export const FeaturedProjects = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our recent work and see how we've helped clients create impactful experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-3 py-1 text-sm bg-white/20 rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm opacity-90">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 