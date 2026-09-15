import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles, RefreshCw, ChevronDown } from 'lucide-react';
import api from '../services/api';

/* ─── Quick suggestion chips ─────────────────────────────────── */
const SUGGESTIONS = [
  "What is Ramesh's educational background?",
  "Tell me about Smart Study Hub project",
  "Which tech field has the best scope?",
  "Full-Stack Developer learning roadmap",
  "AI & Machine Learning roadmap",
  "What technologies does Ramesh use?",
  "How can I contact Ramesh?",
];


/* ─── Markdown-lite renderer ─────────────────────────────────── */
function renderText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,     '<em>$1</em>')
    .replace(/`(.*?)`/g,       '<code style="background:rgba(59,130,246,.15);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:.88em">$1</code>')
    .replace(/\n/g,            '<br/>');
}

/* ─── Typing indicator ────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div style={{ display:'flex', gap:4, padding:'12px 14px', alignItems:'center' }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          width:7, height:7, borderRadius:'50%', background:'#3b82f6',
          animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`,
          display:'inline-block',
        }}/>
      ))}
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}`}</style>
    </div>
  );
}

/* ─── Chat bubble ─────────────────────────────────────────────── */
function ChatBubble({ msg, isLast }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity:0, y:12, scale:.97 }}
      animate={{ opacity:1, y:0, scale:1 }}
      transition={{ duration:.3, ease:[.4,0,.2,1] }}
      style={{ display:'flex', gap:10, justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom:12, alignItems:'flex-end' }}>

      {/* Avatar — AI left */}
      {!isUser && (
        <div style={{ width:30, height:30, borderRadius:10, flexShrink:0,
          background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 3px 10px rgba(59,130,246,.4)' }}>
          <Bot size={15} color="white"/>
        </div>
      )}

      {/* Bubble */}
      <div style={{
        maxWidth:'80%', padding:'10px 14px', borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: isUser
          ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)'
          : 'rgba(255,255,255,.06)',
        border: isUser ? 'none' : '1px solid rgba(255,255,255,.08)',
        color: '#f1f5f9', fontSize:'.875rem', lineHeight:1.65,
        boxShadow: isUser ? '0 4px 16px rgba(59,130,246,.35)' : '0 2px 8px rgba(0,0,0,.2)',
      }}>
        {msg.typing ? <TypingIndicator/> : (
          <span dangerouslySetInnerHTML={{ __html: renderText(msg.text) }}/>
        )}
      </div>

      {/* Avatar — User right */}
      {isUser && (
        <div style={{ width:30, height:30, borderRadius:10, flexShrink:0,
          background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.15)',
          display:'flex', alignItems:'center', justifyContent:'center' }}>
          <User size={15} color="#94a3b8"/>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */
export default function AIAssistant() {
  const [open,     setOpen]     = useState(false);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "👋 Hi! I'm **Ramesh's AI Portfolio Assistant**, powered by Google Gemini.\n\nAsk me anything about his projects, skills, or how to get in touch!",
    }
  ]);
  const [suggestIdx, setSuggestIdx] = useState(0);
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const historyRef = useRef([]);  // conversation history for Gemini

  /* Auto-scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  /* Cycle through hint text */
  useEffect(() => {
    if (!open) {
      const t = setInterval(() => setSuggestIdx(i => (i + 1) % 3), 3000);
      return () => clearInterval(t);
    }
  }, [open]);

  /* ── Send message ── */
  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    setShowHint(false);

    // Add user bubble
    setMessages(p => [...p, { role:'user', text: msg }]);

    // Add typing indicator
    setMessages(p => [...p, { role:'assistant', text:'', typing:true }]);
    setLoading(true);

    try {
      const response = await api.post('/ai/chat', {
        message: msg,
        history: historyRef.current,
      });
      const data = response.data;
      const reply = data.success ? data.reply : (data.message || 'Sorry, something went wrong. Please try again!');

      // Update history
      historyRef.current = [
        ...historyRef.current,
        { role:'user',  text: msg   },
        { role:'model', text: reply },
      ].slice(-12); // keep last 6 turns

      setMessages(p => [...p.slice(0,-1), { role:'assistant', text: reply }]);
    } catch {
      setMessages(p => [...p.slice(0,-1), {
        role:'assistant',
        text: "⚠️ Couldn't connect to the AI. Please check your internet or try again in a moment.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([{
      role: 'assistant',
      text: "👋 Hi! I'm **Ramesh's AI Portfolio Assistant**, powered by Google Gemini.\n\nAsk me anything about his projects, skills, or how to get in touch!",
    }]);
    historyRef.current = [];
    setShowHint(true);
  };

  const HINT_TEXTS = [
    '💬 Ask me about Ramesh\'s projects',
    '🤖 AI-powered by Google Gemini',
    '⚡ Try: "What is his tech stack?"',
  ];

  /* ── Styles ── */
  const S = {
    fab: {
      position: 'fixed', bottom: 20, right: 20, zIndex: 1100,
      width: 56, height: 56, borderRadius: 16,
      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      border: 'none', cursor: 'pointer', color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 30px rgba(59,130,246,.55), 0 0 0 0 rgba(59,130,246,.4)',
      animation: 'fabPulse 2.5s ease-in-out infinite',
      fontFamily: 'inherit',
    },
    fabHint: {
      position: 'fixed', bottom: 84, right: 20, zIndex: 1099,
      padding: '8px 14px', borderRadius: 12,
      background: 'rgba(8,12,24,.95)',
      border: '1px solid rgba(59,130,246,.4)',
      color: '#94a3b8', fontSize: '.75rem', fontWeight: 600,
      backdropFilter: 'blur(16px)',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 20px rgba(0,0,0,.4)',
    },
    window: {
      position: 'fixed', bottom: 84, right: 16, zIndex: 1100,
      width: 'calc(100vw - 32px)', maxWidth: 390,
      height: 'calc(100vh - 110px)', maxHeight: 580,
      borderRadius: 22,
      background: 'rgba(8,12,24,.97)',
      border: '1px solid rgba(59,130,246,.25)',
      boxShadow: '0 30px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04), 0 0 80px rgba(59,130,246,.08)',
      backdropFilter: 'blur(30px)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', fontFamily: "'Inter', system-ui, sans-serif",
    },
    header: {
      padding: '16px 18px',
      background: 'linear-gradient(135deg,rgba(59,130,246,.15),rgba(139,92,246,.1))',
      borderBottom: '1px solid rgba(255,255,255,.06)',
      display: 'flex', alignItems: 'center', gap: 12,
      flexShrink: 0,
    },
    headerIcon: {
      width: 40, height: 40, borderRadius: 12,
      background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, boxShadow: '0 4px 14px rgba(59,130,246,.4)',
    },
    onlineDot: {
      width: 8, height: 8, borderRadius: '50%', background: '#10b981',
      boxShadow: '0 0 6px #10b981', animation: 'pulseDotAI 2s ease-in-out infinite',
    },
    messagesArea: {
      flex: 1, overflowY: 'auto', padding: '16px 14px',
      scrollBehavior: 'smooth',
    },
    suggestionRow: {
      padding: '8px 14px 4px',
      display: 'flex', gap: 6, flexWrap: 'wrap', flexShrink: 0,
    },
    chip: {
      padding: '5px 12px', borderRadius: 100, fontSize: '.7rem', fontWeight: 700,
      background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.3)',
      color: '#93c5fd', cursor: 'pointer', whiteSpace: 'nowrap',
      transition: 'all .2s', fontFamily: 'inherit',
    },
    inputRow: {
      padding: '12px 14px 16px',
      display: 'flex', gap: 8, alignItems: 'flex-end',
      borderTop: '1px solid rgba(255,255,255,.05)',
      background: 'rgba(255,255,255,.02)',
      flexShrink: 0,
    },
    textarea: {
      flex: 1, resize: 'none', border: '1px solid rgba(255,255,255,.1)',
      borderRadius: 12, padding: '10px 14px',
      background: 'rgba(255,255,255,.05)', color: '#f1f5f9',
      fontSize: '.875rem', fontFamily: 'inherit', lineHeight: 1.5,
      outline: 'none', maxHeight: 100, minHeight: 42,
      transition: 'border-color .2s',
    },
    sendBtn: {
      width: 40, height: 40, borderRadius: 12, flexShrink: 0,
      background: loading ? 'rgba(59,130,246,.3)' : 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
      border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', transition: 'all .2s', alignSelf: 'flex-end',
      boxShadow: loading ? 'none' : '0 4px 14px rgba(59,130,246,.4)',
      fontFamily: 'inherit',
    },
    poweredBy: {
      textAlign: 'center', padding: '4px 0 8px',
      fontSize: '.65rem', color: '#334155', fontWeight: 600,
      letterSpacing: '.04em', flexShrink: 0,
    },
  };

  /* Visible suggestions — 4 at a time cycling */
  const visibleSuggestions = SUGGESTIONS.slice(
    (suggestIdx * 4) % SUGGESTIONS.length,
    (suggestIdx * 4) % SUGGESTIONS.length + 4,
  );

  return (
    <>
      <style>{`
        @keyframes fabPulse {
          0%,100% { box-shadow: 0 8px 30px rgba(59,130,246,.55), 0 0 0 0 rgba(59,130,246,.4); }
          50%      { box-shadow: 0 8px 30px rgba(59,130,246,.55), 0 0 0 12px rgba(59,130,246,0); }
        }
        @keyframes pulseDotAI {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.6); }
          50%      { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .ai-chat-scroll::-webkit-scrollbar { width: 4px; }
        .ai-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .ai-chat-scroll::-webkit-scrollbar-thumb { background: rgba(59,130,246,.3); border-radius: 2px; }
        .ai-chip:hover { background: rgba(59,130,246,.25) !important; border-color: rgba(59,130,246,.6) !important; transform: scale(1.04); }
        .ai-send-btn:hover:not(:disabled) { transform: scale(1.08); }
        .ai-textarea:focus { border-color: rgba(59,130,246,.5) !important; }
      `}</style>

      {/* ── Floating Hint ── */}
      <AnimatePresence>
        {!open && (
          <motion.div style={S.fabHint}
            initial={{ opacity:0, x:20, scale:.9 }} animate={{ opacity:1, x:0, scale:1 }}
            exit={{ opacity:0, x:20, scale:.9 }} transition={{ duration:.3 }}>
            <AnimatePresence mode="wait">
              <motion.span key={suggestIdx}
                initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-6 }} transition={{ duration:.3 }}>
                {HINT_TEXTS[suggestIdx % 3]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Button ── */}
      <motion.button
        style={S.fab}
        whileHover={{ scale:1.1, rotate: open ? 0 : 5 }}
        whileTap={{ scale:.92 }}
        onClick={() => setOpen(p => !p)}
        aria-label={open ? 'Close AI Assistant' : 'Open AI Assistant'}>
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{scale:0,rotate:-90}} animate={{scale:1,rotate:0}} exit={{scale:0}} transition={{duration:.2}}><X size={22}/></motion.div>
            : <motion.div key="bot" initial={{scale:0,rotate:90}} animate={{scale:1,rotate:0}} exit={{scale:0}} transition={{duration:.2}}><Sparkles size={22}/></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div style={S.window}
            initial={{ opacity:0, y:40, scale:.92 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:40, scale:.92 }}
            transition={{ duration:.35, ease:[.34,1.56,.64,1] }}>

            {/* Header */}
            <div style={S.header}>
              <div style={S.headerIcon}>
                <Bot size={20} color="white"/>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:800, fontSize:'.93rem', color:'#f1f5f9', display:'flex', alignItems:'center', gap:7 }}>
                  Portfolio AI Assistant
                  <span style={S.onlineDot}/>
                </div>
                <div style={{ fontSize:'.7rem', color:'#64748b', marginTop:1 }}>
                  Powered by Google Gemini • Knows everything about Ramesh
                </div>
              </div>
              <div style={{ display:'flex', gap:6 }}>
                <motion.button whileHover={{scale:1.1}} whileTap={{scale:.9}}
                  onClick={reset} title="Reset conversation"
                  style={{ width:30, height:30, borderRadius:8, border:'1px solid rgba(255,255,255,.1)',
                    background:'rgba(255,255,255,.05)', color:'#64748b', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <RefreshCw size={13}/>
                </motion.button>
                <motion.button whileHover={{scale:1.1}} whileTap={{scale:.9}}
                  onClick={() => setOpen(false)} title="Close"
                  style={{ width:30, height:30, borderRadius:8, border:'1px solid rgba(255,255,255,.1)',
                    background:'rgba(255,255,255,.05)', color:'#64748b', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ChevronDown size={14}/>
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div style={S.messagesArea} className="ai-chat-scroll">
              {messages.map((msg, i) => (
                <ChatBubble key={i} msg={msg} isLast={i === messages.length - 1}/>
              ))}
              <div ref={bottomRef}/>
            </div>

            {/* Quick Suggestions */}
            <AnimatePresence>
              {showHint && (
                <motion.div style={S.suggestionRow}
                  initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}>
                  {visibleSuggestions.map(s => (
                    <button key={s} className="ai-chip" style={S.chip}
                      onClick={() => { setShowHint(false); sendMessage(s); }}>
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Row */}
            <div style={S.inputRow}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
                }}
                placeholder="Ask about Ramesh's projects, skills..."
                rows={1}
                maxLength={500}
                style={S.textarea}
                className="ai-textarea"
                disabled={loading}
              />
              <motion.button
                style={S.sendBtn}
                className="ai-send-btn"
                whileHover={!loading ? {scale:1.08} : {}}
                whileTap={!loading ? {scale:.92} : {}}
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send message">
                <Send size={16}/>
              </motion.button>
            </div>

            {/* Powered By */}
            <div style={S.poweredBy}>
              ✦ Powered by Google Gemini AI — Ask me anything!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
