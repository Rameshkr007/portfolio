import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ARCHITECTURE_LAYERS } from '../data/portfolioData';
import { ChevronDown, Layers, BookOpen, Folder } from 'lucide-react';

export default function Architecture() {
  const [activeLayer, setActiveLayer] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const layers = ARCHITECTURE_LAYERS || [
    { name: 'UI / Frontend', tech: 'React.js', icon: '🎨', desc: 'User Interface', usage: 'I build responsive UIs with React.', project: 'Portfolio' },
    { name: 'REST API', tech: 'Express', icon: '🔌', desc: 'API Layer', usage: 'I design RESTful APIs for communication.', project: 'E-commerce' },
    { name: 'Backend', tech: 'Node.js', icon: '⚙️', desc: 'Server Logic', usage: 'I write scalable backend services.', project: 'Chat App' },
    { name: 'Database', tech: 'MongoDB', icon: '🗄️', desc: 'Data Storage', usage: 'I model and store data efficiently.', project: 'Blog Platform' }
  ];

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="architecture" className="section">
      <div className="section-container">
        <motion.div
          className="section-header text-center"
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label" style={{ display: 'inline-block', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Engineering Architecture</span>
          <h2 className="section-title" style={{ background: 'linear-gradient(to right, #fff, var(--primary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>How I Build Applications</h2>
        </motion.div>

        <div className="arch-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>
          <motion.div 
            className="layer-list"
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            {layers.map((layer, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div 
                  className={`layer-card glass-card ${activeLayer === idx ? 'active' : ''}`}
                  onClick={() => setActiveLayer(idx)}
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    border: activeLayer === idx ? '1px solid var(--primary-color)' : '1px solid rgba(255,255,255,0.05)',
                    background: activeLayer === idx ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    {layer.icon}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{layer.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{layer.tech}</span>
                  </div>
                </div>
                {idx < layers.length - 1 && (
                  <div style={{ height: '20px', width: '2px', background: 'rgba(255,255,255,0.1)', margin: '0 auto' }}></div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="layer-detail glass-card"
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ padding: '2.5rem', minHeight: '400px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ flexGrow: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '1px solid var(--primary-color)' }}>
                    {layers[activeLayer].icon}
                  </div>
                  <div>
                    <h2 style={{ margin: 0, color: 'white' }}>{layers[activeLayer].name}</h2>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 500 }}>{layers[activeLayer].tech}</span>
                  </div>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Layers size={18} /> What it does</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{layers[activeLayer].desc}</p>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen size={18} /> How I use it</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{layers[activeLayer].usage}</p>
                </div>
                
                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <Folder size={16} /> Example Project: 
                    <span style={{ color: 'var(--primary-color)' }}>{layers[activeLayer].project}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
