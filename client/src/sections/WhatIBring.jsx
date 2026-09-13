import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WHAT_I_BRING } from '../data/portfolioData';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function WhatIBring() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const offerings = WHAT_I_BRING || [
    { title: 'End-to-End Ownership', desc: 'From database design to frontend deployment, I handle the complete lifecycle.', icon: <CheckCircle2 size={24} /> },
    { title: 'Security-Conscious Development', desc: 'Implementing best practices for data protection and secure authentication.', icon: <ShieldCheck size={24} /> },
    { title: 'Fast Learning', desc: 'Quick to adapt to new technologies and integrate them into existing workflows.', icon: <Zap size={24} /> }
  ];

  return (
    <section id="value" className="section">
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
          <span className="section-label" style={{ display: 'inline-block', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Value Proposition</span>
          <h2 className="section-title">What I Bring to the Team</h2>
        </motion.div>

        <div className="offerings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {offerings.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="value-card glass-card"
              style={{
                padding: '2.5rem 2rem',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
              }}
              whileHover={{ y: -10 }}
            >
              <div className="hover-border" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--primary-color)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease' }}></div>
              
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary-color)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                {item.icon}
              </div>
              
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>{item.title}</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
