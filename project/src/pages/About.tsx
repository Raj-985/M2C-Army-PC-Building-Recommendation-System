import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const About = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Alex Johnson',
      role: 'Founder & Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      bio: 'Alex has over 10 years of experience in software development and hardware engineering. He founded M2C Army with a vision to simplify PC building for everyone.',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'AI Engineer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      bio: 'Sarah specializes in machine learning and AI algorithms. She developed the recommendation engine that powers our PC build suggestions.',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      name: 'Michael Rodriguez',
      role: 'Hardware Specialist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      bio: 'Michael has extensive knowledge of PC components and hardware compatibility. He ensures our recommendations are accurate and optimized for performance.',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      }
    },
    {
      name: 'Emily Patel',
      role: 'UX/UI Designer',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
      bio: 'Emily is passionate about creating intuitive and beautiful user experiences. She designed the interface of M2C Army to make PC building accessible to everyone.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm opacity-20 z-0"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1563770660941-10a63607957a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold-500">About Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're a team of PC enthusiasts and tech experts dedicated to helping you build the perfect computer for your needs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl border border-gold-600 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gold-500">Our Mission</h2>
          <p className="text-gray-300 mb-4">
            At M2C Army, we believe that building a PC should be accessible to everyone, regardless of their technical expertise. Our mission is to simplify the PC building process by providing personalized component recommendations based on your specific needs and budget.
          </p>
          <p className="text-gray-300">
            Using advanced AI algorithms, we analyze thousands of components and their compatibility to suggest the optimal build for your requirements. Whether you're a gamer, content creator, or professional, we've got you covered.
          </p>
        </div>
        
        <h2 className="text-3xl font-bold mb-12 text-gold-500 text-center">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-900 bg-opacity-80 rounded-lg overflow-hidden border border-gray-800 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="relative group">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover filter grayscale transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex space-x-4">
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-500 transition-colors">
                        <Github className="h-6 w-6" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-500 transition-colors">
                        <Linkedin className="h-6 w-6" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-500 transition-colors">
                        <Twitter className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gold-500 mb-1">{member.name}</h3>
                <p className="text-gray-400 mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;