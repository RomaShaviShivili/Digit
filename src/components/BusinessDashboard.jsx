import React, { useState, useEffect } from 'react';
import { PlusCircle, AlertCircle, Calendar, DollarSign, Tag, Briefcase, FileText } from 'lucide-react';

export default function BusinessDashboard({ tasks, onAddTask, onApproveTask, t, currentUser }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(currentUser ? currentUser.name : '');
  const [category, setCategory] = useState('IT მხარდაჭერა');
  const [priority, setPriority] = useState('საშუალო');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState('');

  // Keep company synchronized with current user's name
  useEffect(() => {
    if (currentUser) {
      setCompany(currentUser.name);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !company || !budget || !description) {
      alert(t('errorFillAll'));
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
      status: 'მოლოდინში', // Internal DB value
      assignedTo: null,
      managerNote: ''
    };

    onAddTask(newTask);
    
    // Reset Form
    setTitle('');
    setBudget('');
    setDescription('');

    // Notification
    setNotification(t('successShare'));
    setTimeout(() => setNotification(''), 4000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'მოლოდინში': return <span className="badge badge-pending">{t('statusPending')}</span>;
      case 'დავალებული': return <span className="badge badge-assigned">{t('statusAssigned')}</span>;
      case 'პროცესშია': return <span className="badge badge-progress">{t('statusProgress')}</span>;
      case 'შესრულებული': return <span className="badge badge-completed">{t('statusCompleted')}</span>;
      case 'დადასტურებული': return <span className="badge badge-approved">{t('statusApproved')}</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const getPriorityStyle = (pri) => {
    switch (pri) {
      case 'კრიტიკული': return { color: '#ef4444', fontWeight: 'bold' };
      case 'მაღალი': return { color: '#f97316', fontWeight: '600' };
      case 'საშუალო': return { color: '#eab308' };
      default: return { color: '#a8a29e' };
    }
  };

  const getPriorityTranslation = (pri) => {
    switch (pri) {
      case 'დაბალი': return t('priLow');
      case 'საშუალო': return t('priMed');
      case 'მაღალი': return t('priHigh');
      case 'კრიტიკული': return t('priCrit');
      default: return pri;
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

  // Only show tasks that belong to this business client (based on their company name)
  const businessTasks = tasks.filter(task => task.company.toLowerCase() === company.toLowerCase() || !currentUser);

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>{t('businessPortal')}</span>
        <h2 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>{t('shareProblem')}</h2>
      </div>

      {notification && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid var(--status-approved)',
          color: 'var(--status-approved)',
          padding: '1rem',
          borderRadius: '0',
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
            <span>{t('createTask')}</span>
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('companyName')}</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder={t('companyPlaceholder')} 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={!!currentUser} // Auto-locked to logged-in user name
              />
            </div>

            <div className="form-group">
              <label>{t('taskTitle')}</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder={t('taskTitlePlaceholder')} 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>{t('category')}</label>
                <select 
                  className="form-control" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ background: '#ffffff', color: 'var(--text-main)' }}
                >
                  <option value="ვებ დეველოპმენტი">{t('catWeb')}</option>
                  <option value="სისტემური ადმინისტრირება">{t('catSys')}</option>
                  <option value="ქსელები და აპარატურა">{t('catNet')}</option>
                  <option value="მონაცემთა ბაზები">{t('catDb')}</option>
                  <option value="IT მხარდაჭერა">{t('catSupport')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t('priority')}</label>
                <select 
                  className="form-control" 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  style={{ background: '#ffffff', color: 'var(--text-main)' }}
                >
                  <option value="დაბალი">{t('priLow')}</option>
                  <option value="საშუალო">{t('priMed')}</option>
                  <option value="მაღალი">{t('priHigh')}</option>
                  <option value="კრიტიკული">{t('priCrit')}</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>{t('budget')}</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder={t('budgetPlaceholder')} 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ paddingLeft: '2rem' }}
                />
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>₾</span>
              </div>
            </div>

            <div className="form-group">
              <label>{t('taskDescription')}</label>
              <textarea 
                className="form-control" 
                placeholder={t('descriptionPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {t('submitBtn')}
            </button>
          </form>
        </div>

        {/* Existing Problems Status List */}
        <div className="card" style={{ flex: '2' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="var(--accent)" />
            <span>{t('taskStatusTitle')}</span>
          </h3>

          {businessTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
              <p>{t('noTasksYet')}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {businessTasks.map((task) => (
                <div key={task.id} style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '0',
                  padding: '1.25rem',
                  background: 'rgba(0,0,0,0.01)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem' }}>{task.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                        <Briefcase size={12} /> {task.company}
                      </span>
                    </div>
                    {getStatusBadge(task.status)}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {task.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Tag size={14} /> {getCategoryTranslation(task.category)}
                      </span>
                      <span>
                        {t('priority')}: <span style={getPriorityStyle(task.priority)}>{getPriorityTranslation(task.priority)}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} /> {task.date}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.05rem' }}>
                        ₾{task.budget}
                      </span>

                      {/* Pay/Approve Action if task is completed */}
                      {task.status === 'შესრულებული' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => onApproveTask(task.id)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        >
                          {t('approvePay')}
                        </button>
                      )}
                    </div>
                  </div>

                  {task.managerNote && (
                    <div style={{
                      background: '#f8fafc',
                      borderLeft: '3px solid var(--primary)',
                      padding: '0.75rem',
                      borderRadius: '0',
                      marginTop: '1rem',
                      fontSize: '0.85rem'
                    }}>
                      <strong>{t('managerComment')}</strong> {task.managerNote}
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
