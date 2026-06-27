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
      padding: '1.25rem 0'
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
            gap: '0.65rem', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            background: '#000000',
            padding: '0.5rem',
            borderRadius: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Terminal size={18} color="white" />
          </div>
          <span style={{ 
            fontSize: '1.35rem', 
            fontWeight: 900, 
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#000000'
          }}>
            DIGIT
          </span>
        </div>

        {/* Navigation / Role-based link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '2px solid #000000',
            padding: '0',
            borderRadius: '0'
          }}>
            <button 
              className={`btn`}
              onClick={() => setActiveView('landing')}
              style={{ 
                padding: '0.5rem 1.25rem', 
                borderRadius: '0',
                fontSize: '0.8rem',
                background: activeView === 'landing' ? '#000' : 'transparent',
                color: activeView === 'landing' ? '#fff' : '#000',
                border: 'none',
                borderRight: currentUser ? '2px solid #000' : 'none'
              }}
            >
              <span>{t('home')}</span>
            </button>
            
            {/* Show only authorized dashboard based on logged-in user's role */}
            {currentUser && currentUser.role === 'business' && (
              <button 
                className={`btn`}
                onClick={() => setActiveView('business')}
                style={{ 
                  padding: '0.5rem 1.25rem', 
                  borderRadius: '0',
                  fontSize: '0.8rem',
                  background: activeView === 'business' ? '#000' : 'transparent',
                  color: activeView === 'business' ? '#fff' : '#000',
                  border: 'none'
                }}
              >
                <span>{t('business')}</span>
              </button>
            )}

            {currentUser && currentUser.role === 'manager' && (
              <button 
                className={`btn`}
                onClick={() => setActiveView('manager')}
                style={{ 
                  padding: '0.5rem 1.25rem', 
                  borderRadius: '0',
                  fontSize: '0.8rem',
                  background: activeView === 'manager' ? '#000' : 'transparent',
                  color: activeView === 'manager' ? '#fff' : '#000',
                  border: 'none'
                }}
              >
                <span>{t('manager')}</span>
              </button>
            )}

            {currentUser && currentUser.role === 'executor' && (
              <button 
                className={`btn`}
                onClick={() => setActiveView('executor')}
                style={{ 
                  padding: '0.5rem 1.25rem', 
                  borderRadius: '0',
                  fontSize: '0.8rem',
                  background: activeView === 'executor' ? '#000' : 'transparent',
                  color: activeView === 'executor' ? '#fff' : '#000',
                  border: 'none'
                }}
              >
                <span>{t('executor')}</span>
              </button>
            )}
          </div>

          {/* User Account Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {/* User Profile Summary */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: '2px solid #cbd5e1',
                  padding: '0.4rem 0.8rem',
                  background: '#f8fafc'
                }}>
                  <User size={14} color="var(--primary)" />
                  <span style={{ color: 'var(--text-main)' }}>{currentUser.name}</span>
                  <span style={{
                    fontSize: '0.7rem',
                    background: 'var(--primary)',
                    color: '#fff',
                    padding: '0.1rem 0.4rem',
                    textTransform: 'uppercase'
                  }}>
                    {t(`role${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}`)}
                  </span>
                </div>
                
                {/* Log Out */}
                <button 
                  onClick={onLogOut}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    borderColor: '#cbd5e1'
                  }}
                >
                  <LogOut size={14} />
                  <span>{t('logOut')}</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setActiveView('auth')}
                className="btn btn-primary"
                style={{
                  padding: '0.4rem 1.25rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <LogIn size={14} />
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
            padding: '0.2rem 0.5rem',
            background: '#ffffff'
          }}>
            <Globe size={14} color="#000" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '0.75rem',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              <option value="ka">KA</option>
              <option value="en">EN</option>
              <option value="tr">TR</option>
              <option value="ar">AR (العربية)</option>
              <option value="he">HE (עברית)</option>
            </select>
          </div>

          {/* Demo Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            border: '1.5px solid #000',
            padding: '0.4rem 0.8rem',
            background: 'transparent'
          }}>
            <Sparkles size={12} color="#000" />
            <span>{t('demoMode')}</span>
          </div>

        </div>
      </div>
    </nav>
  );
}
