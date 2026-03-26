// data/projects.js
export const projects = [
  {
    id: 'music-streaming-app',
    type: 'video',
    title: 'Ad-Free Music Streaming App',
    category: 'React Native Application',
    shortDescription: 'A high-performance music application featuring background playback, complex state synchronization, and AI-driven recommendations.',
    fullDescription: `
      This project is a sophisticated music streaming application built with Expo and TypeScript, designed to master complex state management and local data persistence.
      
      Key technical features include:
      - Optimized State Management: Utilized Zustand for an ultra-responsive global state, ensuring perfectly synced UI between the full player and mini-player components.
      - Advanced Playback Engine: Integrated Expo-AV to enable seamless background audio playback and persistent track sessions.
      - Performance Optimization: Implemented search debouncing and intelligent caching strategies to minimize API overhead and enhance UI responsiveness.
      - Real-time Discovery: Integrated the JioSaavn API for real-time music fetching, complemented by an AI-based recommendation system for track discovery.
      - Data Persistence: Used AsyncStorage for local caching of favorites, recent search history, and the last played track to ensure a continuous user experience.
    `,
    technologies: ['React Native', 'TypeScript', 'Zustand', 'Expo-AV', 'AsyncStorage', 'JioSaavn API'],
    image: '/projects/music-app.png',
    githubLink: 'https://github.com/Rachit3784/jio-saavn-music-app',
    liveLink: '',
    video: 'https://drive.google.com/file/d/1sn7MngcDebzpglT2IzspI8O7gP5iJlha/view?usp=drivesdk',
    videoType: 'gdrive'
  },
  {
    id: 'grocery-delivery-app',
    type: 'video',
    title: 'Grocery Delivery Application',
    category: 'React Native + MERN Full-Stack',
    shortDescription: 'A production-level, full-stack grocery delivery platform featuring location-based listings, secure payments, and refresh token rotation.',
    fullDescription: `
      This is a full-stack Grocery Delivery App built from scratch with a focus on production-level architecture and a real-world shopping experience. 
      
      Key technical milestones include:
      - Advanced UX: Implemented infinite scroll pagination, category-based browsing, and live location tracking for accurate product listings.
      - Security: Developed a robust Refresh Token Rotation system with MongoDB-based nonce validation, successfully reducing unauthorized access windows by 40%.
      - Fintech Integration: Built a multi-channel payment system supporting Razorpay (Online), a custom Wallet system, and Cash on Delivery (COD).
      - State & Session Management: Integrated persistent cart management and secure OTP-based authentication for login, signup, and account recovery.
      - Scalable Backend: Designed modular REST APIs and deployed services on cloud infrastructure to ensure high-performance and scalability.
      
      The application also features AI-driven customer support and detailed product variant management to mimic high-end commercial platforms.
    `,
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Express', 'Razorpay', 'Firebase', 'Zustand'],
    image: '/projects/grocery-app.png',
    githubLink: 'https://github.com/Rachit3784/Grocery_App',
    liveLink: '',
    video: 'https://drive.google.com/file/d/1IcXHjxvN50YI3uk1BG7D5cDkearRZhUS/view?usp=drivesdk',
    videoType: 'gdrive'
  },
  {
    id: 'mern-social-media',
    type: 'video',
    title: 'Full-Stack Social Media Platform',
    category: 'MERN Stack Application',
    shortDescription: 'A scalable MERN stack social network featuring secure JWT authentication, infinite-scroll feeds, and optimized media management.',
    fullDescription: `
      This project is a comprehensive social media platform built using the MERN stack, designed with a focus on high-performance data handling and enterprise-grade security. 
      
      Key technical achievements include:
      - Advanced Authentication: Engineered a secure login system for 1000+ users using Access and Refresh Tokens, maintaining 100% session security and robust data protection.
      - Performance Engineering: Developed a high-performance social feed with infinite-scroll pagination, reducing initial page load times by 40% and optimizing long comment threads for seamless navigation.
      - Media & Content Management: Built an optimized image upload and management system that ensures zero-lag post creation and 100% secure, synchronized data deletion across the database and storage.
      - Cloud Deployment: Implemented a scalable REST API architecture, deploying the frontend on Vercel and the backend on Render to ensure high availability.
    `,
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Vercel', 'Render'],
    image: '/projects/social-media.png',
    githubLink: 'https://github.com/Rachit3784',
    liveLink: 'https://taskplanet-frontend-pi.vercel.app',
    video: '',
    videoType: 'local'
  },
  {
    id: 'ecommerce-java-app',
    type: 'video',
    title: 'E-commerce Android Application',
    category: 'Native Android Application',
    shortDescription: 'A full-featured e-commerce platform with product listings, real-time chat between customer and vendor, cart functionality, and secure checkout.',
    fullDescription: `
      This e-commerce application provides a complete online shopping experience built with native Android technologies. 
      It features a responsive design, product search and filtering, user authentication, 
      shopping cart functionality, and secure payment processing.
      
      Key features include:
      - User authentication and profile management
      - Product catalog with categories and filters
      - Shopping cart and wishlist
      - Real-time chat between customer and vendor
      - Checkout process with multiple payment options
      - Order tracking and history
      - Admin dashboard for product and order management
      
      The application is built using Java for Frontend, Retrofit Library for API. 
      Data is stored in Firebase real-time database and Firebase storage.
    `,
    technologies: ['Java', 'XML', 'Firebase', 'Retrofit', 'Android Studio'],
    image: '/projects/ecommproject.png',
    githubLink: 'https://github.com/Rachit3784',
    liveLink: '',
    video: '/projects/EcommProj.mp4',
    videoType: 'local'
  },
  {
    id: 'facebook-ui-clone',
    type: 'image',
    title: 'Facebook UI Clone',
    category: 'React Frontend Project',
    shortDescription: 'A pixel-perfect recreation of the Facebook user interface with NextJs.',
    fullDescription: `
      This project is a detailed clone of the Facebook user interface, recreating the look and feel 
      of the social media platform. It includes various components such as the news feed, sidebar, 
      stories, and post creation.
      
      Features include:
      - Responsive design that works on all devices
      - Dark mode support
      - News feed with post interactions (like, comment, share)
      - Story carousel
      - Friend suggestions
      - Chat sidebar
      
      The clone is built using NextJs, React hooks for state management. Styling is done with Tailwind CSS 
      to achieve a pixel-perfect recreation of the Facebook interface. The project demonstrates 
      advanced CSS skills and component architecture.
    `,
    technologies: ['NextJs', 'ReactJs', 'Tailwind CSS', 'JavaScript'],
    image: '/projects/facebook.png',
    githubLink: 'https://github.com/Rachit3784/face-book-ui',
    liveLink: 'https://face-book-ui-i9dp.vercel.app/',
    video: '',
    videoType: 'local'
  },
];