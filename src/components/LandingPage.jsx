import React from 'react';
import { ArrowRight, Briefcase, UserCheck, Code } from 'lucide-react';

// Clean, sharp SVG illustrations — neo-brutalist style matching reference site
const BusinessIllustration = () => (
  <svg viewBox="0 0 200 120" width="100%" height="90" style={{ maxHeight: '90px' }}>
    <rect x="20" y="20" width="160" height="80" rx="0" fill="none" stroke="#000" strokeWidth="2.5" />
    <line x1="20" y1="40" x2="180" y2="40" stroke="#000" strokeWidth="2" />
    <circle cx="35" cy="30" r="5" fill="#000" />
    <circle cx="50" cy="30" r="5" fill="#000" />
    <circle cx="65" cy="30" r="5" fill="rgba(0,0,0,0.2)" />
    <path d="M40 85v-25l30-15 40 20 40-35" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="square" />
    <rect x="150" y="30" width="16" height="16" fill="#4f46e5" />
  </svg>
);

const ManagerIllustration = () => (
  <svg viewBox="0 0 200 120" width="100%" height="90" style={{ maxHeight: '90px' }}>
    <rect x="20" y="20" width="70" height="35" fill="none" stroke="#000" strokeWidth="2" />
    <rect x="110" y="20" width="70" height="35" fill="none" stroke="#000" strokeWidth="2" />
    <rect x="65" y="75" width="70" height="35" fill="none" stroke="#000" strokeWidth="2" />
    <path d="M55 55v10h45" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 3" />
    <path d="M145 55v10h-45v10" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 3" />
    <circle cx="100" cy="65" r="5" fill="#000" />
  </svg>
);

const ExecutorIllustration = () => (
  <svg viewBox="0 0 200 120" width="100%" height="90" style={{ maxHeight: '90px' }}>
    <rect x="30" y="25" width="140" height="80" rx="0" fill="none" stroke="#000" strokeWidth="2.5" />
    <line x1="30" y1="105" x2="170" y2="105" stroke="#000" strokeWidth="6" strokeLinecap="square" />
    <path d="M55 50l-12 12 12 12M75 50l12 12-12 12" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
    <line x1="98" y1="62" x2="155" y2="62" stroke="#000" strokeWidth="3" strokeLinecap="square" />
    <line x1="98" y1="72" x2="140" y2="72" stroke="rgba(0,0,0,0.35)" strokeWidth="3" strokeLinecap="square" />
    <line x1="98" y1="82" x2="148" y2="82" stroke="rgba(0,0,0,0.2)" strokeWidth="3" strokeLinecap="square" />
  </svg>
);

