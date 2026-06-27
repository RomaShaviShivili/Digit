import React, { useState } from 'react';
import { authenticateUser, registerUser } from '../data/mockData';
import { User, Lock, Mail, ChevronRight, Briefcase, Plus, Check } from 'lucide-react';

export default function Auth({ onLoginSuccess, language, t }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('executor');
  
  // Executor specific registration details
  const [execRole, setExecRole] = useState('');
  const [skills, setSkills] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError(t('errorFillAll'));
      return;
    }

    const user = authenticateUser(username, password);
    if (user) {
      onLoginSuccess(user);
    } else {
      setError(t('errorWrongCreds'));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!username || !password || !fullName) {
      setError(t('errorFillAll'));
      return;
    }

    let extraDetails = {};
    if (role === 'executor') {
      extraDetails = {
        role: execRole || 'IT Specialist',
        skills: skills ? skills.split(',').map(s => s.trim()) : ['General IT'],
        avatar: avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
    }

    const result = registerUser(username, password, role, fullName, extraDetails);
    if (result.success) {
      setSuccessMsg(role === 'executor' ? 'რეგისტრაცია წარმატებულია! შემსრულებლის პროფილი შეიქმნა.' : 'რეგისტრაცია წარმატებულია!');
      setTimeout(() => {
        // Automatically log in
        onLoginSuccess(result.user);
      }, 1500);
    } else {
      setError(result.message || t('errorUserExists'));
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4rem 1rem',
      minHeight: '80vh',
      background: 'var(--bg-main)'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        border: '3px solid var(--primary)',
        background: '#ffffff',
        padding: '2.5rem'
      }}>
        {/* Header Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid var(--primary)',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          <button
            onClick={() => { setIsRegister(false); setError(''); setSuccessMsg(''); }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: 'pointer',
              color: !isRegister ? 'var(--primary)' : '#94a3b8',
              borderBottom: !isRegister ? '4px solid var(--primary)' : 'none',
              marginBottom: '-2px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {t('signIn')}
          </button>
          <button
            onClick={() => { setIsRegister(true); setError(''); setSuccessMsg(''); }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: 'pointer',
              color: isRegister ? 'var(--primary)' : '#94a3b8',
              borderBottom: isRegister ? '4px solid var(--primary)' : 'none',
              marginBottom: '-2px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {t('signUp')}
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1.5px solid #ef4444',
            color: '#b91c1c',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            background: '#ecfdf5',
            border: '1.5px solid #10b981',
            color: '#047857',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Check size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        {!isRegister ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>{t('username')}</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. business"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label>{t('password')}</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }} />
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '0.75rem' }}>
              <span>{t('loginBtn')}</span>
              <ChevronRight size={16} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#64748b', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsRegister(true)}>
                {t('dontHaveAccount')}
              </span>
            </div>
          </form>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>{t('fullName')}</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>{t('username')}</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>{t('password')}</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>{t('selectRole')}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {['business', 'manager', 'executor'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    style={{
                      padding: '0.75rem 0.25rem',
                      background: role === r ? 'var(--primary)' : 'transparent',
                      color: role === r ? '#ffffff' : 'var(--primary)',
                      border: '2px solid var(--primary)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {t(`role${r.charAt(0).toUpperCase() + r.slice(1)}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Executor specific inputs */}
            {role === 'executor' && (
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid var(--border-color)',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                animation: 'fadeIn 0.2s ease-in-out'
              }}>
                <div className="form-group">
                  <label>{t('executorRoleTitle')}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Frontend Developer"
                    value={execRole}
                    onChange={(e) => setExecRole(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>{t('skillsLabel')}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. React, CSS, Node.js"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>{t('avatarUrlLabel')}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://..."
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '0.75rem', marginTop: '1rem' }}>
              <span>{t('registerBtn')}</span>
              <ChevronRight size={16} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#64748b', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsRegister(false)}>
                {t('alreadyHaveAccount')}
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
