import React from 'react';
import { Terminal, Briefcase, UserCheck, Code, Home, Sparkles } from 'lucide-react';

export default function Navbar({ activeView, setActiveView }) {
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

        {/* Navigation / Role Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          border: '2px solid #000000',
          padding: '0',
          borderRadius: '0',
          flexWrap: 'wrap'
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
              borderRight: '2px solid #000'
            }}
          >
            <span>მთავარი</span>
          </button>
          
          <button 
            className={`btn`}
            onClick={() => setActiveView('business')}
            style={{ 
              padding: '0.5rem 1.25rem', 
              borderRadius: '0',
              fontSize: '0.8rem',
              background: activeView === 'business' ? '#000' : 'transparent',
              color: activeView === 'business' ? '#fff' : '#000',
              border: 'none',
              borderRight: '2px solid #000'
            }}
          >
            <span>ბიზნესი</span>
          </button>

          <button 
            className={`btn`}
            onClick={() => setActiveView('manager')}
            style={{ 
              padding: '0.5rem 1.25rem', 
              borderRadius: '0',
              fontSize: '0.8rem',
              background: activeView === 'manager' ? '#000' : 'transparent',
              color: activeView === 'manager' ? '#fff' : '#000',
              border: 'none',
              borderRight: '2px solid #000'
            }}
          >
            <span>მენეჯერი</span>
          </button>

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
            <span>შემსრულებელი</span>
          </button>
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
          borderRadius: '0',
          background: 'transparent'
        }}>
          <Sparkles size={12} color="#000" />
          <span>ინტერაქტიული დემო</span>
        </div>
      </div>
    </nav>
  );
}
