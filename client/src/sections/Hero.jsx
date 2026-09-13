import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Download, ChevronDown, MapPin, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { PERSONAL_INFO, TYPEWRITER_STRINGS } from '../data/portfolioData';
import { trackEvent } from '../services/api';
import profilePhoto from '../assets/profile.jpg';

/* ─ Orbit nodes ─ */
const NODES = [
  { label: 'React',   color: '#61DAFB', bg: '#0d1f2d', emoji: '⚛',  deg: 0   },
  { label: 'Node',    color: '#3ECF4C', bg: '#0d1a0e', emoji: '⬡',  deg: 60  },
  { label: 'Mongo',   color: '#00ED64', bg: '#0a1f0a', emoji: '🍃', deg: 120 },
  { label: 'Express', color: '#c0c0c0', bg: '#1a1a1a', emoji: '⚡', deg: 180 },
  { label: 'JWT',     color: '#D63AFF', bg: '#1a0d1f', emoji: '🔐', deg: 240 },
  { label: 'Python',  color: '#FFD43B', bg: '#1f1a08', emoji: '🐍', deg: 300 },
];

/* ─ Typewriter ─ */
function useTypewriter(strings) {
  const [text, setText]         = useState('');
  const [sIdx, setSIdx]         = useState(0);
  const [cIdx, setCIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const str   = strings[sIdx] ?? '';
    const speed = deleting ? 38 : 90;
    const t = setTimeout(() => {
      if (!deleting && cIdx < str.length) {
        setText(p => p + str[cIdx]); setCIdx(c => c + 1);
      } else if (deleting && cIdx > 0) {
        setText(p => p.slice(0, -1));  setCIdx(c => c - 1);
      } else if (!deleting && cIdx === str.length) {
        setTimeout(() => setDeleting(true), 2200);
      } else {
        setDeleting(false); setSIdx(i => (i + 1) % strings.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [cIdx, deleting, sIdx, strings]);

  return text;
}

export default function Hero() {
  const typed   = useTypewriter(TYPEWRITER_STRINGS);
  const [imgOk, setImgOk] = useState(false);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const wrapRef = useRef(null);

  /* parallax */
  useEffect(() => {
    const fn = e => {
      if (!wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      setMx(((e.clientX - r.left) / r.width  - .5) * 14);
      setMy(((e.clientY - r.top)  / r.height - .5) * 14);
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  /* helpers */
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 32 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: .65, delay, ease: [.4, 0, .2, 1] },
  });

  /* ── STYLES ── */
  const S = {
    section: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: '#080c18',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '72px',
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    container: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '60px 32px',
      position: 'relative',
      zIndex: 1,
      width: '100%',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 480px',
      gap: '80px',
      alignItems: 'center',
    },
    /* ── LEFT ── */
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 18px',
      borderRadius: 100,
      background: 'rgba(16,185,129,.12)',
      border: '1.5px solid rgba(16,185,129,.4)',
      color: '#10b981',
      fontSize: '.78rem',
      fontWeight: 700,
      letterSpacing: '.04em',
      marginBottom: 24,
    },
    dot: {
      width: 8, height: 8, borderRadius: '50%',
      background: '#10b981',
      boxShadow: '0 0 8px #10b981',
      animation: 'pulseDot 2s ease-in-out infinite',
      flexShrink: 0,
    },
    name: {
      fontSize: 'clamp(2.6rem, 5.5vw, 3.8rem)',
      fontWeight: 900,
      lineHeight: 1.08,
      background: 'linear-gradient(135deg,#f1f5f9 0%,#cbd5e1 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: 18,
      letterSpacing: '-0.025em',
    },
    typeRow: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
      fontSize: 'clamp(1.1rem,2.8vw,1.5rem)',
      fontWeight: 600,
      marginBottom: 14,
      color: '#94a3b8',
    },
    typeText: {
      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    cursor: {
      color: '#3b82f6',
      animation: 'blinkCursor 1s step-end infinite',
      fontWeight: 300,
    },
    location: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 8,
      color: '#64748b',
      fontSize: '.85rem',
      marginBottom: 20,
    },
    bio: {
      color: '#94a3b8',
      fontSize: '.95rem',
      lineHeight: 1.8,
      maxWidth: 500,
      marginBottom: 28,
    },
    statsRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      flexWrap: 'wrap',
      marginBottom: 32,
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
    statVal: {
      fontSize: '1.5rem',
      fontWeight: 900,
      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: 1,
    },
    statLabel: {
      fontSize: '.68rem',
      color: '#64748b',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.1em',
    },
    statDivider: {
      width: 1,
      height: 36,
      background: 'rgba(255,255,255,.1)',
    },
    btnRow: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginBottom: 32,
    },
    btnPrimary: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '13px 28px', borderRadius: 12,
      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      color: '#fff', fontWeight: 700, fontSize: '.92rem',
      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
      boxShadow: '0 6px 24px rgba(59,130,246,.4)',
      transition: 'all .25s',
    },
    btnSec: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '13px 24px', borderRadius: 12,
      background: 'rgba(255,255,255,.05)',
      border: '1.5px solid rgba(255,255,255,.12)',
      color: '#f1f5f9', fontWeight: 700, fontSize: '.92rem',
      cursor: 'pointer', fontFamily: 'inherit',
      transition: 'all .25s',
    },
    btnGhost: {
      display: 'inline-flex', alignItems: 'center', gap: 7,
      padding: '12px 20px', borderRadius: 12,
      background: 'transparent',
      border: '1.5px solid rgba(59,130,246,.4)',
      color: '#3b82f6', fontWeight: 700, fontSize: '.9rem',
      cursor: 'pointer', fontFamily: 'inherit',
      transition: 'all .25s',
    },
    socialRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
    },
    socialLabel: {
      fontSize: '.75rem', color: '#475569',
      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em',
    },
    socialBtn: {
      width: 40, height: 40, borderRadius: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(255,255,255,.05)',
      border: '1.5px solid rgba(255,255,255,.1)',
      color: '#94a3b8', transition: 'all .25s', cursor: 'pointer',
    },
    /* ── RIGHT ── */
    visual: {
      position: 'relative',
      width: '100%',
      height: 480,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    photoOuter: {
      position: 'relative',
      width: 240,
      height: 240,
      zIndex: 3,
    },
    photoBorderRing: {
      position: 'absolute',
      inset: -4,
      borderRadius: '50%',
      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4,#3b82f6)',
      backgroundSize: '300% 300%',
      animation: 'gradSpin 4s linear infinite',
      zIndex: -1,
    },
    photoInner: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '4px solid #080c18',
      position: 'relative',
      zIndex: 2,
      background: 'linear-gradient(135deg,#1e3a5f,#2d1b69)',
    },
    photoImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'top center',
      display: 'block',
      filter: 'brightness(1.06) contrast(1.03) saturate(1.05)',
    },
    photoGlow: {
      position: 'absolute',
      inset: -30,
      borderRadius: '50%',
      background: 'radial-gradient(circle,rgba(59,130,246,.35) 0%,rgba(139,92,246,.2) 45%,transparent 70%)',
      filter: 'blur(18px)',
      zIndex: 1,
      pointerEvents: 'none',
    },
    availBadge: {
      position: 'absolute',
      bottom: -6,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 14px',
      borderRadius: 100,
      background: 'rgba(8,12,24,.95)',
      border: '1.5px solid rgba(16,185,129,.5)',
      color: '#10b981',
      fontSize: '.7rem',
      fontWeight: 800,
      whiteSpace: 'nowrap',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 0 16px rgba(16,185,129,.25)',
    },
    orbitRing: {
      position: 'absolute',
      borderRadius: '50%',
      border: '1px dashed rgba(59,130,246,.18)',
      zIndex: 1,
      pointerEvents: 'none',
    },
    node: {
      position: 'absolute',
      width: 64,
      height: 64,
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
      cursor: 'default',
      zIndex: 5,
      transition: 'all .2s',
      backdropFilter: 'blur(10px)',
    },
    floatCard: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      borderRadius: 14,
      background: 'rgba(8,12,24,.92)',
      border: '1.5px solid rgba(255,255,255,.1)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 8px 32px rgba(0,0,0,.5)',
      zIndex: 10,
    },
    scrollHint: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      marginTop: 48,
      color: '#475569',
      cursor: 'pointer',
      fontSize: '.7rem',
      textTransform: 'uppercase',
      letterSpacing: '.12em',
    },
  };

  const STATS = [
    { val: '6+', label: 'Projects' },
    null,
    { val: 'MERN', label: 'Stack' },
    null,
    { val: 'REST', label: 'APIs' },
    null,
    { val: 'JWT', label: 'Auth' },
  ];

  return (
    <section style={S.section} ref={wrapRef}>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.7); }
          50%      { box-shadow: 0 0 0 7px rgba(16,185,129,0); }
        }
        @keyframes blinkCursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes gradSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatUp   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-9px)} }
        @keyframes floatDown { 0%,100%{transform:translateY(0)}  50%{transform:translateY(9px)}  }
        @keyframes orbitRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes orbitRotateR{ from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes bgBlob {
          0%,100%{transform:scale(1) translate(0,0)}
          33%{transform:scale(1.1) translate(2%,2%)}
          66%{transform:scale(.95) translate(-1%,3%)}
        }
        @keyframes particle { 0%,100%{opacity:.25;transform:translateY(0)} 50%{opacity:1;transform:translateY(-24px)} }
        @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      `}</style>

      {/* ── Background blobs ── */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', zIndex:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-15%', left:'-10%',
          width:500, height:500, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(59,130,246,.18) 0%,transparent 65%)',
          animation:'bgBlob 14s ease-in-out infinite', filter:'blur(2px)' }}/>
        <div style={{ position:'absolute', bottom:'-20%', right:'-8%',
          width:450, height:450, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(139,92,246,.16) 0%,transparent 65%)',
          animation:'bgBlob 18s ease-in-out infinite 3s', filter:'blur(2px)' }}/>
        <div style={{ position:'absolute', top:'40%', left:'50%',
          width:300, height:300, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(6,182,212,.08) 0%,transparent 65%)',
          animation:'bgBlob 22s ease-in-out infinite 6s', filter:'blur(4px)' }}/>
        {/* Grid pattern */}
        <div style={{ position:'absolute', inset:0, opacity:.04,
          backgroundImage:'linear-gradient(rgba(59,130,246,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.5) 1px,transparent 1px)',
          backgroundSize:'60px 60px' }}/>
        {/* Particles */}
        {[...Array(16)].map((_,i)=>(
          <div key={i} style={{
            position:'absolute',
            width: i%4===0?4:2, height: i%4===0?4:2,
            borderRadius:'50%',
            background: i%2===0?'rgba(59,130,246,.7)':'rgba(139,92,246,.6)',
            left:`${5+i*5.8}%`, top:`${10+(i*19)%78}%`,
            animation:`particle ${2.8+i*.35}s ease-in-out infinite ${i*.22}s`,
          }}/>
        ))}
      </div>

      {/* ── Main container ── */}
      <div style={S.container}>
        <div style={S.grid}>

          {/* ════════ LEFT COLUMN ════════ */}
          <div>

            {/* Badge */}
            <motion.div style={S.badge} {...fadeUp(0)}>
              <span style={S.dot}/> Open to Work — Full-Stack Developer Roles
            </motion.div>

            {/* Name */}
            <motion.h1 style={S.name} {...fadeUp(.1)}>
              {PERSONAL_INFO.name}
            </motion.h1>

            {/* Typewriter */}
            <motion.div style={S.typeRow} {...fadeUp(.18)}>
              <span>I build as a</span>
              <span style={S.typeText}>{typed}</span>
              <span style={S.cursor}>|</span>
            </motion.div>

            {/* Location */}
            <motion.div style={S.location} {...fadeUp(.24)}>
              <MapPin size={14} color="#64748b"/>
              <span>{PERSONAL_INFO.location}</span>
              <span style={{opacity:.3}}>•</span>
              <span style={{color:'#f59e0b',fontWeight:700}}>🎓 B.Tech AI &amp; ML</span>
            </motion.div>

            {/* Bio */}
            <motion.p style={S.bio} {...fadeUp(.3)}>
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* Stats */}
            <motion.div style={S.statsRow} {...fadeUp(.36)}>
              {STATS.map((s, i) =>
                s === null
                  ? <div key={`d${i}`} style={S.statDivider}/>
                  : (
                    <div key={s.label} style={S.statItem}>
                      <span style={S.statVal}>{s.val}</span>
                      <span style={S.statLabel}>{s.label}</span>
                    </div>
                  )
              )}
            </motion.div>

            {/* CTA buttons */}
            <motion.div style={S.btnRow} {...fadeUp(.42)}>
              <motion.button style={S.btnPrimary} whileHover={{scale:1.04,y:-2}} whileTap={{scale:.97}}
                onClick={()=>scrollTo('projects')}>
                View My Work <ArrowRight size={16}/>
              </motion.button>
              <motion.button style={S.btnSec} whileHover={{scale:1.04,y:-2}} whileTap={{scale:.97}}
                onClick={()=>scrollTo('contact')}>
                Hire Me <Mail size={15}/>
              </motion.button>
              <motion.a href="/resume.pdf" style={{...S.btnGhost, textDecoration:'none'}}
                download onClick={()=>trackEvent('resume_download')}
                whileHover={{scale:1.04,y:-2}} whileTap={{scale:.97}}>
                <Download size={15}/> Resume
              </motion.a>
            </motion.div>

            {/* Social */}
            <motion.div style={S.socialRow} {...fadeUp(.48)}>
              <span style={S.socialLabel}>Connect →</span>
              {[
                { href: PERSONAL_INFO.github,            label:'GitHub',   icon:<GithubIcon size={17}/> },
                { href: PERSONAL_INFO.linkedin,          label:'LinkedIn', icon:<LinkedinIcon size={17}/> },
                { href:`mailto:${PERSONAL_INFO.email}`,  label:'Email',    icon:<Mail size={17}/> },
                { href:`tel:${PERSONAL_INFO.phone}`,     label:'Phone',    icon:<Phone size={17}/> },
              ].map(s=>(
                <motion.a key={s.label} href={s.href}
                  target={s.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                  aria-label={s.label} style={{...S.socialBtn, display:'flex',alignItems:'center',justifyContent:'center'}}
                  whileHover={{scale:1.18,y:-3,borderColor:'#3b82f6',color:'#3b82f6',
                    background:'rgba(59,130,246,.1)',boxShadow:'0 0 16px rgba(59,130,246,.3)'}}>
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ════════ RIGHT COLUMN ════════ */}
          <motion.div style={{...S.visual, transform:`translate(${mx*.45}px,${my*.45}px)`}}
            initial={{opacity:0,x:60}} animate={{opacity:1,x:0}} transition={{duration:.9,delay:.2,ease:[.4,0,.2,1]}}>

            {/* Glow aura */}
            <div style={S.photoGlow}/>

            {/* Outer orbit ring (slow, dashed) */}
            <div style={{...S.orbitRing, width:380, height:380,
              border:'1px dashed rgba(59,130,246,.15)',
              animation:'orbitRotate 30s linear infinite'}}/>
            {/* Inner orbit ring */}
            <div style={{...S.orbitRing, width:310, height:310,
              border:'1px dashed rgba(139,92,246,.12)',
              animation:'orbitRotateR 22s linear infinite'}}/>

            {/* ── Photo ── */}
            <div style={S.photoOuter}>
              {/* Gradient spinning border */}
              <div style={S.photoBorderRing}/>
              {/* Solid inner border + image */}
              <div style={S.photoInner}>
                {!imgOk && (
                  <div style={{
                    position:'absolute', inset:0, borderRadius:'50%',
                    background:'linear-gradient(90deg,rgba(59,130,246,.1) 25%,rgba(139,92,246,.2) 50%,rgba(59,130,246,.1) 75%)',
                    backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite',
                  }}/>
                )}
                <img src={profilePhoto} alt="Ramesh Kumar Thakur"
                  style={{...S.photoImg, opacity: imgOk ? 1 : 0, transition:'opacity .5s'}}
                  onLoad={()=>setImgOk(true)}
                />
              </div>
              {/* Available badge */}
              <div style={S.availBadge}>
                <span style={{...S.dot, width:6, height:6}}/>
                Available
              </div>
            </div>

            {/* ── Tech orbit nodes — positioned absolutely around center ── */}
            {NODES.map((n, i) => {
              const rad = (n.deg * Math.PI) / 180;
              const R   = 185; // orbit radius
              const cx  = Math.cos(rad) * R;
              const cy  = Math.sin(rad) * R;
              return (
                <motion.div key={n.label}
                  style={{
                    ...S.node,
                    left:  `calc(50% + ${cx}px - 32px)`,
                    top:   `calc(50% + ${cy}px - 32px)`,
                    background: n.bg,
                    border: `1.5px solid ${n.color}55`,
                    boxShadow: `0 0 14px ${n.color}30, inset 0 0 10px ${n.color}08`,
                  }}
                  initial={{opacity:0,scale:0}}
                  animate={{opacity:1,scale:1}}
                  transition={{delay:.8+i*.11,duration:.4,type:'spring',stiffness:220}}
                  whileHover={{scale:1.28,boxShadow:`0 0 28px ${n.color}80`,zIndex:20}}>
                  <span style={{fontSize:'.95rem',lineHeight:1}}>{n.emoji}</span>
                  <span style={{fontSize:'.55rem',color:n.color,fontWeight:800,
                    letterSpacing:'.05em',textAlign:'center',lineHeight:1.2}}>
                    {n.label}
                  </span>
                </motion.div>
              );
            })}

            {/* ── Floating info cards ── */}
            <motion.div
              style={{...S.floatCard, left:-40, top:'22%', animation:'floatUp 3.2s ease-in-out infinite'}}
              initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:1.4}}>
              <span style={{fontSize:'1.4rem'}}>⚡</span>
              <div>
                <div style={{fontWeight:800,fontSize:'.82rem',color:'#f1f5f9',lineHeight:1.3}}>MERN Stack</div>
                <div style={{fontSize:'.68rem',color:'#64748b',marginTop:1}}>Full-Stack Dev</div>
              </div>
            </motion.div>

            <motion.div
              style={{...S.floatCard, right:-40, top:'58%', animation:'floatDown 3.5s ease-in-out infinite'}}
              initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:1.6}}>
              <span style={{fontSize:'1.4rem'}}>🤖</span>
              <div>
                <div style={{fontWeight:800,fontSize:'.82rem',color:'#f1f5f9',lineHeight:1.3}}>AI &amp; ML</div>
                <div style={{fontSize:'.68rem',color:'#64748b',marginTop:1}}>B.Tech Focus</div>
              </div>
            </motion.div>

            {/* Corner accent — code badge */}
            <motion.div
              style={{
                ...S.floatCard,
                right: -20, top: '5%',
                padding: '7px 12px',
                borderColor: 'rgba(59,130,246,.3)',
                gap: 6,
              }}
              initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{delay:1.8}}>
              <span style={{fontSize:'.65rem',color:'#3b82f6',fontFamily:'monospace',fontWeight:700}}>
                {'{ MERN }'}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Scroll hint ── */}
        <motion.div style={S.scrollHint} animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2.4}}
          onClick={()=>scrollTo('about')}>
          <ChevronDown size={22} color="#3b82f6"/>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
