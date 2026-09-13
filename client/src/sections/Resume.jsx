import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, SKILLS, PROJECTS, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';
import { trackEvent } from '../services/api';

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="resume" className="section">
      <div className="section-container">
        <motion.div
          className="section-header text-center"
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="section-label" style={{ display: 'inline-block', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Resume</span>
          <h2 className="section-title">My Full Resume</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto' }}>
            A comprehensive overview of my technical skills, educational background, and professional project experience.
          </p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <motion.a
            href="/resume.pdf"
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}
            onClick={() => trackEvent('download_resume')}
            download
          >
            <Download size={20} /> Download Resume
          </motion.a>
          
          <motion.a
            href={PERSONAL_INFO?.linkedin}
            target="_blank"
            rel="noreferrer"
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}
          >
            <ExternalLink size={20} /> LinkedIn Profile
          </motion.a>
        </div>

        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="resume-preview glass-card"
          style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(255,255,255,0.95)', color: '#333', padding: '3rem', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
        >
          <div style={{ textAlign: 'center', borderBottom: '2px solid #ddd', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <h1 style={{ margin: '0 0 0.5rem 0', color: '#111', fontSize: '2.5rem' }}>Ramesh Kumar Thakur</h1>
            <h3 style={{ margin: '0 0 1rem 0', color: '#4f46e5', fontWeight: 500 }}>Full Stack Developer</h3>
            <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
              {PERSONAL_INFO?.email} | {PERSONAL_INFO?.phone} | {PERSONAL_INFO?.location}
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#111', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px' }}>Summary</h3>
            <p style={{ margin: 0, color: '#444', lineHeight: '1.6' }}>{PERSONAL_INFO?.bio}</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#111', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {(SKILLS || []).map(skill => (
                <span key={skill.name} style={{ background: '#f3f4f6', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', color: '#374151', border: '1px solid #e5e7eb' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#111', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px' }}>Projects</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {(PROJECTS || []).slice(0, 3).map((project, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
                    <strong style={{ color: '#111', fontSize: '1.1rem' }}>{project.title}</strong>
                    <span style={{ color: '#4f46e5', fontSize: '0.9rem' }}>{project.category}</span>
                  </div>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#444', fontSize: '0.9rem' }}>{project.description}</p>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>Technologies: {project.tags?.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ color: '#111', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px' }}>Education</h3>
              {(EDUCATION || []).map((edu, i) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  <strong style={{ display: 'block', color: '#111' }}>{edu.degree}</strong>
                  <div style={{ color: '#444', fontSize: '0.9rem' }}>{edu.institution}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>{edu.period}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ color: '#111', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px' }}>Certifications</h3>
              {(CERTIFICATIONS || []).map((cert, i) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  <strong style={{ display: 'block', color: '#111' }}>{cert.title}</strong>
                  <div style={{ color: '#444', fontSize: '0.9rem' }}>{cert.platform}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
