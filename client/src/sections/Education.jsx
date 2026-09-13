import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, MapPin, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export default function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const eduData = EDUCATION || [
    { period: '2024 - 2027', degree: 'B.Tech CSE (AI & ML)', institution: 'KCC Institute', location: 'Greater Noida' },
    { period: '2021 - 2024', degree: 'Diploma CSE', institution: 'MMIT', location: 'Siddharth Nagar' }
  ];

  return (
    <section id="education" className="section">
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
          <span className="section-label" style={{ display: 'inline-block', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Education</span>
          <h2 className="section-title">Academic Journey</h2>
        </motion.div>

        <div className="timeline" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
          <div style={{ position: 'absolute', left: '24px', top: 0, bottom: 0, width: '2px', background: 'rgba(99, 102, 241, 0.3)' }}></div>
          
          {eduData.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, delay: 0.2 + (idx * 0.2) }}
              style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', position: 'relative' }}
            >
              <div style={{ position: 'absolute', left: '16px', top: '24px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--primary-color)', border: '4px solid var(--bg-dark)', zIndex: 2 }}></div>
              <div style={{ marginLeft: '60px', width: '100%' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <GraduationCap size={20} className="text-primary" /> {edu.degree}
                      </h3>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500 }}>{edu.institution}</p>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                      <Calendar size={14} /> {edu.period}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <MapPin size={16} /> {edu.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card"
          style={{ maxWidth: '800px', margin: '2rem auto 0', padding: '2rem', textAlign: 'center', borderTop: '2px solid var(--primary-color)' }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: 'white' }}>Current Focus</h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
            Actively building MERN stack applications while exploring Artificial Intelligence and Machine Learning concepts to create smarter web solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
