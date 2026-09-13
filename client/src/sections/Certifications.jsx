import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, BookOpen } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const certs = CERTIFICATIONS || [
    { title: 'Full Stack Development', platform: 'Udemy', category: 'Web Dev' },
    { title: 'Python Programming', platform: '30DaysCoding', category: 'Language' },
    { title: 'Data Science Basics', platform: 'Cognitive Class', category: 'Data' },
    { title: 'React Essentials', platform: 'Infosys', category: 'Frontend' }
  ];

  const getPlatformColor = (platform) => {
    switch(platform.toLowerCase()) {
      case 'udemy': return '#f59e0b'; // orange
      case '30dayscoding': return '#8b5cf6'; // violet
      case 'cognitive class': return '#3b82f6'; // blue
      case 'infosys': return '#10b981'; // emerald
      default: return 'var(--primary-color)';
    }
  };

  return (
    <section id="certifications" className="section">
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
          <span className="section-label" style={{ display: 'inline-block', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Certifications</span>
          <h2 className="section-title">Learning Never Stops</h2>
        </motion.div>

        <div className="cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="cert-card glass-card"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: getPlatformColor(cert.platform) }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={24} color={getPlatformColor(cert.platform)} />
                </div>
                <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                  {cert.category}
                </span>
              </div>
              
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', lineHeight: '1.4' }}>{cert.title}</h3>
              <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Issued by <strong style={{ color: 'white' }}>{cert.platform}</strong></p>
              
              <button className="btn-outline" style={{ marginTop: 'auto', width: '100%', padding: '0.6rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                View Certificate <ExternalLink size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card"
          style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(to right, rgba(99, 102, 241, 0.1), transparent)' }}
        >
          <div style={{ padding: '1rem', background: 'var(--primary-color)', borderRadius: '50%', color: 'white' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Continuous Learning</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>I am always exploring new technologies and methodologies to stay current in the rapidly evolving tech landscape.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
