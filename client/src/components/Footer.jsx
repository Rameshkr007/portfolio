import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { PERSONAL_INFO, NAV_LINKS } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4rem' }}>
      <div className="section-container" style={{ paddingBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          <div>
            <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', cursor: 'pointer' }} onClick={() => window.scrollTo(0,0)}>
              <span className="logo-icon" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>RT</span>
              <span className="logo-text" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Ramesh Thakur</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Building premium, full-stack applications with a focus on seamless user experiences and robust architectures.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={PERSONAL_INFO?.github} target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} className="hover-text-primary"><GithubIcon size={20} /></a>
              <a href={PERSONAL_INFO?.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} className="hover-text-primary"><LinkedinIcon size={20} /></a>
              <a href={`mailto:${PERSONAL_INFO?.email}`} aria-label="Email" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} className="hover-text-primary"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'white' }}>Navigation</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {(NAV_LINKS || []).map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.95rem', transition: 'color 0.3s' }}
                    className="hover-text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'white' }}>Connect</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                <MapPin size={18} style={{ color: 'var(--primary-color)', flexShrink: 0, marginTop: '2px' }} />
                <span>{PERSONAL_INFO?.location}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                <Phone size={18} style={{ color: 'var(--primary-color)' }} />
                <span>{PERSONAL_INFO?.phone}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                <Mail size={18} style={{ color: 'var(--primary-color)' }} />
                <span>{PERSONAL_INFO?.email}</span>
              </li>
            </ul>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} Ramesh Kumar Thakur. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> using React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
}
