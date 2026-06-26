import React, { useState } from 'react';
import { PlusCircle, AlertCircle, Calendar, DollarSign, Tag, Briefcase, FileText } from 'lucide-react';

export default function BusinessDashboard({ tasks, onAddTask, onApproveTask }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('IT მხარდაჭერა');
  const [priority, setPriority] = useState('საშუალო');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  
  const [notification, setNotification] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !company || !budget || !description) {
      alert("გთხოვთ შეავსოთ ყველა ველი!");
      return;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title,
      company,
      category,
      priority,
      budget: parseFloat(budget),
      description,
      date: new Date().toISOString().split('T')[0],
      status: 'მოლოდინში', // Initial status
      assignedTo: null,
      managerNote: ''
    };

    onAddTask(newTask);
    
    // Reset Form
    setTitle('');
    setCompany('');
    setBudget('');
    setDescription('');

    // Notification
    setNotification('პრობლემა წარმატებით გაზიარდა! მენეჯერი მალე განიხილავს მას.');
    setTimeout(() => setNotification(''), 4000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'მოლოდინში': return <span className="badge badge-pending">მოლოდინში</span>;
      case 'დავალებული': return <span className="badge badge-assigned">დავალებული</span>;
      case 'პროცესშია': return <span className="badge badge-progress">პროცესშია</span>;
      case 'შესრულებული': return <span className="badge badge-completed">შესრულებული</span>;
      case 'დადასტურებული': return <span className="badge badge-approved">დასრულებული & გადახდილი</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'კრიტიკული': return { color: '#ef4444', fontWeight: 'bold' };
      case 'მაღალი': return { color: '#f97316', fontWeight: '600' };
      case 'საშუალო': return { color: '#eab308' };
      default: return { color: '#a8a29e' };
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>ბიზნეს კლიენტის პორტალი</span>
        <h2 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>გააზიარეთ ტექნოლოგიური პრობლემა</h2>
      </div>

      {notification && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid var(--status-approved)',
          color: 'var(--status-approved)',
          padding: '1rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <AlertCircle size={20} />
          <span style={{ fontWeight: 600 }}>{notification}</span>
        </div>
      )}

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Submit Problem Form */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={20} color="var(--primary)" />
            <span>ახალი განაცხადის შექმნა</span>
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>კომპანიის სახელი</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="მაგ: თეგეტა, ფრესკო..." 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>პრობლემის მოკლე სათაური</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="მაგ: ოფისის პრინტერები არ იბეჭდება..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>კატეგორია</label>
                <select 
                  className="form-control" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ background: '#ffffff', color: 'var(--text-main)' }}
                >
                  <option value="ვებ დეველოპმენტი">ვებ დეველოპმენტი</option>
                  <option value="სისტემური ადმინისტრირება">სისტემური ადმინისტრირება</option>
                  <option value="ქსელები და აპარატურა">ქსელები და აპარატურა</option>
                  <option value="მონაცემთა ბაზები">მონაცემთა ბაზები</option>
                  <option value="IT მხარდაჭერა">IT მხარდაჭერა</option>
                </select>
              </div>

              <div className="form-group">
                <label>პრიორიტეტი</label>
                <select 
                  className="form-control" 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  style={{ background: '#ffffff', color: 'var(--text-main)' }}
                >
                  <option value="დაბალი">დაბალი</option>
                  <option value="საშუალო">საშუალო</option>
                  <option value="მაღალი">მაღალი</option>
                  <option value="კრიტიკული">კრიტიკული</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>ბიუჯეტი (GEL)</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="მაგ: 500" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ paddingLeft: '2rem' }}
                />
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>₾</span>
              </div>
            </div>

            <div className="form-group">
              <label>პრობლემის დეტალური აღწერა</label>
              <textarea 
                className="form-control" 
                placeholder="დეტალურად აღწერეთ რა პრობლემა გაქვთ, რა სისტემაზეა საუბარი და რა გსურთ რომ გაკეთდეს..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              გაგზავნა
            </button>
          </form>
        </div>

        {/* Existing Problems Status List */}
        <div className="card" style={{ flex: '2' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="var(--accent)" />
            <span>თქვენი განაცხადების სტატუსი</span>
          </h3>

          {tasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
              <p>ჯერჯერობით არცერთი განაცხადი არ გაქვთ შექმნილი.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {tasks.map((task) => (
                <div key={task.id} style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.01)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: '#f3f4f6' }}>{task.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                        <Briefcase size={12} /> {task.company}
                      </span>
                    </div>
                    {getStatusBadge(task.status)}
                  </div>

                  <p style={{ color: '#d1d5db', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {task.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', color: '#9ca3af' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Tag size={14} /> {task.category}
                      </span>
                      <span>
                        პრიორიტეტი: <span style={getPriorityStyle(task.priority)}>{task.priority}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} /> {task.date}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '1.05rem' }}>
                        ₾{task.budget}
                      </span>

                      {/* Pay/Approve Action if task is completed */}
                      {task.status === 'შესრულებული' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => onApproveTask(task.id)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}
                        >
                          მიღება & გადახდა
                        </button>
                      )}
                    </div>
                  </div>

                  {task.managerNote && (
                    <div style={{
                      background: 'rgba(139, 92, 246, 0.08)',
                      borderLeft: '3px solid var(--primary)',
                      padding: '0.75rem',
                      borderRadius: '4px',
                      marginTop: '1rem',
                      fontSize: '0.85rem'
                    }}>
                      <strong>მენეჯერის კომენტარი:</strong> {task.managerNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
