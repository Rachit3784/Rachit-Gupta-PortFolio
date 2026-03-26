// components/Contact.js
"use client";
import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Send, MapPin, Clock } from 'lucide-react';

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    link: 'https://wa.me/918817998451',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-green-600',
    hoverBg: 'hover:bg-green-500',
    hoverText: 'hover:text-white'
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    link: 'mailto:grachit736@gmail.com',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-red-500',
    hoverBg: 'hover:bg-red-500',
    hoverText: 'hover:text-white'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    link: 'https://www.linkedin.com/in/rachit-gupta-099999261',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-600',
    hoverText: 'hover:text-white'
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    link: 'https://github.com/Rachit3784',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-700 dark:text-gray-300',
    hoverBg: 'hover:bg-black dark:hover:bg-yellow-400',
    hoverText: 'hover:text-white dark:hover:text-black'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    link: 'https://www.instagram.com/rac_hit384/',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-pink-600',
    hoverBg: 'hover:bg-pink-600',
    hoverText: 'hover:text-white'
  }
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-yellow-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
          placeholder="John Doe"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-yellow-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-yellow-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 resize-none"
          placeholder="Tell me about your project..."
        ></textarea>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-black dark:bg-yellow-400 text-white dark:text-black rounded-xl font-semibold transition-all duration-300 hover:bg-gray-800 dark:hover:bg-yellow-300 shadow-lg flex justify-center items-center gap-2"
      >
        {isSubmitting ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </motion.button>
      
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl"
        >
          Message sent successfully! I&apos;ll get back to you soon.
        </motion.div>
      )}
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl"
        >
          {errorMessage}
        </motion.div>
      )}
    </form>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let&apos;s Work Together
          </h2>
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
            Have a project in mind? I&apos;m always open to discussing new opportunities and collaborations.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
            <ContactForm />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connect With Me</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                
                return (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center p-4 ${social.bgColor} ${social.hoverBg} ${social.hoverText} rounded-xl transition-all duration-300 border border-gray-200 dark:border-gray-700`}
                  >
                    <Icon className={`text-2xl mr-3 ${social.iconColor} transition-colors`} />
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{social.name}</span>
                  </motion.a>
                );
              })}
            </div>
            
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <MapPin className="text-black dark:text-yellow-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">Jabalpur, Madhya Pradesh, India</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Clock className="text-black dark:text-yellow-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Working Hours</h4>
                  <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 8:00 AM - 10:00 PM</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Weekends: Available for urgent matters</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;