import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROJECTS } from '../data/portfolioData';
import { GithubIcon } from '../components/SocialIcons';
import { ExternalLink, X, ArrowRight, Layers, Zap, CheckCircle, Code2 } from 'lucide-react';
import { trackEvent } from '../services/api';

// Project gradient colors
const PROJECT_GRADIENTS = {
  1: 'linear-gradient(135deg,#3b82f644,#6366f122)',
  2: 'linear-gradient(135deg,#8b5cf644,#a855f722)',
  3: 'linear-gradient(135deg,#10b98144,#06b6d422)',
  4: 'linear-gradient(135deg,#f59e0b44,#ef444422)',
  5: 'linear-gradient(135deg,#ef444444,#f9731622)',
  6: 'linear-gradient(135deg,#06b6d444,#3b82f622)',
};

const PROJECT_ICONS = ['📚','🎯','⚡','🛍️','✍️','🌤️'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch]             = useState('');
  const [modal, setModal]               = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filters = ['All','Full Stack','Frontend','Backend','AI/ML','JavaScript','Python'];

  const filtered = PROJECTS.filter(p => {
    const cats = Array.isArray(p.category) ? p.category : [p.category];
    const matchF = activeFilter === 'All' || cats.includes(activeFilter) || p.tags?.includes(activeFilter);
    const matchS = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  return (
    <section id="projects" style={{ padding:'100px 0', background:'var(--bg-secondary)' }}>
      <div className="container">

        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:.6 }}
          style={{ textAlign:'center', marginBottom:'3rem' }}>
          <span className="section-label">My Work</span>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="section-subtitle" style={{ margin:'0 auto', maxWidth:520 }}>
            Real applications built from scratch — each with a full-stack architecture, secure authentication, and production-ready code.
          </p>
        </motion.div>

        {/* Filter + Search */}
        <motion.div
          initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.5, delay:.15 }}
          style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', marginBottom:'3rem' }}>

          {/* Search */}
          <div style={{ position:'relative', width:'100%', maxWidth:380 }}>
            <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', display:'flex' }}>
              🔍
            </span>
            <input type="text" placeholder="Search projects..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{
                width:'100%', padding:'10px 14px 10px 40px', borderRadius:100,
                background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)',
                color:'white', outline:'none', fontFamily:'inherit', fontSize:'.9rem',
              }}/>
          </div>

          {/* Filters */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            {filters.map(f => (
              <motion.button key={f} whileHover={{ scale:1.06 }} whileTap={{ scale:.95 }}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding:'6px 18px', borderRadius:100, fontSize:'.8rem', fontWeight:700,
                  border:`1.5px solid ${activeFilter===f?'var(--accent-blue)':'rgba(255,255,255,.1)'}`,
                  background: activeFilter===f?'rgba(59,130,246,.15)':'transparent',
                  color: activeFilter===f?'var(--accent-blue)':'var(--text-secondary)',
                  cursor:'pointer', fontFamily:'inherit', transition:'all .25s',
                }}>{f}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div key={project.id}
                layout
                initial={{ opacity:0, y:30, scale:.95 }}
                animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, scale:.9 }}
                transition={{ duration:.35, delay:i*.06 }}
                whileHover={{ y:-6, boxShadow:`0 20px 60px ${project.color}25` }}
                style={{
                  borderRadius:18, overflow:'hidden',
                  background:'rgba(14,22,40,.8)',
                  border:'1px solid rgba(255,255,255,.08)',
                  backdropFilter:'blur(20px)',
                  transition:'all .3s cubic-bezier(.4,0,.2,1)',
                  cursor:'pointer',
                  display:'flex', flexDirection:'column',
                }}>

                {/* Card top strip */}
                <div style={{
                  height:5,
                  background: PROJECT_GRADIENTS[project.id] || 'var(--gradient-primary)',
                }}/>

                <div style={{ padding:'1.5rem', flex:1, display:'flex', flexDirection:'column' }}>
                  {/* Icon + links row */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                    <div style={{
                      width:52, height:52, borderRadius:14, display:'flex', alignItems:'center',
                      justifyContent:'center', fontSize:'1.8rem',
                      background: `${project.color}18`, border:`1px solid ${project.color}33`,
                    }}>
                      {PROJECT_ICONS[i] || '🚀'}
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer"
                          onClick={e=>{ e.stopPropagation(); trackEvent('github_click', { project: project.title }); }}
                          style={{ width:34, height:34, borderRadius:8, display:'flex', alignItems:'center',
                            justifyContent:'center', background:'rgba(255,255,255,.06)',
                            border:'1px solid rgba(255,255,255,.1)', color:'var(--text-secondary)', transition:'all .2s' }}
                          onMouseEnter={e=>{e.currentTarget.style.color='white';e.currentTarget.style.background='rgba(255,255,255,.12)'}}
                          onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.background='rgba(255,255,255,.06)'}}>
                          <GithubIcon size={16}/>
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer"
                          style={{ width:34, height:34, borderRadius:8, display:'flex', alignItems:'center',
                            justifyContent:'center', background:'rgba(255,255,255,.06)',
                            border:'1px solid rgba(255,255,255,.1)', color:'var(--text-secondary)', transition:'all .2s' }}>
                          <ExternalLink size={16}/>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title + subtitle */}
                  <h3 style={{ fontSize:'1.15rem', fontWeight:800, margin:'0 0 4px', color:'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <span style={{ fontSize:'.78rem', color: project.color, fontWeight:700,
                    textTransform:'uppercase', letterSpacing:'.07em', marginBottom:'0.75rem', display:'block' }}>
                    {project.subtitle}
                  </span>

                  {/* Description */}
                  <p style={{ color:'var(--text-secondary)', fontSize:'.88rem', lineHeight:1.65, flexGrow:1, marginBottom:'1rem' }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:'1.2rem' }}>
                    {(project.tags||[]).slice(0,5).map(t => (
                      <span key={t} style={{
                        fontSize:'.7rem', padding:'3px 10px', borderRadius:100,
                        background:`${project.color}18`, color: project.color,
                        border:`1px solid ${project.color}33`, fontWeight:700,
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* Case study button */}
                  <motion.button
                    onClick={() => { setModal(project); trackEvent('view_project', { project: project.title }); }}
                    whileHover={{ x:4 }}
                    style={{
                      width:'100%', padding:'10px 16px', background:`${project.color}15`,
                      border:`1px solid ${project.color}33`, borderRadius:10, color: project.color,
                      cursor:'pointer', fontFamily:'inherit', fontSize:'.85rem', fontWeight:700,
                      display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                      transition:'all .25s',
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.background=`${project.color}25`}}
                    onMouseLeave={e=>{e.currentTarget.style.background=`${project.color}15`}}>
                    View Case Study <ArrowRight size={15}/>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'4rem', color:'var(--text-muted)' }}>
            No projects match your search. Try a different filter.
          </div>
        )}

        {/* ── Modal ── */}
        <AnimatePresence>
          {modal && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setModal(null)}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.8)',
                backdropFilter:'blur(6px)', zIndex:2000, display:'flex',
                alignItems:'center', justifyContent:'center', padding:'1.5rem', overflowY:'auto' }}>

              <motion.div initial={{ y:60, opacity:0, scale:.92 }} animate={{ y:0, opacity:1, scale:1 }}
                exit={{ y:60, opacity:0, scale:.92 }} transition={{ duration:.4, ease:[.4,0,.2,1] }}
                onClick={e=>e.stopPropagation()}
                style={{ width:'100%', maxWidth:740, maxHeight:'90vh', overflowY:'auto', borderRadius:20,
                  background:'rgba(10,15,30,.98)', border:`1px solid ${modal.color}44`,
                  boxShadow:`0 0 80px ${modal.color}25, 0 30px 100px rgba(0,0,0,.7)` }}>

                {/* Modal header */}
                <div style={{
                  position:'sticky', top:0, background:'rgba(10,15,30,.97)', backdropFilter:'blur(20px)',
                  padding:'1.5rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center',
                  borderBottom:`1px solid ${modal.color}22`, zIndex:10,
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    <span style={{ fontSize:'2rem' }}>{PROJECT_ICONS[modal.id-1]||'🚀'}</span>
                    <div>
                      <h2 style={{ margin:0, fontSize:'1.3rem' }}>{modal.title}</h2>
                      <span style={{ fontSize:'.78rem', color:modal.color, fontWeight:700 }}>{modal.subtitle}</span>
                    </div>
                  </div>
                  <button onClick={()=>setModal(null)}
                    style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)',
                      borderRadius:10, width:36, height:36, display:'flex', alignItems:'center',
                      justifyContent:'center', cursor:'pointer', color:'var(--text-secondary)' }}>
                    <X size={18}/>
                  </button>
                </div>

                {/* Modal body */}
                <div style={{ padding:'2rem' }}>

                  {/* Links */}
                  <div style={{ display:'flex', gap:12, marginBottom:'2rem', flexWrap:'wrap' }}>
                    {modal.github && (
                      <a href={modal.github} target="_blank" rel="noreferrer"
                        style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 18px',
                          borderRadius:10, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)',
                          color:'var(--text-primary)', fontSize:'.88rem', fontWeight:700 }}>
                        <GithubIcon size={16}/> Source Code
                      </a>
                    )}
                    {modal.live && (
                      <a href={modal.live} target="_blank" rel="noreferrer"
                        style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 18px',
                          borderRadius:10, background:'var(--gradient-primary)', color:'white',
                          fontSize:'.88rem', fontWeight:700 }}>
                        <ExternalLink size={16}/> Live Demo
                      </a>
                    )}
                  </div>

                  {/* Overview */}
                  <div style={{ marginBottom:'2rem' }}>
                    <h3 style={{ display:'flex', alignItems:'center', gap:8, color:modal.color, marginBottom:12 }}>
                      <Layers size={18}/> Overview
                    </h3>
                    <p style={{ color:'var(--text-secondary)', lineHeight:1.75, margin:0 }}>{modal.overview}</p>
                  </div>

                  {/* Problem / Solution */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'2rem' }}>
                    {[['Problem','⚠️',modal.problem],['Solution','✅',modal.solution]].map(([h,e,t])=>(
                      <div key={h} style={{ padding:'1.25rem', background:'rgba(255,255,255,.03)',
                        border:'1px solid rgba(255,255,255,.08)', borderRadius:12 }}>
                        <h4 style={{ color: h==='Problem'?'#f59e0b':'#10b981', margin:'0 0 10px',
                          display:'flex', alignItems:'center', gap:6 }}>
                          {e} {h}
                        </h4>
                        <p style={{ color:'var(--text-secondary)', fontSize:'.88rem', lineHeight:1.7, margin:0 }}>{t}</p>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  {modal.features?.length > 0 && (
                    <div style={{ marginBottom:'2rem' }}>
                      <h3 style={{ display:'flex', alignItems:'center', gap:8, color:modal.color, marginBottom:14 }}>
                        <Zap size={18}/> Key Features
                      </h3>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                        {modal.features.map((f,i)=>(
                          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                            <CheckCircle size={14} style={{ color:'#10b981', flexShrink:0, marginTop:3 }}/>
                            <span style={{ color:'var(--text-secondary)', fontSize:'.86rem', lineHeight:1.5 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div style={{ marginBottom:'1.5rem' }}>
                    <h3 style={{ display:'flex', alignItems:'center', gap:8, color:modal.color, marginBottom:12 }}>
                      <Code2 size={18}/> Tech Stack
                    </h3>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                      {(modal.technologies||modal.tags||[]).map(t=>(
                        <span key={t} style={{
                          padding:'5px 14px', borderRadius:100,
                          background:`${modal.color}18`, color:modal.color,
                          border:`1px solid ${modal.color}33`, fontSize:'.83rem', fontWeight:700,
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Architecture */}
                  {modal.architecture && (
                    <div style={{ padding:'1rem 1.25rem', background:'rgba(255,255,255,.03)',
                      border:`1px solid ${modal.color}22`, borderRadius:12 }}>
                      <div style={{ fontSize:'.72rem', color:'var(--text-muted)', fontWeight:700,
                        textTransform:'uppercase', letterSpacing:'.09em', marginBottom:8 }}>Architecture Flow</div>
                      <code style={{ color: modal.color, fontSize:'.85rem', lineHeight:1.6, fontFamily:'var(--font-mono)' }}>
                        {modal.architecture}
                      </code>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
