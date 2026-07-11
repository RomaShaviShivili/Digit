import React from 'react';
import { Wallet, Star, CheckCircle, Play, CheckSquare, Sparkles, Tag, Calendar, User, ShieldAlert, Award } from 'lucide-react';

export default function ExecutorDashboard({ 
  tasks, 
  executors, 
  onUpdateTaskStatus, 
  activeExecutorId, 
  setActiveExecutorId, 
  t,
  currentUser
}) {
  // Get active executor details
  const activeExecutor = executors.find(e => e.id === activeExecutorId) || executors[0];

  // Filter tasks assigned to active executor
  const executorTasks = tasks.filter(t => t.assignedTo === activeExecutor.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'დავალებული': return <span className="badge badge-assigned">{t('statusAssigned')}</span>;
      case 'პროცესშია': return <span className="badge badge-progress">{t('statusProgress')}</span>;
      case 'შესრულებული': return <span className="badge badge-completed">{t('statusCompleted')}</span>;
      case 'დადასტურებული': return <span className="badge badge-approved">{t('statusPaid')}</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const getCategoryTranslation = (cat) => {
    switch (cat) {
      case 'ვებ დეველოპმენტი': return t('catWeb');
      case 'სისტემური ადმინისტრირება': return t('catSys');
      case 'ქსელები და აპარატურა': return t('catNet');
      case 'მონაცემთა ბაზები': return t('catDb');
      case 'IT მხარდაჭერა': return t('catSupport');
      default: return cat;
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      
      {/* Selector & Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('executorPortal')}
          </span>
          <h2 style={{ fontSize: '2rem', marginTop: '0.25rem', fontWeight: 900 }}>{t('myDesk')}</h2>
        </div>

        {/* Executor Identity Switcher - Hidden if logged in as executor */}
        {!currentUser && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid var(--border-glass)',
            padding: '0.5rem 1.2rem',
            borderRadius: '24px'
          }}>
            <User size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>{t('roleExecutor')}:</span>
            <select 
              className="form-control" 
              value={activeExecutorId}
              onChange={(e) => setActiveExecutorId(e.target.value)}
              style={{ 
                background: '#ffffff', 
                color: 'var(--text-main)', 
                border: 'none', 
                padding: '0.25rem 0.5rem', 
                width: 'auto',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {executors.map(exec => (
                <option key={exec.id} value={exec.id}>{exec.name} {exec.isBlocked ? `[${t('blockedStatus')}]` : ''}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Blocked Notice */}
      {activeExecutor.isBlocked && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '2px solid #ef4444',
          color: '#ef4444',
          padding: '1.25rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          backdropFilter: 'blur(10px)'
        }}>
          <ShieldAlert size={28} />
          <div>
            <h4 style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem' }}>ანგარიში დაბლოკილია / Account Blocked</h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: 600 }}>
              თქვენი ანგარიში დროებით დეაქტივირებულია მენეჯერის მიერ. სამუშაოების შესრულება და დადასტურება შეჩერებულია.
            </p>
          </div>
        </div>
      )}

      <div className="dashboard-grid-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Left Side: Tasks Panel */}
        <div className="card glass-card" style={{ flex: '2', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
            <CheckSquare size={22} color="var(--primary)" />
            <span>{t('myTasks')} ({executorTasks.length})</span>
          </h3>

          {executorTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9ca3af' }}>
              <CheckSquare size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{ fontSize: '1rem', fontWeight: 600 }}>{t('noTasksAssigned')}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {executorTasks.map((task) => (
                <div key={task.id} style={{
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.7)',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{task.title}</h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('clientLabel')}: <strong>{task.company}</strong></span>
                    </div>
                    {getStatusBadge(task.status)}
                  </div>

                  <p style={{ color: 'var(--text-main)', fontSize: '0.925rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    {task.description}
                  </p>

                  {/* Render task photo if available */}
                  {task.photo && (
                    <div style={{ marginBottom: '1.25rem', maxWidth: '350px', border: '1px solid var(--border-glass-strong)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                      <img 
                        src={task.photo} 
                        alt={task.title} 
                        style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} 
                      />
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1rem', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    borderTop: '1px solid var(--border-glass)', 
                    paddingTop: '1rem', 
                    fontSize: '0.85rem' 
                  }}>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Tag size={14} /> {getCategoryTranslation(task.category)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} /> {task.date}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.15rem' }}>
                        ₾{task.budget}
                      </span>

                      {/* Action buttons based on task state - disabled if blocked */}
                      {task.status === 'დავალებული' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => onUpdateTaskStatus(task.id, 'პროცესშია')}
                          disabled={activeExecutor.isBlocked}
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          <Play size={12} fill="white" style={{ stroke: 'none' }} />
                          <span>{t('startWork')}</span>
                        </button>
                      )}

                      {task.status === 'პროცესშია' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => onUpdateTaskStatus(task.id, 'შესრულებული')}
                          disabled={activeExecutor.isBlocked}
                          style={{ 
                            padding: '0.5rem 1rem', 
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.35rem'
                          }}
                        >
                          <CheckCircle size={12} />
                          <span>{t('markCompleted')}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {task.managerNote && (
                    <div style={{
                      background: '#f8fafc',
                      borderLeft: '4px solid var(--accent)',
                      padding: '0.75rem 1rem',
                      marginTop: '0.75rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}>
                      <strong>{t('managerInstructions')}</strong> {task.managerNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Profile Card & Wallet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Wallet Balance Card */}
          <div className="card glass-card" style={{
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid var(--border-glass-strong)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t('currentBalance')}</span>
              <Wallet size={22} color="var(--accent)" />
            </div>
            <h3 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-main)', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
              ₾{activeExecutor.balance}
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>GEL</span>
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '1rem', fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
              <Sparkles size={12} />
              <span>{t('escrowGuaranteed')}</span>
            </div>
          </div>

          {/* Profile details */}
          <div className="card glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
            <img 
              src={activeExecutor.avatar} 
              alt={activeExecutor.name} 
              style={{
                width: '88px',
                height: '88px',
                objectFit: 'cover',
                border: activeExecutor.isBlocked ? '3px solid #ef4444' : '1px solid var(--border-glass-strong)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.25rem' }}>{activeExecutor.name}</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>{activeExecutor.role}</p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', width: '100%', padding: '0.75rem 0', justifyContent: 'center' }}>
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '1rem', color: '#fbbf24', fontWeight: 800 }}>
                  <Star size={14} fill="#fbbf24" stroke="#f59e0b" /> {activeExecutor.rating}
                </span>
                <span style={{ fontSize: '0.725rem', color: '#9ca3af', fontWeight: 600 }}>{t('rating')}</span>
              </div>
              <div style={{ width: '1px', background: 'var(--border-glass)' }}></div>
              <div>
                <span style={{ fontSize: '1rem', fontWeight: 800 }}>{activeExecutor.completedTasks}</span>
                <br />
                <span style={{ fontSize: '0.725rem', color: '#9ca3af', fontWeight: 600 }}>{t('taskCountText')}</span>
              </div>
            </div>

            <div style={{ width: '100%', textAlign: 'left' }}>
              <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 800, textTransform: 'uppercase' }}>{t('skills')}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {activeExecutor.skills.map((skill, idx) => (
                  <span key={idx} style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-glass)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-main)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* EXECUTOR REVIEWS SECTION */}
          <div className="card glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem', margin: 0 }}>
              <Award size={18} color="var(--accent)" />
              <span>{t('executorReviews')}</span>
              <span style={{ fontSize: '0.75rem', background: 'var(--accent)', color: '#fff', padding: '0.1rem 0.4rem' }}>
                {activeExecutor.reviews ? activeExecutor.reviews.length : 0}
              </span>
            </h3>

            {(!activeExecutor.reviews || activeExecutor.reviews.length === 0) ? (
              <p style={{ fontStyle: 'italic', color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '1rem 0', margin: 0 }}>
                {t('noReviewsYet')}
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {activeExecutor.reviews.map((rev, i) => (
                  <div key={i} style={{
                    border: '1px solid var(--border-glass)',
                    padding: '0.85rem',
                    background: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{rev.company}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Star size={11} fill="#fbbf24" stroke="#f59e0b" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>{rev.rating}</span>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.4 }}>
                      "{rev.comment}"
                    </p>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'block', marginTop: '0.35rem', textAlign: 'right' }}>
                      {rev.date}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
