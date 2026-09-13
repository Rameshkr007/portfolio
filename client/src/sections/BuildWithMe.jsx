import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BUILD_STEPS } from '../data/portfolioData';
import { ChevronRight } from 'lucide-react';

export default function BuildWithMe() {
  const [activeStep, setActiveStep] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = BUILD_STEPS || [
    { title: 'Requirements', desc: 'Understanding the problem and defining scope.' },
    { title: 'Design', desc: 'Architecting the solution and planning UI/UX.' },
    { title: 'Frontend', desc: 'Building responsive React components.' },
    { title: 'Backend', desc: 'Developing robust APIs and server logic.' },
    { title: 'Database', desc: 'Designing optimal schemas and data flow.' },
    { title: 'Integration', desc: 'Connecting all parts seamlessly.' },
    { title: 'Testing', desc: 'Ensuring quality and performance.' },
    { title: 'Deployment', desc: 'Shipping to production securely.' }
  ];

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="process" className="section">
      <div className="section-container">
        <motion.div
          className="section-header"
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <span className="section-label" style={{ display: 'inline-block', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Development Process</span>
          <h2 className="section-title">How I Approach Building</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>
          <motion.div
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.3' }}>A Systematic Approach to Problem Solving</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
              Building reliable software requires more than just writing code. It demands a structured methodology from conception to deployment. Here is the workflow I follow to ensure quality and maintainability in every project.
            </p>
            <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary-color)' }}>
              <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-secondary)' }}>"Good architecture makes the system easy to understand, easy to develop, easy to maintain, and easy to deploy."</p>
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="steps-container"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {steps.map((step, idx) => (
              <div key={idx} className="step-item" style={{ position: 'relative' }}>
                <div 
                  className={`glass-card ${activeStep === idx ? 'active' : ''}`}
                  onClick={() => setActiveStep(activeStep === idx ? -1 : idx)}
                  style={{
                    padding: '1.5rem',
                    cursor: 'pointer',
                    border: activeStep === idx ? '1px solid var(--primary-color)' : '1px solid rgba(255,255,255,0.05)',
                    background: activeStep === idx ? 'rgba(99, 102, 241, 0.05)' : 'var(--bg-card)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: activeStep === idx ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)', color: activeStep === idx ? 'white' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', transition: 'all 0.3s ease' }}>
                      {idx + 1}
                    </div>
                    <h4 style={{ margin: 0, flexGrow: 1, fontSize: '1.1rem', color: activeStep === idx ? 'white' : 'var(--text-secondary)' }}>{step.title}</h4>
                    <ChevronRight style={{ transform: activeStep === idx ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.3s ease', color: activeStep === idx ? 'var(--primary-color)' : 'var(--text-secondary)' }} />
                  </div>
                  
                  <AnimatePresence>
                    {activeStep === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ margin: '1rem 0 0 0', paddingLeft: 'calc(40px + 1.5rem)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          {step.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {idx < steps.length - 1 && (
                  <div style={{ position: 'absolute', left: '2rem', top: '100%', width: '2px', height: '1rem', background: 'rgba(255,255,255,0.1)', zIndex: -1 }}></div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
