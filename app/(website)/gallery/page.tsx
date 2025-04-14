import React from 'react';
import Image from 'next/image';

const images = [
  {
    src: '/gallery/image1.jpg',
    alt: 'Project 1',
    category: 'Web Development',
  },
  {
    src: '/gallery/image2.jpg',
    alt: 'Project 2',
    category: 'Mobile Apps',
  },
  {
    src: '/gallery/image3.jpg',
    alt: 'Project 3',
    category: 'UI/UX Design',
  },
  {
    src: '/gallery/image4.jpg',
    alt: 'Project 4',
    category: 'Web Development',
  },
  {
    src: '/gallery/image5.jpg',
    alt: 'Project 5',
    category: 'Mobile Apps',
  },
  {
    src: '/gallery/image6.jpg',
    alt: 'Project 6',
    category: 'UI/UX Design',
  },
];

const categories = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(image => image.category === selectedCategory);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Our Work</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Take a look at some of our recent projects and success stories.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-bold mb-2">{image.alt}</h3>
                  <p className="text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 