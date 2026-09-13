import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PERSONAL_INFO, SKILLS, PROJECTS } from '../data/portfolioData';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function Terminal() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to Ramesh Thakur\'s Developer Terminal v1.0.0' },
    { type: 'system', content: 'Type "help" to see available commands.' }
  ]);
  const endRef = useRef(null);

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim().toLowerCase();
      let output = '';

      switch (cmd) {
        case 'help':
          output = 'Available commands: about, skills, projects, education, contact, github, whoami, clear';
          break;
        case 'about':
          output = PERSONAL_INFO?.bio || 'Full Stack Developer focusing on MERN stack and AI/ML.';
          break;
        case 'skills':
          output = (SKILLS || []).map(s => s.name).join(', ') || 'React, Node, Express, MongoDB, Python';
          break;
        case 'projects':
          output = (PROJECTS || []).map(p => `- ${p.title}`).join('\n') || 'View the projects section above.';
          break;
        case 'education':
          output = 'B.Tech CSE (AI & ML) at KCC Institute\nDiploma CSE at MMIT';
          break;
        case 'contact':
          output = `Email: ${PERSONAL_INFO?.email || 'contact@example.com'}\nPhone: ${PERSONAL_INFO?.phone || '+91-XXXXXXXXXX'}`;
          break;
        case 'github':
          output = `Opening ${PERSONAL_INFO?.github || 'GitHub'}...`;
          if (PERSONAL_INFO?.github) window.open(PERSONAL_INFO.github, '_blank');
          break;
        case 'whoami':
          output = 'Ramesh Kumar Thakur - Full Stack Developer & AI/ML Enthusiast';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          output = `Command not found: ${cmd}. Type "help" for available commands.`;
      }

      setHistory(prev => [...prev, { type: 'input', content: `$ ${cmd}` }, { type: 'output', content: output }]);
      setInput('');
    }
  };

  return (
    <section id="terminal" className="section">
      <div className="section-container">
        <motion.div
          className="section-header text-center"
          ref={ref}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="section-label" style={{ display: 'inline-block', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Developer Terminal</span>
          <h2 className="section-title">Try It Out</h2>
        </motion.div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="terminal-window"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: '#1e1e1e',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="terminal-header" style={{ background: '#323233', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
            <div style={{ flexGrow: 1, textAlign: 'center', color: '#a0a0a0', fontSize: '0.85rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <TerminalIcon size={14} /> guest@ramesh-portfolio:~
            </div>
          </div>
          
          <div className="terminal-body" style={{ padding: '1.5rem', height: '350px', overflowY: 'auto', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', color: '#e0e0e0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {history.map((item, idx) => (
              <div key={idx} style={{ 
                color: item.type === 'system' ? '#56b6c2' : item.type === 'input' ? '#e5c07b' : '#98c379',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.5'
              }}>
                {item.content}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span style={{ color: '#e5c07b' }}>$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                style={{ background: 'transparent', border: 'none', color: '#e0e0e0', outline: 'none', flexGrow: 1, fontFamily: '"Fira Code", monospace', fontSize: '0.9rem' }}
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
            </div>
            <div ref={endRef} />
          </div>
          <div style={{ padding: '0.5rem 1rem', background: '#252526', fontSize: '0.75rem', color: '#808080', borderTop: '1px solid #3c3c3c' }}>
            Tip: Press Tab for autocomplete (coming soon)
          </div>
        </motion.div>
      </div>
    </section>
  );
}
