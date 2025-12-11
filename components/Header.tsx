'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/works', label: 'Works' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`glass rounded-2xl px-8 py-4 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'shadow-lg' : ''
          }`}
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-display font-bold bg-gradient-to-r from-accent-pink to-accent-blue bg-clip-text text-transparent"
            >
              AC
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ y: -2 }}
                      className="relative text-white/90 hover:text-white transition-colors font-medium cursor-pointer group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-pink to-accent-blue group-hover:w-full transition-all duration-300" />
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button px-6 py-2.5 rounded-xl font-medium bg-gradient-to-r from-accent-pink/20 to-accent-blue/20 hover:from-accent-pink/30 hover:to-accent-blue/30 transition-all duration-300"
            >
              Get in Touch
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
