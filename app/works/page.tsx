'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getProjects, Project } from '@/lib/wordpress';

export default function Works() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const getAllTechnologies = () => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      if (project.meta?.technologies) {
        project.meta.technologies.split(',').forEach((tech) => {
          techSet.add(tech.trim());
        });
      }
    });
    return Array.from(techSet);
  };

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) =>
          project.meta?.technologies
            ?.split(',')
            .map((t) => t.trim())
            .includes(filter)
        );

  const technologies = ['all', ...getAllTechnologies()];

  return (
    <div className="relative pt-32 pb-20">
      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl font-display font-bold mb-6">
            My <span className="gradient-text">Works</span>
          </h1>
          <p className="text-xl text-white/70">
            A collection of projects I&apos;ve built using modern web technologies
          </p>
        </motion.div>
      </section>

      {/* Filter */}
      <section className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                filter === tech
                  ? 'glass-strong scale-105'
                  : 'glass hover:glass-strong hover:scale-105'
              }`}
            >
              {tech === 'all' ? 'All Projects' : tech}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6">
        {loading ? (
          <div className="text-center text-white/70 py-20">
            <div className="inline-block w-12 h-12 border-4 border-accent-pink/30 border-t-accent-pink rounded-full animate-spin" />
            <p className="mt-4">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-white/70 py-20">
            <p className="text-xl">No projects found with this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="project-card group"
              >
                {/* Project Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-display font-bold gradient-text-alt">
                      {project.title.rendered}
                    </h3>
                    {project.meta?.status && (
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          project.meta.status === 'completed'
                            ? 'bg-green-500/20 text-green-300'
                            : project.meta.status === 'in-progress'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {project.meta.status === 'completed' 
                          ? 'Live' 
                          : project.meta.status === 'in-progress'
                          ? 'In Progress'
                          : 'Coming Soon'}
                      </span>
                    )}
                  </div>
                  <div
                    className="text-white/70 text-sm leading-relaxed line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: project.content.rendered }}
                  />
                </div>

                {/* Technologies */}
                {project.meta?.technologies && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.meta.technologies.split(',').map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full glass-strong font-medium"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  {project.meta?.demo_url && project.meta.demo_url !== '#' && (
                    <a
                      href={project.meta.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 glass-button px-4 py-2.5 rounded-lg text-center text-sm font-medium hover:bg-white/10 transition-all group/btn"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Live Demo
                        <svg
                          className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </a>
                  )}
                  {project.meta?.github_url && (
                    <a
                      href={project.meta.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 glass px-4 py-2.5 rounded-lg text-center text-sm font-medium hover:bg-white/10 transition-all group/btn"
                    >
                      <span className="flex items-center justify-center gap-2">
                        GitHub
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-strong rounded-3xl p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Want to see more?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Check out my GitHub profile for more projects and contributions
          </p>
          <a
            href="https://github.com/andreacassini"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button px-10 py-5 rounded-xl font-medium text-lg bg-gradient-to-r from-accent-pink/20 to-accent-blue/20 hover:from-accent-pink/30 hover:to-accent-blue/30 transition-all duration-300"
            >
              View GitHub Profile
            </motion.button>
          </a>
        </motion.div>
      </section>
    </div>
  );
}
