import React from 'react';
import Image from 'next/image';
import { 
  Users, 
  Target, 
  Heart, 
  Award 
} from 'lucide-react';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: '/team/member1.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: '/team/member2.jpg',
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    image: '/team/member3.jpg',
  },
  {
    name: 'Sarah Williams',
    role: 'Design Director',
    image: '/team/member4.jpg',
  },
];

const values = [
  {
    title: 'Innovation',
    description: 'We constantly push boundaries and explore new possibilities.',
    icon: <Target size={32} className="text-blue-500" />,
  },
  {
    title: 'Excellence',
    description: 'We strive for perfection in everything we do.',
    icon: <Award size={32} className="text-green-500" />,
  },
  {
    title: 'Teamwork',
    description: 'We believe in the power of collaboration.',
    icon: <Users size={32} className="text-purple-500" />,
  },
  {
    title: 'Passion',
    description: 'We love what we do and it shows in our work.',
    icon: <Heart size={32} className="text-red-500" />,
  },
];

export default function About() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a team of passionate professionals dedicated to delivering exceptional results for our clients.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, we started with a simple mission: to help businesses succeed in the digital world.
              Today, we've grown into a team of experts delivering innovative solutions to clients worldwide.
            </p>
            <p className="text-gray-600">
              Our journey has been marked by continuous learning, adaptation, and a commitment to excellence.
              We take pride in our work and the relationships we build with our clients.
            </p>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src="/about/company.jpg"
              alt="Our Company"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 