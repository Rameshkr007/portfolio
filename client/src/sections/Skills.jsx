import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SKILLS, SKILL_CATEGORIES } from '../data/portfolioData';
import TechIcon from '../components/TechIcon';
import { Info, X, Zap } from 'lucide-react';

const CAT_COLORS = {
  All: '#6366f1', Languages: '#3b82f6', Frontend: '#8b5cf6', Backend: '#10b981', Tools: '#f59e0b',
};

export default function Skills() {
  const [activeCat, setActiveCat]   = useState('All');
  const [selected, setSelected]     = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  const filtered = activeCat === 'All' ? SKILLS : SKILLS.filter(s => s.category === activeCat);

  return (
    <section id="skills" style={{ padding: '100px 0', background: 'var(--bg-primary)' }}>
      <div className="container">

        {/* ── Header ── */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Technical Arsenal</span>
          <h2 className="section-title">Skills &amp; <span>Technologies</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: 520 }}>
            Every tool learned through real projects — not just tutorials.
          </p>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {SKILL_CATEGORIES.map(cat => (
            <motion.button key={cat} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveCat(cat); setSelected(null); }}
              style={{
                padding: '7px 20px', borderRadius: 100, fontSize: '.82rem', fontWeight: 700,
                border: `1.5px solid ${activeCat === cat ? CAT_COLORS[cat] : 'rgba(255,255,255,.1)'}`,
                background: activeCat === cat ? `${CAT_COLORS[cat]}22` : 'transparent',
                color: activeCat === cat ? CAT_COLORS[cat] : 'var(--text-secondary)',
                cursor: 'pointer', transition: 'all .25s', fontFamily: 'inherit',
              }}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Main layout: Grid + Detail Panel ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: selected ? '1fr 320px' : '1fr',
          gap: '1.5rem', alignItems: 'start', transition: 'grid-template-columns .4s',
        }}>

          {/* Skills Grid */}
          <motion.div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
            gap: '1rem',
          }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, i) => {
                const isActive = selected?.name === skill.name;
                return (
                  <motion.div key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.82 }}
                    transition={{ duration: 0.28, delay: i * 0.035 }}
                    onClick={() => setSelected(isActive ? null : skill)}
                    whileHover={{ scale: 1.07, y: -4,
                      boxShadow: `0 8px 30px ${skill.color}30`,
                      border: `1.5px solid ${skill.color}66`,
                    }}
                    style={{
                      padding: '1.2rem .75rem', borderRadius: 14, cursor: 'pointer',
                      textAlign: 'center', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: 10,
                      background: isActive ? `${skill.color}18` : 'rgba(255,255,255,.03)',
                      border: `1.5px solid ${isActive ? skill.color + '77' : 'rgba(255,255,255,.07)'}`,
                      boxShadow: isActive ? `0 0 24px ${skill.color}25, 0 8px 30px ${skill.color}18` : 'none',
                      transition: 'all .25s cubic-bezier(.4,0,.2,1)',
                      position: 'relative', overflow: 'hidden',
                    }}>
                    {/* Glow dot on active */}
                    {isActive && (
                      <span style={{
                        position: 'absolute', top: 8, right: 8, width: 7, height: 7,
                        borderRadius: '50%', background: skill.color,
                        boxShadow: `0 0 8px ${skill.color}`,
                      }} />
                    )}
                    <TechIcon name={skill.icon || skill.name} color={skill.color} size={42} />
                    <span style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {skill.name}
                    </span>
                    <span style={{
                      fontSize: '.63rem', color: isActive ? skill.color : 'var(--text-muted)',
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em',
                    }}>
                      {skill.category}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* ── Detail Panel ── */}
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, x: 32, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 32, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'sticky', top: 90, padding: '1.75rem', borderRadius: 18,
                  background: `linear-gradient(135deg, ${selected.color}0d, rgba(14,22,40,.97))`,
                  border: `1.5px solid ${selected.color}44`,
                  boxShadow: `0 0 50px ${selected.color}18, 0 20px 60px rgba(0,0,0,.4)`,
                  backdropFilter: 'blur(20px)',
                }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.5rem' }}>
                  <TechIcon name={selected.icon || selected.name} color={selected.color} size={54} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {selected.name}
                    </div>
                    <div style={{
                      fontSize: '.73rem', color: selected.color, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '.09em', marginTop: 2,
                    }}>
                      {selected.category}
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)}
                    style={{ background: 'rgba(255,255,255,.06)', border: 'none', borderRadius: 8,
                      width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: 'var(--text-muted)', flexShrink: 0 }}>
                    <X size={15} />
                  </button>
                </div>

                {/* How I use it */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: selected.color, fontWeight: 700, fontSize: '.78rem',
                    marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.08em',
                  }}>
                    <Info size={13} /> How I Use It
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '.87rem', lineHeight: 1.75, margin: 0 }}>
                    {selected.usage}
                  </p>
                </div>

                {/* Used in project */}
                {selected.relatedProject && (
                  <div style={{
                    padding: '10px 14px', background: 'rgba(255,255,255,.04)',
                    borderRadius: 10, border: '1px solid rgba(255,255,255,.08)',
                    display: 'flex', gap: 10, alignItems: 'center',
                  }}>
                    <Zap size={14} style={{ color: selected.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '.67rem', color: 'var(--text-muted)', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 2 }}>
                        Used In
                      </div>
                      <div style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {selected.relatedProject}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer count */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '.8rem', marginTop: '2rem' }}>
          {filtered.length} technologies &bull; Click any card to see how I use it
        </motion.p>
      </div>
    </section>
  );
}
