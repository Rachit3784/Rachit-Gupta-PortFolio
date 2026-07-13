// data/experience.js
export const experiences = [
  {
    id: 'app-developer-internship',
    role: 'Application Developer Intern',
    company: 'Talent Acquisition Tech Platform',
    type: 'Internship',
    duration: 'Nov 2025 - Present',
    durationLabel: 'Current Role',
    location: 'Remote · WFH',
    companyLogo: '/logos/wecofy.png',
    certificate: '',
    description: [
      'Developed and shipped multiple production React Native screens for a talent-acquisition app, enabling users to create profiles, showcase talent, and discover opportunities in the entertainment industry.',
      'Implemented REST API integration and improved app responsiveness by cancelling unused requests during navigation, reducing network overhead and enhancing UX.',
      'Designed mobile screens & clean state management with Zustand/Redux mirroring production-grade layered architecture (Controller-Service-Repository).',
      'Optimized image loading, media uploads, and screen transitions for smooth cross-platform performance on Android and iOS.'
    ],
    technologies: ['React Native', 'TypeScript', 'REST APIs', 'Request Cancellation (Axios/AbortController)', 'Zustand', 'Node.js']
  },
  {
    id: 'fullstack-web-internship',
    role: 'Full-Stack & Web Developer Intern',
    company: 'Zaalima Development Pvt. Ltd.',
    type: 'Internship',
    duration: 'Mar 2026 - Jun 2026',
    durationLabel: '3 mos',
    location: 'Remote · Bangalore, India',
    companyLogo: '/logos/zaalima.jpg',
    certificate: '/ZaalimaOfferLetter.pdf',
    description: [
      'Developed responsive web applications using Next.js 16, React.js, and modern CSS/Tailwind frameworks.',
      'Worked with MERN stack (MongoDB Atlas, Express.js, React.js, Node.js) for full-stack web feature delivery.',
      'Implemented secure JWT single-device authentication systems and optimized RESTful API endpoints.',
      'Collaborated directly with product teams on production deployments on Vercel and cloud platforms.'
    ],
    technologies: ['Next.js 16', 'React.js', 'Node.js', 'MongoDB Atlas', 'Express.js', 'TypeScript', 'REST APIs']
  }
];

