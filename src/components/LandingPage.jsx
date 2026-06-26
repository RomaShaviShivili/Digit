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

export default function LandingPage({ setActiveView }) {
  return (
    <div style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container">
        
        {/* Modernist Top Header (Divided layout inspired by NONSENSE) */}
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
            @DIGITGEORGIA
          </span>
        </div>

        {/* Hero Headline */}
        <div style={{ marginBottom: '5rem', maxWidth: '850px' }}>
          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.05, marginBottom: '2rem' }}>
            ტექნოლოგიური პრობლემების <br />
            მართვის <span className="gradient-text">სადა და მარტივი</span> სისტემა
          </h1>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px' }}>
            ბიზნესი აზიარებს სისტემურ ხარვეზს, მენეჯერი აკოორდინირებს საქმეს, IT შემსრულებელი კი იღებს ანაზღაურებას. დაცული და კონტროლირებადი პროცესი.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveView('business')}
              style={{ padding: '1rem 2rem' }}
            >
              <span>საიტის გახსნა (დემო)</span>
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
              როგორ მუშაობს?
            </button>
          </div>
        </div>

        {/* Nonsense-style 3 Columns Divide Grid */}
        <div id="about-section" className="nonsense-grid">
          
          {/* Column 1 */}
          <div className="nonsense-col">
            <div className="label-caps">ვინ: ბიზნესი</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>პრობლემის გაზიარება</h2>
            
            <div className="illustration-container">
              <BusinessIllustration />
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'left', width: '100%' }}>
              ბიზნეს კომპანია სისტემაში აქვეყნებს არსებული ტექნიკური პრობლემის განაცხადს, უთითებს აღწერილობას და ბიუჯეტს.
            </p>
          </div>

          {/* Column 2 */}
          <div className="nonsense-col">
            <div className="label-caps">ვინ: მენეჯერი</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>კოორდინაცია</h2>
            
            <div className="illustration-container">
              <ManagerIllustration />
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'left', width: '100%' }}>
              მენეჯერი ამოწმებს განაცხადს და უმოკლეს დროში არჩევს შესაბამისი რეიტინგის მქონე თავისუფალ IT შემსრულებელს.
            </p>
          </div>

          {/* Column 3 */}
          <div className="nonsense-col">
            <div className="label-caps">ვინ: შემსრულებელი</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>ანაზღაურება</h2>
            
            <div className="illustration-container">
              <ExecutorIllustration />
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'left', width: '100%' }}>
              IT სპეციალისტი ასრულებს დავალებას. მენეჯერის მიერ ჩაბარებული სამუშაოს დადასტურებისთანავე ერიცხება კუთვნილი თანხა.
            </p>
          </div>

        </div>

        {/* Minimal Footer Info Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '3rem',
          marginTop: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>გარანტირებული ხარისხი</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '300px' }}>
              თითოეული სამუშაო მოწმდება მენეჯერის მიერ, სანამ ბიზნესი მის ჩაბარებას დაადასტურებს.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>მყისიერი გადახდები</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '300px' }}>
              ანაზღაურება ერიცხება შემსრულებელს პირდაპირ ბალანსზე სამუშაოს დასრულებისთანავე.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>პროფესიონალი IT გუნდი</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '300px' }}>
              ჩვენს ბაზაში რეგისტრირებულია მხოლოდ ვერიფიცირებული და მაღალი რეიტინგის მქონე შემსრულებლები.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
