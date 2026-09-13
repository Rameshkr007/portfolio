import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Mail, Phone, Shield, Code2, Wrench } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import profilePhoto from '../assets/profile.jpg';

const PHILOSOPHIES = [
  { icon: <Wrench size={18}/>, color:'#3b82f6', title:'Full-Stack Ownership', desc:'Comfortable across frontend, backend, database design, and API integration — end to end.' },
  { icon: <Shield size={18}/>, color:'#8b5cf6', title:'Security-First Dev', desc:'JWT auth, bcrypt hashing, input validation, rate limiting — standard in every project.' },
  { icon: <Code2 size={18}/>, color:'#10b981', title:'Clean Architecture', desc:'Modular, reusable code with MVC patterns, proper separation of concerns, and REST conventions.' },
];

const STATS = [
  { val:'B.Tech', sub:'AI & ML', color:'#3b82f6' },
  { val:'MERN',   sub:'Stack',  color:'#8b5cf6' },
  { val:'6+',     sub:'Projects',color:'#10b981' },
  { val:'REST',   sub:'APIs',   color:'#f59e0b' },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  const slide = (delay=0) => ({
    initial:{ opacity:0, y:32 },
    animate: inView ? { opacity:1, y:0 } : { opacity:0, y:32 },
    transition:{ duration:.65, ease:[.4,0,.2,1], delay },
  });

  return (
    <section id="about" style={{ padding:'100px 0', background:'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div ref={ref} {...slide()} style={{ textAlign:'center', marginBottom:'4rem' }}>
          <span className="section-label">About Me</span>
          <h2 className="section-title">The Developer <span>Behind the Code</span></h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:'4rem', alignItems:'start' }}>

          {/* ── LEFT: Photo + social ── */}
          <motion.div {...slide(.15)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem' }}>

            {/* Photo */}
            <div style={{ position:'relative', width:220, height:220 }}>
              <div style={{ position:'absolute', inset:-6, borderRadius:'50%',
                background:'linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)',
                animation:'spin-slow 8s linear infinite', zIndex:0 }}/>
              <img src={profilePhoto} alt="Ramesh Kumar Thakur"
                style={{ width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover',
                  objectPosition:'top center', position:'relative', zIndex:1,
                  border:'4px solid var(--bg-secondary)',
                  filter:'brightness(1.05) contrast(1.02) saturate(1.05)',
                  boxShadow:'0 20px 60px rgba(0,0,0,.5)',
                }}/>
              <div style={{ position:'absolute', bottom:8, right:0, zIndex:2,
                display:'flex', alignItems:'center', gap:5, padding:'4px 12px',
                background:'rgba(16,185,129,.15)', border:'1px solid rgba(16,185,129,.4)',
                borderRadius:100, fontSize:'.68rem', fontWeight:800, color:'#10b981',
                backdropFilter:'blur(10px)' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#10b981',
                  animation:'pulse-dot 2s ease-in-out infinite' }}/>
                Available
              </div>
            </div>

            {/* Name block */}
            <div style={{ textAlign:'center' }}>
              <h3 style={{ fontSize:'1.3rem', fontWeight:800, margin:'0 0 4px' }}>{PERSONAL_INFO.name}</h3>
              <p style={{ color:'var(--accent-blue)', fontSize:'.85rem', fontWeight:700, margin:'0 0 12px' }}>
                {PERSONAL_INFO.title}
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'8px',
                color:'var(--text-muted)', fontSize:'.82rem' }}>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><MapPin size={12}/>{PERSONAL_INFO.location}</span>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><Mail size={12}/>{PERSONAL_INFO.email}</span>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><Phone size={12}/>{PERSONAL_INFO.phone}</span>
              </div>
            </div>

            {/* Social buttons */}
            <div style={{ display:'flex', gap:10 }}>
              {[
                { href: PERSONAL_INFO.github,   icon:<GithubIcon size={18}/>,   label:'GitHub' },
                { href: PERSONAL_INFO.linkedin, icon:<LinkedinIcon size={18}/>, label:'LinkedIn' },
                { href:`mailto:${PERSONAL_INFO.email}`, icon:<Mail size={18}/>, label:'Email' },
              ].map(s=>(
                <motion.a key={s.label} href={s.href} target={s.href.startsWith('http')?'_blank':undefined}
                  rel="noreferrer" aria-label={s.label}
                  whileHover={{ scale:1.15, y:-3 }}
                  style={{ width:42, height:42, borderRadius:11, display:'flex', alignItems:'center',
                    justifyContent:'center', background:'rgba(255,255,255,.05)',
                    border:'1px solid rgba(255,255,255,.1)', color:'var(--text-secondary)',
                    transition:'all .25s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent-blue)';e.currentTarget.style.color='var(--accent-blue)';e.currentTarget.style.background='rgba(59,130,246,.1)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.1)';e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.background='rgba(255,255,255,.05)'}}>
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* Stats grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, width:'100%' }}>
              {STATS.map(s=>(
                <div key={s.val} style={{ padding:'1rem', textAlign:'center', borderRadius:12,
                  background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)' }}>
                  <div style={{ fontSize:'1.5rem', fontWeight:900, color: s.color, lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:'.7rem', color:'var(--text-muted)', fontWeight:700,
                    textTransform:'uppercase', letterSpacing:'.08em', marginTop:4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Bio + Philosophy ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
            <motion.div {...slide(.2)}>
              <h3 style={{ fontSize:'1.6rem', fontWeight:800, marginBottom:'1rem', lineHeight:1.3 }}>
                Passionate about building<br/>things that <span style={{
                  background:'var(--gradient-primary)', WebkitBackgroundClip:'text',
                  WebkitTextFillColor:'transparent', backgroundClip:'text' }}>actually work</span>
              </h3>
              <p style={{ color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'1rem' }}>
                {PERSONAL_INFO.objective}
              </p>
            </motion.div>

            {/* Philosophy cards */}
            <motion.div {...slide(.3)} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {PHILOSOPHIES.map((p,i)=>(
                <motion.div key={i} whileHover={{ x:6 }}
                  style={{ display:'flex', gap:'1rem', alignItems:'flex-start', padding:'1.25rem',
                    borderRadius:14, background:'rgba(255,255,255,.03)',
                    border:`1px solid ${p.color}22`, transition:'all .25s',
                    borderLeft:`3px solid ${p.color}` }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:`${p.color}18`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color: p.color, flexShrink:0 }}>
                    {p.icon}
                  </div>
                  <div>
                    <h4 style={{ margin:'0 0 4px', fontSize:'.95rem', fontWeight:800 }}>{p.title}</h4>
                    <p style={{ margin:0, fontSize:'.85rem', color:'var(--text-secondary)', lineHeight:1.6 }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tech chips */}
            <motion.div {...slide(.4)}>
              <div style={{ fontSize:'.75rem', color:'var(--text-muted)', fontWeight:700,
                textTransform:'uppercase', letterSpacing:'.1em', marginBottom:12 }}>
                Core Stack
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {['React.js','Node.js','Express.js','MongoDB','MySQL','JWT','REST APIs','Python','Git','JavaScript'].map(t=>(
                  <span key={t} style={{
                    padding:'5px 14px', borderRadius:100, fontSize:'.78rem', fontWeight:700,
                    background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)',
                    color:'var(--text-secondary)',
                  }}>{t}</span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div {...slide(.5)} style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <button className="btn btn-primary"
                onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}>
                View My Projects
              </button>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="btn btn-secondary">
                Get In Touch
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      `}</style>
    </section>
  );
}
