// Professional SVG Tech Icons — inline, zero dependencies, pixel-perfect brand colors
const SVGS = {
  javascript: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#F7DF1E"/><path d="M19.5 20.8c.4.6.9 1.1 1.8 1.1.75 0 1.22-.38 1.22-.9 0-.62-.49-.84-1.32-1.2l-.45-.2c-1.31-.56-2.18-1.26-2.18-2.74 0-1.36 1.04-2.4 2.66-2.4 1.16 0 1.99.4 2.58 1.45l-1.41.9c-.31-.56-.65-.78-1.17-.78-.53 0-.87.34-.87.78 0 .54.34.76 1.22 1.14l.45.2c1.54.66 2.41 1.33 2.41 2.84 0 1.63-1.28 2.53-3 2.53-1.68 0-2.77-.8-3.3-1.85l1.37-.88zm-6.34.18c.28.5.54.93 1.1.93.56 0 .9-.22.9-1.06v-6.2h1.75v6.22c0 1.75-1.03 2.54-2.53 2.54-1.35 0-2.13-.7-2.53-1.54l1.31-.89z" fill="#323330"/></svg>,
  react: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#20232A"/><circle cx="16" cy="16" r="2.8" fill="#61DAFB"/><ellipse cx="16" cy="16" rx="11" ry="4" stroke="#61DAFB" strokeWidth="1.3" fill="none"/><ellipse cx="16" cy="16" rx="11" ry="4" stroke="#61DAFB" strokeWidth="1.3" fill="none" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="11" ry="4" stroke="#61DAFB" strokeWidth="1.3" fill="none" transform="rotate(120 16 16)"/></svg>,
  nodejs: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#1F1F1F"/><path d="M16 5 L7 10 L7 22 L16 27 L25 22 L25 10 Z" fill="#339933" opacity="0.9"/><text x="10.5" y="20.5" fill="white" fontSize="6.5" fontWeight="800" fontFamily="monospace">JS</text></svg>,
  mongodb: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#13AA52"/><path d="M16 4 C12.5 10 11 14 11 17.5 C11 20.5 13.2 23 16 23 C18.8 23 21 20.5 21 17.5 C21 14 19.5 10 16 4Z" fill="white"/><rect x="15" y="22" width="2" height="6" rx="1" fill="white"/></svg>,
  express: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#1A1A1A"/><text x="5" y="19" fill="white" fontSize="9" fontWeight="700" fontFamily="monospace">Ex.</text><rect x="5" y="21" width="22" height="1.5" rx="0.75" fill="white" opacity="0.35"/></svg>,
  python: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#1E3A5F"/><path d="M16 4c-3.5 0-6 .8-6 3.2v2.3h6v1H8.5C6 10.5 4 12 4 15v4.5C4 22 6 24 8.5 24h2.2v-2.8c0-2.2 1.7-3.2 3.3-3.2h6c1.7 0 3-1.5 3-3.2V7.2C23 4.8 19.5 4 16 4Zm-1.5 2.8c.8 0 1.5.6 1.5 1.4S15.3 9.6 14.5 9.6 13 9 13 8.2s.7-1.4 1.5-1.4Z" fill="#3776AB"/><path d="M16 28c3.5 0 6-.8 6-3.2v-2.3h-6v-1h7.5C26 21.5 28 20 28 17v-4.5C28 10 26 8 23.5 8h-2.2v2.8c0 2.2-1.7 3.2-3.3 3.2h-6c-1.7 0-3 1.5-3 3.2v5.6C9 25.2 12.5 28 16 28Zm1.5-2.8c-.8 0-1.5-.6-1.5-1.4s.7-1.4 1.5-1.4 1.5.6 1.5 1.4-.7 1.4-1.5 1.4Z" fill="#FFD43B"/></svg>,
  html: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#E34F26"/><path d="M7 4l2.2 20 6.8 2 6.8-2L25 4H7zm15.2 5.5H10.8l.35 3.5h10.7l-.35.5-.7 7.5L16 22l-4.8-1.5-.35-4h2.7l.2 2 2.25.6 2.25-.6.25-3H10.1l-.7-8h13.2l-.35 1.5z" fill="white"/></svg>,
  css: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#1572B6"/><path d="M7 4l2.2 20 6.8 2 6.8-2L25 4H7zm15.2 5.5H10.8l.35 3.5h10.35l-.5 5-4.7 1.3-4.7-1.3-.35-3.5h2.7l.2 2 2.15.55 2.15-.55.25-2.8H10.45l-.7-7.5h13.2l-.35 2.3z" fill="white"/></svg>,
  git: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#F05032"/><path d="M28.7 14.3L17.7 3.3a2.5 2.5 0 00-3.5 0l-2.5 2.5 3.2 3.2a3 3 0 013.8 3.8l3 3a3 3 0 11-1.8 1.8L17 14.8V23a3 3 0 11-2.4-.1V14.6a3 3 0 01-1.5-4L9.8 7.3 3.3 13.8a2.5 2.5 0 000 3.5l11 11a2.5 2.5 0 003.5 0l10.9-10.9a2.5 2.5 0 000-3.5z" fill="white"/></svg>,
  github: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#24292E"/><path d="M16 5.4A11 11 0 005.4 16c0 4.8 3.1 8.8 7.3 10.2.5.1.7-.2.7-.5v-1.8c-2.9.6-3.6-1.4-3.6-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3.1 1.1a10.8 10.8 0 015.6 0c2.2-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v2.9c0 .3.2.6.7.5A11 11 0 0026.6 16 11 11 0 0016 5.4z" fill="white"/></svg>,
  mysql: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#00618A"/><ellipse cx="16" cy="11" rx="10" ry="3.5" fill="#F29111"/><path d="M6 11v10c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5V11" stroke="#F29111" strokeWidth="1.5" fill="none"/><path d="M6 16c0 1.9 4.5 3.5 10 3.5S26 17.9 26 16" stroke="#F29111" strokeWidth="1" fill="none" opacity="0.6"/></svg>,
  sql: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#336791"/><ellipse cx="16" cy="10" rx="9" ry="3.2" fill="#6EB3E3"/><path d="M7 10v12c0 1.7 4 3.2 9 3.2s9-1.5 9-3.2V10" stroke="#6EB3E3" strokeWidth="1.4" fill="none"/><path d="M7 15.5c0 1.7 4 3.2 9 3.2s9-1.5 9-3.2" stroke="#6EB3E3" strokeWidth="1" fill="none" opacity="0.5"/></svg>,
  jwt: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#1A1A2E"/><path d="M16 5l2.8 8.5h9L21 18.5l2.8 8.5L16 22l-7.8 5 2.8-8.5L4.2 13.5h9L16 5z" stroke="#D63AFF" strokeWidth="1.4" fill="none"/><circle cx="16" cy="16" r="3" fill="#D63AFF"/></svg>,
  api: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#1a1a2e" stroke="#FF6B35" strokeWidth="1.5"/><text x="4.5" y="21" fill="#FF6B35" fontSize="9.5" fontWeight="800" fontFamily="monospace">API</text></svg>,
  numpy: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#013243"/><path d="M8 20 L8 10 L14 10 L14 14 L20 10 L20 20 L14 20 L14 16 Z" fill="#4DABCF"/><path d="M14 12 L20 12 L24 16 L20 22 L14 22 L18 18 Z" fill="#4DABCF" opacity="0.6"/></svg>,
  pandas: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#150458"/><rect x="7" y="5" width="4.5" height="22" rx="2.2" fill="#E70488"/><rect x="14" y="5" width="4.5" height="22" rx="2.2" fill="#E70488" opacity="0.5"/><rect x="21" y="5" width="4.5" height="22" rx="2.2" fill="#E70488"/></svg>,
  powerbi: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#243A5E"/><rect x="5" y="18" width="4" height="9" rx="1" fill="#F2C811"/><rect x="11" y="12" width="4" height="15" rx="1" fill="#F2C811" opacity="0.8"/><rect x="17" y="7" width="4" height="20" rx="1" fill="#F2C811"/><rect x="23" y="10" width="4" height="17" rx="1" fill="#F2C811" opacity="0.9"/></svg>,
  vscode: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#007ACC"/><path d="M23 5 L11 17 L6 13 L4 15 L6 17 L4 19 L6 21 L11 17 L23 27 L28 24.5 V7.5 Z" fill="white"/><path d="M23 10 V22 L13 16.5 Z" fill="#007ACC"/></svg>,
  cpp: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#00599C"/><text x="3" y="23" fill="white" fontSize="13" fontWeight="900" fontFamily="monospace">C++</text></svg>,
  responsive: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="5" fill="#0f172a" stroke="#38BDF8" strokeWidth="1.2"/><rect x="2" y="7" width="22" height="14" rx="2" stroke="#38BDF8" strokeWidth="1.4" fill="none"/><rect x="26" y="12" width="5" height="9" rx="1.5" stroke="#38BDF8" strokeWidth="1.4" fill="none"/><line x1="9" y1="25" x2="17" y2="25" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

const FallbackIcon = ({ color = '#6366f1' }) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="5" fill={color} opacity="0.18" stroke={color} strokeWidth="1.3"/>
    <circle cx="16" cy="16" r="5" fill={color} opacity="0.75"/>
  </svg>
);

export default function TechIcon({ name = '', color = '#6366f1', size = 36 }) {
  const key = name.toLowerCase().replace(/[^a-z]/g, '');
  const Icon = SVGS[key] ?? SVGS[name.toLowerCase()] ?? null;

  return (
    <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center',
      width:size, height:size, flexShrink:0 }}>
      {Icon
        ? <svg viewBox={Icon.props.viewBox} style={{ width:size, height:size, display:'block' }}
            xmlns="http://www.w3.org/2000/svg">
            {Icon.props.children}
          </svg>
        : <FallbackIcon color={color}/>
      }
    </span>
  );
}
