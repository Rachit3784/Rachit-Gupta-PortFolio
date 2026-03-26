// components/Services.js
"use client";
import React, { useState } from 'react';
import { FaLaptopCode, FaMobileAlt, FaServer } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import Image from 'next/image';

const iconComponents = {
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
};

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconComponents[service.icon];

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-5 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-5">
          <IconComponent className="text-gray-900 dark:text-yellow-400 text-4xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{service.description}</p>
        
        <div className={`transition-all duration-500 overflow-hidden ${isHovered ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="text-gray-900 dark:text-white font-semibold mb-3">Technologies:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {service.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 text-sm font-medium rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            My Expertise
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-black dark:bg-yellow-400 mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Specialized in React Native and MERN Stack development
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'React Native', logo: '/logos/reactnative.svg' },
              { name: 'React', logo: '/logos/react.svg' },
              { name: 'Node.js', logo: '/logos/node.svg' },
              { name: 'MongoDB', logo: '/logos/mongodb.svg' },
              { name: 'Next.js', logo: '/logos/nextjs.svg' },
              { name: 'Express', logo: '/logos/express.png' },
              { name: 'TypeScript', logo: '/logos/Typescript.png' },
              { name: 'JavaScript', logo: '/logos/javascript.svg' },
              { name: 'Tailwind CSS', logo: '/logos/tailwind.svg' },
              { name: 'Redux', logo: '/logos/redux.svg' },
              { name: 'Firebase', logo: '/logos/logo-vertical.png' },
             
            ].map((skill, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center group"
              >
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg p-4 border border-gray-100 dark:border-gray-700 group-hover:border-black dark:group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110">
                  <div className="relative w-full h-full">
                    <Image src={skill.logo} alt={skill.name} layout="fill" objectFit="contain" />
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;