export default function LandingPage({ setActiveView, t }) {
  return (
    <div style={{ padding: '3rem 0 7rem 0' }}>
      <div className="container">

        {/* ── Top bar ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #000000',
          paddingBottom: '0.85rem',
          marginBottom: '5rem',
        }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#4f46e5',
          }}>
            DIGIT / ZERO-G SYSTEM
          </span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#000',
          }}>
            @DIGIT_SYS
          </span>
        </div>

        {/* ── Hero ── */}
        <div style={{ marginBottom: '5rem', maxWidth: '900px' }}>

          {/* Eyebrow tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#4f46e5',
            border: '2px solid #4f46e5',
            background: 'rgba(79,70,229,0.06)',
            padding: '0.3rem 0.9rem',
            marginBottom: '2rem',
          }}>
            ✦ DIGIT PLATFORM
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: '1.75rem',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#000000',
          }}>
            {t('heroTitle')}
          </h1>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#334155',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            fontWeight: 500,
          }}>
            {t('heroSubtitle')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => setActiveView('auth')}
              style={{ padding: '0.9rem 2rem', fontSize: '0.8rem' }}
            >
              <span>{t('openSiteDemo')}</span>
              <ArrowRight size={16} />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ padding: '0.9rem 2rem', fontSize: '0.8rem' }}
            >
              {t('howItWorks')}
            </button>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          border: '2px solid #000000',
          marginBottom: '5rem',
          background: '#ffffff',
          boxShadow: '4px 4px 0px #000000',
        }}>
          {[
            { value: '500+', label: 'IT სპეციალისტი / Specialists' },
            { value: '1,200+', label: 'შესრულებული / Completed' },
            { value: '98%', label: 'კმაყოფილება / Satisfaction' },
            { value: '24/7', label: 'მხარდაჭერა / Support' },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: '1',
              minWidth: '150px',
              padding: '1.75rem 1.5rem',
              borderRight: i < 3 ? '2px solid #000000' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}>{stat.value}</div>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#475569',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── 3-Column Roles (Nonsense-style grid) ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '2px solid #000000',
          paddingTop: '0.75rem',
          marginBottom: '0',
          marginTop: '0',
        }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#000000',
          }}>ABOUT</span>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#000000',
          }}>ROLES</span>
        </div>

        <div id="about-section" className="nonsense-grid" style={{ marginTop: 0 }}>
          <div className="nonsense-col float-zero-g">
            <div className="label-caps">{t('roleBusiness')}</div>
            <h2 style={{
              fontSize: '1.3rem',
              marginBottom: '1.25rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}>{t('businessDescTitle')}</h2>
            <div className="illustration-container">
              <BusinessIllustration />
            </div>
            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.7 }}>
              {t('businessDesc')}
            </p>
          </div>

          <div className="nonsense-col float-zero-g-reverse">
            <div className="label-caps">{t('roleManager')}</div>
            <h2 style={{
              fontSize: '1.3rem',
              marginBottom: '1.25rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}>{t('managerDescTitle')}</h2>
            <div className="illustration-container">
              <ManagerIllustration />
            </div>
            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.7 }}>
              {t('managerDesc')}
            </p>
          </div>

          <div className="nonsense-col float-zero-g">
            <div className="label-caps">{t('roleExecutor')}</div>
            <h2 style={{
              fontSize: '1.3rem',
              marginBottom: '1.25rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}>{t('executorDescTitle')}</h2>
            <div className="illustration-container">
              <ExecutorIllustration />
            </div>
            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.7 }}>
              {t('executorDesc')}
            </p>
          </div>
        </div>

        {/* ── Highlights ── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          border: '2px solid #000000',
          marginTop: '4rem',
          background: '#ffffff',
          boxShadow: '4px 4px 0px #000000',
        }}>
          {[
            { title: t('guaranteedQuality'), desc: t('guaranteedQualityDesc'), icon: '✦', color: '#4f46e5' },
            { title: t('instantPayments'),   desc: t('instantPaymentsDesc'),   icon: '⚡', color: '#000000' },
            { title: t('professionalTeam'),  desc: t('professionalTeamDesc'),  icon: '◈', color: '#4f46e5' },
          ].map((item, i) => (
            <div key={i} style={{
              flex: '1',
              minWidth: '220px',
              padding: '2rem 1.75rem',
              borderRight: i < 2 ? '2px solid #000000' : 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8f8ff'}
            onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
            >
              <div style={{
                fontSize: '1.4rem',
                color: item.color,
                marginBottom: '0.85rem',
                lineHeight: 1,
              }}>{item.icon}</div>
              <h3 style={{
                fontSize: '0.88rem',
                marginBottom: '0.5rem',
                fontWeight: 900,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.65 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div style={{
          marginTop: '4rem',
          background: '#000000',
          border: '2px solid #000000',
          padding: '3rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '6px 6px 0px #4f46e5',
        }}>
          <div>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#4f46e5',
              marginBottom: '0.75rem',
            }}>READY TO LAUNCH</div>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 900,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              {t('openSiteDemo')}
            </h2>
          </div>
          <button
            className="btn"
            onClick={() => setActiveView('auth')}
            style={{
              background: '#4f46e5',
              color: '#ffffff',
              border: '2px solid #4f46e5',
              boxShadow: '4px 4px 0px #ffffff',
              padding: '1rem 2.25rem',
              fontSize: '0.8rem',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.borderColor = '#ffffff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#4f46e5';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#4f46e5';
            }}
          >
            <span>{t('signIn')}</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
