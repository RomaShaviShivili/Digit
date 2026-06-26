import React from 'react';
import { Wallet, Star, CheckCircle, Play, CheckSquare, Sparkles, Tag, Calendar, User } from 'lucide-react';

export default function ExecutorDashboard({ tasks, executors, onUpdateTaskStatus, activeExecutorId, setActiveExecutorId }) {
  // Get active executor details
  const activeExecutor = executors.find(e => e.id === activeExecutorId) || executors[0];

  // Filter tasks assigned to active executor
  const executorTasks = tasks.filter(t => t.assignedTo === activeExecutor.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'დავალებული': return <span className="badge badge-assigned">დავალებული</span>;
      case 'პროცესშია': return <span className="badge badge-progress">პროცესშია</span>;
      case 'შესრულებული': return <span className="badge badge-completed">შესრულებული</span>;
      case 'დადასტურებული': return <span className="badge badge-approved">გადახდილი</span>;
      default: return <span className="badge">{status}</span>;
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
          <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>შემსრულებლის პორტალი</span>
          <h2 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>სამუშაო მაგიდა</h2>
        </div>

        {/* Executor Identity Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid var(--border-color)',
          padding: '0.5rem 1rem',
          borderRadius: '12px'
        }}>
          <User size={16} color="var(--primary)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>შემსრულებელი:</span>
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
              <option key={exec.id} value={exec.id}>{exec.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="dashboard-grid-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Left Side: Tasks Panel */}
        <div className="card" style={{ flex: '2', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckSquare size={20} color="var(--primary)" />
            <span>ჩემი დავალებები ({executorTasks.length})</span>
          </h3>

          {executorTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9ca3af' }}>
              <p>ამ ეტაპზე დავალებები არ გაქვთ მინიჭებული.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                (გადაერთეთ <strong>მენეჯერის</strong> პანელზე და დაუნიშნეთ ახალი საქმე ამ შემსრულებელს)
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {executorTasks.map((task) => (
                <div key={task.id} style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.5)',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem' }}>{task.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>კლიენტი: {task.company}</span>
                    </div>
                    {getStatusBadge(task.status)}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {task.description}
                  </p>

                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1rem', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    borderTop: '1px solid var(--border-color)', 
                    paddingTop: '0.75rem', 
                    fontSize: '0.85rem' 
                  }}>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Tag size={14} /> {task.category}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} /> {task.date}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.05rem' }}>
                        ₾{task.budget}
                      </span>

                      {/* Action buttons based on task state */}
                      {task.status === 'დავალებული' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => onUpdateTaskStatus(task.id, 'პროცესშია')}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}
                        >
                          <Play size={12} fill="white" />
                          <span>მუშაობის დაწყება</span>
                        </button>
                      )}

                      {task.status === 'პროცესშია' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => onUpdateTaskStatus(task.id, 'შესრულებული')}
                          style={{ 
                            padding: '0.4rem 0.8rem', 
                            fontSize: '0.8rem', 
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, var(--secondary) 0%, #a855f7 100%)' 
                          }}
                        >
                          <CheckCircle size={12} />
                          <span>დასრულებულად მონიშვნა</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {task.managerNote && (
                    <div style={{
                      background: 'rgba(139, 92, 246, 0.05)',
                      borderLeft: '3px solid var(--primary)',
                      padding: '0.65rem',
                      borderRadius: '4px',
                      marginTop: '0.75rem',
                      fontSize: '0.8rem',
                      color: '#d1d5db'
                    }}>
                      <strong>მენეჯერის მითითება:</strong> {task.managerNote}
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
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(236,72,153,0.08) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 8px 32px 0 rgba(99,102,241,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>მიმდინარე ბალანსი</span>
              <Wallet size={20} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
              ₾{activeExecutor.balance}
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>GEL</span>
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '1rem', fontSize: '0.8rem', color: '#059669' }}>
              <Sparkles size={12} />
              <span>ყველა გადახდა გარანტირებულია Escrow-ს მიერ</span>
            </div>
          </div>

          {/* Profile details */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
            <img 
              src={activeExecutor.avatar} 
              alt={activeExecutor.name} 
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--primary)',
                boxShadow: '0 0 15px rgba(139,92,246,0.4)'
              }}
            />
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{activeExecutor.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{activeExecutor.role}</p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', width: '100%', padding: '0.75rem 0', justifyContent: 'center' }}>
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: '#fbbf24', fontWeight: 700 }}>
                  <Star size={14} fill="#fbbf24" /> {activeExecutor.rating}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>რეიტინგი</span>
              </div>
              <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{activeExecutor.completedTasks}</span>
                <br />
                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>საქმე</span>
              </div>
            </div>

            <div style={{ width: '100%', textAlign: 'left' }}>
              <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#d1d5db' }}>უნარები:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {activeExecutor.skills.map((skill, idx) => (
                  <span key={idx} style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    color: '#e5e7eb'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
