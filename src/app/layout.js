import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Rachit Gupta — Full-Stack Engineer | Next.js & React Native Developer',
  description: 'Portfolio of Rachit Gupta, Full-Stack Engineer specializing in Next.js 16, React Native, Node.js, and MongoDB. Available for hire - 2026 Batch.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
