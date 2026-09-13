import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronUp } from 'lucide-react';
import { NAV_LINKS } from '../data/portfolioData';

const NAV_LINKS_FULL = [
  { id: 'about',         label: 'About' },
  { id: 'skills',        label: 'Skills' },
  { id: 'projects',      label: 'Projects' },
  { id: 'architecture',  label: 'Architecture' },
  { id: 'education',     label: 'Education' },
  { id: 'certifications',label: 'Certifications' },
  { id: 'resume',        label: 'Resume' },
  { id: 'contact',       label: 'Contact' },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [progress,      setProgress]      = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [showTop,       setShowTop]       = useState(false);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 60);
    setShowTop(y > 500);
    const total = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(total > 0 ? (y / total) * 100 : 0);
    const sections = document.querySelectorAll('section[id]');
    let cur = '';
    sections.forEach(s => { if (y >= s.offsetTop - 120) cur = s.id; });
    setActiveSection(cur);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = id => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /* ── Inline Styles ── */
  const S = {
    progressBar: {
      position: 'fixed', top: 0, left: 0, zIndex: 9999,
      height: 3, background: 'linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4)',
      width: `${progress}%`, transition: 'width .1s linear',
      boxShadow: '0 0 10px rgba(59,130,246,.6)',
    },
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: 68,
      background: scrolled ? 'rgba(8,12,24,.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,.08)' : 'none',
      boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,.3)' : 'none',
      transition: 'all .3s cubic-bezier(.4,0,.2,1)',
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    inner: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 32px',
    },
    logo: {
      display: 'flex', alignItems: 'center', gap: 10,
      cursor: 'pointer', userSelect: 'none',
    },
    logoBox: {
      width: 36, height: 36, borderRadius: 9,
      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '.8rem', fontWeight: 900, color: '#fff',
      boxShadow: '0 4px 14px rgba(59,130,246,.45)',
    },
    logoText: {
      fontSize: '.95rem', fontWeight: 800, color: '#f1f5f9',
      letterSpacing: '-.01em',
    },
    logoSub: {
      fontSize: '.65rem', color: '#64748b', fontWeight: 600,
      display: 'block', lineHeight: 1,
    },
    navLinks: {
      display: 'flex', alignItems: 'center', gap: 2,
    },
    link: (active) => ({
      padding: '7px 13px', borderRadius: 8, fontSize: '.83rem', fontWeight: 600,
      color: active ? '#3b82f6' : '#94a3b8',
      background: active ? 'rgba(59,130,246,.1)' : 'transparent',
      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
      transition: 'all .2s',
      textDecoration: 'none', display: 'block',
    }),
    ctaBtn: {
      padding: '9px 20px', borderRadius: 10,
      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      color: '#fff', fontWeight: 700, fontSize: '.83rem',
      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
      boxShadow: '0 4px 14px rgba(59,130,246,.4)',
      transition: 'all .25s',
    },
    hamburger: {
      width: 38, height: 38, borderRadius: 9, border: '1px solid rgba(255,255,255,.12)',
      background: 'rgba(255,255,255,.05)', color: '#94a3b8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
    },
    mobileMenu: {
      position: 'fixed', top: 68, left: 0, right: 0,
      background: 'rgba(8,12,24,.98)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,.08)',
      padding: '16px 24px', zIndex: 999,
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    mobileLink: (active) => ({
      display: 'block', width: '100%', padding: '12px 16px',
      textAlign: 'left', fontSize: '.92rem', fontWeight: 600,
      color: active ? '#3b82f6' : '#94a3b8',
      background: active ? 'rgba(59,130,246,.08)' : 'transparent',
      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
      borderRadius: 10, marginBottom: 2,
    }),
    backTop: {
      position: 'fixed', bottom: 28, right: 28, zIndex: 800,
      width: 44, height: 44, borderRadius: 12,
      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      color: '#fff', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 6px 20px rgba(59,130,246,.5)',
    },
  };

  /* visible nav items (fit desktop) */
  const desktopLinks = NAV_LINKS_FULL.slice(0, 7);

  return (
    <>
      {/* Progress bar */}
      <div style={S.progressBar} aria-hidden/>

      {/* ── Navbar ── */}
      <nav style={S.nav}>
        <div style={S.inner}>

          {/* Logo */}
          <div style={S.logo} onClick={scrollToTop} role="button" tabIndex={0}
            onKeyDown={e => e.key==='Enter' && scrollToTop()}>
            <div style={S.logoBox}>RK</div>
            <div>
              <span style={S.logoText}>Ramesh Kumar</span>
              <span style={S.logoSub}>Full-Stack Developer</span>
            </div>
          </div>

          {/* Desktop links */}
          <div style={S.navLinks} className="nav-desktop-links">
            {desktopLinks.map(l => (
              <button key={l.id} style={S.link(activeSection===l.id)} onClick={()=>scrollTo(l.id)}
                onMouseEnter={e=>{if(activeSection!==l.id){e.currentTarget.style.color='#f1f5f9';e.currentTarget.style.background='rgba(255,255,255,.05)';}}}
                onMouseLeave={e=>{if(activeSection!==l.id){e.currentTarget.style.color='#94a3b8';e.currentTarget.style.background='transparent';}}}>
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <motion.button style={S.ctaBtn} whileHover={{scale:1.04,y:-1}} whileTap={{scale:.96}}
              onClick={()=>scrollTo('contact')}
              className="nav-cta-desktop">
              Contact Me
            </motion.button>
            <button style={S.hamburger} onClick={()=>setMobileOpen(p=>!p)}
              className="nav-hamburger-mobile" aria-label="Toggle menu">
              {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div style={S.mobileMenu}
              initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}
              transition={{duration:.2}}>
              {NAV_LINKS_FULL.map(l => (
                <button key={l.id} style={S.mobileLink(activeSection===l.id)} onClick={()=>scrollTo(l.id)}>
                  {l.label}
                </button>
              ))}
              <button style={{...S.ctaBtn, width:'100%', marginTop:8, padding:'12px'}}
                onClick={()=>scrollTo('contact')}>
                Contact Me
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Back to top ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button style={S.backTop} onClick={scrollToTop}
            initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}
            whileHover={{scale:1.1}} whileTap={{scale:.9}} aria-label="Back to top">
            <ChevronUp size={20}/>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Responsive hide/show */}
      <style>{`
        .nav-cta-desktop { }
        .nav-hamburger-mobile { display: none !important; }
        @media (max-width: 900px) {
          .nav-cta-desktop { display: none !important; }
          .nav-hamburger-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
