'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProjects, Project } from '@/lib/wordpress';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data.slice(0, 3)); // Show only first 3 projects
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const stats = [
    { label: 'Projects Completed', value: '5+' },
    { label: 'Years Experience', value: '3+' },
    { label: 'Technologies', value: '15+' },
  ];

  return (
    <div className="relative pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full glass p-2 animate-float">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-pink to-accent-blue flex items-center justify-center text-5xl font-bold">
                AC
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-7xl font-display font-bold mb-6"
          >
            Hi, I'm{' '}
            <span className="gradient-text">Andrea Cassini</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed"
          >
            Full Stack Developer crafting beautiful and functional web experiences
            with modern technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-4 justify-center"
          >
            <Link href="/works">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-8 py-4 rounded-xl font-medium text-lg bg-gradient-to-r from-accent-pink/20 to-accent-blue/20 hover:from-accent-pink/30 hover:to-accent-blue/30 transition-all duration-300"
              >
                View My Work
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/10 transition-all duration-300"
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="glass rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-white/70">
            A selection of my recent work
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-white/70">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="project-card group"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-display font-bold mb-2 gradient-text-alt">
                    {project.title.rendered}
                  </h3>
                  <div
                    className="text-white/70 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: project.content.rendered }}
                  />
                </div>

                {project.meta?.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.meta.technologies.split(',').slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full glass-strong"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  {project.meta?.demo_url && project.meta.demo_url !== '#' && (
                    <a
                      href={project.meta.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 glass-button px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-white/10 transition-all"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.meta?.github_url && (
                    <a
                      href={project.meta.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 glass px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-white/10 transition-all"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <Link href="/works">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/10 transition-all duration-300"
            >
              View All Projects
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="glass-strong rounded-3xl p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Let's Build Something{' '}
            <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-xl text-white/80 mb-8">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button px-10 py-5 rounded-xl font-medium text-lg bg-gradient-to-r from-accent-pink/20 to-accent-blue/20 hover:from-accent-pink/30 hover:to-accent-blue/30 transition-all duration-300"
            >
              Start a Conversation
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

