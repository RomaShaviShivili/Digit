import React from 'react';
import { Terminal, LogOut, LogIn, Globe, Sparkles, User } from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  currentUser, 
  onLogOut, 
  language, 
  onLanguageChange, 
  t 
}) {
  return (
    <nav style={{
      background: '#ffffff',
      borderBottom: '2px solid #000000',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 0',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveView('landing')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            background: '#000000',
            padding: '0.5rem',
            borderRadius: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Terminal size={18} color="white" />
          </div>
          <span style={{ 
            fontSize: '1.25rem', 
            fontWeight: 900, 
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: 'var(--font-sans)',
          }}>
            DIGIT
          </span>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {/* Nav Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            border: '2px solid #000000',
            padding: '0.2rem',
            background: '#ffffff',
          }}>
            <button 
              onClick={() => setActiveView('landing')}
              style={{ 
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.4rem 0.9rem',
                border: 'none',
                background: activeView === 'landing' ? '#000000' : 'transparent',
                color: activeView === 'landing' ? '#ffffff' : '#000000',
              }}
            >
              {t('home')}
            </button>
            
            {currentUser && currentUser.role === 'business' && (
              <button 
                onClick={() => setActiveView('business')}
                style={{ 
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.4rem 0.9rem',
                  border: 'none',
                  background: activeView === 'business' ? '#000000' : 'transparent',
                  color: activeView === 'business' ? '#ffffff' : '#000000',
                }}
              >
                {t('business')}
              </button>
            )}

            {currentUser && currentUser.role === 'manager' && (
              <button 
                onClick={() => setActiveView('manager')}
                style={{ 
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.4rem 0.9rem',
                  border: 'none',
                  background: activeView === 'manager' ? '#000000' : 'transparent',
                  color: activeView === 'manager' ? '#ffffff' : '#000000',
                }}
              >
                {t('manager')}
              </button>
            )}

            {currentUser && currentUser.role === 'executor' && (
              <button 
                onClick={() => setActiveView('executor')}
                style={{ 
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.4rem 0.9rem',
                  border: 'none',
                  background: activeView === 'executor' ? '#000000' : 'transparent',
                  color: activeView === 'executor' ? '#ffffff' : '#000000',
                }}
              >
                {t('executor')}
              </button>
            )}
          </div>

          {/* User Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  border: '2px solid #000000',
                  padding: '0.35rem 0.75rem',
                  background: '#f8f8ff',
                  color: '#000000',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  <User size={12} color="#4f46e5" />
                  <span>{currentUser.name}</span>
                  <span style={{
                    fontSize: '0.6rem',
                    background: '#4f46e5',
                    color: '#fff',
                    padding: '0.1rem 0.4rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {t(`role${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}`)}
                  </span>
                </div>
                
                <button 
                  onClick={onLogOut}
                  className="btn btn-secondary"
                  style={{ padding: '0.35rem 0.8rem', fontSize: '0.7rem', gap: '0.3rem' }}
                >
                  <LogOut size={12} />
                  <span>{t('logOut')}</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setActiveView('auth')}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.72rem', gap: '0.35rem' }}
              >
                <LogIn size={13} />
                <span>{t('signIn')}</span>
              </button>
            )}
          </div>

          {/* Language Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            border: '2px solid #000000',
            padding: '0.35rem 0.7rem',
            background: '#ffffff',
          }}>
            <Globe size={12} color="#4f46e5" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '0.7rem',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                color: '#000000',
                letterSpacing: '0.05em',
              }}
            >
              <option value="ka">KA</option>
              <option value="en">EN</option>
              <option value="tr">TR</option>
              <option value="ar">AR</option>
              <option value="he">HE</option>
            </select>
          </div>

          {/* Demo Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.65rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            border: '2px solid #4f46e5',
            padding: '0.35rem 0.75rem',
            color: '#4f46e5',
            background: '#f0f0ff',
          }}>
            <Sparkles size={10} color="#4f46e5" />
            <span>{t('demoMode')}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
