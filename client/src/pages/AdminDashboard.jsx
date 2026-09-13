import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, MessageSquare, BarChart3, Search, Filter,
  Trash2, Eye, Reply, Archive, RefreshCw, CheckCircle2,
  AlertCircle, Loader2, Users, Mail, TrendingUp, Shield
} from 'lucide-react';
import {
  adminLogin, getMessages, getMessage, updateMessageStatus,
  deleteMessage, getAnalytics, getAdminProfile
} from '../services/api';

// ---- LOGIN FORM ----
function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await adminLogin(form);
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        onLogin(data.admin);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '1.5rem'
          }}>
            🔐
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f1f5f9', marginBottom: '8px' }}>
            Admin Access
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Portfolio management dashboard
          </p>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px', borderRadius: '10px',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
            color: '#ef4444', fontSize: '0.875rem', display: 'flex', gap: '8px',
            alignItems: 'center', marginBottom: '20px'
          }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="admin"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? (
              <><Loader2 size={18} className="spin" /> Authenticating...</>
            ) : (
              <><Shield size={18} /> Sign In</>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#475569', marginTop: '20px' }}>
          This dashboard is not publicly accessible.
        </p>
      </motion.div>
    </div>
  );
}

// ---- MESSAGE ROW ----
function MessageRow({ msg, onView, onStatusChange, onDelete }) {
  const statusColors = {
    new: 'status-new', read: 'status-read',
    replied: 'status-replied', archived: 'status-archived'
  };

  return (
    <tr>
      <td>
        <div style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.875rem' }}>{msg.name}</div>
        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{msg.email}</div>
      </td>
      <td style={{ maxWidth: '200px' }}>
        <div style={{ fontSize: '0.875rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {msg.subject}
        </div>
      </td>
      <td>
        <span className={`status-badge ${statusColors[msg.status]}`}>{msg.status}</span>
      </td>
      <td>{new Date(msg.createdAt).toLocaleDateString('en-IN')}</td>
      <td>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => onView(msg)} title="View"
            style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Eye size={14} />
          </button>
          <button onClick={() => onStatusChange(msg._id, 'replied')} title="Mark Replied"
            style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Reply size={14} />
          </button>
          <button onClick={() => onStatusChange(msg._id, 'archived')} title="Archive"
            style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.2)', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Archive size={14} />
          </button>
          <button onClick={() => onDelete(msg._id)} title="Delete"
            style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ---- MESSAGE DETAIL ----
function MessageDetail({ message, onClose, onStatusChange }) {
  if (!message) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{ maxWidth: '600px' }}
      >
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#f1f5f9' }}>{message.subject}</h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
              From {message.name} — {new Date(message.createdAt).toLocaleString('en-IN')}
            </p>
          </div>
          <button className="modal-close" onClick={onClose}><span>✕</span></button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'Name', value: message.name },
              { label: 'Email', value: message.email },
              { label: 'Company', value: message.company || '—' },
              { label: 'Phone', value: message.phone || '—' },
            ].map(item => (
              <div key={item.label} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                <div style={{ fontSize: '0.875rem', color: '#f1f5f9', marginTop: '4px' }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', marginBottom: '24px' }}>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{message.message}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['new', 'read', 'replied', 'archived'].map(status => (
              <button
                key={status}
                onClick={() => { onStatusChange(message._id, status); onClose(); }}
                style={{
                  padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600,
                  background: message.status === status ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.04)',
                  border: message.status === status ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color: message.status === status ? '#3b82f6' : '#94a3b8',
                  cursor: 'pointer', textTransform: 'capitalize'
                }}
              >
                Mark {status}
              </button>
            ))}
            <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}
              style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Reply size={14} /> Reply via Email
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ---- MAIN ADMIN DASHBOARD ----
export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [counts, setCounts] = useState({});
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Check existing session
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      getAdminProfile().then(data => {
        if (data.success) setAdmin(data.admin);
      }).catch(() => localStorage.removeItem('admin_token'));
    }
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages({ search, status: statusFilter });
      if (data.success) {
        setMessages(data.messages);
        setCounts(data.counts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();
      if (data.success) setAnalytics(data.analytics);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchMessages();
      fetchAnalytics();
    }
  }, [admin, search, statusFilter]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateMessageStatus(id, status);
      await fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      await fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewMessage = async (msg) => {
    try {
      const data = await getMessage(msg._id);
      if (data.success) setSelectedMsg(data.message);
      await fetchMessages();
    } catch {
      setSelectedMsg(msg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAdmin(null);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    await fetchAnalytics();
    setRefreshing(false);
  };

  if (!admin) return <AdminLogin onLogin={setAdmin} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Admin Nav */}
      <div className="admin-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🔐</div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#f1f5f9' }}>Portfolio Admin</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Welcome, {admin.username}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={handleRefresh} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}>
            <RefreshCw size={14} className={refreshing ? 'spin' : ''} /> Refresh
          </button>
          <a href="/" style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>← Portfolio</a>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
        {/* Stats */}
        <div className="admin-stats-grid" style={{ marginBottom: '32px' }}>
          {[
            { label: 'Total Messages', value: counts.total || 0, icon: <MessageSquare size={20} />, color: '#3b82f6' },
            { label: 'New Messages', value: counts.new || 0, icon: <Mail size={20} />, color: '#06b6d4' },
            { label: 'Replied', value: counts.replied || 0, icon: <Reply size={20} />, color: '#10b981' },
            { label: 'Portfolio Visits', value: analytics?.totalVisits || 0, icon: <TrendingUp size={20} />, color: '#8b5cf6' },
            { label: 'Project Views', value: analytics?.totalProjectViews || 0, icon: <BarChart3 size={20} />, color: '#f59e0b' },
            { label: 'Resume Downloads', value: analytics?.totalResumeClicks || 0, icon: <Users size={20} />, color: '#ef4444' },
          ].map(stat => (
            <motion.div key={stat.label} className="admin-stat-card"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div style={{ color: stat.color, marginBottom: '8px' }}>{stat.icon}</div>
              <div className="admin-stat-number" style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}aa)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
              <div className="admin-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {[{ id: 'messages', label: 'Messages', icon: <MessageSquare size={16} /> }, { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} /> }].map(tab => (
            <button key={tab.id} className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div className="project-search" style={{ width: '280px' }}>
                <Search size={16} color="#64748b" />
                <input type="text" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              {['all', 'new', 'read', 'replied', 'archived'].map(s => (
                <button key={s} className={`filter-btn ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                  {s !== 'all' && counts[s] > 0 && <span style={{ marginLeft: '6px', padding: '1px 7px', borderRadius: '10px', background: 'rgba(59,130,246,0.2)', fontSize: '0.7rem' }}>{counts[s]}</span>}
                </button>
              ))}
            </div>

            {/* Table */}
            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              {loading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                  <Loader2 size={32} className="spin" style={{ margin: '0 auto 12px', color: '#3b82f6' }} />
                  <p>Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                  <MessageSquare size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>No messages found</p>
                  <p style={{ fontSize: '0.875rem' }}>Messages from your contact form will appear here.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="messages-table">
                    <thead>
                      <tr>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map(msg => (
                        <MessageRow key={msg._id} msg={msg} onView={handleViewMessage} onStatusChange={handleStatusChange} onDelete={handleDelete} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && analytics && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '16px' }}>Event Breakdown</h3>
              {analytics.eventCounts?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {analytics.eventCounts.map(ec => (
                    <div key={ec._id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', width: '200px', fontFamily: 'var(--font-mono)' }}>{ec._id}</div>
                      <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '3px', width: `${Math.min(100, (ec.count / (analytics.eventCounts[0]?.count || 1)) * 100)}%` }} />
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#f1f5f9', width: '40px', textAlign: 'right' }}>{ec.count}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>No analytics data yet. Events will appear as visitors interact with your portfolio.</p>
              )}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '16px' }}>Recent Events</h3>
              {analytics.recentEvents?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                  {analytics.recentEvents.map((ev, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '16px', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', fontSize: '0.8rem' }}>
                      <span style={{ color: '#3b82f6', fontFamily: 'var(--font-mono)' }}>{ev.event}</span>
                      <span style={{ color: '#475569' }}>{new Date(ev.createdAt).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>No recent events yet.</p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMsg && (
          <MessageDetail
            message={selectedMsg}
            onClose={() => setSelectedMsg(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>

      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
