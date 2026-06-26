import React, { useState } from 'react';
import { UserCheck, Star, ShieldAlert, Award, FileText, CheckCircle, ArrowRight, UserPlus } from 'lucide-react';

export default function ManagerDashboard({ tasks, executors, onAssignTask }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedExecutorId, setSelectedExecutorId] = useState('');
  const [note, setNote] = useState('');

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!selectedExecutorId) {
      alert("გთხოვთ აირჩიოთ შემსრულებელი!");
      return;
    }
    onAssignTask(selectedTask.id, selectedExecutorId, note);
    setSelectedTask(null);
    setSelectedExecutorId('');
    setNote('');
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'მოლოდინში': return { color: 'var(--status-pending)' };
      case 'დავალებული': return { color: 'var(--status-assigned)' };
      case 'პროცესშია': return { color: 'var(--status-progress)' };
      case 'შესრულებული': return { color: 'var(--status-completed)' };
      case 'დადასტურებული': return { color: 'var(--status-approved)' };
      default: return { color: 'white' };
    }
  };

  // Get executor name by ID
  const getExecutorName = (id) => {
    const exec = executors.find(e => e.id === id);
    return exec ? exec.name : 'უცნობი';
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>კოორდინატორ-მენეჯერის პორტალი</span>
        <h2 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>დავალებების განაწილება და მონიტორინგი</h2>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Active Tasks Management */}
        <div className="card" style={{ flex: '2', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="var(--primary)" />
            <span>ყველა განაცხადი</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.map((task) => (
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
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      კომპანია: {task.company} | ბიუჯეტი: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>₾{task.budget}</span>
                    </span>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, ...getStatusStyle(task.status) }}>
                    • {task.status}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {task.description}
                </p>

                {/* Assignment Display */}
                {task.assignedTo && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    შემსრულებელი: <strong style={{ color: 'var(--text-main)' }}>{getExecutorName(task.assignedTo)}</strong>
                  </div>
                )}

                {/* Assignment Controls */}
                {task.status === 'მოლოდინში' && (
                  <button 
                    className="btn btn-outline"
                    onClick={() => setSelectedTask(task)}
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}
                  >
                    <UserPlus size={14} />
                    <span>დაავალე შემსრულებელს</span>
                  </button>
                )}

                {task.status === 'შესრულებული' && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--status-completed)',
                    background: 'rgba(236,72,153,0.08)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px'
                  }}>
                    <CheckCircle size={14} />
                    <span>დავალება შესრულებულია. ელოდება ბიზნესისგან გადახდას.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Executors List & Assign Popup */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Assignment Popup Card */}
          {selectedTask && (
            <div className="card" style={{ 
              border: '2px solid var(--primary)', 
              boxShadow: '0 10px 25px rgba(99,102,241,0.15)',
              background: '#ffffff'
            }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                შემსრულებლის მიმაგრება
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                დავალება: <strong style={{ color: 'var(--text-main)' }}>{selectedTask.title}</strong>
              </p>

              <form onSubmit={handleAssignSubmit}>
                <div className="form-group">
                  <label>აირჩიეთ IT სპეციალისტი</label>
                  <select 
                    className="form-control"
                    value={selectedExecutorId}
                    onChange={(e) => setSelectedExecutorId(e.target.value)}
                    style={{ background: '#ffffff', color: 'var(--text-main)' }}
                  >
                    <option value="">-- აირჩიეთ სიაფან --</option>
                    {executors.map(exec => (
                      <option key={exec.id} value={exec.id}>
                        {exec.name} ({exec.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>მითითება შემსრულებელს</label>
                  <textarea 
                    className="form-control"
                    placeholder="მაგ: გთხოვთ დაუკავშირდეთ კლიენტს დღესვე..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{ minHeight: '70px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.5rem 1rem' }}>
                    დადასტურება
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedTask(null)}
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    გაუქმება
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* IT Executors / Developers List */}
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} color="var(--accent)" />
              <span>IT სპეციალისტები</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {executors.map((exec) => (
                <div key={exec.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '1rem'
                }}>
                  <img 
                    src={exec.avatar} 
                    alt={exec.name} 
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      border: '2px solid var(--border-color)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem' }}>{exec.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0.15rem 0' }}>{exec.role}</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', color: '#fbbf24' }}>
                        <Star size={12} fill="#fbbf24" /> {exec.rating}
                      </span>
                      <span style={{ color: '#9ca3af' }}>{exec.completedTasks} საქმე</span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>₾{exec.balance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
