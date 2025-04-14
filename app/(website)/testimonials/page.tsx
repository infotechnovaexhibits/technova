"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image: "/testimonials/client1.jpg",
    rating: 5,
    content: "The team's ability to understand our needs and deliver exceptional results is truly impressive. A pleasure to work with."
  },
  {
    name: "Michael Chen",
    role: "Event Manager",
    company: "Global Events Inc",
    image: "/testimonials/client2.jpg",
    rating: 5,
    content: "Working with Technova was a game-changer for our annual conference. Their team's professionalism and innovative approach made all the difference."
  },
  {
    name: "Emily Rodriguez",
    role: "Brand Manager",
    company: "Innovate Solutions",
    image: "/testimonials/client3.jpg",
    rating: 5,
    content: "The exhibition stand they created for us was not just visually stunning but also highly functional. It perfectly represented our brand identity."
  },
  {
    name: "Robert Smith",
    role: "Product Manager",
    company: "Future Tech",
    image: "/testimonials/client4.jpg",
    rating: 5,
    content: "The team's ability to understand our needs and deliver exceptional results is truly impressive. A pleasure to work with."
  },
  {
    name: "David Wilson",
    role: "CEO",
    company: "Digital Solutions",
    image: "/testimonials/client5.jpg",
    rating: 5,
    content: "We've worked with many event companies, but Technova stands out for their creativity and attention to detail."
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Head",
    company: "Smart Systems",
    image: "/testimonials/client6.jpg",
    rating: 5,
    content: "The team's dedication to excellence and their ability to execute complex projects is remarkable."
  }
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our clients have to say about their experiences working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 