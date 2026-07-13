// data/projects.js
export const projects = [
  {
    id: 'movie-finder',
    type: 'image',
    title: 'Movie Finder — Movie Discovery Web App',
    category: 'Next.js 16 + Web App',
    shortDescription: 'Full-stack movie discovery web app built with Next.js 16 App Router, TypeScript, and TMDB REST API.',
    fullDescription: `
      Movie Finder is a high-performance, responsive movie discovery platform built with Next.js 16 App Router and TypeScript, fetching real-time data from the TMDB REST API.

      Key technical highlights include:
      - Next.js 16 App Router & Server Components: Server-side rendering and streaming for instant page loads and optimized SEO.
      - Dynamic Discovery & Infinite Scroll: Infinite-scroll pagination and instant search debouncing across trending, top-rated, and genre-filtered movies.
      - Rich Media & In-App Playback: Embedded video trailer playback and interactive modal overlays for seamless browsing.
      - Client-Side Persistence: Favorites & watchlist system with persistent local state management.
      - Production Deployment: Deployed live on Vercel with optimized API request caching and Next.js Image optimization.
    `,
    technologies: ['Next.js 16', 'TypeScript', 'TMDB API', 'Tailwind CSS', 'React.js', 'Vercel'],
    image: '/projects/facebook.png',
    githubLink: 'https://github.com/Rachit3784/movie-finder',
    liveLink: 'https://movie-finder-six-black.vercel.app/',
    video: '',
    videoType: 'local'
  },
  {
    id: 'grocery-delivery-app',
    type: 'video',
    title: 'Grocery Delivery Application',
    category: 'React Native + Full-Stack App',
    shortDescription: 'Full-stack e-commerce mobile app featuring layered backend architecture, OTP auth, location discovery, and Razorpay.',
    fullDescription: `
      Architected a production-grade full-stack e-commerce mobile app from scratch (Nov 2025 – Jan 2026), mirroring enterprise Node.js API architecture following Controller-Service-Repository patterns.

      Key technical milestones include:
      - Clean Layered Architecture: Structured backend services with a strict separation of concerns (Controller-Service-Repository), making APIs maintainable and testable.
      - Comprehensive REST API Suite: Designed APIs for OTP authentication, user profiles, address management, product catalogs with variant pricing, category pagination, and location-based product discovery.
      - Session Security & Single Device Auth: Engineered secure JWT authentication with server-side session validation and automatic single-device session invalidation on new logins.
      - Multi-Channel Payments: Integrated Razorpay payment gateway alongside custom wallet payments and Cash on Delivery (COD) workflows.
      - Cart & Order Lifecycle: Implemented persistent cart state, real-time checkout validation, order tracking, and instant order cancellation logic.
    `,
    technologies: ['React Native', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Razorpay', 'JWT Auth', 'Zustand'],
    image: '/projects/grocery-app.png',
    githubLink: 'https://github.com/Rachit3784/Grocery_App',
    liveLink: '',
    video: 'https://drive.google.com/file/d/1IcXHjxvN50YI3uk1BG7D5cDkearRZhUS/view?usp=drivesdk',
    videoType: 'gdrive'
  },
  {
    id: 'chit-chat-app',
    type: 'video',
    title: 'Chit Chat — E2E Encrypted Chat & Video Calling',
    category: 'React Native + Real-Time App',
    shortDescription: 'Real-time, end-to-end encrypted messaging & WebRTC audio/video calling app with WhatsApp-style delivery states.',
    fullDescription: `
      Chit Chat is a secure, real-time communication platform (Mar 2025 – Apr 2026) featuring end-to-end encryption and high-definition WebRTC video calling.

      Key technical achievements include:
      - End-to-End Encryption (E2EE): Implemented public-private key cryptography ensuring private 1-on-1 messaging where only participating devices can decrypt message payloads.
      - WhatsApp-Style Delivery States: Built real-time delivery status tracking (Sent, Delivered, Read ticks) backed by WebSockets & Firebase real-time sync.
      - WebRTC Audio/Video Calling: Developed peer-to-peer real-time voice and video calling with incoming, ongoing, and busy call state management.
      - Push Notification Signaling: Integrated push notification signals to ring devices even when the app is in background or terminated states.
      - Local Storage & Sync: Implemented optimized local SQLite/AsyncStorage chat indexing for offline availability and contact synchronization.
    `,
    technologies: ['React Native', 'Firebase', 'WebRTC', 'Node.js', 'Cryptography', 'Push Notifications'],
    image: '/projects/music-app.png',
    githubLink: 'https://github.com/Rachit3784/chit-chat',
    liveLink: '',
    video: 'https://drive.google.com/file/d/1sn7MngcDebzpglT2IzspI8O7gP5iJlha/view?usp=drivesdk',
    videoType: 'gdrive'
  },
  {
    id: 'music-streaming-app',
    type: 'video',
    title: 'Ad-Free Music Streaming App',
    category: 'React Native Application',
    shortDescription: 'A high-performance music application featuring background playback, complex state synchronization, and AI recommendations.',
    fullDescription: `
      This project is a sophisticated music streaming application built with Expo and TypeScript, designed to master complex state management and local data persistence.
      
      Key technical features include:
      - Optimized State Management: Utilized Zustand for an ultra-responsive global state, ensuring perfectly synced UI between full player and mini-player components.
      - Advanced Playback Engine: Integrated Expo-AV to enable seamless background audio playback and persistent track sessions.
      - Performance Optimization: Implemented search debouncing and intelligent caching strategies to minimize API overhead and enhance UI responsiveness.
      - Real-time Discovery: Integrated the JioSaavn API for real-time music fetching, complemented by an AI-based recommendation system.
      - Data Persistence: Used AsyncStorage for local caching of favorites, search history, and track queues.
    `,
    technologies: ['React Native', 'TypeScript', 'Zustand', 'Expo-AV', 'AsyncStorage', 'JioSaavn API'],
    image: '/projects/music-app.png',
    githubLink: 'https://github.com/Rachit3784/jio-saavn-music-app',
    liveLink: '',
    video: 'https://drive.google.com/file/d/1sn7MngcDebzpglT2IzspI8O7gP5iJlha/view?usp=drivesdk',
    videoType: 'gdrive'
  },
  {
    id: 'mern-social-media',
    type: 'video',
    title: 'Full-Stack Social Media Platform',
    category: 'MERN Stack Application',
    shortDescription: 'A scalable MERN stack social network featuring secure JWT authentication, infinite-scroll feeds, and media management.',
    fullDescription: `
      A comprehensive social media platform built using the MERN stack, designed with a focus on high-performance data handling and enterprise-grade security. 
      
      Key technical achievements include:
      - Advanced Authentication: Engineered a secure login system using Access and Refresh Tokens, maintaining session security and robust data protection.
      - Performance Engineering: Developed a high-performance social feed with infinite-scroll pagination, reducing initial page load times by 40%.
      - Media & Content Management: Built an optimized image upload and management system for zero-lag post creation.
      - Cloud Deployment: Implemented scalable REST APIs, deploying frontend on Vercel and backend on Render.
    `,
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Vercel', 'Render'],
    image: '/projects/social-media.png',
    githubLink: 'https://github.com/Rachit3784',
    liveLink: 'https://taskplanet-frontend-pi.vercel.app',
    video: '',
    videoType: 'local'
  }
];