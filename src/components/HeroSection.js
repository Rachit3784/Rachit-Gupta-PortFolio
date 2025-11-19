// // components/HeroSection.js
// "use client";
// import React, { useEffect, useRef } from 'react';
// import Image from 'next/image';
// import Typed from 'typed.js';

// const HeroSection = () => {
//   const typedElementRef = useRef(null);
//   const typed = useRef(null);

//   useEffect(() => {
//     const options = {
//       strings: [
//         'Full-Stack Development',
// 'Cloud-Native Backend',
// 'Microservices Architecture',
// 'React Native Development',
// 'Next.js Web Apps',
// 'Event-Driven Systems with Kafka',
// 'Real-Time Apps with Socket.io',
// 'AWS & DevOps',
// 'Docker & Kubernetes',
// 'MongoDB & SQL Databases',

        
//       ],
//       typeSpeed: 30,
//       backSpeed: 30,
//       backDelay: 1300,
//       loop: true,
//     };

//     if (typedElementRef.current) {
//       typed.current = new Typed(typedElementRef.current, options);
//     }

//     return () => {
//       if (typed.current) {
//         typed.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <section id="home" className="relative min-h-screen flex items-center pt-16 bg-white dark:bg-gray-900">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 z-0"></div>
//       <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
//         <div className="flex flex-col lg:flex-row items-center justify-between  gap-12 ">
//           <div className="flex-1 text-center lg:text-left lg:ml-10 lg:w-[850px] ">
//             <h2 className="text-xl font-medium text-blue-600 dark:text-violet-400 mb-2">Hello!</h2>
//             <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
//               I&apos;m Rachit Gupta
//             </h1>
//             <div className="text-[27px] sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
//               <span className="mr-2 ">Skilled in</span>
//               <span  ref={typedElementRef} className="text-blue-600 dark:text-violet-400"></span>
//             </div>
//             <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
//               Passionate about creating beautiful, functional, and user-friendly digital experiences. Let&apos;s build something amazing together!
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <button
//                 onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white rounded-md font-medium transition-colors"
//               >
//                 Get In Touch
//               </button>
//               <button
//                 onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
//                 className="px-6 py-3 border-2 border-blue-600 dark:border-violet-600 text-blue-600 dark:text-violet-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md font-medium transition-colors"
//               >
//                 View My Work
//               </button>
//             </div>
//           </div>
//           <div className="flex-1 relative">
//             <div className="relative h-80 w-80 md:h-96 md:w-96 mx-auto">
//               <div className="absolute inset-0 bg-blue-600 dark:bg-violet-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
//               <div className="relative rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
//                 <Image 
//                   src="/Profile.jpg" 
//                   alt="Rachit Gupta" 
//                   width={400} 
//                   height={400} 
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
//         <button
//           onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
//           className="animate-bounce p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
//         >
//           <svg className="w-6 h-6 text-blue-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//           </svg>
//         </button>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


"use client";
import React, { useEffect, useRef, useState } from 'react';
// We are loading the Typed library via a script tag injection to resolve the dependency issue.
import { Bot, ChevronDown, Play } from 'lucide-react';
import FloatingActionButton from './FloatingActionButton';

const HeroSection = () => {
  const typedElementRef = useRef(null);
  const typedInstance = useRef(null);
  const [isTypedLoaded, setIsTypedLoaded] = useState(false);

  // 1. Dynamic Script Loader for Typed.js
  useEffect(() => {
    // Check if the script has already been added
    if (document.querySelector('script[src*="typed.js"]')) {
      setIsTypedLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12';
    script.async = true;
    script.onload = () => {
      setIsTypedLoaded(true);
    };
    script.onerror = () => {
        console.error("Failed to load typed.js script.");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup is technically not needed for the script tag, 
      // but ensures the Typed instance is destroyed.
    };
  }, []);

  // 2. Initialize Typed.js only after the script is loaded
  useEffect(() => {
    // Check for both the component ref and the script load state
    if (isTypedLoaded && typedElementRef.current && window.Typed) {
        const options = {
            strings: [
                'AI and ML',
                'React Native',
                'Web Development',
                'App Development',
                'Nodejs',
                'Microservices',
                'Kafka',
                'Docker and AWS',
                'MongoDB and SQL',
            ],
            typeSpeed: 30,
            backSpeed: 30,
            backDelay: 1300,
            loop: true,
        };

        // Initialize the Typed instance using window.Typed
        typedInstance.current = new window.Typed(typedElementRef.current, options);

        return () => {
            if (typedInstance.current) {
                typedInstance.current.destroy();
            }
        };
    }
  }, [isTypedLoaded]); 
  

  return (
    <section 
      id="home" 
      // Light Mode: bg-white. Dark Mode: bg-black
      className="relative min-h-screen flex items-center pt-16 bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Background Gradient */}
      <div 
        // Light Mode: subtle white gradient. Dark Mode: black to yellow gradient.
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-black z-0 opacity-80"
      ></div>


      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 z-10">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 ">
          <div className="flex-1 text-center lg:text-left lg:ml-10 lg:w-[850px] ">
            {/* Accent Text Color */}
            <h2 
              className="text-xl font-medium text-black dark:text-yellow-400 mb-2"
            >
              Hello!
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              I&apos;m Rachit Gupta
            </h1>
            <div className="text-[27px] sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              <span className="mr-2 ">Skilled in</span>
              {/* Accent Typed Text Color */}
              <span 
                ref={typedElementRef} 
                className="text-black dark:text-yellow-400"
              >
                {/* Fallback content while loading */}
                {!isTypedLoaded && '...Loading Skills'}
              </span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
             Built a full-stack <span className=' font-semibold text-green-400 '>Cloths Shopping App</span> using Node.js (backend) & React Native (frontend) now live on the <span className='dark:text-yellow-300 font-semibold text-black'>Play Store</span> <Play className='inline font-bold' size={22}/>  . Let&apos;s build something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              {/* Primary Button: Get In Touch */}
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="
                  px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg
                  cursor-pointer hover:scale-110

                  /* Light Mode: Black background, White text */
                  bg-black hover:bg-gray-800 text-white 
                  
                  /* Dark Mode: Yellow background, Black text */
                  dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black
                "
              >
                Get In Touch
              </button>

              {/* Secondary Button: View My Work */}
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="
                  px-6 py-3 border-2 rounded-xl font-medium transition-all duration-300
                   cursor-pointer hover:scale-110

                  /* Light Mode: Black border/text, White background hover */
                  border-black text-black hover:bg-gray-100 
                  
                  /* Dark Mode: Yellow border/text, Black background hover */
                  dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-gray-900 
                "
              >
                View My Work
              </button>
            </div>
          </div>


          <div className="flex-1 relative">
            <div className="relative h-80 w-80 md:h-96 md:w-96 mx-auto">
              {/* Image Glow/Pulse Color */}
              <div 
                className="absolute inset-0 bg-black dark:bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"
              ></div>
              <div className="relative rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                {/* Note: Replaced Next.js Image with a simple img tag and placeholder URL for self-contained execution */}
                <img 
                  src="Profile.jpg" 
                  alt="Rachit Gupta" 
                  width={400} 
                  height={400} 
                  className="object-cover w-full h-full"
                  
                />
              </div>
            </div>
          </div>

        </div>
      </div>

    <FloatingActionButton/>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        {/* Scroll Down Button Color */}
        <button
          onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
          className="animate-bounce p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
        >
          <ChevronDown className="w-6 h-6 text-black dark:text-yellow-400" />
        </button>

      </div>
    </section>
  );
};

// Export the component as the default export
export default HeroSection;