import React from 'react';
import { ArrowRight, Briefcase, UserCheck, Code, Cpu } from 'lucide-react';

// Custom Minimalist Duotone SVG Illustrations matching the high-contrast modernist style
const BusinessIllustration = () => (
  <svg viewBox="0 0 200 120" width="100%" height="90" style={{ maxHeight: '90px' }}>
    <rect x="20" y="20" width="160" height="80" rx="0" fill="none" stroke="#000" strokeWidth="2.5" />
    <line x1="20" y1="40" x2="180" y2="40" stroke="#000" strokeWidth="2" />
    <circle cx="35" cy="30" r="5" fill="#000" />
    <circle cx="50" cy="30" r="5" fill="#000" />
    <circle cx="65" cy="30" r="5" fill="#000" />
    
    {/* Clean graph mockup */}
    <path d="M40 85v-25l30-15 40 20 40-35" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="square" />
    <rect x="150" y="30" width="16" height="16" fill="#000" />
  </svg>
);

const ManagerIllustration = () => (
  <svg viewBox="0 0 200 120" width="100%" height="90" style={{ maxHeight: '90px' }}>
    {/* Grid connection */}
    <rect x="20" y="20" width="70" height="35" fill="none" stroke="#000" strokeWidth="2" />
    <rect x="110" y="20" width="70" height="35" fill="none" stroke="#000" strokeWidth="2" />
    <rect x="65" y="75" width="70" height="35" fill="none" stroke="#000" strokeWidth="2" />
    
    {/* Connections */}
    <path d="M55 55v10h45" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M145 55v10h-45v10" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 3" />
    
    <circle cx="100" cy="65" r="5" fill="#000" />
  </svg>
);

const ExecutorIllustration = () => (
  <svg viewBox="0 0 200 120" width="100%" height="90" style={{ maxHeight: '90px' }}>
    {/* Minimal laptop & code */}
    <rect x="30" y="30" width="140" height="70" fill="none" stroke="#000" strokeWidth="2.5" />
    <line x1="20" y1="100" x2="180" y2="100" stroke="#000" strokeWidth="4" />
    
    <path d="M50 50l-8 8 8 8M65 50l8 8-8 8" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="square" />
    <line x1="85" y1="58" x2="140" y2="58" stroke="#000" strokeWidth="3" />
    <line x1="85" y1="68" x2="120" y2="68" stroke="#000" strokeWidth="3" />
  </svg>
);

export default function LandingPage({ setActiveView, t }) {
  return (
    <div style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container">
        
        {/* Modernist Top Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '2px solid #000',
          paddingBottom: '1rem',
          marginBottom: '4rem'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            DIGIT / DIGITAL PLATFORM
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            @DIGITPLATFORM
          </span>
        </div>

        {/* Hero Headline */}
        <div style={{ marginBottom: '5rem', maxWidth: '850px' }}>
          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.05, marginBottom: '2rem' }}>
            {t('heroTitle').split(' ').slice(0, -3).join(' ')} <br />
            {t('heroTitle').split(' ').slice(-3).join(' ')}
          </h1>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px' }}>
            {t('heroSubtitle')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveView('auth')}
              style={{ padding: '1rem 2rem' }}
            >
              <span>{t('openSiteDemo')}</span>
              <ArrowRight size={18} />
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                const element = document.getElementById('about-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ padding: '1rem 2rem' }}
            >
              {t('howItWorks')}
            </button>
          </div>
        </div>

        {/* 3 Columns Divide Grid */}
        <div id="about-section" className="nonsense-grid">
          
          {/* Column 1 */}
          <div className="nonsense-col">
            <div className="label-caps">{t('roleBusiness')}</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>{t('businessDescTitle')}</h2>
            
            <div className="illustration-container">
              <BusinessIllustration />
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'justify', width: '100%' }}>
              {t('businessDesc')}
            </p>
          </div>

          {/* Column 2 */}
          <div className="nonsense-col">
            <div className="label-caps">{t('roleManager')}</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>{t('managerDescTitle')}</h2>
            
            <div className="illustration-container">
              <ManagerIllustration />
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'justify', width: '100%' }}>
              {t('managerDesc')}
            </p>
          </div>

          {/* Column 3 */}
          <div className="nonsense-col">
            <div className="label-caps">{t('roleExecutor')}</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>{t('executorDescTitle')}</h2>
            
            <div className="illustration-container">
              <ExecutorIllustration />
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'justify', width: '100%' }}>
              {t('executorDesc')}
            </p>
          </div>

        </div>

        {/* Highlights Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '2.5rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '3rem',
          marginTop: '2rem'
        }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{t('guaranteedQuality')}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {t('guaranteedQualityDesc')}
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{t('instantPayments')}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {t('instantPaymentsDesc')}
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{t('professionalTeam')}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {t('professionalTeamDesc')}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
